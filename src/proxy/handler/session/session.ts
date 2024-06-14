import * as ssh from 'ssh2'
import { GLOBAL_CONFIG } from 'init'

type State = {
	ptyInfo: ssh.PseudoTtyInfo
	clientInfo: ssh.ClientInfo
}

function onPty( accept: ssh.SessionAccept, reject: ssh.RejectConnection, info: ssh.PseudoTtyInfo, state: State ): void {
	
	state.ptyInfo = {
		cols: info.cols,
		rows: info.rows,
		height: info.height,
		width: info.width,
		modes: info.modes
	}

	accept()
}

function onShell( accept: ssh.AcceptConnection<ssh.ServerChannel>, reject: ssh.RejectConnection, tunnel: ssh.Client, state: State ): void {


	if ( GLOBAL_CONFIG.methods.shell.enabled === false ) {

		console.log( `${state.clientInfo.ip} tried to access forbidden method ( shell )`)

		if ( GLOBAL_CONFIG.methods.shell.action === 'blacklist' ) {
			// BLACKLIST IP USING KV STORE
		}
		
		reject()
		
		return
	}

	const serverChannel = accept()

	const close = () => {
		tunnel.end()
		serverChannel.close()
	}

	tunnel.shell( state.ptyInfo, {}, ( err: Error | undefined, clientChannel: ssh.ClientChannel ) => {
		
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

function onWindowChanged( accept: ssh.SessionAccept, reject: ssh.RejectConnection, info: ssh.WindowChangeInfo, state: State ): void {
	state.ptyInfo = {
		modes: state.ptyInfo.modes,
		cols: info.cols,
		rows: info.rows,
		height: info.height,
		width: info.width
	}
}

// Handler
export function sessionHandler( accept: ssh.AcceptConnection<ssh.Session>, reject: ssh.RejectConnection, tunnel: ssh.Client, info: ssh.ClientInfo ): void {

	let state: State = {
		clientInfo: info,
		ptyInfo: {
			rows: 0,
			cols: 0,
			width: 0,
			height: 0,
			modes: {}
		}
	}

	let session = accept()

	session
		.on( 'pty', ( accept: ssh.SessionAccept, reject: ssh.RejectConnection, info: ssh.PseudoTtyInfo ) => onPty( accept, reject, info, state ) )
		
		.on( 'shell', ( accept: ssh.AcceptConnection<ssh.ServerChannel>, reject: ssh.RejectConnection ) => onShell( accept, reject, tunnel, state ) )
		
		.on( 'window-change', ( accept: ssh.SessionAccept, reject: ssh.RejectConnection, info: ssh.WindowChangeInfo ) => onWindowChanged( accept, reject, info, state ) )
}