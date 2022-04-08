import { ENV } from '../types/global'

// 获取环境变量
export function getEev(): ENV {
	// @ts-ignore
	return import.meta.env.VITE_NODE_ENV
}

// 复制文本
export const copy = (text: string | number): boolean => {
	if (!text) return false

	let textArea = document.createElement('textarea')

	textArea.style.position = 'fixed'

	textArea.style.top = '0'

	textArea.style.left = '0'

	textArea.style.width = '2em'

	textArea.style.height = '2em'

	textArea.style.padding = '0'

	textArea.style.border = 'none'

	textArea.style.outline = 'none'

	textArea.style.boxShadow = 'none'

	textArea.style.background = 'transparent'

	textArea.value = text.toString()

	document.body.appendChild(textArea)

	textArea.select()

	let res = !!document.execCommand('copy')

	document.body.removeChild(textArea)

	return res
}
