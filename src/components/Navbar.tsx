import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMoon, FiSun, FiCoffee } from 'react-icons/fi';
import { MdOutlineRestaurantMenu } from 'react-icons/md'; // Za ikonicu hrane
import { useAppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, language, toggleLanguage, t } = useAppContext();

  // Logika za mobilni prekidač stranica
  const isJelovnik = location.pathname.includes('jelovnik');
  const handleMobileSwitch = () => {
    if (isJelovnik) navigate('/karta-pica');
    else navigate('/jelovnik');
  };

  return (
    <nav className={`navbar-wrapper sticky top-0 z-50 shadow-sm transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a] border-b border-slate-700' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/jelovnik" className={`text-2xl font-serif font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-[#1a5c96]'}`}>
              Thalassa 
            </Link>
          </div>
          
          {/* Desna strana: Linkovi (Desktop) + Kontrole */}
          <div className="flex items-center gap-4">
            
            {/* Desktop Linkovi - Prikazuju se jedan pored drugog, skriveni na mobilnom */}
            <div className="hidden md:flex items-center gap-6 mr-4 font-medium">
              <Link 
                to="/karta-pica" 
                className={`nav-link ${location.pathname === '/karta-pica' ? 'active' : ''} ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#1a5c96]'}`}
              >
                {t('drinks')}
              </Link>
              <Link 
                to="/jelovnik" 
                className={`nav-link ${location.pathname === '/jelovnik' ? 'active' : ''} ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-[#1a5c96]'}`}
              >
                {t('food')}
              </Link>
            </div>

            {/* Kontrole: Jezik, Tema, i Mobilni Prekidač */}
            <div className="flex items-center gap-2 border-l pl-4 border-slate-300 dark:border-slate-600">
              
              {/* Jezik Toggle */}
              <button onClick={toggleLanguage} className="control-btn font-bold text-sm">
                {language === 'sr' ? 'EN' : 'SR'}
              </button>

              {/* Tema Toggle */}
              <button onClick={toggleTheme} className="control-btn">
                {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              {/* Mobilni Page Switch - Prikazuje se samo na mobilnom */}
              <button 
                onClick={handleMobileSwitch} 
                className="control-btn md:hidden ml-2 bg-[#1a5c96] text-white hover:bg-[#13426b] dark:bg-blue-600 dark:hover:bg-blue-500"
                aria-label="Promeni stranicu"
              >
                {isJelovnik ? <FiCoffee size={20} /> : <MdOutlineRestaurantMenu size={20} />}
              </button>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;