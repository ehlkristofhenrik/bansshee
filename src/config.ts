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
		shell: boolean,
		exec: boolean,
		env: boolean
	}
}