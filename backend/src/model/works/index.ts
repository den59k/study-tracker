import Model from "../model";

export default class WorksModel extends Model {
	async getWorks (subject_id: number){
		const resp = await this.db.query(`
			SELECT id, title, info, mark_type FROM works WHERE subject_id=$1
		`, [ subject_id ])

		return resp.rows
	}

	async addWork (subject_id: number, { title, info, mark_type }){
		const resp = await this.db.query(`
			INSERT INTO works VALUES (DEFAULT, $1, $2, $3, $4)
		`, [ title, subject_id, info, mark_type ])
		return resp.rowCount
	}

	async editWork (work_id: number, subject_id: number, { title, info, mark_type }){
		const resp = await this.db.query(`
			UPDATE works SET title=$3, info=$4, mark_type=$5 WHERE id=$1 AND subject_id=$2
		`, [ work_id, subject_id, title, info, mark_type ])
		return resp.rowCount
	}

	async deleteWork (work_id: number, subject_id: number){
		const resp = await this.db.query('DELETE FROM works WHERE id=$1 AND subject_id=$2', [ work_id, subject_id ])
		return resp.rowCount
	}
}