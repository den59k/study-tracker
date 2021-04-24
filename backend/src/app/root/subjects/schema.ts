import getSchema from "../../../libs/schema";

export const searchSubjectSchema = getSchema({
	properties: {
		title: { type: 'string' },
	},
	required: [ 'title' ]
}, 'querystring')

export const groupParamsSchema = getSchema({
	properties: {
		group_id: { type: 'number' }
	},
	required: [ 'group_id' ]
}, 'params')

export const subjectGroupParamsSchema = getSchema({
	properties: {
		subject_id: { type: 'number' },
		group_id: { type: 'number' }
	},
	required: [ 'subject_id', 'group_id' ]
}, 'params')