import { AppFastifyInstance } from "../../../types/fastify";
import { paramsGroupSchema, paramsStudentGroupSchema, paramsStudentSchema, studentInfoSchema } from './schema'

export default async function studentRoutes(fastify: AppFastifyInstance){

	fastify.get('/groups/:group_id/students', { schema: paramsGroupSchema }, async(request) => {
		const { group_id } = (request.params as any)
		const studentList = await fastify.model.studentsModel.getStudentsAtGroup(group_id)
		return studentList
	})

	fastify.get('/students', async() => {
		const studentList = await fastify.model.studentsModel.getStudents()
		return studentList
	})

	//Изменяет данные студента
	const schema1 = { schema: { ...paramsStudentSchema, ...studentInfoSchema } }
	fastify.put('/students/:student_id', schema1, async(request) => {
		const { student_id } = (request.params as any)
		const { email, name, surname, patronymic } = (request.body as any)
		const info = { name, surname, patronymic }

		const count = await fastify.model.studentsModel.editStudent(student_id, { email, info })
		return { count }
	})

	//Удаляет студента
	fastify.delete('/students/:student_id', { schema: paramsStudentSchema }, async(request) => {
		const { student_id } = (request.params as any)

		const count = await fastify.model.studentsModel.deleteStudent(student_id)
		return { count }
	})

	//Добавляет студента и сразу помещает его в группу
	const schema = { schema: {...paramsGroupSchema, ...studentInfoSchema } }
	fastify.post('/groups/:group_id/students', schema, async(request) => {
		const { group_id } = (request.params as any)
		const { email, name, surname, patronymic } = (request.body as any)
		const info = { name, surname, patronymic }

		let studentInfo: any 
		try{
			studentInfo = await fastify.model.studentsModel.addStudent({ email, info })
		}catch(e){
			studentInfo = await fastify.model.usersModel.getUserDataByEmail(email)

			if(studentInfo.role !== 'student')
				return { error: { email: 'Данный email уже занят' } }

			return { error: { email: 'student exists' }, studentInfo }
		}

		await fastify.model.studentsModel.addStudentToGroup({group_id, student_id: studentInfo.id })
		return { count: 1 }
	})

	//Просто добавляет студента в группу
	fastify.post('/groups/:group_id/students/:student_id', { schema: paramsStudentGroupSchema }, async(request) => {
		const { group_id, student_id } = (request.params as any)
		const count = await fastify.model.studentsModel.addStudentToGroup({group_id, student_id: student_id })
		return { count }
	})

	//Удаляет студента из группы 
	fastify.delete('/groups/:group_id/students/:student_id', { schema: paramsStudentGroupSchema }, async(request) => {
		const { group_id, student_id } = (request.params as any)
		const count = await fastify.model.studentsModel.deleteStudentFromGroup({group_id, student_id: student_id })
		return { count }
	})


}