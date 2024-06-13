import * as ssh from 'ssh2'
import { global_config } from '../../../init'

let ptyInfo: ssh.PseudoTtyOptions

function onPty( accept: ssh.SessionAccept, reject: ssh.RejectConnection, info: ssh.PseudoTtyInfo ): void {
	ptyInfo = {
		cols: info.cols,
		rows: info.rows,
		height: info.height,
		width: info.width,
		modes: info.modes
	}

	accept()
}

function onShell( accept: ssh.AcceptConnection<ssh.ServerChannel>, reject: ssh.RejectConnection, tunnel: ssh.Client, info: ssh.ClientInfo ): void {

	if ( global_config.methods.shell.enabled === false ) {

		console.log( `${info.ip} tried to access forbidden method ( shell )`)

		if ( global_config.methods.shell.action === 'blacklist' ) {
			// BLACKLIST IP
		}
		
		reject()
		
		return
	}

	const serverChannel = accept()

	const close = () => {
		tunnel.end()
		serverChannel.close()
	}

	tunnel.shell( ptyInfo, {}, ( err: Error | undefined, clientChannel: ssh.ClientChannel ) => {
		
		tunnel.on( 'ready', () => {

			if ( err !== undefined && err !== null ) {
				close()
			}

		})

	})
		.on( 'timeout', close )
		.on( 'close', close )
		.on( 'end', close )
		.on( 'error', ( err: Error & ssh.ClientErrorExtensions ) => {
			
			console.log( err )
			
			close()

		})

}

function onWindowChanged( accept: ssh.SessionAccept, reject: ssh.RejectConnection, info: ssh.WindowChangeInfo ): void {
	ptyInfo = {
		cols: info.cols,
		rows: info.rows,
		height: info.height,
		width: info.width
	}
}

// Handler
export function sessionHandler( accept: ssh.AcceptConnection<ssh.Session>, reject: ssh.RejectConnection, tunnel: ssh.Client, info: ssh.ClientInfo ): void {
	
	let session = accept()

	session
		.on( 'pty', onPty )
		.on( 'shell', ( accept: ssh.AcceptConnection<ssh.ServerChannel>, reject: ssh.RejectConnection ) => onShell( accept, reject, tunnel, info ) )
		.on( 'window-change', onWindowChanged )
}