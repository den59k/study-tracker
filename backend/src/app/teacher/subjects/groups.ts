import { AppFastifyInstance, UserFastifyRequest } from "../../../types/fastify";
import { subjectParamsSchema, subjectGroupSchema } from './schema'

export default async function groupsRoutes(fastify: AppFastifyInstance){

	//Получение списка предметов
	fastify.get('/subjects/:subject_id/groups', { schema: subjectParamsSchema }, async (request) => {
		const { subject_id } = request.params as any
		const groups = await fastify.model.groupsModel.getGroupsFromSubject(subject_id)
		return groups
	})

	
}