import { useQuery } from '@tanstack/react-query'

import { usersService } from '../services/users-service'

type UseGetMeQueryParams = {
  signedIn: boolean
}

export function useGetMeQuery({ signedIn }: UseGetMeQueryParams) {
  const { data, isSuccess, isError, isFetching } = useQuery({
    queryKey: ['me'],
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
