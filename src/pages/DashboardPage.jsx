import { useState } from 'react'
import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  Database,
  Download,
  FileText,
  Filter,
  HardDrive,
  Home,
  Info,
  LogOut,
  Mail,
  Map,
  Moon,
  Network,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShieldPlus,
  Sun,
  Upload,
  User,
  Users,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'
import DatasetsPage from './DatasetsPage.jsx'
import LearningHubPage from './LearningHubPage.jsx'

const primaryStats = [
  {
    icon: Database,
    title: 'จำนวนชุดข้อมูลทั้งหมด',
    value: '47',
    detail: 'ชุดข้อมูล',
    delta: '+5',
    tone: 'violet',
  },
  {
    icon: Clock3,
    title: 'จำนวนปัญหาทั้งหมด',
    value: '103',
    detail: 'รายการ',
    delta: '+12',
    tone: 'violet',
  },
]

const secondaryStats = [
  {
    icon: ShieldCheck,
    title: 'คะแนนคุณภาพข้อมูล',
    value: '93.2%',
    detail: 'เป้าหมาย: 90%',
    delta: '+4.7%',
    tone: 'violet',
    progress: 86,
  },
  {
    icon: BarChart3,
    title: 'ปัญหาที่แก้ไขแล้ว (30 วัน)',
    value: '287',
    detail: 'เฉลี่ย: 9.6 รายการ/วัน',
    delta: '+8.3%',
    tone: 'blue',
  },
  {
    icon: AlertTriangle,
    title: 'ปัญหาที่กำลังดำเนินการ',
    value: '103',
    detail: 'ลดลงจาก 118',
    delta: '-12.4%',
    tone: 'rose',
  },
]

const issues = [
  {
    level: 'Critical',
    title: 'ข้อมูลเลขที่บัตรประชาชนไม่ถูกต้อง',
    source: 'Employee Master',
    time: '2 นาทีที่แล้ว',
    color: 'red',
  },
  {
    level: 'High',
    title: 'ข้อมูลตำแหน่งงานว่าง',
    source: 'Position Master',
    time: '15 นาทีที่แล้ว',
    color: 'orange',
  },
  {
    level: 'High',
    title: 'ข้อมูลอีเมลไม่ถูกต้อง',
    source: 'Contact Information',
    time: '1 ชั่วโมงที่แล้ว',
    color: 'orange',
  },
  {
    level: 'Medium',
    title: 'ข้อมูลวันที่เริ่มงานไม่มีเหตุผล',
    source: 'Employee Master',
    time: '2 ชั่วโมงที่แล้ว',
    color: 'blue',
  },
  {
    level: 'Medium',
    title: 'ข้อมูลหน่วยงานไม่ถูกต้อง',
    source: 'Organization Master',
    time: '3 ชั่วโมงที่แล้ว',
    color: 'blue',
  },
]

const categoryScores = [
  { icon: Users, title: 'ข้อมูลพนักงาน', value: '94.1%', delta: '+3.2%', color: 'blue' },
  { icon: Network, title: 'โครงสร้างองค์กร', value: '92.3%', delta: '+2.1%', color: 'green' },
  { icon: Mail, title: 'ข้อมูลติดต่อ', value: '91.0%', delta: '+1.8%', color: 'violet' },
  { icon: BriefcaseBusiness, title: 'ข้อมูลตำแหน่ง', value: '93.8%', delta: '+2.9%', color: 'orange' },
]

const quickActions = [
  { icon: ShieldPlus, title: 'สร้าง Data Issue', sub: 'รายงานปัญหาข้อมูลใหม่' },
  { icon: Upload, title: 'อัปโหลดข้อมูล', sub: 'นำเข้าข้อมูลเพื่อตรวจสอบคุณภาพ' },
  { icon: Download, title: 'รายงานคุณภาพ', sub: 'ดาวน์โหลดรายงาน' },
  { icon: BookOpen, title: 'คู่มือการใช้งาน', sub: 'เรียนรู้วิธีการใช้งานระบบ' },
]

const learningHubItems = [
  { id: 'ep01', title: 'EP01: วิธีคีย์ข้อมูลพนักงาน' },
  { id: 'ep02', title: 'EP02: วิธีแก้ข้อมูลตำแหน่ง' },
  { id: 'ep03', title: 'EP03: วิธีตรวจสอบข้อมูลผิด' },
  { id: 'ep04', title: 'EP04: วิธีส่งหลักฐานการแก้ไข' },
  { id: 'faq', title: 'FAQ / Download Master Data' },
]

const thaiMonths = [
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.',
]

function formatThaiDate(value) {
  if (!value) return '-'
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return '-'
  return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`
}

function parseDate(value) {
  return new Date(`${value}T00:00:00`)
}

function formatInputDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isDateBetween(date, start, end) {
  const time = date.getTime()
  return time > start.getTime() && time < end.getTime()
}

function getCalendarDays(monthDate) {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  const startOffset = firstDay.getDay()
  const startDate = new Date(firstDay)
  startDate.setDate(firstDay.getDate() - startOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + index)
    return date
  })
}

function MetricCard({ item, large = false, onActivate }) {
  const Icon = item.icon
  const negative = item.delta.startsWith('-')

  return (
    <article
      className={`metric-card ${large ? 'metric-card-large' : ''}`}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onActivate?.()
        }
      }}
      role={onActivate ? 'button' : undefined}
      tabIndex={onActivate ? 0 : undefined}
    >
      <div className={`metric-icon ${item.tone}`}>
        <Icon size={large ? 39 : 32} />
      </div>
      <div className="metric-content">
        <h3>{item.title}</h3>
        <strong>{item.value}</strong>
        <span>{item.detail}</span>
        {item.progress && (
          <div className="quality-progress">
            <span style={{ width: `${item.progress}%` }} />
          </div>
        )}
      </div>
      <div className={`metric-delta ${negative ? 'negative' : ''}`}>
        <span>{negative ? '↘' : '↗'} {item.delta}</span>
        <small>จากช่วงก่อนหน้า</small>
      </div>
    </article>
  )
}

function ScoreTrend({ onAction }) {
  const points = [
    [22, 140],
    [132, 135],
    [245, 130],
    [358, 112],
    [472, 94],
    [585, 70],
    [698, 59],
    [810, 52],
    [900, 48],
  ]

  return (
    <section className="panel chart-panel">
      <div className="panel-title">
        <div>
          <h2>แนวโน้มคะแนนคุณภาพข้อมูล</h2>
          <p>ผลการดำเนินงาน 90 วันที่ผ่านมาเทียบกับเป้าหมาย</p>
        </div>
        <div className="panel-actions">
          <button type="button" onClick={() => onAction?.('เปลี่ยนช่วงกราฟเป็น 90 วัน')}>
            90 วัน <ChevronDown size={16} />
          </button>
          <button type="button" onClick={() => onAction?.('เปิดรายละเอียดกราฟคุณภาพข้อมูล')}>
            ดูรายละเอียด
          </button>
        </div>
      </div>
      <div className="chart-wrap">
        <div className="axis-labels">
          <span>100</span>
          <span>95</span>
          <span>90</span>
          <span>85</span>
          <span>80</span>
        </div>
        <svg viewBox="0 0 930 220" role="img" aria-label="Data quality score trend">
          <defs>
            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <g className="grid-lines">
            {[28, 72, 116, 160, 204].map((y) => (
              <line key={y} x1="0" x2="930" y1={y} y2={y} />
            ))}
            {[42, 160, 278, 396, 514, 632, 750, 868].map((x) => (
              <line key={x} x1={x} x2={x} y1="20" y2="204" />
            ))}
          </g>
          <line className="target-line" x1="0" x2="930" y1="116" y2="116" />
          <path
            className="trend-fill"
            d={`M ${points.map(([x, y]) => `${x} ${y}`).join(' L ')} L 900 204 L 22 204 Z`}
          />
          <polyline
            className="trend-line"
            points={points.map(([x, y]) => `${x},${y}`).join(' ')}
          />
          {points.map(([x, y]) => (
            <circle key={`${x}-${y}`} className="trend-dot" cx={x} cy={y} r="7" />
          ))}
        </svg>
        <div className="date-labels">
          <span>26 ก.พ.</span>
          <span>11 มี.ค.</span>
          <span>25 มี.ค.</span>
          <span>8 เม.ย.</span>
          <span>22 เม.ย.</span>
          <span>6 พ.ค.</span>
          <span>20 พ.ค.</span>
        </div>
      </div>
      <div className="chart-legend">
        <span><i />คะแนนคุณภาพข้อมูล</span>
        <span><i className="target" />เป้าหมาย</span>
      </div>
    </section>
  )
}

function DateRangePicker({
  datePickerOpen,
  dateRange,
  setDatePickerOpen,
  setDateRange,
  notify,
}) {
  const [activeField, setActiveField] = useState('start')
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const start = parseDate(dateRange.start)
    return new Date(start.getFullYear(), start.getMonth(), 1)
  })

  const startDate = parseDate(dateRange.start)
  const endDate = parseDate(dateRange.end)
  const calendarDays = getCalendarDays(calendarMonth)

  const chooseDate = (date) => {
    const value = formatInputDate(date)

    if (activeField === 'start') {
      if (date > endDate) {
        setDateRange({ start: value, end: value })
      } else {
        setDateRange((current) => ({ ...current, start: value }))
      }
      setActiveField('end')
      return
    }

    if (date < startDate) {
      setDateRange({ start: value, end: dateRange.start })
    } else {
      setDateRange((current) => ({ ...current, end: value }))
    }
    setActiveField('start')
  }

  return (
    <div className={`date-popover ${datePickerOpen ? 'show' : ''}`}>
      <div className="range-fields" role="tablist" aria-label="เลือกวันที่">
        <button
          className={activeField === 'start' ? 'active' : ''}
          type="button"
          onClick={() => setActiveField('start')}
        >
          <span>วันที่เริ่มต้น</span>
          <strong>{formatThaiDate(dateRange.start)}</strong>
        </button>
        <button
          className={activeField === 'end' ? 'active' : ''}
          type="button"
          onClick={() => setActiveField('end')}
        >
          <span>วันที่สิ้นสุด</span>
          <strong>{formatThaiDate(dateRange.end)}</strong>
        </button>
      </div>

      <div className="calendar-card">
        <div className="calendar-head">
          <strong>
            {thaiMonths[calendarMonth.getMonth()]} {calendarMonth.getFullYear() + 543}
          </strong>
          <div>
            <button
              type="button"
              aria-label="เดือนก่อนหน้า"
              onClick={() => setCalendarMonth((current) => addMonths(current, -1))}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="เดือนถัดไป"
              onClick={() => setCalendarMonth((current) => addMonths(current, 1))}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="weekday-row" aria-hidden="true">
          {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((date) => {
            const isMuted = date.getMonth() !== calendarMonth.getMonth()
            const selectedStart = isSameDate(date, startDate)
            const selectedEnd = isSameDate(date, endDate)
            const inRange = isDateBetween(date, startDate, endDate)
            return (
              <button
                className={[
                  isMuted ? 'muted' : '',
                  inRange ? 'in-range' : '',
                  selectedStart ? 'selected start' : '',
                  selectedEnd ? 'selected end' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={date.toISOString()}
                type="button"
                onClick={() => chooseDate(date)}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      <div className="date-popover-actions">
        <button
          type="button"
          onClick={() => {
            setDateRange({
              start: '2024-04-25',
              end: '2024-05-24',
            })
            setCalendarMonth(new Date(2024, 3, 1))
            setActiveField('start')
          }}
        >
          รีเซ็ต
        </button>
        <button
          type="button"
          onClick={() => {
            setDatePickerOpen(false)
            notify(`ใช้ช่วงเวลา ${formatThaiDate(dateRange.start)} - ${formatThaiDate(dateRange.end)}`)
          }}
        >
          ใช้ช่วงเวลา
        </button>
      </div>
    </div>
  )
}

function DashboardPage({ initialNav = 'Dashboard', onLogout }) {
  const [activeNav, setActiveNav] = useState(initialNav)
  const [notice, setNotice] = useState('')
  const [theme, setTheme] = useState('light')
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [learningHubOpen, setLearningHubOpen] = useState(false)
  const [activeLesson, setActiveLesson] = useState('ep01')
  const [dateRange, setDateRange] = useState({
    start: '2024-04-25',
    end: '2024-05-24',
  })

  const dateRangeLabel = `ช่วงเวลา: ${formatThaiDate(dateRange.start)} - ${formatThaiDate(dateRange.end)}`

  const notify = (message) => {
    setNotice(message)
    window.clearTimeout(window.hrDcareNoticeTimer)
    window.hrDcareNoticeTimer = window.setTimeout(() => setNotice(''), 1800)
  }

  const logout = () => {
    setProfileOpen(false)
    onLogout()
  }

  const isDark = theme === 'dark'

  return (
    <main className={`dashboard ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <aside className="sidebar">
        <Logo />
        <nav className="app-nav">
          <button
            className={activeNav === 'Dashboard' ? 'active' : ''}
            type="button"
            onClick={() => {
              setActiveNav('Dashboard')
              notify('เปิดเมนู Dashboard')
            }}
          >
            <Home size={24} />
            <span>
              <strong>Dashboard</strong>
              <small>Data Quality Overview</small>
            </span>
          </button>

          <div className={`nav-group ${activeNav === 'Datasets' ? 'open' : ''}`}>
            <button
              className={activeNav === 'Datasets' ? 'active-parent' : ''}
              type="button"
              onClick={() => {
                setActiveNav('Datasets')
                notify('เปิดเมนู Datasets')
              }}
            >
              <CircleAlert size={24} />
              <span>
                <strong>Data Issues</strong>
                <small>จัดการปัญหาข้อมูล</small>
              </span>
              <ChevronDown size={17} />
            </button>
            <button
              className={`nav-subitem ${activeNav === 'Datasets' ? 'active' : ''}`}
              type="button"
              onClick={() => {
                setActiveNav('Datasets')
                notify('เปิดหน้า Datasets')
              }}
            >
              <span />
              Datasets
            </button>
          </div>

          <button
            type="button"
            onClick={() => notify('เปิดเมนู Monthly Monitoring')}
          >
            <BarChart3 size={24} />
            <span>
              <strong>Monthly Monitoring</strong>
              <small>ติดตามรายเดือน</small>
            </span>
          </button>
          <button
            type="button"
            onClick={() => notify('เปิดเมนู Cleansing Roadmap & Status')}
          >
            <Map size={24} />
            <span>
              <strong>Cleansing Roadmap & Status</strong>
            </span>
          </button>
          <div className={`nav-group learning-nav ${learningHubOpen ? 'open' : ''}`}>
            <button
              type="button"
              onClick={() => {
                setLearningHubOpen((current) => !current)
                notify('เปิดเมนู Learning Hub')
              }}
            >
              <BookOpen size={24} />
              <span>
                <strong>Learning Hub / คู่มือการใช้งาน</strong>
                <small>การใช้งานข้อมูล</small>
              </span>
              <ChevronDown size={18} />
            </button>
            {learningHubOpen && (
              <div className="sidebar-learning-submenu">
                {learningHubItems.map((item) => (
                  <button
                    className={activeNav === 'LearningHub' && activeLesson === item.id ? 'active' : ''}
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveNav('LearningHub')
                      setActiveLesson(item.id)
                      notify(item.title)
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => notify('เปิด Audit Log')}
          >
            <FileText size={24} />
            <span>
              <strong>Audit Log</strong>
            </span>
          </button>
          <button
            type="button"
            onClick={() => notify('เปิด Settings')}
          >
            <Settings size={24} />
            <span>
              <strong>Settings</strong>
            </span>
          </button>
        </nav>
        <footer>
          <strong>Version 2.1.0</strong>
          <span>© 2026 HR D-CARE</span>
          <span>(Provincial Electricity Authority)</span>
        </footer>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <strong>Data Quality Monitoring System</strong>
          <div className="top-actions">
            <button
              className={`top-icon ${isDark ? 'active' : ''}`}
              type="button"
              aria-label={isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
              onClick={() => {
                setTheme((current) => (current === 'light' ? 'dark' : 'light'))
                notify(isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด')
              }}
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <button
              className="top-icon has-badge"
              type="button"
              aria-label="การแจ้งเตือน"
              onClick={() => notify('มีการแจ้งเตือนใหม่ 4 รายการ')}
            >
              <Bell size={23} />
              <span>4</span>
            </button>
            <div className="top-profile">
              <button
                className="profile-button"
                type="button"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((current) => !current)}
              >
                <span><User size={25} /></span>
                <strong>
                  Pimnatt Limsuwan
                  <small>System Administrator</small>
                </strong>
                <ChevronDown size={18} />
              </button>
              <div className={`top-profile-popover ${profileOpen ? 'show' : ''}`}>
                <div>
                  <strong>Pimmat Limsuwan</strong>
                  <span>pimmat.lim@pea.co.th</span>
                </div>
                <div
                  className="top-profile-logout"
                  role="button"
                  tabIndex={0}
                  onClick={logout}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      logout()
                    }
                  }}
                >
                  <LogOut size={19} />
                  ออกจากระบบ
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {activeNav === 'Datasets' ? (
            <DatasetsPage notify={notify} />
          ) : activeNav === 'LearningHub' ? (
            <LearningHubPage lesson={activeLesson} onSelectLesson={setActiveLesson} />
          ) : (
            <>
          <div className="page-heading">
            <div>
              <h1>Dashboard</h1>
              <p><span />ภาพรวมคุณภาพข้อมูล</p>
            </div>
            <div className="date-picker">
              <button
                className={`date-filter ${datePickerOpen ? 'open' : ''}`}
                type="button"
                aria-expanded={datePickerOpen}
                onClick={() => setDatePickerOpen((current) => !current)}
              >
                <CalendarDays size={22} />
                {dateRangeLabel}
                <ChevronDown size={17} />
              </button>
              <DateRangePicker
                datePickerOpen={datePickerOpen}
                dateRange={dateRange}
                setDatePickerOpen={setDatePickerOpen}
                setDateRange={setDateRange}
                notify={notify}
              />
            </div>
          </div>

          <section className="primary-grid" aria-label="Primary data quality summary">
            {primaryStats.map((item) => (
              <MetricCard
                item={item}
                key={item.title}
                large
                onActivate={() => notify(`ดูรายละเอียด: ${item.title}`)}
              />
            ))}
          </section>

          <section className="secondary-grid" aria-label="Secondary data quality summary">
            {secondaryStats.map((item) => (
              <MetricCard
                item={item}
                key={item.title}
                onActivate={() => notify(`ดูรายละเอียด: ${item.title}`)}
              />
            ))}
          </section>

          <section className="main-grid">
            <div className="left-stack">
              <ScoreTrend onAction={notify} />
              <section className="panel quick-panel">
                <h2>การดำเนินการด่วน</h2>
                <div className="quick-grid">
                  {quickActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <button
                        type="button"
                        key={action.title}
                        onClick={() => notify(action.title)}
                      >
                        <span><Icon size={25} /></span>
                        <strong>
                          {action.title}
                          <small>{action.sub}</small>
                        </strong>
                        <ChevronRight size={17} />
                      </button>
                    )
                  })}
                </div>
              </section>
            </div>

            <div className="right-stack">
              <section className="panel issue-panel">
                <div className="compact-title">
                  <h2>ปัญหาข้อมูลล่าสุด</h2>
                  <button type="button" onClick={() => notify('เปิดรายการปัญหาทั้งหมด')}>
                    ดูทั้งหมด
                  </button>
                </div>
                <div className="issue-list">
                  {issues.map((issue) => (
                    <button
                      type="button"
                      key={`${issue.title}-${issue.time}`}
                      onClick={() => notify(`เปิดปัญหา: ${issue.title}`)}
                    >
                      <span className={`severity-dot ${issue.color}`} />
                      <strong className={issue.color}>{issue.level}</strong>
                      <div>
                        <h3>{issue.title}</h3>
                        <p>{issue.source}</p>
                      </div>
                      <time>{issue.time}</time>
                    </button>
                  ))}
                </div>
              </section>

              <section className="panel category-panel">
                <div className="compact-title">
                  <h2>คุณภาพข้อมูลรายหมวดหมู่</h2>
                  <button type="button" onClick={() => notify('เปิดคุณภาพข้อมูลทุกหมวดหมู่')}>
                    ดูทั้งหมด
                  </button>
                </div>
                <div className="category-grid">
                  {categoryScores.map((score) => {
                    const Icon = score.icon
                    return (
                      <button
                        type="button"
                        key={score.title}
                        onClick={() => notify(`เปิดหมวด ${score.title}`)}
                      >
                        <div className={`category-icon ${score.color}`}>
                          <Icon size={24} />
                        </div>
                        <h3>{score.title}</h3>
                        <strong>{score.value}</strong>
                        <span>{score.delta}</span>
                        <div className="quality-progress">
                          <span style={{ width: score.value }} />
                        </div>
                      </button>
                    )
                  })}
                </div>
              </section>
            </div>
          </section>
            </>
          )}
        </div>
        <div className={`toast ${notice ? 'show' : ''}`} role="status" aria-live="polite">
          <Check size={18} />
          {notice}
        </div>
      </section>
    </main>
  )
}

export default DashboardPage
