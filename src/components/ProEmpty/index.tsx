import { Button } from 'antd'
import classNames from 'classnames'
import React, { CSSProperties } from 'react'
import { ReactComponent as EmptySvg } from './img/empty.svg'
import styles from './index.module.less'

type ComponentProps = {
	description?: React.ReactNode
	/** 自定义内容渲染 */
	contentRender?: React.ReactNode
	/** 是否显示button */
	isButton?: boolean
	buttonText?: string
	/** button clicK 事件 */
	onClick?: () => void
	/** 盒子大小 */
	size?: 'full' | 'large' | 'middle' | 'small'
	style?: CSSProperties
}

const ProEmpty: React.FC<ComponentProps> = props => {
	const {
		description = '暂无数据',
		contentRender,
		isButton = false,
		buttonText = '添加',
		onClick,
		size = 'middle',
		style
	} = props

	return (
		<div className={classNames(styles.wrapper, styles[size])} style={style}>
			<div className={styles.desc}>{description}</div>

			{isButton && (
				<Button onClick={onClick} type="primary">
					{buttonText}
				</Button>
			)}

			{contentRender && contentRender}

			<EmptySvg style={{ width: 220, height: 130 }} />
		</div>
	)
}

export default ProEmpty
