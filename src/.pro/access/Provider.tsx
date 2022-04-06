// 权限容器
import GlobalContext from '@/context/GlobalContext'
import React, { useMemo } from 'react'
import accessFactory from '../accessConfig'
import { MenuDataItem } from '../typings/menu'
import AccessContext, { AccessInstance } from './context'
import traverseModifyRoutes from './traverseModifyRoutes'

const { Provider } = AccessContext

type Routes = MenuDataItem[]

interface Props {
	routes: Routes
	children?: React.ReactNode
}

const AccessProvider: React.FC<Props> = props => {
	const { children, routes } = props

	const { initialState } = GlobalContext.usePicker(['initialState'])

	const access: AccessInstance = useMemo(() => accessFactory(initialState), [initialState])

	return (
		<Provider value={access}>
			{/* @ts-ignore */}
			{React.cloneElement(children, {
				// @ts-ignore
				...children.props,
				routes: traverseModifyRoutes(routes, access),
				loading: initialState.loading
			})}
		</Provider>
	)
}

export default AccessProvider
