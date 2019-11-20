import React, {
  ReactNode,
  ReactElement,
  useState,
} from 'react'
import createLoader, { ILoadOptions } from '@alicloud/console-widget-loader';

const loadWidget = createLoader();

export interface IProps {
  id: string;
  version: string;
  loadOptions?: ILoadOptions;
  props: {
    [key: string]: any;
  }
}

const ConsoleWidget = ({
  id,
  version,
  loadOptions,
  props,
}: IProps): ReactElement => {

  const [Widget] = useState(() => (loadWidget({
    id,
    version,
  }, loadOptions)));

  return <Widget {...props} />
}

export default ConsoleWidget