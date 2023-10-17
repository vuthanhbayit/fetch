import Axios, { AxiosRequestConfig } from 'axios'
import { createAxiosExtra } from './extra'
import { createAxiosDebug } from './debug'

const createFetch = (config?: AxiosRequestConfig) => {
  const instance = Axios.create(config)

  createAxiosExtra(instance)
  createAxiosDebug(instance)

  return instance
}

export { createFetch }
export { createAxiosExtra } from './extra'
export { createAxiosDebug } from './debug'
