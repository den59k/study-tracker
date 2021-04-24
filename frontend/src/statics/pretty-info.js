export function getName(userInfo){
	const array = [	userInfo.surname, userInfo.name, userInfo.patronymic ]
	
	return array.filter(item => !!item).join(' ')
}

export function getSmallName (userInfo){
	const array = [ 
		userInfo.surname, 
		userInfo.name && (userInfo.name[0]+'.'), 
		userInfo.patronymic && (userInfo.patronymic[0]+'.') 
	]

	return array.filter(item => !!item).join(' ')
}