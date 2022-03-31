import { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>

export default {
	'/api/custom/yzPlatform/oss': {
		target: 'http://test.api.newrank.cn',
		changeOrigin: true
	},
	'/xdnphb/': {
		target: 'http://test.a.newrank.cn',
		changeOrigin: true
	},
	'/nr/user/login/': {
		target: 'http://test.a.newrank.cn',
		changeOrigin: true
	}
} as ProxyTargetList
