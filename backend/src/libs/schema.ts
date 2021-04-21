import { FastifySchema } from "fastify";

export default function getSchema (body: any): FastifySchema {
	if(!body.type) body.type = 'object'
	
	const schema = {
		body
	}

	return schema
}