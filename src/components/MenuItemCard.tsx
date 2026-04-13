import { useAppContext } from '../context/AppContext';
import type { MenuItem } from '../types';

interface Props {
  item: MenuItem,
  theme: string
}

const MenuItemCard = ({ item,theme }: Props) => {

  const isDark = theme === 'dark';

  const {formatPrice} = useAppContext();

  const formattedPrice=formatPrice(item.cena)

  // const formattedPrice = language === 'en'
  //   ? `€${(item.cena / 117).toFixed(2)}`  // primer kursa
  //   : `${item.cena} din`;

  return (
    <div className={` border border-slate-100 shadow-sm rounded-xl p-5 mb-4 hover:shadow-md transition-shadow
          ${isDark 
            ? 'bg-slate-300 border-slate-300 hover:bg-slate-300' 
            : 'bg-slate-100 border-slate-100 hover:bg-slate-100'
          }`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-serif font-bold text-slate-800 uppercase tracking-wide">
          {item.naziv}
        </h3>
        <span className="text-[#1a5c96] font-bold text-lg whitespace-nowrap ml-4">
          {formattedPrice} 
        </span>
      </div>
      <p className={`text-sm leading-relaxed ${isDark ? "text-slate-700" : "text-slate-500"}`}>
        {item.opis}
      </p>
    </div>
  );
};

export default MenuItemCard;