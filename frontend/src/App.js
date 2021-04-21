import { useAuth } from "providers/auth";
import { observer } from "mobx-react-lite";
import AuthPage from "pages/auth";
import { useEffect } from "react";
import { toJS } from "mobx";

function App() {

	const auth = useAuth()
	useEffect(() => {
		auth.tryLoginWithToken()
	}, [auth])

	console.log(toJS(auth.userData))

	if(auth.status === '') return <div></div>

	if(auth.status === 'not-authorized')
		return <AuthPage/>

	return (
		<div className="App">
			<h1>Приложение</h1>
		</div>
	);
}

export default observer(App);
