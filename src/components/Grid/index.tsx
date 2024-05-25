import { isNil } from 'ramda'

import { Clue } from '/@/store'

interface Props {
  clues: Clue[]
}

const showIcon = (clues: Clue[], elem1: string, elem2: string) => {
  let f1 = ''
  let f2 = ''

  if (['S1', 'S2', 'S3'].includes(elem1)) {
    f1 = 'suspect'
  }
  if (['L1', 'L2', 'L3'].includes(elem1)) {
    f1 = 'location'
  }
  if (['W1', 'W2', 'W3'].includes(elem1)) {
    f1 = 'weapon'
  }

  if (['S1', 'S2', 'S3'].includes(elem2)) {
    f2 = 'suspect'
  }
  if (['L1', 'L2', 'L3'].includes(elem2)) {
    f2 = 'location'
  }
  if (['W1', 'W2', 'W3'].includes(elem2)) {
    f2 = 'weapon'
  }

  //@ts-ignore
  if (isNil(clues.find((clue: Clue) => clue[f1] === elem1 && clue[f2] === elem2))) {
    return '-'
  }

  //@ts-ignore
  return clues.find((clue) => clue[f1] === elem1 && clue[f2] === elem2)?.validity ? '✅' : '❌'
}

export const Grid = ({ clues }: Props) => {
  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <td>-</td>
            <td>S1</td>
            <td>S2</td>
            <td>S3</td>
            <td>L1</td>
            <td>L2</td>
            <td>L3</td>
          </tr>
          <tr>
            <td>W1</td>
            <td>{showIcon(clues, 'W1', 'S1')}</td>
            <td>{showIcon(clues, 'W1', 'S2')}</td>
            <td>{showIcon(clues, 'W1', 'S3')}</td>
            <td>{showIcon(clues, 'W1', 'L1')}</td>
            <td>{showIcon(clues, 'W1', 'L2')}</td>
            <td>{showIcon(clues, 'W1', 'L3')}</td>
          </tr>
          <tr>
            <td>W2</td>
            <td>{showIcon(clues, 'W2', 'S1')}</td>
            <td>{showIcon(clues, 'W2', 'S2')}</td>
            <td>{showIcon(clues, 'W2', 'S3')}</td>
            <td>{showIcon(clues, 'W2', 'L1')}</td>
            <td>{showIcon(clues, 'W2', 'L2')}</td>
            <td>{showIcon(clues, 'W2', 'L3')}</td>
          </tr>
          <tr>
            <td>W3</td>
            <td>{showIcon(clues, 'W3', 'S1')}</td>
            <td>{showIcon(clues, 'W3', 'S2')}</td>
            <td>{showIcon(clues, 'W3', 'S3')}</td>
            <td>{showIcon(clues, 'W3', 'L1')}</td>
            <td>{showIcon(clues, 'W3', 'L2')}</td>
            <td>{showIcon(clues, 'W3', 'L3')}</td>
          </tr>
          <tr>
            <td>L1</td>
            <td>{showIcon(clues, 'L1', 'S1')}</td>
            <td>{showIcon(clues, 'L1', 'S2')}</td>
            <td>{showIcon(clues, 'L1', 'S3')}</td>
          </tr>
          <tr>
            <td>L2</td>
            <td>{showIcon(clues, 'L2', 'S1')}</td>
            <td>{showIcon(clues, 'L2', 'S2')}</td>
            <td>{showIcon(clues, 'L2', 'S3')}</td>
          </tr>
          <tr>
            <td>L3</td>
            <td>{showIcon(clues, 'L3', 'S1')}</td>
            <td>{showIcon(clues, 'L3', 'S2')}</td>
            <td>{showIcon(clues, 'L3', 'S3')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
