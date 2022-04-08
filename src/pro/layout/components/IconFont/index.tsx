/*
 *
 * 使用方法：
 *
 * <IconFont type="icon_cpszu235251" />
 *
 * type: 对应的iconfont图标名
 */

import { layoutSettings } from '@config/proConfig'
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
	scriptUrl: layoutSettings.iconfontUrl
})

export default IconFont
