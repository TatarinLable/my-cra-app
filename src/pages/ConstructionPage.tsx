import React from "react";
import "./ConstructionPage.css";

const ConstructionPage: React.FC = () => {
  return (
    <div className="construction-page">
      <h1>Строительство сайта</h1>
      <p>Смотрите, как маленькие пиксельные человечки работают над вашим сайтом!</p>

      <div className="construction-area">
        <div className="worker-1"></div>
        <div className="worker-2"></div>
        <div className="worker-3"></div>

        <div className="block-1"></div>
        <div className="block-2"></div>
        <div className="block-3"></div>
      </div>
    </div>
  );
};

export default ConstructionPage;