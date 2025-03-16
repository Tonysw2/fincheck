import axios from 'axios'

import { localStorageKeys } from '../config/local-storage-keys'
import { sleep } from '../utils/sleep'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

httpClient.interceptors.request.use(async (config) => {
  await sleep()

  const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

  if (storedAccessToken) {
    config.headers.Authorization = `Bearer ${storedAccessToken}`
  }

  return config
})
