import { createRouter, createWebHistory } from "vue-router";
import store from '../store';
import SideMenu from "../layouts/Main.vue";
import Dashboard from "../views/dashboard/Main.vue";
import Write from "../views/write/Main.vue";
import MajorCategory from "../views/category-major/Main.vue";
import AddMajorCategory from '../views/add-category-major/Main.vue';
import SecondaryCategory from "../views/category-secondary/Main.vue";
import AddSecondaryCategory from '../views/add-category-secondary/Main.vue';
import Authors from "../views/authors/Main.vue";
import AddAuthor from "../views/add-author/Main.vue";
import ErrorPage from "../views/error-page/Main.vue";
import Profile from "../views/profile/Main.vue";
import Contact from "../views/contact/Main.vue";
import Article from "../views/article/Main.vue";
import Login from "../views/login/Main.vue";
import Chart from "../views/chart/Main.vue";

const routes = [
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path: "/",
        name: "side-menu-dashboard",
        meta: {
          title: '统计数据'
        },
        component: Dashboard
      },
      {
        path: "write",
        name: "side-menu-write",
        meta: {
          title: '编写文章'
        },
        component: Write
      },
      {
        path: "addMajorCategory",
        name: "side-menu-add-major-category",
        meta: {
          title: '新增主分类'
        },
        component: AddMajorCategory
      },
      {
        path: "majorCategory",
        name: "side-menu-major-category",
        meta: {
          title: '文章主分类'
        },
        component: MajorCategory
      },
      {
        path: "addSecondaryCategory",
        name: "side-menu-add-secondary-category",
        meta: {
          title: '新增次分类'
        },
        component: AddSecondaryCategory
      },
      {
        path: "secondaryCategory",
        name: "side-menu-secondary-category",
        meta: {
          title: '文章次分类'
        },
        component: SecondaryCategory
      },
      {
        path: "addAuthor",
        name: "side-menu-add-author",
        meta: {
          title: '添加作者'
        },
        component: AddAuthor
      },
      {
        path: "authors",
        name: "side-menu-authors",
        meta: {
          title: '作者管理'
        },
        component: Authors
      },
      {
        path: "contact",
        name: "side-menu-contact",
        meta: {
          title: '留言'
        },
        component: Contact
      },
      {
        path: "profile",
        name: "side-menu-profile",
        meta: {
          title: '用户信息'
        },
        component: Profile
      },
      {
        path: "article",
        name: "side-menu-article",
        meta: {
          title: '文章管理'
        },
        component: Article
      },
      {
        path: "chart",
        name: "side-menu-chart",
        component: Chart
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  }
});


router.beforeEach((to, from) => {
  if (to.name != 'error-page' && to.name != 'login' && (!store.state.user.token || !store.state.user.userInfo)) {
    if (from.name == 'login') {
      return false;
    } else {
      return { replace: true, name: 'login' }
    }
  }

  if (to.name == 'login' && store.state.user.token && store.state.user.userInfo) {
    if(store.state.user.userInfo.permission > 1){
      return { replace: true, name: 'side-menu-profile' }
    }else{
      return { replace: true, name: 'side-menu-dashboard' }
    }
  }
  if (to.name == 'side-menu-dashboard' && store.state.user.userInfo.permission > 1) {
    return { replace: true, name: 'side-menu-profile' }
  }
})

export default router;
