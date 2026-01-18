import { useState } from 'react'
import './App.css'
import LandingPage from './LandingPage'
import QuizApp from './QuizApp'
import SituationalQuiz from './SituationalQuiz'
import EngineElectricalQuiz from './EngineElectricalQuiz'

function App() {
  const [currentView, setCurrentView] = useState('landing') // 'landing', 'multiple-choice', 'situational', 'engine-electrical'

  const handleQuizSelect = (quizType) => {
    setCurrentView(quizType)
  }

  const handleBackToHome = () => {
    setCurrentView('landing')
  }

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage onQuizSelect={handleQuizSelect} />
      )}
      {currentView === 'multiple-choice' && (
        <QuizApp onBackToHome={handleBackToHome} />
      )}
      {currentView === 'situational' && (
        <SituationalQuiz onBackToHome={handleBackToHome} />
      )}
      {currentView === 'engine-electrical' && (
        <EngineElectricalQuiz onBackToHome={handleBackToHome} />
      )}
    </>
  )
}

export default App
