import React, { useState } from 'react'
import ThemeSetting from './ThemeSetting'

const Theme: React.FC = () => {
	const [visible, setVisible] = useState<boolean>(false)

	return (
		<>
			<ThemeSetting visible={visible} setVisible={setVisible} />
		</>
	)
}

export default Theme
