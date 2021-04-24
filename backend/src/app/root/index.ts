import { AppFastifyInstance, UserFastifyRequest } from "../../types/fastify";
import groupsRoutes from "./groups";
import teacherRoutes from "./teachers";
import subjectsRoutes from './subjects'

export default async function rootRoutes(fastify: AppFastifyInstance){

	fastify.addHook('onRequest', (request: UserFastifyRequest, reply, done) => {
		if(!request.userData || request.userData.role !== 'root')
			reply.code(401).send({error: { access_token: "token is not root" }})
		else
			done()
	})

	fastify.register(teacherRoutes)
	fastify.register(groupsRoutes)
	fastify.register(subjectsRoutes)

}