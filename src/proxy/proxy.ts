import * as ssh from 'ssh2'
import { global_config } from '../init.ts'

import { authHandler } from './handler/auth.ts'

export function handleProxy( client: ssh.Connection, _info: ssh.ClientInfo ): void {
	
	try {
		
		const tunnel = new ssh.Client()
		
		const close  = () => {
			tunnel.end()
			client.end()
		}

		client
			.on( 'authentication', ( ctx: ssh.AuthContext ) => authHandler( ctx, tunnel ) )
			.on( 'ready', () => {
				client.on( 'session', () => {})
			})
			.on( 'close', close )
			.on( 'end', close )
			.on( 'error', ( err: Error ) => {

			})

		
	} catch ( err: unknown ) {



	}
		

}