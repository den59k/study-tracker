import { REST } from "services";
import { mutate } from "swr";

export async function addSubject (teacher_id, data){
	const url = '/api/root/teachers/'+teacher_id+'/subjects'
	const resp = await REST(url, data)
	if(resp.error) return resp.error
	mutate(url)
}

export async function deleteSubject(teacher_id, subject_id){
	const url = '/api/root/teachers/'+teacher_id+'/subjects'
	const resp = await REST(url+'/'+subject_id, {}, 'DELETE')
	if(resp.error) return resp.error
	mutate(url)
}

export async function addSubjectToGroup (subject_id, group_id){
	const url = '/api/root/groups/'+group_id
	const resp = await REST(url+'/subjects/'+subject_id, {})
	if(resp.error) return resp.error
	mutate(url)
}

export async function removeSubjectFromGroup (subject_id, group_id){
	const url = '/api/root/groups/'+group_id
	const resp = await REST(url+'/subjects/'+subject_id, {}, 'DELETE')
	if(resp.error) return resp.error
	mutate(url)
}