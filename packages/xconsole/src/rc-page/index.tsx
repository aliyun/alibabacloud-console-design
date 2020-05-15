import React, { useContext, Fragment } from 'react';

// @ts-ignore
import PageHeader from '@alicloud/xconsole-rc-page-header';
// @ts-ignore
import { WindProContext } from '@alicloud/xconsole-context';

export default (props) => {
  const { history, app} = useContext(WindProContext);
  return (
    <PageHeader
      history={history}
      {
        ...props
      }
    />
  );
}
