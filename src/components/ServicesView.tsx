import React from 'react';
import { 
  Building2, HardHat, Calendar, HelpCircle, ShieldCheck, 
  MapPin, ClipboardCheck, ArrowRight, PhoneCall, Award, Leaf, CheckCircle2 
} from 'lucide-react';

interface ServicesViewProps {
  setCurrentPage: (page: string) => void;
  setSelectedVehicleId: (id: string | null) => void;
}

export default function ServicesView({ setCurrentPage, setSelectedVehicleId }: ServicesViewProps) {
  
  const coreServices = [
    {
      title: "Commercial & Business Accounts",
      icon: <Building2 className="w-8 h-8 text-[#D62828]" />,
      desc: "Streamlined logistics solutions with zero-down monthly corporate billing. Business customer representatives bypass wait queues, secure fixed annual rate sheets, and gain comprehensive liability waivers.",
      uses: "Perfect for plumbing agencies, regional grocery shippers, sub-contractors."
    },
    {
      title: "Local Heavy Construction Rentals",
      icon: <HardHat className="w-8 h-8 text-[#0D1B2A]" />,
      desc: "Durable Open Flatbeds and high-payload Silverado Stake Beds. Forklift friendly from all 3 dimensions. Built for heavy structural lumber, aggregate bags, scaffolding tubes, and piping.",
      uses: "Optimal for Longview contractors, oilwell service builders, masonry crews."
    },
    {
      title: "Residential Relocation & Moving Rigs",
      icon: <Award className="w-8 h-8 text-[#D62828]" />,
      desc: "Super-volume 16ft and 26ft Box Movers. Configured with dual E-Track tie rail structures, attic cabins, and wide-span slide-out ramps. Eliminates modular packing issues completely.",
      uses: "Optimal for Multi-room home moves, corporate office relocations, warehouse shifts."
    },
    {
      title: "Long-Term Fleet Leases",
      icon: <ClipboardCheck className="w-8 h-8 text-[#0D1B2A]" />,
      desc: "Month-to-month and annual vehicle placements to expand your current logistics capacity safely. Scale your commercial fleet as regional volume fluctuates with continuous maintenance backing.",
      uses: "Best for parcel courier expansions, seasonal farm freight, regional fulfillment hubs."
    },
    {
      title: "Landscape & Agricultural Hauling",
      icon: <Leaf className="w-8 h-8 text-[#D62828]" />,
      desc: "Stake Beds featuring removable solid Oak barriers. Protects organic foliage from windburn while navigating public highway speeds. Simple slide-off steps.",
      uses: "Recommended for Nurseries, wholesale sod cultivators, commercial landscape crews."
    },
    {
      title: "Event & Production Transportation",
      icon: <ShieldCheck className="w-8 h-8 text-[#0D1B2A]" />,
      desc: "Clean, dock-high trucks with 2,500 lbs and 3,500 lbs robust hydraulic tuck-away liftgates. Secures delicate audio, visual props, staging systems, and catering loads.",
      uses: "Best for regional music festival stages, wedding coordination teams, catering logistics."
    }
  ];

  const handleCustomQuoteClick = () => {
    setCurrentPage('contact');
    setTimeout(() => {
      const el = document.getElementById('commercial-quote-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="w-full flex flex-col font-sans py-12 px-4 md:px-8 bg-white" id="services-page-container">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner Block */}
        <div className="max-w-xl text-left space-y-2">
          <span className="text-[#D62828] text-xs font-bold uppercase tracking-widest block">Bufkin Rental Services</span>
          <h1 className="font-display font-black text-3xl md:text-5xl text-[#0D1B2A] uppercase tracking-tight">Heavy Duty Fleet Programs</h1>
          <p className="text-sm text-gray-500 leading-normal">
            Whether hauling local pallets for a single morning or expanding your regional commercial logistics network with an annual fleet lease, we offer tailored pricing and support.
          </p>
        </div>

        {/* 1. Core Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-50 border border-gray-200/80 rounded-xl p-6 hover:shadow-lg hover:border-[#D62828]/35 hover:bg-white transition-all text-left flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="p-2.5 bg-white rounded-lg inline-block shadow-sm group-hover:scale-105 transition-all">
                  {service.icon}
                </div>
                <h3 className="font-display font-black text-lg text-[#0D1B2A] uppercase tracking-tight">{service.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">{service.desc}</p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200/60 text-left">
                <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Recommended Uses</span>
                <p className="text-xs font-semibold text-[#0D1B2A] mt-1">{service.uses}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Interactive Corporate Features callout (Why Choose Commercial) */}
        <div className="bg-[#0D1B2A] text-white p-8 md:p-12 rounded-2xl border-l-[6px] border-[#D62828] relative overflow-hidden text-left shadow-xl" id="commercial-solutions-card">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200')" }}></div>
          
          <div className="max-w-3xl space-y-6 relative z-10">
            <span className="inline-block bg-[#D62828] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
              LONGVIEW COMMERCIAL PRIORITY GATE
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight leading-none text-white">
              Accelerate Logistics Operations with corporate credit accounts
            </h2>
            <p className="text-[#C0C7D1] text-xs md:text-sm leading-relaxed">
              We eliminate down-times entirely. Corporate members secure customized fuel policies, unlimited local mileage options, fixed peak-period reservations, and streamlined digital checkouts at our Longview depot. Our dedicated commercial specialists oversee your vehicles, ensuring they are polished, fully-fueled, and pre-inspected before your drivers arrive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3 border-t border-white/10">
              <div>
                <h5 className="font-bold text-sm text-[#D62828]">Fixed Contract Rates</h5>
                <p className="text-xs text-[#C0C7D1] mt-1">Locks in low seasonal rates for up to 12 months, avoiding market surges.</p>
              </div>
              <div>
                <h5 className="font-bold text-sm text-[#D62828]">Priority Replacement</h5>
                <p className="text-xs text-[#C0C7D1] mt-1">Instantly swaps units during preventative maintenance cycles at no charge.</p>
              </div>
              <div>
                <h5 className="font-bold text-sm text-[#D62828]">0-down digital ledger</h5>
                <p className="text-xs text-[#C0C7D1] mt-1">Consolidation invoice sheets formatted cleanly for simple accounting.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={handleCustomQuoteClick}
                className="bg-[#D62828] hover:bg-[#A51D1D] text-white font-display font-black text-xs uppercase tracking-widest px-6 py-3 rounded shadow transition-all flex items-center gap-1"
              >
                Request Custom Fleet Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentPage('fleet');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-transparent hover:bg-white/10 text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-3 border border-white/50 rounded transition-all"
              >
                Examine Payload Clearing Dimensions
              </button>
            </div>
          </div>
        </div>

        {/* 3. Operational safety and reliability commitment Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="fleet-standards-checklist">
          <div className="hidden lg:block lg:col-span-4 h-[350px] rounded-xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600" 
              alt="Heavy Duty Maintenance Bay" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-8 space-y-6 text-left">
            <span className="text-[#D62828] text-xs font-bold uppercase tracking-widest block">Bufkin Reliability Pledge</span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-[#0D1B2A] uppercase mt-1">Our Rigorous 44-Point Mechanical Check</h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-normal">
              Every heavy commercial truck and light utility pickup is subjected to manual fluid, suspension, and liftgate pressure checks by ASE-compliant inspectors before we hand over the keys. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Hydraulic liftgate system pressure test",
                "Continuous tire tread depth & inflation monitoring",
                "High-performance oil & transmission fluid tests",
                "E-Track lock bar and cargo hook pressure sweep",
                "Brake shoe and drum clearance micrometer test",
                "State emission & Texas vehicle code clearance checks",
                "Anti-slip driver cabin stairs cleanup and safety check",
                "Continuous digital backup cameras and sensor diagnostic sync"
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2 text-xs text-gray-700 font-semibold items-center">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#D62828] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs font-normal text-gray-500 flex items-center justify-between flex-col sm:flex-row gap-4">
              <span>Have specific cargo load parameters or hazardous fluid handling queries?</span>
              <a 
                href="tel:+19032360099" 
                className="bg-[#0D1B2A] hover:bg-[#D62828] text-white py-2 px-4 rounded text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D62828] font-black inline" /> Direct Tech Helpline
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
