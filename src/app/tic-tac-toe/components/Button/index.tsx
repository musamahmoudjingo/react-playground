import styles from './styles.module.scss'

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: IButtonProps) {
  return <button {...props} className={styles.button} />
}
