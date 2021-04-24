import styles from './sub-list.module.sass'

import { IoMdCreate, IoMdTrash } from 'react-icons/io'

export default function SubList ({items}){

	if(!items) return null

	return (
		<ul className={styles.list}>
			{items.map(item => (
				<li key={item.id}>
					<div className={styles.info}>
						<div className={styles.title}>{item.title}</div>
						{item.sub && <div className={styles.sub}>{item.sub}</div>}
					</div>
					<div className={styles.buttons}>
						{item.onEdit && <button onClick={item.onEdit}><IoMdCreate/></button>}
						{item.onDelete && <button onClick={item.onDelete}><IoMdTrash/></button>}
					</div>
				</li>
			))}
		</ul>
	)
}