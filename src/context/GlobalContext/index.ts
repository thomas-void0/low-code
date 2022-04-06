import { getRoleMenu, getUser } from '@/api'
import { createContainer } from '@minko-fe/context-state'
import { useEffect, useState } from 'react'
import { getBreadcrumbNameMap } from '@/layout/utils/getBreadcrumbNameMap'
import { Route } from '@/layout/types/typings'

export type InitialStateType = {
	loading: boolean
	userInfo?: Record<string, any>
	accessInfo?: string[]
}

const checkAuth = (routes?: Route[]) => {
	const breadcrumbMap = getBreadcrumbNameMap(routes, 'routes')

	if (breadcrumbMap?.get(location.pathname)?.auth === false) {
		// 不需要授权登录
		return false
	}
	return true
}

const fetchAccessInfo = async () => {
	const res = await getRoleMenu()
	const { result } = res
	if (result) {
		return result
	}
	return []
}

const fetchUserInfo = async () => {
	try {
		const res = await getUser()

		if (!res.result) {
			throw new Error('用户未登录')
		}

		const result = res?.result

		let access
		if (result) {
			access = await fetchAccessInfo()
		}
		return {
			userInfo: result,
			accessInfo: access
		}
	} catch (error) {
		return {
			userInfo: undefined,
			access: []
		}
	}
}

function useGlobalContext({ routes }: { routes?: Route[] } = {}) {
	// const location = useLocation();

	const [initialState, setInitialState] = useState<InitialStateType>({
		loading: true,
		userInfo: {},
		accessInfo: []
	})

	useEffect(() => {
		if (checkAuth(routes) === false) {
			return
		}
		// 请求
		fetchUserInfo()
			.then(res => {
				if (res.userInfo) {
					setInitialState({
						loading: false,
						userInfo: res.userInfo,
						accessInfo: res.accessInfo
					})
				}
			})
			.catch(() => {
				setInitialState({ loading: true })
			})
	}, [])

	return {
		initialState,
		setInitialState
	}
}

const GlobalContext = createContainer(useGlobalContext)

export default GlobalContext
