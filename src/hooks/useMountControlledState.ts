// 浏览器空闲调度hook
import { useEffect, useRef, useState } from 'react'

type Dispatch<A> = (value: A) => void

function useMountControlledState<S>(initialState: S | (() => S)): [S, Dispatch<S>] {
	const mountRef = useRef<boolean>(false)
	const frame = useRef<number>(0)

	useEffect(() => {
		mountRef.current = true
		return () => {
			mountRef.current = false
		}
	}, [])

	const [state, setState] = useState(initialState)

	const mountSetState: Dispatch<S> = (prevState: S) => {
		cancelAnimationFrame(frame.current)
		frame.current = requestAnimationFrame(() => {
			if (mountRef.current) {
				setState(prevState)
			}
		})
	}

	return [state, mountSetState]
}

export default useMountControlledState
