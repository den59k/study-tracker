
import styles from './header.module.sass'

import UserInfo from "./user-info"
import Tabs from "./tabs"
import Link from 'providers/router/link'
import { IoIosArrowBack } from 'react-icons/io'

export default function Header ({backTo, tabs, title}){

	return (
		<header className={styles.header}>
			{ backTo && <Link className={styles.back} to={backTo}><IoIosArrowBack/></Link>}
			{ title && <div className={styles.title}>{title}</div> }
			{ tabs && <Tabs tabs={tabs}/> }
			<UserInfo/>
		</header>
	)
}