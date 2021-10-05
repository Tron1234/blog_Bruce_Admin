<template>
  <div>
    <div>
      <label for="regular-form-1" class="form-label intro-y text-lg font-medium my-5">{{showReset?'修改':'新增'}}次分类</label>
      <div class="flex">
        <input id="regular-form-1" type="text" class="form-control mr-4" style="flex:4" placeholder="请输入文章次分类" v-model="result.name" />
        <select class="form-select flex-1" v-model="result.majorId" aria-label="Default select example">
          <option value="-1">请选择主分类</option>
          <option :value="item.id" v-for="(item,index) of list" :key="index">{{item.name}}</option>
        </select>
      </div>
    </div>
    <div class="w-full flex justify-end mt-5">
      <button v-if="showReset" class="btn btn-danger mr-4" @click="resetCategory">重置</button>
      <button class="btn btn-primary" @click="addCategory">确认{{showReset?'修改':'添加'}}</button>
    </div>
  </div>
</template>
<script>
import { getSecondaryCategoryDetail, addSecondaryCategory, updateSecondaryCategory, getMajorCategory } from '@/apis';
import { toRaw, reactive, ref, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const app = getCurrentInstance().appContext.config.globalProperties;
    const route = useRoute();
    const router = useRouter();
    const list = ref([]);
    const page = reactive({
      pageIndex: 1,
      pageSize: 99
    })
    //定义变量
    let preResult;
    const result = ref({ name: '', majorId: -1 });

    if (route.query.id) {
      getCategory(route.query.id);
    }
    //定义函数
    async function majorCategory() {
      const temp = toRaw(page);
      const result = await getMajorCategory(temp);
      list.value = result.list;
    }
    //添加分类/修改分类
    async function addCategory() {
      if (!result.value.name) {
        return app.$toast.danger("分类不能为空!");
      }
      if (!result.value.majorId) {
        return app.$toast.danger("主分类不能为空!");
      }
      if (route.query.id) {
        if (result.value.name != preResult.name || result.value.majorId != preResult.majorId) {
          await updateSecondaryCategory(toRaw(result.value));
          app.$toast.success("更改分类成功！");
        }
      } else {
        await addSecondaryCategory(toRaw(result.value));
        app.$toast.success("添加分类成功！");
      }
      router.back();
    }
    //获取元数据
    async function getCategory(id) {
      const temp = await getSecondaryCategoryDetail({ id });
      temp.majorId = String(temp.majorId);
      preResult = temp;
      result.value = app.$deepClone(preResult);
    }
    //重制数据
    function resetCategory() {
      result.value = app.$deepClone(preResult);
    }

    //执行函数
    majorCategory();
    return {
      list,
      result,
      addCategory,
      showReset: !!route.query.id,
      resetCategory
    }
  }
}
</script>
