import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import Meteor from './Meteor'

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
    <div>
      {isLoading ? (
        'Loading'
      ) : isError ? (
        <span>{error.message}</span>
      ) : isFetching ? (
        <div>Refreshing...</div>
      ) : (
        <div>
          {data.map(({ id, name }) => (
            <Meteor key={id} nameProp={name} />
          ))}
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
    </div>
  )
}

export default App
