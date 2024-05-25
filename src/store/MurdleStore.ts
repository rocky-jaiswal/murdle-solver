import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

export interface Clue {
  suspect?: string
  location?: string
  weapon?: string
  validity: boolean
}

export interface Answer {
  who: string | null
  with: string | null
  where: string | null
}

interface MurdleState {
  level: number
  answer: Answer
  clues: Clue[]
}

type ActionTypes = 'SET_LEVEL' | 'SET_CLUES'

interface Actions {
  type: ActionTypes
  payload: {
    level?: number
    clues?: Clue[]
  }
}

const reducer = (state: MurdleState, { type, payload }: Actions) => {
  switch (type) {
    case 'SET_LEVEL':
      return { level: payload.level }
    case 'SET_CLUES':
      return { clues: payload.clues }
    default:
      return state
  }
}

export const useMurdleStore = create<MurdleState>()(
  devtools(
    persist(
      (_set) => ({
        level: 1, // default value
        answer: {
          who: null,
          with: null,
          where: null,
        },
        clues: [],
      }),
      {
        name: 'murdle-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)

export const dispatchForMurdleStore = (args: Actions) =>
  useMurdleStore.setState((state: MurdleState) => reducer(state, args))
