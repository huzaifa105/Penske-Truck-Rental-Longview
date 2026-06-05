import React, { useState } from 'react';
import { Phone, Clock, ShieldAlert, Award, Star, Truck, Menu, X, Calendar } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  setSelectedVehicleId?: (id: string | null) => void;
}

export default function Header({ currentPage, setCurrentPage, setSelectedVehicleId }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Fleet & Vehicle Catalog', id: 'fleet' },
    { label: 'Commercial & Rental Services', id: 'services' },
    { label: 'Reservations', id: 'reservations' },
    { label: 'About Us', id: 'about' },
    { label: 'FAQs & Policies', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    if (setSelectedVehicleId) setSelectedVehicleId(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full z-50 relative flex flex-col font-sans" id="site-header">
      {/* Top Banner Bar */}
      <div className="bg-[#0D1B2A] text-white text-xs border-b border-navy-light/60 py-2.5 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-4 text-center md:text-left justify-center">
          <span className="flex items-center gap-1.5 text-[#C0C7D1]">
            <Clock className="w-3.5 h-3.5 text-[#D62828]" />
            Mon - Sat: 7:00 AM - 6:00 PM | Sun: Closed
          </span>
          <span className="h-3 w-px bg-white/20 hidden md:inline"></span>
          <span className="flex items-center gap-1.5 text-white/90">
            <ShieldAlert className="w-3.5 h-3.5 text-[#D62828] animate-pulse" />
            24/7 Emergency Assistance: <strong className="text-white">+1 (903) 236-0099</strong>
          </span>
        </div>
        <div className="flex items-center gap-4 text-center justify-center">
          <span className="text-[#C0C7D1] hidden lg:inline flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500 inline" /> Promo:
            <span className="text-[#FFFFFF] underline ml-1">Weekly bookings save up to 15%</span>
          </span>
          <span className="h-3 w-px bg-white/20 hidden lg:inline"></span>
          <span className="text-xs bg-[#D62828]/90 text-white font-semibold py-0.5 px-2 rounded tracking-wide">
            COMMERCIAL DISCOUNTS
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="bg-white text-[#0D1B2A] border-b-4 border-[#D62828] py-4 px-4 md:px-8 flex items-center justify-between sticky top-0 shadow-md z-40 transition-all" id="site-header-main-bar">
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="bg-[#0D1B2A] p-2 rounded-none border-2 border-[#D62828] transition-all group-hover:bg-[#D62828]">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black italic leading-none tracking-tighter text-[#0D1B2A]">
              BUFKIN<span className="text-[#D62828]">TRUCK</span>
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] text-[#8D99AE] uppercase leading-none mt-1">
              SERVICES & LOGISTICS
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-bold text-xs uppercase tracking-wider">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-none text-xs font-black uppercase tracking-widest transition-all duration-150 relative ${
                  isActive
                    ? 'text-[#D62828] bg-[#F5F7FA]'
                    : 'text-[#0D1B2A] hover:text-[#D62828] hover:bg-[#F5F7FA]/60'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#D62828]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Call to action & Click-to-call */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href="tel:+19032360099"
            id="click-to-call-tel"
            className="flex items-center gap-2 group text-left px-2 py-1 transition-all"
          >
            <div className="bg-[#F5F7FA] p-2 rounded-none text-[#0D1B2A] group-hover:bg-[#D62828] group-hover:text-white transition-all border border-[#C0C7D1]">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-[#8D99AE] uppercase font-black tracking-widest leading-none">Click to Call</p>
              <p className="text-base font-black text-[#0D1B2A] tracking-tighter leading-none mt-1.5">+1 (903) 236-0099</p>
            </div>
          </a>

          <button
            id="header-btn-reserve"
            onClick={() => handleNavClick('reservations')}
            className="bg-[#D62828] hover:bg-[#b02020] text-white text-xs font-black px-6 py-3.5 rounded-none transition-colors tracking-widest uppercase flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Reserve Now
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#0D1B2A] hover:bg-gray-100 rounded-lg transition-all"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 shadow-xl transition-all duration-300 absolute top-full left-0 right-0 z-50">
          <div className="p-4 space-y-2 flex flex-col">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-none text-xs font-black uppercase tracking-widest transition-all ${
                    isActive
                      ? 'bg-[#F5F7FA] text-[#D62828] border-l-4 border-[#D62828] pl-3'
                      : 'text-[#0D1B2A] hover:bg-[#F5F7FA]/40 hover:text-[#D62828]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t-2 border-[#0D1B2A] space-y-3">
              <a
                href="tel:+19032360099"
                className="flex items-center gap-3 p-3 bg-[#F5F7FA] rounded-none border border-[#C0C7D1] text-[#0D1B2A] hover:text-[#D62828]"
              >
                <Phone className="w-5 h-5 text-[#D62828]" />
                <div>
                  <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wide">Emergency Fleet Assistance</p>
                  <p className="text-sm font-black text-[#0D1B2A]">+1 (903) 236-0099</p>
                </div>
              </a>
              <button
                onClick={() => handleNavClick('reservations')}
                className="w-full bg-[#D62828] text-white py-3.5 px-4 rounded-none text-xs font-black tracking-widest uppercase shadow border-2 border-[#D62828] hover:bg-[#b02020] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Reserve Truck Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
