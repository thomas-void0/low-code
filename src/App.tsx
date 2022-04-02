import { useEffect } from 'react'
import { getEev } from '@/utils'
import { reqGetBrandList } from '@/api'
import Header from '@/layout/components/HeaderView'

function App() {
	useEffect(() => {
		reqGetBrandList().then(res => {
			console.log('res', res)
		})
	}, [])

	console.log(getEev())
	return <Header matchMenuKeys={['2']} />
}
export default App
