import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import Table from '../Table'

import './app.css'

const App = () => {
  const [page, setPage] = useState(0)
  const getMeteors = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/jsonData?page=${page}`
    )
    return data
  }

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
        <div className="App">
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
        </div>
      )}
    </>
  )
}

export default App
