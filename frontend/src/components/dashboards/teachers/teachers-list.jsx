import { useMemo, useState } from 'react'
import { useModal } from 'providers/modal-window'
import { observer } from "mobx-react-lite";
import useSWR from "swr";

import styles from '../dashboard.module.sass'
import List from "../components/list";
import Input from "components/controls/input";
import { AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai'

import TeacherModalWindow from 'components/modal-window/teacher'
import { getName } from 'statics/pretty-info';
import { useRouter } from 'providers/router';

function TeachersList(){

	const [ searchValue, setSearchValue ] = useState('')
	const modal = useModal()
	const router = useRouter()

	const { data } = useSWR('/api/root/teachers')
	const activeTeacher = parseInt(router.get(1))

	const onAddTeacherButtonClick = () => {
		modal.open(<TeacherModalWindow />)
	}

	const items = useMemo(() => {
		if(!data) return []
		return data.map(item => ({ 
			id: item.id, 
			title: getName(item.info),
			icon: item.info.icon || '/images/user.svg',
			onClick: () => router.push(item.id, 1)
		}))
	}, [ data, router ]) 

	return (
		<div className={styles.list}>
			<div className={styles.header} style={{padding: "0 14px"}}>
				<Input 
					className={styles.search}
					placeholder="Поиск..." 
					value={searchValue} 
					onChange={setSearchValue} 
					icon={<AiOutlineSearch/>}
				/>
				<button style={{paddingLeft: '20px' }} className="btn" onClick={onAddTeacherButtonClick}> 
					<AiOutlineUserAdd/>
				</button>
			</div>
			<List items={items} active={activeTeacher}/>
		</div>
	)

}

export default observer(TeachersList)