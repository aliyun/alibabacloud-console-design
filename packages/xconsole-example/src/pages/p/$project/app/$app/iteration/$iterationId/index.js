/*
* useSubRouter: true
*/
import React, { useState, useMemo, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { intl, PageHeader, Query,
  Mutation,
  Link,
} from '@alicloud/xconsole'
import {
  Message,
} from '@alicloud/xconsole/ui'

import {
  GetPackageDetail,
} from '~/model'

import XQuery from '~/components/xQuery';

import {
  ROUTERS,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'

const Iteration = (props) => {
  const [currentAct, setAct] = useState('log');

  const [iteration, setIteration] = useState(null);

  const [branch] = useState('master');
  const iframeElement = useRef(null);

  const [groupId, setGroupId] = useState('zhili.lzl');


  const {
    match: {
      params: {
        project,
        app,
        iterationId,
      },
    },
  } = props;

  const projectUrl = getRoutePath(ROUTERS.PROJECT, {
    project,
  })
  const applicationUrl = getRoutePath(ROUTERS.APPLICATION, {
    project,
    app,
  })


  useEffect(() => {
    const packageInfo = iteration;
    window.addEventListener('message', (e) => {
      let message;
      console.log(e, e.data);
      try {
        message = JSON.parse(e.data);
      // eslint-disable-next-line no-empty
      } catch (err) {
      }

      window.if = iframeElement.current;

      // Cloud Shell 连接建立完成，已经可用
      if (message && message.action === 'CLOUDSHELL:CONNECTED') {
        console.log(iframeElement.current, e, message, packageInfo);
        if (packageInfo && (packageInfo.status === 0 || packageInfo.status === 1)) {
          const tmuxScreen = packageInfo.status === 0 ? `tmux new -s ${iterationId}` : `tmux attach -t ${iterationId}`;
          const command = packageInfo.status === 0 ? `sudo isv-cli deploy ${app} ${iterationId} ${branch} ${groupId}` : '';
          const shellCommand = `tmux new -d -s ${iterationId};sleep .5;tmux send-keys -t ${iterationId} "${command}" Enter;`;

          console.log(shellCommand)

          // iframe 为嵌入 Cloud Shell 的 iframe
          iframeElement.current.contentWindow.postMessage(JSON.stringify({
            action: 'paste',
            isFromTrusted: true,
            command: `tmux new -d -s ${iterationId};sleep .5;tmux send-keys -t ${iterationId} "${command}" Enter;tmux attach -t ${iterationId}`, // 需要执行的构建命令
          }), '*');

          // if (command !== '') {
          //   setTimeout(() => {
          //     iframeElement.current.contentWindow.postMessage(JSON.stringify({
          //       action: 'paste',
          //       isFromTrusted: true,
          //       command, // 需要执行的构建命令
          //     }), 'https://pre-shell.aliyun.com');
          //   }, 1000)
          // }
        }
      }
    }, false);

    return () => {
      console.log('unmount!!!!')
    }
  }, [iteration])


  const nav = useMemo(() => ({
    shape: 'menu',
    activeKey: currentAct,
    onChange: (value) => {
      setAct(value);
    },
    items: [
      {
        key: 'log',
        title: intl('title.packagelog'),
      },
    ],
  }),
  [currentAct]);

  const iterationContent = (iteration && (iteration.status === 0 || iteration.status === 1)) ?
    (<iframe ref={iframeElement} src="https://pre-shell.aliyun.com/readonly?__source=consolebench" width="100%" height="600px" frameBorder="0" marginHeight="0" marginWidth="0" />) :
    (<Message type="notice">该构建不是构建中状态，暂时不支持查看构建日志</Message>);

  const content = (<XQuery
    model={GetPackageDetail}
    variables={{ appName: app, packageVersion: iterationId }}
    onData={setIteration}
    checkEmpty={(data) => {
      if (data.packageVersion) {
        return false;
      }
      return true
    }}
  >
    <XQuery.Error><Message type="error">服务端返回错误，请刷新重试!</Message></XQuery.Error>
    <XQuery.Loading><Message type="loading">正在获取数据中，请耐心等待</Message></XQuery.Loading>
    <XQuery.Empty><Message type="warn">服务端未返回数据，请刷新重试!</Message></XQuery.Empty>
    <XQuery.Default>{iterationContent}</XQuery.Default>
  </XQuery>)


  return (
    <PageHeader
      title={iterationId}
      historyBack={getRoutePath(ROUTERS.ITERATION, {
        project,
        app,
      })}
      nav={nav}
      breadcrumbs={[
        {
          to: getRoutePath(ROUTERS.HOME),
          text: intl('title.home'),
        },
        {
          to: projectUrl,
          text: intl('title.project'),
        },
        {
          to: applicationUrl,
          text: intl('title.application'),
        },
        {
          to: getRoutePath(ROUTERS.ITERATION, {
            project,
            app,
          }),
          text: intl('title.iteration'),
        },
      ]}
    >
      {content}
    </PageHeader>
  )
};

Iteration.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
}
export default Iteration;
