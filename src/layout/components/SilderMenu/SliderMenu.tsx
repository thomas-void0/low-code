import { WithFalse } from '@/layout/types/typings'
import { SiderProps } from 'antd'
import React, { CSSProperties } from 'react'
import { BaseMenuProps } from '../BaseMenu'

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

export type PrivateSiderMenuProps = {
	matchMenuKeys: string[]
}
