import Message from '@/components/message';

export default {
  install: (app) => {
    app.config.globalProperties.$message = Message;
  }
}

export let message = Message;