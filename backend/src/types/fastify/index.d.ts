import type { FastifyInstance, FastifyRequest } from "fastify"
import type Model from "../../model";

export interface UserFastifyRequest extends FastifyRequest{
	userData: any
}

export interface AppFastifyInstance extends FastifyInstance {
	model: Model
}