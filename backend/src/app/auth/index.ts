import { AppFastifyInstance } from "..";

export default async function auth (fastify: AppFastifyInstance){

	fastify.get('/users', async () => {
		
		const userList = await fastify.model.usersModel.getUserList()
		return userList
	})

}