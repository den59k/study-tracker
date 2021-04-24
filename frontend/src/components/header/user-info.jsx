import { useState } from 'react'
import { observer } from "mobx-react-lite";
import { useAuth } from "providers/auth";
import { user_roles } from "statics/constants";
import { getName } from "statics/pretty-info";

import styles from './header.module.sass'
import DropDownMenu from "components/common/drop-down";



function UserInfo (){
	
	const auth = useAuth()

	const [ opened, setOpened ] = useState(false)

	if(!auth.userData) return null

	const fields = [
		{ title: "Настройки аккаунта" },
		{ title: "Выйти из аккаунта", onClick: () => {
			auth.logout() 
		}}
	]	

	const role = user_roles[auth.userData.role] 
	
	return (
		<div className={styles.userInfo}>
			<button onClick={() => setOpened(true)}>
				<div className={styles.info}>
					<div className={styles.name}>{getName(auth.userData.info)}</div>
					<div className={styles.role}>{role}</div>
				</div>
				<img src={auth.userData.info.image || '/images/user.svg'} alt="Иконка пользователя"/>
			</button>
			<DropDownMenu opened={opened} onClose={() => setOpened(false)} fields={fields}/>
		</div>
	)
}

export default observer(UserInfo)