import type { Theme } from 'antd/es/config-provider/context.d'

export const themeName = 'ant-theme'

export const theme: Theme = {
	primaryColor: 'rgb(112, 126, 255)',
	successColor: 'rgb(0, 179, 83)',
	errorColor: 'rgb(255, 64, 26)',
	warningColor: 'rgb(255, 183, 0)',
	infoColor: 'rgb(112, 126, 255)'
}

export const breakpoints = {
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1600
} as const

export const iconfontUrl = '//at.alicdn.com/t/font_2415908_rvf6pq8rl6.js'

export const defaultSettings = {
	contentWidth: 'Fluid',
	fixedHeader: true,
	fixSiderbar: true,
	headerHeight: 64,
	iconfontUrl,
	menu: {
		autoClose: false
	},
	logo: '/logo.svg',
	webTitle: '新榜海汇'
}

// 分页量
export const defaultPageSize = 20

export const SELECTWIDTH = 200

export const MULTIPLELENGTH: 'responsive' | number = 'responsive'

export const dropdownMatchSelectWidth = 400
