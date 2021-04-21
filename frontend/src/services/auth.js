import { mutate } from "swr"
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

	const data = {
		refreshToken: getRefreshToken()
	}

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

export async function logout(){
	const token = localStorage.getItem('refreshToken')
	await REST('/api/auth', { token }, 'DELETE')
	localStorage.removeItem('refreshToken')
	mutate('/api')
} 