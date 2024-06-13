import type { PasswordAuthContext } from 'ssh2';
import type { AuthPlugin, AuthMethod } from './plugin.ts'

export class DummyPasswordPlugin implements AuthPlugin {

	method: AuthMethod = 'password'

	user: string
	pass: string

	constructor( user: string, pass: string ) {
		this.user = user
		this.pass = pass
	}
	
	accept( ctx: PasswordAuthContext ): boolean {
		return this.user === ctx.username && this.pass === ctx.password
	}
	
}