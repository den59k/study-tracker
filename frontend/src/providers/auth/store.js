import { makeAutoObservable, runInAction } from "mobx";
import { authWithToken, authWithCredentials, logout, authCreateAccount } from "services/auth";

export default class AuthStore {
	
	status = ""
	userData = null

	constructor(){
		makeAutoObservable(this)
	}

	async tryLoginWithToken(){
		
		const userData = await authWithToken()

		runInAction(() => {

			if(!userData){
				this.status = "not-authorized"
				return
			}
			this.status = 'authorized'
			this.userData = userData
		})
	}

	async tryLoginWithCredentials({email, password}){
		const { userData, error } = await authWithCredentials ({email, password})

		runInAction(() => {
			if(userData){
				this.status = 'authorized'
				this.userData = userData
			}
		})

		if(!userData)
			return error || { login: "Произошла ошибка" }

	}

	async confirmAccount ({token, password}){
		const userData = await authCreateAccount({token, password})

		runInAction(() => {
			if(userData){
				this.status = 'authorized'
				this.userData = userData
			}
		})
		if(!userData)
			return { password: "Произошла ошибка" }
	}

	async logout(){
		await logout()
		runInAction(() => {
			this.userData = null
			this.status = 'not-authorized'
		})
	}
	
}