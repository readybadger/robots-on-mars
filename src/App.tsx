import { useState } from 'react'
import './App.css'
import TextArea from './TextArea'

function App() {
  const [inputText, setInputText] = useState<string>('')
  const [resultText, setResultText] = useState<string>('')

  const onRunSimulation = () => {
    setResultText(inputText)
  }

  return (
    <div className="flex justify-between w-full gap-x-10">
      <div className="grow">
        <TextArea value={inputText} onChange={setInputText} />
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
        <TextArea value={resultText} />
      </div>
    </div>
  )
}

export default App
