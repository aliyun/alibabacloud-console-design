export const ORIGIN_RESPONSE = Symbol('ORIGIN_RESPONSE')

export const getOriginResponse = response => response[ORIGIN_RESPONSE]

export const dropOriginResponse = (response) => {
  const { [ORIGIN_RESPONSE]: originResponse, ...rest } = response
  return rest
}

export default response => ({
  ...(response.data.data || {}),
  [ORIGIN_RESPONSE]: response,
})
