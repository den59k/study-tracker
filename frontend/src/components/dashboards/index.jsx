import styles from './dashboard.module.sass'

export default function Dashboard ({children}){

	return (
		<div className={styles.container}>
			{children}
		</div>
	)
}