import { append, isNotNil } from 'ramda'
import { useState } from 'react'
import clsx from 'clsx'

import { Answer, Clue } from '/@/store'
import { solveLevel1 } from '/@/logic/level1'

import { ClueList } from './ClueList'
import { Evidence } from './Evidence'
import { Element2Details } from './Element2Details'

interface Props {
  clues: Clue[]
  setClues: (clues: Clue[]) => void
}

export const ElementaryInput: React.FC<Props> = ({ clues, setClues }: Props) => {
  const [element1, setElement1] = useState<string>('suspect')
  const [element1Details, setElement1Details] = useState<string>('S1')
  const [element1Relation, setElement1Relation] = useState<string>('location')
  const [element2, setElement2] = useState<string>('L1')

  const [evidence, setEvidence] = useState<string>('where')
  const [evidenceDetails, setEvidenceDetails] = useState<string>('L1')

  const [finalClue, setFinalClue] = useState<Clue | null>(null)

  return (
    <div className="flex flex-col rounded bg-neutral p-4">
      <h3 className="py-4 font-bold">Please provide the clues:</h3>

      <div className="my-4 flex flex-row items-center">
        <span>🔏</span>
        <select
          className="select mx-2"
          onChange={(e) => {
            setElement1(e.target.value)
            if (e.target.value === 'suspect') {
              setElement1Details('S1')
            } else {
              setElement1Details('W1')
            }
          }}
        >
          <option value={'suspect'}>Suspect</option>
          <option value={'weapon'}>Weapon</option>
        </select>
        <select
          className="select mx-2"
          onChange={(e) => setElement1Details(e.target.value)}
          value={element1Details}
        >
          <option value={element1 === 'suspect' ? 'S1' : 'W1'}>
            {element1 === 'suspect' ? 'S1' : 'W1'}
          </option>
          <option value={element1 === 'suspect' ? 'S2' : 'W2'}>
            {element1 === 'suspect' ? 'S2' : 'W2'}
          </option>
          <option value={element1 === 'suspect' ? 'S3' : 'W3'}>
            {element1 === 'suspect' ? 'S3' : 'W3'}
          </option>
        </select>
        <select
          className="select mx-2"
          onChange={(e) => {
            setElement1Relation(e.target.value)
            if (['location-negation', 'location'].includes(e.target.value)) {
              setElement2('L1')
            } else {
              setElement2('W1')
            }
          }}
        >
          <option value={element1 === 'suspect' ? 'location' : 'location'}>
            {element1 === 'suspect' ? 'was located in' : 'was found in'}
          </option>
          <option value={element1 === 'suspect' ? 'location-negation' : 'location-negation'}>
            {element1 === 'suspect' ? 'was not located in' : 'was not found in'}
          </option>
          <option
            value={element1 === 'suspect' ? 'suspect-weapon' : 'not-possible'}
            disabled={element1 === 'weapon'}
          >
            {element1 === 'suspect' ? 'had posession of' : ''}
          </option>
          <option
            value={element1 === 'suspect' ? 'suspect-weapon-negation' : 'not-possible'}
            disabled={element1 === 'weapon'}
          >
            {element1 === 'suspect' ? 'did not have posession of' : ''}
          </option>
        </select>
        {element1Relation ? (
          <Element2Details
            element1={element1}
            element2={element2}
            element1Relation={element1Relation}
            handleChange={setElement2}
          />
        ) : (
          <></>
        )}
      </div>
      <button
        className="btn btn-primary w-48"
        onClick={() => {
          if (element1 === 'suspect') {
            const suspect = element1Details
            if (element1Relation === 'location') {
              setClues(append({ suspect, location: element2, validity: true }, clues))
            }
            if (element1Relation === 'location-negation') {
              setClues(append({ suspect, location: element2, validity: false }, clues))
            }
            if (element1Relation === 'suspect-weapon') {
              setClues(append({ suspect, weapon: element2, validity: true }, clues))
            }
            if (element1Relation === 'suspect-weapon-negation') {
              setClues(append({ suspect, weapon: element2, validity: false }, clues))
            }
          }
          if (element1 === 'weapon') {
            const weapon = element1Details
            if (element1Relation === 'location') {
              setClues(append({ weapon, location: element2, validity: true }, clues))
            }
            if (element1Relation === 'location-negation') {
              setClues(append({ weapon, location: element2, validity: false }, clues))
            }
          }
        }}
      >
        Add Clue
      </button>

      <span className="divider" />

      <ClueList clues={clues} setClues={setClues} />

      <span className="divider" />

      <h3 className="py-4 font-bold">Please provide the evidence:</h3>
      <Evidence
        setEvidence={setEvidence}
        setEvidenceDetails={setEvidenceDetails}
        evidenceDetails={evidenceDetails}
        evidence={evidence}
      />
      <span className="divider" />
      <div className="flex">
        <div>
          <button
            className="btn btn-success w-48"
            onClick={() => {
              const soln = solveLevel1(clues, { [evidence]: evidenceDetails } as unknown as Answer)
              setFinalClue(soln ?? null)
            }}
          >
            Solve!
          </button>
        </div>
        <div className={isNotNil(finalClue) ? clsx('mx-4 grow border border-green-500 p-2') : ''}>
          {isNotNil(finalClue) ? (
            <div>
              <div>Suspect: {finalClue.suspect}</div>
              <div>Weapon: {finalClue.weapon}</div>
              <div>Location: {finalClue.location}</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <span className="divider" />
    </div>
  )
}
