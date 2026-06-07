import { useState } from 'react'
import styles from './Auth.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { verify as verifyRequest, resendVerification } from './authApi'
import { useAuth } from './AuthContext'

export default function Verify() {

  const location = useLocation()
  const navigate = useNavigate()

  const email = (location.state as { email?: string })?.email ?? ''
  const { login } = useAuth()

  const [tokenOrCode, setTokenOrCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendEmail, setResendEmail] = useState(email)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const [resendError, setResendError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!tokenOrCode) {
      setError('Введіть код або токен верифікації')
      return
    }

    setLoading(true)
    try {
      const response = await verifyRequest(tokenOrCode)

      if (response.accessToken) {
        login(response.accessToken)
      }

      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Помилка при верифікації')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setResendError('')
    setResendMessage('')

    const target = (email || resendEmail || '').trim()
    if (!target) {
      setResendError('Введіть email для надсилання')
      return
    }

    setResendLoading(true)
    try {
      await resendVerification(target)
      setResendMessage('Лист з підтвердженням надіслано')
    } catch (err) {
      setResendError(err instanceof Error ? err.message : 'Помилка при відправці листа')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h2 className={styles.authTitle}>Підтвердження пошти</h2>

        <p className={styles.helper}>
          Ми надіслали код підтвердження на вашу пошту {email ? <strong>({email})</strong> : ''}.
          Введіть код або токен нижче, щоб підтвердити обліковий запис.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Код або токен</label>
            <input
              className={styles.input}
              value={tokenOrCode}
              onChange={(e) => setTokenOrCode(e.target.value)}
              placeholder="Enter code from email or token"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <button className={styles.submit} type="submit" disabled={loading}>
              {loading ? 'Перевіряю...' : 'Підтвердити'}
            </button>
          </div>
        </form>

        <div style={{marginTop: 12}}>
          <p className={styles.helper}>Не отримали лист з кодом? Надішліть ще раз.</p>

          <div className={styles.formGroup}>
            {email ? (
              <div className={styles.codeBox}>{email}</div>
            ) : (
              <input
                className={styles.input}
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                placeholder="Email для надсилання"
              />
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.submit}
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
            >
              {resendLoading ? 'Надсилаю...' : 'Надіслати лист ще раз'}
            </button>
          </div>

          {resendMessage && <div className={styles.helper}>{resendMessage}</div>}
          {resendError && <div className={styles.error}>{resendError}</div>}

          <div className={styles.linkRow}>
            Повернутись: <a onClick={() => navigate('/login')}>Увійти</a>
          </div>
        </div>
      </div>
    </div>
  )
}
