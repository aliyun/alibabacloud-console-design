

export const getRoutePath = (routeUrl, params = {}) => {
  let routePath = routeUrl;
  Object.keys(params).forEach((paramName) => {
    const paramValue = params[paramName];

    routePath = routePath.replace(`{${paramName}}`, paramValue);
  })

  return routePath;
}

export default {};
