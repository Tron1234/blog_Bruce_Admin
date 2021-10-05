<template>
  <!-- model -->
  <div class="modal" :class="{'show':visible}" style="z-index:51" @click="onClose">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="p-5 text-center">
            <div class="text-3xl mt-5">{{config.title}}</div>
            <div class="text-gray-600 mt-2">
              {{config.content}}
            </div>
          </div>
          <div class="px-5 pb-8 text-center">
            <button type="button" v-if="config.isCancel" class="btn btn-outline-secondary w-24 dark:border-dark-5 dark:text-gray-300" :class="{'mr-4':config.isSure}" @click="cancelEmit">
              {{config.cancel}}
            </button>
            <button type="button" v-if="config.isSure" class="btn w-24" :class="'btn-'+btnClass" @click="confirmEmit">
              {{config.sure}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
export default {
  props: {
    config: { type: Object, default: () => { } },
    remove: { type: Function, default: () => { } }
  },
  setup(props) {
    const visible = ref(false);
    const btnClass = computed(() => {
      let temp;
      switch (props.config.type) {
        case 'normal':
          temp = 'primary';
          break;
        case 'danger':
          temp = 'danger';
          break;
        case 'right':
          temp = 'success';
          break;
      }
      return temp;
    })
    visible.value = true;
    const onClose = () => {
      visible.value = false;
      setTimeout(() => {
        props.remove()
      }, 400)
    }
    function cancelEmit() {
      let temp = props.config.isCancelExcept || false;
      if (temp) {
        if (props.config.fail) {
          props.config.fail(() => {
            onClose();
          });
        }
      } else {
        if (props.config.fail) {
          props.config.fail();
        }
        onClose();
      }
    }
    function confirmEmit() {
      let temp = props.config.isSureExcept || false;
      if (temp) {
        if (props.config.success) {
          props.config.success(() => {
            onClose();
          });
        }
      } else {
        if (props.config.success) {
          props.config.success();
        }
        onClose();
      }
    }
    return {
      visible,
      btnClass,
      onClose,
      cancelEmit,
      confirmEmit
    }
  }
}
</script>