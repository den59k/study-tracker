import { useForm, getProps, Input, Button } from "components/controls"
import { useModal } from "providers/modal-window"
import { addStudent, addStudentToGroup, editStudent } from "services/root/students"
import { getName } from "statics/pretty-info"

import ModalWindow from ".."
import ConfirmWindow from "../confirm"

import styles from '../modal-window.module.sass'

export default function StudentModalWindow({group_id, student_id, state, defaultValues}){

	const form = useForm(state || defaultValues)
	const modal = useModal()
	
	const onSubmit = () => {
		const data = form.formData
		addStudent(group_id, data)
		.then(err => {
			
			if(err && err.studentInfo){
				const submit = () => {
					addStudentToGroup(group_id, err.studentInfo.id)
					modal.closeAll()
				}
				modal.replaceCurrent( <StudentModalWindow state={form.formData} group_id={group_id} />)
				modal.open(
					<ConfirmWindow title="Студент уже существует" actionTitle="Добавить" onSubmit={submit}>
						<div style={{textAlign: 'center'}}>Студент с email <b>{data.email}</b> уже существует: </div>
						<div style={{textAlign: 'center', fontWeight: 500}}>{getName(err.studentInfo.info)}</div>
						<div style={{textAlign: 'center'}}>Добавить этого студента в группу?</div>
					</ConfirmWindow>
				)
				return
			}
			if(err) return form.setErrors(err.error)
			modal.close()
		})
	}

	const onSubmitEdit = () => {
		editStudent(student_id, form.formData, group_id)
		.then(err => {
			if(err) return form.setErrors(err)
			modal.close()
		})
	}

	return (
		<ModalWindow title={defaultValues?"Изменение информации": "Добавление студента"} style={{width: '600px'}}>
			<Input {...getProps('email', form)} label={"Email"} placeholder={"Email"} />
			<div className={styles.group} style={{marginBottom: '40px'}}>
				<Input {...getProps('surname', form)} label={"Фамилия"} placeholder={"Фамилия"} />
				<Input {...getProps('name', form)} label={"Имя"} placeholder={"Имя"} />
			</div>

			<Button className={styles.center} onClick={defaultValues? onSubmitEdit: onSubmit}>Сохранить</Button>
		</ModalWindow>
	)
}