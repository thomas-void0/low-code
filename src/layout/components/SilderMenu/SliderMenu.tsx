import { WithFalse } from '@/layout/types/typings'
import { Menu, SiderProps, Layout } from 'antd'
import React, { CSSProperties } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import BaseMenu, { BaseMenuProps } from '../BaseMenu'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const { Sider } = Layout

export type SiderMenuProps = {
	logo?: React.ReactNode
	siderWidth?: number
	menuHeaderRender?: WithFalse<
		(logo: React.ReactNode, title: React.ReactNode, props?: SiderMenuProps) => React.ReactNode
	>
	menuFooterRender?: WithFalse<(props?: SiderMenuProps) => React.ReactNode>
	menuContentRender?: WithFalse<
		(props: SiderMenuProps, defaultDom: React.ReactNode) => React.ReactNode
	>
	menuExtraRender?: WithFalse<(props: SiderMenuProps) => React.ReactNode>
	collapsedButtonRender?: WithFalse<(collapsed?: boolean) => React.ReactNode>
	breakpoint?: SiderProps['breakpoint'] | false
	onMenuHeaderClick?: (e: React.MouseEvent<HTMLDivElement>) => void
	hide?: boolean
	className?: string
	style?: CSSProperties
	links?: React.ReactNode[]
	onOpenChange?: (openKeys: WithFalse<string[]>) => void
	getContainer?: false
	logoStyle?: CSSProperties
	contentStyle?: CSSProperties
} & Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>>

export const defaultRenderCollapsedButton = (collapsed?: boolean) =>
	collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />

export type PrivateSiderMenuProps = {
	matchMenuKeys: string[]
}

const SiderMenu: React.FC<SiderMenuProps & PrivateSiderMenuProps> = props => {
	const {
		collapsed: propsCollapsed,
		fixSiderbar,
		menuFooterRender,
		onCollapse,
		siderWidth,
		breakpoint = 'lg',
		style,
		menuExtraRender = false,
		collapsedButtonRender = defaultRenderCollapsedButton,
		links,
		menuContentRender,
		prefixCls,
		onOpenChange,
		headerHeight,
		contentStyle
	} = props

	const baseClassName = `${prefixCls}-sider`
	const siderClassName = classNames(`${baseClassName}`, {
		[`${baseClassName}-fixed`]: fixSiderbar,
		[`${baseClassName}-layout-mix`]: true,
		[`${baseClassName}-light`]: true
	})

	const extraDom = menuExtraRender && menuExtraRender(props)
	const menuDom = menuContentRender !== false && (
		<BaseMenu
			{...props}
			key="base-menu"
			mode="inline"
			handleOpenChange={onOpenChange}
			style={{
				width: '100%'
			}}
			className={`${baseClassName}-menu`}
			menuItemRender={(menuItemProps, defaultDom) => {
				if (menuItemProps.isUrl) {
					return defaultDom
				}

				if (menuItemProps.path && location.pathname !== menuItemProps.path) {
					return (
						<Link to={menuItemProps.path} target={menuItemProps.target}>
							{defaultDom}
						</Link>
					)
				}
				return defaultDom
			}}
		/>
	)

	const menuRenderDom = menuContentRender ? menuContentRender(props, menuDom) : menuDom

	return (
		<>
			{fixSiderbar && (
				<div
					style={{
						width: propsCollapsed ? 48 : siderWidth,
						overflow: 'hidden',
						flex: `0 0 ${propsCollapsed ? 48 : siderWidth}px`,
						maxWidth: propsCollapsed ? 48 : siderWidth,
						minWidth: propsCollapsed ? 48 : siderWidth,
						background: contentStyle?.background || 'var(--white)',
						...style
					}}
				/>
			)}
			<Sider
				collapsible
				trigger={null}
				collapsed={propsCollapsed}
				breakpoint={breakpoint === false ? undefined : breakpoint}
				onCollapse={collapse => {
					onCollapse?.(collapse)
				}}
				collapsedWidth={48}
				style={{
					overflow: 'hidden',
					paddingTop: headerHeight,
					...style
				}}
				width={siderWidth}
				className={siderClassName}
			>
				{extraDom && (
					<div className={`${baseClassName}-extra ${`${baseClassName}-extra-no-logo`}`}>
						{extraDom}
					</div>
				)}
				<div className={`${baseClassName}-sidermenu`}>{menuRenderDom}</div>
				<div className={`${baseClassName}-links`}>
					<Menu
						theme="light"
						inlineIndent={16}
						className={`${baseClassName}-link-menu`}
						selectedKeys={[]}
						openKeys={[]}
						mode="inline"
					>
						{(links || []).map((node, index) => (
							<Menu.Item className={`${baseClassName}-link`} key={index}>
								{node}
							</Menu.Item>
						))}
						{collapsedButtonRender && (
							<Menu.Item
								className={`${baseClassName}-collapsed-button`}
								title={false}
								key="collapsed"
								onClick={() => {
									if (onCollapse) {
										onCollapse(!propsCollapsed)
									}
								}}
							>
								{collapsedButtonRender(propsCollapsed)}
							</Menu.Item>
						)}
					</Menu>
				</div>
				{menuFooterRender && (
					<div
						className={classNames(`${baseClassName}-footer`, {
							[`${baseClassName}-footer-collapsed`]: !propsCollapsed
						})}
					>
						{menuFooterRender(props)}
					</div>
				)}
			</Sider>
		</>
	)
}

export default SiderMenu
