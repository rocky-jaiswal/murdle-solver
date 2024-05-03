import { useState, useEffect } from 'react'

import { dispatchForCountStore, useCountStore } from '/@/store'

export const HomePage: React.FC = () => {
  const countStore = useCountStore()

  const [count, setCount] = useState(0)

  useEffect(() => console.log('componentDidMount and count-Update'), [count])

  return (
    <>
      <h1>Home</h1>

      <div className="flex h-1/6 flex-col items-center justify-between">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          Add + 1: state count is: {count}
        </button>

        <button
          className="btn btn-primary"
          type="button"
          onClick={() => dispatchForCountStore({ type: 'INCREASE' })}
        >
          Add + 1
        </button>

        <button
          className="btn btn-primary"
          type="button"
          onClick={() => dispatchForCountStore({ type: 'DECREASE' })}
        >
          Add - 1
        </button>

        <p>Zustand count is: {countStore.count}</p>
      </div>
    </>
  )
}
