/* eslint-disable react/display-name */
import IconFont from '../IconFont'
import { MenuDataItem } from '../../../typings/menu'
import { Popover, Space, Typography } from 'antd'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type OverlayProps = {
	routes: MenuDataItem[]
	selectedKeys?: string[]
	prefixCls: string
}

const Overlay: React.FC<OverlayProps> = React.memo(props => {
	const { routes, selectedKeys, prefixCls } = props

	const linkPrefixCls = `${prefixCls}-link`

	function getActiveClass(routeItem: MenuDataItem) {
		return {
			[`${linkPrefixCls}-active`]: selectedKeys?.includes(routeItem.path as string)
		}
	}

	return (
		<Space size={48} align="start">
			{routes.map((item, index) =>
				item.children ? (
					<Space direction="vertical" key={index}>
						<Space style={{ marginBottom: 4 }}>
							{typeof item.icon === 'string' ? <IconFont type={item.icon as string} /> : item.icon}
							<Typography.Text strong className="tw-text-base">
								{item.name}
							</Typography.Text>
						</Space>
						{item.children
							?.filter(route => route.name)
							.map((link, i) => (
								<Link
									to={link.path!}
									key={i}
									target={link.target || '_self'}
									className={classNames(getActiveClass(link), linkPrefixCls)}
								>
									{link.name}
								</Link>
							))}
					</Space>
				) : (
					<Link
						to={item.path!}
						key={index}
						target={item.target}
						className={classNames(getActiveClass(item), linkPrefixCls)}
					>
						<Space>
							{typeof item.icon === 'string' ? (
								<IconFont type={item.icon as string} className={`${linkPrefixCls}-icon`} />
							) : (
								item.icon
							)}
							{item.name}
						</Space>
					</Link>
				)
			)}
		</Space>
	)
})

const findFirstLink: any = (routes: MenuDataItem<React.ComponentType<any>>[]) => {
	if (routes.length) {
		const first = routes[0]
		if (first.children) {
			return findFirstLink(first.children)
		} else {
			return first.path
		}
	}
}

const findParent: any = (
	dom: HTMLElement | null | undefined,
	overflowedIndicatorPopupClassName: string
) => {
	if (dom?.className.includes(overflowedIndicatorPopupClassName)) {
		return true
	}
	if (dom?.className.includes('ant-menu-root')) {
		return false
	}
	if (dom?.parentElement) {
		return findParent(dom.parentElement, overflowedIndicatorPopupClassName)
	} else {
		return false
	}
}

const MenuPopover: React.FC<{
	prefixCls: string
	renderItemProps: any
	children: React.ReactNode
	overflowedIndicatorPopupClassName: string
}> = ({ prefixCls, renderItemProps, children, overflowedIndicatorPopupClassName }) => {
	const [visible, setVisible] = useState<boolean>(false)

	const ref = useRef<HTMLDivElement>(null)

	const onVisibleChange = (v: boolean) => {
		if (findParent(ref.current, overflowedIndicatorPopupClassName)) return

		setVisible(v)
	}

	return (
		<Popover
			overlayClassName={`${prefixCls}-menu-popover`}
			transitionName="ant-slide-up"
			align={{
				ignoreShake: false,
				offset: [0, -6]
			}}
			mouseEnterDelay={0.2}
			mouseLeaveDelay={0.15}
			content={
				<Overlay
					routes={renderItemProps.routes}
					selectedKeys={renderItemProps.selectedKeys}
					prefixCls={prefixCls}
				/>
			}
			trigger={['hover']}
			placement="bottom"
			getTooltipContainer={n => n.parentElement || document.body}
			visible={visible}
			onVisibleChange={onVisibleChange}
		>
			<Link to={findFirstLink(renderItemProps.routes)} target="_self">
				<div className={`${prefixCls}-menu-popover-box`} ref={ref}>
					{children}
				</div>
			</Link>
		</Popover>
	)
}

export default React.memo(MenuPopover)
