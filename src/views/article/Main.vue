<template>
  <div>
    <div class="intro-y flex flex-col items-center mt-5" :class="{'sm:flex-row':userInfo.permission<2}">
      <h2 class="text-lg font-medium mr-auto whitespace-nowrap">文章管理</h2>
      <div class="w-full flex flex-wrap mt-4" :class="[{'sm:mt-4':userInfo.permission>1},userInfo.permission<2?'justify-end':'justify-between']">
        <div class="w-full sm:w-auto flex justify-between mb-4" v-if="userInfo.permission>1">
          <button class="btn btn-primary shadow-md mr-2 whitespace-nowrap" @click="addArticle">新增文章
            <PlusIcon class="w-5 h-5 ml-1" />
          </button>status
          <select class="w-40 form-select form-select-lg ml-4" aria-label=".form-select-lg example" v-model="page.status" @change="articleList">
            <option value="1">已发布</option>
            <option value="0">已保存</option>
            <option value="-1">已删除</option>
          </select>
        </div>
        <div class="w-full sm:w-auto sm:ml-auto md:ml-0 mb-4">
          <div class="relative text-gray-700 dark:text-gray-300">
            <input type="text" class="w-full form-control box pr-10 placeholder-theme-13" placeholder="搜索分类" v-model="page.searchKey" @input="inputArticle" />
            <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
          </div>
        </div>
      </div>
    </div>
    <div class="intro-y grid grid-cols-12 gap-6 mt-3">
      <!-- BEGIN: Blog Layout -->
      <div v-for="(item,index) in list" :key="index" class="relative flex flex-col justify-between intro-y col-span-12 md:col-span-6 xl:col-span-4 box">
        <img class="absolute top-0 left-0 w-10 object-contain" v-if="userInfo.permission>1" src="@/assets/images/recommend.svg" />
        <div class="flex items-center justify-between">
          <div class="flex items-center border-b border-gray-200 dark:border-dark-5 px-5 py-4">
            <div class="w-10 h-10 flex-none image-fit">
              <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="item.user.avatar" />
            </div>
            <div class="ml-3 mr-auto">
              <a href="" class="font-medium">{{ item.user.nickname }}</a>
              <div class="flex text-gray-600 truncate text-xs mt-0.5">
                <span class="text-theme-1 dark:text-theme-10 inline-block truncate">{{ item.user.email }}</span>
              </div>
            </div>
          </div>
          <button class="btn btn-sm btn-primary w-18 mr-4">{{item.secondaryName}}</button>
        </div>
        <div class="flex flex-col">
          <div class="p-5">
            <span class="block font-medium text-base">{{
          item.title
          }}</span>
            <div class="text-gray-700 dark:text-gray-600 mt-2">
              {{ item.content }}
            </div>
          </div>
          <div class="flex justify-end text-gray-500 text-sm ml-5 mr-4 mb-2">
            <div>{{formatTime(item.time)}}</div>
          </div>
        </div>
        <div class="w-full p-2 pl-5 flex justify-between items-center border-t border-gray-200 dark:border-dark-5">
          <div class="form-check" v-if="userInfo.permission<2">
            <input id="vertical-form-3" class="form-check-input" type="checkbox" v-model="item.recommond" @click="changeRecommondStatus(index)" />
            <label class="form-check-label text-sm whitespace-nowrap" for="vertical-form-3">推荐</label>
          </div>
          <span v-if="page.status==0" class="whitespace-nowrap flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md cursor-pointer" @click="publishArticle(item.id)">
            <UploadCloudIcon class="w-4 h-4 mr-2" /> 发布
          </span>
          <div class="w-full flex" :class="userInfo.permission<2||(userInfo.permission>1&&page.status==0)?'justify-end':'justify-between'">
            <span v-if="userInfo.permission>1" class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md cursor-pointer" @click="addArticle(e,item.id)">
              <Edit2Icon class="w-4 h-4 mr-2" /> 编辑
            </span>
            <span class="flex items-center p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md cursor-pointer" @click="deleteArticleItem(item.id)">
              <TrashIcon class="w-4 h-4 mr-2" /> 删除
            </span>
          </div>
        </div>
      </div>
      <!-- END: Blog Layout -->
      <!-- BEGIN: Pagination -->
      <div v-if="pageTotal>1" class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
        <ul class="pagination">
          <li @click="pageTo('first')">
            <span class="pagination__link">
              <ChevronsLeftIcon class="w-4 h-4" />
            </span>
          </li>
          <li @click="pageTo('prev')">
            <span class="pagination__link">
              <ChevronLeftIcon class="w-4 h-4" />
            </span>
          </li>
          <li v-for="(item,index) of pageTotal" :key="index" @click="pageTo('page',index)">
            <span class="pagination__link" :class="{'pagination__link--active':page.pageIndex == (index+1)}" href="">{{item}}</span>
          </li>
          <li @click="pageTo('next')">
            <span class="pagination__link">
              <ChevronRightIcon class="w-4 h-4" />
            </span>
          </li>
          <li @click="pageTo('last')">
            <span class="pagination__link">
              <ChevronsRightIcon class="w-4 h-4" />
            </span>
          </li>
        </ul>
      </div>
      <!-- END: Pagination -->
    </div>
  </div>
</template>
<script>
import { getArticleList, changeRecommond, deleteArticle, updateArticleStatus } from '@/apis';
import { useStore } from 'vuex';
import { reactive, toRaw, ref, computed, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import debounce from '@/utils/debounce';
export default {
  setup() {
    const app = getCurrentInstance().appContext.config.globalProperties;
    const router = useRouter();
    const store = useStore();
    //定义变量
    const page = reactive({
      pageIndex: 1,
      pageSize: 5,
      searchKey: '',
      status: '1'
    })
    const list = ref([]);
    const pageTotal = ref(0);
    const userInfo = computed(() => store.state.user.userInfo);
    //定义函数
    async function articleList() {
      const temp = toRaw(page);
      const result = await getArticleList(temp);
      list.value = result.list;
      pageTotal.value = Math.ceil(result.total / temp.pageSize);
    }

    function pageTo(action, index) {
      switch (action) {
        case 'first':
          if (page.pageIndex > 1) {
            page.pageIndex = 1;
            articleList();
          }
          break;
        case 'prev':
          if (page.pageIndex > 1) {
            page.pageIndex--;
            articleList();
          }
          break;
        case 'page':
          if (page.pageIndex != (index + 1)) {
            page.pageIndex = (index + 1);
            articleList();
          }
          break;
        case 'next':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex++;
            articleList();
          }
          break;
        case 'last':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex = toRaw(pageTotal);
            articleList();
          }
          break;
      }
    }

    function changeRecommondStatus(index) {
      debounce(async () => {
        let temp = toRaw(list.value)[index];
        await changeRecommond({ id: temp.id, recommond: temp.recommond });
        app.$toast.success("更改推荐状态成功！");
      }, 300);
    }

    function deleteArticleItem(id) {
      app.$message.dangerMessage({
        content: '确定删除该文章?',
        success: async () => {
          await deleteArticle({ id });
          await articleList();
          app.$toast.success("删除文章成功！");
        }
      })
    }

    function addArticle(e, id) {
      const obj = { path: '/write' };
      if (id) {
        obj.query = {
          id
        }
      }
      router.push(obj);
    }

    async function inputArticle() {
      debounce(() => {
        page.pageIndex = 1;
        page.pageSize = 5;
        page.searchKey = page.searchKey.trim();
        articleList();
      }, 300);
    }

    async function publishArticle(id) {
      await updateArticleStatus(id);
      app.$toast.success("文章发布成功！");
      page.status = '1';
      await articleList();
    }

    //执行函数
    articleList();
    return {
      list,
      pageTotal,
      page,
      pageTo,
      formatTime: computed(() => ((date) => dayjs(date).format('YYYY-MM-DD HH:mm'))),
      userInfo,
      changeRecommondStatus,
      deleteArticleItem,
      addArticle,
      inputArticle,
      articleList,
      publishArticle
    }
  }
}
</script>

