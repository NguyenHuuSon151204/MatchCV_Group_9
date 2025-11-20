import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/jobs', label: 'Job Management', icon: '💼' },
    { path: '/applicants', label: 'Applicant Management', icon: '👤' },
    { path: '/recruiters', label: 'Recruiter Management', icon: '🏢' },
    { path: '/reports', label: 'Reports & Analytics', icon: '📈' },
    { path: '/logs', label: 'Audit Log', icon: '📋' },
    { path: '/ai-status', label: 'AI Status', icon: '🧠' },
    { path: '/config', label: 'System Configuration', icon: '🔧' },
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

