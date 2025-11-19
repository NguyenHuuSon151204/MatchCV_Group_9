import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    {
      label: 'Quản lý tài khoản',
      icon: '⚙️',
      children: [
        { path: '/candidates', label: 'Quản lý Candidate', icon: '👥' },
        { path: '/recruiters', label: 'Quản lý Recruiter', icon: '🏢' },
      ],
    },
    { path: '/config', label: 'Cấu hình hệ thống', icon: '🔧' },
    { path: '/reports', label: 'Báo cáo & Phân tích', icon: '📈' },
    { path: '/logs', label: 'Nhật ký & Audit Log', icon: '📋' },
    { path: '/ai-status', label: 'AI Status', icon: '🧠' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">M</div>
        <div className="logo-text">MatchCV</div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.children) {
            return (
              <div key={index} className="nav-group">
                <div className="nav-group-header">
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="nav-arrow">▼</span>
                </div>
                <div className="nav-group-children">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? 'active' : ''}`
                      }
                    >
                      <span className="nav-icon">{child.icon}</span>
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <NavLink
              key={item.path || index}
              to={item.path || '#'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <span>© 2025 MatchCV</span>
      </div>
    </aside>
  )
}

export default Sidebar

