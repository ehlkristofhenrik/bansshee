import * as ssh from 'ssh2'

import { handleProxy } from './proxy/proxy.ts'
import { listen, parseConfig, global_config } from './init.ts'
import { readFileSync } from 'fs'

parseConfig( 'ignore/config.json5' )

console.log( global_config )

new ssh.Server({
	hostKeys: [
		readFileSync('ignore/example_key')
	]
}, handleProxy )
.on('error', (err: any)=>{ console.log(err)})
.listen( global_config.port, global_config.host, listen )

