const path = require('path')
const svgrPlugin = require('vite-plugin-svgr')
import { ConfigEnv, UserConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import windiCSS from 'vite-plugin-windicss'
import react from '@vitejs/plugin-react'
import { HOST, PORT } from './config/constant'
import proxyList from './config/proxy'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfig => {
	const isBuild = command === 'build'

	const _plugins = [
		react(),
		svgrPlugin({
			svgrOptions: { icon: true }
		}),
		windiCSS()
	]

	if (isBuild) {
		_plugins.push(legacy({ modernPolyfills: true }))
		_plugins.push()
	}

	return {
		plugins: _plugins,
		resolve: {
			alias: [
				{ find: '@', replacement: path.resolve(__dirname, './src') },
				{
					find: '@config',
					replacement: path.resolve(__dirname, './config')
				},
				{
					find: /^~/,
					replacement: `${path.resolve(__dirname, './node_modules')}/`
				}
			]
		},
		server: {
			host: HOST,
			port: PORT,
			proxy: proxyList,
			open: true
		},
		build: {
			target: 'es2015',
			brotliSize: false,
			chunkSizeWarningLimit: 2000,
			sourcemap: false
		}
	}
}
