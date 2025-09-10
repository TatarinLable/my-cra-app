import React, { useRef } from "react"
import "./Nav.css"

type Section = { id: string; title: string }

type Props = {
  mode: "hero" | "slider"
  setMode: (m: "hero" | "slider") => void
  sections: Section[]
  currentSection: number
  setCurrentSection: (i: number) => void
}

const Nav: React.FC<Props> = ({ mode, setMode, sections, currentSection, setCurrentSection }) => {
  const joyRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const joy = joyRef.current
    if (!joy) return

    const rect = joy.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // вычисляем смещение относительно центра
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    const maxOffset = 10 // максимальное смещение
    const offsetX = Math.max(Math.min(deltaX, maxOffset), -maxOffset)
    const offsetY = Math.max(Math.min(deltaY, maxOffset), -maxOffset)

    const maxRotate = 15 // максимальный угол наклона
    const rotateX = (offsetY / maxOffset) * maxRotate
    const rotateY = (-offsetX / maxOffset) * maxRotate

    joy.style.transform = `translate(${offsetX}px, ${offsetY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    const joy = joyRef.current
    if (!joy) return
    joy.style.transform = "translate(0px, 0px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <nav className={`app-nav`}>
      <div className="nav-left">
        {mode === "hero" ? (
          <>
            <div className="logo-mini">AM</div>
            <div className="logo-text">MINIKAEV ARTEM</div>
          </>
        ) : (
          <button className="back-btn" onClick={() => setMode("hero")}>
            ← Вернуться домой
          </button>
        )}
      </div>

      {mode === "slider" && (
        <div className="nav-center">
          {sections.map((s, i) => (
            <button
              key={s.id}
              className={`nav-link ${i === currentSection ? "active" : ""}`}
              onClick={() => setCurrentSection(i)}
            >
              {s.title}
            </button>
          ))}
        </div>
      )}

      <div className="nav-right">
        <div
          className="lang-toggle"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="lang-pill">
            <span className="inner">IT</span>
            <span>EN</span>
          </div>
          <div className="lang-circle" ref={joyRef}>
            ×
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav