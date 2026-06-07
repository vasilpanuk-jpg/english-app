import styles from './Pronunciation.module.css'
import LevelsGrid from '../UI/LevelsGrid'

export default function Pronunciation() {
  return (
    <main className={styles.pronunciation}>
      <h1 className={styles.title}>Pronunciation</h1>
      <p style={{ marginBottom: '1rem', color: '#5d6073' }}>
        Clear pronunciation makes your speech understandable and boosts confidence in everyday conversations. Focus on sounds, word stress, and intonation.
      </p>
      <ul style={{ color: '#5d6073' }}>
        <li>Sound drills and minimal pairs</li>
        <li>Pronunciation videos and waveform feedback</li>
        <li>Intonation and rhythm practice</li>
      </ul>
      <LevelsGrid moduleId="pronunciation" moduleTitle="Pronunciation" />
    </main>
  )
}
