import ErrorCenter from './errorPrompt/index'

// 优化过的弹窗，不过不兼容之前API 所以单独独立出来
export { ErrorPrompt as ErrorPrompt2 } from './errorPrompt2';
export { default as ErrorCenter2 } from './errorPrompt2';

// legacy api
export { ErrorPrompt } from './errorPrompt';
export default ErrorCenter;

export * from './type'