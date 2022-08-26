import { FunctionComponent, useState } from 'react'

export const HomePage: FunctionComponent = () => {
  const [counter, setCounter] = useState(0)

  return (
    <p>
      {counter}
      <button onClick={() => setCounter(10)}></button>
    </p>
  )
}
