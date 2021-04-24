import { AppFastifyInstance } from "..";
import { authCredentialSchema, authTokenSchema } from "./schema";

import confirm from './confirm'
import { FastifyReply } from "fastify";

export interface TokenFastifyReply extends FastifyReply{
	sendToken: (user_id: number) => Promise<FastifyReply>
}

export default async function auth (fastify: AppFastifyInstance){

	//Этой функцией мы записываем все дело в куки и отправляем информацию
	fastify.decorateReply('sendToken', async function(user_id: number){
		const userData = await fastify.model.usersModel.getUserData(user_id)

		const data = {
			id: userData.id,
			role: userData.role
		}

		const { refreshToken, accessToken } = await fastify.model.tokensModel.generateJWT(data)

		this.setCookie('access_token', accessToken, { maxAge: 3600 })
		this.send({refreshToken, userData})
		return this
	})

	fastify.register(confirm)

	fastify.post('/auth', { schema: authCredentialSchema }, async (request, reply: TokenFastifyReply) => {

		const { email, password } = request.body as any
		
		const preUserData = await fastify.model.usersModel.authenticate({ email, password })
		if(!preUserData) 
			return { error: { email: "Такого пользователя не существует" } }

		if(preUserData.true_password === false) 
			return { error: { password: "Неверный пароль" } }

		return await reply.sendToken(preUserData.id)
	})

	fastify.post('/auth-token', { schema: authTokenSchema }, async (request, reply: TokenFastifyReply) => {
		
		const data = await fastify.model.tokensModel.decodeJWT((request.body as any).refreshToken)		
		if(data === null) return { error: { refreshToken: "wrong token" } }

		const valid = await fastify.model.tokensModel.useJWT((request.body as any).refreshToken)
		if(!valid) return { error: { refreshToken: "unknown token" } }
		
		return await reply.sendToken(data.id)
	})

	fastify.delete('/auth', { schema: authTokenSchema }, async (request, reply) => {
		const success = await fastify.model.tokensModel.useJWT((request.body as any).refreshToken)
		reply.clearCookie('access_token')
		return ({ success })
	})

}