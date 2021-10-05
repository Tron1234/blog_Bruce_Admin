<template>
  <div>
    <div class="intro-y flex items-center mt-5">
      <h2 class="text-lg font-medium mr-auto">用户信息</h2>
    </div>
    <!-- BEGIN: Profile Info -->
    <div class="intro-y box px-5 pt-5 mt-5">
      <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
        <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
          <div class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
            <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="userInfo.avatar" />
          </div>
          <div class="ml-5">
            <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
              {{ userInfo.nickname }}
            </div>
            <div class="text-gray-600">{{ $filter.formatSex(userInfo.sex) }}</div>
            <div class="text-gray-600">{{ userInfo.email }}</div>
          </div>
        </div>
        <div v-if="userInfo.github||userInfo.twitter" class="mt-6 lg:mt-0 flex-1 dark:text-gray-300 px-5 border-l border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
          <div class="font-medium text-center lg:text-left lg:mt-3">
            联系方式
          </div>
          <div class="flex flex-col justify-center items-center lg:items-start mt-4">
            <div v-if="userInfo.github" class="truncate sm:whitespace-normal flex items-center">
              <GithubIcon class="w-4 h-4 mr-2" /> GitHub
              {{ userInfo.github }}
            </div>
            <div v-if="userInfo.twitter" class="truncate sm:whitespace-normal flex items-center mt-3">
              <TwitterIcon class="w-4 h-4 mr-2" /> Twitter
              {{ userInfo.twitter }}
            </div>
          </div>
        </div>
      </div>
      <div class="nav nav-tabs flex-col sm:flex-row justify-center lg:justify-start" role="tablist">
        <span id="change-profile-tab" data-toggle="tab" data-target="#change-profile" class="cursor-pointer py-4 sm:mr-8 flex items-center active" role="tab" aria-controls="change-profile" aria-selected="true">
          <ShieldIcon class="w-4 h-4 mr-2" /> 更改信息
        </span>
        <span id="change-password-tab" data-toggle="tab" data-target="#change-password" class="cursor-pointer py-4 sm:mr-8 flex items-center" role="tab" aria-controls="change-password" aria-selected="false">
          <LockIcon class="w-4 h-4 mr-2" /> 更改密码
        </span>
        <span class="cursor-pointer py-4 sm:mr-8 flex items-center" @click="loginOut">
          <LogOutIcon class="w-4 h-4 mr-2" /> 退出登录
        </span>
      </div>
    </div>
    <!-- END: Profile Info -->
    <div class="tab-content mt-5">
      <div id="change-profile" class="tab-pane active" role="tabpanel" aria-labelledby="change-profile-tab">
        <!-- BEGIN: Display Information -->
        <div class="intro-y box lg:mt-5">
          <div class="p-5">
            <div class="flex flex-col-reverse xl:flex-row flex-col">
              <div class="flex-1 mt-6 xl:mt-0">
                <div class="grid grid-cols-12 gap-x-5">
                  <div class="col-span-12 xxl:col-span-6">
                    <div>
                      <label for="update-profile-form-1" class="form-label">昵称</label>
                      <input type="text" class="form-control" placeholder="请输入昵称" v-model="tempUserInfo.nickname" />
                    </div>
                    <div class="mt-5">
                      <label for="update-profile-form-1" class="form-label">性别</label>
                      <div class="flex">
                        <div class="form-check mr-2">
                          <input id="radio-switch-4" class="form-check-input" type="radio" name="sex" value="0" :checked="!Number(tempUserInfo.sex)" v-model="tempUserInfo.sex" />
                          <label class="form-check-label" for="radio-switch-4">男</label>
                        </div>
                        <div class="form-check mr-2">
                          <input id="radio-switch-5" class="form-check-input" type="radio" name="sex" value="1" :checked="Number(tempUserInfo.sex)" v-model="tempUserInfo.sex" />
                          <label class="form-check-label" for="radio-switch-5">女</label>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <label for="update-profile-form-1" class="form-label">GitHub</label>
                      <input type="text" class="form-control" placeholder="请输入GitHub地址" v-model="tempUserInfo.github" />
                    </div>
                    <div class="mt-5">
                      <label for="update-profile-form-1" class="form-label">Twitter</label>
                      <input type="text" class="form-control" placeholder="请输入Twitter地址" v-model="tempUserInfo.twitter" />
                    </div>
                  </div>
                </div>
                <div class="mt-5">
                  <button type="button" class="btn btn-primary w-20" @click="saveUserInfo">
                    保存
                  </button>
                  <button type="button" class="btn btn-danger w-20 ml-4" @click="resetUpdateUserInfo">
                    重置
                  </button>
                </div>
              </div>
              <div class="w-52 mx-auto xl:mr-0 xl:ml-6">
                <div class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
                  <div class="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                    <img class="rounded-full" alt="200 * 200" :src="tempUserInfo.avatar" />
                  </div>
                  <div class="mx-auto relative mt-5">
                    <button type="button" class="btn btn-primary w-full">
                      更换头像
                    </button>
                    <input type="file" name="avatar" accept="image/png,image/jpeg,image/gif,image/jpg" class="w-full h-full top-0 left-0 absolute opacity-0 cursor-pointer" @change="upload" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Display Information -->
      </div>

      <div id="change-password" class="tab-pane" role="tabpanel" aria-labelledby="change-password-tab">
        <!-- BEGIN: Change Password -->
        <div class="intro-y box lg:mt-5">
          <div class="p-5">
            <div>
              <label for="change-password-form-1" class="form-label">旧密码</label>
              <input id="change-password-form-1" type="password" class="form-control" placeholder="请输入旧密码" v-model="tempPassword.oldpassword" />
            </div>
            <div class="mt-3">
              <label for="change-password-form-2" class="form-label">新密码</label>
              <input id="change-password-form-2" type="password" class="form-control" placeholder="请输入新密码" maxlength="16" v-model="tempPassword.password" @keyup="checkPassword" />
              <div class="w-full grid grid-cols-12 gap-4 h-1 mt-3" v-show="passwordLevel">
                <div class="col-span-3 h-full rounded" :class="passwordLevel>=1?('bg-'+passwordLevelClass):'bg-gray-200 dark:bg-dark-1'"></div>
                <div class="col-span-3 h-full rounded" :class="passwordLevel>=2?('bg-'+passwordLevelClass):'bg-gray-200 dark:bg-dark-1'"></div>
                <div class="col-span-3 h-full rounded" :class="passwordLevel>=3?('bg-'+passwordLevelClass):'bg-gray-200 dark:bg-dark-1'"></div>
                <div class="col-span-3 h-full rounded"></div>
              </div>
              <div class="mt-2" :class="'text-'+passwordLevelClass">{{showPasswordLevel(passwordLevel)}}</div>
            </div>
            <div class="mt-3">
              <label for="change-password-form-3" class="form-label">确认密码</label>
              <input id="change-password-form-3" type="password" class="form-control" placeholder="请输入确认密码" maxlength="16" v-model="tempPassword.surePassword" @keyup="checkSurePassword" />
              <div class="w-full grid grid-cols-12 gap-4 h-1 mt-3" v-show="surePasswordLevel">
                <div class="col-span-3 h-full rounded" :class="passwordLevel>=1?('bg-'+passwordLevelClass):'bg-gray-200 dark:bg-dark-1'"></div>
                <div class="col-span-3 h-full rounded" :class="passwordLevel>=2?('bg-'+passwordLevelClass):'bg-gray-200 dark:bg-dark-1'"></div>
                <div class="col-span-3 h-full rounded" :class="passwordLevel>=3?('bg-'+passwordLevelClass):'bg-gray-200 dark:bg-dark-1'"></div>
              </div>
              <div class="mt-2" :class="'text-'+surePasswordLevelClass">{{showPasswordLevel(surePasswordLevel)}}</div>
            </div>
            <button type="button" class="btn btn-primary mt-4" @click="submitChangePassword">
              确认更改
            </button>
          </div>
        </div>
        <!-- END: Change Password -->
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, computed, defineComponent, ref, toRaw, reactive } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { updateUserInfo, updateUserPassword, logout, uploadAvatar } from '@/apis';
import { message } from '@/plugins/message';
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const app = getCurrentInstance().appContext.config.globalProperties;
    const userInfo = computed(() => store.state.user.userInfo);
    const tempUserInfo = ref(app.$deepClone(store.state.user.userInfo));
    const tempPassword = reactive({ oldpassword: '', password: '', surePassword: '' });
    const passwordLevel = ref('');
    const surePasswordLevel = ref('');
    const passwordLevelClass = computed(() => {
      let temp;
      switch (passwordLevel.value) {
        case '':
        case 0:
        case 1:
          temp = 'theme-6';
          break;
        case 2:
          temp = 'theme-20';
          break;
        case 3:
          temp = 'theme-9';
          break;
      }
      return temp;
    })
    const surePasswordLevelClass = computed(() => {
      let temp;
      switch (surePasswordLevel.value) {
        case '':
        case 0:
        case 1:
          temp = 'theme-6';
          break;
        case 2:
          temp = 'theme-20';
          break;
        case 3:
          temp = 'theme-9';
          break;
      }
      return temp;
    })
    async function saveUserInfo() {
      if (!tempUserInfo.value.nickname) {
        return app.$toast.danger("昵称不能为空!");
      }
      let temp = app.$deepClone(toRaw(tempUserInfo.value));
      await updateUserInfo(temp);
      store.commit('user/setUserInfo', temp);
      app.$toast.success("更改信息成功！");
    }
    function resetUpdateUserInfo() {
      tempUserInfo.value = app.$deepClone(store.state.user.userInfo);
    }
    function checkPassword() {
      passwordLevel.value = checkRegExpPassword(tempPassword.password);
    }
    function checkSurePassword() {
      surePasswordLevel.value = checkRegExpPassword(tempPassword.surePassword);
    }
    function checkRegExpPassword(str) {
      let level = 0;
      const regLow = /\w{6,16}$/;
      const regMiddle = /\w{8,16}$/;
      const regUp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
      if (regLow.test(str)) level++;
      if (regMiddle.test(str)) level++;
      if (regUp.test(str)) level++;
      return level;
    }
    function showPasswordLevel(level) {
      let temp;
      switch (level) {
        case 0:
          temp = "密码由字母、数字和下划线组成的6至16位字符组成";
          break;
        case 1:
          temp = "弱密码";
          break;
        case 2:
          temp = "中密码";
          break;
        case 3:
          temp = "强密码";
          break;
      }
      return temp;
    }
    function submitChangePassword() {
      if (!tempPassword.oldpassword) {
        return app.$toast.danger("旧密码不能为空!");
      }
      if (!tempPassword.password || !tempPassword.surePassword) {
        return app.$toast.danger("新密码不能为空!");
      }
      if (!checkRegExpPassword(tempPassword.password) || !checkRegExpPassword(tempPassword.surePassword)) {
        return app.$toast.danger("新密码不合法!");
      }
      if (tempPassword.password != tempPassword.surePassword) {
        return app.$toast.danger("两次密码不一致!");
      }
      if (tempPassword.oldpassword == tempPassword.password) {
        return app.$toast.danger("新旧密码不能相同!");
      }
      message.normalMessage({
        content: '确认更改密码，需要重新登录！',
        sure: '确认更改',
        isSureExcept: true,
        success: async (callback) => {
          await updateUserPassword(toRaw(tempPassword));
          if (callback) {
            callback();
          }
          app.$toast.success("更改密码成功，请重新登录！");
          setTimeout(() => {
            store.commit("user/clearToken");
            router.replace({ name: 'login' });
          }, 1500);
        }
      })
    }
    async function loginOut() {
      await logout();
      store.commit("user/clearToken");
      router.replace({ name: 'login' });
    }

    async function upload(e) {
      let filesList = e.target.files;
      let formData = new FormData();
      formData.append('avatar', filesList[0]);
      let data = await uploadAvatar(formData);
      tempUserInfo.value.avatar = data;
      await saveUserInfo();
    }
    return {
      userInfo,
      tempUserInfo,
      tempPassword,
      saveUserInfo,
      resetUpdateUserInfo,
      submitChangePassword,
      checkPassword,
      checkSurePassword,
      passwordLevel,
      surePasswordLevel,
      showPasswordLevel,
      passwordLevelClass,
      surePasswordLevelClass,
      loginOut,
      upload
    }
  }
});
</script>
