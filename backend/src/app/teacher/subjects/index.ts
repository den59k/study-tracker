import { AppFastifyInstance, UserFastifyRequest } from "../../../types/fastify";
import groupsRoutes from './groups'
import workRoutes from "./works";
import { subjectParamsSchema } from "./schema";

export default async function teacherRoutes(fastify: AppFastifyInstance){

	fastify.get('/subjects', async(request: UserFastifyRequest) => {
		const { id } = request.userData
		const subjectList = await fastify.model.subjectsModel.getSubjectList(id)
		return subjectList
	})

	fastify.get('/subjects/:subject_id', { schema: subjectParamsSchema }, async (request) => {
		const { subject_id } = request.params as any
		const subjectData = await fastify.model.subjectsModel.getSubjectInfo(subject_id)
		const works = await fastify.model.worksModel.getWorks(subject_id)
		return { subjectData, works }
	})

	fastify.register(groupsRoutes)
	fastify.register(workRoutes)
}