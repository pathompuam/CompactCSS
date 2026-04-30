import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createContext, useState, useEffect, useContext } from 'react'
import Compact from './pages/home/Compact'
import About from './pages/home/About'

// --- ชุดคำแปลภาษา ---
export const t = {
  en: {
    title: "Compact CSS", subtitle: "Convert your CSS to Compact, Minified, or Pretty format",
    aboutBtn: "About Tool", backBtn: "Back to Tool", inputTitle: "Input CSS",
    placeholderIn: "Paste your CSS here...", dragDrop: "Drag and drop CSS file here or",
    chooseFile: "Choose File", selectFormat: "Select Format:", keepComments: "Keep Comments",
    convertBtn: "Convert CSS", outputTitle: "Output CSS",
    placeholderOut: "Enter or upload CSS to see the converted result here",
    copyBtn: "Copy CSS", copiedBtn: "Copied!", downloadBtn: "Download CSS",
    inputSize: "Input:", outputSize: "Output:", reduced: "Reduced:", chars: "chars",
    aboutTitle: "About Compact CSS", aboutSubtitle: "Learn more about our CSS conversion tool",
    whatIs: "What is Compact CSS?", whatIsDesc: "Compact CSS is a powerful tool designed to help developers compress and optimize their CSS code. With support for multiple format options, you can choose the best compression level for your project.",
    formats: "Available Formats", fmtCompactDesc: "Removes all unnecessary whitespace while maintaining code integrity.",
    fmtMinifyDesc: "Ultra-compact version with aggressive whitespace removal.",
    fmtPrettyDesc: "Formats CSS with proper indentation and readability.",
    howTo: "How to Use", step1: "Paste your CSS code into the input textarea",
    step2: "Or upload a .css file by dragging and dropping", step3: "Select your desired output format (and choose to keep comments if needed)",
    step4: "Click \"Convert CSS\" to process", step5: "Copy the result or download as a file",
    features: "Features", feat1: "Multiple format options", feat2: "Drag and drop file upload",
    feat3: "One-click copy to clipboard", feat4: "Download converted CSS",
    feat5: "Real-time size reduction stats", feat6: "Fast and efficient processing",
  },
  th: {
    title: "คอมแพค CSS", subtitle: "แปลงโค้ด CSS ให้เป็นรูปแบบ Compact, Minified หรือ Pretty",
    aboutBtn: "เกี่ยวกับเครื่องมือ", backBtn: "กลับไปที่เครื่องมือ", inputTitle: "โค้ด CSS ขาเข้า",
    placeholderIn: "วางโค้ด CSS ของคุณที่นี่...", dragDrop: "ลากและวางไฟล์ CSS ที่นี่ หรือ",
    chooseFile: "เลือกไฟล์", selectFormat: "เลือกรูปแบบ:", keepComments: "คงคอมเมนต์ไว้",
    convertBtn: "แปลงโค้ด CSS", outputTitle: "โค้ด CSS ผลลัพธ์",
    placeholderOut: "ป้อนหรืออัปโหลด CSS เพื่อดูผลลัพธ์การแปลงที่นี่",
    copyBtn: "คัดลอก CSS", copiedBtn: "คัดลอกแล้ว!", downloadBtn: "ดาวน์โหลด CSS",
    inputSize: "ขนาดเริ่มต้น:", outputSize: "ขนาดผลลัพธ์:", reduced: "ลดขนาดได้:", chars: "ตัวอักษร",
    aboutTitle: "เกี่ยวกับ Compact CSS", aboutSubtitle: "เรียนรู้เพิ่มเติมเกี่ยวกับเครื่องมือแปลงโค้ดของเรา",
    whatIs: "Compact CSS คืออะไร?", whatIsDesc: "เครื่องมือทรงพลังสำหรับนักพัฒนาเพื่อบีบอัดและปรับแต่งโค้ด CSS โดยมีหลายตัวเลือกให้ใช้ตามความเหมาะสมของโปรเจกต์",
    formats: "รูปแบบที่มีให้ใช้งาน", fmtCompactDesc: "ลบช่องว่างที่ไม่จำเป็นออก โดยยังคงอ่านง่ายแบบ 1 กฎต่อบรรทัด",
    fmtMinifyDesc: "เวอร์ชันที่เล็กที่สุด ลบช่องว่างออกทั้งหมดเพื่อประสิทธิภาพสูงสุด",
    fmtPrettyDesc: "จัดรูปแบบ CSS ใหม่ให้มีระยะร่นและบรรทัดที่สวยงามอ่านง่าย",
    howTo: "วิธีใช้งาน", step1: "วางโค้ด CSS ลงในช่องรับข้อความ",
    step2: "หรืออัปโหลดไฟล์ .css ด้วยการลากและวาง", step3: "เลือกรูปแบบที่ต้องการ (และเลือกคงคอมเมนต์ไว้ได้)",
    step4: "คลิก \"แปลงโค้ด CSS\" เพื่อประมวลผล", step5: "คัดลอกผลลัพธ์หรือดาวน์โหลดไฟล์",
    features: "ฟีเจอร์ต่างๆ", feat1: "ตัวเลือกรูปแบบที่หลากหลาย", feat2: "อัปโหลดไฟล์ด้วยการลากและวาง",
    feat3: "คัดลอกง่ายในคลิกเดียว", feat4: "ดาวน์โหลดไฟล์ CSS ผลลัพธ์ได้ทันที",
    feat5: "แสดงสถิติการลดขนาดแบบเรียลไทม์", feat6: "ประมวลผลรวดเร็วและแม่นยำ",
  }
}

// --- การสร้าง Context ---
export const SettingsContext = createContext()
export const useSettings = () => useContext(SettingsContext)

function App() {
  // ดึงค่าตั้งต้นจาก localStorage (ถ้ามี) หรือกำหนดค่าเริ่มต้น
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en')

  // อัปเดต Theme และบันทึกลง localStorage ทันทีที่เปลี่ยน
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // บันทึกภาษาลง localStorage ทันทีที่เปลี่ยน
  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'th' : 'en'))

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, lang, toggleLang }}>
      <Router>
        <Routes>
          <Route path="/" element={<Compact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </SettingsContext.Provider>
  )
}

export default App