import { History } from 'history';
import { AppConfig } from './AppConfig';
import { RouteConfig } from './RouteConfig';

export interface XConsoleAppProps {
  history: History;
  appConfig: AppConfig;
  routeConfig: RouteConfig;
  sidebar;
  AppLayout;
}
