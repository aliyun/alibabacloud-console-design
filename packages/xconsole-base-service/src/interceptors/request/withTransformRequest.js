const transformFormValue = (key, value) => {
  if (key === 'params' || key === 'actions') {
    return JSON.stringify(value)
  }
  return value
}

const defaultTransformer = (data) => {
  const formData = new URLSearchParams()
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key]
      if (typeof value !== 'undefined') {
        const exactValue = transformFormValue(key, value)
        formData.append(key, exactValue)
      }
    }
  }
  return formData
}

export default (...transformers) => (config) => {
  if (!transformers.length) {
    transformers.push(defaultTransformer)
  }

  const configTransformRequest = config.transformRequest || []
  let exactTransformRequest = configTransformRequest

  if (!Array.isArray(exactTransformRequest)) {
    exactTransformRequest = Array.from({
      length: Object.keys(exactTransformRequest).length,
      ...exactTransformRequest,
    })
  }

  return {
    ...config,
    transformRequest: [
      ...transformers,
      ...exactTransformRequest,
    ],
  }
}
