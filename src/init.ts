import JSON5 from 'json5'
import { existsSync, readFileSync } from 'fs'
import { DEFAULT_CONFIG, VERSION } from 'const'
import { type Config, ConfigValidator } from 'config'

// Global configuration
export let GLOBAL_CONFIG: Config = DEFAULT_CONFIG

// Parse config and store it in global_config
export function parseConfig( path: string ): void {

  let config = structuredClone( DEFAULT_CONFIG )
  
  if ( existsSync( path ) ) {
    
    try {

      const content = readFileSync( path ).toString()

      const conf = JSON5.parse( content )
      
      const parseResult = ConfigValidator.safeParse( conf ) 

      if ( !parseResult.success )
        throw parseResult.error

      config = parseResult.data

    } catch ( err: unknown ) {

      console.log( `Could not parse JSON5 config file ${path} because: ${err}`)
    
    }

  } else {
    console.log( `File ${path} not found` )
  }

  GLOBAL_CONFIG = config
}

// Runs when the server starts listening
export function listen(): void {
  console.log(String.raw`
    ____  ___    _   _______ __  ______________
   / __ )/   |  / | / / ___// / / / ____/ ____/
  / __  / /| | /  |/ /\__ \/ /_/ / __/ / __/   
 / /_/ / ___ |/ /|  /___/ / __  / /___/ /___   
/_____/_/  |_/_/ |_//____/_/ /_/_____/_____/
  `,`
  > Futureproof now!

  Made by zen-bons.ai
  
  v${VERSION}

  Listening on ${GLOBAL_CONFIG.host}:${GLOBAL_CONFIG.port} as ${GLOBAL_CONFIG.mode}
`)
}