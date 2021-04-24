import Model from "../model";

export default class TeachersModel extends Model{

	async getTeacherList(){
		const resp = await this.db.query(
			`SELECT id, info, email FROM users WHERE role='teacher'`
		)
		return resp.rows
	}

	async addTeacher({ email, info }){
		const resp = await this.db.query(
			`INSERT INTO users VALUES (DEFAULT, $1, $2, null, 'teacher') RETURNING id`,
			[ email, info ]
		) 

		return resp.rows[0]
	}

	async getTeacherInfo(id: number){
		const resp = await this.db.query(
			'SELECT id, info, email FROM users WHERE id=$1', [ id ]
		)
		return resp.rows[0]
	}

	async deleteTeacher(id: number){
		const resp = await this.db.query(`DELETE FROM users WHERE id=$1 AND role='teacher'`, [id])
		return resp.rowCount
	}

}