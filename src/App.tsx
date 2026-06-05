import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import FleetView from './components/FleetView';
import ServicesView from './components/ServicesView';
import ReservationsView from './components/ReservationsView';
import AboutView from './components/AboutView';
import FAQView from './components/FAQView';
import ContactView from './components/ContactView';
import { Truck, Phone, MapPin, Clock, Award, ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  
  // Connects quick-availability inputs from hero directly into Reservations
  const [quickSearchData, setQuickSearchData] = useState<{
    pickupDate: string;
    returnDate: string;
    category: string;
  } | null>(null);

  // Router switcher
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomeView 
            setCurrentPage={setCurrentPage} 
            setSelectedVehicleId={setSelectedVehicleId}
            setQuickSearchData={setQuickSearchData}
          />
        );
      case 'fleet':
        return (
          <FleetView 
            setCurrentPage={setCurrentPage} 
            setSelectedVehicleId={setSelectedVehicleId} 
            selectedVehicleId={selectedVehicleId}
          />
        );
      case 'services':
        return (
          <ServicesView 
            setCurrentPage={setCurrentPage} 
            setSelectedVehicleId={setSelectedVehicleId}
          />
        );
      case 'reservations':
        return (
          <ReservationsView 
            selectedVehicleId={selectedVehicleId} 
            setSelectedVehicleId={setSelectedVehicleId}
            quickSearchData={quickSearchData}
            setQuickSearchData={setQuickSearchData}
          />
        );
      case 'about':
        return <AboutView setCurrentPage={setCurrentPage} />;
      case 'faq':
        return <FAQView />;
      case 'contact':
        return <ContactView />;
      default:
        return (
          <HomeView 
            setCurrentPage={setCurrentPage} 
            setSelectedVehicleId={setSelectedVehicleId} 
          />
        );
    }
  };

  const handleFooterLinkClick = (pageId: string) => {
    setCurrentPage(pageId);
    setSelectedVehicleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 selection:bg-[#D62828] selection:text-white" id="main-application-frame">
      {/* Dynamic Header */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        setSelectedVehicleId={setSelectedVehicleId} 
      />

      {/* Primary Content View Switcher */}
      <main className="flex-grow bg-white relative">
        {renderPage()}
      </main>

      {/* Premium Heavy-Duty Footer */}
      <footer className="bg-[#0D1B2A] text-white border-t-4 border-[#D62828] font-sans relative overflow-hidden" id="site-footer">
        {/* Shine accent background */}
        <div className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600')" }}></div>

        <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-left">
          
          {/* Brand Info (Col 1) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-[#D62828] p-2 rounded">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-black text-lg tracking-tight uppercase">BUFKIN TRUCK SERVICES</span>
            </div>
            <p className="text-[#C0C7D1] text-xs leading-relaxed max-w-sm font-normal">
              East Texas preferred commercial-grade fleet operator. Supplying pristine non-CDL pickups, medium flatbeds, stake beds, and dock-high Freightliner logistics rigs with 24/7 road assistance support.
            </p>
            <div className="flex gap-4 items-center">
              <span className="text-[10px] bg-[#1B263B] text-white font-bold py-1 px-2.5 rounded border border-white/5 uppercase">
                Est. 1996 | Longview TX
              </span>
              <span className="text-[10px] text-[#D62828] font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
                ● 24/7 Road Support Active
              </span>
            </div>
          </div>

          {/* Quick links: Col 2 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-widest border-b border-white/10 pb-2">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-[#C0C7D1]">
              <button onClick={() => handleFooterLinkClick('home')} className="hover:text-white transition-all text-left">Home Base</button>
              <button onClick={() => handleFooterLinkClick('about')} className="hover:text-white transition-all text-left">About Us</button>
              <button onClick={() => handleFooterLinkClick('fleet')} className="hover:text-white transition-all text-left">Fleet Catalog</button>
              <button onClick={() => handleFooterLinkClick('faq')} className="hover:text-white transition-all text-left font-semibold">Rental Policies</button>
              <button onClick={() => handleFooterLinkClick('services')} className="hover:text-white transition-all text-left">Commercial Info</button>
              <button onClick={() => handleFooterLinkClick('contact')} className="hover:text-white transition-all text-left">Help & Contact</button>
            </div>
          </div>

          {/* Business links: Col 3 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-widest border-b border-white/10 pb-2">Reserve Now</h4>
            <div className="flex flex-col gap-2 text-xs text-[#C0C7D1]">
              <button onClick={() => handleFooterLinkClick('reservations')} className="hover:text-[#D62828] transition-all text-left font-bold">● Book Online Platform</button>
              <button 
                onClick={() => {
                  setCurrentPage('contact');
                  setTimeout(() => {
                    const el = document.getElementById('commercial-quote-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="hover:text-[#D62828] transition-all text-left"
              >
                ● Request Heavy Quote
              </button>
              <a href="tel:+19032360099" className="hover:text-[#D62828] transition-all text-left">● Direct Dispatch Call</a>
              <span className="text-[10px] text-gray-400 font-normal italic mt-1">Hassle-Free Texas Rentals</span>
            </div>
          </div>

          {/* Operational office: Col 4 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-black text-xs text-white uppercase tracking-widest border-b border-white/10 pb-2">Depot Contact</h4>
            <div className="space-y-3.5 text-xs text-[#C0C7D1] font-normal">
              
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
                <span>3132 TX-31, Longview, TX 75603</span>
              </div>

              <div className="flex gap-2.5 items-start">
                <Phone className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
                <a href="tel:+19032360099" className="font-bold text-white hover:underline">+1 (903) 236-0099</a>
              </div>

              <div className="flex gap-2.5 items-start">
                <Clock className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
                <span>Mon - Sat: 7 AM - 6 PM | Sunday: Dropbox</span>
              </div>

            </div>
          </div>

        </div>

        {/* Lower Banner, Credits, and Legal Copyrights */}
        <div className="bg-[#08101a] py-6 px-4 md:px-8 border-t border-white/5 text-xs text-[#8D99AE]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="font-normal">
              © {currentYear} Bufkin Truck Services. All rights reserved. Registered Texas DOT Fleet Operator.
            </p>
            <div className="flex items-center gap-1 font-semibold text-white">
              <span className="text-[#8D99AE] font-normal">Developed by</span>
              <span className="text-[#D62828] font-bold tracking-wider font-display text-[11px] uppercase">Serwizen</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
