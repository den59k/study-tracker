import { useForm, getProps, Input, Button, SegmentButton } from "components/controls"
import { useModal } from "providers/modal-window"
import { addWork, deleteWork, editWork } from "services/teacher/work"

import ModalWindow from ".."
import ConfirmWindow from "../confirm"


const fields = {
	mark: "Оценка (1-5)",
	binary: "Зачет / незачет"
}

export default function WorkModalWindow({subject_id, work_id, defaultValues}){
	
	const form = useForm(defaultValues || { mark_type: 'mark' })
	const modal = useModal()

	const onSubmit = () => {
		const promise = work_id?
			editWork(subject_id, work_id, form.formData): 
			addWork(subject_id, form.formData)
		
		promise.then(err => {
			if(err) return form.setErrors(err)
			modal.close()
		})
	}

	const onDeleteWork = () => {
		modal.replaceCurrent(<WorkModalWindow subject_id={subject_id} work_id={work_id} defaultValues={form.formData} />)
		modal.open(<ConfirmWindow title="Удалить работу?" content={defaultValues.title} onSubmit={() => {
			deleteWork(subject_id, work_id)
			.then(err => {
				if(err) return
				modal.closeAll()
			})
		}}/>)
	}

	return (
		<ModalWindow title={defaultValues?"Изменение информации": "Добавление работы"} style={{width: '550px'}}>
			<Input {...getProps('title', form)} label="Наименование" placeholder="Лабораторная работа 1" />
			<Input {...getProps('theme', form)} label="Тема" placeholder="Тема работы (необязательно)" />
			<SegmentButton {...getProps('mark_type', form)} fields={fields} label="Метод оценивания"/>
			<Button onClick={onSubmit} style={{marginBottom: '10px'}}>Сохранить</Button>

			{ work_id && (
				<button className="btn red" onClick={onDeleteWork}>Удалить работу</button>
			) }
		</ModalWindow>
	)
}