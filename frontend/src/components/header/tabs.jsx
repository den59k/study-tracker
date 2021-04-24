import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { useRouter, Link } from 'providers/router'

import styles from './header.module.sass'

function Tabs ({tabs}){
	
	const router = useRouter()

	const level = '/'+router.get(0)

	return tabs.map((item, index) => (
		<Link className={cn(level === item.to && styles.active, styles.tab)} key={index}to={item.to}>
			{item.title}
		</Link>
	))
}

export default observer(Tabs)