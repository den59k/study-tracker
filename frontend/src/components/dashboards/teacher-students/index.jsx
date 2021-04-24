import Dashboard from "..";
import StudentInfo from "./student-info";
import StudentsList from "./students-list";

export default function TeacherStudents(){

	return (
		<Dashboard>
			<StudentsList/>
			<StudentInfo/>
		</Dashboard>
	)
}