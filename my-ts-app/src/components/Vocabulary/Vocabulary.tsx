import styles from './Vocabulary.module.css'
import ModuleCard from '../UI/ModuleCard'
import gridStyles from '../UI/LevelsGrid.module.css'

const sections = [
  { id: '300', title: 'Top 300', subtitle: 'Most frequent 300 words to build a foundation', icon: '🔤' },
  { id: '1000', title: 'Top 1000', subtitle: 'Common words for everyday conversation', icon: '🗣️' },
  { id: '3000', title: 'Top 3000', subtitle: 'Extended vocabulary for fluency and comprehension', icon: '📚' },
  { id: 'custom', title: 'My Dictionary', subtitle: 'Your personal word list and notes', icon: '🧾' },
]

export default function Vocabulary() {
  return (
    <main className={styles.vocabulary}>
      <h1 className={styles.title}>Vocabulary</h1>
      <p style={{ marginBottom: '3rem', color: '#5d6073' }}>
        A broader vocabulary helps you express ideas precisely and makes learning other skills easier and faster. Choose a word list to focus on core frequency bands or open your personal dictionary.
      </p>
      <div className={gridStyles.grid}>
        {sections.map((s) => (
          <ModuleCard
            key={s.id}
            id={`vocabulary/${s.id}`}
            title={s.title}
            subtitle={s.subtitle}
            icon={s.icon}
          />
        ))}
      </div>
        {/* New word addition form */}
        <section className={styles.addWordSection} style={{ marginTop: '2rem' }}>
          <h2>Add a New Word</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const word = (form.elements.namedItem('word') as HTMLInputElement).value.trim();
              const translation = (form.elements.namedItem('translation') as HTMLInputElement).value.trim();
              if (!word || !translation) return;
              try {
                await fetch('/api/vocabulary/add', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ word, translation }),
                });
                // Optionally clear inputs after successful add
                (form.elements.namedItem('word') as HTMLInputElement).value = '';
                (form.elements.namedItem('translation') as HTMLInputElement).value = '';
                // Could trigger a refresh of list if needed
              } catch (err) {
                console.error('Failed to add word', err);
              }
            }}
          >
            <input name="word" placeholder="Word" required style={{ marginRight: '0.5rem' }} />
            <input name="translation" placeholder="Translation" required style={{ marginRight: '0.5rem' }} />
            <button type="submit">Add</button>
          </form>
        </section>
    </main>
  )
}




