import {
  KeyValuePair,
  append,
  difference,
  head,
  intersection,
  isNil,
  isNotNil,
  range,
  uniq,
  xprod,
} from 'ramda'

import { Answer, Clue } from '../store'

type Element = 'suspect' | 'location' | 'weapon'

interface Matrix {
  name: string
  matrix: KeyValuePair<string, string>[]
}

const suspects = ['S1', 'S2', 'S3']
const weapons = ['W1', 'W2', 'W3']
const locations = ['L1', 'L2', 'L3']

// element - list
const elementList = {
  suspect: suspects,
  weapon: weapons,
  location: locations,
}

export const assignEasy = (easyMatrix: Matrix, clues: Clue[]) => {
  const elem1 = easyMatrix.name.split('-')[0] as Element
  const elem2 = easyMatrix.name.split('-')[1] as Element

  const list = elementList[elem1]
  const otherList = elementList[elem2]

  // assign the available one
  list.forEach((element) => {
    if (
      !clues.find(
        (clue) =>
          element === clue[elem1] && clue[elem2] && isNotNil(clue.validity) && clue.validity,
      )
    ) {
      const notValid = clues.filter(
        (clue) =>
          isNotNil(clue[elem1]) &&
          element === clue[elem1] &&
          clue[elem2] &&
          isNotNil(clue.validity) &&
          !clue.validity,
      )
      const notAvailable = clues.filter(
        (clue) =>
          isNotNil(clue[elem1]) &&
          element !== clue[elem1] &&
          isNotNil(clue[elem2]) &&
          isNotNil(clue.validity) &&
          clue.validity,
      )

      const allNots = notValid.concat(notAvailable).map((clue) => clue[elem2])

      const available = difference(
        otherList,
        uniq(allNots).filter((w) => w),
      )

      if (available.length === 1) {
        clues = append({ [elem1]: element, [elem2]: head(available)!, validity: true }, clues)
      }

      if (available.length === 2) {
        // we have a situation now, we are not constrained but others may be
        const notValidForOthers = clues
          .filter(
            (clue) =>
              isNotNil(clue[elem1]) &&
              element !== clue[elem1] &&
              isNotNil(clue[elem2]) &&
              isNotNil(clue.validity) &&
              !clue.validity,
          )
          .map((clue) => clue[elem2])

        const goodToAssign = intersection(available, notValidForOthers)

        if (goodToAssign.length === 1) {
          clues = append({ [elem1]: element, [elem2]: head(goodToAssign)!, validity: true }, clues)
        }
      }
    }
  })

  return clues
}

export const assignHard = (matrix: Matrix, clues: Clue[]) => {
  // find other info about associations
  const elem1 = matrix.name.split('-')[0] as Element
  const elem2 = matrix.name.split('-')[1] as Element
  const elem3 = head(difference(['suspect', 'weapon', 'location'], [elem1, elem2])) as Element

  const otherCluesWithElem2 = clues.filter(
    (clue) => isNil(clue[elem1]) && isNotNil(clue[elem2]) && isNotNil(clue.validity),
  )

  // console.log('-----------------------')
  // console.log(matrix.name)
  // console.log({ elem1, elem2, elem3 })
  // console.log({ otherCluesWithElem2 })

  otherCluesWithElem2.forEach((otherClueWithElem2) => {
    const e3 = otherClueWithElem2[elem3]

    const withElem3 = clues.filter((clue) => clue[elem3] === e3 && isNotNil(clue[elem1]))

    // console.log({ otherClueWithElem2 })
    // console.log({ withElem3 })

    if (withElem3.length > 0) {
      withElem3.forEach((we3) => {
        if (matrix.name === 'suspect-weapon') {
          clues = append(
            {
              suspect: we3.suspect,
              weapon: otherClueWithElem2.weapon,
              validity: we3.validity && otherClueWithElem2.validity,
            },
            clues,
          )
        }
        if (matrix.name === 'suspect-location') {
          clues = append(
            {
              suspect: we3.suspect,
              location: otherClueWithElem2.location,
              validity: we3.validity && otherClueWithElem2.validity,
            },
            clues,
          )
        }
        if (matrix.name === 'weapon-location') {
          clues = append(
            {
              weapon: we3.weapon,
              location: otherClueWithElem2.location,
              validity: we3.validity && otherClueWithElem2.validity,
            },
            clues,
          )
        }
      })
    }
  })

  return clues
}

const solveByCount = (clues: Clue[]) => {
  let updatedClues: Clue[] = clues

  // console.log(updatedClues)

  // the matrices
  const suspectWeaponMatrix = {
    name: 'suspect-weapon',
    matrix: xprod(suspects, weapons),
    clueCount: updatedClues.filter((clue) => clue.suspect && clue.weapon && isNotNil(clue.validity))
      .length,
  }
  const suspectLocationMatrix = {
    name: 'suspect-location',
    matrix: xprod(suspects, locations),
    clueCount: updatedClues.filter(
      (clue) => clue.suspect && clue.location && isNotNil(clue.validity),
    ).length,
  }
  const weaponLocationMatrix = {
    name: 'weapon-location',
    matrix: xprod(weapons, locations),
    clueCount: updatedClues.filter(
      (clue) => clue.weapon && clue.location && isNotNil(clue.validity),
    ).length,
  }

  const allMatrices = [suspectWeaponMatrix, suspectLocationMatrix, weaponLocationMatrix]

  // solve the easier matrices first
  const easyMat = allMatrices.filter((mat) => mat.clueCount === 2)

  if (easyMat.length > 0) {
    // console.log('em')
    easyMat.forEach((mat) => {
      updatedClues = assignEasy(mat, updatedClues)
    })

    return updatedClues
  }

  const hardMat = allMatrices.filter((mat) => mat.clueCount === 1)

  if (hardMat.length > 0) {
    // console.log('hm')
    updatedClues = assignHard(hardMat[0], updatedClues)
  }

  return updatedClues
}

export const solveLevel1 = (clues: Clue[], evidence: Answer) => {
  let updatedClues: Clue[] = clues

  range(1, 5).forEach(() => {
    // console.log('in range')
    updatedClues = solveByCount(updatedClues)
  })

  // console.log('==========solution==============')
  // console.log(updatedClues)
  // console.log(updatedClues.filter((clue) => clue.validity))
  // console.log(evidence)

  if (isNotNil(evidence.with)) {
    const final = updatedClues.filter((clue) => clue.weapon === evidence.with && clue.validity)

    // console.log(final)

    return {
      suspect: final.find((clue) => clue.suspect && clue.validity)?.suspect,
      weapon: final.find((clue) => clue.weapon && clue.validity)?.weapon,
      location: final.find((clue) => clue.location && clue.validity)?.location,
      validity: true,
    }
  }

  if (isNotNil(evidence.where)) {
    const final = updatedClues.filter((clue) => clue.location === evidence.where && clue.validity)

    return {
      suspect: final.find((clue) => clue.suspect && clue.validity)?.suspect,
      weapon: final.find((clue) => clue.weapon && clue.validity)?.weapon,
      location: final.find((clue) => clue.location && clue.validity)?.location,
      validity: true,
    }
  }
}
