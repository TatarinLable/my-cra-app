import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SectionsSlider from "./components/SectionsSlider";
import OrientationWarning from "./components/OrientationWarning";
import { Project } from "./types";
import bg from "./assets/bg.jpg";
import { AnimatePresence, motion } from "framer-motion";

// Импортируем модалки
import ChiSonoModal from "./components/modules/ChiSonoModal";
import GraficaModal from "./components/modules/GraficaModal";
import FotografiaModal from "./components/modules/FotografiaModal";
import CodingModal from "./components/modules/CodingModal";
import PortfolioModal from "./components/modules/PortfolioModal";

// Прелоадер
import Preloader from "./components/Preloader";

// Данные проектов
const aboutProjects: Project[] = [
  { id: 0, title: "Chi Sono", image: "/assets/about-thumb.jpg", description: "Ciao! Sono Federico Menegoi." },
];
const graficaProjects: Project[] = [
  { id: 1, title: "Grafica 1", image: "/assets/thumb1.jpg", description: "Descrizione grafica 1" },
];
const fotografiaProjects: Project[] = [
  { id: 2, title: "Foto 1", image: "/assets/thumb3.jpg", description: "Descrizione fotografia 1" },
];
const codingProjects: Project[] = [
  { id: 3, title: "App 1", image: "/assets/thumb5.jpg", description: "Descrizione app 1" },
];
const portfolioProjects: Project[] = [
  { id: 4, title: "Portfolio Work", image: "/assets/thumb7.jpg", description: "Descrizione portfolio" },
];

const SECTIONS = [
  { id: "about", title: "Обо мне", type: "projects" as const, projects: aboutProjects },
  { id: "grafica", title: "Графика", type: "projects" as const, projects: graficaProjects },
  { id: "fotografia", title: "Фотография", type: "projects" as const, projects: fotografiaProjects },
  { id: "coding", title: "Кодинг", type: "projects" as const, projects: codingProjects },
  { id: "portfolio", title: "Портфолио", type: "projects" as const, projects: portfolioProjects },
];

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [mode, setMode] = useState<"hero" | "slider">("hero");
  const [currentSection, setCurrentSection] = useState(0);
  const [openModule, setOpenModule] = useState<string | null>(null);

  // Прелоадер скрываем через 3 секунды
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Клавиши Enter / Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && mode === "hero") setMode("slider");
      if (e.key === "Escape") setOpenModule(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  // Блокируем скролл при открытой модалке
  useEffect(() => {
    document.body.classList.toggle("no-scroll", !!openModule);
  }, [openModule]);

  // Открываем модуль по title
  const handleOpenModule = (title: string) => {
    switch (title) {
      case "Chi Sono": setOpenModule("chiSono"); break;
      case "Grafica 1": setOpenModule("grafica"); break;
      case "Foto 1": setOpenModule("fotografia"); break;
      case "App 1": setOpenModule("coding"); break;
      case "Portfolio Work": setOpenModule("portfolio"); break;
      default: setOpenModule(null);
    }
  };

  const handleNextScreen = () => setMode("slider");

  return (
    <>
      {/* Прелоадер всегда сверху */}
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      {/* Основной сайт */}
      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <OrientationWarning />
        <Nav
          mode={mode}
          setMode={setMode}
          sections={SECTIONS}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />

        <AnimatePresence mode="wait">
          {mode === "hero" && (
            <motion.div
              key="hero-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Hero onEnter={() => setMode("slider")} onNextScreen={handleNextScreen} />
            </motion.div>
          )}

          {mode === "slider" && (
            <motion.div
              key="slider-screen"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.6 }}
            >
              <SectionsSlider
                sections={SECTIONS}
                current={currentSection}
                setCurrent={setCurrentSection}
                onOpenProject={(p: Project) => handleOpenModule(p.title)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Модалки */}
        {openModule === "chiSono" && <ChiSonoModal onClose={() => setOpenModule(null)} />}
        {openModule === "grafica" && <GraficaModal onClose={() => setOpenModule(null)} />}
        {openModule === "fotografia" && <FotografiaModal onClose={() => setOpenModule(null)} />}
        {openModule === "coding" && <CodingModal onClose={() => setOpenModule(null)} />}
        {openModule === "portfolio" && <PortfolioModal onClose={() => setOpenModule(null)} />}
      </div>
    </>
  );
};

export default App;