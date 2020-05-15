import React, { useContext, Fragment } from 'react';

// @ts-ignore
import Widget from '@alicloud/xconsole-rc-widget';

export default (props) => {
  console.log('debugme123', props);

  return (
    <Widget
      id="@ali/widget-xconsole-service-open-status"
      version="0.x"
      loadOptions={{}}
      props={{
        ...props
      }}
    />
  );
}
