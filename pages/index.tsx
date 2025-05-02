import { useEffect } from 'react'
import { usePlayers } from '@/features/player/usePlayers'
import { useInView } from 'react-intersection-observer'
import { getErrorComponent } from '@/features/error/getErrorComponent'
import { NavigationBar } from '@/features/navigation/NavigationBar'

export default function HomePage() {
  const {
    data,
    isError,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePlayers()
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isError) {
    return getErrorComponent(error)
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center p-4'>
        Loading players...
      </div>
    )
  }

  if (!data) {
    return <div>No player data found.</div>
  }

  const { pages } = data

  return (
    <main className='p-4'>
      <div className='flex flex-col gap-y-4'>
        <NavigationBar />
        <h1>Players</h1>
        <p>
          Infinite scroll with the &quot;react-intersection-observer&quot;
          package.
        </p>
        <ol>
          {pages.map((page) => {
            return page.data.map((player) => {
              const { id, first_name, last_name } = player

              return (
                <li key={id} className='h-40 border border-black'>
                  {first_name} {last_name}
                </li>
              )
            })
          })}
        </ol>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={
            // If it is the last page or fetching the next page.
            !hasNextPage || isFetchingNextPage
          }
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </button>
      </div>
    </main>
  )
}
