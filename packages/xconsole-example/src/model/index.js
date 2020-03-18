import { model, createService } from '@alicloud/xconsole';

import DescribeIteration from './service/DescribeIteration';
import DescribeIterations from './service/DescribeIterations';


import DescribeApp from './service/DescribeApp';
import DescribeApps from './service/DescribeApps';

import DescribePublish from './service/DescribePublish';
import DescribeDeployment from './service/DescribeDeployment';
import DescribePublishes from './service/DescribePublishes';
import ListPagedDeployment from './service/ListPagedDeployment';

import ListPackages from './service/ListPackages';


import CreateProject from './service/CreateProject';
import CreateApp from './service/CreateApp';
import CreateIteration from './service/CreateIteration';
import CreateDailyPublish from './service/CreateDailyPublish';
import CreateDailyDeploy from './service/CreateDailyDeploy';
import CreateOnlineDeploy from './service/CreateOnlineDeploy';


import DescribeOnlineDeploies from './service/DescribeOnlineDeploies';
import DescribeDailyDeploies from './service/DescribeDailyDeploies';

import DescribeIsvDashBoardInfo from './service/DescribeIsvDashBoardInfo';
import DescribeIsvErrorLogsNumber from './service/DescribeIsvErrorLogsNumber';

import CustomRequest from './service/CustomRequest';

import {
  EAppType,
} from '~/constants'

const PRODUCT = 'consolebench';

// 根据当前登录用户，查询 ISV 信息
export const GetIsvInfo = async (variables) => {
  const result = await createService(
    PRODUCT,
    'DescribeIsv'
  )(variables)
  return result || {}
}


// 创建项目
export const AddProject = model({
  service: async (variables) => {
    const result = await CreateProject(variables)
    return result
  },
})
// 获取项目列表
export const GetProjects = model({
  service: async (variables) => {
    const result = await createService(
      PRODUCT,
      'DescribeProjects'
    )(variables)
    return result || {}
  },
})
// 获取项目详情
export const GetPojectDetail = model({
  service: async (variables) => {
    const result = await createService(
      PRODUCT,
      'DescribeProject'
    )(variables)
    return result || {}
  },
})


// 创建 APP
export const AddApp = model({
  service: async (variables) => {
    const result = await CreateApp(variables)
    return result
  },
})
// 获取 app 列表
export const GetApps = model({
  service: async (variables) => {
    const result = await DescribeApps(variables)
    return result
  },
})
// 获取 app 详情
export const GetAppDetail = model({
  service: async (variables) => {
    const result = await DescribeApp(variables);
    return result || {}
  },
})


// 创建迭代
export const AddIteration = model({
  service: async (variables) => {
    const result = await CreateIteration(variables)
    return result
  },
})
// 获取迭代列表
export const GetIterations = model({
  service: async (variables) => {
    const result = await DescribeIterations(variables);
    return result
  },
});
// 获取迭代详情
export const GetIterationDetail = model({
  service: async (variables) => {
    const result = await DescribeIteration(variables);
    return result || {}
  },
});


// 创建发布构建
export const AddDailyPublish = model({
  service: async (variables) => {
    const result = await CreateProject(variables)
    return result
  },
})
// 获取日常发布部署列表
export const GetDailyPublishes = model({
  service: async (variables) => {
    let result = {};
    if (variables.appDetail && variables.appDetail.type === EAppType.BACKEND) {
      result = await DescribePublishes(variables)
    } else {
      result = await ListPagedDeployment(variables)
    }
    // TODO 需要对两种数据做统一处理
    return result;
  },
})
// 获取某个迭代下的指定发布部署或最新发布部署
export const GetDailyPublishDetail = model({
  service: async (variables) => {
    let result = {};

    if (variables.appDetail && variables.appDetail.type === EAppType.BACKEND) {
      result = await DescribePublish(variables)
    } else {
      result = await DescribeDeployment(variables)
    }
    // TODO 需要对两种数据做统一处理
    return result
  },
})


// 创建日常环境部署
export const AddDailyDeploy = model({
  service: async (variables) => {
    const result = await CreateProject(variables)
    return result
  },
})
// 获取日常发布部署列表
export const GetDailyDeploies = model({
  service: async (variables) => {
    let result = {};
    if (variables.appDetail && variables.appDetail.type === EAppType.BACKEND) {
      result = await DescribeDailyDeploies(variables)
    } else {
      result = await ListPagedDeployment(variables)
    }
    // TODO 需要对两种数据做统一处理
    return result;
  },
})
// 获取某个迭代下的指定发布部署或最新发布部署
export const GetDailyDeployDetail = model({
  service: async (variables) => {
    let result = {};

    if (variables.appDetail && variables.appDetail.type === EAppType.BACKEND) {
      result = await DescribePublish(variables)
    } else {
      result = await DescribeDeployment(variables)
    }
    // TODO 需要对两种数据做统一处理
    return result
  },
})


// 创建线上环境部署
export const AddOnlineDeploy = model({
  service: async (variables) => {
    const result = await CreateProject(variables)
    return result
  },
})
// 获取线上环境部署列表
export const GetOnlineDeploies = model({
  service: async (variables) => {
    const result = await DescribeOnlineDeploies(variables);
    return result
  },
})
// 获取线上环境部署详情
export const GetOnlineDeployDetail = model({
  service: async (variables) => {
    const result = await DescribePublishes(variables);
    return result
  },
})

// 获取线上环境可部署迭代列表
export const GetOnlineDeployVersions = model({
  service: async (variables) => {
    const result = await createService(
      PRODUCT,
      'ListPackages'
    )({ status: 2, ...variables })

    return result
  },
})


// 仅针对后端，回滚部署
export const RollbackDeploy = model({
  service: async (variables) => {
    const result = await createService(
      PRODUCT,
      'AddRollback'
    )(variables)
    return result
  },
})
// 仅针对后端，取消部署
export const CancelDeploy = model({
  service: async (variables) => {
    const result = await createService(
      PRODUCT,
      'CancelDeployment'
    )(variables)
    return result
  },
})
// 仅针对后端，继续部署
export const ResumeDeploy = model({
  service: async (variables) => {
    const result = await createService(
      PRODUCT,
      'ResumeDeployment'
    )(variables)
    return result
  },
})
// 仅针对后端，重试部署
export const RetryDeploy = model({
  service: async (variables) => {
    const result = await createService(
      PRODUCT,
      'RetryDeploy'
    )(variables)
    return result
  },
})


export const GetIsvSlsUrl = model({
  service: async (variables) => {
    const result = await DescribeIsvDashBoardInfo();
    return result
  },
})

// CustomRequest()
