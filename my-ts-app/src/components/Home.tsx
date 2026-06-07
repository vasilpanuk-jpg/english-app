import styles from './Home.module.css'
import ModuleCard from './UI/ModuleCard'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext'

type NavItem = {
  id: string
  title: string
  subtitle: string
  icon: string
}

const navItems: NavItem[] = [
  { id: 'grammar', title: 'Grammar', subtitle: 'Rules and structure', icon: '📚' },
  { id: 'listening', title: 'Listening', subtitle: 'Audio and understanding', icon: '🎧' },
  { id: 'pronunciation', title: 'Pronunciation', subtitle: 'Sounds and clarity', icon: '🔊' },
  { id: 'reading', title: 'Reading', subtitle: 'Texts and topics', icon: '📖' },
  { id: 'speaking', title: 'Speaking', subtitle: 'Questions and practice', icon: '🗣️' },
  { id: 'vocabulary', title: 'Vocabulary', subtitle: 'Words and repetition', icon: '🧠' },
  { id: 'writing', title: 'Writing', subtitle: 'Tasks and feedback', icon: '✍️' },
]

export default function Home() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/home')
  }

  let username = 'Guest'
  if (token) {
    try {
      const payload: any = jwtDecode(token)
      username = payload.username || payload.name || payload.email || 'Guest'
    } catch {
      // keep fallback username
    }
  }

  return (
    <main className={styles.home}>
      <div className={styles.navBar}>
        <p className={styles.kicker}>English Studio</p>
        <button
            onClick={handleLogout}
            className={styles.logoutButton}
        >
          Logout
        </button>
      </div>
      <header className={styles.hero}>

        <h1 className={styles.title}>Welcome, {username}</h1>

        <p className={styles.description}>
          This is a powerful English learning platform designed to help you grow your language skills in a complete way.
          It combines speaking, reading, vocabulary, writing, listening, and pronunciation practice in one place.
          You can work here on whatever you need, and the experience is built to be efficient and practical.
          The platform was originally created for the developer's own English learning journey, so every module is focused on real progress.
        </p>
      </header>

      <section className={styles.modulesSection}>
        <h2 className={styles.sectionTitle}>Modules</h2>
        <div className={styles.grid}>
          {navItems.map((item) => (
            <ModuleCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
