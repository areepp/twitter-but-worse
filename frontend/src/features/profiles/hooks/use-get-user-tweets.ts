import { getUserTweets } from '@/lib/users'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetUserTweets = (username: string) => {
  return useInfiniteQuery(
    [username, 'tweets'],
    ({ pageParam = undefined }) =>
      getUserTweets({ username, cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.next_cursor,
      getPreviousPageParam: (firstPage) => firstPage.next_cursor,
      refetchOnMount: 'always',
    }
  )
}
