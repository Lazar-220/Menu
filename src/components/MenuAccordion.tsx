// import { useState } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import MenuItemCard from './MenuItemCard';
import type { MenuItem } from '../types';

interface Props {
  title: string;
  items: MenuItem[];
  isOpen?: boolean;
  onClick: () => void;   // prima od parenta
  theme: string
}

const MenuAccordion = ({ title, items, isOpen = false,onClick ,theme}: Props) => {

  const isDark = theme === 'dark';
  return (
    
    <div className="mb-4">
      <button
        onClick={onClick}
        className={`w-full border rounded-2xl p-5 flex justify-between items-center transition-colors
          ${isDark 
            ? 'bg-slate-400 border-slate-400 hover:bg-slate-400' 
            : 'bg-slate-100 border-slate-100 hover:bg-slate-100'
          }`}
      >
        <h2 className={`text-xl font-serif font-bold ${isDark ? 'text-slate-500' : 'text-slate-900'}`}>
          {title}
        </h2>
        <div className={`p-2 rounded-full transition-colors ${isDark ? 'text-slate-800' : 'text-slate-500'}`}>
          {isOpen ? <FiArrowUp size={20} /> : <FiArrowDown size={20} />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pl-2 pr-2 sm:pl-4 sm:pr-4">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} theme={theme} />  
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuAccordion;