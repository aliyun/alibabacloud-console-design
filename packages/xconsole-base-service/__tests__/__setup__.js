import { MOCK_UA, MOCK_REGION, MOCK_SEC_TOKEN, MOCK_UMID } from './__cons__'

global.RISK_INFO = {
  GETUA: () => MOCK_UA,
  UMID: MOCK_UMID,
}

global.ALIYUN_CONSOLE_CONFIG = {
  SEC_TOKEN: MOCK_SEC_TOKEN,
}
