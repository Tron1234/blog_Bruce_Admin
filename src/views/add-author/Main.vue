<template>
  <div>
    <div class="flex items-center mt-8">
      <h2 class="intro-y text-lg font-medium mr-auto">添加作者</h2>
    </div>
    <!-- BEGIN: Wizard Layout -->
    <div class="intro-y box py-5 mt-5">
      <div class="px-5 sm:px-8">
        <div class="font-medium text-base">作者信息</div>
        <div class="w-60 mt-4" v-if="showReset">
          <div class="flex items-center border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
            <div class="cursor-pointer zoom-in rounded-full">
              <img class="w-20 h-20 rounded-full object-contain" alt="200 * 200" :src="result.avatar" />
            </div>
            <div class="relative ml-5">
              <button type="button" class="cursor-pointer btn btn-primary whitespace-nowrap">
                更换头像
              </button>
              <input type="file" name="avatar" accept="image/png,image/jpeg,image/gif,image/jpg" class="w-full h-full top-0 left-0 absolute opacity-0 cursor-pointer" @change="upload" />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 gap-y-5 mt-5">
          <div class="intro-y col-span-12 sm:col-span-6">
            <label for="input-wizard-1" class="form-label">用户昵称</label>
            <input id="input-wizard-1" type="text" class="form-control" v-model="result.nickname" placeholder="请输入用户昵称" />
          </div>
          <div class="intro-y col-span-12 sm:col-span-6">
            <label for="update-profile-form-1" class="form-label">性别</label>
            <div class="flex">
              <div class="form-check mr-2">
                <input id="radio-switch-4" class="form-check-input" type="radio" name="sex" value="0" :checked="!Number(result.sex)" v-model="result.sex" />
                <label class="form-check-label" for="radio-switch-4">男</label>
              </div>
              <div class="form-check mr-2">
                <input id="radio-switch-5" class="form-check-input" type="radio" name="sex" value="1" :checked="Number(result.sex)" v-model="result.sex" />
                <label class="form-check-label" for="radio-switch-5">女</label>
              </div>
            </div>
          </div>
          <div class="intro-y col-span-12 sm:col-span-6">
            <label for="input-wizard-3" class="form-label">Email</label>
            <input id="input-wizard-3" type="text" class="form-control" v-model="result.email" placeholder="请输入Email" />
          </div>
          <div class="intro-y col-span-12 sm:col-span-6">
            <label for="input-wizard-4" class="form-label">GitHub</label>
            <input id="input-wizard-4" type="text" class="form-control" v-model="result.github" placeholder="请输入GitHub地址" />
          </div>
          <div class="intro-y col-span-12 sm:col-span-6">
            <label for="input-wizard-5" class="form-label">Twitter</label>
            <input id="input-wizard-5" type="text" class="form-control" v-model="result.twitter" placeholder="请输入Twitter地址" />
          </div>
          <div class="intro-y col-span-12 sm:col-span-6">
            <label for="input-wizard-6" class="form-label">密码</label>
            <input id="input-wizard-5" type="text" class="form-control" v-model="result.password" placeholder="请输入默认密码" />
          </div>
          <div class="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
            <button v-if="showReset" class="btn btn-danger w-24" @click="resetAuthor">重置</button>
            <button class="btn btn-primary w-24 ml-2" @click="addAuthorPage">{{showReset?'确认修改':'添加'}}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Wizard Layout -->
  </div>
</template>
<script>
import { addAuthor, getUserInfo, updateAuthor, uploadAvatar } from '@/apis';
import { toRaw, ref, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  setup() {
    const app = getCurrentInstance().appContext.config.globalProperties;
    const route = useRoute();
    const router = useRouter();
    //定义变量
    let preResult;
    const result = ref({ nickname: '', sex: '0', email: '', github: '', twitter: '', password: '' });

    if (route.query.id) {
      getAuthor(route.query.id);
    }
    //定义函数
    //添加分类/修改分类
    async function addAuthorPage() {
      if (!result.value.nickname) {
        return app.$toast.danger("用户昵称不能为空!");
      }
      if (result.value.sex === undefined) {
        return app.$toast.danger("性别不能为空!");
      }
      if (!result.value.email) {
        return app.$toast.danger("邮箱不能为空!");
      }
      if (!result.value.password) {
        return app.$toast.danger("密码不能为空!");
      }
      if (route.query.id) {
        await updateAuthor(toRaw(result.value));
        app.$toast.success("更改作者成功！");
      } else {
        await addAuthor(toRaw(result.value));
        app.$toast.success("添加作者成功！");
      }
      router.back();
    }
    //获取元数据
    async function getAuthor(id) {
      preResult = await getUserInfo({ authorId: id });
      result.value = app.$deepClone(preResult);
    }
    //重制数据
    function resetAuthor() {
      result.value = app.$deepClone(preResult);
    }
    //上传头像
    async function upload(e) {
      let filesList = e.target.files;
      let formData = new FormData();
      formData.append('avatar', filesList[0]);
      let data = await uploadAvatar(formData);
      result.value.avatar = data;
    }
    //执行函数
    return {
      result,
      addAuthorPage,
      resetAuthor,
      showReset: !!route.query.id,
      upload
    }
  }
}
</script>
