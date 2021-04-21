
import styles from './planet.module.sass'

export default function Planet ({children}){

	return (
		<div className={styles.container}>
			{children}
		</div>
	)
}