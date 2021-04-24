import cn from 'classnames'

import styles from './list.module.sass'

export default function List({className, items, active, ...props}){
	
	if(!Array.isArray(items)) return null
	
	return (
		<ul className={cn(className, styles.list)} {...props}>
			{items.map(item => (
				<li key={item.id} className={cn(active === item.id && styles.active)}>
					<button onClick={item.onClick}>
						{item.icon && <img src={item.icon} alt="Иконка списка"/> }
						<div className={styles.info}>
							<div className={styles.title}>{item.title}</div>
							{ item.sub && <div className={styles.sub}>{item.sub}</div> }
						</div>
					</button>
				</li>
			))}
		</ul>
	)
}