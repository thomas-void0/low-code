import React, { useEffect, useState, createContext, useContext, useCallback, useMemo } from 'react'
import { getBreadcrumbNameMap } from '../layout/utils/getBreadcrumbNameMap'
import { getInitialState } from '../proConfig'
import { InitialStateType } from '../typings/globalContext'
import { Route } from '../typings/menu'

type GlobalValue = {
	initalState: InitialStateType
	dispatch: React.Dispatch<React.SetStateAction<InitialStateType>>
}

const _internal_global_context_ = createContext<GlobalValue>({
	initalState: {
		loading: true,
		userInfo: {},
		accessInfo: []
	},
	dispatch: () => {}
})

const { Provider } = _internal_global_context_

// 使用全局global
export const useGlobal = (): [InitialStateType, GlobalValue['dispatch']] => {
	const { initalState, dispatch } = useContext(_internal_global_context_)
	return [initalState, dispatch]
}

export interface GlobalProviderProps {
	routes?: Route[]
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ routes, children } = {}) => {
	const [initalState, setInitalState] = useState<InitialStateType>({
		loading: true,
		userInfo: {},
		accessInfo: []
	})

	const dispatch = useCallback(setInitalState, [])

	const providerValue: GlobalValue & { routes: Route[] } = useMemo(
		() => ({
			dispatch,
			initalState,
			routes
		}),
		[initalState]
	)

	const checkAuth = (routes?: Route[]) => {
		const breadcrumbMap = getBreadcrumbNameMap(routes, 'routes')

		if (breadcrumbMap?.get(location.pathname)?.auth === false) {
			// 不需要授权登录
			return false
		}
		return true
	}

	useEffect(() => {
		// 进行权限检测
		if (checkAuth(routes) === false) return
		// 调用初始化数据
		getInitialState().then(res => {
			dispatch(res)
		})
	}, [])

	return <Provider value={providerValue}>{children}</Provider>
}

export default GlobalProvider
