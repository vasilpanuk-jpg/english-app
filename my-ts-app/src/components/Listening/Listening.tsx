import styles from './Listening.module.css'
import LevelsGrid from '../UI/LevelsGrid'

export default function Listening() {
  return (
    <main className={styles.listening}>
      <h1 className={styles.title}>Listening</h1>
      <p style={{ marginBottom: '1rem', color: '#5d6073' }}>
        Improving listening helps you understand native speakers, follow conversations, and learn natural rhythms. Practice with dialogs, slow and native-speed audio, and comprehension tasks.
      </p>
      <ul style={{ color: '#5d6073' }}>
        <li>Dialog practice and transcripts</li>
        <li>Listening quizzes and gap-fill exercises</li>
        <li>Tips for active listening</li>
      </ul>
      <LevelsGrid moduleId="listening" moduleTitle="Listening" />
    </main>
  )
}
