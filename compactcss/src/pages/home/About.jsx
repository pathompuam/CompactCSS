import { useNavigate } from 'react-router-dom'
import { FiInfo, FiArrowLeft, FiStar, FiUploadCloud, FiCopy, FiDownload, FiBarChart2, FiZap, FiMoon, FiSun } from 'react-icons/fi'
import { useSettings, t } from '../../App'
import './About.css'

export default function About() {
  const navigate = useNavigate()
  const { theme, toggleTheme, lang, toggleLang } = useSettings()
  const text = t[lang]

  return (
    <div className="about-container">
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
            <div className="logo-small"><FiInfo /></div>
            <h1>{text.aboutTitle}</h1>
          </div>
          <p className="subtitle">{text.aboutSubtitle}</p>
          
          <div className="right-controls">
            <button className="nav-btn" onClick={() => navigate('/')}>
              <FiArrowLeft className="icon" /> {text.backBtn}
            </button>
          </div>

        </div>
      </header>

      <main className="main-content">
        <div className="about-content">
          <section className="about-section">
            <h2>{text.whatIs}</h2>
            <p>{text.whatIsDesc}</p>
          </section>

          <section className="about-section">
            <h2>{text.formats}</h2>
            <div className="formats-grid">
              <div className="format-card">
                <h3>Compact</h3>
                <p>{text.fmtCompactDesc}</p>
              </div>
              <div className="format-card">
                <h3>Minify</h3>
                <p>{text.fmtMinifyDesc}</p>
              </div>
              <div className="format-card">
                <h3>Pretty</h3>
                <p>{text.fmtPrettyDesc}</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="grid-2-col">
              <div>
                <h2>{text.howTo}</h2>
                <ol className="styled-list">
                  <li>{text.step1}</li>
                  <li>{text.step2}</li>
                  <li>{text.step3}</li>
                  <li>{text.step4}</li>
                  <li>{text.step5}</li>
                </ol>
              </div>
              <div>
                <h2>{text.features}</h2>
                <ul className="styled-list no-bullet">
                  <li><FiStar className="list-icon" /> {text.feat1}</li>
                  <li><FiUploadCloud className="list-icon" /> {text.feat2}</li>
                  <li><FiCopy className="list-icon" /> {text.feat3}</li>
                  <li><FiDownload className="list-icon" /> {text.feat4}</li>
                  <li><FiBarChart2 className="list-icon" /> {text.feat5}</li>
                  <li><FiZap className="list-icon" /> {text.feat6}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}