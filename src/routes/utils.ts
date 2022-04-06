import { Route } from '@/layout/types/typings'
import { fromEntries, mergePath, stripQueryStringAndHashFromPath } from '@/layout/utils/getMenuData'
import { isEqual } from 'lodash-es'
import memoizeOne from 'memoize-one'

/**
 * 获取面包屑映射
 * @param Route[] menuData 菜单配置
 */
const getBreadcrumbNameMap = memoizeOne(
	(routes?: Route[], fiedlName: string = 'children'): Map<string, Route> => {
		// Map is used to ensure the order of keys
		const routerMap = new Map<string, Route>()
		const flattenMenuData = (data?: Route[], parent?: Route) => {
			data?.forEach(menuItem => {
				if (menuItem && menuItem[fiedlName as keyof Route]) {
					// @ts-ignore
					flattenMenuData(menuItem[fiedlName], menuItem)
				}
				// Reduce memory usage
				const path = mergePath(menuItem.path, parent ? parent.path : '/')
				routerMap.set(stripQueryStringAndHashFromPath(path), menuItem)
			})
		}
		flattenMenuData(routes)
		return routerMap
	},
	isEqual
)

const getEntriesBreadcrumbNameMap = (routes?: Route[], fiedlName?: string) => {
	const breadcrumb = getBreadcrumbNameMap(routes, fiedlName)
	return fromEntries(breadcrumb)
}

export { getBreadcrumbNameMap, getEntriesBreadcrumbNameMap }
