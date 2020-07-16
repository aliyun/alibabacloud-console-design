import { AppConfig } from "./AppConfig";
import { RouteConfig } from "./RouteConfig";
import { History } from 'history';

export interface XConsoleAppProps {
  history: History;
  appConfig: AppConfig;
  routeConfig: RouteConfig;
}