'use client'

import Square from '../Square'
import Button from '../Button'
import styles from './styles.module.scss'
import { useBoard } from './hooks'

function WinnerMessage({ winner }: { winner: string }) {
  return (
    <div className={styles.message}>
      <p>
        Congratulations to <strong>{winner}</strong> for winning this game.
      </p>
    </div>
  )
}

function ToolsBar({
  onUndo,
  onRedo,
  onReset,
}: {
  onUndo: () => void
  onRedo: () => void
  onReset: () => void
}) {
  return (
    <div className={styles['tool-bar']}>
      <Button onClick={onReset}>New Game</Button>
      <div className={styles['button-group']}>
        <Button onClick={onUndo}>Undo</Button>
        <Button onClick={onRedo} style={{ marginLeft: 8 }}>
          Redo
        </Button>
      </div>
    </div>
  )
}

export default function Board() {
  const { winner, squares, handlePlayerMove, undo, redo, reset } = useBoard()

  return (
    <div className={styles.board}>
      {winner && <WinnerMessage winner={winner} />}
      <div className={styles.squares}>
        {squares.map((s, i) => (
          <Square position={i} value={s} key={i} onClick={handlePlayerMove} />
        ))}
      </div>
      <ToolsBar onRedo={redo} onReset={reset} onUndo={undo} />
    </div>
  )
}
