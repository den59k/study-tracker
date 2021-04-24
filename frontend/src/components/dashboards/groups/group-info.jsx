import cn from 'classnames'
import Button from 'components/controls/button';
import AddSubjectToGroupModal from 'components/modal-window/add-subject-to-group';
import ConfirmWindow from 'components/modal-window/confirm';
import { useModal } from 'providers/modal-window';
import { useRouter } from 'providers/router';
import { deleteGroup } from 'services/root/groups';
import useSWR from "swr";
import SubList from '../components/sub-list';

import styles from '../dashboard.module.sass'
import groupStyles from './groups.module.sass'
import { getSmallName } from 'statics/pretty-info'
import { removeSubjectFromGroup } from 'services/root/subjects';

export default function GroupInfo (){
	
	const router = useRouter()
	const group_id = router.get(1)

	const url = '/api/root/groups/'+group_id
	const { data } = useSWR(group_id? (url): null)

	const modal = useModal()

	const onAddSubject = () => {
		modal.open(<AddSubjectToGroupModal group_id={group_id}/>)
	}

	const onDeleteGroup = () => {
		modal.open(<ConfirmWindow 
			title="Удалить группу?" 
			content={data.groupInfo.title} 
			onSubmit={() => {
				deleteGroup(data.groupInfo.id)
				router.push('/groups')
			}}
		/>)
	}

	if(!data || data.error) return 	<div className={cn(styles.list, groupStyles.info)}></div>

	const subjects = data.subjects.map(item => ({
		id: item.id,
		title: item.title,
		sub: item.teacher_info && getSmallName(item.teacher_info),
		onDelete: () => removeSubjectFromGroup(item.id, group_id)
	}))

	return (
		<div className={cn(styles.list, groupStyles.info)}>
			<div className={groupStyles.title}>{data.groupInfo.title}</div>
			<h4>{subjects.length === 0?"Нет изучаемых дисциплин": "Изучаемые дисциплины:"}</h4>
			<SubList items={subjects}/>
			<Button style={{alignSelf: 'center', marginTop: "1em"}} onClick={onAddSubject}>Добавить дисциплину</Button>
			<button className="btn red" style={{marginTop: 'auto'}} onClick={onDeleteGroup}>
				Удалить группу
			</button>
		</div>
	)
}