import { sendMail } from '../../../libs/mails'

export async function sendTeacherMail (email: string, info: any, token: string){
	const link = process.env.ADDRESS+'/confirm/'+token
	const html = `
<h1>StudyTracker - система учета успеваемости</h1>
<h3>Добрый день, ${info.name} ${info.patronymic}!</h3><br/>
Вы зарегистрированы в качестве преподавателя в системе StudyTracker<br/><br/>
Для завершения регистрации вам необходмо перейти по ссылке:<br/>
<a href=${link}>${link}</a>
	`

	console.log(html)

	const sendResponse = await sendMail(email, 'Регистрация в системе StudyTracker', html)
	console.log(sendResponse)
}

