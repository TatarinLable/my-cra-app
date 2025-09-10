import React from "react";
import { Project } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectModal.css";

type Props = {
  project: Project;
  onClose: () => void;
  children?: React.ReactNode; // для кастомного контента внутри модалки
};

const ProjectModal: React.FC<Props> = ({ project, onClose, children }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* затемнение фона */}
        <div className="modal-overlay" onClick={onClose} />

        {/* карточка модалки */}
        <motion.div
          className="modal-card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          {/* контент внутри */}
          {children ? (
            children
          ) : (
            <div className="modal-grid">
              <div className="modal-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="modal-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button className="btn-pill">Apri Pagina</button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;