import { useEffect } from 'react'
import cn from 'classnames'

import styles from './drop-down.module.sass'

export default function DropDownMenu ({ fields, opened, onClose }){

	useEffect(() => {
		if(opened){
			const click = (e) => {
				onClose()
			}

			document.addEventListener('click', click)

			return () => document.removeEventListener('click', click)
		}
	}, [ opened, onClose ])

	return (
		<div className={cn(styles.menu, !opened && styles.closed)}>
			{fields.map((item, index) => (
				<button onClick={item.onClick} key={index}>{item.title}</button>
			))}
		</div>
	)
}