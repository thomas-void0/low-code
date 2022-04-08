import { getRoleMenu, getUser } from '../api'
import { InitialStateType } from '../pro/typings/globalContext'

// layout配置
export const layoutSettings = {
	contentWidth: 'Fluid',
	fixedHeader: true,
	fixSiderbar: true,
	headerHeight: 64,
	iconfontUrl: '//at.alicdn.com/t/font_2415908_rvf6pq8rl6.js',
	menu: {
		autoClose: false
	},
	logo: '/logo.svg',
	webTitle: '新榜kol'
}

// 初始化配置
export const getInitialState = async (): Promise<InitialStateType> => {
	const fetchAccessInfo = async () => {
		const res = await getRoleMenu()
		const { result } = res
		if (result) {
			return result
		}
		return []
	}

	const fetchUserInfo = async () => {
		try {
			const res = await getUser()

			if (!res.result) {
				throw new Error('用户未登录')
			}

			const result = res?.result

			let access
			if (result) {
				access = await fetchAccessInfo()
			}
			return {
				userInfo: result,
				accessInfo: access
			}
		} catch (error) {
			return {
				userInfo: {},
				access: []
			}
		}
	}

	const obj = await fetchUserInfo()
	return Object.assign(obj, { loading: false })
}
