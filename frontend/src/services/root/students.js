import { mutate } from "swr";
import { REST } from "../index";

export async function addStudent (group_id, data){
	const url = '/api/root/groups/'+group_id+'/students'
	const resp = await REST(url, data)
	if(resp.error) return resp

	mutate(url)
}

export async function editStudent(student_id, data, group_id){
	const url = '/api/root/students/'+student_id
	const resp = await REST(url, data, 'PUT')
	if(resp.error) return resp.error
	mutate(url)
	mutate('/api/root/groups/'+group_id+'/students')
}

export async function addStudentToGroup(group_id, student_id){
	const url = '/api/root/groups/'+group_id+'/students'
	const resp = await REST(url+'/'+student_id, {}, 'POST')
	if(resp.error) return resp.error

	mutate(url)
}

export async function deleteStudentFromGroup(group_id, student_id){
	const url = '/api/root/groups/'+group_id+'/students'
	const resp = await REST(url+'/'+student_id, {}, 'DELETE')
	if(resp.error) return resp.error

	mutate(url)
}