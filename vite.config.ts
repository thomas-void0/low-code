const path = require('path')
const svgrPlugin = require('vite-plugin-svgr')
import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import windiCSS from 'vite-plugin-windicss'
import react from '@vitejs/plugin-react'
import proxyList from './src/config/proxy'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
	const isBuild = command === 'build'
	const root = process.cwd()
	const env = loadEnv(mode, root)

	const { VITE_PUBLIC_PATH } = env

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
		root: root,
		base: VITE_PUBLIC_PATH,
		plugins: _plugins,
		envPrefix: 'VITE_',
		resolve: {
			alias: [
				{ find: '@', replacement: path.resolve(__dirname, './src') },
				{
					find: '@config',
					replacement: path.resolve(__dirname, './src/config')
				},
				{
					find: /^~/,
					replacement: `${path.resolve(__dirname, './node_modules')}/`
				}
			]
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true
				}
			}
		},
		server: {
			host: 'dev.a.newrank.cn',
			port: 3000,
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
