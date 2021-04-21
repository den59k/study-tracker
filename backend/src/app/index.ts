import type { FastifyInstance, FastifyPluginOptions } from "fastify"
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

	fastify.register(auth)
}