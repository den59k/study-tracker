import { AppFastifyInstance } from "../../../types/fastify";
import { addTeacherSchema, paramsSchema } from "./schema";

import { sendTeacherMail } from './mails' 
import subjectsRoutes from './subjects'

export default async function teacherRoutes(fastify: AppFastifyInstance){

	//Получение списка преподавателей
	fastify.get('/teachers', async () => {
		const teacherList = await fastify.model.teachersModel.getTeacherList()
		return teacherList
	})

	//Добавление преподавателя
	fastify.post('/teachers', { schema: addTeacherSchema }, async (request) => {
		const { email, name, surname, patronymic, position } = (request.body as any)

		const data = { email, info: { name, surname, patronymic, position }}
		const { id } = await fastify.model.teachersModel.addTeacher(data)
		
		const token = await fastify.model.tokensModel.jwt({id})
		await sendTeacherMail(email, { name, patronymic }, token)

		return { count: 1 }
	})

	//Удаление преподавателя
	fastify.delete(
		'/teachers/:teacher_id', 
		{ schema: paramsSchema },
		async(request) => {
			const { teacher_id } = (request.params as any)

			const count = await fastify.model.teachersModel.deleteTeacher(teacher_id)
			return count
		}
	)

	//Получение информации о преподавателе
	fastify.get('/teachers/:teacher_id', { schema: paramsSchema }, async(request) => {
		const teacher_id = parseInt((request.params as any).teacher_id)
		const info = await fastify.model.teachersModel.getTeacherInfo(teacher_id)
		if(!info) return { error: { id: "wrong id" }}
		return info
	})


	fastify.register(subjectsRoutes)

}