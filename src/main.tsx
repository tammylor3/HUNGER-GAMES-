import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CapitolArchive from './CapitolArchive'
import './styles.css'
import './capitol.css'

const isCapitolRoute = window.location.pathname === '/capitol' || window.location.pathname.startsWith('/capitol/')

document.documentElement.dataset.archive = isCapitolRoute ? 'capitol' : 'panem'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isCapitolRoute ? <CapitolArchive /> : <App />}
  </React.StrictMode>,
)
