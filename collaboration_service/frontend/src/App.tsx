import './App.css'
import MatchingPage from './components/MatchingPage'
import { Routes, Route } from 'react-router-dom'
import CodingSpace from './components/CodingSpace'
import React from 'react'

export default function App() {

  const [question, setQuestion] = React.useState("")

  return (
    <Routes>
      <Route path="/" element={<MatchingPage setQuestion={setQuestion}/>} />
      <Route path="/codingspace" element={<CodingSpace question={question} />} />
    </Routes>
  )
}