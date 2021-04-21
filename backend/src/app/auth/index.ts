import { AppFastifyInstance } from "..";
import { authCredentialSchema, authTokenSchema } from "./schema";

export default async function auth (fastify: AppFastifyInstance){

	fastify.post('/auth', { schema: authCredentialSchema }, async (request, reply) => {

		const { email, password } = request.body as any
		
		const preUserData = await fastify.model.usersModel.authenticate({ email, password })
		if(!preUserData) 
			return { error: { email: "Такого пользователя не существует" } }

		if(preUserData.true_password === false) 
			return { error: { password: "Неверный пароль" } }

		const data = {
			id: preUserData.id
		}
		
		const { refreshToken, accessToken } = await fastify.model.tokensModel.generateJWT(data)
		reply.setCookie('access_token', accessToken, { maxAge: 3600*1000 })
		
		const userData = await fastify.model.usersModel.getUserData(preUserData.id)

		reply.send({ refreshToken, userData })
	})

	fastify.post('/auth-token', { schema: authTokenSchema }, async (request, reply) => {
		
		const data = await fastify.model.tokensModel.decodeJWT((request.body as any).refreshToken)		
		if(data === null) return { error: { refreshToken: "wrong token" } }

		const valid = await fastify.model.tokensModel.useJWT((request.body as any).refreshToken)
		if(!valid) return { error: { refreshToken: "unknown token" } }

		const { refreshToken, accessToken } = await fastify.model.tokensModel.generateJWT(data)
		reply.setCookie('access_token', accessToken, { maxAge: 3600*1000 })

		const userData = await fastify.model.usersModel.getUserData(data.id)
		
		reply.send({ refreshToken, userData })
	})

	fastify.get('/users', async () => {
		
		const userList = await fastify.model.usersModel.getUserList()
		return userList
	})

}