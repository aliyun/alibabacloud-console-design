import {
  DependencyList,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';

class Timer<T> {
  private remaining = 0;

  private delay = 0;

  private cb: ((...args: any[]) => Promise<T | undefined>) | null = null;

  private start = 0;

  private timerId: any = 0;

  public constructor(cb: () => Promise<T | undefined>, delay: number) {
    this.remaining = delay;
    this.delay = delay;
    this.start = delay;
    this.timerId = delay;
    this.cb = cb;
  }

  public stop = () => {
    clearTimeout(this.timerId);
    this.timerId = 0;
    this.remaining = this.delay;
  };

  public pause = () => {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  };

  public resume = (...args: any[]): Promise<T> | undefined => {
    this.start = Date.now();
    clearTimeout(this.timerId);
    if (this.cb) {
      /* eslint-disable no-undef */
      return new Promise<T>((resolve) => {
        this.timerId = setTimeout(async () => {
          if (this.cb) {
            this.cb(...(args || []));
            // resume 只触发定时器开始计时，没有返回结果
            resolve(
              'No resolve value when pollingInterval is set, please use onSuccess & onError instead' as any
            );
          }
        }, this.remaining);
      });
    }
    return undefined;
  };
}

export interface Options<T> {
  manual?: boolean; // 是否初始化执行
  pollingInterval?: number; // 轮询的间隔毫秒
  onSuccess?: (d: T) => void; // 成功回调
  onError?: (e: Error) => void; // 失败回调
}

type noop = (...args: any[]) => void;
const noop: noop = () => {/**/};

type promiseReturn<P, T> = (arg0?: P, ...args: any[]) => Promise<T | undefined>;
const promiseReturn: promiseReturn<any, any> = async () => null as any;

export interface ReturnValue<P, T> {
  loading: boolean;
  error?: Error;
  data?: T;
  cancel: noop;
  /**当次执行的 service 的参数数组*/
  params?: any[];
  run: promiseReturn<P, T | undefined>;
  /**使用上一次的 params，重新调用 run */
  refresh: () => void;
  timer: {
    stop: noop;
    resume: noop;
    pause: noop;
  };
}

export default function useAsync<P = any, Result = any>(
  fn: (...args: any[]) => Promise<Result>,
  deps: DependencyList = [],
  options: Options<Result> = {}
): ReturnValue<P, Result> {
  const [state, set] = useState<ReturnValue<P, Result>>({
    loading: false,
    cancel: noop,
    run: promiseReturn,
    params: [],
    refresh:noop,
    timer: {
      stop: noop,
      resume: promiseReturn,
      pause: noop,
    },
  });
  const timer = useRef<Timer<Result> | undefined>(undefined);
  const count = useRef(0);
  const init = useRef(true);

  useEffect(() => {
    count.current += 1;
    init.current = true;
    return () => {
      count.current += 1;
    };
  }, deps);

  const run = useCallback((...args: any[]): Promise<Result | undefined> => {
    // 确保不会返回被取消的结果
    const runCount = count.current;
    set((s) => ({ ...s, loading: true,params:args }));
    return fn(...args)
      .then((data) => {
        if (runCount === count.current) {
          if (options.onSuccess) {
            options.onSuccess(data);
          }
          if (runCount === count.current) {
            set((s) => ({ ...s, error: undefined, data, loading: false }));
          }
        }
        return data;
      })
      .catch((error) => {
        if (runCount === count.current) {
          if (options.onError) {
            options.onError(error);
          }
          if (runCount === count.current) {
            set((s) => ({ ...s, error, loading: false }));
          }
        }
        return error;
      });
  }, deps);


  const refresh = useCallback(() => {
    run(state.params||[]);
  }, []);

  const stop = useCallback(() => {
    count.current += 1;
    // 清除计时器
    if (timer.current) {
      timer.current.stop();
    }
    set((s) => ({ ...s, loading: false }));
  }, []);

  const pause = useCallback(() => {
    count.current += 1;
    // 暂停计时器
    if (timer.current) {
      timer.current.pause();
    }
    set((s) => ({ ...s, loading: false }));
  }, []);

  const resume = useCallback(
    async (...args: any[]): Promise<Result | undefined> => {
      // 恢复计时器
      if (timer.current) {
        return timer.current.resume(...(args || []));
      }
      return undefined;
    },
    [run]
  );

  const start = useCallback(
    async (...args: any[]): Promise<Result | undefined> => {
      // 执行并开启计时器
      await run(...(args || []));
      return resume(...(args || []));
    },
    [run]
  );

  const intervalAsync = useCallback(
    async (...args: any[]) => {
      const runCount = count.current;
      let ret: Result | undefined;
      if (!options.manual || !init.current) {
        ret = await run(...(args || []));
      }
      if (count.current === runCount) {
        // 只初始化定时器，不开始计时
        timer.current = new Timer<Result>(
          () => intervalAsync(...args),
          options.pollingInterval as number
        );
        // 如果设置了 manual，则默认不开始计时
        if (init.current && options.manual) {
          // await run(...(args || []));
          init.current = false;
        } else {
          // 开始计时
          ret = await timer.current.resume(...(args || []));
        }
      }
      return ret;
    },
    [options.pollingInterval, options.manual, run]
  );

  const reload = useCallback(
    (...args: any[]): Promise<Result | undefined> => {
      // 防止上次数据返回
      count.current += 1;
      if (options.pollingInterval) {
        if (!options.manual) {
          // 如果有 polling，清理上次的计时器
          stop();
        }
        return intervalAsync(...args);
      }
      // 直接运行
      return run(...(args || []));
    },
    [run, options.pollingInterval]
  );

  const cancel = useCallback(() => {
    count.current += 1;
    // throw an error
    set((s) => ({ ...s, loading: false }));
  }, []);

  useEffect(
    (...args: any[]) => {
      if (options.pollingInterval) {
        intervalAsync();
      } else if (!options.manual) {
        // 直接值行
        run(...(args || []));
      }

      return () => {
        count.current += 1;
        stop();
      };
    },
    [options.manual, options.pollingInterval, run, intervalAsync]
  );

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
    params:state.params,
    cancel,
    refresh,
    run: options.manual && options.pollingInterval ? start : reload,
    timer: {
      stop,
      resume,
      pause,
    },
  };
}
