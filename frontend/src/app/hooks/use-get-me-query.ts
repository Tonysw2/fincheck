import { useQuery } from '@tanstack/react-query'

import { usersService } from '../services/users-service'

export const GET_ME_QUERY_KEY = ['me']

type UseGetMeQueryParams = {
  signedIn: boolean
}

export function useGetMeQuery({ signedIn }: UseGetMeQueryParams) {
  const { data, isSuccess, isError, isFetching } = useQuery({
    queryKey: GET_ME_QUERY_KEY,
    enabled: signedIn,
    staleTime: Infinity,
    queryFn: ({ signal }) => usersService.me({ signal }),
  })

  return {
    user: data?.user,
    isError,
    isSuccess,
    isFetching,
  }
}
