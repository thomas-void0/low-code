/* global process */
import { ENV } from '../types/global'

// 检测环境变量
export function getEev(): ENV {
	return process.env.NODE_ENV as ENV
}
