import React, { createContext, useState, useContext } from "react";
import enUS from "../utils/label/en-us";
import ptBR from "../utils/label/pt-br";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [Labels, setLanguage] = useState(ptBR);
  

  const toggleLanguage = () => {
    const newLanguage = Labels === enUS ? ptBR : enUS;
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ Labels, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
