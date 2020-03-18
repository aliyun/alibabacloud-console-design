import React, {
  ReactNode,
  ReactElement,
  useState,
} from 'react';
import createLoader, { ILoadOptions} from '@ali/widget-loader';

const loadWidget = createLoader();

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

  const [Widget] = useState(() => (loadWidget({
    id,
    version,
  }, loadOptions)));

  return <Widget {...props} />;
}

export default XconsoleRcWidget;

