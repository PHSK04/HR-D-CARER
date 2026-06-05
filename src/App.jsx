import { useState } from 'react'
import LoginPage from './pages/LoginPage.jsx'
import MainMenuPage from './pages/MainMenuPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

function App() {
  const [screen, setScreen] = useState('login')
  const [initialNav, setInitialNav] = useState('Dashboard')

  if (screen === 'login') {
    return <LoginPage onLogin={() => setScreen('menu')} />
  }

  if (screen === 'menu') {
    return (
      <MainMenuPage
        onEnter={(nav) => {
          setInitialNav(nav)
          setScreen('dashboard')
        }}
        onLogout={() => setScreen('login')}
      />
    )
  }

  return <DashboardPage initialNav={initialNav} onLogout={() => setScreen('login')} />
}

export default App
