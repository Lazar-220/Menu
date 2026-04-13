import { useEffect, useRef, useState } from 'react';
import { supabase } from '../database/supabase';
import MenuAccordion from '../components/MenuAccordion';
import type { MenuItem } from '../types';
import { useAppContext } from '../context/AppContext';

const KartaPica = () => {

  const {theme,language}=useAppContext();

  const [groupedMenu, setGroupedMenu] = useState<Record<string, MenuItem[]>>({}); //Record<key,val>, kao dict u python-u
                                                                                  //useState<T>({}), genericki tip koji sluzi da se postavi tacan tip podatka(ne da se zakljucje na osnovu pocetne vrednosti)
  const [loading, setLoading] = useState(true);

  //
  const [activeCategory, setActiveCategory] = useState<string | null>(null);  //tip moze biti ili string ili null
  //

  // Objekat koji čuva ref za svaku kategoriju
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const KATEGORIJE_PICA = [
    'Kafa i specijaliteti',
    'Topli napici',
    'Ceđeni sokovi',
    'Shakes/Frappe',
    'Vode',
    'Sokovi',
    'Energetska pića',
    'Cideri',
    'Piva',
    'Vodka',
    'Tequila',
    'Gin',
    'Rum',
    'Likeri',
    'Žestoka pića',
    'Whisky',
    'Single Malt Whisky',
    'Bourbon Whisky',
    'Cognac',
    'Cigars',
    'Kokteli',
    ];

    const KATEGORIJE_PICA_ENG = [
    'Coffee & Specialties',
    'Hot Drinks',
    'Fresh Juices',
    'Shakes/Frappe',
    'Water',
    'Soft Drinks',
    'Energy Drinks',
    'Ciders',
    'Beers',
    'Vodka',
    'Tequila',
    'Gin',
    'Rum',
    'Liqueurs',
    'Spirits',
    'Whisky',
    'Single Malt Whisky',
    'Bourbon Whisky',
    'Cognac',
    'Cigars',
    'Cocktails',
    ];

  //
  const toggleCategory = (categoryName: string) => {

    const isOpening = activeCategory !== categoryName;
    
    // Ako klikneš otvorenu -> zatvori je (null), inače otvori novu
    setActiveCategory(prev => prev === categoryName ? null : categoryName);

    // Skroluj samo ako se otvara (ne pri zatvaranju)
    if (isOpening) {
        setTimeout(() => {
            const el = categoryRefs.current[categoryName];
            if (!el) return;

            const navbarHeight = 80; // ~ visina navbara u px
            const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16; // 16px padding

            // ^kako bismo dobili tacku na koju se stranica pozicionira kad se kartica za kategoriju zatvori
            window.scrollTo({ top, behavior: 'smooth' });
        }, 50);
    }
  };
  //

  useEffect(() => {
    const fetchMenu = async () => {
      try {

        const tableName = language === 'en' ? 'menu_items_eng' : 'menu_items';
        const kategorije = language === 'en' ? KATEGORIJE_PICA_ENG : KATEGORIJE_PICA;

        const { data, error } = await supabase  // podaci idu u data, ako dodje do greske ona ide u error
          .from(tableName)
          .select('*')
          .in('kategorija',kategorije); //SELECT * FROM menu_items WHERE kategorija IN ('pice', 'hrana', 'desert');


        if (error) throw error;

        // Grupisanje podataka po kategoriji
        if (data) {
          const grouped = data.reduce((acc, item: MenuItem) => {
            const category = item.kategorija || 'Ostalo';            //ako nema kategorije postavlja se string 'Ostalo'
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(item);
            return acc;
          }, {} as Record<string, MenuItem[]>);

          setGroupedMenu(grouped);

          // Nađi koji index je trenutno aktivna kategorija u starom jeziku
          // pa otvori isti index u novom jeziku
          const stareKategorije = language === 'en' ? KATEGORIJE_PICA : KATEGORIJE_PICA_ENG;
          const noveKategorije = language === 'en' ? KATEGORIJE_PICA_ENG : KATEGORIJE_PICA;
          
          const stariIndex = activeCategory 
            ? stareKategorije.indexOf(activeCategory) 
            : 0;
          
          const novaKategorija = stariIndex !== -1 
            ? noveKategorije[stariIndex] 
            : Object.keys(grouped)[0];

          setActiveCategory(novaKategorija ?? Object.keys(grouped)[0] ?? null);
        }
      } catch (error) {
        console.error("Greška pri učitavanju menija:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [language]);

  if (loading) {
    return <div className="text-center mt-20 text-slate-500">Učitavanje karte pića...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 text-left">
      {Object.entries(groupedMenu).map(([categoryName, items]) => (
        <div
        key={categoryName}
        ref={el => { categoryRefs.current[categoryName] = el; }}
        >
            <MenuAccordion 
            key={categoryName} 
            title={categoryName} 
            items={items} 
            isOpen={activeCategory === categoryName}   // <- šalje se status otvorenosti
            onClick={() => toggleCategory(categoryName)} // <- šalje se handler
            theme={theme}
            />
        </div>
        
      ))}
    </div>
  );
};

export default KartaPica;