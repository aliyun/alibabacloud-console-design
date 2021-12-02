import { IFastLoginOptions, ILoginCallbackProps } from './type';
import { ENV } from './env';

const loadFastLoginScripts = (options: IFastLoginOptions): Promise<typeof window.FastLogin> => {
  const env = options.env || 'prod';
  const fastLoginUrl = ENV[env] || ENV.prod;

  /* eslint-disable no-undef */
  return new Promise((resolve, reject) => {
    if (window.FastLogin) {
      resolve(window.FastLogin);
      return;
    }

    const script = document.createElement('script');

    script.onload = () => {
      // @ts-ignore
      window.FastLoginContext = {
        tenantName: "console" 
      };
      resolve(window.FastLogin)
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

  return new Promise<ILoginCallbackProps>((resolve, reject) => {
    fastLogin('show', [{
      loginCallback: (result) => {
        if (result.success) {
          resolve(result);
        } else {
          reject(result)
        }
      }
    }])
  })
}

const render = async (options: IFastLoginOptions) => {
  const fastLogin = await loadFastLoginScripts(options);
  return new Promise<ILoginCallbackProps>((resolve, reject) => {
    fastLogin('render', [{
      // @ts-ignore
      type: "one_login", // one_login, password, qr
      loginCallback: (result) => {
        if (result.success) {
          resolve(result);
        } else {
          reject(result)
        }
      }
    }])
  })
}

const unmount = async (options: IFastLoginOptions) => {
  const fastLogin = await loadFastLoginScripts(options);
  fastLogin('unmountDialog', [{}])
}


export {
  open,
  render,
  unmount,
}