import { useForm, getProps, Input, Button } from "components/controls"
import { useModal } from "providers/modal-window"
import { addTeacher } from "services/root/teachers"

import ModalWindow from ".."

import styles from '../modal-window.module.sass'

export default function TeacherModalWindow({defaultValues}){

	const form = useForm(defaultValues)
	const modal = useModal()

	const onSubmit = () => {
		addTeacher(form.formData)
		.then(err => {
			if(err) return form.setErrors(err)
			modal.close()
		})
	}

	return (
		<ModalWindow title={defaultValues?"Изменение информации": "Добавление преподавателя"} style={{width: '600px'}}>
			<Input {...getProps('email', form)} label={"Email"} placeholder={"Email"} />
			<Input {...getProps('surname', form)} label={"Фамилия"} placeholder={"Фамилия преподавателя"} />
			<div className={styles.group} style={{marginBottom: '40px'}}>
				<Input {...getProps('name', form)} label={"Имя"} placeholder={"Имя"} />
				<Input {...getProps('patronymic', form)} label={"Отчество"} placeholder={"Отчество"} />
			</div>
			<Input {...getProps('position', form)} label={"Должность"} placeholder={"Преподаватель"} />
			<Button className={styles.center} onClick={onSubmit}>Сохранить</Button>
		</ModalWindow>
	)
}