export type GetPageTitleProps = {
	pathname?: string
	breadcrumb?: Record<string, MenuDataItem>
	breadcrumbMap?: Map<string, MenuDataItem>
	menu?: ProSettings['menu']
	webTitle?: ProSettings['webTitle']
	pageName?: string
}
