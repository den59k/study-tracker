import { AppFastifyInstance, UserFastifyRequest } from "../../types/fastify";
import subjectRoutes from './subjects'
import groupRoutes from './groups'
import studentRoutes from "./students";

export default async function teacherRoutes(fastify: AppFastifyInstance){

	fastify.addHook('onRequest', (request: UserFastifyRequest, reply, done) => {
		if(!request.userData || request.userData.role !== 'teacher')
			reply.code(401).send({error: { access_token: "token is not teacher`s" }})
		else
			done()
	})

	fastify.register(groupRoutes)
	fastify.register(subjectRoutes)
	fastify.register(studentRoutes)
}