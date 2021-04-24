import cn from 'classnames'
import Button from 'components/controls/button';
import WorkModalWindow from 'components/modal-window/work';
import { observer } from "mobx-react-lite";
import { useModal } from 'providers/modal-window';
import { useRouter } from 'providers/router';
import { getName } from 'statics/pretty-info';
import { parseIm } from 'statics/url';
import useSWR from "swr";

import styles from '../dashboard.module.sass'
import teacherStyles from './teacher-students.module.sass'

export default function StudentInfo(){
	const router = useRouter()
	const { group_id, subject_id } = parseIm(router.get(1)) 
	const student_id = router.get(2)

	const { data: studentData } = useSWR(student_id?('/api/teacher/students/'+student_id): null)
	const { data: subjectData } = useSWR(subject_id?('/api/teacher/subjects/'+subject_id): null)

	console.log(studentData)

	if(!studentData || studentData.error) return null
	
	return (
		<div className={cn(styles.list, teacherStyles.info)}>
			<img className={teacherStyles.avatar} src={studentData.info.icon || '/images/user.svg'} alt="Изображение преподавателя"/>
			<div className={teacherStyles.surname}>{getName(studentData.info)}</div>
		</div>
	)
}