import { type Config } from './config.ts'

export const CONFIG_PATH = 'config.json5'

export const VERSION = '0.0.1'

export const DEFAULT_CONFIG: Config = {
	host: '127.0.0.1',
	port: 2222,
	mode: 'proxy',
	identity: 'OPENSSH-1.0.0',
	proxy: {
		host: '127.0.0.1',
		port: 22
	},
	methods: {
		env: {
			enabled: false,
			action: 'blacklist'
		},
		exec: {
			enabled: false,
			action: 'blacklist'
		},
		shell: {
			enabled: true,
			action: 'blacklist'
		}
	}
}