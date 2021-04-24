import { useForm, getProps, Input, Button } from 'components/controls'
import Planet from 'components/decoration/planet'
import { observer } from 'mobx-react-lite'
import { useAuth } from 'providers/auth'
import { useRouter } from 'providers/router'
import { REST } from 'services'
import { getName } from 'statics/pretty-info'
import useSWR from 'swr'

import styles from './auth-page.module.sass'

const fetcher = (url, token) => REST(url, { token }, 'POST')

function ConfirmPage (){

	const form = useForm()
	const router = useRouter()
	const auth = useAuth()
	const token = router.get(1)
	
	const { data } = useSWR(['/api/auth/confirm', token], fetcher)

	const onSubmit = (e) => {
		e.preventDefault()
		if(form.formData.password !== form.formData.repeatPassword)
			return form.setErrors({repeatPassword: "Пароли должны совпадать!"})
		
		auth.confirmAccount({ token, password: form.formData.password }).then(err => {
			if(!err)
				router.push('/')
		})
	}

	if(!data || data.error) return <Planet/>

	return (
		<Planet title="Удобный способ вести учет успеваемости">
			<form onSubmit={onSubmit} className={styles.form}>
				<h1 style={{marginBottom: 0}}>Создание аккаунта</h1>
				<h2>{getName(data.info)}</h2>
				<Input {...getProps('password', form)} placeholder="Придумайте себе пароль" type="password" label="Пароль"/>
				<Input {...getProps('repeatPassword', form)} placeholder="Повторите пароль" type="password" label="Повтор пароля"/>
				<Button>Создать аккаунт</Button>
			</form>
		</Planet>
	)
}

export default observer(ConfirmPage)