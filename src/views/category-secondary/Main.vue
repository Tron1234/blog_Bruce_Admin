<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-5">文章主分类</h2>
    <div class="grid grid-cols-4 gap-6 mt-5">
      <div class="intro-y col-span-4 flex flex-wrap justify-between items-center">
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
      <div class="intro-y col-span-4 overflow-auto lg:overflow-visible -mt-6">
        <table class="table table-report">
          <thead>
            <tr>
              <th class="whitespace-nowrap">分类编号</th>
              <th class="whitespace-nowrap">分类名称</th>
              <th class="whitespace-nowrap">主分类名称</th>
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
              <td>
                <span class="font-medium whitespace-nowrap">{{
                  item.majorName
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
import { getSecondaryCategory,deleteSecondaryCategory } from '@/apis';
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
    async function secondaryCategory() {
      const temp = toRaw(page);
      const result = await getSecondaryCategory(temp);
      list.value = result.list;
      pageTotal.value = Math.ceil(result.total / temp.pageSize);
    }

    function pageTo(action, index) {
      switch (action) {
        case 'first':
          if (page.pageIndex > 1) {
            page.pageIndex = 1;
            secondaryCategory();
          }
          break;
        case 'prev':
          if (page.pageIndex > 1) {
            page.pageIndex--;
            secondaryCategory();
          }
          break;
        case 'page':
          if (page.pageIndex != (index + 1)) {
            page.pageIndex = (index + 1);
            secondaryCategory();
          }
          break;
        case 'next':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex++;
            secondaryCategory();
          }
          break;
        case 'last':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex = toRaw(pageTotal);
            secondaryCategory();
          }
          break;
      }
    }

    async function inputCategory() {
      debounce(() => {
        page.pageIndex = 1;
        page.pageSize = 5;
        page.searchKey = page.searchKey.trim();
        secondaryCategory();
      }, 300);
    }

    async function deleteCategory(id) {
      app.$message.dangerMessage({
        content: '确定删除该分类，并且该分类的文章也会删除?',
        success: async () => {
          await deleteSecondaryCategory({ id });
          list.value = list.value.filter(item => item.id != id);
          app.$toast.success("删除分类成功！");
        }
      })
    }

    function addCategory(e, id) {
      const obj = { path: '/addSecondaryCategory' };
      if (id) {
        obj.query = {
          id
        }
      }
      router.push(obj);
    }

    //执行函数
    secondaryCategory();
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
