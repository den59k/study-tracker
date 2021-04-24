import { useMemo, useState } from 'react'
import { useModal } from 'providers/modal-window'
import { observer } from "mobx-react-lite";
import { useRouter } from 'providers/router';
import useSWR from "swr";

import styles from '../dashboard.module.sass'
import List from "../components/list";
import Input from "components/controls/input";
import { AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai'

import GroupModalWindow from 'components/modal-window/group';



function GroupsList(){

	const [ searchValue, setSearchValue ] = useState('')
	const modal = useModal()
	const router = useRouter()

	const { data } = useSWR('/api/root/groups')
	const activeGroup = parseInt(router.get(1))

	const onAddTeacherButtonClick = () => {
		modal.open(<GroupModalWindow />)
	}

	const items = useMemo(() => {
		if(!data || data.error) return []
		
		return data.map(item => ({ 
			id: item.id, 
			title: item.title,
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
			<List items={items} active={activeGroup}/>
		</div>
	)

}

export default observer(GroupsList)