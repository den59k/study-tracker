import { useMemo } from 'react';
import { useModal } from 'providers/modal-window'
import { observer } from "mobx-react-lite";
import useSWR from "swr";
import { useRouter } from 'providers/router';

import styles from '../dashboard.module.sass'

import SubList from '../components/sub-list';
import ConfirmWindow from 'components/modal-window/confirm';
import { num } from 'statics/rus';
import StudentModalWindow from 'components/modal-window/student';
import { getName } from 'statics/pretty-info';
import { deleteStudentFromGroup } from 'services/root/students';

function GroupStudentsList (){

	const modal = useModal()
	const router = useRouter()
	const group_id = router.get(1)

	const url = '/api/root/groups/'+group_id
	const { data } = useSWR(group_id? (url+'/students'): null)

	const onAddStudent = () => {
		modal.open(<StudentModalWindow group_id={group_id} />)
	}


	const items = useMemo(() => {

		const onEditStudent = (item) => {
			const data = {
				email: item.email,
				...item.info
			}
			modal.open(<StudentModalWindow student_id={item.id} group_id={group_id} defaultValues={data}/>)
		}
	
		const onDeleteStudent = (item) => {
			modal.open(<ConfirmWindow 
				title="Удалить студента из группы?" 
				content={getName(item.info)} 
				onSubmit={() =>deleteStudentFromGroup(group_id, item.id) }
			/>)
		}

		if(!data || data.error) return []
		return data.map(item => ({
			id: item.id, 
			title: getName(item.info),
			sub: item.email,
			onEdit: () => onEditStudent(item),
			onDelete: () => onDeleteStudent(item)
		}))
	}, [ data, modal, group_id ])

	if(!data) return null

	return (
		<div style={{flex: '1 1 auto'}} className={styles.list}>
			<div className={styles.header}>
				<div className={styles.count}>{num(items.length, 'студент', 'студента', 'студентов')}</div>
				<button className="btn" onClick={onAddStudent} style={{marginLeft: 'auto'}}>
					Добавить студента
				</button>
			</div>
			<SubList items={items}/>
		</div>
	)

}

export default observer(GroupStudentsList)