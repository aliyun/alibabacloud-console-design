import { useContext } from 'react';

// @ts-ignore
import { WindProContext } from '@alicloud/xconsole';

export default () => {
  const { uis } = useContext(WindProContext);

  return uis;
}
