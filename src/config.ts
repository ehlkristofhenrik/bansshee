type MethodRule = {
	enabled: boolean,
	action: 'pass' | 'blacklist'
}

export type Config = {
	mode: 'proxy' | 'server',
	host: string,
	port: number,
	identity?: string,
	proxy?: {
		host: string,
		port: number
	},
	methods: {
		shell: MethodRule
		exec: MethodRule
		env: MethodRule
	}
}