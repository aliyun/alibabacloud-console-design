import { IFastLoginOptions } from './type';
import { ENV } from './env';

let fastLoginClient: typeof window.FastLogin = null;

const loadFastLoginScripts = (options: IFastLoginOptions): Promise<typeof window.FastLogin> => {
  const env = options.env || 'prod';
  const fastLoginUrl = ENV[env] || ENV.prod;

  /* eslint-disable no-undef */
  return new Promise((resolve, reject) => {
    if (fastLoginClient) {
      resolve(fastLoginClient);
      return;
    }

    const script = document.createElement('script');

    script.onload = () => {
      fastLoginClient = window.FastLogin;
      // 必填
      // @ts-ignore
      window.FastLoginContext = {
        tenantName: "console" 
      };
      resolve(fastLoginClient)
    }

    script.onerror = () => {
      reject(new Error('script load fail'))
    }

    script.src = fastLoginUrl;

    document.body.appendChild(script);
  });
}


const open = async (options: IFastLoginOptions) => {
  const fastLogin = await loadFastLoginScripts(options);

  return new Promise<void>((resolve) => {
    fastLogin('show', [{
      loginCallback: () => {
        resolve();
      }
    }])
  })
}

const render = async (options: IFastLoginOptions) => {
  const fastLogin = await loadFastLoginScripts(options);
  fastLogin('render', [{}])
}


export {
  open,
  render,
}