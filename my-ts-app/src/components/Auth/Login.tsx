import { useState } from 'react'
import styles from './Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginRequest } from './authApi'
import { useAuth } from './AuthContext'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Будь ласка, заповніть всі поля')
      return
    }

    setLoading(true)

    try {
      const response = await loginRequest({ email, password })
      if (response.accessToken) {
        login(response.accessToken)
      }
      
      navigate('/')
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Щось пішло не так')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h2 className={styles.authTitle}>Вхід до системи</h2>
        <form onSubmit={handleSubmit}>
          {/* Поле email */}
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

          {/* Поле пароля */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {/* Вивід помилок */}
          {error && <div className={styles.error}>{error}</div>}

          {/* Кнопка відправлення */}
          <div className={styles.actions}>
            <button className={styles.submit} type="submit" disabled={loading}>
              {loading ? 'Завантажу...' : 'Увійти'}
            </button>
          </div>
        </form>

        {/* Посилання на реєстрацію */}
        <div className={styles.linkRow}>
          Немаєте облікового запису? <Link to="/register">Зареєструватися</Link>
        </div>
      </div>
    </div>
  )
}
