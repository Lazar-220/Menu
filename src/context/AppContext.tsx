import { createContext, useState, useContext, useEffect } from 'react';

import type {ReactNode} from 'react'

type Theme = 'light' | 'dark';
type Language = 'sr' | 'en';

// 1. tip na osnovu ključeva iz tvog translations objekta
type TranslationKey = keyof typeof translations['sr'];

// 2. interfejs koristi taj tip umesto običnog 'string'
interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  formatPrice: (priceDin: number) => string;
  t: (key: TranslationKey) => string; // 
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  sr: {
    drinks: 'Karta pića',
    food: 'Jelovnik',
    rights: 'Sva prava zadržana',
    phone: 'Telefon'
  },
  en: {
    drinks: 'Drinks Menu',
    food: 'Food Menu',
    rights: 'All rights reserved',
    phone: 'Phone'
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('sr');

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage((prev) => (prev === 'sr' ? 'en' : 'sr'));

  // Logika za konverziju valute (1 EUR = ~117.5 DIN)
  const formatPrice = (priceDin: number) => {
    if (language === 'en') {
      const priceEur = (priceDin / 117.5).toFixed(2);
      return `€${priceEur}`;
    }
    return `${priceDin} din`;
  };

//   const t = (key: keyof typeof translations['sr']) => translations[language][key];
  const t = (key: TranslationKey) => translations[language][key];

  // Primena tamne teme na body element (za teget pozadinu)
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, formatPrice, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext mora biti unutar AppProvider-a');
  return context;
};