import React, {
  ReactNode,
  ReactElement,
  useState,
  useContext
} from '@alicloud/xconsole/react';
import { WidgetLoadManagementContext } from '@alicloud/xconsole-widget-load-management'


interface ILoadOptions {

}
export interface IProps {
  id: string;
  version: string;
  loadOptions?: ILoadOptions;
  props: {
    [key: string]: any;
  };
}

const XconsoleRcWidget = ({
  id,
  version,
  loadOptions,
  props,
}: IProps): ReactElement => {

  const { loadWidget, setWidgetLoader } = useContext(WidgetLoadManagementContext);



  const [Widget] = useState(() => (loadWidget({
    id,
    version,
    loadOptions,
  })));

  console.log("Widget", Widget);

  return <Widget {...props} />;
}

export default XconsoleRcWidget;

