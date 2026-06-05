import React from 'react';
import { 
  History, Eye, Heart, Shield, Landmark, MapPin, 
  Smile, Truck, HardHat, PhoneCall, CheckCircle2 
} from 'lucide-react';

interface AboutViewProps {
  setCurrentPage: (page: string) => void;
}

export default function AboutView({ setCurrentPage }: AboutViewProps) {
  
  const stats = [
    { title: "30+ Years", desc: "Serving East Texas logistics since 1996" },
    { title: "10,000+", desc: "Successful commercial cargo dispatches" },
    { title: "100%", desc: "Safety DOT Compliance Rating in Texas" },
    { title: "24 / 7", desc: "Emergency road assistance backup" },
  ];

  const serviceLocations = [
    { name: "Longview, TX (HQ Depot)", range: "Central office & fleet maintenance bay based at 3132 TX-31" },
    { name: "Marshall, TX", range: "Inbound daily delivery and lumber transport dispatching support" },
    { name: "Tyler, TX", range: "Local retail warehousing support and industrial logistics transfers" },
    { name: "Kilgore, TX", range: "Oilfield machinery open flatbed supply routing and site dispatches" },
    { name: "Henderson, TX", range: "Agritech, nursery and timber stake bed support" },
    { name: "East Texas Surrounding Area", range: "Flexible corporate delivery dropping options" }
  ];

  return (
    <div className="w-full flex flex-col font-sans py-12 px-4 md:px-8 bg-white" id="about-bufkin-page">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner Block */}
        <div className="max-w-xl text-left space-y-2">
          <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em] block">Bufkin Corporate Profile</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#0D1B2A] uppercase tracking-tighter italic">Our Story & Heritage</h1>
          <p className="text-sm text-gray-500 font-semibold leading-normal font-normal">
            Rooted in Longview, Texas, Bufkin Truck Services has been the backbone of reliable local freight and personal cargo hauling for over three decades.
          </p>
        </div>

        {/* 1. Statistics grids */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center bg-[#F5F7FA] border-2 border-[#0D1B2A] rounded-none p-8 shadow-sm">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1 text-center">
              <p className="text-3xl md:text-4xl font-black text-[#D62828] tracking-tight italic">{stat.title}</p>
              <p className="text-[10px] font-black text-[#0D1B2A] uppercase tracking-wider">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* 2. Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-2xl md:text-3xl font-black text-[#0D1B2A] uppercase tracking-tighter italic">
              A Texas Heritage of Hard Work, Grit & Heavy Iron
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-semibold leading-relaxed">
              Bufkin Truck Services was established in 1996 in Longview with a modest fleet of two pickup trucks and a committed vision: to provide local businesses and contractors with robust commercial trucks that never quit on the job. Over thirty years, we have steadily grown our fleet layout, introducing high-roof cargo vans, hydraulic liftgate box trucks, heavy steel flatbed haulers, and specialized oak-panel stake beds.
            </p>
            <p className="text-gray-600 text-sm md:text-base font-semibold leading-relaxed">
              Despite our expansion across the region, Bufkin remains a locally owned family business. Our mechanics work side-by-side with our dispatch supervisors, reviewing brakes, tires, and oil, so that every vehicle that rolls out of our <strong>3132 TX-31 depot</strong> is in showroom condition.
            </p>
            <div className="p-5 bg-[#F5F7FA] rounded-none text-xs leading-relaxed text-[#0D1B2A] italic border-l-8 border-[#D62828] border-y border-r border-[#0D1B2A] font-medium shadow-sm">
              "We don't just rent trucks. We safeguard your cargo and support your commercial deadlines. When an East Texas subcontractor locks in a Bufkin platform, they are getting three decades of logistical expertise riding shotgun."
              <span className="block text-right font-black uppercase text-[#D62828] text-[10px] mt-2 tracking-widest">— Bufkin Logistics Counter Team</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img 
              src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800" 
              alt="Classic commercial delivery truck" 
              className="rounded-none shadow-2xl border-4 border-[#0D1B2A] object-cover w-full h-[380px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 3. Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-none border-t-8 border-l-4 border-r border-b border-[#0D1B2A] shadow-md text-left space-y-4">
            <div className="bg-[#F5F7FA] p-3 text-[#D62828] rounded-none border border-[#0D1B2A] inline-block shadow-sm">
              <History className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-black text-lg text-[#0D1B2A] uppercase tracking-tight italic">Our Mission</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              To provide East Texas contractors, businesses, and residential movers with reliable commercial-grade trucks backed by transparent pricing, flexible terms, and responsive roadside assistance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-none border-t-8 border-l-4 border-r border-b border-[#0D1B2A] shadow-md text-left space-y-4">
            <div className="bg-[#F5F7FA] p-3 text-[#0D1B2A] rounded-none border border-[#0D1B2A] inline-block shadow-sm">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-black text-lg text-[#0D1B2A] uppercase tracking-tight italic">Our Vision</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              To remain the most trusted names in commercial logistics and truck rentals throughout East Texas, setting the gold-standard for fleet safety, preventative maintenance, and customer-first services.
            </p>
          </div>

          <div className="bg-white p-6 rounded-none border-t-8 border-l-4 border-r border-b border-[#0D1B2A] shadow-md text-left space-y-4">
            <div className="bg-[#F5F7FA] p-3 text-[#D62828] rounded-none border border-[#0D1B2A] inline-block shadow-sm">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-black text-lg text-[#0D1B2A] uppercase tracking-tight italic">Core Values</h3>
            <div className="text-xs text-gray-500 space-y-1.5 font-semibold">
              <p><strong>● Integrity First:</strong> We present transparent rental fees, upfront quotes, and standard fuel conditions.</p>
              <p><strong>● Rugged Reliability:</strong> We maintain heavy trucks to exceed federal cargo safety criteria.</p>
              <p><strong>● Local Dedication:</strong> Supplying back-office fleet supports to Texas builders and neighborhood projects.</p>
            </div>
          </div>
        </div>

        {/* 4. Service Areas Detailed Grid */}
        <div className="bg-[#F5F7FA] rounded-none border-2 border-[#0D1B2A] p-8 md:p-10 space-y-8 text-left shadow-lg" id="service-areas">
          <div className="max-w-xl">
            <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em] block">Geographic Dispatch Operations</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0D1B2A] uppercase tracking-tighter italic">
              Bufkin Service Coverage Area
            </h2>
            <p className="text-xs text-gray-500 mt-1 font-semibold">Our flagship depot in Longview, TX facilitates seamless dropoffs across adjacent municipalities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceLocations.map((loc, i) => (
              <div key={i} className="bg-white p-5 rounded-none border border-[#0D1B2A] flex gap-3 text-left shadow-sm">
                <MapPin className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-xs uppercase text-[#0D1B2A] tracking-tight">{loc.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal font-semibold">{loc.range}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#C0C7D1] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-gray-550 font-semibold">Reservations include free towing assistance within a 75-mile radius of the Longview depot.</span>
            </div>
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-[#D62828] hover:bg-[#b02020] text-white py-3.5 px-6 rounded-none font-black text-xs uppercase tracking-widest border-2 border-[#D62828] transition-all"
            >
              Verify Zip Code Dispatch
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
