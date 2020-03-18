import pathToRegexp from 'path-to-regexp'

export const matchPathRules = (pathRules, browserHistory) => {
  const regRules = pathRules.map(rule => pathToRegexp(rule));
  let matchPathRule = '';
  regRules.forEach((rule, index) => {
    if (rule.test(browserHistory)) {
      matchPathRule = pathRules[index];
    }
  });
  return matchPathRule;
}

export const getChecksum = (spma, spmb) => {
  const hash = s => {
    const l = s.length;
    let key = 0;
    let i;
    for (i = 0; i < l; i += 1) {
      key = key * 31 + s.charCodeAt(i);
    }
    return key;
  };
  const spmab = `${spma}.${spmb}`
  const len = spmab.length
  return len ? hash(`${len}#${spmab.charCodeAt(len - 1)}`) : -1
}
