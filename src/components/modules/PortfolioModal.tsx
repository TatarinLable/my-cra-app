import React, { useState, useEffect, useRef } from "react"
import "./PortfolioModal.css"

type Props = { onClose: () => void }

type Tab = {
  id: string
  title: string
  banner: string
  desc: string
  gallery: { img: string; text: string }[]
}

const tabs: Tab[] = [
  {
    id: "foto",
    title: "Fotografia",
    banner: "Selezione Foto",
    desc: "Una raccolta di scatti significativi.",
    gallery: [
      { img: "/images/foto1.jpg", text: "Scatto 1" },
      { img: "/images/foto2.jpg", text: "Scatto 2" },
      { img: "/images/foto3.jpg", text: "Scatto 3" }
    ]
  },
  {
    id: "grafica",
    title: "Grafica",
    banner: "Progetti di Grafica",
    desc: "Design, illustrazioni e lavori creativi.",
    gallery: [
      { img: "/images/grafica1.jpg", text: "Poster" },
      { img: "/images/grafica2.jpg", text: "Logo" },
      { img: "/images/grafica3.jpg", text: "Illustrazione" }
    ]
  },
  {
    id: "video",
    title: "Video",
    banner: "Produzioni Video",
    desc: "Alcuni lavori video e montaggi.",
    gallery: [
      { img: "/images/video1.jpg", text: "Corto 1" },
      { img: "/images/video2.jpg", text: "Corto 2" },
      { img: "/images/video3.jpg", text: "Corto 3" }
    ]
  }
]

const PortfolioModal: React.FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0])
  const [bgYellow, setBgYellow] = useState(false)
  const contactRef = useRef<HTMLDivElement | null>(null)
  const topRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (contactRef.current) {
        const rect = contactRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        setBgYellow(rect.top < windowHeight / 2)
      }
    }

    document.querySelector(".portfolio-root")?.addEventListener("scroll", handleScroll)
    return () =>
      document.querySelector(".portfolio-root")?.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeTab])

  return (
    <div className={`portfolio-root ${bgYellow ? "yellow" : ""}`}>
      <div className="portfolio-card" ref={topRef}>
        {/* Кнопка закрытия */}
        <button className="portfolio-close" onClick={onClose}>×</button>

        {/* Заголовок и описание */}
        <div className="portfolio-header-container">
          <h1>{activeTab.title}</h1>
          <p>{activeTab.desc}</p>
        </div>

        {/* Белая плашка */}
        <div className="portfolio-banner">
          <span className="banner-icon">★</span>
          <span className="banner-text">{activeTab.banner}</span>
        </div>

        {/* Галерея */}
        <div className="portfolio-gallery">
          {activeTab.gallery.map((item, i) => (
            <div key={i} className="portfolio-item">
              <img src={item.img} alt={item.text} />
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Контакты под галереей */}
        <div className="portfolio-contact" ref={contactRef}>
          <h2>Контакты</h2>
          <p>Оставьте свои данные и я обязательно вам отвечу!</p>
          <form className="contact-form">
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Messaggio"></textarea>
            <button type="submit">Отправить</button>
          </form>
        </div>
      </div>

      {/* Фиксированные табы */}
      <div className="portfolio-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-pill ${activeTab.id === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.title}
          </button>
        ))}

        <div className="tab-arrows">
          <button onClick={() => {
            const idx = tabs.findIndex((t) => t.id === activeTab.id)
            setActiveTab(tabs[(idx - 1 + tabs.length) % tabs.length])
          }}>&lt;</button>
          <button onClick={() => {
            const idx = tabs.findIndex((t) => t.id === activeTab.id)
            setActiveTab(tabs[(idx + 1) % tabs.length])
          }}>&gt;</button>
        </div>
      </div>
    </div>
  )
}

export default PortfolioModal