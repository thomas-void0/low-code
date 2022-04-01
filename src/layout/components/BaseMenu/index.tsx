// 基础菜单
import React, { FC } from 'react'
import { MenuDataItem, PureSettings, Route, RouterTypes, WithFalse } from '../../types/typings'
import Icon, { createFromIconfontCN } from '@ant-design/icons'
import { MenuProps, Menu } from 'antd'
import { defaultSettings } from '@config/defaultSettings'
import isUrl from '@/layout/utils/isUrl'
import isImg from '@/layout/utils/isImg'

const { SubMenu, ItemGroup } = Menu

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline'

export type BaseMenuProps = {
	className?: string
	/** 默认的是否展开，会受到 breakpoint 的影响 */
	defaultCollapsed?: boolean
	collapsed?: boolean
	menuData?: MenuDataItem[]
	mode?: MenuMode
	onCollapse?: (collapsed: boolean) => void
	handleOpenChange?: (openKeys: string[]) => void
	iconPrefixes?: string
	/** 要给菜单的props, 参考antd-menu的属性。https://ant.design/components/menu-cn/ */
	menuProps?: MenuProps
	style?: React.CSSProperties
	subMenuItemRender?: WithFalse<
		(
			item: MenuDataItem & {
				isUrl: boolean
			},
			defaultDom: React.ReactNode
		) => React.ReactNode
	>
	menuItemRender?: WithFalse<
		(
			item: MenuDataItem & {
				isUrl: boolean
				onClick: () => void
				selectedKeys: string[]
			},
			defaultDom: React.ReactNode,
			menuProps: BaseMenuProps
		) => React.ReactNode
	>
	postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[]
} & Partial<RouterTypes<Route>> &
	Omit<MenuProps, 'openKeys' | 'onOpenChange' | 'title' | 'theme'> &
	PureSettings

let IconFont = createFromIconfontCN({
	scriptUrl: defaultSettings.iconfontUrl
})

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (
	icon?: string | React.ReactNode,
	iconPrefixes: string = 'icon-'
): React.ReactNode => {
	if (typeof icon === 'string' && icon !== '') {
		if (isUrl(icon) || isImg(icon)) {
			return (
				<Icon component={() => <img src={icon} alt="icon" className="ant-pro-sider-menu-icon" />} />
			)
		}
		if (icon.startsWith(iconPrefixes)) {
			return <IconFont type={icon} />
		}
	}
	return icon
}

class MenuUtil {
	props: BaseMenuProps
	constructor(props: BaseMenuProps) {
		this.props = props
	}

	getNavMenuItems = (
		menusData: MenuDataItem[] = [],
		isChildren: boolean,
		selectedKeys?: string[]
	): React.ReactNode[] => {
		return menusData
			.map(item => this.getSubMenuOrItem(item, isChildren, selectedKeys))
			.filter(item => item)
	}

	getSubMenuOrItem = (
		item: MenuDataItem,
		isChildren: boolean,
		selectedKeys?: string[]
	): React.ReactNode => {
		const { prefixCls } = this.props

		if (Array.isArray(item.children) && item && item.children.length > 0) {
			const name = item.name
			const { subMenuItemRender, menu, iconPrefixes } = this.props
			//  get defaultTitle by menuItemRender
			const defaultTitle = item.icon ? (
				<span className={`${prefixCls}-menu-item`} title={name}>
					{!isChildren && getIcon(item.icon, iconPrefixes)}
					<span className={`${prefixCls}-menu-item-title`}>{name}</span>
				</span>
			) : (
				<span className={`${prefixCls}-menu-item`} title={name}>
					{name}
				</span>
			)

			// subMenu only title render
			const title = subMenuItemRender
				? subMenuItemRender({ ...item, isUrl: false }, defaultTitle)
				: defaultTitle
			const MenuComponents: React.ElementType = menu?.type === 'group' ? ItemGroup : SubMenu

			return (
				<MenuComponents title={title} key={item.key || item.path} onTitleClick={item.onTitleClick}>
					{this.getNavMenuItems(item.children, true)}
				</MenuComponents>
			)
		}

		return (
			<Menu.Item
				disabled={item.disabled}
				key={item.path}
				onClick={item.onTitleClick}
				className={`${prefixCls}-menu-li`}
			>
				{this.getMenuItemPath(item, isChildren, selectedKeys)}
			</Menu.Item>
		)
	}

	getMenuItemPath = (item: MenuDataItem, isChildren: boolean, selectedKeys?: string[]) => {
		const itemPath = this.conversionPath(item.path || '/')
		const { location = { pathname: '/' }, onCollapse, menuItemRender, iconPrefixes } = this.props
		// if local is true formatMessage all name。
		const name = item.name
		const { prefixCls } = this.props
		const icon = isChildren ? null : getIcon(item.icon, iconPrefixes)
		let defaultItem = (
			<span className={`${prefixCls}-menu-item`}>
				{icon}
				<span className={`${prefixCls}-menu-item-title`}>{name}</span>
			</span>
		)

		const isHttpUrl = isUrl(itemPath)

		// Is it a http link
		if (isHttpUrl) {
			defaultItem = (
				<span title={name} className={`${prefixCls}-menu-item ${prefixCls}-menu-item-link`}>
					{icon}
					<span className={`${prefixCls}-menu-item-title`}>{name}</span>
				</span>
			)
		}

		if (menuItemRender) {
			const renderItemProps = {
				...item,
				isUrl: isHttpUrl,
				itemPath,
				replace: itemPath === location.pathname,
				onClick: () => onCollapse && onCollapse(true),
				selectedKeys: selectedKeys || []
			}
			return menuItemRender(renderItemProps, defaultItem, this.props)
		}
		return defaultItem
	}

	conversionPath = (path: string) => {
		if (path && path.indexOf('http') === 0) {
			return path
		}
		return `/${path || ''}`.replace(/\/+/g, '/')
	}
}

const BaseMenu: FC<any> = () => {
	return <div></div>
}

export default BaseMenu
