import { request } from '@/service'

// 测试接口
export async function reqGetBrandList() {
	return request.get({
		url: '/api/taskset/taskset/xdnphb/taskset/v1/api/sys/project/getBrandList'
	})
}
