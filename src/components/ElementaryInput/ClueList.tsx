import { remove } from 'ramda'
// import { Dispatch, SetStateAction } from 'react'

import { Clue } from '/@/store'

interface Props {
  clues: Clue[]
  setClues: (clues: Clue[]) => void
}

export const ClueList = ({ clues, setClues }: Props) => {
  return (
    <div>
      <h3 className="py-3 font-bold">List of clues:</h3>
      <ul className={`${clues.length > 0 ? 'border' : ''} border-gray-400 p-2`}>
        {clues.map((clue, index) => {
          return (
            <li key={index} className="my-2">
              <div className="flex flex-row">
                <p className="kbd kbd-lg">{clue.suspect ? `${clue.suspect}` : ''}</p>
                <p className="kbd kbd-lg">{clue.location ? `${clue.location}` : ''}</p>
                <p className="kbd kbd-lg">{clue.weapon ? `${clue.weapon}` : ''}</p>
                <p className="kbd kbd-lg">{clue.validity ? '✅' : '❌'}</p>
                <button
                  className="btn btn-error mx-4"
                  onClick={() => {
                    setClues(remove(index, 1, clues))
                  }}
                >
                  ⛌
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
