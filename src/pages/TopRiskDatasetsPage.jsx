import {
  Award,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Filter,
  GraduationCap,
  HeartHandshake,
  IdCard,
  Info,
  Search,
  ShieldCheck,
  Star,
  UserRound,
  Users,
  WalletCards,
} from 'lucide-react'

const riskRows = [
  { icon: UserRound, name: 'Employee Salary', score: 78.5, issues: 42 },
  { icon: Clock3, name: 'Time Tracking', score: 82.3, issues: 28 },
  { icon: Star, name: 'Performance Review', score: 84.7, issues: 19 },
  { icon: ShieldCheck, name: 'Benefits Enrollment', score: 87.2, issues: 15 },
  { icon: GraduationCap, name: 'Training Records', score: 89.1, issues: 12 },
  { icon: CalendarDays, name: 'Leave Management', score: 90.5, issues: 10 },
  { icon: Users, name: 'Recruitment Data', score: 91.2, issues: 8 },
  { icon: IdCard, name: 'Employee Master', score: 92.8, issues: 7 },
  { icon: WalletCards, name: 'Payroll Data', score: 93.5, issues: 5 },
  { icon: Award, name: 'Training Certifications', score: 94.1, issues: 4 },
]

function getRiskTone(score) {
  if (score < 82) return 'critical'
  if (score < 90) return 'warning'
  return 'good'
}

function TopRiskDatasetsPage() {
  return (
    <div className="top-risk-page">
      <section className="top-risk-card panel">
        <div className="top-risk-head">
          <div>
            <h1>Dataset ที่มีปัญหาสูงสุด 10 ชุดข้อมูล</h1>
            <p>ชุดข้อมูลที่ต้องให้ความสนใจ</p>
          </div>
          <div className="top-risk-tools">
            <label>
              <Search size={18} />
              <input type="search" placeholder="ค้นหาชุดข้อมูล..." />
            </label>
            <button type="button">
              <Filter size={18} />
              ตัวกรอง
              <ChevronDown size={16} />
            </button>
            <button type="button">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        <div className="top-risk-table">
          <div className="top-risk-table-head">
            <span>DATASET NAME</span>
            <span>
              QUALITY SCORE
              <Info size={15} />
            </span>
            <span>ISSUES</span>
            <span />
          </div>

          {riskRows.map((row) => {
            const Icon = row.icon
            const tone = getRiskTone(row.score)

            return (
              <button className="top-risk-row" key={row.name} type="button">
                <span className="top-risk-icon">
                  <Icon size={22} />
                </span>
                <strong>{row.name}</strong>
                <div className="top-risk-score">
                  <span>
                    <i className={tone} style={{ width: `${row.score}%` }} />
                  </span>
                  <b>{row.score}%</b>
                </div>
                <em className={tone}>{row.issues}</em>
                <ChevronRight size={21} />
              </button>
            )
          })}
        </div>

        <div className="top-risk-pagination">
          <span>แสดง 1 - 10 จาก 10 ชุดข้อมูล</span>
          <div>
            <button type="button">
              <ChevronLeft size={18} />
            </button>
            <button className="active" type="button">1</button>
            <button type="button">
              <ChevronRight size={18} />
            </button>
            <button type="button">
              10 / หน้า
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TopRiskDatasetsPage
