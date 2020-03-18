import React, { useState, useEffect } from 'react'
import { Loading, Button } from '@alicloud/xconsole/ui'

import { GetIsvInfo } from '~/model';

export default (app, App) => (props) => {
  // console.log('GetIsvInfo', GetIsvInfo);
  const [isv, setIsv] = useState(null);
  const [isvError, setIsvError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ret = await GetIsvInfo();
        setIsv(ret);
      } catch (e) {
        setIsvError(e)
      }
    }

    loadData();
  }, [])

  // todo 临时不检查
  return <App {...props} isv={isv} />;

  if (isvError instanceof Error) {
    return (<div className="error-notice">
      <h3>接口出错了， 无法获取到合作伙伴信息!</h3>
      <p>错误码 {isvError.response.data.code}</p>
      <p>错误提示 {isvError.message}</p>
    </div>)
  }

  if (isv === null) {
    return (<Loading tip="正在加载应用信息..." style={{ display: 'block', marginTop: '200px' }} />)
  }


  return (isv.code && isv.status === 1) ? (<App {...props} isv={isv} />) : <>{'无权限访问此应用'}</>
}

