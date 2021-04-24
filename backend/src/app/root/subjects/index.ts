import { AppFastifyInstance } from "../../../types/fastify";
import { searchSubjectSchema, subjectGroupParamsSchema, groupParamsSchema } from "./schema";

export default async function subjectsRoutes(fastify: AppFastifyInstance){
		
		//Поиск предметов
		const schema = { schema: {...searchSubjectSchema, ...groupParamsSchema }}
		fastify.get('/groups/:group_id/subjects', schema, async (request) => {
			const { title } = (request.query as any)
			const { group_id } = (request.params as any)
			const list = await fastify.model.subjectsModel.findSubjectByName(title, group_id)
			return list
		})

		//Добавление предмета к группе
		fastify.post('/groups/:group_id/subjects/:subject_id', { schema: subjectGroupParamsSchema }, async (request) => {
			const { group_id, subject_id } = (request.params as any)
			const count = await fastify.model.subjectsModel.addSubjectToGroup(subject_id, group_id)
			return { count }
		})

		//Удаление предмета из группы
		fastify.delete('/groups/:group_id/subjects/:subject_id', { schema: subjectGroupParamsSchema }, async (request) => {
			const { group_id, subject_id } = (request.params as any)
			const count = await fastify.model.subjectsModel.removeSubjectFromGroup(subject_id, group_id)
			return { count }
		})

}