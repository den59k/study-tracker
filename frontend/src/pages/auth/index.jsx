import { useForm, getProps, Input, Button } from 'components/controls'
import Planet from 'components/decoration/planet'
import { useAuth } from 'providers/auth'
import { useRouter } from 'providers/router'

import styles from './auth-page.module.sass'

function AuthPage (){

	const auth = useAuth()
	const form = useForm()
	const router = useRouter()
	
	const onSubmit = (e) => {
		e.preventDefault()
		
		if(!form.get('email')) return form.setErrors({email: "Поле email должно быть заполнено"})
		if(!form.get('password')) return form.setErrors({password: "Введите пароль от аккаунта"})
		
		auth.tryLoginWithCredentials(form.formData).then((err) => {
			router.push('/')
			if(err) form.setErrors(err)
		})
	}

	return (
		<Planet title="Удобный способ вести учет успеваемости">
			<form onSubmit={onSubmit} className={styles.form}>
				<h1>Вход в аккаунт</h1>
				<Input placeholder="Ваш email" {...getProps('email', form)} label="Email"/>
				<Input placeholder="Пароль" {...getProps('password', form)} type="password" label="Пароль"/>
				<Button>Войти</Button>
			</form>
		</Planet>
	)
}

export default AuthPage