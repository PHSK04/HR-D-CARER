import { useState } from 'react'
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  CircleAlert,
  FileText,
  Home,
  Map,
  Network,
  Settings,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'

const menuItems = [
  {
    icon: CircleAlert,
    title: 'Data Issues',
    sub: 'จัดการปัญหาข้อมูล',
    target: 'Datasets',
    expandable: true,
    children: [{ title: 'Datasets', target: 'Datasets' }],
  },
  {
    icon: BarChart3,
    title: 'Monthly Monitoring',
    sub: 'ติดตามรายเดือน',
    target: 'Dashboard',
  },
  {
    icon: Map,
    title: 'Cleansing Roadmap & Status',
    target: 'Dashboard',
  },
  {
    icon: BookOpen,
    title: 'Learning Hub / คู่มือการใช้งาน',
    sub: 'การใช้งานข้อมูล',
    key: 'learningHub',
    expandable: true,
    children: [
      { title: 'EP01: วิธีคีย์ข้อมูลพนักงาน' },
      { title: 'EP02: วิธีแก้ข้อมูลตำแหน่ง', active: true },
      { title: 'EP03: วิธีตรวจสอบข้อมูลผิด' },
      { title: 'EP04: วิธีส่งหลักฐานการแก้ไข' },
      { title: 'FAQ / Download Master Data' },
    ],
  },
  {
    icon: FileText,
    title: 'Audit Log',
    target: 'Dashboard',
  },
  {
    icon: Settings,
    title: 'Settings',
    target: 'Dashboard',
  },
]

function MainMenuPage({ onEnter }) {
  const [systemMenuOpen, setSystemMenuOpen] = useState(false)
  const [learningHubOpen, setLearningHubOpen] = useState(false)

  return (
    <main className="menu-page">
      <section className="menu-shell" aria-label="HR D-CARE main menu">
        <Logo />
        <nav className="menu-list">
          <div className="menu-list-item">
            <button
              className="active"
              type="button"
              onClick={() => onEnter('Dashboard')}
            >
              <Home size={32} />
              <span>
                <strong>แดชบอร์ด</strong>
                <small>Data Quality Overview</small>
              </span>
            </button>
          </div>

          {!systemMenuOpen && (
            <div className="menu-list-item">
              <button
                className="system-menu-toggle"
                type="button"
                aria-expanded={systemMenuOpen}
                onClick={() => {
                  setSystemMenuOpen(true)
                  onEnter('Datasets')
                }}
              >
                <Network size={32} />
                <span>
                  <strong>HR D-CARE System</strong>
                </span>
                <ChevronDown size={22} />
              </button>
            </div>
          )}

          {systemMenuOpen && menuItems.map((item) => {
            const Icon = item.icon
            return (
              <div className="menu-list-item" key={item.title}>
                <button
                  className={item.active ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    if (item.key === 'learningHub') {
                      setLearningHubOpen((current) => !current)
                      return
                    }
                    onEnter(item.target)
                  }}
                >
                  <Icon size={32} />
                  <span>
                    <strong>{item.title}</strong>
                    {item.sub && <small>{item.sub}</small>}
                  </span>
                  {item.expandable && <ChevronDown size={22} />}
                </button>
                {item.children && item.key !== 'learningHub' && item.children.map((child) => (
                  <button
                    className="menu-subitem"
                    key={child.title}
                    type="button"
                    onClick={() => onEnter(child.target)}
                  >
                    <span />
                    <strong>{child.title}</strong>
                  </button>
                ))}
                {item.key === 'learningHub' && learningHubOpen && (
                  <div className="learning-submenu">
                    {item.children.map((child) => (
                      <button
                        className={child.active ? 'active' : ''}
                        key={child.title}
                        type="button"
                        onClick={() => onEnter('Dashboard')}
                      >
                        {child.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
        <footer>
          <strong>Version 2.1.0</strong>
          <span>© 2026 HR D-CARE</span>
          <span>(Provincial Electricity Authority)</span>
        </footer>
      </section>

    </main>
  )
}

export default MainMenuPage
