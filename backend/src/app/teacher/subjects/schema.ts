import getSchema from "../../../libs/schema";

export const subjectParamsSchema = getSchema({
	properties: {
		subject_id: { type: 'number' }
	},
	required: [ 'subject_id' ]
}, 'params')

export const subjectGroupSchema = getSchema({
	properties: {
		subject_id: { type: 'number' },
		group_id: { type: 'number' }
	},
	required: [ 'subject_id', 'group_id' ]
}, 'params')

export const subjectWorkParamsSchema = getSchema({
	properties: {
		subject_id: { type: 'number' },
		work_id: { type: 'number' }
	},
	required: [ 'subject_id', 'work_id' ]
}, 'params')

export const workSchema = getSchema({
	properties: {
		title: { type: 'string' },
		theme: { type: 'string' },
		mark_type: { type: 'string' }
	},
	required: [ 'title', 'mark_type' ]
})