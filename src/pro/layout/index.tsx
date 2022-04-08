import BasicLayout from './BasicLayout'
import WaterMark from './components/WaterMark'
import HeaderRight from '@/components/HeaderRight'

import RouteContext from './context/RouteContext'
import getMenuData from './utils/getMenuData'
import getPageTitle from './utils/getPageTitle'
import { layoutSettings } from '@config/proConfig'

export { BasicLayout, RouteContext, getPageTitle, getMenuData, WaterMark }

const Layout = (props: any) => {
	return (
		<BasicLayout
			{...props}
			{...layoutSettings}
			rightContentRender={() => <HeaderRight />}
		></BasicLayout>
	)
}

export default Layout
