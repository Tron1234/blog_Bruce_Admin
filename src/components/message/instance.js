import { createApp } from 'vue';
import message from './message.vue';

const createInstance = cfg => {
  const config = cfg || {};
  let messageNode = document.createElement('div');
  let attr = document.createAttribute("class")
  attr.value = "message-model"
  messageNode.setAttributeNode(attr)
  const app = createApp(message, {
    config,
    remove() {
      handleRemove()// 移除元素，消息关闭后从 Dom 上取消挂载并移除
    }
  })

  app.vm = app.mount(messageNode);
  document.body.appendChild(messageNode);

  const handleRemove = () => {
    //document.body.removeChild(messageNode)
    app.unmount(messageNode)
  }
  app.close = () => {
    handleRemove();
  }

  return app;
}

export default createInstance;