import { AppFastifyInstance, UserFastifyRequest } from "../../../types/fastify";
import { studentParamsSchema, studentSubjectParamsSchema } from './schema'

export default async function studentRoutes(fastify: AppFastifyInstance){

	fastify.get('/students/:student_id', { schema: studentParamsSchema }, async (request) => {
		const { student_id } = request.params as any
		const studentData = await fastify.model.studentsModel.getStudentInfo(student_id)
		if(!studentData) return { error: { id: 'wrong id' } }
		return studentData
	})

	fastify.get('/students/:student_id/subjects/:subject_id', { schema: studentParamsSchema }, async (request) => {
		const { user_id, subject_id } = request.params as any

		return []
	})
}