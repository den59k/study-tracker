import { AppFastifyInstance } from "../../../types/fastify";
import { groupParamsSchema } from './schema'

export default async function groupRoutes(fastify: AppFastifyInstance){

	fastify.get('/groups/:group_id', { schema: groupParamsSchema }, async(request) => {
		const { group_id } = request.params as any
		const groupInfo = await fastify.model.groupsModel.getGroupInfo(group_id)
		const students = await fastify.model.studentsModel.getStudentsAtGroup(group_id)
		return { groupInfo, students }
	})

}