/* eslint-disable quote-props, semi, comma-dangle */

// 如果生产环境需要接入OneConsole, 请勿修改或删除对于下面公共变量的引用
// - ALIYUN_WIND_MESSAGE
// - ALIYUN_CONSOLE_MESSAGE
// 如果需要在dev环境模拟生产环境的输出,
// 首先确保美杜莎(http://mcms-portal.alibaba-inc.com/)的项目仓库已被创建,
// 如VPC的美杜莎项目:
// - group: aliyun
// - name: vpcnext-console-aliyun-com
// 请在.windrc中找到intl配置字段并增加如下的配置:
// "intl": {
//   "locale": "zh-CN",
//   "products": [
//     {
//       "group": "aliyun",
//       "name": "vpcnext-console-aliyun-com",
//       "identifier": "ALIYUN_CONSOLE_MESSAGE"
//     },
//     {
//       "group": "aliyun",
//       "name": "wind",
//       "identifier": "ALIYUN_WIND_MESSAGE"
//     }
//   ]
// }
// 使用如上配置后, 重新启动dev开发调试服务器(def dev),
// 将会在上述的公共变量中输出对应仓库的字典配置
export default {
  'nav.basic.ui.scence': 'UI 场景',
  'nav.basic.ui.chart': '图表库',
  'nav.basic.tech': '业务场景',
  'nav.basic.tech.region': '区域化',
  'nav.basic.tech.request': '请求调用',
  'nav.basic.tech.resourcegroup': '资源组',
  'nav.basic.tech.console_config': '控制台业务配置数据',

  'title.tab.profile': '标签详情页',
  'tabprofile.authentication': '认证管理',
  'tabprofile.groups': '加入的组',
  'menu.title.profile.tab': '标签详情页',
  'title.instance.profile': '实例详情',
  'title.instance.list': '实例列表',
  'menu.title.list.routed': '路由列表页',
  'title.selectionlist': '多选列表页',
  'list.batch.title': '批量操作',
  'list.batch.content': '确定执行批量操作？',
  'list.batch': '批量操作',
  'menu.title.list.selection': '多选列表页',
  'User_login_Link': '用户登录地址',
  'AccountManagement_Custom_Domain': '域别名',
  'account.management': '账号管理',
  'AccountSummaryCard_Title': '我的账户',
  'AccountSummaryCard_Users': '用户',
  'AccountSummaryCard_Groups': '用户组',
  'AccountSummaryCard_Policies': '自定义策略',
  'AccountSummaryCard_Roles': '角色',
  'list.create.ak': '创建 AccessKey',
  'form.success': '创建成功',
  'form.success.result': '实例创建成功',
  'result.title.role.fail': '角色创建失败！',
  'result.description.role.fail': '角色已存在',
  'result.action.role.back': '返回修改',
  'result.title.role.created': '角色创建成功！',
  'result.description.role.created': '为确保角色的正常使用，建议您继续为此角色添加授权',
  'result.action.role.auth': '为角色授权',
  'ui.button.reset': '重置',
  'instance.prop.region.label': '地域',
  'instance.form.edit.region.error.required': '地域不能为空',
  'instance.prop.vpc.label': '专有网络',
  'instance.prop.vswitch.label': '虚拟交换机',
  'networkType.vpc': '专有网络',
  'networkType.clasic': '经典网络',
  'instance.prop.netwrok.label': '网络类型',
  'period.1': '1 个月',
  'period.2': '2 个月',
  'period.3': '3 个月',
  'instance.prop.period.label': '购买时长',
  'title.basicmonitor': '基础监控页',
  'title.successresult': '成功页',
  'title.advancedmonitor': '高级监控页',
  'title.monitor': '监控页',
  'title.failresult': '失败页',
  'title.result': '结果页',
  'title.stepform': '分步表单页',
  'menu.title.result': '结果页',
  'menu.title.result.success': '成功页',
  'menu.title.result.fail': '失败页',
  'menu.title.monitor': '监控页',
  'menu.title.monitor.basic': '基础监控页',
  'menu.title.monitor.step': '高级监控页',
  'menu.title.form.step': '分步表单',
  'info.logon': '控制台登录管理',
  'logon.prop.mfa.label': '必须开启多因素认证',
  'logon.prop.password_reset.label': '下次登录重置密码',
  'user.prop.last_use_time.label': '上次登录控制台时间',
  'ak.prop.akid.label': 'AccessKey ID',
  'ak.prop.status.label': '状态',
  'ak.prop.last_use_time.label': '最后使用时间',
  'group.prop.gpn.label': '用户组名称',
  'group.prop.displayname.label': '显示名称',
  'group.prop.comments.label': '备注',
  'group.prop.create_time.label': '创建时间',
  'advancedprofile.aklist': '用户AccessKey',
  'user.prop.create_time.label': '创建时间',
  'user.prop.comments.label': '备注',
  'user.prop.phone.label': '手机号码',
  'user.prop.email.label': '邮箱',
  'user.prop.uid.label': 'UID',
  'user.prop.displayname.label': '显示名称',
  'instance.prop.comments.label': '备注',
  'user.prop.upn.label': '用户名',
  'info.user': '用户基本信息',
  'advancedprofile.authentication': '认证管理',
  'advancedprofile.groups': '加入的组',
  'instance.form.edit.replicate.error.required': '灾备实例不能为空',
  'instance.form.edit.address.error.required': 'IP 地址不能为空',
  'chargetype.postpay': '按量付费',
  'chargetype.prepaid': '预付费',
  'instance.prop.chargetype.label': '付费类型',
  'instance.prop.replicate.label': '灾备实例',
  'title.list': '列表页',
  'title.form': '表单页',
  'title.basicform': '基础表单页',
  'instance.update': '编辑',
  'operation.label': '操作',
  'list.create.check': '确认订单',
  'list.create.success': '实例创建成功',
  'list.restart.title': '重启实例',
  'list.restart.content': '确认重启实例',
  'list.delete.title': '删除实例',
  'list.delete.content': '确认删除实例？',
  'list.restart': '重启',
  'list.delete': '删除',
  'list.create': '创建实例',
  'list.operator': '操作',
  'title.analysis': '分析页',
  'title.advancedprofile': '高级详情页',
  'title.advancedlist': '高级列表页',
  'title.basicprofile': '基础详情页',
  'title.basiclist': '基础列表页',
  'menu.title.form': '表单页',
  'menu.title.form.basic': '基础表单',
  'menu.title.form.advanced': '高级表单',
  'menu.title.profile': '详情页',
  'menu.title.profile.basic': '基础详情页',
  'menu.title.profile.advanced': '高级详情页',
  'menu.title.overview': '概览页',
  'menu.title.overview.stat': '统计页',
  'menu.title.overview.analysis': '分析页',
  'menu.title.list': '列表页',
  'menu.title.list.basic': '基础列表页',
  'menu.title.list.advanced': '高级列表页',
  'info.instance': '基础信息',
  'info.instance.update': '',
  'title.home': '首页',
  'title.overview': '概览页',
  'title.profile': '详情页',

  //
  // 下面的这些文案只是示例, 你可以在实际项目中删除掉
  //
  'ui.menu.instance.title': '实例列表',

  'ui.menu.instance.detail.title': '实例详情',
  'ui.menu.monitor.title': '监控日志',
  'ui.table.column.operator.title': '操作',
  'ui.table.column.operator.detail': '详情',
  'ui.table.column.operator.edit': '编辑',
  'ui.table.column.operator.manage': '管理',
  'ui.table.column.operator.pause': '暂停',
  'ui.table.column.operator.release': '释放',
  'instance.prop.create_time.label': '创建时间',
  'instance.prop.status.label': '状态',
  'instance.info.base.title': '基本信息',
  'instance.prop.id.label': '实例ID',
  'instance.prop.name.label': '实例名称',
  'instance.prop.address.label': 'IP地址',
  'instance.action.edit.title': '编辑实例',
  'instance.action.create.title': '创建新实例',
  'instance.form.edit.name.error.required': '实例名称不允许为空',
  'instance.action.release.title': '释放实例',
  'instance.action.release.confirm': '确认要释放 {id} 吗',
  'ui.button.ok': '确定',
  'ui.button.cancel': '取消',
  'monitor.cpu.title': 'CPU负载',
  ...(window.ALIYUN_WIND_MESSAGE || {}),
  ...(window.ALIYUN_CONSOLE_I18N_MESSAGE || {})
};