import cn from 'classnames'
import ConfirmWindow from 'components/modal-window/confirm';
import TeacherModalWindow from 'components/modal-window/teacher';
import { observer } from "mobx-react-lite";
import { useModal } from 'providers/modal-window';
import { useRouter } from 'providers/router';
import { deleteTeacher } from 'services/root/teachers';
import { getName } from 'statics/pretty-info';
import useSWR from "swr";

import styles from '../dashboard.module.sass'
import teacherStyles from './teachers.module.sass'

function TeacherInfo(){

	const router = useRouter()
	const teacher_id = router.get(1)
	const { data } = useSWR(teacher_id?('/api/root/teachers/'+teacher_id): null)
	
	const modal = useModal()
	
	const editTeacher = () => {
		const info = {
			email: data.email,
			...data.info
		}
		modal.open(<TeacherModalWindow teacher_id={data.id} defaultValues={info} />)
	}

	const onDeleteTeacher = () => {
		modal.open(<ConfirmWindow 
			title="Удалить преподавателя?" 
			content={getName(data.info)} 
			onSubmit={() => {
				deleteTeacher(data.id)
				router.push('/teachers')
			}}
		/>)
	}

	if(!data || data.error) return null

	return (
		<div className={cn(styles.list, teacherStyles.teacherInfo)}>
			<img className={teacherStyles.avatar} src={data.info.icon || '/images/user.svg'} alt="Изображение преподавателя"/>
			<div className={teacherStyles.surname}>{data.info.surname}</div>
			<div className={teacherStyles.name}>{data.info.name} {data.info.patronymic}</div>
			<div className={teacherStyles.position}>{data.info.position}</div>
			<button className="btn" onClick={editTeacher}>Изменить информацию</button>
			<button className="btn red" style={{marginTop: 'auto'}} onClick={onDeleteTeacher}>Удалить профиль</button>
		</div>
	)
}

export default observer(TeacherInfo)