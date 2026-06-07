import { useParams } from 'react-router-dom';
import styles from './Vocabulary.module.css';

// Simple placeholder component for a vocabulary section page.
// It reads the "section" param from the URL and displays a title.
export default function VocabularySection() {
  const { section } = useParams<{ section: string }>();

  return (
    <main className={styles.vocabulary}>
      <h1 className={styles.title}>Vocabulary Section</h1>
      <p>Currently viewing section: {section ?? 'unknown'}</p>
    </main>
  );
}
