import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import Table from './components/Table/Table'

const App = () => {
  const [page, setPage] = useState(0)
  const getMeteors = React.useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/jsonData?page=${page}`
    )
    return data
  }, [page])

  const { data, error, isLoading, isError, isFetching } = useQuery(
    ['meteors', page],
    getMeteors,
    {
      keepPreviousData: true
    }
  )

  return (
    <>
      {isLoading ? (
        'Loading'
      ) : isError ? (
        <span>{error.message}</span>
      ) : isFetching ? (
        <div>Refreshing...</div>
      ) : (
        <>
          <Table data={data} />
          <button
            onClick={() => {
              if (page > 0) {
                setPage(old => old - 20)
              }
            }}
          >
            prev
          </button>
          <button
            onClick={() => {
              setPage(old => old + 20)
            }}
          >
            next
          </button>
        </>
      )}
    </>
  )
}

export default App
