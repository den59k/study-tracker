import { AppFastifyInstance } from "../../../types/fastify";
import { groupInfoSchema, paramsGroupSchema } from "./schema";
import studentRoutes from './students'

export default async function groupsRoutes(fastify: AppFastifyInstance){
	
	fastify.get('/groups', async() => {
		const groupsList = await fastify.model.groupsModel.getGroupsList()
		return groupsList
	})

	fastify.get('/groups/:group_id', { schema: paramsGroupSchema }, async (request) => {
		const { group_id } = (request.params as any)
		const groupInfo = await fastify.model.groupsModel.getGroupInfo(group_id)
		const subjects = await fastify.model.subjectsModel.getSubjectsFromGroup(group_id)
		return { groupInfo, subjects }
	})
	
	fastify.post('/groups', { schema: groupInfoSchema }, async (request) => {
		const { title } = (request.body as any)
		const info = {}
		const count = await fastify.model.groupsModel.addGroup({title, info})
		return { count }
	})

	fastify.delete('/groups/:group_id', { schema: paramsGroupSchema }, async (request) => {
		const { group_id } = (request.params as any)
		const resp = await fastify.model.groupsModel.deleteGroup(group_id)
		return resp
	})

	fastify.register(studentRoutes)
}