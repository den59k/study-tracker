import type { FastifyInstance, FastifyPluginOptions } from "fastify"

import cookie from 'fastify-cookie'

import Model from "../model"

import auth from './auth'

export interface AppFastifyInstance extends FastifyInstance {
	model: Model
}

//Здесь осуществляются все привязки к моделям, а также к остальным роутам
export default async function app (fastify: AppFastifyInstance){
	const model = new Model()
	await model.init() 
	fastify.decorate('model', model)

	fastify.register(cookie)

	fastify.register(auth)

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