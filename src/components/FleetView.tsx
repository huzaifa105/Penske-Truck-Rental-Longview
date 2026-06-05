import React, { useState } from 'react';
import { FLEET_VEHICLES } from '../data/fleet';
import { Vehicle } from '../types';
import SmartFleetFinder from './SmartFleetFinder';
import { 
  Building2, PlusCircle, CheckCircle2, ChevronRight, Info, 
  Search, ShieldAlert, Sliders, Truck, X, PhoneCall, Calendar, AlertTriangle 
} from 'lucide-react';

interface FleetViewProps {
  setCurrentPage: (page: string) => void;
  setSelectedVehicleId: (id: string | null) => void;
  selectedVehicleId: string | null;
}

export default function FleetView({ setCurrentPage, setSelectedVehicleId, selectedVehicleId }: FleetViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAdvisor, setShowAdvisor] = useState(false);

  // Filter logic
  const filteredVehicles = FLEET_VEHICLES.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.keyFeatures.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          vehicle.recommendedUses.some(u => u.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || vehicle.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Pickup Trucks', 'Cargo Vans', 'Box Trucks', 'Moving Trucks', 'Flatbeds', 'Stake Beds', 'Commercial Vehicles'];

  const handleBookNow = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setCurrentPage('reservations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSpecs = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const selectedVehicleObj = FLEET_VEHICLES.find(v => v.id === selectedVehicleId);

  return (
    <div className="w-full flex flex-col font-sans py-12 px-4 md:px-8 bg-white" id="fleet-view-catalog-page">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 text-left pb-6 border-b-4 border-[#0D1B2A]">
          <div className="space-y-2 max-w-xl">
            <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em] block">Bufkin Rental Catalog</span>
            <h1 className="text-3xl md:text-5xl font-black text-[#0D1B2A] uppercase tracking-tighter italic">Our Commercial Fleet</h1>
            <p className="text-sm text-gray-500 font-semibold leading-normal">
              Find precisely configured trucks, flats, and utility stake beds. Every vehicle class is safe, non-CDL certified (except Freightliner), and maintained according to stringent DOT compliance.
            </p>
          </div>
          
          <button
            onClick={() => setShowAdvisor(!showAdvisor)}
            className="bg-[#0D1B2A] hover:bg-[#D62828] text-white flex items-center gap-2 p-4 font-black text-xs uppercase tracking-widest rounded-none border-2 border-[#0D1B2A] transition-all self-stretch lg:self-auto justify-center"
          >
            <Truck className="w-4 h-4 text-[#D62828]" />
            {showAdvisor ? "Show Standard Filters" : "Load AI Smart Fleet Advisor"}
          </button>
        </div>

        {/* Dynamic AI Advisor block */}
        {showAdvisor && (
          <div className="animate-fade-in">
            <SmartFleetFinder 
              onReserveVehicle={(vehicleId) => {
                setSelectedVehicleId(vehicleId);
                setCurrentPage('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          </div>
        )}

        {/* 1. FILTERING CONTROLS */}
        {!showAdvisor && (
          <div className="bg-[#F5F7FA] border-2 border-[#0D1B2A] rounded-none p-5 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 text-left shadow-md">
            <div className="lg:col-span-4 space-y-1.5">
              <label className="text-xs uppercase font-black text-[#0D1B2A] tracking-wider flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-[#D62828]" /> Search Catalog Keywords
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. liftgate, diesel, ramp, furniture..."
                  className="w-full bg-white border-2 border-[#0D1B2A] rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] focus:outline-none placeholder-gray-400 font-semibold"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-2">
              <label className="text-xs uppercase font-black text-[#0D1B2A] tracking-widest flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-[#D62828]" /> Filter Vehicle Classes
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-none text-xs font-black uppercase tracking-widest transition-all border-2 ${
                      selectedCategory === cat
                        ? 'bg-[#D62828] text-white border-[#D62828] shadow-sm'
                        : 'bg-white border-[#0D1B2A] text-gray-700 hover:border-[#D62828]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. FLEET MAIN LISTING GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List panel */}
          <div className={`${selectedVehicleObj ? 'lg:col-span-8' : 'lg:col-span-12'} grid grid-cols-1 md:grid-cols-2 gap-8`}>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => {
                const isSelected = selectedVehicleId === vehicle.id;
                return (
                  <div
                    key={vehicle.id}
                    className={`bg-white rounded-none overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between group ${
                      isSelected 
                        ? 'border-[#D62828] shadow-2xl scale-[1.01]' 
                        : 'border-[#0D1B2A] shadow-md hover:shadow-xl'
                    }`}
                  >
                    {/* Img frame */}
                    <div className="relative h-52 bg-gray-100 overflow-hidden shrink-0">
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-[#0D1B2A] border border-[#D62828]/50 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-none">
                        {vehicle.category}
                      </span>
                      <div className="absolute bottom-3 right-3 bg-white border-2 border-[#0D1B2A] shadow-md py-1 px-3 rounded-none text-right">
                        <p className="text-[9px] text-[#8D99AE] font-black uppercase leading-none">Standard Rate</p>
                        <p className="text-base font-black text-[#0D1B2A] mt-0.5">${vehicle.rateDaily}<span className="text-[10px] font-semibold text-gray-500">/day</span></p>
                      </div>
                    </div>

                    <div className="p-5 flex-grow text-left">
                      <h3 className="font-sans font-black text-lg text-[#0D1B2A] uppercase line-clamp-1 group-hover:text-[#D62828] transition-all tracking-tight italic">{vehicle.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs border-b border-[#C0C7D1] pb-3 mb-3.5 mt-2">
                        <div>
                          <p className="text-[9px] uppercase font-black text-[#8D99AE] tracking-wider">Payload Capacity</p>
                          <p className="font-extrabold text-[#0D1B2A] mt-0.5">{vehicle.payloadCapacity}</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase font-black text-[#8D99AE] tracking-wider">Cargo Volume</p>
                          <p className="font-semibold text-gray-750 mt-0.5">{vehicle.cargoCapacity}</p>
                        </div>
                      </div>

                      <div className="space-y-1 mb-2">
                        {vehicle.keyFeatures.slice(0, 3).map((feat, i) => (
                          <div key={i} className="text-xs text-gray-700 flex items-center gap-1.5 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D62828] shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 pt-0 grid grid-cols-2 gap-3 shrink-0 bg-[#F5F7FA] border-t border-[#C0C7D1] py-3.5">
                      <button
                        onClick={() => handleOpenSpecs(vehicle.id)}
                        className={`text-xs font-black py-3 rounded-none transition-all uppercase tracking-widest border-2 ${
                          isSelected 
                            ? 'bg-white border-[#D62828] text-[#D62828]'
                            : 'border-[#0D1B2A] hover:bg-[#F5F7FA] text-gray-700'
                        }`}
                      >
                        Technical Specs
                      </button>
                      <button
                        onClick={() => handleBookNow(vehicle.id)}
                        className="bg-[#D62828] hover:bg-[#b02020] text-white text-xs font-black py-3 rounded-none transition-all border-2 border-[#D62828] uppercase tracking-widest"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12 space-y-4 border-2 border-dashed border-[#0D1B2A] rounded-none bg-[#F5F7FA]">
                <Truck className="w-12 h-12 text-[#D62828] mx-auto" />
                <div>
                  <h4 className="font-black text-sm text-[#0D1B2A] uppercase tracking-tight">No vehicles match your criteria</h4>
                  <p className="text-xs text-gray-500 font-semibold mt-1">Please try modifying your keywords or select another class category filter.</p>
                </div>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="bg-[#0D1B2A] hover:bg-[#D62828] text-white text-xs font-black uppercase tracking-widest py-3 px-6 rounded-none transition-all"
                >
                  Clear Standard Filters
                </button>
              </div>
            )}
          </div>

          {/* 3. VEHICLE DETAILS MODULE TEMPLATE PANEL (Right Side dynamic inspect card) */}
          {selectedVehicleObj && (
            <div className="lg:col-span-4 bg-[#F5F7FA] rounded-none border-t-8 border-l-4 border-r-2 border-b-2 border-[#0D1B2A] shadow-2xl p-6 h-sticky top-[100px] text-left space-y-6 animate-slide-in">
              <div className="flex justify-between items-start pb-4 border-b-2 border-[#0D1B2A]">
                <div>
                  <span className="text-[10px] bg-[#D62828] text-white font-black px-2.5 py-1 rounded-none uppercase tracking-widest">
                    {selectedVehicleObj.category}
                  </span>
                  <h3 className="font-sans font-black text-lg md:text-xl text-[#0D1B2A] uppercase tracking-tight mt-2 italic">
                    {selectedVehicleObj.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedVehicleId(null)}
                  className="text-gray-500 hover:text-[#D62828] hover:bg-gray-200/50 p-1 rounded-none text-xs border border-transparent hover:border-[#0D1B2A]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Technical Specifications Area */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-black text-[#D62828] tracking-widest border-b border-[#C0C7D1] pb-1">Heavy Technical Specs</h4>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-none border border-[#0D1B2A] flex justify-between items-baseline font-semibold">
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider">Powertrain</span>
                    <strong className="text-[#0D1B2A] font-black">{selectedVehicleObj.specs.engine}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-none border border-[#0D1B2A] flex justify-between items-baseline font-semibold">
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider">Transmission</span>
                    <strong className="text-gray-800 font-bold">{selectedVehicleObj.specs.transmission}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-none border border-[#0D1B2A] flex justify-between items-baseline font-semibold">
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider">Fuel Class</span>
                    <strong className="text-gray-800 font-bold">{selectedVehicleObj.specs.fuelType}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-none border border-[#0D1B2A] flex justify-between items-baseline font-semibold">
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider">GVWR Rating</span>
                    <strong className="text-[#D62828] font-black">{selectedVehicleObj.specs.gvwr}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-none border border-[#0D1B2A] flex justify-between items-baseline font-semibold">
                    <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-wider">Hydraulic Liftgate</span>
                    <strong className="text-[#0D1B2A] font-black">{selectedVehicleObj.specs.liftgate}</strong>
                  </div>
                </div>
              </div>

              {/* Dimensions Section */}
              <div className="space-y-2 text-xs">
                <h4 className="text-xs uppercase font-black text-[#0D1B2A] tracking-widest">Cargo & Forklift Dimensions:</h4>
                <div className="bg-white p-3 rounded-none border border-[#0D1B2A] text-xs font-semibold">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Physical Clearances</p>
                  <strong className="text-sm text-[#0D1B2A] block mt-1">{selectedVehicleObj.dimensions}</strong>
                </div>
              </div>

              {/* Recommended Uses Section */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-black text-[#0D1B2A] tracking-widest">Optimal Truck Applications:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVehicleObj.recommendedUses.map((use, idx) => (
                    <span key={idx} className="bg-white text-[#0D1B2A] text-[9px] font-black py-1 px-2.5 rounded-none border border-[#0D1B2A] uppercase tracking-wider">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Rates Sheet */}
              <div className="bg-[#0D1B2A] text-white p-4 rounded-none flex justify-between items-center text-xs border-l-4 border-[#D62828]">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Weekly Bundle savings:</p>
                  <p className="text-sm font-black mt-0.5">${selectedVehicleObj.rateWeekly}<span className="text-[10px] font-medium text-gray-300">/week</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-[#D62828] font-black uppercase block tracking-widest">Save up to 15%</p>
                  <p className="text-[10px] text-[#C0C7D1] font-bold mt-0.5">Calculated at 5 days</p>
                </div>
              </div>

              {/* Verification & policy check */}
               <div className="bg-amber-50 border-2 border-amber-500 p-3 rounded-none text-[11px] text-amber-900 font-semibold flex gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <strong className="font-bold">Rental Requirements:</strong> Requires valid U.S. matching Class C Driver's License, age 21+, matching credit card.
                </div>
              </div>

              {/* Secondary conversions links */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={() => handleBookNow(selectedVehicleObj.id)}
                  className="w-full bg-[#D62828] hover:bg-[#b02020] text-white py-3.5 px-4 rounded-none text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md border-2 border-[#D62828] transition-all"
                >
                  <Calendar className="w-4 h-4" /> Book Reservation Online
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      setTimeout(() => {
                        const el = document.getElementById('commercial-quote-form');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="border-2 border-[#0D1B2A] hover:bg-white text-[#0D1B2A] py-2.5 rounded-none text-[11px] font-black uppercase tracking-widest text-center transition-all bg-transparent"
                  >
                    Custom Quote
                  </button>
                  <a
                    href="tel:+19032360099"
                    className="border-2 border-[#0D1B2A] hover:bg-white text-[#0D1B2A] py-2.5 rounded-none text-[11px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-1 transition-all bg-transparent"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#D62828]" /> Call Dispatch
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
