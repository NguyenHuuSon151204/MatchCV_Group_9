import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import {
  DashboardIcon,
  BriefcaseIcon,
  UserIcon,
  BuildingIcon,
  KeyIcon,
  ChartIcon,
  FileTextIcon,
  BrainIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from './Icons'

function Sidebar({ collapsed, onToggle }) {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/recruiter', label: 'Recruiter Dashboard', icon: BriefcaseIcon },
    { path: '/jobs', label: 'Job Management', icon: BriefcaseIcon },
    { path: '/applicants', label: 'Applicant Management', icon: UserIcon },
    { path: '/recruiters', label: 'Recruiter Management', icon: BuildingIcon },
    { path: '/licenses', label: 'License Management', icon: KeyIcon },
    { path: '/reports', label: 'Reports & Analytics', icon: ChartIcon },
    { path: '/logs', label: 'Audit Log', icon: FileTextIcon },
    { path: '/ai-status', label: 'AI Status', icon: BrainIcon },
    { path: '/config', label: 'System Configuration', icon: SettingsIcon },
  ]

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">M</div>
        {!collapsed && <div className="logo-text">MatchCV</div>}
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

          const IconComponent = item.icon
          return (
            <NavLink
              key={item.path || index}
              to={item.path || '#'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              title={collapsed ? item.label : ''}
            >
              <span className="nav-icon">
                <IconComponent size={20} />
              </span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button 
          className="sidebar-toggle" 
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRightIcon size={16} /> : <ChevronLeftIcon size={16} />}
        </button>
        {!collapsed && (
          <span className="sidebar-footer-text">© 2025 MatchCV</span>
        )}
      </div>
    </aside>
  )
}

export default Sidebar

