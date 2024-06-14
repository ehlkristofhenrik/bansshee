import type { Plugin } from '../plugin'

export type AuthMethod =
	| 'password' 
	| 'keyboard-interactive' 
	| 'publickey' 
	| 'none'
	| 'hostbased'

export type PluginPasswordAuthContext = {
	username: string,
	password: string
}

export interface AuthPlugin extends Plugin {
	method: AuthMethod
	accept( ctx: PluginPasswordAuthContext ): boolean
}

export type AuthPluginPool = Record<AuthMethod, AuthPlugin[]>