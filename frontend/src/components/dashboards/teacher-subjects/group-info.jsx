import cn from 'classnames'
import Button from 'components/controls/button';
import WorkModalWindow from 'components/modal-window/work';
import { observer } from "mobx-react-lite";
import { useModal } from 'providers/modal-window';
import { useRouter } from 'providers/router';
import useSWR from "swr";

import styles from '../dashboard.module.sass'
import teacherStyles from './teacher-subjects.module.sass'

function GroupInfo(){

	const router = useRouter()
	const subject_id = router.get(1)
	const { data } = useSWR(subject_id?('/api/teacher/subjects/'+subject_id): null)
	
	const modal = useModal()

	if(!data || data.error) return null


	const onAddWork = () => {
		modal.open(<WorkModalWindow subject_id={subject_id}/>)
	}

	const onEditWork = (item) => {
		const data = {
			title: item.title,
			theme: item.info.theme,
			mark_type: item.mark_type
		}
		modal.open(<WorkModalWindow subject_id={subject_id} work_id={item.id} defaultValues={data}/>)
	}

	console.log(data)
	return (
		<div className={cn(styles.list, teacherStyles.info)}>
			<div className={teacherStyles.title}>{data.subjectData.title}</div>
			<h4>Работы по предмету</h4>
			<div className={teacherStyles.works}>
				{data.works.map(item => (
					<button onClick={() => onEditWork(item)} key={item.id}>
						{item.title}
					</button>
				))}
			</div>
			<Button onClick={onAddWork}>Добавить работу</Button>
		</div>
	)
}

export default observer(GroupInfo)