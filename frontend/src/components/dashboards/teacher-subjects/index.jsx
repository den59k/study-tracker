
import Dashboard from ".."
import GroupInfo from "./group-info"
import GroupList from "./group-list"
import SubjectList from "./subject-list"

export default function TeacherSubjects(){

	return (
		<Dashboard>
			<SubjectList/>
			<GroupList/>
			<GroupInfo/>
		</Dashboard>
	)
}