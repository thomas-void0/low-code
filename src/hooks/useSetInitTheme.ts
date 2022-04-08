// 设置初始化主题
import { theme as defaultTheme, themeName } from '@/config/themeSetting'
import { ConfigProvider } from 'antd'
import { useEffect } from 'react'

function useSetInitTheme() {
	useEffect(() => {
		const localTheme = localStorage.getItem(themeName)

		if (localTheme) {
			ConfigProvider.config({
				theme: JSON.parse(localTheme)
			})
		} else {
			localStorage.setItem(themeName, JSON.stringify(defaultTheme))
			ConfigProvider.config({
				theme: defaultTheme
			})
		}
	}, [])
}

export default useSetInitTheme
