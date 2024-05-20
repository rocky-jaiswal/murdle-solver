import { Dispatch, SetStateAction } from 'react'

interface Props {
  setEvidence: Dispatch<SetStateAction<string>>
  setEvidenceDetails: Dispatch<SetStateAction<string>>
  evidenceDetails: string
  evidence: string
}

export const Evidence = (props: Props) => {
  return (
    <div className="flex flex-row items-center">
      <span>🪦 Murder was - </span>
      <select
        className="select mx-2"
        onChange={(e) => {
          props.setEvidence(e.target.value)
          if (e.target.value === 'where') {
            props.setEvidenceDetails('L1')
          } else {
            props.setEvidenceDetails('W1')
          }
        }}
      >
        <option value={'where'}>found in location</option>
        <option value={'with'}>executed with weapon</option>
      </select>
      <select
        className="select mx-2"
        value={props.evidenceDetails}
        onChange={(e) => {
          props.setEvidenceDetails(e.target.value)
        }}
      >
        <option value={props.evidence === 'where' ? 'L1' : 'W1'}>
          {props.evidence === 'where' ? 'L1' : 'W1'}
        </option>
        <option value={props.evidence === 'where' ? 'L2' : 'W2'}>
          {props.evidence === 'where' ? 'L2' : 'W2'}
        </option>
        <option value={props.evidence === 'where' ? 'L3' : 'W3'}>
          {props.evidence === 'where' ? 'L3' : 'W3'}
        </option>
      </select>
    </div>
  )
}
