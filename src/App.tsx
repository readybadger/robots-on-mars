import { useState } from 'react'
import './App.css'
import TextArea from './TextArea'

function App() {
  const [inputText, setInputText] = useState<string>('')
  return (
    <div className="flex justify-between w-full">
      <div className="grow">
        <TextArea value={inputText} onChange={setInputText} />
      </div>
      <div className="grow">
        <TextArea value={inputText} />
      </div>
    </div>
  )
}

export default App
