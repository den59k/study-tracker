import { AppFastifyInstance } from "../../../types/fastify";
import { addSubjectSchema, paramsSchema, paramsSubjectSchema } from "./schema";

export default async function subjectsRoutes(fastify: AppFastifyInstance){
		//Вывод списка предметов преподавателя
		fastify.get('/teachers/:teacher_id/subjects', { schema: paramsSchema }, async (request) => {
			const teacher_id = parseInt((request.params as any).teacher_id)
			const subjects = await fastify.model.subjectsModel.getSubjectList(teacher_id)
	
			return subjects
		})
	
		//Добавление предмета
		fastify.post(
			'/teachers/:teacher_id/subjects', 
			{ schema: {...paramsSchema, ...addSubjectSchema} }, 
			async(request) => {
				const { teacher_id } = (request.params as any)
				const { title } = (request.body as any)
				const count = await fastify.model.subjectsModel.addSubject(teacher_id, { title })
				return count
			}
		)
		
		//Удаление предмета
		fastify.delete(
			'/teachers/:teacher_id/subjects/:subject_id', 
			{ schema: paramsSubjectSchema },
			async(request) => {
				const { teacher_id, subject_id } = (request.params as any)
	
				const count = await fastify.model.subjectsModel.deleteSubject(teacher_id, subject_id)
				return count
			}
		)

}