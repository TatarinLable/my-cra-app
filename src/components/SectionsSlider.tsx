import React, { useRef } from "react";
import { Project } from "../types";
import { motion, PanInfo } from "framer-motion";
import "./SectionsSlider.css";

type Section = { id: string; title: string; type: "projects"; projects: Project[] };

type Props = {
  sections: Section[];
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  onOpenProject: (p: Project) => void;
};

const SectionsSlider: React.FC<Props> = ({ sections, current, setCurrent, onOpenProject }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const onNext = () => setCurrent(i => Math.min(sections.length - 1, i + 1));
  const onPrev = () => setCurrent(i => Math.max(0, i - 1));

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -200) {
      // Свайп влево → следующий слайд
      onNext();
    } else if (offset > 50 || velocity > 200) {
      // Свайп вправо → предыдущий слайд
      onPrev();
    }
  };

  return (
    <div className="sections-slider">
      {/* Controls */}
      <div className="slider-controls lower-center">
        <div className="controls-group">
          <button className="nav-pill" onClick={onPrev} disabled={current === 0}>&lt;</button>
          <button className="nav-pill" onClick={onNext} disabled={current === sections.length - 1}>&gt;</button>
        </div>
        <span className="current-section">{sections[current].title}</span>
      </div>

      {/* Карусель */}
      <div className="carousel-wrapper">
        <motion.div
          ref={trackRef}
          className="carousel-track"
          drag="x"
          dragConstraints={{ left: -((sections.length - 1) * 344), right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${current * 344}px` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {sections.map((sec, index) => {
            const project = sec.projects[0];
            const isActive = index === current;
            return (
              <div
                key={sec.id}
                className={`carousel-slide ${isActive ? "active" : ""}`}
              >
                <img src={project.image} alt={project.title} className="section-image" />
                <h2 className="section-title">{project.title}</h2>
                <p className="section-content">{project.description}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Кнопка APRI PAGINA */}
        <button
          className="btn-pill fixed-apri"
          onClick={() => onOpenProject(sections[current].projects[0])}
        >
          Открыть страницу
        </button>
      </div>

      {/* Соцсети */}
      <div className="social-icons">
        <a href="https://t.me/" target="_blank" rel="noreferrer">TG</a>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer">IG</a>
        <a href="mailto:test@mail.com">✉</a>
      </div>
    </div>
  );
};

export default SectionsSlider;