import { Clue, dispatchForMurdleStore, useMurdleStore } from '/@/store'

import { ElementaryInput } from '../components/ElementaryInput'
import { MediumInput } from '../components/MediumInput'
import { HardInput } from '../components/HardInput'
import { ImpossibleInput } from '../components/ImpossibleInput'
import { Grid } from '../components/Grid'

interface Props {
  level: number | null
  clues: Clue[]
  setClues: (clues: Clue[]) => void
}

const Panel: React.FC<Props> = (props: Props) => {
  switch (props.level) {
    case 1:
      return (
        <>
          <ElementaryInput clues={props.clues} setClues={props.setClues} />
          <Grid clues={props.clues} />
        </>
      )
    case 2:
      return <MediumInput />
    case 3:
      return <HardInput />
    case 4:
      return <ImpossibleInput />
    default:
      return <div />
  }
}

export const HomePage: React.FC = () => {
  const murdleStore = useMurdleStore()

  const setClues = (clues: Clue[]) =>
    dispatchForMurdleStore({
      type: 'SET_CLUES',
      payload: { clues },
    })

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-between p-4">
        <h1 className="p-4 text-2xl">Volume 1</h1>
        <div className="flex flex-row items-center">
          <span>Select difficulty:</span>
          <select
            className="select select-primary w-full max-w-xs text-lg"
            defaultValue={murdleStore.level || 1}
            onChange={(e) =>
              dispatchForMurdleStore({
                type: 'SET_LEVEL',
                payload: { level: parseInt(e.target.value) },
              })
            }
          >
            <option value={'1'}>1-25 (Elementary) 🔎</option>
            <option value={'2'}>25-50 (Medium) 🔎🔎</option>
            <option value={'3'}>50-75 (HardBoiled) 🔎🔎🔎</option>
            <option value={'4'}>75-100 (Impossible) 🔎🔎🔎🔎</option>
          </select>
        </div>
      </div>
      <Panel level={murdleStore.level} clues={murdleStore.clues} setClues={setClues} />
    </div>
  )
}
