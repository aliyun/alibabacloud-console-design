const axios = require('axios')

const URL = 'http://mocks.alibaba-inc.com'
const CREATION_URL = `${URL}/api/createProductFromWind`
const AUTH_URL = `${URL}/validateCreateToken`
const REPO_URL = `${URL}/mock/`
const PROJECT_URL = `${URL}/project/`

const getUrl = () => URL

const getRepoUrl = (name) => `${REPO_URL}${name}`

const getAuthUrl = (token) => `${AUTH_URL}${token}`

const getProjectUrl = (name) => `${PROJECT_URL}${name}`

const TIMEOUT = 20 * 1000

const createParamsGetter = (url, creator) => (...args) => Object.assign({
  method: "get",
  url,
  json: true,
  timeout: TIMEOUT,
}, creator(...args))

const getCreationRequestParams = createParamsGetter(
  CREATION_URL,
  (product, empid) => ({ url: `${CREATION_URL}/${product}/${empid}` })
)

const getAuthRequestParams = createParamsGetter(
  AUTH_URL,
  (product, ticket) => ({ product, ticket })
)

const createRequest = (paramsGetter) => async (...args)  => {
  const {
    data: result
  } = await axios(paramsGetter(...args))

  const {
    success,
    data,
    errMsg,
    code,
  } = result;

  if (!success) {
    return {
      error: {
        code,
        message: errMsg,
      },
    }
  }

  return {
    data,
  }
}

const create = createRequest(getCreationRequestParams)

const auth = createRequest(getAuthRequestParams)

module.exports = {
  create,
  auth,
  getUrl,
  getRepoUrl,
  getAuthUrl,
  getProjectUrl,
}
