/* global NodeJS */
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Nprogress from 'nprogress'

import 'nprogress/nprogress.css'

import SpinLoadingIcon from './SpinLoadingIcon'

type PageLoadingType = {
	show: () => void
	instance: HTMLElement | null
	hide: () => void
	parent: HTMLElement | Element | null
} & React.FC<{
	visible?: boolean
	spin?: boolean
}>

Nprogress.configure({
	showSpinner: false
})

// progress queue: singleton
const queue: (NodeJS.Timeout | undefined)[] = []

const PageLoading: PageLoadingType = props => {
	const { visible = false, spin = false } = props

	const timer = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (visible) {
			Nprogress.start()
		} else {
			Nprogress.done()
		}
	}, [visible])

	/** for dynamicImport */
	useEffect(() => {
		if (visible) {
			return () => {}
		}

		if (!queue.length) {
			timer.current = setTimeout(() => {
				Nprogress.start()
			}, 300)
		}

		queue.push(timer.current)

		return () => {
			requestAnimationFrame(() => {
				timer.current && clearTimeout(timer.current)
				queue.shift()
				if (!queue.length) {
					Nprogress.done()
				}
			})
		}
	}, [])

	return spin ? (
		<div className="tw-w-full tw-h-full">
			<SpinLoadingIcon />
		</div>
	) : null
}

PageLoading.instance = null
PageLoading.parent = null

PageLoading.show = function () {
	if (!PageLoading.instance) {
		PageLoading.instance = document.createElement('div')
		document.body.appendChild(PageLoading.instance)
	}

	ReactDOM.render(<PageLoading visible />, PageLoading.instance)
}

PageLoading.hide = function () {
	const { instance } = PageLoading
	if (instance) {
		// ReactDOM.render(<></>, instance);
		// PageLoading.parent?.removeChild(instance);
		// PageLoading.instance = null;
		// 状态驱动，参考尤雨溪的回答  https://www.zhihu.com/question/35820643/answer/64646527
		ReactDOM.render(<PageLoading visible={false} />, PageLoading.instance)
	}
}

const showPageLoading = PageLoading.show
const destoryPageLoading = PageLoading.hide

export default PageLoading

export { showPageLoading, destoryPageLoading }
