import { InitialStateType } from '../pro/typings/globalContext'
import { MenuDataItem } from '../pro/typings/menu'

// 权限配置
export default (initialState: InitialStateType) => {
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
