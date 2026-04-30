import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { convertCSS } from '../../utils/cssCompactor'
import { FiCode, FiUploadCloud, FiCopy, FiCheck, FiDownload, FiRefreshCw, FiInfo, FiMoon, FiSun } from 'react-icons/fi'
import { useSettings, t } from '../../App'
import './Compact.css'

export default function Compact() {
  const navigate = useNavigate()
  const { theme, toggleTheme, lang, toggleLang } = useSettings()
  const text = t[lang]
  
  const [cssInput, setCssInput] = useState('')
  const [cssOutput, setCssOutput] = useState('')
  const [format, setFormat] = useState('compact')
  const [keepComments, setKeepComments] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e) => setCssInput(e.target.value)

  const handleConvert = () => {
    if (cssInput.trim()) {
      const result = convertCSS(cssInput, format, keepComments)
      setCssOutput(result)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0]) readFile(files[0])
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files[0]) readFile(files[0])
  }

  const readFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => setCssInput(e.target.result)
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
          
          <div className="left-controls">
            <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
            <button className="icon-btn lang-btn" onClick={toggleLang} title="Toggle Language">
              {lang === 'en' ? 'TH' : 'EN'}
            </button>
          </div>

          <div className="logo-group">
            <div className="logo-small"><FiCode /></div>
            <h1>{text.title}</h1>
          </div>
          <p className="subtitle">{text.subtitle}</p>
          
          <div className="right-controls">
            <button className="nav-btn" onClick={() => navigate('/about')}>
              <FiInfo className="icon" /> {text.aboutBtn}
            </button>
          </div>

        </div>
      </header>

      <main className="main-content">
        <div className="converter-section">
          
          <div className="input-section card">
            <h2>{text.inputTitle}</h2>
            <textarea className="css-textarea" placeholder={text.placeholderIn} value={cssInput} onChange={handleInputChange} />
            <div className={`drag-drop-area ${dragActive ? 'active' : ''}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
              <div className="drag-content">
                <FiUploadCloud className="drag-icon" />
                <p>{text.dragDrop}</p>
                <label className="file-label btn-outline">
                  {text.chooseFile}
                  <input type="file" accept=".css" onChange={handleFileInput} hidden />
                </label>
              </div>
            </div>

            <div className="options-container">
              <div className="format-selection">
                <h3>{text.selectFormat}</h3>
                <div className="format-buttons">
                  {['compact', 'minify', 'pretty'].map((fmt) => (
                    <button key={fmt} className={`format-btn ${format === fmt ? 'active' : ''}`} onClick={() => setFormat(fmt)}>
                      {fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="toggle-section">
                <label className="toggle-label">
                  <input type="checkbox" checked={keepComments} onChange={(e) => setKeepComments(e.target.checked)} />
                  <span className="toggle-switch"></span>
                  {text.keepComments}
                </label>
              </div>
            </div>

            <button className="convert-btn btn-primary" onClick={handleConvert}>
              <FiRefreshCw className="icon" /> {text.convertBtn}
            </button>
          </div>

          <div className="output-section card">
            <h2>{text.outputTitle}</h2>
            {cssOutput ? (
              <>
                <textarea className="css-textarea output-area" value={cssOutput} readOnly />
                <div className="action-buttons">
                  <button className={`btn-primary ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                    {copied ? <><FiCheck className="icon" /> {text.copiedBtn}</> : <><FiCopy className="icon" /> {text.copyBtn}</>}
                  </button>
                  <button className="btn-outline" onClick={handleDownload}>
                    <FiDownload className="icon" /> {text.downloadBtn}
                  </button>
                </div>
                <div className="stats-box">
                  <p>{text.inputSize} <strong>{cssInput.length}</strong> {text.chars}</p>
                  <p>{text.outputSize} <strong>{cssOutput.length}</strong> {text.chars}</p>
                  <p className="highlight">
                    {text.reduced} <strong>{cssInput.length > 0 ? Math.round(((cssInput.length - cssOutput.length) / cssInput.length) * 100) : 0}%</strong>
                  </p>
                </div>
              </>
            ) : (
              <div className="placeholder">
                <p>{text.placeholderOut}</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}