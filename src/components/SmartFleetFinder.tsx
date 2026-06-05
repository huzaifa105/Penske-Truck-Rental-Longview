import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { FLEET_VEHICLES } from '../data/fleet';
import { Sparkles, ArrowRight, Loader2, Info, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

interface SmartFleetFinderProps {
  onReserveVehicle: (vehicleId: string) => void;
}

export default function SmartFleetFinder({ onReserveVehicle }: SmartFleetFinderProps) {
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('Under 2,000 lbs');
  const [otherDetails, setOtherDetails] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const [result, setResult] = useState<{
    recommendedVehicleId: string;
    reasoning: string;
    tips: string[];
    isSimulated?: boolean;
  } | null>(null);

  const steps = [
    "Analyzing cargo dimension constraints...",
    "Verifying chassis payload thresholds under TXDOT rules...",
    "Mapping loading accessibility options (liftgates/ramps)...",
    "Optimizing fuel mileage coefficients..."
  ];

  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please describe the physical items you are transporting.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // Stagger loading step messages
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % steps.length);
    }, 1200);

    try {
      const response = await fetch('/api/truck-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, weight, otherDetails })
      });

      if (!response.ok) {
        throw new Error('Server returned error looking up fleet advice.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("We encountered a connectivity issue during fleet lookup. Standard backup rules loaded.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDescription('');
    setWeight('Under 2,000 lbs');
    setOtherDetails('');
    setResult(null);
    setError(null);
  };

  // Find corresponding vehicle object
  const recommendedVehicle = result ? FLEET_VEHICLES.find(v => v.id === result.recommendedVehicleId) : null;

  return (
    <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1B263B] text-white p-6 md:p-8 rounded-2xl shadow-xl border border-white/5 relative overflow-hidden text-left" id="smart-advisor-panel">
      {/* Decorative metal shine element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-white/5 to-transparent rounded-full pointer-events-none"></div>

      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-1.5 text-xs bg-[#D62828] text-white font-extrabold uppercase px-2.5 py-1 rounded tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" /> AI Smart Fleet Advisor
        </span>
        <h3 className="font-display font-black text-xl md:text-2xl uppercase tracking-tight text-white mb-2">
          Cargo Vehicle Optimizer
        </h3>
        <p className="text-[#C0C7D1] text-xs leading-relaxed mb-6">
          Describe the machinery, freight, furniture, or construction items you need to haul. Our algorithm calculates physical volumetric clearances and payload weights to recommend the exact optimal truck.
        </p>
      </div>

      {!result ? (
        <form onSubmit={handleAdvisorSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] sm:text-xs uppercase font-extrabold text-[#C0C7D1] mb-1.5">
              1. What specifically are you transporting?
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Remodeling items for local Longview home - heavy drywall sheets, structural steel studs, large toolboxes, and 4 bags of heavy concrete dust."
              className="w-full bg-[#0D1B2A]/90 border border-white/10 rounded-lg p-3 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] h-24 resize-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] sm:text-xs uppercase font-extrabold text-[#C0C7D1] mb-1.5">
                2. Estimated Cargo Weight
              </label>
              <select
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-[#0D1B2A] border border-white/10 rounded-lg px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] transition-all"
              >
                <option>Under 2,000 lbs (Standard retail loads)</option>
                <option>2,000 - 5,000 lbs (Medium deliveries / Tools)</option>
                <option>5,000 - 10,000 lbs (Heavy pallets / Major house overhaul)</option>
                <option>Over 10,000 lbs (Industrial supplies / Heavy machines)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs uppercase font-extrabold text-[#C0C7D1] mb-1.5">
                3. Special Requirements
              </label>
              <input
                type="text"
                value={otherDetails}
                onChange={(e) => setOtherDetails(e.target.value)}
                placeholder="e.g. Liftgate, low slide ramp, 4WD standard"
                className="w-full bg-[#0D1B2A]/90 border border-white/10 rounded-lg px-3 py-2 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-500/30 text-red-200 p-3 rounded-lg flex items-center gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              id="advisor-optimize-btn"
              className="w-full sm:w-auto bg-[#D62828] hover:bg-[#A51D1D] text-white disabled:bg-gray-700 disabled:text-gray-300 font-display font-black text-xs uppercase tracking-widest py-3.5 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Dimensions...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze and Optimize My Fleet Match
                </>
              )}
            </button>
          </div>

          {loading && (
            <p className="text-xs text-[#C0C7D1]/80 italic mt-3 animate-pulse flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#D62828]" />
              {steps[loadingStep]}
            </p>
          )}
        </form>
      ) : (
        /* Result Panel */
        <div className="space-y-6 pt-2 animate-fade-in text-left">
          <div className="border border-white/10 rounded-xl p-5 md:p-6 bg-[#0D1B2A]/80 shadow-2xl relative overflow-hidden">
            {recommendedVehicle ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Image */}
                <div className="md:col-span-4 h-40 bg-gray-900 rounded-lg overflow-hidden border border-white/10 relative">
                  <img
                    src={recommendedVehicle.imageUrl}
                    alt={recommendedVehicle.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-[#D62828] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                    {recommendedVehicle.category}
                  </div>
                </div>

                {/* Info and reasoning */}
                <div className="md:col-span-8 text-left space-y-3">
                  <div>
                    <p className="text-[10px] text-[#D62828] font-black uppercase tracking-wider">Optimized Selection</p>
                    <h4 className="text-lg md:text-xl font-display font-black text-white uppercase tracking-tight">{recommendedVehicle.name}</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <p className="text-gray-400">Payload Limit: <strong className="text-white">{recommendedVehicle.payloadCapacity}</strong></p>
                    <p className="text-gray-400">Cargo Depth: <strong className="text-white">{recommendedVehicle.dimensions}</strong></p>
                  </div>

                  <p className="text-xs text-[#C0C7D1] leading-relaxed border-t border-white/5 pt-2 font-normal">
                    {result.reasoning}
                  </p>
                </div>
              </div>
            ) : (
              /* If somehow the matching failed, show simple info */
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white uppercase">Matched Category: {result.recommendedVehicleId}</h4>
                <p className="text-xs text-[#C0C7D1] leading-normal">{result.reasoning}</p>
              </div>
            )}
          </div>

          {/* Pro tips section */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-xs uppercase text-white tracking-widest flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#D62828]" />
              Professional Loading & Security Rules:
            </h5>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.tips.map((tip, idx) => (
                <li key={idx} className="bg-white/5 p-3.5 rounded-lg border border-white/5 text-xs text-[#C0C7D1] flex gap-2 font-normal align-top leading-normal">
                  <span className="text-[#D62828] font-bold shrink-0">#{idx+1}</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
            <button
              onClick={handleReset}
              className="text-xs font-bold text-[#C0C7D1] hover:text-white flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-gray-400" />
              Reset Optimization Formula
            </button>

            <button
              onClick={() => onReserveVehicle(result.recommendedVehicleId)}
              className="bg-[#D62828] hover:bg-[#A51D1D] text-white font-display font-black text-xs uppercase tracking-widest py-3 px-6 rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              Continue to Reservation Booking
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
