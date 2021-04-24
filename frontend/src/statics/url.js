export function parseIm(str){
	if(typeof str !== 'string') return {}
	const arr = str.split('-')
	if(arr.length !== 2) return {}
	const subject_id = parseInt(arr[0])
	const group_id = parseInt(arr[1])
	if(isNaN(subject_id) || isNaN(group_id)) return {}

	return { subject_id, group_id }
}