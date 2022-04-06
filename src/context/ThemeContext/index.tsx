import { useEffect, useState } from 'react'
import { Theme } from 'antd/es/config-provider/context'
import { createContainer } from '@minko-fe/context-state'
import { ConfigProvider } from 'antd'
import { theme as defaultTheme, themeName } from '@/utils/setting'

function useThemeContext() {
	const [theme, setTheme] = useState<Theme>(defaultTheme)

	useEffect(() => {
		const localTheme = localStorage.getItem(themeName)

		if (localTheme) {
			ConfigProvider.config({
				theme: JSON.parse(localTheme)
			})
			setTheme(JSON.parse(localTheme) as Theme)
		} else {
			localStorage.setItem(themeName, JSON.stringify(defaultTheme))
			ConfigProvider.config({
				theme: defaultTheme
			})
			setTheme(defaultTheme)
		}
	}, [])

	return {
		theme,
		setTheme
	}
}

const ThemeContext = createContainer(useThemeContext)

export default ThemeContext
