import { Category } from '../../entities/category'
import { httpClient } from '../http-client'

type GetAllCategoriesParams = {
  signal?: AbortSignal
}

type GetAllCategoriesResponse = Category[]

export async function getAll(params: GetAllCategoriesParams) {
  const { signal } = params

  const response = await httpClient.get<GetAllCategoriesResponse>(
    '/categories',
    {
      signal,
    },
  )

  return response.data
}
