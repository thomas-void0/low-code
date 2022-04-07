import React, { createContext } from 'react'
import { WaterMarkProps } from '../components/WaterMark'
import { MenuDataItem, PureSettings } from '../../typings/menu'
import { BreadcrumbListReturn, BreadcrumbProps } from '../utils/getBreadcrumbProps'

export type RouteContextType = {
	breadcrumb?: BreadcrumbListReturn
	menuData?: MenuDataItem[]
	prefixCls?: string
	collapsed?: boolean
	hasSiderMenu?: boolean
	hasHeader?: boolean
	siderWidth?: number
	pageTitleInfo?: {
		title: string
		pageName: string
	}
	matchMenus?: MenuDataItem[]
	matchMenuKeys?: string[]
	currentMenu?: PureSettings & MenuDataItem
	/** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
	breadcrumbProps?: BreadcrumbProps
	waterMarkProps?: WaterMarkProps
	clearMenuData?: MenuDataItem[]
} & Partial<PureSettings>

const RouteContext: React.Context<RouteContextType> = createContext({})

RouteContext.displayName = 'Layout-Route-Context'

export default RouteContext
