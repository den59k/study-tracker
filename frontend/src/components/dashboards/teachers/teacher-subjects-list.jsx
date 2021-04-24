import { useMemo } from 'react';
import { useModal } from 'providers/modal-window'
import { observer } from "mobx-react-lite";
import useSWR from "swr";
import { useRouter } from 'providers/router';
import { deleteSubject } from 'services/root/subjects'

import styles from '../dashboard.module.sass'

import SubjectModalWindow from 'components/modal-window/subject'
import SubList from '../components/sub-list';
import ConfirmWindow from 'components/modal-window/confirm';
import { num } from 'statics/rus';

function TeacherSubjectsList (){

	const modal = useModal()
	const router = useRouter()
	const teacher_id = router.get(1)

	const url = '/api/root/teachers/'+teacher_id
	const { data } = useSWR(teacher_id? (url+'/subjects'): null)
	const { data: userData } = useSWR(teacher_id? url : null)

	const onAddSubjectClick = () => {
		modal.open(<SubjectModalWindow teacher_id={teacher_id} userData={userData}/>)
	}

	const onEditSubject = (item) => {
		modal.open(<SubjectModalWindow teacher_id={teacher_id} defaultValues={item} userData={userData}/>)
	}

	const onDeleteSubject = (item) => {
		modal.open(<ConfirmWindow 
			title="Удалить предмет?" 
			content={item.title} 
			onSubmit={() => deleteSubject(teacher_id, item.id)}
		/>)
	}

	const items = useMemo(() => {
		if(!data) return []
		return data.map(item => ({
			id: item.id, 
			title: item.title,
			onEdit: () => onEditSubject(item),
			onDelete: () => onDeleteSubject(item)
		}))
	}, [ data, router, onEditSubject, onDeleteSubject ])

	if(!data) return null

	return (
		<div style={{flex: '1 1 auto'}} className={styles.list}>
			<div className={styles.header}>
				<div className={styles.count}>{num(items.length, 'предмет', 'предмета', 'предметов')}</div>
				<button className="btn" onClick={onAddSubjectClick} style={{marginLeft: 'auto'}}>
					Добавить предмет
				</button>
			</div>
			<SubList items={items}/>
		</div>
	)

}

export default observer(TeacherSubjectsList)