import React, { useState } from 'react';
import { 
  Building2, Mail, Phone, MapPin, CheckCircle2, ChevronRight, 
  Clock, PhoneCall, AlertCircle, FileText, Send, Sparkles 
} from 'lucide-react';

export default function ContactView() {
  
  // States: Standard contact form
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('General Rental Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // States: Corporate Quote Request form
  const [quoteName, setQuoteName] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteCompany, setQuoteCompany] = useState('');
  const [pickupZip, setPickupZip] = useState('');
  const [returnZip, setReturnZip] = useState('');
  const [quoteCategory, setQuoteCategory] = useState('Box Trucks');
  const [quoteWeight, setQuoteWeight] = useState('2,000 - 5,000 lbs');
  const [quoteNotes, setQuoteNotes] = useState('');
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState<string | null>(null);
  const [quoteErrorMsg, setQuoteErrorMsg] = useState<string | null>(null);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);

  // Send contact form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    setContactSuccess(null);

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError("Please complete your Name, Email, and Message.");
      return;
    }

    setContactSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          subject: contactSubject,
          message: contactMessage
        })
      });

      if (!res.ok) throw new Error("Server rejected message submission.");

      const data = await res.json();
      setContactSuccess(data.message || "Thank you. General Inquiry saved.");
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    } catch (err: any) {
      setContactError(err.message || "Unable to send message. Please double-check connection.");
    } finally {
      setContactSubmitting(false);
    }
  };

  // Send corporate quote request
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteErrorMsg(null);
    setQuoteSuccessMsg(null);

    if (!quoteName.trim() || !quoteEmail.trim() || !quotePhone.trim() || !pickupZip.trim()) {
      setQuoteErrorMsg("Please fill out all required fields marked with an asterisk (*).");
      return;
    }

    setQuoteSubmitting(true);
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteName,
          email: quoteEmail,
          phone: quotePhone,
          companyName: quoteCompany,
          pickupZip,
          returnZip: returnZip || pickupZip,
          vehicleCategory: quoteCategory,
          estimatedWeight: quoteWeight,
          message: quoteNotes
        })
      });

      if (!res.ok) throw new Error("Server rejected commercial quote compilation request.");

      const data = await res.json();
      setQuoteSuccessMsg(`Custom Quote Requested! Confirmation Code: ${data.quote.id}. East Texas dispatchers are compiling your contract sheet. We will contact you at ${quotePhone} within 1 business hour.`);
      
      // Clear fields
      setQuoteName('');
      setQuoteEmail('');
      setQuotePhone('');
      setQuoteCompany('');
      setPickupZip('');
      setReturnZip('');
      setQuoteNotes('');
    } catch (err: any) {
      setQuoteErrorMsg(err.message || "Failed to process commercial quote request.");
    } finally {
      setQuoteSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col font-sans py-12 px-4 md:px-8 bg-white" id="contact-page-container">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 text-left pb-6 border-b-2 border-[#0D1B2A]">
          <div className="space-y-4 max-w-xl">
            <span className="text-[#D62828] text-xs font-black uppercase tracking-[0.25em] block animate-pulse">East Texas Communications Hub</span>
            <h1 className="text-3xl md:text-5xl font-black text-[#0D1B2A] uppercase tracking-tighter italic">Connect with dispatch</h1>
            <p className="text-sm text-gray-500 font-semibold leading-normal">
              Need immediate truck dispatch, specialized container dimensions clarification, or custom annual leasing terms? Send an inquiry or request custom contract rate sheets below.
            </p>
          </div>
          
          <div className="flex gap-4 self-stretch lg:self-auto justify-center bg-[#F5F7FA] px-5 py-4 rounded-none border-t-4 border-b-2 border-r-2 border-l-2 border-[#D62828] shadow-md">
            <Phone className="w-5 h-5 text-[#D62828] mt-0.5 shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-gray-550 font-black uppercase tracking-widest block leading-none">Longview Hotline</span>
              <strong className="text-base font-black text-[#0D1B2A] block mt-1">+1 (903) 236-0099</strong>
            </div>
          </div>
        </div>

        {/* 1. Main contact form grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Dispatch Center Info Desk (Col 1) */}
          <div className="lg:col-span-4 bg-[#F5F7FA] p-6 rounded-none border-2 border-[#0D1B2A] text-left space-y-6 shadow-md">
            <div>
              <h3 className="font-sans font-black text-lg text-[#0D1B2A] uppercase tracking-tight italic">Longview HQ Depot</h3>
              <p className="text-xs text-gray-500 font-bold mt-0.5">Located at 3132 TX-31 Hwy</p>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              
              <div className="flex gap-3 align-top">
                <MapPin className="w-5 h-5 text-[#D62828] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#0D1B2A]">Depot Coordinates</h5>
                  <p className="text-gray-500 mt-1">3132 TX-31, Longview, TX 75603</p>
                </div>
              </div>

              <div className="flex gap-3 align-top">
                <Clock className="w-5 h-5 text-[#0D1B2A] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#0D1B2A]">Counter Hours</h5>
                  <p className="text-gray-500 mt-1">Mon - Sat: 7:00 AM - 6:00 PM</p>
                  <p className="text-gray-400 mt-0.5">Sunday: Closed ( Dropbox active )</p>
                </div>
              </div>

              <div className="flex gap-3 align-top">
                <Mail className="w-5 h-5 text-[#D62828] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#0D1B2A]">Digital Dispatch Desk</h5>
                  <p className="text-gray-500 mt-1 font-mono">support@bufkintrucks.com</p>
                  <p className="text-gray-400 mt-0.5 font-mono text-[10px]">quotes@bufkintrucks.com</p>
                </div>
              </div>

              <div className="flex gap-3 align-top">
                <Building2 className="w-5 h-5 text-[#0D1B2A] shrink-0" />
                <div>
                  <h5 className="font-bold text-[#0D1B2A]">Regional Fleet Support</h5>
                  <p className="text-gray-500 mt-1">Covering Longview, Tyler, Marshall, Henderson, Kilgore, and East Texas.</p>
                </div>
              </div>

            </div>

            <div className="bg-[#0D1B2A] text-white p-4 rounded-none border-l-4 border-[#D62828] text-xs font-semibold space-y-2">
              <span className="text-[#D62828] text-[10px] font-black uppercase tracking-widest block animate-pulse">EMERGENCY NIGHT DISPATCH</span>
              <p className="leading-relaxed">Need urgent road repairs or lock-out assistance after hours?</p>
              <a href="tel:+19032360099" className="text-white hover:text-[#D62828] font-black underline leading-none block pt-1 text-[13px] tracking-widest">+1 (903) 236-0099</a>
            </div>
          </div>

          {/* Standard Contact Form (Col 2) */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-none border-2 border-[#0D1B2A] shadow-lg text-left space-y-6">
            <div className="pb-4 border-b-2 border-[#0D1B2A]">
              <h3 className="font-sans font-black text-xl text-[#0D1B2A] uppercase flex items-center gap-2 italic">
                <Mail className="w-5 h-5 text-[#D62828]" />
                Customer Assistance Inquiry
              </h3>
              <p className="text-xs text-gray-500 font-bold mt-1">General service questions, policy reviews, or reservation updates.</p>
            </div>

            {contactSuccess ? (
              <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-900 p-6 rounded-none text-center space-y-4 animate-fade-in font-semibold">
                <div className="bg-emerald-100 p-2.5 rounded-none border border-emerald-500 inline-block text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-sans font-black text-lg uppercase italic tracking-tight">General Inquiry Saved!</h4>
                <p className="text-xs max-w-sm mx-auto leading-relaxed">{contactSuccess}</p>
                <button
                  onClick={() => setContactSuccess(null)}
                  className="bg-[#0D1B2A] text-white hover:bg-[#D62828] py-3.5 px-6 rounded-none text-xs font-black uppercase transition-all tracking-widest"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-black text-gray-600 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Gary Patterson"
                      className="w-full border-2 border-[#0D1B2A] rounded-none px-3 py-2 text-xs md:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] bg-white text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-black text-gray-600 mb-1">Telephone Line</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. +1 (903) 555-0199"
                      className="w-full border-2 border-[#0D1B2A] rounded-none px-3 py-2 text-xs md:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] bg-white text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-black text-gray-600 mb-1">Email Coordinates *</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. gary.p@mail.com"
                    className="w-full border-2 border-[#0D1B2A] rounded-none px-3 py-2 text-xs md:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] bg-white text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-black text-gray-600 mb-1">Message Subject</label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full border-2 border-[#0D1B2A] rounded-none px-3 py-2 text-xs md:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] bg-white text-gray-800"
                  >
                    <option>General Rental Inquiry</option>
                    <option>Reservation Change or Correction</option>
                    <option>Deposit Refund Status</option>
                    <option>Fuel Policy Question</option>
                    <option>Feedback & Customer Experience</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-black text-gray-600 mb-1">Message/Question Details *</label>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Provide full description of your query..."
                    className="w-full border-2 border-[#0D1B2A] rounded-none p-3 text-xs md:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] h-28 resize-none bg-white text-gray-800"
                  />
                </div>

                {contactError && (
                  <div className="bg-red-50 border border-red-350 text-red-800 p-3 rounded-lg flex items-center gap-2.5 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{contactError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full bg-[#0D1B2A] hover:bg-[#D62828] text-white disabled:bg-gray-400 py-4 rounded-none text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md border-2 border-[#0D1B2A]"
                >
                  <Send className="w-3.5 h-3.5 text-[#D62828]" />
                  {contactSubmitting ? "Dispatching Message..." : "Submit General Ticket"}
                </button>

              </form>
            )}
          </div>

        </div>

        {/* 2. Custom Heavy Commercial Fleet / Program Quote Form */}
        <div 
          className="bg-[#0D1B2A] text-white p-6 md:p-10 rounded-none border-t-[8px] border-b-2 border-r-2 border-l-2 border-[#D62828] text-left space-y-6 shadow-2xl relative overflow-hidden"
          id="commercial-quote-form"
        >
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1 bg-[#D62828] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-none tracking-[0.2em] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" /> Contract Fleet Solutions
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white italic">
              Heavy Commercial & Custom Quote Request
            </h3>
            <p className="text-[#C0C7D1] text-xs leading-relaxed font-semibold">
              Fill out this commercial framework form if you require a long-term chassis lease, heavy payload flatbeds, dedicated business accounts, or specialty multi-truck scheduling options in the East Texas area.
            </p>
          </div>

          {quoteSuccessMsg ? (
            <div className="bg-white/5 border-2 border-emerald-500 text-white p-6 rounded-none space-y-4 animate-fade-in relative z-10 font-semibold">
              <div className="bg-emerald-500/10 p-2.5 rounded-none border border-emerald-500 inline-block text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-sans font-black text-lg uppercase text-white tracking-tight italic">Commercial Quote Submitted!</h4>
              <p className="text-xs leading-relaxed max-w-xl">{quoteSuccessMsg}</p>
              <button
                onClick={() => setQuoteSuccessMsg(null)}
                className="bg-[#D62828] hover:bg-[#b02020] text-white py-3.5 px-6 rounded-none text-xs font-black uppercase tracking-widest transition-all"
              >
                Request another quote
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-4 text-left relative z-10">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-black text-[#C0C7D1] mb-1">Company legal name</label>
                  <input
                    type="text"
                    value={quoteCompany}
                    onChange={(e) => setQuoteCompany(e.target.value)}
                    placeholder="e.g. Vance Construction LP"
                    className="w-full bg-[#0D1B2A] border-2 border-[#C0C7D1] rounded-none px-3 py-2 text-xs md:text-sm text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-[#C0C7D1] mb-1">Pickup Zip Code *</label>
                  <input
                    type="text"
                    value={pickupZip}
                    onChange={(e) => setPickupZip(e.target.value)}
                    placeholder="e.g. 75603"
                    className="w-full bg-[#0D1B2A] border-2 border-[#C0C7D1] rounded-none px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] font-mono font-black"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-[#C0C7D1] mb-1">Return Zip Code</label>
                  <input
                    type="text"
                    value={returnZip}
                    onChange={(e) => setQuoteReturnZip(e.target.value)}
                    placeholder="e.g. 75601 (Local)"
                    className="w-full bg-[#0D1B2A] border-2 border-[#C0C7D1] rounded-none px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] font-mono font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-black text-[#C0C7D1] mb-1">Preferred Truck Category</label>
                  <select
                    value={quoteCategory}
                    onChange={(e) => setQuoteCategory(e.target.value)}
                    className="w-full bg-[#0D1B2A] border-2 border-[#C0C7D1] rounded-none px-3 py-2 text-xs md:text-sm text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828]"
                  >
                    <option>Box Trucks</option>
                    <option>Pickup Trucks</option>
                    <option>Cargo Vans</option>
                    <option>Moving Trucks</option>
                    <option>Flatbeds</option>
                    <option>Stake Beds</option>
                    <option>Commercial Specialty Vehicles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-black text-[#C0C7D1] mb-1">Estimated Cargo Weight</label>
                  <select
                    value={quoteWeight}
                    onChange={(e) => setQuoteWeight(e.target.value)}
                    className="w-full bg-[#0D1B2A] border-2 border-[#C0C7D1] rounded-none px-3 py-2 text-xs md:text-sm text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828]"
                  >
                    <option>Under 2,000 lbs (Light load)</option>
                    <option>2,000 - 5,000 lbs (Standard tools/Medium freight)</option>
                    <option>5,000 - 10,000 lbs (Machinery/Heavy home relocation)</option>
                    <option>Over 10,000 lbs (Double-axle dock-high bulk)</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-black text-[#C0C7D1] mb-1">Inquirer Name *</label>
                  <input
                    type="text"
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    placeholder="Gary Patterson"
                    className="w-full bg-[#0D1B2A] border-2 border-[#C0C7D1] rounded-none px-3 py-2 text-xs md:text-sm text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-[#C0C7D1] mb-1">Phone Callback Line *</label>
                  <input
                    type="tel"
                    value={quotePhone}
                    onChange={(e) => setQuotePhone(e.target.value)}
                    placeholder="+1 (903) 555-0100"
                    className="w-full bg-[#0D1B2A] border-2 border-[#C0C7D1] rounded-none px-3 py-2 text-xs md:text-sm text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-[#C0C7D1] mb-1">Email Coordinates *</label>
                  <input
                    type="email"
                    value={quoteEmail}
                    onChange={(e) => setQuoteEmail(e.target.value)}
                    placeholder="g.patterson@construction.com"
                    className="w-full bg-[#0D1B2A] border-2 border-[#C0C7D1] rounded-none px-3 py-2 text-xs md:text-sm text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-black text-[#C0C7D1] mb-1">Specific cargo details or lease terms desired</label>
                <textarea
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  placeholder="e.g. Monthly contract to support a plumbing distribution. Require 2 medium high-roof vans, estimated 3,000 miles/month..."
                  className="w-full bg-[#0D1B2A]/90 border-2 border-[#C0C7D1] rounded-none p-3 text-xs md:text-sm text-[#FCFCFC] focus:outline-none focus:ring-1 focus:ring-[#D62828] focus:border-[#D62828] h-20 resize-none font-semibold placeholder-gray-550"
                />
              </div>

              {quoteErrorMsg && (
                <div className="bg-red-950/40 border border-red-500/30 text-red-200 p-3 rounded-lg flex items-center gap-2.5 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 text-red-550 shrink-0" />
                  <span>{quoteErrorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={quoteSubmitting}
                className="w-full bg-[#D62828] hover:bg-[#b02020] text-white disabled:bg-gray-700 py-4 rounded-none text-xs font-black uppercase tracking-widest border-2 border-[#D62828] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-white" />
                {quoteSubmitting ? "Summing Weight clearings..." : "Compile Commercial Quote Request"}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );

  // Small helper to support optional parameter on return zip
  function setQuoteReturnZip(val: string) {
    setReturnZip(val);
  }
}
