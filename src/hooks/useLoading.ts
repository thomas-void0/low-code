// 管理loading状态的hook
import { useState } from 'react'

export function useLoading(): boolean {
	const [loading, setLoading] = useState(false)

	return loading
}
