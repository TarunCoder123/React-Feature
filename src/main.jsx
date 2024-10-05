import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Table from './Table.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Table/>
  </StrictMode>,
)
