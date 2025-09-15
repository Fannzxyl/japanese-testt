import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'

const el = document.getElementById('root')
if (!el) throw new Error('Could not find root element to mount to')

ReactDOM.createRoot(el).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
