import type { FastifyInstance } from "fastify"

import cookie from 'fastify-cookie'

import Model from "../model"

import auth from './auth'
import userPlugin from './plugins/user' 
import rootRoutes from "./root"
import teacherRoutes from "./teacher"

export interface AppFastifyInstance extends FastifyInstance {
	model: Model
}

//Здесь осуществляются все привязки к моделям, а также к остальным роутам
export default async function app (fastify: AppFastifyInstance){
	const model = new Model()
	await model.init() 
	fastify.decorate('model', model)

	fastify.register(cookie)
	//Вот здесь проводится аутентификация токена
	fastify.register(userPlugin)

	//Подключаем первую пачку роутов с авторизацией
	fastify.register(auth)
	
	//Подключаем все остальные роуты
	fastify.register(rootRoutes, { prefix: '/root' })
	fastify.register(teacherRoutes, { prefix: '/teacher' })

	fastify.setErrorHandler(function (error, request, reply) {
		if(error.validation){
			const keys = {}
			for(let err of error.validation){
				const key = (err.params as any).missingProperty
				if(key) keys[key] = "Параметр отсутствует"
			}

			console.log({ error: keys })
			return { error: keys }
		}
		
		console.log(error)
		return { error: "error" }
	})
}