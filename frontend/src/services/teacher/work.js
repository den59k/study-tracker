import { mutate } from "swr";
import { REST } from "../index";

const markTypes = {
	mark: 5,
	binary: 1
}

export async function addWork (subject_id, data){

	const resp = await REST('/api/teacher/subjects/'+subject_id+'/works', data)
	if(resp.error) return resp.error

	mutate('/api/teacher/subjects/'+subject_id)
}

export async function editWork (subject_id, work_id, data){
	const resp = await REST('/api/teacher/subjects/'+subject_id+'/works/'+work_id, data, 'PUT')
	if(resp.error) return resp.error

	mutate('/api/teacher/subjects/'+subject_id)
}

export async function deleteWork (subject_id, work_id){
	const resp = await REST('/api/teacher/subjects/'+subject_id+'/works/'+work_id, {}, 'DELETE')
	if(resp.error) return resp.error

	mutate('/api/teacher/subjects/'+subject_id)
}
