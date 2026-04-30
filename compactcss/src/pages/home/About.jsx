import { useNavigate } from 'react-router-dom'
import './About.css'

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="about-container">
      <header className="header">
        <div className="header-content centered-header">
          <div className="logo-group">
            <div className="logo-small">ℹ️</div>
            <h1>About Compact CSS</h1>
          </div>
          <p className="subtitle">Learn more about our CSS conversion tool</p>
          <button className="nav-btn" onClick={() => navigate('/')}>
            Back to Tool
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="about-content">
          <section className="about-section">
            <h2>What is Compact CSS?</h2>
            <p>
              Compact CSS is a powerful tool designed to help developers compress and optimize their CSS code. 
              With support for multiple format options, you can choose the best compression level for your project.
            </p>
          </section>

          <section className="about-section">
            <h2>Available Formats</h2>
            <div className="formats-grid">
              <div className="format-card">
                <h3>Compact</h3>
                <p>Removes all unnecessary whitespace while maintaining code integrity.</p>
              </div>
              <div className="format-card">
                <h3>One Line</h3>
                <p>Converts your entire CSS into a single line format.</p>
              </div>
              <div className="format-card">
                <h3>Minify</h3>
                <p>Ultra-compact version with aggressive whitespace removal.</p>
              </div>
              <div className="format-card">
                <h3>Pretty</h3>
                <p>Formats CSS with proper indentation and readability.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="grid-2-col">
              <div>
                <h2>How to Use</h2>
                <ol className="styled-list">
                  <li>Paste your CSS code into the input textarea</li>
                  <li>Or upload a .css file by dragging and dropping</li>
                  <li>Select your desired output format</li>
                  <li>Click "Convert CSS" to process</li>
                  <li>Copy the result or download as a file</li>
                </ol>
              </div>
              <div>
                <h2>Features</h2>
                <ul className="styled-list no-bullet">
                  <li>✨ Multiple format options</li>
                  <li>📤 Drag and drop file upload</li>
                  <li>📋 One-click copy to clipboard</li>
                  <li>📥 Download converted CSS</li>
                  <li>📊 Real-time size reduction stats</li>
                  <li>⚡ Fast and efficient processing</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}