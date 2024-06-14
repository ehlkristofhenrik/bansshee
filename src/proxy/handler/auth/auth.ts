import * as ssh from 'ssh2'
import { match } from 'ts-pattern'

export function authHandler( context: ssh.AuthContext, tunnel: ssh.Client | undefined ): void {
	match( context )
		.with( { method: 'password' }, ( selections: ssh.PasswordAuthContext, value: ssh.PasswordAuthContext ) => {
			
			

		})
		.with( { method: 'keyboard-interactive' }, ( selections: ssh.KeyboardAuthContext, value: ssh.KeyboardAuthContext ) => {
			value.reject()
		})
		.with( { method: 'publickey' }, ( selections: ssh.PublicKeyAuthContext, value: ssh.PublicKeyAuthContext ) => {
			value.reject()
		})
		.with( { method: 'none' }, ( selections: ssh.NoneAuthContext, value: ssh.NoneAuthContext ) => {
			value.reject()
		})
		.with( { method: 'hostbased' }, ( selections: ssh.HostbasedAuthContext, value: ssh.HostbasedAuthContext ) => {
			value.reject()
		})
		.exhaustive()
}