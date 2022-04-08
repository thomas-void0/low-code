import { request } from '@/pro/service'

// 获取用户信息以及相关信息同步
export async function getUser() {
	return request.get({
		url: '/api/nr-trade-security/xdnphb/adinsight/security/user/getUserInfo'
	})
}

// 测试接口
export async function reqGetBrandList() {
	return request.get({
		url: '/api/taskset/taskset/xdnphb/taskset/v1/api/sys/project/getBrandList'
	})
}

// 获取当前用的菜单的标识路由
export async function getRoleMenu() {
	return request.get({
		url: '/api/nr-trade-security/xdnphb/adinsight/security/menu/getRoleMenu'
	})
}

// 退出登录
export async function loginOut() {
	return request.post({
		url: '/nr/user/login/loginOut'
	})
}
