import Dashboard from "..";
import TeachersList from "./teachers-list";
import TeacherSubjectsList from './teacher-subjects-list'
import TeacherInfo from './teacher-info'

export default function TeachersDashboard (){
	
	return (
		<Dashboard>
			<TeachersList/>
			<TeacherSubjectsList/>
			<TeacherInfo/>
		</Dashboard>
	)
}