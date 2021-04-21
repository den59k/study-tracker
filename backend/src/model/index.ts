import type { Pool } from 'pg'
import initDB from '../libs/init-db'
import TokensModel from './tokens'

import UsersModel from './users'

export default class AppModel {

	db: Pool
	usersModel: UsersModel
	tokensModel: TokensModel

	constructor(){
	}

	async init (){
		this.db = initDB()
		this.usersModel = new UsersModel(this.db)
		this.tokensModel = new TokensModel(this.db)
	}
}