import React from 'react'
import ReactDOM from 'react-dom/client'

// Use consistent styling
import 'sanitize.css/sanitize.css'

// Import root app
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import ErrorBoundary from 'app/components/ErrorBoundary/ErrorBoundary'
import App from './app'
import reportWebVitals from './reportWebVitals'
import { store } from './@redux/store'
import 'config/index'

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    </HelmetProvider>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
