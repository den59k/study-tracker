import Dashboard from "..";
import GroupsList from './groups-list'
import GroupStudentsList from './group-students-list'
import GroupInfo from './group-info'

export default function GroupsDashboard (){

	return (
		<Dashboard>
			<GroupsList />
			<GroupStudentsList/>
			<GroupInfo/>
		</Dashboard>
	)
}