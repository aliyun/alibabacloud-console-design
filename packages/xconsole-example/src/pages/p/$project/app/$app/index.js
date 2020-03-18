/*
* useSubRouter: true
* aliasRouter:
    - proj/:project/app/:app/newIteration
    - proj/:project/app/:app/newIteration2
*/
import React, { Fragment, useState, useMemo, useEffect } from 'react'
import { intl, PageHeader, Query, Link, Widget } from '@alicloud/xconsole'
import { Button, Tag } from '@alicloud/xconsole/ui'
import SlidePanel from '@alicloud/console-components-slide-panel';

import BackEndIterationList from './be/IterationList'
import BackEndDeployList from './be/DeployList'

import FrontEndIterationList from './fe/IterationList'
import FrontEndDeployList from './fe/DeployList'

import XQuery from '~/components/xQuery';

import {
  GetAppDetail,
  GetApps,
} from '~/model'

import {
  ROUTERS,
  EAppType,
} from '~/constants'
import {
  getRoutePath,
} from '~/utils/helper'


export default (props) => {
  const {
    history,
    match: {
      url,
      params: {
        project,
        app,
      },
    },
  } = props;

  console.log('debugme1111', url, project, app);

  const [currentAct] = useState(() => {
    const pathAct = document.location.pathname.replace(`${url}`, '').slice(1) || 'iteration';
    console.log('debugme pathAct', pathAct, document.location.pathname, url);
    return pathAct;
  });
  const [appList, setAppList] = useState(null);
  const [appDetail, setAppDetail] = useState(null);

  const switcher = useMemo(() => {
    if (appList === null) {
      return null;
    }
    if (appList.length < 1) {
      return null;
    }

    return {
      dataSource: appList,
      onChange: (value) => {
        const applicationUrl = getRoutePath(ROUTERS.APPLICATION, {
          project,
          app: value,
        })
        history.push(`${applicationUrl}/${currentAct}`)
      },
      defaultValue: app,
    }
  }, [appList])


  // const appDetail = useMemo(() => {
  //   if (appList === null) {
  //     return {};
  //   }
  //   const projectApp = appList.filter(element => (`${element.value}` === `${app}`));
  //   // TODO appList[0] => {} 开发用，后续要改成无数据时不展示数据
  //   const appInfo = projectApp.length === 1 ? projectApp[0] : (appList[1] || {});
  //   return appInfo;
  // }, [appList])

  const nav = useMemo(() => {
    if (!appDetail) {
      return {};
    }

    return {
      shape: 'menu',
      activeKey: currentAct,
      onChange: (value) => {
        const distUrl = getRoutePath(ROUTERS[value.toUpperCase()], {
          project,
          app,
        })
        history.push(`${distUrl}`)
      },
      items: [
        {
          key: 'iteration',
          title: intl('title.iteration'),
        },
        {
          key: 'deploy',
          title: intl('title.deploy'),
        },
      ],
    }
  },
  [currentAct, appDetail]);


  const typeTag = useMemo(() => {
    if (!appDetail) {
      return <></>;
    }

    let ret = <></>;

    switch (parseInt(appDetail.type, 10)) {
      case EAppType.BACKEND:
        ret = <Tag>后端</Tag>;
        break;
      case EAppType.FRONTEND:
        ret = <Tag>前端</Tag>;
        break;
      case EAppType.MINIAPP:
        ret = <Tag>小程序</Tag>;
        break;
      default:
        break;
    }
    return ret
  },
  [appDetail]);

  const List = useMemo(() => {
    if (!appDetail) {
      return <></>;
    }

    let ret = <></>;

    if (appDetail && appDetail.type) {
      switch (`${currentAct}${appDetail.type}`) {
        case `iteration${EAppType.BACKEND}`:
          ret = BackEndIterationList;
          break;
        case `iteration${EAppType.FRONTEND}`:
          ret = FrontEndIterationList;
          break;
        case `iteration${EAppType.MINIAPP}`:
          ret = FrontEndIterationList;
          break;
        case `deploy${EAppType.BACKEND}`:
          ret = BackEndDeployList;
          break;
        case `deploy${EAppType.FRONTEND}`:
          ret = FrontEndDeployList;
          break;
        case `deploy${EAppType.MINIAPP}`:
          ret = FrontEndDeployList;
          break;
        default:
          break;
      }
    }
    return ret
  },
  [appDetail]);


  const projectUrl = getRoutePath(ROUTERS.PROJECT, {
    project,
  })
  const applicationUrl = getRoutePath(ROUTERS.APPLICATION, {
    project,
    app,
  })

  const panel = true ? null : (
    <SlidePanel activeId={'sp1'} hasMask>
      <SlidePanel.Item
        id="sp1"
        visible
        size="small"
        title="12313123"
        onClose={() => {
        }}
        onOk={() => {
        }}
        onCancel={() => {
        }}
        headCustom="查看原文"
        escClosable={false}
      >
        <div>
          译：楚军在定陶战败以后，怀王（楚怀王之孙熊心）心里害怕，从盱台前往彭城，合并了项羽、吕臣的军队，由自己来统率。任命吕臣为司徒（本为掌管教化的官，这里大概是掌管财政的军需官），吕臣的父亲吕青为令尹。任命沛公为砀郡长，封为武安侯，统率砀郡的军队。当初，宋义在路上遇见的那位齐国使者高陵君显正在楚军中，他求见楚王说：“宋义曾猜定武信君的军队必定失败，过了几天，就果然战败了。军队还没有交战就预先看出失败的征兆，这可以说是懂得军事的了。”楚怀王召见宋义，与他筹划大事，非常欣赏他，于是设置上将军职务，由宋义来担任；项羽为鲁公，任次将（副帅），范增任末将（次将之下的将军），去援救赵国，其他各路将领都隶属于宋义，号称卿子冠军。部队进发抵达安阳，停留四十六天不向前进。项羽说：“我听说秦军把赵王围困在钜鹿城，赶快带领我们的军队兵渡过黄河，楚军从外面攻击，赵军在里面接应，打败秦军是一定的了。”宋义说：“不正确。要拍打牛虻，就顾不上消灭牛身上的虱子（意谓楚军的主要目的是为了推翻秦王朝，不是为解救赵国，其志向在大不在小。虮：虱的卵）。如今秦国攻打赵国，打胜了，士卒也会疲惫，我们正好利用秦军战斗力的衰败；如果秦国不能取胜，那末我们就带领大军击鼓行进，往西攻取，一定会攻占秦国的本土了。所以，现在不如先使秦、赵两军方相斗。若论披着坚固的铠甲，拿着锐利的武器（指冲锋陷阵），勇战前线，我比不上您；若论坐下来运筹谋略，您比不上我。”于是通令全军：“凶猛像如虎，乖戾如羊，贪暴如狼，倔强不听差遣的人，都斩了他！”又派儿子宋襄辅佐齐国（当时齐相田荣曾与项梁发生矛盾，宋义想联络田荣对付项羽，所以派宋襄去辅助田荣），亲自送到无盐（地名，今山东东平县东），举行盛会宴请。（当时）天气寒冷，下着大雨，士卒们又冷又饿。项羽对将士说：“将要合力攻打秦军，久留不进（指宋义按兵不动）。如今年成不好，出现饥荒，百姓贫困，将士们吃的是芋艿和豆子，军中没有存粮，他竟然饮酒盛宴，不率领部队渡河依靠赵地的粮食来供应军队，跟赵合力攻秦，却说‘利用秦军的疲惫’。凭着秦国那样强大去攻打刚刚建起的赵国，这种情势下，一定会攻下赵国。赵国被攻占，秦国就更加强大，到那时，还谈得上什么利用力量的衰败？况且我国军队刚刚被打败（指定陶兵败之事），怀王坐在席上也觉得不安稳，收集国内的兵力单独交托给将军一人，国家的安危，决定于这次行动。现在他不体恤士兵，却曲从于自己的私利（指以其子宋享襄相齐），不是国家的忠臣。”项羽在早晨去拜见上将军宋义，就在军帐中斩下了他的头，出帐向军中下发令说：“宋义和齐国同谋反楚，楚王密令我处死他。”这时候，将领们都因畏惧而服从项羽，没有谁敢抗拒，都说：“首先扶立楚王的，是将军一家。如今将军诛杀了乱臣——”于是大家一起立项羽为代理上将军。（项羽）派人去追赶宋义的儿子，在齐国境内追赶上了他，杀了他。项羽又派桓楚去复命于怀王。楚怀王因而让项羽作了上将军，当阳君（英布初起时封号）、蒲将军都归属项羽。
        </div>
      </SlidePanel.Item>
    </SlidePanel>
  );

  const pageTitle = (appList !== null) ? (
    <Fragment>
      {appDetail.name} {typeTag}
    </Fragment>
  ) : (<XQuery
    model={GetApps}
    variables={{ project }}
    onData={(data) => {
      // 建议这里通过 useState 或者调用 setState, 如 setProjects(data.data)
      const ProjectApps = (data.data || []).map(item => ({
        value: item.appName,
        label: item.name,
        type: item.type,
      }));
      console.log('debugme ProjectApps', ProjectApps)
      setAppList(ProjectApps);
    }}
    onError={() => {
      setAppList([]);
    }}
  >
    <XQuery.Loading>
      Loading....
    </XQuery.Loading>
  </XQuery>);

  const content = (appDetail && appDetail.type) ?
    (
      <List {...props} project={project} app={app} appDetail={appDetail} />
    )
    : (<Widget
      id="@ali/widget-xconsole-result"
      version="1.x"
      type="error"
      title={intl('error.title.app.notfound')}
      description={intl('error.description.app.notfound')}
      actions={[
        (
          <Button
            type="secondary"
            onClick={() => {
              document.location.reload();
            }}
          >{intl('action.error.refresh')}</Button>
        ),
        (
          <Link to={projectUrl}>
            <Button type="primary">{intl('action.error.back')}</Button>
          </Link>
        ),
      ]}
    />);
  const defaultView = (
    <PageHeader
      title={pageTitle}
      subSwitcher={switcher}
      historyBack={applicationUrl}
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
      ]}
    >
      {content}
      {panel}
    </PageHeader>
  )

  return (appDetail !== null) ? defaultView : (
    <XQuery
      model={GetAppDetail}
      variables={{ project, app }}
      onData={(data) => {
        // 建议这里通过 useState 或者调用 setState, 如 setProjects(data.data)
        setAppDetail(data);
      }}
    >
      <XQuery.Loading>
        Loading....
      </XQuery.Loading>
      <XQuery.Error>
        Error...
      </XQuery.Error>
      <XQuery.Empty>
        Empty...
      </XQuery.Empty>
      <XQuery.Default>
        DefaultView...
      </XQuery.Default>
    </XQuery>
  )
}
