import { getRoleMenu, getUser } from '@/api'
import { InitialStateType } from './typings/globalContext'
import { MenuDataItem } from './typings/menu'

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

// 权限配置
export const accessFactory = (initialState: InitialStateType) => {
	const { accessInfo } = initialState || {}
	return {
		isRoles: (route: MenuDataItem) => {
			return accessInfo?.includes(route.path || '')
		},
		workOrderAdd: accessInfo?.includes('workOrder:add'), // 账户 - 全部工单 - 添加工单
		portManager: accessInfo?.includes('port:manager'), // 账户 - 服务商管理 - 端口管理
		dashboard: () => {
			return {
				dashboard: accessInfo?.includes('dashboard'), // 首页
				'dashboard:team': accessInfo?.includes('dashboard:team'), // 团队目标
				'dashboard:ad': accessInfo?.includes('dashboard:ad') // 广告效果
			}
		}
	}
}
