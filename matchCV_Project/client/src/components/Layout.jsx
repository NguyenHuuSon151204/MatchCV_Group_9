import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import './Layout.css'

function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <TopBar />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout

