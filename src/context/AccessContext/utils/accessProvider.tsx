import GlobalContext from '@/context/GlobalContext'
import { MenuDataItem } from '@/layout/types/typings'
import React, { useMemo } from 'react'
import accessFactory from '../access'
import AccessContext, { AccessInstance } from './accessContext'
import { traverseModifyRoutes } from './traverseModifyRoutes'

type Routes = MenuDataItem[]

interface Props {
	routes: Routes
	children?: React.ReactNode
}

const AccessProvider: React.FC<Props> = props => {
	const { children, routes } = props

	// globalContext
	const { initialState } = GlobalContext.usePicker(['initialState'])

	const access: AccessInstance = useMemo(() => accessFactory(initialState), [initialState])

	return (
		<AccessContext.Provider value={access}>
			{/* @ts-ignore */}
			{React.cloneElement(children, {
				// @ts-ignore
				...children.props,
				routes: traverseModifyRoutes(routes, access),
				loading: initialState.loading
			})}
		</AccessContext.Provider>
	)
}

export default AccessProvider
