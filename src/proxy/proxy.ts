import * as ssh from 'ssh2'
import { global_config } from '../init.ts'

import { authHandler } from './handler/auth/auth.ts'
import { sessionHandler } from './handler/session/session.ts'


export function handleProxy( client: ssh.Connection, info: ssh.ClientInfo ): void {

	const tunnel = new ssh.Client()
	
	try {
		
		const close  = () => {
			tunnel.end()
			client.end()
		}

		client
			.on( 'authentication', ( ctx: ssh.AuthContext ) => authHandler( ctx, tunnel ) )
			.on( 'ready', () => {

				if ( !client.authenticated )
					return

				client.on( 
					'session', 
					( accept: ssh.AcceptConnection<ssh.Session>, reject: ssh.RejectConnection ) => 
						sessionHandler( accept, reject, tunnel, info ) 
				)
			
			})
			.on( 'close', close )
			.on( 'end', close )
			.on( 'error', ( err: Error ) => {
				
				console.log( err )
				
				close()
			})

		
	} catch ( err: unknown ) {

		console.log( err )

		tunnel.end()
		client.end()

	}
		

}