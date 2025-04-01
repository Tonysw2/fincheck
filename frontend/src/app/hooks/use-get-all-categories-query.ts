import { useQuery } from '@tanstack/react-query'

import { categoriesService } from '../services/categories-service'

export const GET_ALL_CATEGORIES_QUERY_KEY = ['categories']

export function useGetAllCategoriesQuery() {
  const { data, isPending, isFetching } = useQuery({
    queryKey: GET_ALL_CATEGORIES_QUERY_KEY,
    queryFn: categoriesService.getAll,
  })

  return {
    categories: data ?? [],
    isCategoriesPending: isPending,
    isCategoriesFetching: isFetching,
  }
}
