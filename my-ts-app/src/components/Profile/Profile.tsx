import styles from './Profile.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../Auth/AuthContext'

type TokenPayload = {
  username?: string
  email?: string
  name?: string
  [key: string]: any
}

export default function Profile() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()
  const [payload, setPayload] = useState<TokenPayload | null>(null)
  const [editing, setEditing] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    try {
      const p: any = jwtDecode(token)
      setPayload(p)
      setUsername(p.username || p.name || '')
      setEmail(p.email || '')
    } catch (e) {
      setPayload(null)
    }
  }, [navigate, token])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    // Placeholder: integrate backend update here. For now update local state only.
    setPayload((prev) => ({ ...(prev || {}), username, email }))
    setEditing(false)
  }

  if (!payload) return null

  const initials = (payload.username || payload.name || payload.email || 'U').slice(0, 2).toUpperCase()

  return (
    <main className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.meta}>
          <div className={styles.username}>{payload.username || payload.name || 'User'}</div>
          <div className={styles.email}>{payload.email || '—'}</div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setEditing((s) => !s)}>
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>

        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {editing && (
        <form className={styles.form} onSubmit={handleSave}>
          <input className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} type='submit'>Save</button>
            <button className={`${styles.btn} ${styles.btnGhost}`} type='button' onClick={() => setEditing(false)}>Cancel</button>
          </div>
          <div className={styles.note}>Note: Saving is local-only; hook to backend API to persist.</div>
        </form>
      )}
    </main>
  )
}
