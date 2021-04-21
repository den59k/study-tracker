import Model from '../model';

export default class UsersModel extends Model {
	
	async getUserList(){
		const resp = await this.db.query('SELECT * FROM users')
		
		return resp.rows
	}
}