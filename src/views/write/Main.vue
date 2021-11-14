<template>
  <div>
    <div class="intro-y flex flex-wrap items-center mt-3">
      <h2 class="text-lg font-medium whitespace-nowrap mr-auto mb-3">编写文章</h2>
      <div class="w-full sm:w-auto flex mb-3">
        <button v-if="showReset" class="btn btn-danger mr-4 whitespace-nowrap" @click="resetArticle">
          <RotateCwIcon class="w-4 h-4 mr-1" />重置
        </button>
        <button class="whitespace-nowrap btn box text-gray-700 dark:text-gray-300 mr-3 flex items-center ml-auto sm:ml-0" @click="submitArticle('save')">
          <SaveIcon class="w-4 h-4 mr-1" />保存
        </button>
        <button class="whitespace-nowrap dropdown-toggle btn btn-primary shadow-md flex items-center" @click="submitArticle('publish')">
          <UploadCloudIcon class="w-4 h-4 mr-1" />发布
        </button>
      </div>
    </div>
    <div class="pos intro-y grid grid-cols-12 gap-5 mt-2">
      <!-- BEGIN: Post Content -->
      <div class="intro-y col-span-12">
        <input type="text" class="intro-y form-control py-3 px-4 box pr-10 placeholder-theme-13" placeholder="标题" v-model="title" />
        <div class="post intro-y overflow-hidden box mt-5">
          <div class="post__content tab-content">
            <div id="content" class="tab-pane sm:p-5 active" role="tabpanel" aria-labelledby="content-tab">
              <div class="md:border border-gray-200 dark:border-dark-5 md:rounded-md md:p-5">
                <div class="font-medium flex items-center border-b border-gray-200 dark:border-dark-5 p-5 sm:p-0 sm:pb-5">
                  正文
                </div>
                <div class="sm:mt-5 overflow-hidden sm:overflow-visible">
                  <v-md-editor mode="edit" v-model="content" :disabled-menus="[]" height="500px" @change="getSimpleContent" @upload-image="handleUploadImage" />
                </div>
              </div>
              <div class="border border-gray-200 dark:border-dark-5 rounded-md p-5 sm:mt-5">
                <label for="post-form-3" class="form-label">次分类</label>
                <select id="post-form-3" class="form-select" v-model="secondaryCategoryId" aria-label="Default select example">
                  <option value="-1">请选择次分类</option>
                  <option :value="item.id" v-for="(item,index) of list" :key="index">{{item.name}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Post Content -->
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, ref, reactive, toRaw, toRefs } from "vue";
import { getSecondaryCategory, addArticle, getArticleInfo, updateArticle, uploadArticle } from "@/apis";
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
  setup() {
    const app = getCurrentInstance().appContext.config.globalProperties;
    const route = useRoute();
    const router = useRouter();
    let preData;
    const page = reactive({
      pageIndex: 1,
      pageSize: 99
    })
    const list = ref([]);
    const data = reactive({
      title: '',
      content: '',
      simpleContent: '',
      secondaryCategoryId: '-1'
    })

    async function secondaryCategory() {
      const temp = toRaw(page);
      const result = await getSecondaryCategory(temp);
      list.value = result.list;
    }

    async function submitArticle(type) {
      if (!data.title) {
        return app.$toast.danger("请输入标题！");
      }
      if (!data.content) {
        return app.$toast.danger("请输入内容！");
      }
      if (!data.simpleContent) {
        return app.$toast.danger("请输入内容！");
      }
      if (!Number(data.secondaryCategoryId) || Number(data.secondaryCategoryId) < 0) {
        return app.$toast.danger("请选择次分类！");
      }
      let status = type == 'publish';

      if (route.query.id) {
        await updateArticle({
          status,
          ...toRaw(data)
        })
        app.$toast.success("更改文章成功！");
      } else {
        await addArticle({
          status,
          ...toRaw(data)
        })
        app.$toast.success("添加文章成功！");
      }
      router.back();
    }

    //获取元数据
    async function getArticle(id) {
      preData = await getArticleInfo(id);
      data.id = preData.id;
      data.title = preData.title;
      data.content = preData.content;
      data.simpleContent = preData.simpleContent;
      data.secondaryCategoryId = preData.secondaryCategoryId;
    }

    //重制数据
    function resetArticle() {
      data.id = preData.id;
      data.title = preData.title;
      data.content = preData.content;
      data.simpleContent = preData.simpleContent;
      data.secondaryCategoryId = preData.secondaryCategoryId;
    }

    function getSimpleContent(text, html) {
      data.simpleContent = html;
    }

    async function handleUploadImage(event, insertImage, files) {
      let formData = new FormData();
      formData.append('picture', files[0]);
      let url = await uploadArticle(formData);
      // 此处只做示例
      insertImage({
        url,
        desc: '文章图片',
        width: '300',
        height: 'auto',
      });
    }

    if (route.query.id) {
      getArticle(route.query.id);
    }

    secondaryCategory();
    return {
      list,
      showReset: !!route.query.id,
      submitArticle,
      resetArticle,
      getSimpleContent,
      handleUploadImage,
      ...toRefs(data)
    };
  }
});
</script>
