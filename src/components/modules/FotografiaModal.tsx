import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./FotografiaModal.css";

type Props = {
  onClose: () => void;
};

const stepsData = [
  { title: "Заявка", description: "Вы оставляете заявку и мы связываемся с вами.", icon: "📩" },
  { title: "Договор", description: "Обсуждаем проект и подписываем договор.", icon: "📝" },
  { title: "Разработка", description: "Создаём дизайн, верстку и функционал.", icon: "💻" },
  { title: "Запуск", description: "Публикуем сайт и остаёмся на связи.", icon: "🚀" },
];

const FotografiaModal: React.FC<Props> = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const children = Array.from(containerRef.current.children) as HTMLElement[];
    const scrollTop = containerRef.current.scrollTop;
    const heights = children.map(c => c.offsetTop);
    const index = heights.findIndex((top, i) => {
      const nextTop = heights[i + 1] ?? Infinity;
      return scrollTop >= top - 50 && scrollTop < nextTop - 50;
    });
    if (index >= 0) setActiveStep(index);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="fullscreen-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="overlay" onClick={onClose}></div>

      <motion.div
        className="modal-container"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Заголовок */}
        <h1 className="modal-main-title">
          Привет! Сейчас расскажу, как всё происходит
        </h1>
        <hr className="divider" />

        {/* Контент с блоками */}
        <div className="blocks-wrapper" ref={containerRef}>
          {stepsData.map((step, idx) => (
            <div className="step-block" key={idx}>
              <div className="step-left">
                <h2 className="step-title">{step.title}</h2>
                <p className="step-desc">{step.description}</p>
              </div>
              <div className="step-center">
                <div className="step-image">{step.icon}</div>
              </div>
            </div>
          ))}

          {/* Форма заявки в последнем блоке */}
          <div className="step-block form-block">
            <h2 className="step-title">Оставьте заявку</h2>
            <motion.form
              className="animated-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input type="text" placeholder="Ваше имя" required />
              <input type="email" placeholder="Ваш Email" required />
              <textarea placeholder="Расскажите о проекте"></textarea>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">
                Отправить заявку
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Вертикальный прогресс-бар справа */}
        <div className="vertical-progress">
          {stepsData.map((step, idx) => (
            <div className="progress-item" key={idx}>
              <div className={`dot ${idx <= activeStep ? "active" : ""}`}></div>
              <span>{step.title}</span>
            </div>
          ))}
          <div className="progress-line"></div>
        </div>

        <button className="close-btn" onClick={onClose}>✕</button>
      </motion.div>
    </motion.div>
  );
};

export default FotografiaModal;