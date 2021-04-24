import Model from "../model";

export default class StudentsModel extends Model {
	async getStudentsAtGroup(group_id: number){
		const resp = await this.db.query(`
			SELECT id, email, info FROM users 
			LEFT JOIN groups_students ON users.id=groups_students.student_id
			WHERE group_id = $1
			ORDER BY info->>'surname'
		`, [ group_id ])
		return resp.rows
	}

	async getStudents (){
		const resp = await this.db.query(`SELECT id, email, info FROM users WHERE role='student'`)
		return resp.rows
	}

	async getStudentInfo(user_id: number){
		const resp = await this.db.query(
			`SELECT id, email, info FROM users WHERE role='student' AND id=$1`, 
			[ user_id ]
		)
		return resp.rows[0]
	}

	async addStudent({ email, info }){
		const resp = await this.db.query(
			`INSERT INTO users VALUES (DEFAULT, $1, $2, null, 'student') RETURNING id`,
			[ email, info ]
		) 
		return resp.rows[0]
	}

	async editStudent(student_id: number, { email, info }){
		const resp = await this.db.query(
			`UPDATE users SET email=$2, info=$3 WHERE id=$1 AND role='student'`,
			[ student_id, email, info ]
		) 
		return resp.rowCount
	}

	async deleteStudent(student_id: number){
		const resp = await this.db.query(
			`DELETE FROM users WHERE id=$1 AND role='student'`,
			[ student_id ]
		)
		const resp2 = await this.db.query(
			`DELETE FROM groups_students WHERE id=$1`,
			[ student_id ]
		)
		return { count: resp.rowCount, countGroup: resp2.rowCount }
	}

	async addStudentToGroup({ group_id, student_id }){
		const resp = await this.db.query(
			`INSERT INTO groups_students VALUES ($1, $2)`,
			[ group_id, student_id ]
		)
		return resp.rowCount
	}

	async deleteStudentFromGroup({group_id, student_id}){
		const resp = await this.db.query(
			'DELETE FROM groups_students WHERE group_id=$1 AND student_id=$2',
			[ group_id, student_id ]
		)
		return resp.rowCount
	}
}