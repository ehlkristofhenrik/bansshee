import * as ssh from 'ssh2'

import { handleProxy } from 'proxy/proxy.ts'
import { listen, parseConfig, GLOBAL_CONFIG } from 'init.ts'
import { readFileSync } from 'fs'

parseConfig( 'ignore/config.json5' )

// console.log( GLOBAL_CONFIG )

new ssh.Server({
	hostKeys: [
		readFileSync('ignore/example_key')
	]
}, handleProxy )
.on('error', (err: any)=>{ console.log(err)})
.listen( GLOBAL_CONFIG.port, GLOBAL_CONFIG.host, listen )
