import { useState, useCallback, useRef } from 'react';
import useSWR, { ConfigInterface } from 'swr';

export interface IResponse<Item> {
  loading: boolean;
  data?: Item[];
  reload: () => void;
  loadNext: () => void;
  loadPrev: () => void;
  setPageSize: (arg: number) => void;
  setMaxResults: (arg: number) => void;
  total: number | undefined;
}

export interface IOptions<Result, Item> {
  Page?: number;
  PageSize?: number;
  NextToken?: string;
  MaxResults?: number;
  formatResult?: (
    x: Result
  ) => {
    total: number;
    data: Item[];
  };
  swrConfig?: ConfigInterface;
}

export interface IFnParams {
  page?: number;
  pageSize?: number;
  nextToken?: string;
  maxResults?: number;
  startTime?: number;
}

export default function useList<Result = any, Item = any>(
  fn: (params: IFnParams) => Promise<Result>,
  options: IOptions<Result, Item>
): IResponse<Item> {
  const {
    Page,
    PageSize,
    NextToken,
    MaxResults,
    formatResult,
    swrConfig,
  } = options;

  const useNextToken = typeof NextToken === 'string';
  const prevNT = useRef(''); // 上一次的 nextToken, '' 表示从头开始加载
  const curNT = useRef((useNextToken ? NextToken : '') || ''); // 本次的 nextToken, '' 表示从头开始加载
  const nextNT = useRef(''); // 下一次的nextToken, '' 表示加载完

  const [page, setPage] = useState<number>(Page || 1);
  const [pageSize, setPageSize] = useState(PageSize || 10);
  const [nextToken, setNextToken] = useState(NextToken || '');
  const [maxResults, setMaxResults] = useState(MaxResults || 10);
  const pageTotal = useRef<number | undefined>(undefined);

  /* 开始的时间戳 */
  const startTime = useRef(new Date().getTime());

  const fetcher = (
    page: number,
    pageSize: number,
    nextToken: string,
    maxResults: number,
    startTime: number
  ) => {
    if (useNextToken) {
      prevNT.current = curNT.current;
      curNT.current = nextToken;
      nextNT.current = nextToken;
    }
    return fn({ page, pageSize, nextToken, maxResults, startTime }).then(
      (result) => {
        if (!result) return;

        const { total, nextToken, data } = (formatResult
          ? formatResult(result)
          : result) as any;
        if (total) pageTotal.current = total;
        if (useNextToken) nextNT.current = nextToken;

        return data as Item[];
      }
    );
  };
  const { data, isValidating: loading, mutate } = useSWR<
  Item[] | undefined,
  any
  >([page, pageSize, nextToken, maxResults, startTime], fetcher, {
    ...swrConfig,
  });

  const loadNext = useCallback(() => {
    if (pageTotal.current && pageTotal.current <= page * pageSize) {
      return;
    }
    if (useNextToken) {
      setNextToken(nextNT.current);
    } else {
      setPage((page) => page + 1);
    }
  }, []);

  const loadPrev = useCallback(() => {
    if (useNextToken) {
      setNextToken(prevNT.current);
    } else {
      if (page - 1 > 0) {
        return;
      }
      setPage((page) => page - 1);
    }
  }, []);

  return {
    data,
    loading,
    reload: mutate,
    loadNext,
    loadPrev,
    setPageSize,
    setMaxResults,
    total: pageTotal.current,
  };
}
