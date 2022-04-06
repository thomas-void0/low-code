import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import ProEmpty from './components/ProEmpty'
import PageLoading from './components/Loading'
import GlobalContext from './context/GlobalContext'
import { AccessProvider } from './context/AccessContext'
import CreateRoutes from './layout/renderer-react/renderRoutes'
import routes from './routes'

import 'virtual:windi.css'
import './assets/css/index.less'

function App() {
	return (
		<ThemeContext.Provider>
			<ConfigProvider
				locale={zh_CN}
				input={{ autoComplete: 'off' }}
				form={{ validateMessages: { required: '请完善${label}' } }}
				renderEmpty={() => <ProEmpty size="large" />}
			>
				<BrowserRouter basename="/">
					<Suspense fallback={<PageLoading />}>
						<GlobalContext.Provider value={{ routes }}>
							<AccessProvider routes={routes}>
								<CreateRoutes />
							</AccessProvider>
						</GlobalContext.Provider>
					</Suspense>
				</BrowserRouter>
			</ConfigProvider>
		</ThemeContext.Provider>
	)
}
export default App
