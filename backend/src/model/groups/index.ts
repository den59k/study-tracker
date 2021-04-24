import Model from "../model";

export default class GroupsModel extends Model {
	async getGroupsList(){
		const resp = await this.db.query('SELECT id, title, info FROM groups')
		return resp.rows
	}

	async getGroupsFromSubject (subject_id: number){
		const resp = await this.db.query(`
			SELECT id, title, student_count FROM groups
			LEFT JOIN (
				SELECT group_id, COUNT(*) as student_count FROM groups_students
				GROUP BY group_id
				) a ON a.group_id = groups.id
			LEFT JOIN groups_subjects ON groups_subjects.group_id=groups.id
			WHERE subject_id = $1
		`, [ subject_id ])
		return resp.rows
	}

	async getGroupInfo (group_id: number){
		const resp = await this.db.query(
			`SELECT id, title, info FROM groups WHERE id=$1`,
			[ group_id ]
		)
		return resp.rows[0]
	}

	async addGroup({ title, info }){
		const resp = await this.db.query('INSERT INTO groups VALUES (DEFAULT, $1, $2)', [ title, info ])
		return resp.rowCount
	}

	async editGroup(group_id: number, {title, info}){
		const resp = await this.db.query('UPDATE groups SET title=$2, info=$3 WHERE id=$1', [ group_id, title, info ])
		return resp.rowCount
	}

	async deleteGroup(group_id: number){
		const resp = await this.db.query('DELETE FROM groups WHERE id=$1', [group_id])
		const resp2 = await this.db.query('DELETE FROM groups_students WHERE group_id=$1', [group_id])
		return {count: resp.rowCount, studentsCount: resp2}
	}
}