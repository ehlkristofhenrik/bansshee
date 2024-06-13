import JSON5 from 'json5'
import { existsSync, readFileSync } from 'fs'
import { DEFAULT_CONFIG, VERSION } from './const.ts'
import { type Config } from './config.ts';

// Global configuration
export let global_config: Config = DEFAULT_CONFIG

// Parse config and store it in global_config
export function parseConfig( path: string ): void {

	let config = structuredClone( DEFAULT_CONFIG )
	
	if ( existsSync( path ) ) {
		
		const content = readFileSync( path ).toString()
		
		try {

			const conf = JSON5.parse( content )
			
			config = Object.assign( config, conf )

		} catch {

			throw new Error( `Could not parse JSON5 config file: ${path}`)
		
		}

	}

	global_config = config
}

// Runs when the server starts listening
export function listen(): void {
  console.log(String.raw`
      ____  ___    _   ___________ __  __
     / __ )/   |  / | / /  _/ ___// / / /
    / __  / /| | /  |/ // / \__ \/ /_/ /
   / /_/ / ___ |/ /|  // / ___/ / __  /
  /_____/_/  |_/_/ |_/___//____/_/ /_/
  `,`
  > Futureproof now!

  Made by zen-bons.ai
	
	v${VERSION}

  Listening on localhost:1234
`)
}