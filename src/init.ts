import JSON5 from 'json5'
import { existsSync, readFileSync } from 'fs'
import { DEFAULT_CONFIG, VERSION } from 'const'
import { type Config, ConfigValidator } from 'config'
import { Chalk } from 'chalk'

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

  const chalk = new Chalk()

  const banner = chalk.green( String.raw`
    ____  ___    _   ____________ __  ______________
   / __ )/   |  / | / / ___/ ___// / / / ____/ ____/
  / __  / /| | /  |/ /\__ \\__ \/ /_/ / __/ / __/   
 / /_/ / ___ |/ /|  /___/ /__/ / __  / /___/ /___ 
/_____/_/  |_/_/ |_//____/____/_/ /_/_____/_____/`)

  const slogan = chalk.italic.cyan('>> Futureproof now!')

  const url = chalk.underline.blue(`ssh://${GLOBAL_CONFIG.host}:${GLOBAL_CONFIG.port}`)

  const role = chalk.cyan(GLOBAL_CONFIG.mode)

  const proxyInfo = GLOBAL_CONFIG.mode === 'proxy'
    ? `Forwarding to ${GLOBAL_CONFIG.proxy?.host}:${GLOBAL_CONFIG.proxy?.port}`
    : ''
  
  const info = `
${banner}

    ${slogan}

    Bansshee v${VERSION}

    Listening on ${url} as ${role}

    ${proxyInfo}

  `
  
  console.log( info )
}