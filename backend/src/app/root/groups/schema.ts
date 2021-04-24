import getSchema from "../../../libs/schema";

export const paramsGroupSchema = getSchema({
	properties: {
		group_id: { type: 'number' },
	},
	required: ['group_id']
}, 'params')

export const paramsStudentGroupSchema = getSchema({
	properties: {
		group_id: { type: 'number' },
		student_id: { type: 'number' }
	},
	required: [ 'group_id', 'student_id' ]
}, 'params')

export const paramsStudentSchema = getSchema({
	properties: {
		student_id: { type: 'number' },
	},
	required: ['student_id']
}, 'params')


export const studentInfoSchema = getSchema({
	properties: {
		email: { type: 'string' },
		name: { type: 'string' },
		surname: { type: 'string' },
		patronymic: { type: 'string' }
	},
	required: ['email', 'name']
})

export const groupInfoSchema = getSchema({
	properties: {
		title: { type: 'string' }
	},
	required: [ 'title' ]
})