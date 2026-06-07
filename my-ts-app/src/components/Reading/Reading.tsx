import styles from './Reading.module.css'
import LevelsGrid from '../UI/LevelsGrid'

export default function Reading() {
  return (
    <main className={styles.reading}>
      <h1 className={styles.title}>Reading</h1>
      <p style={{ marginBottom: '1rem', color: '#5d6073' }}>
        Reading expands vocabulary and exposes you to diverse topics and writing styles — great for comprehension and ideas. Try graded texts, articles, and guided reading tasks.
      </p>
      <ul style={{ color: '#5d6073' }}>
        <li>Graded readers and articles</li>
        <li>Comprehension questions and summaries</li>
        <li>Vocabulary-in-context activities</li>
      </ul>
      <LevelsGrid moduleId="reading" moduleTitle="Reading" />
    </main>
  )
}
