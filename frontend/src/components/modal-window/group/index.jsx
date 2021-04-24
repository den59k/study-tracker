import { useForm, getProps, Input, Button } from "components/controls"
import { addGroup, editGroup } from "services/root/groups"
import styles from '../modal-window.module.sass'
import ModalWindow from ".."
import { useModal } from "providers/modal-window"

export default function GroupModalWindow({defaultValues, group_id}){

	const form = useForm(defaultValues)
	const modal = useModal()

	const onSubmit = () => {
		const promise = defaultValues?
			editGroup(group_id, form.formData) :
			addGroup(form.formData)

		promise.then(err => {
			if(err) return form.setErrors(err)
			modal.close()
		})
	}

	return (
		<ModalWindow title={defaultValues?"Изменение информации": "Добавление группы"} style={{width: '600px'}}>
			<Input {...getProps('title', form)} label={"Название"} placeholder={"Введите название группы"} />
			
			<Button className={styles.center} onClick={onSubmit}>Сохранить</Button>
		</ModalWindow>
	)
}