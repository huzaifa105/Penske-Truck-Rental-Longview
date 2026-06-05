import React, { useState } from 'react';
import { FAQS } from '../data/fleet';
import { Search, ChevronDown, ChevronUp, HelpCircle, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FAQView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('req-lic'); // Default expand license first

  const categories = ['All', 'Requirements', 'Insurance', 'Policies'];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col font-sans py-12 px-4 md:px-8 bg-white" id="faq-view-page">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="text-left space-y-2">
          <span className="text-[#D62828] text-xs font-bold uppercase tracking-widest block">Bufkin Customer Portal</span>
          <h1 className="font-display font-black text-3xl md:text-5xl text-[#0D1B2A] uppercase tracking-tight">Policies & FAQs</h1>
          <p className="text-sm text-gray-500 leading-normal">
            Read critical details regarding licensing, insurance options, collision damage waivers, city mileage packs, and gas return metrics before you check out at our Longview depot.
          </p>
        </div>

        {/* 1. Filter and Keyword Finder */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 md:p-6 space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search rentals rules..."
                className="w-full bg-white border border-gray-200 rounded pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] focus:outline-none placeholder-gray-400"
              />
            </div>

            <div className="md:col-span-8 flex flex-wrap gap-2 justify-start md:justify-end">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#D62828] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* 2. Collapsible Accordions collection */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`border rounded-lg text-left overflow-hidden transition-all duration-250 bg-white ${
                    isExpanded 
                      ? 'border-[#D62828]/60 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full px-5 py-4 flex justify-between items-center bg-white text-left font-display font-bold text-sm md:text-base text-[#0D1B2A] hover:text-[#D62828] transition-all"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4.5 h-4.5 text-[#D62828] shrink-0" />
                      {faq.question}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-50 pt-3 text-xs md:text-sm text-gray-500 leading-relaxed font-normal bg-gray-50/50">
                      <p>{faq.answer}</p>
                      
                      <div className="mt-3 flex gap-4 items-center justify-start text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        <span>Category: <strong className="text-[#0D1B2A]">{faq.category}</strong></span>
                        <span className="h-3 w-px bg-gray-250"></span>
                        <span className="text-[#D62828] flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 inline p-0" /> Active Bufkin Policy
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 space-y-2 border border-dashed border-gray-200 rounded-lg">
              <Search className="w-8 h-8 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500">No results found for your search term in policies.</p>
            </div>
          )}
        </div>

        {/* 3. Customer support contact block */}
        <div className="bg-[#0D1B2A] text-white p-6 md:p-8 rounded-xl border-l-[5px] border-[#D62828] text-left flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden" id="faq-conversion-cta">
          <div className="space-y-2 relative z-10">
            <h4 className="font-display font-black text-lg md:text-xl uppercase tracking-tight">Still have queries regarding clearance or insurance coverage?</h4>
            <p className="text-xs text-[#C0C7D1] max-w-xl font-normal">Our commercial dispatch desks are staffed Mon - Sat from 7:00 AM to 6:00 PM. We can compile custom mileage quotes or check specialized gate clearance instantly.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 relative z-10">
            <a
              href="tel:+19032360099"
              className="bg-[#D62828] hover:bg-[#A51D1D] text-white py-3 px-5 text-center text-xs font-display font-black uppercase tracking-wider rounded transition-all flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 inline" />
              Call Dispatcher
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
