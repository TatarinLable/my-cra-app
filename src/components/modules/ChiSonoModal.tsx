import React from "react";
import { motion } from "framer-motion";
import "./ChiSonoModal.css";

type Props = {
  onClose: () => void;
};

const ChiSonoModal: React.FC<Props> = ({ onClose }) => {
  return (
    <motion.div
      className="modal-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Полупрозрачный фон */}
      <div className="modal-overlay" onClick={onClose} />

      {/* Попап по центру */}
      <motion.div
        className="modal-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="modal-content">
          <div className="modal-emoji">💻🎨</div>
          <h2 className="modal-title">Привет, я Артём!</h2>
          <p className="modal-text">
            Я разрабатываю сайты и занимаюсь дизайном.  
            Скоро вы увидите мои новые проекты! Приношу извинения за ожидание.
          </p>
          <button className="close-btn" onClick={onClose}>Закрыть</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChiSonoModal;