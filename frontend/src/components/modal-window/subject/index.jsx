import { useForm, getProps, Input, Button } from "components/controls"
import { addSubject } from "services/root/subjects"
import styles from '../modal-window.module.sass'
import ModalWindow from ".."
import { useModal } from "providers/modal-window"

export default function SubjectModalWindow({defaultValues, teacher_id}){

	const form = useForm(defaultValues)
	const modal = useModal()

	const onSubmit = () => {
		addSubject(teacher_id, form.formData)
		.then(err => {
			if(err) return form.setErrors(err)
			modal.close()
		})
	}

	return (
		<ModalWindow title={defaultValues?"Изменение информации": "Добавление предмета"} style={{width: '600px'}}>
			<Input {...getProps('title', form)} label={"Название"} placeholder={"Введите название предмета"} />
			
			<Button className={styles.center} onClick={onSubmit}>Сохранить</Button>
		</ModalWindow>
	)
}