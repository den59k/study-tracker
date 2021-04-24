import { useEffect, useState } from "react"
import cn from 'classnames'
import { Input, Button } from "components/controls"
import { useModal } from "providers/modal-window"


import ModalWindow from ".."
import inputStyles from 'components/controls/input/style.module.sass'
import styles from './style.module.sass'
import { getName } from "statics/pretty-info"
import { GET } from "services"
import { addSubjectToGroup } from "services/root/subjects"


export default function AddSubjectToGroupModal ({group_id}){
	
	const [ value, setValue ] = useState('')
	const [ items, setItems ] = useState([])
	const [ lastValue, setLastValue ] = useState('')
	const modal = useModal()

	useEffect(() => {
		if(value.length > 1 && lastValue !== null){
			if(value === lastValue) return 
			setLastValue(null)
			GET(`/api/root/groups/${group_id}/subjects?title=${value.toLowerCase()}`).then((res) => {
				setItems(res)
				setTimeout(() => setLastValue(value), 200)
			})
		}
	}, [value, lastValue])

	const _onChange = (e) => {
		setValue(e.target.value)
	}

	const onItemClick = (subject_id) => {
		addSubjectToGroup(subject_id, group_id)
		.then(err => {
			if(err) return console.log(err)
			modal.close()
		})
	}

	return (
		<ModalWindow title="Добавление дисциплины" style={{width: '500px', overflow: 'visible'}}>
			<div className={cn(inputStyles.input)}>
				<input placeholder="Введите название дисциплины..." onChange={_onChange} value={value || ""}/>
				{value.length > 1 && (
					<div className={styles.autocomplete}>
						{items.map(item => (
							<button className={styles.item} key={item.id} onClick={() => onItemClick(item.id)}>
								<div className={styles.title}>{item.title}</div>
								{item.teacher_info && <div className={styles.name}>{getName(item.teacher_info)}</div>}
							</button>
						))}
					</div>
				)}
			</div>
		</ModalWindow>
	)
}