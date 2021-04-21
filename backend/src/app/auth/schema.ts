import getSchema from "../../libs/schema";

export const authCredentialSchema = getSchema({
	properties: {
		email: { type: 'string' },
		password: { type: 'string' }
	},
	required: [ 'email', 'password' ]
})

export const authTokenSchema = getSchema({
	properties: {
		'refreshToken': { type: 'string' }
	},
	required: [ 'refreshToken' ]
})