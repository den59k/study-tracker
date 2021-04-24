import Model from '../model';

export default class UsersModel extends Model {
	
	async getUserList(){
		const resp = await this.db.query('SELECT * FROM users')
		
		return resp.rows
	}

	async authenticate({ email, password }){
		const resp = await this.db.query(
			`SELECT password = digest($2, 'sha1') true_password, id, role FROM users WHERE email=$1`,
			[ email, password ]
		)

		return resp.rows[0]
	}

	async getUserData(id: number){
		const resp = await this.db.query(
			`SELECT id, info, email, role FROM users WHERE id=$1`, [ id ]
		)

		return resp.rows[0]
	}

	async getUserDataByEmail(email: string){
		const resp = await this.db.query(
			`SELECT id, info, email, role FROM users WHERE email=$1`, [ email ]
		)
		return resp.rows[0]
	} 

	async updateData(user_id: number, { password }){
		const resp = await this.db.query( 
			`UPDATE users SET password=digest($2, 'sha1') WHERE id=$1`, 
			[ user_id, password ]
		)
		return resp.rowCount
	}

}