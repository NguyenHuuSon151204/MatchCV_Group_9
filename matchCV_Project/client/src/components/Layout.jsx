import Sidebar from './Sidebar'
import TopBar from './TopBar'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout

