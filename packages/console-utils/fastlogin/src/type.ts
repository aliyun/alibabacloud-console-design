export interface IFastLoginOptions {
  env?: 'prod' | 'prepub';
  target?: HTMLElement;
  height?:  number;
  width?:  number;
}

export interface ILoginCallbackProps {
  success: string;
  type: "password" | "qr";
  uuid: string; // 创建出来 IFrame 对应的 uuid
}

export interface IFastLoginProps {
  targetId?: string;
  target?: HTMLElement;
  loginCallback?: (data: ILoginCallbackProps) => void;
}

declare global {
  interface Window {
    FastLogin: (method: 'render' | 'show' | 'unmountDialog', [props]: [IFastLoginProps]) => void;
  }
}