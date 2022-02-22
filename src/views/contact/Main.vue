<template>
  <div>
    <div v-if="list.length" class="grid grid-cols-12 gap-6 mt-5">
      <!-- BEGIN: Users Layout -->
      <div v-for="(item,index) in list" :key="index" class="intro-y col-span-12 md:col-span-6 lg:col-span-4">
        <div class="box">
          <div class="flex items-start p-5">
            <div class="w-full">
              <div class="mt-2 lg:mt-0">
                <div class="font- medium">昵称：{{ item.nickname }}</div>
                <div class="font-medium">邮箱：{{ item.email }}</div>
                <p class="text-gray-600 text-sm mt-4">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center py-3 px-5 border-t border-gray-200 dark:border-dark-5">
            <span>{{formatTime(item.time)}}</span>
            <button class="btn btn-danger py-1 px-4" @click="deleteMessage(item.id)">删除</button>
          </div>
        </div>
      </div>
      <!-- END: Users Layout -->
      <!-- BEGIN: Pagination -->
      <div v-if="pageTotal>1" class="intro-y col-span-12 mt-4 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
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
    <div v-else class="text-gray-600 text-center text-lg my-6">
      暂无留言
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, ref, reactive, toRaw } from "vue";
import { deleteContact, getMessage } from "@/apis";
export default defineComponent({
  setup() {
    const app = getCurrentInstance().appContext.config.globalProperties;
    const page = reactive({
      pageIndex: 1,
      pageSize: 5
    })
    const pageTotal = ref(0);
    const list = ref([]);

    async function getMessages() {
      const temp = toRaw(page);
      const result = await getMessage(temp);
      list.value = result.list;
      pageTotal.value = Math.ceil(result.total / temp.pageSize);
    }

    function pageTo(action, index) {
      switch (action) {
        case 'first':
          if (page.pageIndex > 1) {
            page.pageIndex = 1;
            getMessages();
          }
          break;
        case 'prev':
          if (page.pageIndex > 1) {
            page.pageIndex--;
            getMessages();
          }
          break;
        case 'page':
          if (page.pageIndex != (index + 1)) {
            page.pageIndex = (index + 1);
            getMessages();
          }
          break;
        case 'next':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex++;
            getMessages();
          }
          break;
        case 'last':
          if (page.pageIndex < pageTotal.value) {
            page.pageIndex = toRaw(pageTotal);
            getMessages();
          }
          break;
      }
    }

    function deleteMessage(id) {
      app.$message.dangerMessage({
        content: '确定删除该条留言?',
        success: async () => {
          await deleteContact({ id });
          page.pageIndex = 1;
          page.pageSize = 5;
          await getMessages();
          app.$toast.success("删除留言成功！");
        }
      })
    }

    getMessages();

    return {
      list,
      pageTotal,
      page,
      formatTime: computed(() => ((date) => dayjs(date).format('YYYY-MM-DD HH:mm'))),
      pageTo,
      deleteMessage
    };
  }
});
</script>
