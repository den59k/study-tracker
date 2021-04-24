import { observer } from 'mobx-react-lite'
import { useRouter } from 'providers/router'
import { useEffect } from 'react'

import GroupsDashboard from 'components/dashboards/groups'
import TeachersDashboard from 'components/dashboards/teachers'
import Header from 'components/header'

const tabs = [
	{ title: "Преподаватели", to: "/teachers" },
	{ title: "Группы", to: "/groups" }
]

function getComponent(level) {

	if(level === 'groups')
		return <GroupsDashboard/>

	return <TeachersDashboard/>
}

function RootPage (){

	const router = useRouter()
	const level = router.get(0)
	
	useEffect(() => {
		if(!level)
			router.replace('teachers', 0)
	}, [ level, router ])

	return (
		<div className="page">
			<Header tabs={tabs}/>
			{ getComponent(level) }
		</div>
	)
}

export default observer(RootPage)