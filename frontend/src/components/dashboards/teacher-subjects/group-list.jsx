import { useRouter } from "providers/router";
import { useMemo } from "react";
import { num } from "statics/rus";
import useSWR from "swr";
import List from "../components/list";
import styles from '../dashboard.module.sass'

export default function GroupList (){

	const router = useRouter()
	const subject_id = parseInt(router.get(1))
	const { data } = useSWR(subject_id?('/api/teacher/subjects/'+subject_id+'/groups'): null)

	const items = useMemo(() => {
		if(!data || data.error) return []
		return data.map(item => ({
			id: item.id,
			title: item.title,
			sub: num(item.student_count, 'студент', 'студента', 'студентов'),
			onClick: () => router.push('/im/'+subject_id+'-'+item.id)
		}))
	}, [data, router, subject_id ])

	if(!data) return (
		<div className={styles.list} style={{flex: '1 1 auto'}}>
		
		</div>
	)

	return (
		<div className={styles.list} style={{flex: '1 1 auto'}}>
			<div className={styles.header}>
				<div className={styles.count}>Предмет изучает {num(items.length, 'группа', 'группы', 'групп')}</div>
			</div>
			<List items={items} />
		</div>
	)
}