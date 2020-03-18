// Reference: https://github.com/umijs/umi/blob/master/packages/umi-build-dev/src/routes/getYamlConfig.js
import * as extractComments from 'esprima-extract-comments';
import * as yaml from 'js-yaml';
import * as Estree from 'estree';

export interface IRouteCommentConfig {
  appMenu?: boolean;
}

export const getCommentConfig = (code: string) => {
  const comments = extractComments(code);
  return comments
    .slice(0, 1)
    .filter((c: Estree.Comment) => c.value.includes(':') && c.loc && c.loc.start.line === 1)
    .reduce((memo: IRouteCommentConfig, item: Estree.Comment) => {
      const { value } = item;
      const v = value.replace(/^(\s+)?\*/gm, '');
      try {
        const yamlResult = yaml.safeLoad(v);
        return {
          ...memo,
          ...yamlResult,
        };
      } catch (e) {
        console.error(`yaml load failed: ${e}`);
      }
      console.log(memo);
      return memo;
    }, {});
};
