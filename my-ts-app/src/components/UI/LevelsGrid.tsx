import ModuleCard from './ModuleCard'
import styles from './LevelsGrid.module.css'

type Props = {
  moduleId: string
  moduleTitle?: string
}

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const levelInfo: Record<string, { icon: string; hint: string }> = {
  A1: { icon: '🐣', hint: 'If you are just starting: simple phrases and basic grammar.' },
  A2: { icon: '🌱', hint: 'If you know the basics: expand vocabulary and simple structures.' },
  B1: { icon: '🚀', hint: 'If you handle everyday topics: work on fluency and confidence.' },
  B2: { icon: '⚡', hint: 'If you communicate well in complex situations: improve accuracy.' },
  C1: { icon: '🌟', hint: 'If you have a high level: focus on style and specialized vocabulary.' },
  C2: { icon: '🏆', hint: 'If you aim for native level: refine nuances and expression.' },
}

export default function LevelsGrid({ moduleId, moduleTitle }: Props) {
  return (
    <section className={styles.levelsSection}>
      <div className={styles.grid}>
        {levels.map((level) => (
          <ModuleCard
            key={level}
            id={`${moduleId}/${level}`}
            title={level}
            subtitle={levelInfo[level].hint}
            icon={levelInfo[level].icon}
          />
        ))}
      </div>
    </section>
  )
}
