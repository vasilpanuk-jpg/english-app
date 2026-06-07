import styles from './Speaking.module.css'
import LevelsGrid from '../UI/LevelsGrid'

export default function Speaking() {
  return (
    <main className={styles.speaking}>
      <h1 className={styles.title}>Speaking</h1>
      <p style={{ marginBottom: '1rem', color: '#5d6073' }}>
        Regular speaking practice builds fluency, spontaneity, and the confidence to use English in real situations. Practice prompts, role-plays, and timed responses will help.
      </p>
      <ul style={{ color: '#5d6073' }}>
        <li>Speaking prompts and role-plays</li>
        <li>Timed speaking tasks and feedback</li>
        <li>Pronunciation & fluency tips</li>
      </ul>
      <LevelsGrid moduleId="speaking" moduleTitle="Speaking" />
    </main>
  )
}
