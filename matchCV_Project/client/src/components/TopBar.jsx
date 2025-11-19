import './TopBar.css'

function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
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
        <button className="icon-button theme-toggle">🌙</button>
        <div className="user-avatar">
          <div className="avatar-circle">AD</div>
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  )
}

export default TopBar

