import {
  ConsoleLineChart,
  ConsoleBarChart,
  ConsolePieChart,
  ConsoleMinilineChart,
  ConsoleRadarChart,
  ConsoleFunnelChart,
  ConsoleRoseChart,
  ConsoleComboChart,
  ConsoleDotChart,
} from '@alicloud/console-chart';

const baseData = [
  {
    name: '公共云',
    data: [
      ['201804', 31],
      ['201805', 39],
      ['201806', 32],
      ['201807', 35],
      ['201808', 31],
    ],
  },
]

// 组合图形配置
const comboChartCfg = {
  data: [
    {
      name: '新增客户数',
      type: 'bar',
      yAxis: 0,
      data: [
        ['2018-04', 1892],
        ['2018-05', 7292],
        ['2018-06', 5714],
        ['2018-07', 5354],
      ],
    },
    {
      name: '增长率',
      type: 'line',
      yAxis: 1,
      data: [
        ['2018-04', 11.751],
        ['2018-05', 40.78],
        ['2018-06', 21.75],
        ['2018-07', 12.048],
      ],
    },
  ],
  config: {
    legend: {
      position: 'bottom',
    },
    padding: 'auto',
    xAxis: {
      type: 'cat',
    },
    yAxis: [{}, {}],
  },
}

// 饼图配置
const pieChartCfg = {
  data: [
    {
      name: '各类云产品占比',
      data: [['计算类', '45'], ['资源类', '26'], ['服务类', '12'], ['工具类', 8]],
    },
  ],
  config: {},
}

// 漏斗图配置
const funnelChartCfg = {
  data: [
    {
      name: '活动页',
      data: [['访问量', 10000], ['进入首页', 1994], ['购买', 200]],
    },
  ],
  config: {
    direction: 'vertical',
    align: 'center',
  },
}

const ChartCfg = [
  {
    type: ConsoleLineChart,
    data: baseData,
    config: {},
  },
  {
    type: ConsoleBarChart,
    data: baseData,
    config: {},
  },
  {
    type: ConsoleComboChart,
    data: comboChartCfg.data,
    config: comboChartCfg.config,
  },
  {
    type: ConsoleFunnelChart,
    data: funnelChartCfg.data,
    config: funnelChartCfg.config,
  },
  {
    type: ConsoleDotChart,
    data: baseData,
    config: {},
  },
  {
    type: ConsoleRoseChart,
    data: baseData,
    config: {},
  },
  {
    type: ConsolePieChart,
    data: pieChartCfg.data,
    config: pieChartCfg.config,
  },
  {
    type: ConsoleMinilineChart,
    data: baseData,
    config: {},
  },
  {
    type: ConsoleRadarChart,
    data: baseData,
    config: {},
  },
]
export default ChartCfg;
