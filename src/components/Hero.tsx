import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Hero.css";

type Props = { 
  onEnter: () => void; 
  onNextScreen: () => void; 
}

const Hero: React.FC<Props> = ({ onEnter, onNextScreen }) => {
  const handleScroll = () => onNextScreen();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) onNextScreen();
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onNextScreen]);

  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="hero-left">
        <div className="hero-content">
          <motion.div
            className="hero-tag"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="developer-btn">Developer</div>
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Minikaev Artem
          </motion.h1>

          <motion.p
            className="lead"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Добро пожаловать в моё портфолио. Тут я изобретаю новое и показываю свои работы. Спасибо что посетили мой сайт!
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button className="btn-pill ghost" onClick={handleScroll}>SCROLL</button>
            <button className="btn-pill" onClick={onEnter}>ENTER</button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-bottom-indicator"
        style={{ right: 50, bottom: 150 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        |
      </motion.div>
    </motion.section>
  )
}

export default Hero;