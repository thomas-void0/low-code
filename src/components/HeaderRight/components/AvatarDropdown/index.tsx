import React, { useCallback, useState } from 'react'
import { Avatar, Menu, Spin, Dropdown } from 'antd'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import styles from './index.module.less'
import { useGlobal } from '@/pro'
import { Link } from 'react-router-dom'
import ThemeSetting from '../../../ThemeSetting/ThemeSetting'
import { loginOut } from '@/api'
import memoryConfig from '@config/memoryConfig'

export interface GlobalHeaderRightProps {
	menu?: boolean
}

/**
 * 退出登录
 */
const fetchLoginOut = async () => {
	loginOut()
		.then(() => {
			window.location.href = memoryConfig.loginUrl
		})
		.catch(() => {
			window.location.href = memoryConfig.loginUrl
		})
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
	const [visible, setVisible] = useState<boolean>(false)

	const [initialState] = useGlobal()

	const onMenuClick = useCallback(
		(event: MenuInfo) => {
			const { key } = event
			if (key === 'logout' && initialState) {
				fetchLoginOut()
			}

			if (key === 'setting') {
				setVisible(true)
			}
		},
		[initialState]
	)

	const loading = (
		<span className={`${styles.action} ${styles.account}`}>
			<Spin size="small" className="tw-mx-xs" />
		</span>
	)

	if (!initialState) {
		return loading
	}

	const { userInfo } = initialState

	if (!userInfo) {
		return loading
	}

	const menuHeaderDropdown = (
		// @ts-ignore
		<Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
			<Menu.Item key="center">
				<Link to="/account/user/info">
					<UserOutlined />
					个人中心
				</Link>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="setting">
				<SettingOutlined />
				主题设置
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="logout">
				<LogoutOutlined />
				退出登录
			</Menu.Item>
		</Menu>
	)
	return (
		<>
			<Dropdown overlay={menuHeaderDropdown}>
				<span className={`${styles.action} ${styles.account}`}>
					<Avatar size="small" className={styles.avatar} src={userInfo.headImgUrl} alt="avatar" />
					<span className={`${styles.name} anticon`}>{userInfo.nickName}</span>
				</span>
			</Dropdown>
			<ThemeSetting visible={visible} setVisible={setVisible} />
		</>
	)
}

export default AvatarDropdown
