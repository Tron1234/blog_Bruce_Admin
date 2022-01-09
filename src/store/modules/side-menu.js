import { deepClone } from '@/utils/deepClone';
import user from './user';

const adminMenu = [
  {
    icon: "TrendingUpIcon",
    pageName: "side-menu-dashboard",
    title: "统计数据"
  },
  {
    icon: "TrelloIcon",
    pageName: "side-menu-article",
    title: "文章管理"
  },
  {
    icon: "UsersIcon",
    pageName: "side-menu-authors",
    title: "作者管理"
  },
  {
    icon: "BookmarkIcon",
    title: "文章分类",
    subMenu: [
      {
        icon: "TagIcon",
        pageName: "side-menu-major-category",
        title: "主分类"
      },
      {
        icon: "TagIcon",
        pageName: "side-menu-secondary-category",
        title: "次分类"
      }
    ]
  },
  {
    icon: "MessageCircleIcon",
    pageName: "side-menu-contact",
    title: "留言"
  },
  {
    icon: "UserIcon",
    pageName: "side-menu-profile",
    title: "用户信息"
  }
]

const submenu = deepClone(adminMenu[1]);
delete submenu.pageName;
submenu.subMenu = [
  {
    icon: "EditIcon",
    pageName: "side-menu-write",
    title: "编写文章"
  },
  {
    icon: "BookOpenIcon",
    pageName: "side-menu-article",
    title: "文章管理"
  }
]

const authorMenu = [submenu, adminMenu.slice(-1)[0]];
const state = () => {
  return {
    menu: user.state.userInfo.permission == 1 ? adminMenu : authorMenu
  };
};

// getters
const getters = {
  menu: state => state.menu
};

// actions
const actions = {};

// mutations
const mutations = {
  setMenu(state, permission) {
    if (permission == 1) {
      state.menu = adminMenu;
    } else {
      state.menu = authorMenu;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
