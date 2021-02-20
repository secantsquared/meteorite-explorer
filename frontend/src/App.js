import React, { useEffect } from 'react'
import axios from 'axios'

const App = props => {
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/jsonData')
      .then(response => console.log(response.data))
      .catch(err => console.error(err))
  }, [])

  return <h1>Sanity Test!</h1>
}

export default App
