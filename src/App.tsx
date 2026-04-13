import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Jelovnik from './pages/Jelovnik';
import KartaPica from './pages/KartaPica';
import { AppProvider, useAppContext } from './context/AppContext';
import './App.css';

// Komponenta koja osluškuje temu da bi postavila boju pozadine celog sajta
const AppContent = () => {
  const { theme } = useAppContext();
  
  return (
    <>
    
    
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1e293b] text-slate-200' : 'bg-white text-slate-800'}`}>
      
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Redirekcija sa root-a na jelovnik */}
          <Route path="/" element={<Navigate to="/jelovnik" replace />} />
          <Route path="/karta-pica" element={<KartaPica />} />
          <Route path="/jelovnik" element={<Jelovnik />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
