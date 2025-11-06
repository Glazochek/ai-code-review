import { useState } from 'react'
import './styles/App.css'

import { CodeEditor } from './features/editor';
import { ReviewButton, CopyButton, CopyToInputButton, LanguageSelector, ReviewMode } from './features/review';
import { reviewCode } from './features/api';



const App = () => {
  const [inputCode, setInputCode] = useState('')
  const [outputCode, setOutputCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState('typescript')

  const handleReview = async (mode: ReviewMode) => {
    setIsLoading(true)
    try {
      const reviewed = await reviewCode(inputCode, mode)
      setOutputCode(reviewed)
    } catch (error) {
      console.error('Review failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyToInput = (code: string) => {
    setInputCode(code)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>AI Code Review</h1>
        <div className="user-info">
          <span>@Glazochek</span>
          <span className="timestamp">UTC: 2025-11-05 15:23:17</span>
        </div>
      </header>

      <div className="editors-container">
        <section className="editor-section">
          <div className="editor-header">
            <h2>Input Code</h2>
            <div className="editor-controls">
              <LanguageSelector
                selectedLanguage={language}
                onLanguageChange={setLanguage}
              />
              <div className="review-buttons-group">
                <ReviewButton
                  func={handleReview}
                  isLoading={isLoading}
                  mode="improve"
                />
                <ReviewButton
                  func={handleReview}
                  isLoading={isLoading}
                  mode="faster"
                />
                <ReviewButton
                  func={handleReview}
                  isLoading={isLoading}
                  mode="shorter"
                />
              </div>
            </div>
          </div>
          <CodeEditor
            value={inputCode}
            onChange={setInputCode}
            language={language}
            theme="vs-dark"
          />
        </section>

        <section className="editor-section">
          <div className="editor-header">
            <h2>Reviewed Code</h2>
            <div className="buttons-group">
              <CopyToInputButton
                outputCode={outputCode}
                onCopy={handleCopyToInput}
              />
              <CopyButton text={outputCode} />
            </div>
          </div>
          <CodeEditor
            value={outputCode}
            readOnly
            language={language}
            theme="vs-dark"
          />
        </section>
      </div>
    </div>
  )
}

export default App;
