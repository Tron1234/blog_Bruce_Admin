<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-5">文章主分类</h2>
    <div class="grid grid-cols-3 gap-6 mt-5">
      <div class="intro-y col-span-3 flex flex-wrap justify-between items-center">
        <button class="btn btn-primary shadow-md mr-2 mb-3" @click="addCategory">新增分类
          <PlusIcon class="w-5 h-5  ml-1" />
        </button>
        <div class="mb-3">
          <div class="w-56 relative text-gray-700 dark:text-gray-300">
            <input type="text" class="form-control w-56 box pr-10 placeholder-theme-13" placeholder="搜索分类" v-model="page.searchKey" @input="inputCategory" />
            <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
          </div>
        </div>
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-3 overflow-auto lg:overflow-visible -mt-6">
        <table class="table table-report">
          <thead>
            <tr>
              <th class="whitespace-nowrap">分类编号</th>
              <th class="whitespace-nowrap">分类名称</th>
              <th class="text-center whitespace-nowrap">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index" class="intro-x">
              <td>
                {{item.id}}
              </td>
              <td>
                <span class="font-medium whitespace-nowrap">{{
                  item.name
                }}</span>
              </td>
              <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                  <a class="flex items-center mr-3 whitespace-nowrap" href="javascript:;" @click="addCategory($event,item.id)">
                    <CheckSquareIcon class="w-4 h-4 mr-1" />
                    编辑
                  </a>
                  <a class="flex items-center text-theme-6 whitespace-nowrap" href="javascript:;" @click="deleteCategory(item.id)">
                    <Trash2Icon class="w-4 h-4 mr-1" /> 删除
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
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
import { getMajorCategory, deleteMajorCategory } from '@/apis';
import { reactive, toRaw, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import debounce from '@/utils/debounce';
export default {
  setup() {
    const app = getCurrentInstance().appContext.config.globalProperties;
    const router = useRouter();
    //定义变量
    const page = reactive({
      pageIndex: 1,
      pageSize: 5,
      searchKey: ''
    })
    const list = ref([]);
    const pageTotal = ref(0);
    //定义函数
    async function majorCategory() {
      const temp = toRaw(page);
      const result = await getMajorCategory(temp);
      list.value = result.list;
      pageTotal.value = Math.ceil(result.total / temp.pageSize);
    }

    function pageTo(action, index) {
      switch (action) {
        case 'first':
          if (page.pageIndex > 1) {
            page.pageIndex = 1;
            majorCategory();
          }
          break;
        case 'prev':
          if (page.pageIndex > 1) {
            page.pageIndex--;
            majorCategory();
          }
          break;
        case 'page':
          if (page.pageIndex != (index + 1)) {
            page.pageIndex = (index + 1);
            majorCategory();
          }
          break;
        case 'next':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex++;
            majorCategory();
          }
          break;
        case 'last':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex = toRaw(pageTotal);
            majorCategory();
          }
          break;
      }
    }

    async function inputCategory() {
      debounce(() => {
        page.pageIndex = 1;
        page.pageSize = 5;
        page.searchKey = page.searchKey.trim();
        majorCategory();
      }, 300);
    }

    async function deleteCategory(id) {
      app.$message.dangerMessage({
        content: '确定删除该分类，并且该分类的文章也会删除?',
        success: async () => {
          await deleteMajorCategory({ id });
          page.pageIndex = 1;
          page.pageSize = 5;
          page.searchKey = page.searchKey.trim();
          await majorCategory();
          app.$toast.success("删除分类成功！");
        }
      })
    }

    function addCategory(e, id) {
      const obj = { path: '/addMajorCategory' };
      if (id) {
        obj.query = {
          id
        }
      }
      router.push(obj);
    }

    //执行函数
    majorCategory();
    return {
      list,
      pageTotal,
      page,
      pageTo,
      inputCategory,
      addCategory,
      deleteCategory
    }
  }
}
</script>
