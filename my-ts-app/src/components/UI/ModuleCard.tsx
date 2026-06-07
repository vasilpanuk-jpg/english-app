import styles from './ModuleCard.module.css'
import {Link} from "react-router-dom";

type Props = {
  id: string
  title: string
  subtitle: string
  icon: string
}

export default function ModuleCard({ id, title, subtitle, icon}: Props) {
  return (
    <Link className={styles.card} to={`/${id}`}>
      <div className={styles.cardIcon} aria-hidden>
        {icon}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{subtitle}</p>
      <button
        className={styles.cardButton}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        Open
      </button>
    </Link>
  )
}
