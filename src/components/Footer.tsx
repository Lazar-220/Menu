import { useAppContext } from '../context/AppContext';

const Footer = () => {
  const { theme, t } = useAppContext();
  
  return (
    <footer className={`footer-wrapper py-6 text-center text-sm transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a] text-slate-400 border-t border-slate-800' : 'bg-slate-50 text-slate-500 border-t border-slate-200'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()}. Thalassa. {t('rights')}.</p>
        <p className="mt-1 font-medium">{t('phone')}: +381 60 123 4567</p>
      </div>
    </footer>
  );
};

export default Footer;