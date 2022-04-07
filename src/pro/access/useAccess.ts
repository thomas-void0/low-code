// 使用权限hook
import { useContext } from 'react'
import AccessContext from './context'

const useAccess = () => {
	const access = useContext(AccessContext)
	return access
}

export default useAccess
