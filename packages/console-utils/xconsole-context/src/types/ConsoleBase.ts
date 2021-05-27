export interface IToolkitItem {
  // 这个必须冗余，因为这个包会被 ts 的 ng 项目引用，不能引任何 rc 下的类型（它们没有 @types/react）
  id: string;
  label?:
  | string
  | {
    // 展示 label，优先级 icon > html > text（三者应有其一）
    icon?: 'survey' | 'qr'; // 预设的图标（问卷、二维码），考虑的是特别通用的场景
    html?: string; // 如果字符串或预设 icon 不能适用你的场景，可以自定义 HTML
    text?: string; // 跟 `label: string` 等价，文字尽可能少推荐 1 个汉字或 3 个以内英文字母
  };
  tooltip?:
  | string
  | {
    // text 和 html 必有其一
    html?: string; // 非纯文字
    text?: string; // 纯文字 `tooltip: { light: true, text }` 等价于 `tooltip: string`
    light?: boolean; // 白色背景，默认为黑色背景
    closable?: boolean; // 是否可关闭（会添加 X 按钮）
  };
  href?: string;
  target?: string;
  doActive?: boolean;
  active?: boolean;
  unread?: number;
}

export interface IPayloadLaunchTutorial {
  title?: string;
  contents: string[];
  width?: number;
  step?: number;
}

export interface IPayloadRegion {
  id: string;
  name: string;
  disabled?: boolean;
}

export interface IPayloadRegionOnChange extends IPayloadRegion {
  correctedFrom?: string;
}

export type TResourceCountMapping = Record<string, number>;

export interface IPayloadResourceGroup {
  id: string;
  name: string;
}

export interface IPayloadPutTool {
  tool: IToolkitItem;
}

/**
 * Fastbuy payload 类型定义
 */
export interface IPayloadFastbuy {
  commodityCode: string;
}
