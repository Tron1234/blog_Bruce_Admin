<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <div class="-intro-x flex mr-auto">
      <div class="breadcrumb" v-for="(item,index) of routeLink" :key="index">
        <a :class="{'breadcrumb--active':index==routeLink.length-1}">{{item}}</a>
        <ChevronRightIcon v-if="index!=routeLink.length-1" class="breadcrumb__icon" />
      </div>
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
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { logout } from '@/apis';
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    //定义路由展示
    const routeLink = ref([]);
    const route = useRoute();
    const routes = route.matched.slice(1);
    if (routes.length) {
      if (route.path.toLowerCase().indexOf('category') != -1) {
        routes.unshift({ meta: { title: '文章分类' } });
      }
      routeLink.value = routes.map(item => item.meta.title)
    }
    onBeforeRouteUpdate((to) => {
      const routes = to.matched.slice(1);
      if (routes.length) {
        if (to.path.toLowerCase().indexOf('category') != -1) {
          routes.unshift({ meta: { title: '文章分类' } });
        }
        routeLink.value = routes.map(item => item.meta.title)
      }
    });

    async function loginOut() {
      document.querySelector('.intro-x.dropdown>.dropdown-toggle').click();
      await logout();
      store.commit("user/clearToken");
      router.replace({ name: 'login' });
    }
    return {
      userInfo: computed(() => store.state.user.userInfo),
      loginOut,
      routeLink
    };
  }
});
</script>
