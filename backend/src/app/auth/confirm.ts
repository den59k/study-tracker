import { TokenFastifyReply } from ".";
import { AppFastifyInstance } from "..";
import { confirmPasswordSchema, confirmSchema } from "./schema";

export default async function confirm (fastify: AppFastifyInstance){
	
	fastify.post('/auth/confirm', { schema: confirmSchema }, async(request) => {
		const { token } = (request.body as any)

		const info = await fastify.model.tokensModel.decodeJWT(token)
		if(!info) return {error: { token: 'wrong token' }}

		const userData = await fastify.model.usersModel.getUserData(info.id)
		return userData
	})

	fastify.put(
		'/auth/confirm', 
		{ schema: confirmPasswordSchema }, 
		async(request, reply: TokenFastifyReply) => {
			const { token, password } = (request.body as any)

			const info = await fastify.model.tokensModel.decodeJWT(token)
			if(!info) return {error: { token: 'wrong token' }}
		
			const count = await fastify.model.usersModel.updateData(info.id, { password })
			if(count > 0)
				return await reply.sendToken(info.id)
			else
				return { error: { token: 'unknown token' }}
		}
	)
}