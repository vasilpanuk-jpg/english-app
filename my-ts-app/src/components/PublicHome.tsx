import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'

export default function PublicHome() {
  const navigate = useNavigate()

  return (
    <main className={styles.home}>
      <div className={styles.navBar}>
        <div>
            <p className={styles.kicker}>English Studio</p>
        </div>
        <div className={styles.authButtons}>
          <button onClick={() => navigate('/login')} className={styles.signIn}>
            Sign in
          </button>

          <button onClick={() => navigate('/register')} className={styles.signUp}>
            Sign up
          </button>
        </div>
      </div>

        <div className={styles.main_text_container}>
            <div className={styles.main_text_content}>
                <h1 className={styles.title}>Learn English in one focused place</h1>
                <div>
                    <p className={styles.description}>
                        This is one of the best platforms for learning English because it combines speaking, reading, vocabulary,
                        writing, listening, and pronunciation in a single workflow.
                        It helps you develop your English in a complete and practical way.
                        You can practice whatever you need here efficiently, because the project was originally built for the developer's own English learning journey.
                    </p>
                </div>
                
            </div>
        </div>
      
    </main>
  )
}