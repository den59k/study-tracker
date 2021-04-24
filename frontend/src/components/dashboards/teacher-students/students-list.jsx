import { useMemo, useState } from 'react'
import { useModal } from 'providers/modal-window'
import { observer } from "mobx-react-lite";
import useSWR from "swr";

import styles from '../dashboard.module.sass'
import List from "../components/list";
import Input from "components/controls/input";
import { AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai'

import { getName } from 'statics/pretty-info';
import { useRouter } from 'providers/router';
import { parseIm } from 'statics/url';

export default function StudentsList (){

	const router = useRouter()
	const { group_id } = parseIm(router.get(1))
	const activeStudent = parseInt(router.get(2))

	const { data } = useSWR(group_id?('/api/teacher/groups/'+group_id): null)
	const [ searchValue, setSearchValue ] = useState('')

	
	const items = useMemo(() => {
		if(!data || data.error) return []
		return data.students.map(item => ({ 
			id: item.id, 
			title: getName(item.info),
			icon: item.info.icon || '/images/user.svg',
			onClick: () => router.push(item.id, 2)
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
			</div>
			<List items={items} active={activeStudent}/>
		</div>
	)
}