import { useState } from 'react'
import {
  BarChart3,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  FileBarChart2,
  FolderKanban,
  Lock,
  ShieldCheck,
  User,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'

function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="login-page">
      <section className="brand-panel" aria-label="HR D-CARE introduction">
        <div className="brand-glow brand-glow-left" />
        <div className="brand-glow brand-glow-right" />
        <div className="dot-grid dot-grid-top" />
        <div className="dot-grid dot-grid-bottom" />
        <div className="brand-content">
          <Logo />
          <h1>
            ยกระดับคุณภาพข้อมูล
            <br />
            สู่การ<span>ตัดสินใจ</span>ที่ดีกว่า
          </h1>
          <p>
            ติดตาม ตรวจสอบ และปรับปรุงคุณภาพข้อมูลบุคลากร
            <br />
            เพื่อความถูกต้อง ครบถ้วน และน่าเชื่อถือ
          </p>
          <div className="analytics-art" aria-hidden="true">
            <div className="art-sidebar">
              <User size={30} />
              <FileBarChart2 size={30} />
              <BarChart3 size={30} />
              <FolderKanban size={30} />
            </div>
            <div className="art-report">
              <span className="art-check">
                <Check size={28} />
              </span>
              <div className="donut" />
              <div className="art-lines">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="art-chart">
              <span />
              <span />
              <span />
              <span />
              <span />
              <i />
            </div>
            <div className="art-shield">
              <Check size={58} />
            </div>
          </div>
        </div>
        <div className="security-note">
          <ShieldCheck size={19} />
          ปลอดภัย มั่นใจได้ ด้วยมาตรฐานการจัดการข้อมูลระดับสากล
        </div>
      </section>

      <section className="login-panel-wrap">
        <form
          className="login-card"
          onSubmit={(event) => {
            event.preventDefault()
            onLogin()
          }}
        >
          <div className="login-heading">
            <h2>เข้าสู่ระบบ</h2>
            <p>Data Quality Monitoring System</p>
          </div>
          <label className="field">
            <span>ชื่อผู้ใช้งาน (Username)</span>
            <div>
              <User size={24} />
              <input type="text" placeholder="กรอกชื่อผู้ใช้งาน" />
            </div>
          </label>
          <label className="field">
            <span>รหัสผ่าน (Password)</span>
            <div>
              <Lock size={23} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="กรอกรหัสผ่าน"
              />
              <button
                className="icon-button"
                type="button"
                aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? <EyeOff size={23} /> : <Eye size={23} />}
              </button>
            </div>
          </label>
          <div className="login-options">
            <label className="remember">
              <input type="checkbox" defaultChecked />
              <span>จดจำการเข้าสู่ระบบ</span>
            </label>
            <button type="button">ลืมรหัสผ่าน?</button>
          </div>
          <button className="login-submit" type="submit">
            เข้าสู่ระบบ
          </button>
          <div className="divider">
            <span>หรือ</span>
          </div>
          <button className="sso-button" type="button" onClick={onLogin}>
            <ShieldCheck size={25} />
            เข้าสู่ระบบด้วย SSO
          </button>
        </form>
        <footer className="login-footer">
          <span>© 2026 HR D-CARE (Provincial Electricity Authority)</span>
          <span>Version 2.1.0</span>
        </footer>
      </section>
    </main>
  )
}


export default LoginPage
