import type { Pool } from 'pg'
import initDB from '../libs/init-db'
import GroupsModel from './groups'
import StudentsModel from './students'
import SubjectsModel from './subjects'
import TeachersModel from './teachers'
import TokensModel from './tokens'

import UsersModel from './users'
import WorksModel from './works'

export default class AppModel {

	db: Pool
	usersModel: UsersModel
	tokensModel: TokensModel
	teachersModel: TeachersModel
	subjectsModel: SubjectsModel
	groupsModel: GroupsModel
	studentsModel: StudentsModel
	worksModel: WorksModel

	constructor(){
	}

	async init (){
		this.db = initDB()
		this.usersModel = new UsersModel(this.db)
		this.tokensModel = new TokensModel(this.db)
		this.teachersModel = new TeachersModel(this.db)
		this.subjectsModel = new SubjectsModel(this.db)
		this.groupsModel = new GroupsModel(this.db)
		this.studentsModel = new StudentsModel(this.db)
		this.worksModel = new WorksModel(this.db)
	}
}