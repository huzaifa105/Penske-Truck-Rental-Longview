import React, { useState, useEffect } from 'react';
import { FLEET_VEHICLES } from '../data/fleet';
import { Vehicle, Reservation } from '../types';
import { 
  Calendar, CheckCircle2, DollarSign, Info, ShieldCheck, 
  Trash2, User, Clock, FileText, ChevronRight, AlertCircle, RefreshCw, Printer, Mail 
} from 'lucide-react';

interface ReservationsViewProps {
  selectedVehicleId: string | null;
  setSelectedVehicleId: (id: string | null) => void;
  quickSearchData?: {
    pickupDate: string;
    returnDate: string;
    category: string;
  } | null;
  setQuickSearchData?: (data: any) => void;
}

export default function ReservationsView({ 
  selectedVehicleId, 
  setSelectedVehicleId, 
  quickSearchData,
  setQuickSearchData
}: ReservationsViewProps) {
  
  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupDate, setPickupDate] = useState(quickSearchData?.pickupDate || '2026-06-10');
  const [returnDate, setReturnDate] = useState(quickSearchData?.returnDate || '2026-06-15');
  const [vehicleId, setVehicleId] = useState(selectedVehicleId || 'box-intl-16ft');
  const [hasCdwInsurance, setHasCdwInsurance] = useState(true);
  const [notes, setNotes] = useState('');

  // App state
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Sync state if selectedVehicleId prop changes
  useEffect(() => {
    if (selectedVehicleId) {
      setVehicleId(selectedVehicleId);
    }
  }, [selectedVehicleId]);

  // Load existing bookings from backend
  const fetchBookings = async () => {
    setLoadingList(true);
    try {
      const res = await fetch('/api/reservations');
      if (res.ok) {
        const data = await res.json();
        setActiveReservations(data);
      }
    } catch (err) {
      console.error("Error loading reservations:", err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Calculate rental day count
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (isNaN(days) || days <= 0) days = 1;

  // Selected vehicle object
  const currentVehicleObj = FLEET_VEHICLES.find(v => v.id === vehicleId) || FLEET_VEHICLES[2];

  // Dynamic cost math matching backend rules
  const weeks = Math.floor(days / 7);
  const extraDays = days % 7;
  const baseRentalCost = (weeks * currentVehicleObj.rateWeekly) + (extraDays * currentVehicleObj.rateDaily);
  const cdwCost = hasCdwInsurance ? days * 19.99 : 0;
  const envFee = 15.00;
  const taxRate = 0.0825;
  const subtotal = baseRentalCost + cdwCost + envFee;
  const taxCost = Math.round(subtotal * taxRate * 100) / 100;
  const totalCost = Math.round((subtotal + taxCost) * 100) / 100;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setErrorMessage("Please fill out your contact details (Name, Email, and Phone).");
      return;
    }

    if (new Date(pickupDate) >= new Date(returnDate)) {
      setErrorMessage("Return date must occur after the pickup date.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          pickupLocation: "Bufkin Longview Depot",
          returnLocation: "Bufkin Longview Depot",
          pickupDate,
          returnDate,
          vehicleId,
          hasCdwInsurance,
          notes
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Reservation failed processing.");
      }

      const verifiedBooking = await response.json();
      setConfirmedReservation(verifiedBooking);
      
      // Refresh current ledger
      fetchBookings();

      // Clear quickSearch trigger
      if (setQuickSearchData) setQuickSearchData(null);
    } catch (err: any) {
      setErrorMessage(err.message || "Unable to process reservation at this time.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateAnother = () => {
    setConfirmedReservation(null);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setNotes('');
    setErrorMessage(null);
  };

  return (
    <div className="w-full flex flex-col font-sans py-12 px-4 md:px-8 bg-white" id="reservations-parent-block">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Banner Block */}
        <div className="text-left space-y-2">
          <span className="text-[#D62828] text-xs font-bold uppercase tracking-widest block">Bufkin Logistics Gateway</span>
          <h1 className="font-display font-black text-3xl md:text-5xl text-[#0D1B2A] uppercase tracking-tight">Schedule Your Dispatch</h1>
          <p className="text-sm text-gray-500 leading-normal font-normal">
            Secure your heavy duty commercial vehicle. Enter dates and select collision waver configurations. Pricing calculates standard weekly package savings automatically.
          </p>
        </div>

        {!confirmedReservation ? (
          /* MAIN CHECKOUT FORM & SCREEN */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Fields: Col 1 */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-md text-left space-y-6">
              <div className="pb-4 border-b border-gray-150">
                <h2 className="font-display font-black text-xl text-[#0D1B2A] uppercase flex items-center gap-2">
                  <User className="w-5 h-5 text-[#D62828]" />
                  Driver & Schedule Parameters
                </h2>
                <p className="text-xs text-gray-500 mt-1">Provide your verified identification and haul times</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* 1. Vehicle Selector dropdown */}
                <div>
                  <label className="block text-[11px] uppercase font-extrabold text-gray-500 mb-1">
                    Select Rental Vehicle Class
                  </label>
                  <select
                    value={vehicleId}
                    onChange={(e) => {
                      setVehicleId(e.target.value);
                      setSelectedVehicleId(e.target.value);
                    }}
                    className="w-full border border-gray-200 rounded px-3 py-2 text-xs md:text-sm focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] focus:outline-none bg-white text-[#0D1B2A] font-bold"
                  >
                    {FLEET_VEHICLES.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name} (${v.rateDaily}/day)
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Dates picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-extrabold text-gray-500 mb-1">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-xs md:text-sm font-mono focus:ring-1 focus:ring-[#D62828] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-extrabold text-gray-500 mb-1">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-xs md:text-sm font-mono focus:ring-1 focus:ring-[#D62828] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. Driver details */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-extrabold text-gray-500 mb-1">
                        Driver Full Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full border border-gray-200 rounded px-3 py-2 text-xs md:text-sm focus:ring-1 focus:ring-[#D62828] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-extrabold text-gray-500 mb-1">
                        Mobile Telephone
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. +1 (903) 555-0100"
                        className="w-full border border-gray-200 rounded px-3 py-2 text-xs md:text-sm focus:ring-1 focus:ring-[#D62828] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-extrabold text-gray-500 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. j.doe@company.com"
                      className="w-full border border-gray-200 rounded px-3 py-2 text-xs md:text-sm focus:ring-1 focus:ring-[#D62828] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Special instructions notes */}
                <div>
                  <label className="block text-[11px] uppercase font-extrabold text-gray-500 mb-1">
                    Special Dispatch Notes or Cargo Parameters (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Moving heavy kitchen utilities, require hand truck dolly accessor, etc."
                    className="w-full border border-gray-200 rounded p-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-[#D62828] h-20 resize-none"
                  />
                </div>

                {/* 5. CDW Insurance interactive wrapper */}
                <div className={`p-4 rounded-xl border transition-all ${
                  hasCdwInsurance 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasCdwInsurance}
                      onChange={(e) => setHasCdwInsurance(e.target.checked)}
                      className="w-4 h-4 rounded text-[#D62828] focus:ring-[#D62828] border-gray-300 mt-1 cursor-pointer"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs uppercase flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
                        Collateral Protection: Collision Damage Waiver (CDW)
                      </h4>
                      <p className="text-[11px] mt-1 leading-normal font-normal">
                        Renting commercial trucks carries damage liabilities. For just <strong>$19.99/day</strong>, relieve yourself of financial responsibility if the chassis gets scraped or dented during heavy hauling. Recommended.
                      </p>
                    </div>
                  </label>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-300 text-red-800 p-3 rounded-lg flex items-center gap-2.5 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 text-red-650 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    id="submit-booking-action-btn"
                    className="w-full bg-[#D62828] hover:bg-[#A51D1D] disabled:bg-gray-400 text-white font-display font-black text-xs uppercase tracking-wider py-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? "Processing Fleet Dispatch Ledger..." : "Confirm & Book Reservation"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            </div>

            {/* Calculations Panel: Col 2 */}
            <div className="lg:col-span-5 bg-gray-50 rounded-xl border border-gray-250 p-6 md:p-8 text-left space-y-6">
              <div className="pb-4 border-b border-gray-250 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-lg text-[#0D1B2A] uppercase">Rental Cost Estimate</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">East Texas transparent dispatch ledger </p>
                </div>
                <span className="font-mono bg-[#0D1B2A] text-white py-1 px-2.5 rounded text-xs font-bold">
                  {days} {days === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              {/* Vehicle parameters preview */}
              <div className="flex gap-4 items-center">
                <div className="h-16 w-24 bg-gray-900 border border-gray-200 rounded overflow-hidden shadow-inner shrink-0">
                  <img 
                    src={currentVehicleObj.imageUrl} 
                    alt={currentVehicleObj.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-gray-400">Class Match</p>
                  <h4 className="text-xs font-bold text-[#0D1B2A] line-clamp-1">{currentVehicleObj.name}</h4>
                  <p className="text-[10px] text-gray-550 mt-0.5">{currentVehicleObj.category}</p>
                </div>
              </div>

              {/* Math Sheet */}
              <div className="space-y-3.5 text-xs border-b border-gray-250 pb-5">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-500">Base Rental ({days} days):</span>
                  <strong className="font-mono text-[#0D1B2A]">${baseRentalCost.toFixed(2)}</strong>
                </div>
                {weeks > 0 && (
                  <div className="bg-emerald-50 text-emerald-800 p-2 rounded text-[11px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" /> Included: Weekly Savings Bundle activated.
                  </div>
                )}
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-500">CDW Waiver Insurance:</span>
                  <span className="font-mono text-gray-700">
                    {hasCdwInsurance ? `$${cdwCost.toFixed(2)}` : '$0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-500">Local Safety Env Fee (Flat):</span>
                  <strong className="font-mono text-gray-750">${envFee.toFixed(2)}</strong>
                </div>
              </div>

              {/* Grand summary */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-gray-500">Subtotal:</span>
                  <strong className="font-mono text-[#0D1B2A]">${subtotal.toFixed(2)}</strong>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-gray-500">TX State Sales Tax (8.25%):</span>
                  <strong className="font-mono text-[#0D1B2A]">${taxCost.toFixed(2)}</strong>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-gray-200">
                  <span className="text-[#0D1B2A] font-bold text-sm">Estimated Total:</span>
                  <strong className="font-mono text-[#0D1B2A] text-xl font-black">${totalCost.toFixed(2)}</strong>
                </div>
              </div>

              {/* Requirement prompt */}
              <div className="bg-[#0D1B2A] text-white p-4 rounded-lg text-xs leading-normal font-normal">
                <p className="font-extrabold uppercase text-[#D62828] text-[10px] tracking-wider mb-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Dispatch verification reminder:
                </p>
                Security deposit must be held on matching credit card at pickup ($150 for light pickups, $500 for medium commercial box trucks). Standard Class C license is sufficient!
              </div>

            </div>

          </div>
        ) : (
          /* RESERVATION CONFIRMED INVOICE SCREEN */
          <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-xl border border-emerald-400 shadow-2xl space-y-6 text-left animate-fade-in relative overflow-hidden" id="booking-invoice-card">
            
            {/* Stamp decoration */}
            <div className="absolute top-6 right-6 border-2 border-emerald-500 text-emerald-500 font-display font-black text-xs uppercase px-3 py-1.5 rounded -rotate-12 tracking-widest bg-white z-20">
              CONFIRMED
            </div>

            <div className="text-center space-y-2 pb-4 border-b border-gray-200">
              <div className="bg-emerald-50 text-emerald-600 p-2.5 h-12 w-12 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="font-display font-black text-xl md:text-2xl text-[#0D1B2A] uppercase mt-2">Bufkin Dispatch Invoice</h2>
              <p className="text-xs text-gray-500">Confirmation Id: <strong className="font-mono font-bold text-[#0D1B2A]">{confirmedReservation.id}</strong></p>
            </div>

            {/* Print details */}
            <div className="space-y-4 text-xs font-normal">
              
              {/* Rent parameter details */}
              <div className="bg-gray-50 border border-gray-150 p-4 rounded-lg space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Customer Name:</span>
                  <strong className="text-[#0D1B2A]">{confirmedReservation.customerName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Customer Contact:</span>
                  <strong className="text-gray-800">{confirmedReservation.customerPhone}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <strong className="text-gray-800 font-mono text-[11px]">{confirmedReservation.customerEmail}</strong>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span>Vehicle Selected:</span>
                  <strong className="text-[#0D1B2A]">{FLEET_VEHICLES.find(v => v.id === confirmedReservation.vehicleId)?.name || confirmedReservation.vehicleId}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Pickup / Return:</span>
                  <strong className="text-gray-800">3132 TX-31, Longview, TX</strong>
                </div>
                <div className="flex justify-between">
                  <span>Haul Duration:</span>
                  <strong className="text-gray-800">{confirmedReservation.pickupDate} to {confirmedReservation.returnDate} ({confirmedReservation.days} days)</strong>
                </div>
              </div>

              {/* Collateral insurance status */}
              <div className="flex justify-between items-center p-3 rounded bg-emerald-50 border border-emerald-250 text-emerald-800">
                <span className="flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Collision Waiver Status:
                </span>
                <span className="font-bold">{confirmedReservation.hasCdwInsurance ? 'CDW Protected' : 'Liability Declined'}</span>
              </div>

              {/* Total charges ledger */}
              <div className="border-t border-gray-200 pt-4 flex justify-between items-baseline">
                <span className="text-gray-600 uppercase font-black text-[11px] tracking-wider">Total Charges Charged:</span>
                <span className="font-mono text-xl font-black text-[#0D1B2A]">${confirmedReservation.totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions for invoicing */}
            <div className="pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => window.print()}
                className="bg-transparent hover:bg-gray-100/50 border border-gray-250 text-gray-700 py-3 rounded text-xs font-bold flex items-center justify-center gap-1"
              >
                <Printer className="w-4 h-4 text-gray-400" />
                Print Confirmation Ticket
              </button>
              <button
                onClick={handleCreateAnother}
                className="bg-[#0D1B2A] hover:bg-[#D62828] text-white py-3 rounded text-xs font-display font-extrabold uppercase tracking-widest text-center"
              >
                Book Another Truck
              </button>
            </div>
          </div>
        )}

        {/* 4. DRIVER HISTORY & CURRENT DISPATCH LEDGER TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-6 text-left shadow-sm" id="dispatch-ledger-container">
          <div className="flex justify-between items-baseline flex-wrap gap-2">
            <div>
              <h3 className="font-display font-black text-lg text-[#0D1B2A] uppercase flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#D62828]" />
                Live: Longview Dispatch Confirmed Ledger
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Real-time persistent truck reservations recorded today.</p>
            </div>
            
            <button
              onClick={fetchBookings}
              disabled={loadingList}
              className="text-xs font-bold text-gray-500 hover:text-[#D62828] flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingList ? 'animate-spin' : ''}`} />
              Refresh Dispatch Screen
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-150 rounded-lg">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 uppercase text-[10px] font-bold">
                  <th className="p-3 md:p-4">Reservation ID</th>
                  <th className="p-3 md:p-4">Customer</th>
                  <th className="p-3 md:p-4">Vehicle Match</th>
                  <th className="p-3 md:p-4">Duration</th>
                  <th className="p-3 md:p-4">Protection</th>
                  <th className="p-3 md:p-4">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-normal">
                {activeReservations.length > 0 ? (
                  activeReservations.map((item) => {
                    const vehName = FLEET_VEHICLES.find(v => v.id === item.vehicleId)?.name || item.vehicleId;
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition-all font-sans text-xs">
                        <td className="p-3 md:p-4 font-mono font-bold text-[#0D1B2A]">{item.id}</td>
                        <td className="p-3 md:p-4 font-semibold text-[#0D1B2A]">
                          {item.customerName}
                          <span className="block font-mono text-[9px] text-gray-400 font-normal mt-0.5">{item.customerPhone}</span>
                        </td>
                        <td className="p-3 md:p-4 text-gray-600 font-medium">{vehName}</td>
                        <td className="p-3 md:p-4 text-gray-500">
                          {item.pickupDate} to {item.returnDate}
                          <span className="block font-mono text-[9px] text-[#D62828] font-bold mt-0.5">{item.days} Daily Slots</span>
                        </td>
                        <td className="p-3 md:p-4">
                          <span className={`inline-block py-0.5 px-2 rounded text-[9px] font-bold ${
                            item.hasCdwInsurance 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                              : 'bg-amber-50 text-amber-800 border border-amber-100'
                          }`}>
                            {item.hasCdwInsurance ? 'CDW Secured' : 'Liability Waived'}
                          </span>
                        </td>
                        <td className="p-3 md:p-4 font-mono font-extrabold text-[#0D1B2A]">${item.totalCost.toFixed(2)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400 italic">No bookings are actively saved in-the-moment. Use checkout above.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
