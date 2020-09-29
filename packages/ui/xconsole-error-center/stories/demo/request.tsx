import * as React from 'react';
import axios from 'axios';
import ErrorPrompt from '../../src/ErrorPrompt';

const promptError = async () => {
  try {
    await axios.get('/api.json');
  } catch(e) {
    ErrorPrompt({
      error: e,
      errorConfig: {
        title: "Error Title", // 弹窗标题
        message: "登录失效，请重新登录", // 弹窗信息，默认值为 error.message
        confirmLabel: "重新登录", // 确定按钮文案
        confirmHref: "https://aliyun.com", // 点击确定跳转的链接
        cancelLabel: "留在页面", // 取消按钮文案
        cancelHref: "https://aliyun.com" // 点击取消跳转的链接
      }
  })
  }
};

export default () => {
  return (
    <div>
      <button onClick={promptError}> show prompt </button>
    </div>
  )
}