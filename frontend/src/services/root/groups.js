import { mutate } from "swr";
import { REST } from "../index";

export async function addGroup (data){
	const resp = await REST('/api/root/groups', data)
	if(resp.error) return resp.error

	mutate('/api/root/groups')
}

export async function editGroup (group_id, data){
	const resp = await REST('/api/root/groups/'+group_id, data, 'PUT')
	if(resp.error) return resp.error

	mutate('/api/root/groups')
}

export async function deleteGroup(group_id){
	const resp = await REST('/api/root/groups/'+group_id, {}, 'DELETE')
	if(resp.error) return resp.error

	mutate('/api/root/groups')
}