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
        component: Dashboard
      },
      {
        path: "write",
        name: "side-menu-write",
        component: Write
      },
      {
        path: "addMajorCategory",
        name: "side-menu-add-major-category",
        component: AddMajorCategory
      },
      {
        path: "majorCategory",
        name: "side-menu-major-category",
        component: MajorCategory
      },
      {
        path: "addSecondaryCategory",
        name: "side-menu-add-secondary-category",
        component: AddSecondaryCategory
      },
      {
        path: "secondaryCategory",
        name: "side-menu-secondary-category",
        component: SecondaryCategory
      },
      {
        path: "addAuthor",
        name: "side-menu-add-author",
        component: AddAuthor
      },
      {
        path: "authors",
        name: "side-menu-authors",
        component: Authors
      },
      {
        path: "profile",
        name: "side-menu-profile",
        component: Profile
      },
      {
        path: "article",
        name: "side-menu-article",
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
    return { replace: true, name: 'side-menu-dashboard' }
  }
})

export default router;
