import { $ } from 'bun'
import { existsSync } from 'fs'

if ( existsSync( 'node_modules/cpu-features' ) ) {
  console.log( 'Deleting conflicting optional dependecy: [ cpu-features ]' )
  await $`rm -r node_modules/cpu-features`
}

console.log( 'Done!' )