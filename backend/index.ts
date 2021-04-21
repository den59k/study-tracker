import dotenv from 'dotenv'
import fastify from 'fastify'
import app from './src/app'

dotenv.config()

const server = fastify()
//Добавляем всё наше приложение к fastify
server.register(app, { prefix: '/api' })

const port = process.env.PORT || 3001
server.listen(port, function (err, address) {
  if (err) {
    console.log(err)
		return
  }
  console.log(`server listening on ${address}`)
})