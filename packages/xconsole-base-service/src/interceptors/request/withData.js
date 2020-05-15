export default (dataKey, getter) => (config) => {
  const { data } = config
  return {
    ...config,
    data: {
      [dataKey]: getter(),
      ...data,
    },
  }
}
