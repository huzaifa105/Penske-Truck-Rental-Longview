import React, { useState } from 'react';
import { FLEET_VEHICLES } from '../data/fleet';
import { 
  Building2, ShieldCheck, DollarSign, Clock, ArrowRight, Star, 
  MapPin, Calendar, Truck, UserCheck, HardHat, PhoneCall, Gift, CheckCircle2 
} from 'lucide-react';

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
  setSelectedVehicleId: (id: string | null) => void;
  setQuickSearchData?: (data: {
    pickupDate: string;
    returnDate: string;
    category: string;
  } | null) => void;
}

export default function HomeView({ setCurrentPage, setSelectedVehicleId, setQuickSearchData }: HomeViewProps) {
  // Quick Search state
  const [pickupLocation, setPickupLocation] = useState('Bufkin Longview Depot');
  const [returnLocation, setReturnLocation] = useState('Bufkin Longview Depot');
  const [pickupDate, setPickupDate] = useState('2026-06-10');
  const [returnDate, setReturnDate] = useState('2026-06-15');
  const [vehicleCategory, setVehicleCategory] = useState('Box Trucks');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (setQuickSearchData) {
      setQuickSearchData({
        pickupDate,
        returnDate,
        category: vehicleCategory
      });
    }

    // Attempt to pre-select first vehicle matching the category
    const matched = FLEET_VEHICLES.find(v => v.category === vehicleCategory);
    if (matched) {
      setSelectedVehicleId(matched.id);
    }

    setCurrentPage('reservations');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReserveClick = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setCurrentPage('reservations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDetailsClick = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setCurrentPage('fleet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { title: 'Pickup Trucks', desc: 'Heavy duty beds & towing packages for construction work', count: 'F-250 / F-350 class' },
    { title: 'Cargo Vans', desc: 'Enclosed delivery protection with high roofs for urban parcels', count: '3,700 lb payload cap' },
    { title: 'Box Trucks', desc: 'Hydraulic liftgates and generous vertical space for local logistics', count: '16ft - 24ft options' },
    { title: 'Moving Trucks', desc: 'Sliding roll-out ramps & multi-tier E-track cargo protection', count: '26ft master class' },
    { title: 'Flatbeds', desc: 'Steel platform and gooseneck chassis for open forklift loading', count: 'Up to 11,500 lb load' },
    { title: 'Stake Beds', desc: 'Removable wood panels for flexible nursery & farm work loads', count: '12ft - 14ft options' },
  ];

  return (
    <div className="w-full flex flex-col font-sans" id="home-view-container">
      {/* 1. Hero Banner */}
      <section className="relative bg-[#0D1B2A] text-white py-16 md:py-24 px-4 md:px-8 border-b-8 border-[#D62828] overflow-hidden" id="hero-section">
        <div className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1920')" }}></div>
        {/* Accent reflection / skew background shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 skew-x-[-15deg] translate-x-1/4 opacity-35"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[180px] sm:text-[250px] lg:text-[300px] font-black text-white/5 tracking-tighter uppercase select-none leading-none">BUFKIN</span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-block bg-[#D62828] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
              Premium Transportation Solutions
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[88px] font-black leading-[0.85] uppercase italic text-white tracking-tighter mb-6">
              Reliable<br />Heavy-Duty<br />Rentals.
            </h1>
            <p className="text-[#C0C7D1] text-base md:text-lg max-w-lg mb-8 font-semibold leading-relaxed">
              Dependable commercial fleet solutions for businesses and personal projects throughout East Texas.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => setCurrentPage('reservations')}
                className="bg-white text-[#0D1B2A] px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#C0C7D1] transition-all rounded-none"
              >
                Reserve Online
              </button>
              <button
                onClick={() => setCurrentPage('fleet')}
                className="border-2 border-white text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-[#0D1B2A] transition-all rounded-none"
              >
                View Full Fleet
              </button>
            </div>

            {/* Quick badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 max-w-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#D62828]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#C0C7D1]">Non-CDL Fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#D62828]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#C0C7D1]">Hydraulic Gates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#D62828]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#C0C7D1]">24/7 Road Support</span>
              </div>
            </div>
          </div>

          {/* Quick Booking Search Widget */}
          <div className="lg:col-span-5 bg-white text-[#0D1B2A] p-6 md:p-8 rounded-none shadow-2xl border-t-8 border-[#D62828] flex flex-col w-full relative z-20">
            <div className="border-b border-[#C0C7D1]/50 pb-4 mb-5 text-left">
              <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2 text-[#0D1B2A]">
                <Truck className="w-5 h-5 text-[#D62828]" />
                Check Availability
              </h2>
              <p className="text-[10px] text-[#8D99AE] uppercase font-bold tracking-wider mt-1">Get instant rental estimates for East Texas dispatch</p>
            </div>

            <form onSubmit={handleQuickSearch} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-[#8D99AE] uppercase tracking-wider mb-1">
                    Pickup Location
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full border border-[#C0C7D1] p-3 text-xs font-black bg-[#F5F7FA] rounded-none focus:outline-none focus:border-[#D62828] uppercase"
                  >
                    <option>Bufkin Longview Depot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#8D99AE] uppercase tracking-wider mb-1">
                    Return Location
                  </label>
                  <select
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                    className="w-full border border-[#C0C7D1] p-3 text-xs font-black bg-[#F5F7FA] rounded-none focus:outline-none focus:border-[#D62828] uppercase"
                  >
                    <option>Bufkin Longview Depot</option>
                    <option>One-Way Dispatch Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-[#8D99AE] uppercase tracking-wider mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full border border-[#C0C7D1] p-3 text-xs font-black bg-[#F5F7FA] rounded-none focus:outline-none focus:border-[#D62828] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#8D99AE] uppercase tracking-wider mb-1">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full border border-[#C0C7D1] p-3 text-xs font-black bg-[#F5F7FA] rounded-none focus:outline-none focus:border-[#D62828] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#8D99AE] uppercase tracking-wider mb-1">
                  Vehicle Category
                </label>
                <select
                  value={vehicleCategory}
                  onChange={(e) => setVehicleCategory(e.target.value)}
                  className="w-full border border-[#C0C7D1] p-3 text-xs font-black bg-[#F5F7FA] rounded-none focus:outline-none focus:border-[#D62828] uppercase"
                >
                  <option>Pickup Trucks</option>
                  <option>Cargo Vans</option>
                  <option>Box Trucks</option>
                  <option>Moving Trucks</option>
                  <option>Flatbeds</option>
                  <option>Stake Beds</option>
                </select>
              </div>

              <button
                type="submit"
                id="search-fleet-submit-btn"
                className="w-full bg-[#0D1B2A] hover:bg-[#D62828] text-white font-black uppercase text-xs tracking-widest py-4 rounded-none transition-colors duration-300 mt-2 flex items-center justify-center gap-2"
              >
                Check Availability
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Core Stats Bar */}
      <section className="bg-[#F5F7FA] py-8 px-4 md:px-8 border-y-4 border-[#0D1B2A]" id="stats-bar-section">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl md:text-5xl font-black text-[#0D1B2A] italic tracking-tighter">100%</p>
            <p className="text-[10px] font-black text-[#8D99AE] uppercase tracking-[0.2em] mt-2">Non-CDL Qualified</p>
          </div>
          <div>
            <p className="text-3xl md:text-5xl font-black text-[#0D1B2A] italic tracking-tighter">2,500 LBS</p>
            <p className="text-[10px] font-black text-[#8D99AE] uppercase tracking-[0.2em] mt-2">Hydraulic Liftgates</p>
          </div>
          <div>
            <p className="text-3xl md:text-5xl font-black text-[#0D1B2A] italic tracking-tighter">30+ YEARS</p>
            <p className="text-[10px] font-black text-[#8D99AE] uppercase tracking-[0.2em] mt-2">Commercial Expertise</p>
          </div>
          <div>
            <p className="text-3xl md:text-5xl font-black text-[#0D1B2A] italic tracking-tighter">0 DOWN</p>
            <p className="text-[10px] font-black text-[#8D99AE] uppercase tracking-[0.2em] mt-2">Account Card Options</p>
          </div>
        </div>
      </section>

      {/* 3. About Preview */}
      <section className="py-16 px-4 md:px-8 bg-white border-b-4 border-[#0D1B2A]" id="about-us-preview">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800" 
              alt="Bufkin Fleet Maintenance Depot" 
              className="rounded-none shadow-xl border-4 border-[#0D1B2A] object-cover w-full h-[400px]"
              referrerPolicy="no-referrer"
            />
            {/* Overlay badge representing Longview community */}
            <div className="absolute -bottom-6 -right-4 bg-[#0D1B2A] text-white p-5 rounded-none border-t-8 border-[#D62828] shadow-2xl text-left hidden sm:block">
              <span className="font-sans font-black text-2xl tracking-tighter text-[#D62828] italic uppercase block">SINCE 1996</span>
              <p className="text-[10px] text-[#C0C7D1] uppercase tracking-[0.2em] mt-1 font-bold">Longview Proud Fleet Partner</p>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em] block">Bufkin Corporate Heritage</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0D1B2A] uppercase tracking-tighter italic">
              Heavy-Duty Fleet Reliability & Local Commitment
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Bufkin Truck Services started with a simple belief: East Texas businesses deserve robust, impeccably maintained fleet support without administrative gymnastics. Today, we manage the region's preferred light and medium commercial rental vehicles, catering to independent building contractors, regional courier distribution hubs, and families undergoing major residential relocations.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              From our flagship depot at <strong>3132 TX-31, Longview, TX</strong>, we inspect every chassis before signature release. With continuous engine diagnostics, customized commercial liability insurances, and on-deck cargo mounting racks, we remove logistics friction so you can focus on the destination.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-sm text-[#0D1B2A] uppercase tracking-tight">Federal Safety Standards</h4>
                  <p className="text-xs text-gray-500 mt-1">Rigorous multi-point safety verification before every keys changeover.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-sm text-[#0D1B2A] uppercase tracking-tight">Texas Local Commitment</h4>
                  <p className="text-xs text-gray-500 mt-1">Proudly supporting Longview, Marshall, Tyler, and Kilgore projects.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fleet Categories Slider/Grid */}
      <section className="bg-[#F5F7FA] py-16 px-4 md:px-8 border-b-4 border-[#0D1B2A]" id="fleet-categories">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-xl text-left">
            <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em] block">Commercial Fleet Selection</span>
            <h2 className="text-3xl font-black text-[#0D1B2A] uppercase tracking-tighter italic mt-2">
              Browse Heavy Duty Vehicles
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Select any heavy duty chassis designed for specific payloads, volume, and clearance criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-none shadow-md border-t-8 border-l-4 border-r border-b border-[#0D1B2A] hover:border-[#D62828] hover:shadow-lg transition-all text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono font-black bg-[#0D1B2A] text-white py-1 px-2.5 rounded-none uppercase tracking-widest">
                      {cat.count}
                    </span>
                    <Truck className="w-5 h-5 text-gray-300 group-hover:text-[#D62828] transition-all" />
                  </div>
                  <h3 className="font-black text-lg text-[#0D1B2A] uppercase tracking-tight mb-1">{cat.title}</h3>
                  <p className="text-xs text-gray-500 leading-normal font-semibold">{cat.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-150 flex justify-between items-center">
                  <button 
                    onClick={() => {
                      setVehicleCategory(cat.title);
                      setCurrentPage('fleet');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-black text-[#D62828] uppercase tracking-widest group-hover:underline flex items-center gap-1"
                  >
                    Explore Catalog <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Bufkin Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Vehicles (Dynamic Catalog list) */}
      <section className="py-16 px-4 md:px-8 bg-white border-b-4 border-[#0D1B2A]" id="featured-fleet">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
            <div className="text-left">
              <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em] block">Available for Reservation</span>
              <h2 className="text-3xl font-black text-[#0D1B2A] uppercase tracking-tighter italic mt-1">Our Featured Fleet</h2>
            </div>
            <button
              onClick={() => setCurrentPage('fleet')}
              className="text-xs font-black uppercase text-[#0D1B2A] hover:text-[#D62828] tracking-widest flex items-center gap-1 border-b-2 border-[#0D1B2A] pb-1"
            >
              Examine All 7 Vehicle Classes <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FLEET_VEHICLES.slice(1, 4).map((vehicle) => (
              <div 
                key={vehicle.id} 
                className="bg-white rounded-none overflow-hidden border-2 border-[#0D1B2A] shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                {/* Vehicle Image with fallback */}
                <div className="relative h-56 bg-gray-100 overflow-hidden shrink-0 border-b-2 border-[#0D1B2A]">
                  <img 
                    src={vehicle.imageUrl} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-[#D62828] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-none">
                    {vehicle.category}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-white border border-[#0D1B2A] px-3 py-1.5 rounded-none text-right shadow-md">
                    <p className="text-[9px] text-[#8D99AE] uppercase font-black tracking-widest leading-none">Starting at</p>
                    <p className="text-base font-black text-[#0D1B2A] mt-1">${vehicle.rateDaily}<span className="text-[10px] font-medium text-gray-500">/day</span></p>
                  </div>
                </div>

                {/* Specs */}
                <div className="p-6 text-left flex-grow">
                  <h3 className="font-black text-xl text-[#0D1B2A] uppercase tracking-tight line-clamp-1 mb-2 italic">{vehicle.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs border-b border-[#C0C7D1] pb-4 mb-4">
                    <div>
                      <p className="text-[10px] uppercase font-black text-[#8D99AE] tracking-wider">Payload Cap</p>
                      <p className="font-bold text-[#0D1B2A] mt-0.5">{vehicle.payloadCapacity}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-[#8D99AE] tracking-wider">Cargo Volume</p>
                      <p className="font-bold text-gray-700 mt-0.5 line-clamp-1">{vehicle.cargoCapacity}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-[#8D99AE] tracking-wider">Fuel Type</p>
                      <p className="font-bold text-gray-700 mt-0.5">{vehicle.specs.fuelType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-[#8D99AE] tracking-wider">Brakes Class</p>
                      <p className="font-bold text-gray-700 mt-0.5">{vehicle.specs.gvwr.includes("Non-CDL") ? "Standard" : "Heavy Duty"}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-2 font-semibold text-gray-700">
                    {vehicle.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D62828] shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3 shrink-0">
                  <button
                    onClick={() => handleDetailsClick(vehicle.id)}
                    className="border-2 border-[#0D1B2A] hover:bg-[#F5F7FA] text-[#0D1B2A] text-xs font-black uppercase py-3 rounded-none transition-all tracking-widest"
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => handleReserveClick(vehicle.id)}
                    className="bg-[#D62828] hover:bg-[#b02020] text-white text-xs font-black uppercase py-3 rounded-none transition-all tracking-widest border-2 border-[#D62828]"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Bufkin / How It Works */}
      <section className="bg-white py-16 px-4 md:px-8 border-b-4 border-[#0D1B2A]" id="why-choose-us">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="xl:grid xl:grid-cols-12 xl:gap-12 items-center">
            <div className="xl:col-span-5 space-y-5 text-left mb-8 xl:mb-0">
              <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em] block">The Bufkin Difference</span>
              <h2 className="text-3xl font-black text-[#0D1B2A] uppercase leading-tight tracking-tighter italic">
                Built For Rugged Duty & Prompt Local Services
              </h2>
              <p className="text-gray-600 font-semibold text-sm">
                Every policy we write and every vehicle we procure is focused strictly on hauling safety. Bufkin guarantees clean fluids, reliable safety liftgates, and non-bureaucratic rental extensions.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Fleet Reliability', desc: 'Continuous preventive safety maintenance by ASE-certified technicians.' },
                  { title: 'Straightforward Pricing', desc: 'No micro-fees or undisclosed terminal fees. Texas transparent taxes.' },
                  { title: 'Commercial Operations', desc: 'Long-term corporate invoicing, flexible mileage packs and customized CDW waiver rates.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="bg-[#D62828] text-white p-1.5 h-8 w-8 rounded-none flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-[#0D1B2A] uppercase tracking-tight">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works Steps */}
            <div className="xl:col-span-7 bg-[#F5F7FA] p-8 rounded-none border-2 border-[#0D1B2A] text-left">
              <h3 className="text-xl font-black text-[#0D1B2A] uppercase mb-8 pb-3 border-b-2 border-[#0D1B2A] flex items-center gap-2 italic">
                <Clock className="w-5 h-5 text-[#D62828]" />
                How Online Rental Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
                {[
                  { step: '01', title: 'Select Vehicle', desc: 'Choose your payload capability standard.' },
                  { step: '02', title: 'Schedule Dates', desc: 'Pick your dispatch and return checkpoints.' },
                  { step: '03', title: 'Secure Booking', desc: 'Receive instant digital verification.' },
                  { step: '04', title: 'Pick & Drive', desc: 'Collect on TX-31 depot and hit the road.' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2.5 relative">
                    <span className="font-sans font-black text-4xl text-[#C0C7D1] block italic">{item.step}</span>
                    <h4 className="font-extrabold text-[#0D1B2A] text-xs uppercase tracking-tight">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-semibold">{item.desc}</p>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-4 left-3/4 w-1/2 h-0.5 bg-[#C0C7D1] z-0"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-[#0D1B2A] text-white p-5 rounded-none mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-l-8 border-[#D62828]">
                <div className="text-left">
                  <p className="font-black text-xs uppercase text-[#D62828] tracking-widest">Immediate pickup needed?</p>
                  <p className="text-sm font-black uppercase tracking-tight mt-1">Call Longview dispatch counter directly</p>
                </div>
                <a 
                  href="tel:+19032360099" 
                  className="bg-[#D62828] hover:bg-[#b02020] text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-none transition-all flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  +1 (903) 236-0099
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Commercial Programs CTA Section */}
      <section className="bg-[#0D1B2A] text-white py-16 px-4 md:px-8 border-b-8 border-[#D62828] relative" id="commercial-solutions">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200')" }}></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="bg-[#D62828] text-white text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-none inline-block">
              Dedicated Corporate Fleet Programs
            </span>
            <h2 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tight italic">
              Commercial Accounts & Long-Term Leases
            </h2>
            <p className="text-[#C0C7D1] text-sm md:text-base font-semibold leading-relaxed">
              We understand that fleet downtime destroys profitability. Bufkin Truck Services offers specialized business corporate accounts with fixed volume rates, priority truck dispatch queue bypass, monthly invoicing with direct accounting records, and customizable collision coverage wrappers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 bg-[#1B263B] p-3 rounded-none border border-white/10">
                <Building2 className="w-5 h-5 text-[#D62828]" />
                <span className="text-xs font-black text-white uppercase tracking-wider">0-down billing agreements</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1B263B] p-3 rounded-none border border-white/10">
                <Truck className="w-5 h-5 text-[#D62828]" />
                <span className="text-xs font-black text-white uppercase tracking-wider">Customizable lease durations</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white text-[#0D1B2A] p-8 rounded-none border-t-8 border-[#D62828] shadow-2xl">
            <h3 className="text-lg font-black uppercase text-[#0D1B2A] tracking-tight mb-2 italic">Request Business Quote</h3>
            <p className="text-[10px] text-[#8D99AE] uppercase font-bold tracking-wider mb-6">Gain access to our contract fleet rate sheets</p>
            <button
              onClick={() => {
                setCurrentPage('contact');
                // Scroll smoothly down to the Corporate Quote form on Contact Page
                setTimeout(() => {
                  const el = document.getElementById('commercial-quote-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full bg-[#D62828] hover:bg-[#b02020] text-white font-black text-xs uppercase tracking-widest py-4 rounded-none transition-all border-2 border-[#D62828]"
            >
              Get Custom Corporate Rates
            </button>
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <section className="py-16 px-4 md:px-8 bg-white border-b-4 border-[#0D1B2A]" id="testimonials">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-lg mx-auto text-center space-y-2">
            <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em]">Customer Validation</span>
            <h2 className="text-3xl font-black text-[#0D1B2A] uppercase tracking-tighter italic">Longview Trust Ratings</h2>
            <p className="text-xs text-gray-500 font-semibold">Don't take our word for it—read reviews from local companies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                client: "Marcus Vance",
                role: "Vance Structural Contractors",
                review: "The F-250 pickup with the towing pack was ready right at our 7 AM shift start. Clear pricing and rugged rigs. Bufkin is the only team we trust for commercial hauling on our Kilgore projects.",
                stars: 5,
                date: "2 weeks ago"
              },
              {
                client: "Elena Torres",
                role: "Longview Freight Dist.",
                review: "We rent two Freightliners on monthly lease cycles during peak retail volumes. Their Allison automatics perform flawlessly and the large Maxon hydraulic gates save our delivery drivers hours.",
                stars: 5,
                date: "1 month ago"
              },
              {
                client: "Gary Patterson",
                role: "Personal Home Move",
                review: "Rented the 26ft Super Mover to relocate our entire home from Tyler to Longview. Standard slide-out ramp is wide and low, making heavy furniture loading simple. Amazing service and counter support.",
                stars: 5,
                date: "3 weeks ago"
              }
            ].map((test, index) => (
              <div key={index} className="bg-[#F5F7FA] p-6 rounded-none border-t-8 border-l-4 border-r border-b border-[#0D1B2A] flex flex-col justify-between text-left shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-750 text-xs italic font-semibold leading-relaxed">"{test.review}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#C0C7D1] flex justify-between items-baseline">
                  <div>
                    <h5 className="font-black text-xs text-[#0D1B2A] uppercase tracking-tight">{test.client}</h5>
                    <p className="text-[9px] text-[#8D99AE] font-black uppercase mt-0.5 tracking-wider">{test.role}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">{test.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Special Offers */}
      <section className="bg-[#F5F7FA] py-12 px-4 md:px-8 border-b-4 border-[#0D1B2A]" id="special-promotional-offers">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-none shadow-xl border-t-8 border-[#D62828] border-x border-b border-[#C0C7D1] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1 text-[#D62828] text-xs font-black uppercase tracking-widest bg-[#D62828]/10 px-2.5 py-1 rounded-none">
              <Gift className="w-3.5 h-3.5" /> Limited Time Savings Incentive
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-[#0D1B2A] uppercase tracking-tighter italic">
              Weekly Rental Pack: Pay For 5 Days, Get 2 Days Free!
            </h3>
            <p className="text-gray-500 text-xs md:text-sm font-semibold">
              Rent any Cargo Van, Box Truck, or Flatbed for 7 continuous days and automatically qualify for weekly bundle pricing (calculated as 5 standard daily slots). Extended rental packages apply automatically.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
            <button
              onClick={() => setCurrentPage('reservations')}
              className="w-full lg:w-auto bg-[#0D1B2A] hover:bg-[#D62828] text-white font-black text-xs uppercase tracking-widest py-4 px-8 rounded-none transition-all flex items-center justify-center gap-2"
            >
              Book Weekly Save Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. Geography Check / Interactive Map */}
      <section className="py-16 px-4 md:px-8 bg-white border-b-8 border-[#0D1B2A]" id="map-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-5 text-left">
            <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em] block">Bufkin Longview Depot Location</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0D1B2A] uppercase tracking-tighter italic">
              3132 TX-31, Longview, TX 75603
            </h2>
            <div className="space-y-3 pt-2 text-xs md:text-sm text-gray-600 font-semibold">
              <p><strong>Convenient Access:</strong> Located directly on TX-31 Highway, providing direct routing to Kilgore, Tyler, Henderson, and Marshall.</p>
              <p><strong>Hours of Operation:</strong> Monday through Saturday, 7:00 AM to 6:00 PM. Gate key dropbox available for off-hours returns.</p>
              <p><strong>Direct Line:</strong> +1 (903) 236-0099</p>
            </div>
            <a
              href="https://maps.google.com/?q=3132+TX-31,+Longview,+TX+75603"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#0D1B2A] hover:bg-[#D62828] text-white font-black text-xs uppercase tracking-widest px-6 py-4 rounded-none transition-all mt-2"
            >
              Get GPS Directions
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-8 h-[400px] bg-gray-100 rounded-none overflow-hidden border-2 border-[#0D1B2A] shadow-md">
            {/* Embedded Iframe of Longview Coordinates */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2s3132+TX-31%2C+Longview%2C+TX+75603!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86363ea534dc9b89%3A0xe54e38e8ecfba3e6!2s3132%20TX-31%2C%20Longview%2C%20TX%2075603!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bufkin Truck Services Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
