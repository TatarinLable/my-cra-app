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
    const joyX = rect.left + rect.width / 2
    const joyY = rect.top + rect.height / 2

    const deltaX = e.clientX - joyX
    const deltaY = e.clientY - joyY

    const maxTilt = 25 // угол отклонения
    const rotateX = Math.max(Math.min(deltaY / 5, maxTilt), -maxTilt)
    const rotateY = Math.max(Math.min(-deltaX / 5, maxTilt), -maxTilt)

    joy.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    const joy = joyRef.current
    if (!joy) return
    joy.style.transform = "rotateX(0deg) rotateY(0deg)"
  }

  return (
    <nav className={`app-nav`}>
      {/* Левый блок */}
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

      {/* Центр: только для Slider */}
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

      {/* Правый блок: переключатель языка + джойстик */}
      <div className="nav-right">
        <div className="lang-toggle">
          <div className="lang-pill">
            <span className="inner">IT</span>
            <span>EN</span>
          </div>
          <div
            className="lang-circle"
            ref={joyRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            ×
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav