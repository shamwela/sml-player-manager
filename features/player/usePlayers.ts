import { useInfiniteQuery } from '@tanstack/react-query'
import { type Meta } from '@/types/Meta'
import { Player } from '@/types/Player'
import { apiClient } from '@/utils/apiClient'

export const usePlayers = () =>
  useInfiniteQuery({
    queryKey: ['players'],
    queryFn: async ({ pageParam }) => {
      type ResponseType = {
        data: Player[]
        meta: Meta
      }

      const params = {
        season: 2024,
        per_page: 10,
        ...(pageParam !== null ? { cursor: pageParam } : {}),
      }

      const { data } = await apiClient.get<ResponseType>(`/epl/v1/players`, {
        params,
      })

      return data
    },
    getNextPageParam: (lastPage) => lastPage.meta.next_cursor || null,
    initialPageParam: null as number | null,
  })
