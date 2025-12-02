import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './TopBar.css'
import { useTheme } from '../contexts/ThemeContext'
import { SearchIcon, BellIcon, MoonIcon, SunIcon } from './Icons'

function TopBar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  // Auto-focus search when user types
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector('.search-input')?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Navigate to appropriate page based on current route
    if (location.pathname.includes('/jobs')) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`)
    } else if (location.pathname.includes('/applicants')) {
      navigate(`/applicants?search=${encodeURIComponent(searchQuery)}`)
    } else if (location.pathname.includes('/recruiter')) {
      navigate(`/recruiter?search=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-left"></div>

      <div className="topbar-center">
        <form className="search-container" onSubmit={handleSearch}>
          <SearchIcon className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Quick search... (Ctrl+K)"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>
      </div>

      <div className="topbar-right">
        <button className="icon-button notification-btn" aria-label="Notifications">
          <BellIcon size={18} />
          <span className="notification-badge">3</span>
        </button>
        <button 
          className="icon-button theme-toggle" 
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
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

