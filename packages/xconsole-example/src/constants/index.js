export const ProjectApps = [
  { value: 10000, label: '用户门户前端' },
  { value: 10001, label: '用户侧服务' },
  { value: 10002, label: '离线账号服务' },
  { value: 10003, label: '离线数据服务' },
];

export const ROUTE_PREFIX = '/console-workbench';
export const ROUTERS = {
  HOME: `${ROUTE_PREFIX}/projects#home`,
  OVERVIEW: `${ROUTE_PREFIX}/projects#projects`,

  DASHBOARD: `${ROUTE_PREFIX}/dashboard`,

  PRODUCTS: `${ROUTE_PREFIX}/projects#projects`,
  PRODUCTS_NEW: `${ROUTE_PREFIX}/projects/new#projects/new`,

  DATA: `${ROUTE_PREFIX}/data#data`,
  DATA_ORDERS: `${ROUTE_PREFIX}/data/orders#data1`,
  DATA_DEVOPS: `${ROUTE_PREFIX}/data/devops#data2`,


  SETTINGS: `${ROUTE_PREFIX}/settings#settings`,
  SETTINGS_PROFILE: `${ROUTE_PREFIX}/settings/profile#settings1`,
  SETTINGS_ACCOUNT: `${ROUTE_PREFIX}/settings/account#settings2`,

  PROJECT: `${ROUTE_PREFIX}/p/{project}#p1`,
  APPLICATION: `${ROUTE_PREFIX}/p/{project}/app/{app}`,
  ITERATION: `${ROUTE_PREFIX}/p/{project}/app/{app}/iteration#p3`,
  ITERATION_DETAIL: `${ROUTE_PREFIX}/p/{project}/app/{app}/iteration/{iterationId}#p4`,
  DEPLOY: `${ROUTE_PREFIX}/p/{project}/app/{app}/deploy#p5`,
  DEPLOY_ADD: `${ROUTE_PREFIX}/p/{project}/app/{app}/deploy/add#p6`,
  DEPLOY_DETAIL: `${ROUTE_PREFIX}/p/{project}/app/{app}/deploy/{deployId}#p7`,

};

export const ERepoType = {
  GITLAB_ALIBABA_INC_COM: 0, // gitlab.alibaba-inc.com
  CODE_ALIYUN_COM: 0, // code.aliyun.com
}

export const EAppType = {
  FRONTEND: 1, // 前端
  BACKEND: 2, // 后端
  MINIAPP: 3, // APP小程序
}
export const EAppStatus = {
  DELETED: -1, // 已删除
  NORMAL: 1, // 正常
}

export const EIterationStatus = {
  PUBLISH_FAIL: -3, // 发布失败
  AUDIT_DISAPPROVED: -2, // 审核不通过
  DELETED: -1, // 废弃（逻辑删除）
  ONGOING: 0, // 进行中
  AUDITING: 1, // 待审核
  AUDIT_APPROVED: 2, // 审核通过
  PUBLISHING: 3, // 发布中
  DONE: 4, // 完成
}

export const EIterationPublishType = {
  DEV: 0, // 日常发布
  ONLINE: 1, // 线上发布
}

export const EIterationPublishNodeStatus = {
  FAILED: -1, // 失败
  IDLE: 0, // 未开始
  ONGOING: 1, // 进行中
  DONE: 2, // 完成
}

export const EIterationAuditStatus = {
  DISAPPROVED: -1, // 审核未通过
  IDLE: 0, // 未审核
  APPROVED: 1, // 审核通过
}

export const EDeploymentEnv = {
  DEV: 0, // 开发环境
  PROD: 1, // 生产环境
}

export const EDeploymentNodeStatus = {
  FAILED: -1, // 失败
  IDLE: 0, // 未开始
  ONGOING: 1, // 进行中
  DONE: 2, // 完成
}
