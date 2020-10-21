import React, { useContext } from 'react'
import { intl, ConsoleContext } from '@alicloud/xconsole';
import { PageHeader, Button, Description, Card } from '@alicloud/xconsole/ui'
import styles from './index.scoped.less';

const CardProps = {
  showTitleBullet: false,
  showHeadDivider: false,
  contentHeight: 'auto',
};

export default () => {
  const { region } = useContext(ConsoleContext);

  return (
    <PageHeader
      title={intl('nav.basic.tech.region')}
      breadcrumbs={[
        {
          to: '/',
          text: intl('title.home'),
        },
        {
          text: intl('nav.basic.tech.region'),
        },
      ]}
    >
      <Description
        title={intl('nav.basic.tech.region')}
        items={[{
          dataIndex: 'Region',
          label: '当前 Region',
          // @ts-ignore
          span: 24,
        },{
          label: 'Region 的作用',
          render: () => <span>通过获取当前控制台的 Region 来用于 OpenAPI 的参数请求</span>
        }]}
        dataSource={{ Region: region.getCurrentRegionId() }}
      />
      
      <Card
        className={styles.cards}
        {...CardProps}
      >
        <p>
          如果需要做云产品的 Region 化，需要在对应的云产品做部署在特定 Region 之外，也需要对应后端接入 Location 服务，每个区域化的云产品需要提供一个 <b>DescribeRegions</b> 的接口来展示设置当前这个云产品在那些 Region 部署, 提供给控制台前端
        </p>

        <p>
          你可以通过配置 src/appConfig.js 来设置 <b>region.regionList</b> 的配置对应的你云产品对应的 Region
        </p>

        <p>
          你可以通过配置 src/appConfig.js 来设置 <b>region.reginbarVisiblePaths</b> 的配置项在特定路径显示或者隐藏
        </p>

        <p>
          当然你也可以通过 <b>const console = useContext(ConsoleContext)</b> ，手动控制 Regionbar 相关的操作
        </p>

        <Button
          type="primary"
          onClick={
            () => {
              region.setRegions([{id: 'cn-shanghai', name: '上海'}])
            }
          }
        >
          动态修改 RegionList
        </Button>

        <Button
          type="primary"
          onClick={
            () => {
              region.setRegionResourceCount({ 'cn-shanghai': 1 })
            }
          }
        >
          设置上海 Region 资源数 
        </Button>

        <Button
          onClick={
            () => {
              region.toggleRegion(false)
            }
          }
        >
          关闭 RegionBar
        </Button>

        <Button
          onClick={
            () => {
              region.toggleRegion(true)
            }
          }
        >
          显示 RegionBar
        </Button>
      </Card>
    </PageHeader>
  )
};
