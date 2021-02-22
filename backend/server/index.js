require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const redis = require('redis')
//server

const PORT = process.env.PORT || 5000
const server = express()
server.use(cors())
server.use(express.json())

const PORT_REDIS =
  process.env.NODE_ENV === 'production' ? process.env.REDIS_URL : 6379
const redisClient = redis.createClient(PORT_REDIS)

const set = (key, value) => redisClient.set(key, JSON.stringify(value))

const get = (req, res, next) => {
  const key = req.query.page
  redisClient.get(key, (error, data) => {
    if (error) {
      res.status(400).send(error)
    }
    if (data !== null) {
      res.status(200).send(JSON.parse(data))
    } else {
      next()
    }
  })
}

server.get('/api/jsonData/', get, async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.METEORITE_URL}?$offset=${req.query.page}&$limit=20`
    )
    set(req.query.page, data)
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ msg: err.message, code: err.code })
  }
})

server.listen(PORT, () => console.log(`Active on ${PORT}`))
