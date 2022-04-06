/* global process */
// 是否展示某个模块，通过权限控制
import React from 'react'

export interface AccessProps {
	accessible?: boolean
	fallback?: React.ReactNode
}
const Access: React.FC<AccessProps> = props => {
	const { accessible, fallback, children } = props

	if (process.env.NODE_ENV === 'development' && typeof accessible === 'function') {
		console.warn(
			'[access]: provided "accessible" prop is a function named "' +
				(accessible as any).name +
				'" instead of a boolean, maybe you need check it.'
		)
	}

	return <>{accessible ? children : fallback}</>
}

export default Access
