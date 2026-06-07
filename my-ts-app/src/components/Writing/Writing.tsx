import styles from './Writing.module.css'
import LevelsGrid from '../UI/LevelsGrid'

export default function Writing() {
  return (
    <main className={styles.writing}>
      <h1 className={styles.title}>Writing</h1>
      <p style={{ marginBottom: '1rem', color: '#5d6073' }}>
        Writing practice strengthens clarity, organization, and the ability to communicate ideas effectively in writing. Work on structure, coherence, and useful expressions.
      </p>
      <ul style={{ color: '#5d6073' }}>
        <li>Task-based writing practice</li>
        <li>Model answers and feedback tips</li>
        <li>Editing and clarity exercises</li>
      </ul>
      <LevelsGrid moduleId="writing" moduleTitle="Writing" />
    </main>
  )
}
