import React, { useEffect, useState, useContext, createContext, useMemo } from 'react'
import { Theme } from 'antd/es/config-provider/context'
import { ConfigProvider } from 'antd'
import { theme as defaultTheme, themeName } from '@/utils/setting'

type ThemeValue = {
	theme: Theme
	dispatch: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = createContext<ThemeValue>({
	theme: defaultTheme,
	dispatch: () => {}
})

const { Provider } = ThemeContext

const ThemeProvider: React.FC<any> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(defaultTheme)

	const themeValue = useMemo(
		() => ({
			theme,
			dispatch: setTheme
		}),
		[theme]
	)

	const [, dispatch] = useTheme()

	useEffect(() => {
		const localTheme = localStorage.getItem(themeName)

		if (localTheme) {
			ConfigProvider.config({
				theme: JSON.parse(localTheme)
			})
			dispatch(JSON.parse(localTheme) as Theme)
		} else {
			localStorage.setItem(themeName, JSON.stringify(defaultTheme))
			ConfigProvider.config({
				theme: defaultTheme
			})
			dispatch(defaultTheme)
		}
	}, [])

	return <Provider value={themeValue}>{children}</Provider>
}

export const useTheme = (): [ThemeValue['theme'], ThemeValue['dispatch']] => {
	const { theme, dispatch } = useContext(ThemeContext)
	return [theme, dispatch]
}

export default ThemeProvider
