/*
 *
 * 使用方法：
 *
 * <IconFont type="icon_cpszu235251" />
 *
 * type: 对应的iconfont图标名
 */

import { createFromIconfontCN } from '@ant-design/icons'
import { iconfontUrl } from '@/utils/setting'

const IconFont = createFromIconfontCN({
	scriptUrl: iconfontUrl
})

export default IconFont
