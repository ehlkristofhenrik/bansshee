import { type PasswordAuthContext } from 'ssh2'

export type AuthMethod =
	| 'password' 
	| 'keyboard-interactive' 
	| 'publickey' 
	| 'none' 
	| 'hostbased'

export interface AuthPlugin {
	method: AuthMethod
	// Do not call accept() or reject() direcly
	accept( ctx: PasswordAuthContext ): boolean
}

export type PluginPool = Record<AuthMethod, AuthPlugin[]>