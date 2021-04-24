import fp from 'fastify-plugin'
import { UserFastifyRequest, AppFastifyInstance } from '../../../types/fastify'


async function userPlugin (fastify: AppFastifyInstance){
	fastify.decorateRequest('userData', null)
	
	fastify.addHook('onRequest', async (request: UserFastifyRequest, reply) => {
		
		const access_token = request.cookies.access_token

		const userData = await fastify.model.tokensModel.decodeJWT(access_token)
		request.userData = userData
		return
	})
}

export default fp(userPlugin)
