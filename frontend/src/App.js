import { useAuth } from "providers/auth";
import { observer } from "mobx-react-lite";
import AuthPage from "pages/auth";
import { useEffect } from "react";
import { useRouter } from 'providers/router'

import ConfirmPage from 'pages/confirm'
import RootPage from "pages/root";
import TeacherPage from "pages/teacher";
import StudentPage from "pages/student";

function App() {

	const auth = useAuth()
	const router = useRouter()

	useEffect(() => {
		auth.tryLoginWithToken()
	}, [auth])

	if(router.get(0) === 'confirm')
		return <ConfirmPage/>
	
	if(auth.status === 'not-authorized')
		return <AuthPage/>

	if(auth.status === 'authorized'){
		
		if(auth.userData.role === 'root')
			return <RootPage/>

		if(auth.userData.role === 'teacher')
			return <TeacherPage/>

		return <StudentPage/>
	}

	return <div></div>
}

export default observer(App);
