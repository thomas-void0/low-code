import React, { useState, createContext, FC, useCallback, useMemo, useContext } from 'react'

type MenuValue = {
	flatMenuKeys: string[]
	dispatch: React.Dispatch<React.SetStateAction<string[]>>
}

const MenuCounter = createContext<MenuValue>({
	flatMenuKeys: [],
	dispatch: () => {}
})

const { Provider } = MenuCounter

const MenuProvider: FC<any> = ({ children }) => {
	const [flatMenuKeys, setFlatMenuKeys] = useState<string[]>([])

	const dispatch = useCallback(setFlatMenuKeys, [])

	const value = useMemo(
		() => ({
			flatMenuKeys,
			dispatch
		}),
		[flatMenuKeys]
	)

	return <Provider value={value}>{children}</Provider>
}

// 使用菜单
export const useMenu = (): [string[], MenuValue['dispatch']] => {
	const { flatMenuKeys, dispatch } = useContext(MenuCounter)
	return [flatMenuKeys, dispatch]
}

export default MenuProvider
