import { useEffect, useState } from 'react'
import { ProSettings } from '../../typings/menu'

const omitUndefined = <T extends object>(obj: T): T => {
	const newObj = {} as unknown as T
	Object.keys(obj || {}).forEach(key => {
		// @ts-ignore
		if (obj[key] !== undefined) {
			// @ts-ignore
			newObj[key] = obj[key]
		}
	})
	if (Object.keys(newObj).length < 1) {
		return undefined as any
	}
	return newObj
}

const useCurrentMenuLayoutProps = (currentMenu: ProSettings) => {
	const [currentMenuLayoutProps, setCurrentMenuLayoutProps] = useState({})

	useEffect(() => {
		setCurrentMenuLayoutProps(
			omitUndefined({
				// 有时候会变成对象，是原来的方式
				menuRender: currentMenu.menuRender,
				menuHeaderRender: currentMenu.menuHeaderRender,
				headerRender: currentMenu.headerRender,
				fixSiderbar: currentMenu.fixSiderbar
			})
		)
	}, [
		currentMenu.menuRender,
		currentMenu.menuHeaderRender,
		currentMenu.headerRender,
		currentMenu.fixSiderbar
	])
	return currentMenuLayoutProps
}

export default useCurrentMenuLayoutProps
