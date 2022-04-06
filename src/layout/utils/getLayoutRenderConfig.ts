import type { BasicLayoutProps } from '../BasicLayout'
import { Route, WithFalse } from '../types/typings'

const getLayoutRenderConfig = (currentPathConfig: { layout: WithFalse<Route['layout']> }) => {
	const layoutRender: BasicLayoutProps = {}

	if (currentPathConfig?.layout === false) {
		layoutRender.pure = true
		return layoutRender
	}

	if (currentPathConfig?.layout?.hasSiderMenu === false) {
		layoutRender.menuRender = false
	}

	if (currentPathConfig?.layout?.hasTopMenu === false) {
		layoutRender.hasTopMenu = false
	}

	if (currentPathConfig?.layout?.contentStyle) {
		layoutRender.contentStyle = currentPathConfig?.layout?.contentStyle
	}

	return layoutRender
}

export default getLayoutRenderConfig
