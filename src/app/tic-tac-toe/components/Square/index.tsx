import styles from './styles.module.scss'

interface SquareProps {
  position: number
  value: string | null
  onClick: (position: number) => void
}

export default function Square({ position, value, onClick }: SquareProps) {
  return (
    <button className={styles.square} onClick={() => onClick(position)}>
      {value}
    </button>
  )
}
