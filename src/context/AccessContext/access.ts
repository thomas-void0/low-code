import { MenuDataItem } from '@/layout/types/typings'
import { InitialStateType } from '../GlobalContext'

export default function (initialState: InitialStateType) {
	const { accessInfo } = initialState || {}
	return {
		isRoles: (route: MenuDataItem) => {
			return accessInfo?.includes(route.path || '')
		},
		workOrderAdd: accessInfo?.includes('workOrder:add'), // 账户 - 全部工单 - 添加工单
		workOrderEdit: accessInfo?.includes('workOrder:edit'), // 账户 - 全部工单 - 修改工单 & 驳回工单
		portManager: accessInfo?.includes('port:manager'), // 账户 - 服务商管理 - 端口管理
		serviceProviderManager: accessInfo?.includes('serviceProvider:manager'), // 账户 - 服务商管理 - 服务商管理
		dashboard: () => {
			return {
				dashboard: accessInfo?.includes('dashboard'), // 首页
				'dashboard:team': accessInfo?.includes('dashboard:team'), // 团队目标
				'dashboard:ad': accessInfo?.includes('dashboard:ad'), // 广告效果
				'dashboard:person': accessInfo?.includes('dashboard:person'), // 人效报表
				'dashboard:finance': accessInfo?.includes('dashboard:finance'), // 财务工单
				'dashboard:team:companyCost': accessInfo?.includes('dashboard:team:companyCost'), // 公司消耗
				'dashboard:team:deptCost': accessInfo?.includes('dashboard:team:deptCost'), // 部门消耗
				'dashboard:team:time': accessInfo?.includes('dashboard:team:time'), // 消耗流逝图
				'dashboard:team:deptCostTop': accessInfo?.includes('dashboard:team:deptCostTop'), // Top部门消耗目标进度排行榜
				'dashboard:ad:kanban': accessInfo?.includes('dashboard:ad:kanban'), // 广告消耗效果指标看板
				'dashboard:ad:tendency': accessInfo?.includes('dashboard:ad:tendency'), // 广告指标趋势图
				'dashboard:ad:accountTop': accessInfo?.includes('dashboard:ad:accountTop'), // TOP账户消耗排行榜
				'dashboard:ad:accountTendency': accessInfo?.includes('dashboard:ad:accountTendency'), // TOP账户消耗趋势图
				'dashboard:ad:projectTop': accessInfo?.includes('dashboard:ad:projectTop'), // TOP项目消耗排行榜
				'dashboard:ad:projectTendency': accessInfo?.includes('dashboard:ad:projectTendency'), // TOP项目消耗趋势图
				'dashboard:ad:status': accessInfo?.includes('dashboard:ad:status'), // 广告状态汇总统计
				'dashboard:person:adCostTop': accessInfo?.includes('dashboard:person:adCostTop'), // 优化师广告消耗排行榜
				'dashboard:person:adFunnel': accessInfo?.includes('dashboard:person:adFunnel'), // 优化师广告指标漏斗
				'dashboard:person:adCostTendency': accessInfo?.includes('dashboard:person:adCostTendency'), // 优化师广告消耗走势图
				'dashboard:person:adCostInfo': accessInfo?.includes('dashboard:person:adCostInfo'), // Top广告计划消耗明细表
				'dashboard:person:materialCostTop': accessInfo?.includes(
					'dashboard:person:materialCostTop'
				), // 设计师素材消耗排行榜
				'dashboard:person:materialFunnel': accessInfo?.includes('dashboard:person:materialFunnel'), // 设计师素材指标漏斗
				'dashboard:person:materialCostTendency': accessInfo?.includes(
					'dashboard:person:materialCostTendency'
				), // 设计师素材消耗趋势图
				'dashboard:person:materialCostInfo': accessInfo?.includes(
					'dashboard:person:materialCostInfo'
				), // Top创意素材消耗明细表
				'dashboard:finance:kanban': accessInfo?.includes('dashboard:finance:kanban'), // 财务工单指标看板
				'dashboard:finance:errorInfo': accessInfo?.includes('dashboard:finance:errorInfo') // 异常财务工单明细
			}
		}
	}
}
