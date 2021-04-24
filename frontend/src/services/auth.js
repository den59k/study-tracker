
import { REST } from "./index"

export function getRefreshToken(){
	return window.localStorage.getItem('refreshToken')
}

export async function authWithCredentials({ email, password }){
	const { refreshToken, userData, error } = await REST('/api/auth', { email, password })

	if(error) return { error }

	localStorage.setItem('refreshToken', refreshToken)
	
	return { userData }
} 


export async function authWithToken (){

	const data = { refreshToken: getRefreshToken()	}
	if(!data.refreshToken) return null

	const { refreshToken, userData, error } = await REST('/api/auth-token', data)
	
	if(error){
		//localStorage.removeItem('refreshToken')
		console.log(error)
		return null
	}
	
	localStorage.setItem('refreshToken', refreshToken)
	return userData
}

export async function authCreateAccount ({token, password}){

	const { refreshToken, userData, error } = await REST('/api/auth/confirm', { token, password }, 'PUT')

	if(error)
		return null
	
	localStorage.setItem('refreshToken', refreshToken)
	return userData
}

export async function logout(){

	const data = { refreshToken: getRefreshToken()	}
	if(!data.refreshToken) return null

	await REST('/api/auth', data, 'DELETE')
	localStorage.removeItem('refreshToken')
} 