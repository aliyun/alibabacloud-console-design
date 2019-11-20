import React, { 
  ReactNode, 
  ReactElement,
  isValidElement,
  useState,
 } from 'react'
import { 
  matchPath, 
  match, 
  withRouter, 
  RouteComponentProps,
 } from 'dva/router'
import AppLayout from '@alicloud/console-components-app-layout'
import Context, { IProviderValue } from './Context'
import Menu, { IProps as IMenuProps } from './Menu'

type paths = string[]

export interface IProps extends RouteComponentProps<any> {
  menu?: IMenuProps | ReactElement;
  collapsedPaths?: paths;
  invisiblePaths?: paths;
  children?: ReactNode;
}

const getPathIsMatch = (
  pathname: string, 
  paths: paths
): boolean => {
  let pathIsMatch = false
  paths.some((key: string) => {
    const isMatch: match = matchPath(pathname, {
      path: key,
      exact: true,
      strict: true,
    })
    if (isMatch) {
      pathIsMatch = true
      return true
    }
  })
  return pathIsMatch 
}

const XconsoleRcAppLayout = ({
  menu,
  collapsedPaths = [],
  invisiblePaths = [],
  children,
  location,
}: IProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(
    getPathIsMatch(location.pathname, collapsedPaths)
  );

  const visible = !getPathIsMatch(location.pathname, invisiblePaths);

  const Nav: ReactNode = visible ? (
    isValidElement(menu) ? menu : <Menu {...menu} />
  ) : null

  const providerValue: IProviderValue = {
    collapsed,
    setCollapsed,
    visible,
  }

  return (
    <AppLayout
      nav={Nav}
      navCollapsed={collapsed}
      onNavCollapseTriggerClick={prevCollapsed => {
        setCollapsed(!prevCollapsed);
      }}
    >
      <Context.Provider value={providerValue}>
        {children}
      </Context.Provider>
    </AppLayout>
  )
}

export default withRouter(XconsoleRcAppLayout)