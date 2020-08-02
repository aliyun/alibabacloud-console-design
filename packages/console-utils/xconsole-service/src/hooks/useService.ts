import useSWR, { responseInterface } from 'swr';
import createService from '../service';
import { IOptions, ApiType } from '../types';

const useService = <D, E = any>(
  product: string,
  action: string,
  options: IOptions,
  params: any,
  overlap?: boolean
): responseInterface<D, E> => {
  const requestService = createService(product, action, {
    apiType: ApiType.custom,
    ...options,
  });
  return useSWR<D, E>(
    JSON.stringify({
      product,
      action,
      params,
    }),
    () => requestService<D>(params, overlap),
    {}
  );
};

export const useOpenApi = <D, E = any>(
  product: string,
  action: string,
  params?: any,
  options?: Omit<IOptions, 'apiType'>
): responseInterface<D, E> =>
  useService(product, action, { ...options, apiType: ApiType.open }, params);

export const useInnerApi = <D, E = any>(
  product: string,
  action: string,
  params?: any,
  options?: Omit<IOptions, 'apiType'>
): responseInterface<D, E> =>
  useService(product, action, { ...options, apiType: ApiType.inner }, params);

export const usePluginApi = <D, E = any>(
  product: string,
  action: string,
  params?: any,
  options?: Omit<IOptions, 'apiType'>
): responseInterface<D, E> =>
  useService(product, action, { ...options, apiType: ApiType.plugin }, params);

export const useAppApi = <D, E = any>(
  product: string,
  action: string,
  params?: any,
  options?: Omit<IOptions, 'apiType'>
): responseInterface<D, E> =>
  useService(product, action, { ...options, apiType: ApiType.plugin }, params);

export default useService;
