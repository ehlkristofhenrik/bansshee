import { z } from 'zod'

const MethodRule = z.object({
	enabled: z.boolean(),
	action: z.enum([ 'pass', 'blacklist' ])
})

export const ConfigValidator = z.object({
	pluginPath: z.string().min( 1 ),
	mode: z.enum([ 'proxy', 'server' ]),
	host: z.string().min( 1 ),
	port: z.number().positive(),
	identity: z.string().optional(),
	proxy: z.object({
		host: z.string().min(1),
		port: z.number().positive()
	}).optional(),
	methods: z.object({
		shell: MethodRule,
		exec: MethodRule,
		env: MethodRule,
	})
}).refine(
  value => {
    if ( value.mode === 'proxy' && value.proxy === undefined ) 
      return false
    return true
  }, 
  'Proxy values must be set when running in proxy mode' 
)

export type Config = z.infer<typeof ConfigValidator>