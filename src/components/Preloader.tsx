import React, { useEffect, useState } from "react";
import "./Preloader.css";

interface PreloaderProps {
  onFinish: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true); // запускаем fade-out
      setTimeout(() => onFinish(), 600); // дожидаемся окончания fade-out
    }, 2200); // время раскрытия
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`preloader ${hide ? "preloader--hide" : ""}`}>
      <div className="mask top"></div>
      <div className="mask bottom"></div>
    </div>
  );
};

export default Preloader;