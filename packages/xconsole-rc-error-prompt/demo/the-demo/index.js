import _map from 'lodash/map';
import React from 'react';

import {
  Button,
  Checkbox,
  Field
} from '@alife/next';

import alertError, {
  ERROR_CODE,
  ERROR_NAME
} from './alert-error';

import './index.less';

const FIELD_NAME = {
  ERRORS: 'error_one'
};

function createErrors(message, name, code, fetchRelated) {
  const instance = new Error(message);
  
  instance.name = name;
  instance.code = code;
  instance._fetch = fetchRelated;
  
  return {
    instance,
    object: {
      message: `「仅 code 和 message」${message}`,
      code
    },
    string: `「仅 message」${message}`
  };
}

function createErrorDetailInfo(info) {
  return {
    requestId: 'REQUEST_ID_000_SIGN_IN',
    url: 'any url',
    method: 'POST | GET | put | delete',
    params: {
      id: 'some id',
      boshit: 'yes'
    },
    body: {
      fuck: [1, 2, 3],
      how: 'fucking hard'
    },
    ...info
  };
}

const {
  instance: ERROR_SIGN_IN_INSTANCE,
  object: ERROR_SIGN_IN_OBJECT,
  string: ERROR_SIGN_IN_STRING
} = createErrors('需要登录', ERROR_NAME.SIGN_IN, ERROR_CODE.SIGN_IN, createErrorDetailInfo());
const {
  instance: ERROR_IGNORE_INSTANCE,
  object: ERROR_IGNORE_OBJECT,
  string: ERROR_IGNORE_STRING
} = createErrors('逻辑已处理的错误（可以被忽略）', ERROR_NAME.CAN_BE_IGNORED, ERROR_CODE.CAN_BE_IGNORED);
const {
  instance: ERROR_SOMETHING_WRONG_INSTANCE,
  object: ERROR_SOMETHING_WRONG_OBJECT,
  string: ERROR_SOMETHING_WRONG_STRING
} = createErrors('某些错误', ERROR_NAME.SOMETHING_WRONG, ERROR_CODE.SOMETHING_WRONG);
const {
  instance: ERROR_FETCH_BIZ_INSTANCE,
  object: ERROR_FETCH_BIZ_OBJECT,
  string: ERROR_FETCH_BIZ_STRING
} = createErrors('调用数据接口发生业务错误', ERROR_NAME.FETCH_BIZ, ERROR_CODE.FETCH_BIZ, createErrorDetailInfo({
  requestId: 'REQUEST_ID_000_BIZ',
  extra1: 'extra1 - boshit'
}));
const {
  instance: ERROR_CHANGE_MESSAGE_INSTANCE,
  object: ERROR_CHANGE_MESSAGE_OBJECT,
  string: ERROR_CHANGE_MESSAGE_STRING
} = createErrors('此 message 将被改写', ERROR_NAME.CHANGE_MESSAGE, ERROR_CODE.CHANGE_MESSAGE);

const ERROR = {
  NULL: null,
  UNDEF: undefined,
  ERROR_SIGN_IN_INSTANCE,
  ERROR_SIGN_IN_OBJECT,
  ERROR_SIGN_IN_STRING,
  ERROR_IGNORE_INSTANCE,
  ERROR_IGNORE_OBJECT,
  ERROR_IGNORE_STRING,
  ERROR_SOMETHING_WRONG_INSTANCE,
  ERROR_SOMETHING_WRONG_OBJECT,
  ERROR_SOMETHING_WRONG_STRING,
  ERROR_FETCH_BIZ_INSTANCE,
  ERROR_FETCH_BIZ_OBJECT,
  ERROR_FETCH_BIZ_STRING,
  ERROR_CHANGE_MESSAGE_INSTANCE,
  ERROR_CHANGE_MESSAGE_OBJECT,
  ERROR_CHANGE_MESSAGE_STRING,
  ERROR_NO_CODE: {
    message: '无 code，有详情',
    _fetch: createErrorDetailInfo({
      method: 'POST'
    })
  },
  ERROR_NO_MESSAGE: {
    code: 'CODE_WITH_OUT_MESSAGE',
    _fetch: createErrorDetailInfo({
      method: 'GET',
      url: '//get_api?fuck=true',
      body: null
    }),
    toString() {
      return '有 code 无 message 的错误，message 将 fallback 到 code';
    }
  },
  ERROR_CODE_VERY_LONG: {
    message: 'Error code 很长的情况下，不可产生 UI 问题',
    code: 'ERROR_CODE_VERY_LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG',
    _fetch: createErrorDetailInfo(),
    toString() {
      return '有 code 无 message 的错误，message 将 fallback 到 code';
    }
  },
  ERROR_POST_SHOULD_IGNORE_SOME_BODY: {
    message: '需要 ignore 一下 body 参数，且需要把 string 类型的 param 及 body 解析成可读性好的分行形式',
    code: 'ERROR_POST_SHOULD_IGNORE_SOME_BODY',
    _fetch: createErrorDetailInfo({
      url: '/fuck/delete?_cache_busting=123456',
      params: 'id=boshit&boshit=alot',
      body: [
        'bucketName=boshit',
        'region=oss-cn-qingdao',
        'objects=fuck/CGK478JF00AJ0003.jpg',
        'token=Y7d6e57670fa81c2518a42ac531d0e57b',
        'secToken=PznQqh1Snec2NuH9TKVCv9',
        'collina=115#1cBu+C1O1TNgn3QyT5EV1Cso5lQGs2AaxuXu1gvG5fZ3qNZ1lR2Habo9Ef6VGub8z8kkY/SfqH88AkNcaoi2vUeyUkPPeKT8ukNdxab1haUdkHNcaLpAurPQOSfPFtNCj+pQ97WRhs1Gv6NDaL9Xt6zCvIAyeH38uWZQG7WRhZz4ODNDaTBXyzEQvsAyFtQ4uWN0aCS+o1fCl1Oa6HHCwN7kOqTsGRxBHfgpxf0umqsb2kGnStS08uIHu9bXKeIlMYDnTsS3hIyTrePvDg+DgOeY6f0UCvbnnc6RWxfApVlWAp1p2rttNNYDuSvMd0lbxYvuF9ojPgb8ugIHvSSEyEEhNdLCPnItxVkjjPHuG5b8ERddAKDf7N5vme9jt0hUkuujKOm6TwD/9vUW1JYzNjF9bCtrUaj/2b0GUX1RX2K4653eaK57R7/SuK+eTheet3LftNS+e11jGamdmXY3U6Gq9uEvSvYGbo/sNB8TMad32W0Ni2446o4QlHNsfaSsdvHUQDZdl3r9L5bAyJuTYjv/MBY3lneekfwHVdH+iTtYH2fSV6SRoyeS5mwlD39e62WVZtIgL7ogCuFMaI/wqdpde17lCaH4HwbaTHlGMNnuviGAFtUr4UcwsM8yBkK6MctKL5wJe69pH1mzjkVfCi7LvZGHbOszkiYpzpgDRp6Jd69MrbsPC/n94C2gvW5qLFFSdnBjHPDZaAylwxxQWqVwZbZU8BDjdv6GzdNrhhOxhY+9LG169S/rdcUeJd3lgjoPrgtLyOKXXRDS+LFhl9flmCkwGHKuv4t5TvGf1OHP4UZE3Bixz1XsXd+mUd3/WvpBwm1qCDtqcbbRHlXm5fjfUaWHTq03tCfcuzD7Vz1='
      ].join('&')
    }),
    toString() {
      return '有 code 无 message 的错误，message 将 fallback 到 code';
    }
  }
};

const errorDataSource = _map(ERROR, (v, k) => ({
  label: v && v.message ? v.message : `${v}`,
  value: k
}));

export default class extends React.Component {
  static displayName = 'TheDemo';
  
  _field = new Field(this);
  
  _handleAlertError = () => {
    const {
      _field: {
        getValue
      }
    } = this;
    
    getValue(FIELD_NAME.ERRORS).forEach(v => alertError(ERROR[v]));
  };
  
  render() {
    const {
      _field: {
        init
      }
    } = this;
    
    return <div className="the-demo">
      <h1>选择错误，模拟单个或多个错误的场景</h1>
      <Checkbox.Group {...init(FIELD_NAME.ERRORS, {
        initValue: []
      }, {
        dataSource: errorDataSource,
        mode: 'multiple'
      })} />
      <div style={{ marginTop: '1em' }}>
        <Button {...{
          children: 'alert',
          onClick: this._handleAlertError
        }} />
      </div>
    </div>;
  }
}