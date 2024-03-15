import { useReducer } from 'react'

export interface IBoardState {
  nextPlayer: string
  squares: Array<string | null>
  history: Array<Array<string | null>>
  pointInHistory: number
  winner: string | null
}

export enum BoardEvents {
  PLAYER_MOVE,
  UNDO,
  REDO,
  RESET,
}

export interface IBoardAction {
  type: BoardEvents
  payload?: { [key: string]: string | number } | string | number
}

const defaultState: IBoardState = {
  winner: null,
  nextPlayer: 'X',
  squares: Array(9).fill(null),
  history: [Array(9).fill(null)],
  pointInHistory: 0,
}

function boardStateReducer(state: IBoardState, action: IBoardAction) {
  switch (action.type) {
    case BoardEvents.PLAYER_MOVE: {
      if (typeof action.payload === 'number') {
        return handlePlayerMove(state, action.payload as number)
      }
    }

    case BoardEvents.UNDO:
      return undo(state)

    case BoardEvents.REDO:
      return redo(state)

    case BoardEvents.RESET:
      return reset()

    default:
      throw Error('unable to handle action: ' + action)
  }
}

export function useBoard() {
  const [state, dispatch] = useReducer(boardStateReducer, defaultState)

  const { winner, squares, history } = state

  return {
    winner,
    squares,
    history,
    undo: () => dispatch({ type: BoardEvents.UNDO }),
    redo: () => dispatch({ type: BoardEvents.REDO }),
    reset: () => dispatch({ type: BoardEvents.RESET }),
    handlePlayerMove: (position: number) =>
      dispatch({ type: BoardEvents.PLAYER_MOVE, payload: position }),
  }
}

function handlePlayerMove(state: IBoardState, position: number): IBoardState {
  if (!state.squares[position] && !state.winner) {
    const squares = state.squares.slice()
    squares[position] = state.nextPlayer

    const history = state.history.slice(0, state.pointInHistory + 1)
    history.push(squares)

    const nextPlayer = getNextPlayer(state.nextPlayer)
    const winner = getWinner(squares)

    return {
      ...state,
      winner,
      squares,
      nextPlayer,
      history,
      pointInHistory: history.length - 1,
    }
  }

  return state
}

function undo(state: IBoardState): IBoardState {
  if (state.pointInHistory > 0) {
    const pointInHistory = state.pointInHistory - 1
    const squares = state.history[pointInHistory]
    return {
      ...state,
      squares,
      pointInHistory: pointInHistory,
      nextPlayer: getNextPlayer(state.nextPlayer),
      winner: getWinner(squares),
    }
  }

  return state
}

function redo(state: IBoardState): IBoardState {
  if (state.pointInHistory < state.history.length - 1) {
    const pointInHistory = state.pointInHistory + 1
    const squares = state.history[pointInHistory]
    return {
      ...state,
      pointInHistory,
      squares,
      nextPlayer: getNextPlayer(state.nextPlayer),
      winner: getWinner(squares),
    }
  }

  return state
}

function reset(): IBoardState {
  return defaultState
}

function getNextPlayer(current: string): string {
  return { X: 'O', O: 'X' }[current] as string
}

function getWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}
