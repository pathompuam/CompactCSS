import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { convertCSS } from '../../utils/cssCompactor'
import './Compact.css'

export default function Compact() {
  const navigate = useNavigate()
  const [cssInput, setCssInput] = useState('')
  const [cssOutput, setCssOutput] = useState('')
  const [format, setFormat] = useState('compact')
  const [dragActive, setDragActive] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e) => {
    setCssInput(e.target.value)
  }

  const handleConvert = () => {
    if (cssInput.trim()) {
      const result = convertCSS(cssInput, format)
      setCssOutput(result)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0]) {
      readFile(files[0])
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      readFile(files[0])
    }
  }

  const readFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setCssInput(e.target.result)
    }
    reader.readAsText(file)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([cssOutput], { type: 'text/css' })
    element.href = URL.createObjectURL(file)
    element.download = 'compact-style.css'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="compact-container">
      <header className="header">
        <div className="header-content centered-header">
          <div className="logo-group">
            <div className="logo-small">📝</div>
            <h1>Compact CSS</h1>
          </div>
          <p className="subtitle">Convert your CSS to Compact, One Line, or Minified format</p>
          <button className="nav-btn" onClick={() => navigate('/about')}>
            About Tool
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="converter-section">
          
          {/* Input Section */}
          <div className="input-section card">
            <h2>Input CSS</h2>
            <textarea
              className="css-textarea"
              placeholder="Paste your CSS here..."
              value={cssInput}
              onChange={handleInputChange}
            />

            <div
              className={`drag-drop-area ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="drag-content">
                <span className="drag-icon">📤</span>
                <p>Drag and drop CSS file here or</p>
                <label className="file-label btn-outline">
                  Choose File
                  <input
                    type="file"
                    accept=".css"
                    onChange={handleFileInput}
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="format-selection">
              <h3>Select Format:</h3>
              <div className="format-buttons">
                {['compact', 'oneline', 'minify', 'pretty'].map((fmt) => (
                  <button
                    key={fmt}
                    className={`format-btn ${format === fmt ? 'active' : ''}`}
                    onClick={() => setFormat(fmt)}
                  >
                    {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button className="convert-btn btn-primary" onClick={handleConvert}>
              🔄 Convert CSS
            </button>
          </div>

          {/* Output Section */}
          <div className="output-section card">
            <h2>Output CSS</h2>
            {cssOutput ? (
              <>
                <textarea
                  className="css-textarea output-area"
                  value={cssOutput}
                  readOnly
                />

                <div className="action-buttons">
                  <button
                    className={`btn-primary ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                  >
                    {copied ? '✅ Copied!' : '📋 Copy CSS'}
                  </button>
                  <button className="btn-outline" onClick={handleDownload}>
                    📥 Download CSS
                  </button>
                </div>

                <div className="stats-box">
                  <p>Input: <strong>{cssInput.length}</strong> chars</p>
                  <p>Output: <strong>{cssOutput.length}</strong> chars</p>
                  <p className="highlight">
                    Reduced: <strong>{cssInput.length > 0 ? Math.round(((cssInput.length - cssOutput.length) / cssInput.length) * 100) : 0}%</strong>
                  </p>
                </div>
              </>
            ) : (
              <div className="placeholder">
                <p>Enter or upload CSS to see the converted result here</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}