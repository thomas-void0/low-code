import './BasicLayout.less'
import React, { CSSProperties } from 'react'
import { MenuDataItem, Route, RouterTypes, WithFalse } from './types/typings'
import { SiderMenuProps } from './components/SilderMenu/SliderMenu'
import HeaderView, { HeaderViewProps } from './components/HeaderView'
import type { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb'
import { BaseMenuProps } from './components/BaseMenu'
import { GetPageTitleProps } from './utils/getPageTitle'
import { WaterMarkProps } from './components/WaterMark'
import clearMenuItem from './utils/clearMenuItem'
// import React from 'react'

export type LayoutBreadcrumbProps = {
	minLength?: number
}

export type BasicLayoutProps = Partial<RouterTypes<Route>> &
	SiderMenuProps &
	HeaderViewProps & {
		pure?: boolean
		/** logo url */
		logo?: React.ReactNode | WithFalse<() => React.ReactNode>

		/** 页面切换的时候触发  */
		onPageChange?: (location?: RouterTypes<Route>['location']) => void

		onCollapse?: (collapsed: boolean) => void

		breadcrumbRender?: WithFalse<
			(routers: AntdBreadcrumbProps['routes']) => AntdBreadcrumbProps['routes']
		>

		menuItemRender?: BaseMenuProps['menuItemRender']
		pageTitleRender?: WithFalse<
			(
				props: GetPageTitleProps,
				defaultPageTitle?: string,
				info?: {
					// 页面标题
					title: string
					// 页面标题不带默认的 title
					pageName: string
				}
			) => string
		>
		menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[]
		itemRender?: AntdBreadcrumbProps['itemRender']

		contentStyle?: CSSProperties
		isChildrenLayout?: boolean

		className?: string

		/** 兼用 content的 margin */
		disableContentMargin?: boolean

		/** PageHeader 的 BreadcrumbProps 配置，会透传下去 */
		breadcrumbProps?: AntdBreadcrumbProps & LayoutBreadcrumbProps
		/**水印的相关配置 */
		waterMarkProps?: WaterMarkProps

		userConfig?: {
			notFound?: React.ReactNode
			unAccessible?: React.ReactNode
		}

		loading?: boolean
	}

// 渲染头部
const headerRender = (props: BasicLayoutProps, matchMenuKeys: string[]): React.ReactNode => {
	if (props.headerRender === false || props.pure) {
		return null
	}

	const clearMenuData = clearMenuItem(props.menuData || [])

	if (clearMenuData && clearMenuData?.length < 1) {
		return null
	}

	return <HeaderView matchMenuKeys={matchMenuKeys} {...props} menuData={clearMenuData} />
}
