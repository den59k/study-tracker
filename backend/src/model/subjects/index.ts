import Model from "../model";

export default class SubjectsModel extends Model {
	async getSubjectList(teacher_id: number){
		const resp = await this.db.query(
			`SELECT id, title FROM subjects WHERE teacher_id=$1`,
			[ teacher_id ]
		)
		return resp.rows
	}

	async getSubjectInfo (subject_id: number){
		const resp = await this.db.query(`
			SELECT id, title FROM subjects WHERE id=$1
		`, [ subject_id ])
		return resp.rows[0]
	}

	async getSubjectsFromGroup (group_id: number){
		const resp = await this.db.query(`
			SELECT subjects.id, title, users.info as teacher_info, status FROM subjects 
			LEFT JOIN users ON users.id=subjects.teacher_id
			LEFT JOIN groups_subjects ON groups_subjects.subject_id=subjects.id
			WHERE groups_subjects.group_id=$1
			ORDER BY title
		`, [ group_id ])
		return resp.rows
	}
	
	//Ищет подходящий предмет, исходя из имени
	async findSubjectByName(str: string, group_id: number){
		const resp = await this.db.query(`
			SELECT exist,
			subjects.id, title, users.info as teacher_info FROM subjects 
			LEFT JOIN users ON users.id=subjects.teacher_id
			LEFT JOIN (
				SELECT subject_id, True exist FROM groups_subjects WHERE group_id=$2
			) a ON a.subject_id=subjects.id
			WHERE exist IS NOT true AND lower(title) LIKE '%'|| $1 || '%'
			ORDER BY NOT lower(title) LIKE ($1 || '%'), title
			LIMIT 5
		`, [ str, group_id ])
		return resp.rows
	}

	async addSubjectToGroup (subject_id: number, group_id: number){
		const resp = await this.db.query(`
			INSERT INTO groups_subjects VALUES ($1, $2) ON CONFLICT DO NOTHING
		`, [group_id, subject_id])
		return resp.rowCount
	}

	async removeSubjectFromGroup (subject_id: number, group_id: number){
		const resp = await this.db.query(`
			DELETE FROM groups_subjects WHERE group_id=$1 AND subject_id=$2 
		`, [ group_id, subject_id ])
		return resp.rowCount
	}

	async addSubject (teacher_id: number, { title }){
		const resp = await this.db.query(
			'INSERT INTO subjects VALUES (DEFAULT, $1, $2)',
			[ teacher_id, title ]
		)

		return resp.rowCount
	}

	async deleteSubject(teacher_id: number, subject_id: number){
		const resp = await this.db.query(
			'DELETE FROM subjects WHERE id=$1 AND teacher_id=$2',
			[ subject_id, teacher_id ]
		)
		return resp.rowCount
	}
}