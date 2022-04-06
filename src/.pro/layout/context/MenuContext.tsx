import { createContainer } from '@minko-fe/context-state'
import { useState } from 'react'

function useMenuCounter() {
	const [flatMenuKeys, setFlatMenuKeys] = useState<string[]>([])
	return {
		flatMenuKeys,
		setFlatMenuKeys
	}
}

const MenuCounter = createContainer(useMenuCounter)
export default MenuCounter
