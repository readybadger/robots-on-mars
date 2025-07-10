import { useState } from 'react'
import TextArea from './TextArea'
import { runSimulation } from './lib/simulation'
import type { Robot } from './types/robot'
import type { Position } from './types/spatial'

const positionToString = (position: Position): string => {
  return `${position.location.x} ${position.location.y} ${position.facing}`
}

const getOutput = (robots: Robot[]) => {
  return robots
    .map(
      ({ position, lost }) =>
        `${positionToString(position)}${lost ? ' LOST' : ''}`
    )
    .join('\n')
}

function App() {
  const [inputText, setInputText] = useState<string>(`5 3

1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
  `)
  const [resultText, setResultText] = useState<string>('')

  const onRunSimulation = () => {
    const { robots } = runSimulation(inputText)
    setResultText(getOutput(robots))
  }

  return (
    <div className="flex justify-between w-full gap-x-10">
      <div className="grow">
        <TextArea value={inputText} onChange={setInputText} rows={20} />
      </div>
      <button
        onClick={onRunSimulation}
        className="cursor-pointer self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Run
        <br />
        Simulation
      </button>
      <div className="grow">
        <TextArea value={resultText} rows={20} />
      </div>
    </div>
  )
}

export default App
