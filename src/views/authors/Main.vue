<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-5">作者管理</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 flex flex-wrap justify-between sm:flex-nowrap items-start">
        <button class="btn btn-primary shadow-md mr-2 whitespace-nowrap mb-3" @click="addAuthor">
          添加作者
          <PlusIcon class="w-5 h-5 ml-1" />
        </button>
        <div class="w-56 relative text-gray-700 dark:text-gray-300">
          <input type="text" class="form-control w-56 box pr-10 placeholder-theme-13" placeholder="搜索作者" v-model="page.searchKey" @input="inputAuthor" />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>
      <!-- BEGIN: Users Layout -->
      <div v-for="(item,index) in list" :key="index" class="intro-y col-span-12 md:col-span-6">
        <div class="box">
          <div class="flex flex-col lg:flex-row items-center p-5">
            <div class="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
              <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="item.avatar" />
            </div>
            <div class="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
              <a href="" class="font-medium">{{ item.nickname }}</a>
              <div class="text-gray-600 text-xs mt-0.5">
                {{ item.email }}
              </div>
            </div>
            <div class="flex mt-4 lg:mt-0">
              <button class="btn btn-secondary py-1 px-2 mr-2" @click="addAuthor($event,item.id)">编辑</button>
              <button class="btn btn-danger py-1 px-2" @click="deleteAuthorPage(item.id)">删除</button>
            </div>
          </div>
        </div>
      </div>
      <!-- BEGIN: Users Layout -->
      <!-- END: Pagination -->
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
import { getAuthors, deleteAuthor } from '@/apis';
import { reactive, toRaw, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import debounce from '@/utils/debounce';

export default {
  setup() {
    //定义变量
    const app = getCurrentInstance().appContext.config.globalProperties;
    const router = useRouter();
    const page = reactive({
      pageIndex: 1,
      pageSize: 5,
      searchKey: ''
    })
    const list = ref([]);
    const pageTotal = ref(0);
    //定义函数
    async function authors() {
      const temp = toRaw(page);
      const result = await getAuthors(temp);
      list.value = result.list;
      pageTotal.value = Math.ceil(result.total / temp.pageSize);
    }

    function pageTo(action, index) {
      switch (action) {
        case 'first':
          if (page.pageIndex > 1) {
            page.pageIndex = 1;
            authors();
          }
          break;
        case 'prev':
          if (page.pageIndex > 1) {
            page.pageIndex--;
            authors();
          }
          break;
        case 'page':
          if (page.pageIndex != (index + 1)) {
            page.pageIndex = (index + 1);
            authors();
          }
          break;
        case 'next':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex++;
            authors();
          }
          break;
        case 'last':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex = toRaw(pageTotal);
            authors();
          }
          break;
      }
    }

    async function inputAuthor() {
      debounce(() => {
        page.pageIndex = 1;
        page.pageSize = 5;
        page.searchKey = page.searchKey.trim();
        authors();
      }, 300);
    }

    function addAuthor(e, id) {
      const obj = { path: '/addAuthor' };
      if (id) {
        obj.query = {
          id
        }
      }
      router.push(obj);
    }

    async function deleteAuthorPage(id) {
      app.$message.dangerMessage({
        content: '确定删除该分类，并且该分类的文章也会删除?',
        success: async () => {
          await deleteAuthor({ id });
          page.pageIndex = 1;
          page.pageSize = 5;
          page.searchKey = page.searchKey.trim();
          await authors();
          app.$toast.success("删除分类成功！");
        }
      })
    }

    //执行函数
    authors();
    return {
      list,
      pageTotal,
      page,
      pageTo,
      inputAuthor,
      addAuthor,
      deleteAuthorPage
    }
  }
}
</script>
