import { defaultSettings } from '@config/defaultSettings'
import BasicLayout from './BasicLayout'
import WaterMark from './components/WaterMark'
import HeaderRight from '@/components/HeaderRight'

import RouteContext from './context/RouteContext'
import getMenuData from './utils/getMenuData'
import getPageTitle from './utils/getPageTitle'

export { BasicLayout, RouteContext, getPageTitle, getMenuData, WaterMark }

const Layout = (props: any) => {
	return (
		<BasicLayout
			{...props}
			{...defaultSettings}
			rightContentRender={() => <HeaderRight />}
		></BasicLayout>
	)
}

export default Layout
