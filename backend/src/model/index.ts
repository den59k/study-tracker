import type { Pool } from 'pg'
import initDB from '../libs/init-db'

import UsersModel from './users'

export default class AppModel {

	db: Pool
	usersModel: UsersModel

	constructor(){
	}

	async init (){
		this.db = initDB()

		this.usersModel = new UsersModel(this.db)
	}
}