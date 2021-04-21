import { Pool } from 'pg';
import Model from '../model';
import jwt from 'jsonwebtoken'

import getKeys from '../../libs/get-keys'

const sign = (info: any, key: Buffer, options: any): Promise<string> => new Promise((res, rej) => {
	jwt.sign( info, key, options, (err: any, token: string) => {
		if(err) return rej(err)
		res(token) 
	})
})

const verify = (token: string, key: Buffer): Promise<any> => new Promise((res, rej) => {
	jwt.verify( token, key, (err: any, decoded: any) => {
		if(err) return rej(err)
		res(decoded) 
	})
})

export default class TokensModel extends Model {

	publicKey: Buffer
	privateKey: Buffer

	constructor(db: Pool){
		super(db)

		const keys = getKeys()
		this.publicKey = keys.publicKey
		this.privateKey = keys.privateKey
	}

	async deleteRefreshToken(token: string){
		await this.db.query(`DELETE FROM refresh_tokens WHERE token=$1`, [ token ])
	}

	async useJWT(token: string){

		const resp = await this.db.query('DELETE FROM refresh_tokens WHERE token=$1', [token])
		return resp.rowCount > 0
	}

	async generateJWT(userInfo: any){
		
		const refreshToken = await sign(userInfo , this.privateKey, { algorithm: 'ES256' })
		const accessToken = await sign(userInfo, this.privateKey, { algorithm: 'ES256', expiresIn: '1h' })

		await this.db.query(
			`INSERT INTO refresh_tokens VALUES ($1, $2, $3)`, 
			[ userInfo.id, refreshToken, Date.now() ]
		)
			
		return { refreshToken, accessToken }
	}

	async decodeJWT(token: string){

		if(!token) return null
		
		const decoded = verify(token, this.publicKey)

		return decoded
	}

}