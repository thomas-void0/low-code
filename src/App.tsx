import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './context/ThemeContext'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import ProEmpty from './components/ProEmpty'
import PageLoading from './components/Loading'
import { GlobalProvider, AccessProvider, CreateRoutes } from './pro'
import routes from './routes'

import 'virtual:windi.css'
import './assets/css/index.less'

function App() {
	return (
		<ThemeProvider>
			<ConfigProvider
				locale={zh_CN}
				input={{ autoComplete: 'off' }}
				form={{ validateMessages: { required: '请完善${label}' } }}
				renderEmpty={() => <ProEmpty size="large" />}
			>
				<BrowserRouter basename="/">
					<Suspense fallback={<PageLoading />}>
						<GlobalProvider routes={routes}>
							<AccessProvider routes={routes}>
								<CreateRoutes />
							</AccessProvider>
						</GlobalProvider>
					</Suspense>
				</BrowserRouter>
			</ConfigProvider>
		</ThemeProvider>
	)
}
export default App
