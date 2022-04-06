import React from 'react'
import { Space } from 'antd'
import AvatarDropdown from './components/AvatarDropdown'
import styles from './index.module.less'

const GlobalHeaderRight: React.FC = () => {
	return (
		<Space className={styles.right} align="center">
			<AvatarDropdown />
		</Space>
	)
}
export default GlobalHeaderRight
