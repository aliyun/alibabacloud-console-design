import React, { useContext, useState } from 'react'
import Context from './Context'
import { register, destroy } from './dvaModel'



export default (props) => {
  const [models, setModels] = useState({})
  const [counts, setCounts] = useState({})
  const _models = models
  const _counts = counts

  const attach = (config) => {
    if (models[config.namespace]) {
      _counts[config.namespace]++
      setCounts(_counts)
      return models[config.namespace]
    } else {
      const model = register(props.app, config)
      _models[model.namespace] = model
      _counts[model.namespace] = 1
      setModels(_models)
      setCounts(_counts)
      return model
    }
  }

  const detach = (namespace) => {
    if (models[namespace]) {
      _counts[namespace]--
      setCounts(_counts)
      if (_counts[namespace] === 0) {
        destroy(props.app, namespace)
        delete models[namespace]
        delete counts[namespace]
        setModels(models)
        setCounts(counts)
      }
    }
  }

  return (
    <Context.Provider value={{ attach, detach, models }}>
      {props.children}
    </Context.Provider>
  )
}
