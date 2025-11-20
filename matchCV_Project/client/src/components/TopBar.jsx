import './TopBar.css'
import { useTheme } from '../contexts/ThemeContext'

function TopBar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="search-container">
          <input
            type="text"
            placeholder="Quick search..."
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
      </div>

      <div className="topbar-right">
        <button className="icon-button notification-btn">
          🔔
          <span className="notification-badge">3</span>
        </button>
        <button 
          className="icon-button theme-toggle" 
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className="user-avatar">
          <div className="avatar-circle">AD</div>
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  )
}

export default TopBar

