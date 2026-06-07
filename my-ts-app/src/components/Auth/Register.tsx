import { useState } from 'react'
import styles from './Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerRequest } from './authApi'

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email || !username || !password) {
      setError('Будь ласка, заповніть всі поля')
      return
    }

    if (password.length <= 6) {
      setError('Пароль повинен мати щонайменше 6 символів')
      return
    }

    setLoading(true)

    try {
      await registerRequest({ email, username, password })

      navigate('/verify', { state: { email } })

    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Щось пішло не так')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h2 className={styles.authTitle}>Створити облік</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ім'я користувача</label>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your_username"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <button className={styles.submit} type="submit" disabled={loading}>
              {loading ? 'Завантажу...' : 'Зареєструватися'}
            </button>
          </div>
        </form>


        <div className={styles.linkRow}>
          Вже маєте обліковий запис? <Link to="/login">Увійти</Link>
        </div>
      </div>
    </div>
  )
}
