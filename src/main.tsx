import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil'
import ErrorBoundary from '@/components/ErrorBoundary'

ReactDOM.render(
	<ErrorBoundary>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</ErrorBoundary>,
	document.getElementById('root')
)
