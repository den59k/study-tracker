import { useRouter } from "providers/router";
import { useMemo } from "react";
import { num } from "statics/rus";
import useSWR from "swr";
import List from "../components/list";
import styles from '../dashboard.module.sass'

export default function SubjectList (){

	const { data } = useSWR('/api/teacher/subjects')
	const router = useRouter()
	const acitveSubject = parseInt(router.get(1))

	const items = useMemo(() => {
		if(!data || data.error) return []
		return data.map(item => ({
			id: item.id,
			title: item.title,
			onClick: () => router.push(item.id, 1)
		}))
	}, [data, router])

	return (
		<div className={styles.list}>
			<div className={styles.header}>
				<div className={styles.count}>{num(items.length, 'дисциплина', 'дисциплины', 'дисциплин')}</div>
			</div>
			<List items={items} active={acitveSubject}/>
		</div>
	)
}