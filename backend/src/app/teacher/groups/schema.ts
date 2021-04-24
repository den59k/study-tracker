import getSchema from "../../../libs/schema";

export const groupParamsSchema = getSchema({
	properties: {
		group_id: { type: 'number' }
	},
	required: [ 'group_id' ]
}, 'params')
