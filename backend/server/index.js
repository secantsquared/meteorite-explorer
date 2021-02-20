require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const server = express()
server.use(cors())
server.use(express.json())

server.get('/api/jsonData/', async (req, res) => {
  // const headers = {
  //   'Access-Control-Allow-Headers': 'x-access-token',
  //   'Content-Type': 'application/json',
  //   'x-access-token': process.env.APP_TOKEN
  // }
  try {
    const { data } = await axios.get(
      `${process.env.METEORITE_URL}?$offset=${req.query.page}&$limit=20`
    )
    return res.status(200).json(data)
  } catch ({ msg, code }) {
    return res.status(500).json({ msg, code })
  }
})

server.listen(process.env.PORT || 5000, () =>
  console.log('Active on http://localhost:5000')
)
