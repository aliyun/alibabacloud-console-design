import { model, createService } from '@alicloud/xconsole';

export const GET_GROUPS = model({
  service: async (variables) => {
    const result = await createService(
      'wind-demo',
      'ListGroups'
    )(variables);
    return result;
  },
});

export const GET_LOGIN_INFO = model({
  service: async (variables) => {
    const result = await createService(
      'wind-demo',
      'GetLoginProfile'
    )(variables);
    return result;
  },
});

export const GET_USER = model({
  service: async (variables) => {
    const result = await createService(
      'wind-demo',
      'GetUser'
    )(variables);
    return result;
  },
});

export const GET_AK_LIST = model({
  service: async (variables) => {
    const result = await createService(
      'wind-demo',
      'ListAccessKeys'
    )(variables);
    return result;
  },
});
