import Model from '../model';

export default class UsersModel extends Model {
	
	async getUserList(){
		const resp = await this.db.query('SELECT * FROM users')
		
		return resp.rows
	}

	async authenticate({ email, password }){
		const resp = await this.db.query(
			`SELECT password = digest($2, 'sha1') true_password, id FROM users WHERE email=$1`,
			[ email, password ]
		)

		return resp.rows[0]
	}

	async getUserData(id: number){
		const resp = await this.db.query(
			`SELECT name, email FROM users WHERE id=$1`, [ id ]
		)

		return resp.rows[0]
	}

}