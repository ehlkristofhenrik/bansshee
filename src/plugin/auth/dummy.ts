import type { AuthPlugin, AuthMethod, PluginPasswordAuthContext } from './plugin.ts'

class DummyPasswordPlugin implements AuthPlugin {

	method: AuthMethod = 'password'

	user: string
	pass: string

	constructor( user: string, pass: string ) {
		this.user = user
		this.pass = pass
	}
	
	accept( ctx: PluginPasswordAuthContext ): boolean {
		return this.user === ctx.username && this.pass === ctx.password
	}
	
}

export function init( ...args: any[] ): AuthPlugin | undefined {
	
	if ( typeof( args[0] ) === 'string' && typeof( args[1] ) === 'string' )
		return new DummyPasswordPlugin( args[0], args[1] )

	return undefined
}