<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <div class="-intro-x breadcrumb mr-auto hidden sm:flex">
      <a href="">Application</a>
      <ChevronRightIcon class="breadcrumb__icon" />
      <a href="" class="breadcrumb--active">Dashboard</a>
    </div>
    <!-- END: Breadcrumb -->
    <!-- BEGIN: Account Menu -->
    <div class="intro-x dropdown w-8 h-8">
      <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in" role="button" aria-expanded="false">
        <img alt="Icewall Tailwind HTML Admin Template" :src="userInfo.avatar" />
      </div>
      <div class="dropdown-menu w-56">
        <div class="dropdown-menu__content box bg-theme-26 dark:bg-dark-6 text-white">
          <div class="p-4 border-b border-theme-27 dark:border-dark-3">
            <div class="font-medium">{{ userInfo.nickname }}</div>
            <div class="text-xs text-theme-28 mt-0.5 dark:text-gray-600">
              {{ userInfo.email }}
            </div>
          </div>
          <div class="p-2">
            <router-link to="/profile">
              <span class="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
                <UserIcon class="w-4 h-4 mr-2" /> 用户信息
              </span>
            </router-link>
          </div>
          <div class="p-2 border-t border-theme-27 dark:border-dark-3" @click="loginOut">
            <span class="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md">
              <LogOutIcon class="w-4 h-4 mr-2" /> 退出登录
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Account Menu -->
  </div>
  <!-- END: Top Bar -->
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { logout } from '@/apis';
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const searchDropdown = ref(false);

    const showSearchDropdown = () => {
      searchDropdown.value = true;
    };

    const hideSearchDropdown = () => {
      searchDropdown.value = false;
    };

    async function loginOut() {
      await logout();
      store.commit("user/clearToken");
      router.replace({ name: 'login' });
    }
    return {
      searchDropdown,
      showSearchDropdown,
      hideSearchDropdown,
      userInfo: computed(() => store.state.user.userInfo),
      loginOut
    };
  }
});
</script>
