import './App.css'
import MatchingPage from './components/MatchingPage'
import { Routes, Route } from 'react-router-dom'
import CodingSpace from './components/CodingSpace'
import React from 'react'

export default function App() {

  const [question, setQuestion] = React.useState("Default Question")
  const [programmingLanguage, setProgrammingLanguage] = React.useState("javascript")

  return (
    <Routes>
      <Route 
        path="/" 
        element={<MatchingPage 
                    setQuestion={setQuestion} 
                    setProgrammingLanguage={setProgrammingLanguage}
                />} 
      />
      <Route 
        path="/codingspace" 
        element={<CodingSpace 
                    question={question} 
                    programmingLanguage={programmingLanguage} 
                />} 
      />
    </Routes>
  )
}