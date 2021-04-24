import { mutate } from "swr";
import { REST } from "../index";

export async function addTeacher (data){
	const resp = await REST('/api/root/teachers', data)
	if(resp.error) return resp.error

	mutate('/api/root/teachers')
}

export async function editTeacher (teacher_id, data){
	const resp = await REST('/api/root/teachers/'+teacher_id, data, 'PUT')
	if(resp.error) return resp.error

	mutate('/api/root/teachers')
	mutate('/api/root/teachers/'+teacher_id)
}

export async function deleteTeacher(teacher_id){
	const resp = await REST('/api/root/teachers/'+teacher_id, {}, 'DELETE')
	if(resp.error) return resp.error

	mutate('/api/root/teachers')
}