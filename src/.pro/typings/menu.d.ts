import React, { ComponentType, LazyExoticComponent } from 'react'

// 菜单数据
export type MenuDataItem<T extends ComponentType<any> = ComponentType<any>> = {
	// 子菜单
	routes?: MenuDataItem[]
	children?: MenuDataItem[]
	// 在菜单中隐藏子节点
	hideChildrenInMenu?: boolean
	// 在菜单中隐藏自己和子节点
	hideInMenu?: boolean
	// 在面包屑中隐藏
	hideInBreadcrumb?: boolean
	// 菜单的icon
	icon?: React.ReactNode | string
	extraIcon?: React.ReactNode
	// 菜单的名字
	name?: string
	// 用于标定选中的值，默认是path
	key?: string
	// 菜单选项
	disabled?: boolean
	// 点击菜单 路径,可以设定为网页链接
	onTitleClick?: () => void
	path?: string
	//  自定义父节点 当此节点被选中的时候也会选中 parentKeys 的节点
	parentKeys?: string[]
	// 隐藏自己，并且将子节点提升到与自己平级
	flatMenu?: boolean
	// 指定外链打开形式，同a标签
	target?: string
	// 路由鉴权，是否需要登录
	auth?: boolean
	// 路由权限
	access?: string
	// 路由可否访问
	unaccessible?: boolean
	// 重定向
	redirect?: string
	// 组件路径
	component?: LazyExoticComponent<T>
	exact?: boolean | undefined
	sensitive?: boolean | undefined
	strict?: boolean | undefined
}
