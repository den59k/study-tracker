import getSchema from "../../../libs/schema";

export const studentParamsSchema = getSchema({
	properties: {
		student_id: { type: 'number' }
	},
	required: [ 'student_id' ]
}, 'params')

export const studentSubjectParamsSchema = getSchema({
	properties: {
		student_id: { type: 'number' },
		subject_id: { type: 'number' }
	},
	required: [ 'student_id', 'subject_id' ]
}, 'params')