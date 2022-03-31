import { useEffect } from 'react'
import { getEev } from '@/utils'
import { reqGetBrandList } from '@/api'

function App() {
	useEffect(() => {
		reqGetBrandList().then(res => {
			console.log('res', res)
		})
	}, [])

	console.log(getEev())
	return <div>app</div>
}
export default App
