import { isEqual } from 'lodash-es'
import memoizeOne from 'memoize-one'
import { Route } from '../types/typings'
import { fromEntries, mergePath, stripQueryStringAndHashFromPath } from './getMenuData'

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
				const val: any = menuItem[fiedlName as keyof Route]
				if (menuItem && val) {
					flattenMenuData(val, menuItem)
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
