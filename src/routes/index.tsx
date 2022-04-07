import { Route } from '@/pro/typings/menu'
import { ComponentType, lazy } from 'react'

function lazyLoad(src: () => Promise<{ default: ComponentType<any> }>) {
	return lazy(src)
}

const routes: Route[] = [
	{
		path: '/',
		redirect: '/dashboard',
		exact: true
	},
	{
		path: '/',
		component: lazyLoad(() => import('@/pro/layout')),
		routes: [
			{
				path: '/dashboard',
				name: '首页',
				routes: [
					{
						path: '/dashboard',
						redirect: '/dashboard/home',
						exact: true
					},
					{
						name: 'home1',
						path: '/dashboard/home',
						component: lazyLoad(() => import('@/pages/Home')),
						exact: true,
						icon: 'icon-toutiao',
						layout: {
							contentStyle: {
								background: 'var(--layout-sider-background-light)',
								minWidth: '1440px'
							}
						}
					},
					{
						name: 'home2',
						path: '/dashboard/home2',
						component: lazyLoad(() => import('@/pages/Home2')),
						exact: true,
						icon: 'icon-gdt',
						layout: {
							contentStyle: {
								background: 'var(--layout-sider-background-light)'
							}
						}
					}
				]
			},
			{
				path: '*',
				name: '错误页面',
				component: lazyLoad(() => import('@/pages/NotFound'))
			}
		]
	}
]

// 添加错误组件
;(function addNotFound(r: Route[]) {
	r.forEach(route => {
		if (route.routes?.length) {
			route.routes = [
				...route.routes,
				{
					component: lazyLoad(() => import('@/pages/NotFound'))
				}
			]
			addNotFound(route.routes)
		}
	})
})(routes)

export default routes
