import { observer } from 'mobx-react-lite'
import { useRouter } from 'providers/router'
import { useEffect } from 'react'

import Header from 'components/header'
import HeaderIm from 'components/header/header-im'
import TeacherSubjects from 'components/dashboards/teacher-subjects'
import TeacherStudents from 'components/dashboards/teacher-students'

function TeacherPage(){

	const router = useRouter()
	const level = router.get(0)

	useEffect(() => {
		if(!level)
			router.replace('subjects', 0)
	}, [ level, router ])
	
	if(level === 'im'){
		return (
			<div className="page">
				<HeaderIm />
				<TeacherStudents/>
			</div>
		)
	}

	return (
		<div className="page">
			<Header title="Список предметов"/>
			<TeacherSubjects />
		</div>
	)
}

export default observer(TeacherPage)