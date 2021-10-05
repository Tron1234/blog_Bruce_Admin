<template>
  <div>
    <div>
      <label for="regular-form-1" class="form-label intro-y text-lg font-medium my-5">{{showReset?'修改':'新增'}}主分类</label>
      <input id="regular-form-1" type="text" class="form-control" placeholder="请输入文章主分类" v-model="result.name" />
    </div>
    <div class="w-full flex justify-end mt-5">
      <button v-if="showReset" class="btn btn-danger mr-4" @click="resetCategory">重置</button>
      <button class="btn btn-primary" @click="addCategory">确认{{showReset?'修改':'添加'}}</button>
    </div>
  </div>
</template>
<script>
import { getMajorCategoryDetail, addMajorCategory,updateMajorCategory } from '@/apis';
import { toRaw, ref, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default {
  setup() {
    const app = getCurrentInstance().appContext.config.globalProperties;
    const route = useRoute();
    const router = useRouter();
    //定义变量
    let preResult;
    const result = ref({ name: '' });

    if (route.query.id) {
      getCategory(route.query.id);
    }
    //定义函数
    //添加分类/修改分类
    async function addCategory() {
      if (!result.value.name) {
        return app.$toast.danger("分类不能为空!");
      }
      if (route.query.id) {
        if (result.value.name != preResult.name) {
          await updateMajorCategory(toRaw(result.value));
          app.$toast.success("更改分类成功！");
        }
      } else {
        await addMajorCategory(toRaw(result.value));
        app.$toast.success("添加分类成功！");
      }
      router.back();
    }
    //获取元数据
    async function getCategory(id) {
      preResult = await getMajorCategoryDetail({ id });
      result.value = app.$deepClone(preResult);
    }
    //重制数据
    function resetCategory() {
      result.value = app.$deepClone(preResult);
    }

    //执行函数
    return {
      result,
      addCategory,
      showReset: !!route.query.id,
      resetCategory
    }
  }
}
</script>
