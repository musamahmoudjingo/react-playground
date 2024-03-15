import Link from 'next/link'
import styles from './styles.module.scss'

interface IPage {
  url: string
  text: string
}

const pages: IPage[] = [
  {
    url: '/',
    text: 'Home',
  },
  {
    url: '/tic-tac-toe',
    text: 'Tic Tac Toe',
  },
  {
    url: '/fault-tolerance',
    text: 'Fault Tolerance',
  },
  {
    url: '/use',
    text: 'use Hook',
  },
]

function Button(props: IPage) {
  return (
    <li>
      <Link href={props.url}>{props.text}</Link>
    </li>
  )
}

export function MainNavBar() {
  return (
    <ul role='navigation' className={styles.container}>
      {pages.map((page) => (
        <Button key={page.url} {...page} />
      ))}
    </ul>
  )
}
