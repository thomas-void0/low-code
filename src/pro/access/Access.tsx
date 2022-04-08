// 是否展示某个模块，通过权限控制
import React from 'react'

export interface AccessProps {
	accessible?: boolean
	fallback?: React.ReactNode
}
const Access: React.FC<AccessProps> = props => {
	const { accessible, fallback, children } = props
	return <>{accessible ? children : fallback}</>
}

export default Access
