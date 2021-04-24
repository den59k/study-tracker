import { AppFastifyInstance } from "../../../types/fastify";
import { subjectParamsSchema, workSchema, subjectWorkParamsSchema } from './schema'

export default async function workRoutes(fastify: AppFastifyInstance){

	const schema =  { schema: { ...subjectParamsSchema, ...workSchema } }
	fastify.post('/subjects/:subject_id/works', schema, async (request) => {
		const { subject_id } = request.params as any
		const { title, theme, mark_type } = request.body as any

		const info = { theme }
		const count = await fastify.model.worksModel.addWork(subject_id, { title, info, mark_type })
		return { count }
	})

	const schema2 = { schema: { ...subjectWorkParamsSchema, ...workSchema }}
	fastify.put('/subjects/:subject_id/works/:work_id', schema2, async (request) => {
		const { subject_id, work_id } = request.params as any
		const { title, theme, mark_type } = request.body as any

		const info = { theme } 
		const count = await fastify.model.worksModel.editWork(work_id, subject_id, { title, info, mark_type })
		return { count }
	})

	fastify.delete('/subjects/:subject_id/works/:work_id', { schema: subjectWorkParamsSchema }, async (request) => {
		const { subject_id, work_id } = request.params as any
		const count = await fastify.model.worksModel.deleteWork(work_id, subject_id)
		return { count }
	})
}