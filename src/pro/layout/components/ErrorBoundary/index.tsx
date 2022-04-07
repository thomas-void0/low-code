import React from 'react'

export default class ErrorBoundary extends React.Component {
	state: any
	constructor(props: any) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		// 更新 state 使下一次渲染能够显示降级后的 UI
		return { hasError: true }
	}

	componentDidCatch() {
		// 考虑在这里做一下日志上报
		console.log('layout catch')
	}

	render() {
		if (this.state.hasError) {
			return <h1>error</h1>
		}

		return this.props.children
	}
}
