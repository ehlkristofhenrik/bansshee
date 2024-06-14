import { type Config } from 'config'

export const CONFIG_PATH = 'config.json5'

export const PLUGIN_PATH = 'src/plugin/'

export const VERSION = '0.0.1/2 beta'

export const DEFAULT_CONFIG: Config = {
	pluginPath: '/home/user/Work/bansshee/src/plugin',
	host: '127.0.0.1',
	port: 2222,
	mode: 'server',
	identity: '',
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