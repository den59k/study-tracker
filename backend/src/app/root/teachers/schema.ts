import getSchema from "../../../libs/schema"

export const addTeacherSchema = getSchema({
	properties: {
		email: { type: 'string' },
		name: { type: 'string' },
		surname: { type: 'string' },
		patronymic: { type: 'string' },
		position: { type: 'string' }
	},
	required: [ 'email', 'name' ]
})

export const paramsSchema = getSchema({
	properties: {
		teacher_id: { type: 'number' }
	},
	required: [ 'teacher_id' ]
}, 'params')

export const paramsSubjectSchema = getSchema({
	properties: {
		teacher_id: { type: 'number' },
		subject_id: { type: 'number' }
	},
	required: [ 'teacher_id', 'subject_id' ]
}, 'params')

export const addSubjectSchema = getSchema({
	properties: {
		title: { type: 'string' }
	},
	required: [ 'title' ]
})

