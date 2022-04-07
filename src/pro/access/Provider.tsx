// 权限容器
import React, { useMemo } from 'react'
import { accessFactory } from '../proConfig'
import { MenuDataItem } from '../typings/menu'
import AccessContext, { AccessInstance } from './context'
import traverseModifyRoutes from './traverseModifyRoutes'
import { useGlobal } from '../index'

const { Provider } = AccessContext

type Routes = MenuDataItem[]

interface Props {
	routes: Routes
	children?: React.ReactNode
}

const AccessProvider: React.FC<Props> = props => {
	const { children, routes } = props

	const [initialState] = useGlobal()
	const access: AccessInstance = useMemo(() => accessFactory(initialState), [initialState])

	return (
		// 克隆chidren，合并新的props
		<Provider value={access}>
			{/* @ts-ignore */}
			{React.cloneElement(children, {
				// @ts-ignore
				...children.props,
				routes: traverseModifyRoutes(routes, access)
				// loading: initialState.loading
			})}
		</Provider>
	)
}

export default AccessProvider
