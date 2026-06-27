import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROPERTIES = [
  {
    id: 1,
    address: "2105 1st Street",
    city: "Lincoln, CA 95648",
    tag: "Solar-Powered Haven",
    beds: 6, baths: 3, stories: 2,
    heroImg: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80",
    features: [
      "Private bedrooms each with own full bathroom",
      "Spacious master suite with walk-in closet — ideal for couples",
      "Three non-master bedrooms upstairs sharing a full bathroom",
      "Two non-master bedrooms downstairs with full bath access",
      "Fully equipped kitchen & furnished living room",
      "Expansive backyard with stunning views",
    ],
    rooms: [
      { label: "Kitchen", sub: "Common Area", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
      { label: "Master Bedroom", sub: "Private", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" },
      { label: "Non-Primary Bedroom", sub: "Private", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { label: "Non-Primary Bathroom", sub: "Shared", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80" },
      { label: "Laundry Room", sub: "Common Area", img: "https://images.unsplash.com/photo-1558618047-3d3e4f0f7d7d?w=400&q=80" },
      { label: "Backyard", sub: "Common Area", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
    ],
    nearby: ["Sprouts Farmers Market — 1.2 mi", "Target — 1.4 mi", "Walmart — 1.4 mi", "Raley's Supermarket — 1.5 mi"],
  },
  {
    id: 2,
    address: "3199 Western Avenue",
    city: "Sacramento, CA 95838",
    tag: "North Sacramento Retreat",
    beds: 5, baths: 3, stories: 1,
    heroImg: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80",
    features: [
      "Private unfurnished bedrooms with own full bathroom",
      "Expansive master bedroom with separate full bath — great for couples",
      "Four additional bedrooms sharing two full bathrooms",
      "Fully equipped kitchen & furnished living room",
      "Lush front and backyards with trees and plants",
      "Conveniently close to freeway access and all essentials",
    ],
    rooms: [
      { label: "Front Entry", sub: "Common Area", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" },
      { label: "Kitchen", sub: "Common Area", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
      { label: "Master Bedroom", sub: "Private", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" },
      { label: "Master Bathroom", sub: "Private", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80" },
      { label: "Non-Primary Bedroom", sub: "Private", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { label: "Non-Primary Bathroom", sub: "Shared", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80" },
    ],
    nearby: ["Power Market — 0.8 mi", "Safeway — 1.4 mi", "Walmart — 3.7 mi", "Sprouts Farmers Market — 5.8 mi", "Easy freeway access"],
  },
  {
    id: 3,
    address: "940 Cabra Street",
    city: "Lincoln, CA 95648",
    tag: "Twelve Bridges Gem",
    beds: 6, baths: 3, stories: 2,
    heroImg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
    features: [
      "Private unfurnished bedrooms with full bathroom — solar powered",
      "King-size master suite with walk-in closet — perfect for couples",
      "Three non-master bedrooms sharing an upstairs full bathroom",
      "Two downstairs bedrooms with full bath access",
      "Fully equipped kitchen, living room & upstairs loft",
      "Backyard patio with stunning sunset views over open field",
    ],
    rooms: [
      { label: "Kitchen", sub: "Common Area", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
      { label: "Non-Primary Bedroom", sub: "Private", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { label: "Non-Primary Bathroom", sub: "Shared", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80" },
      { label: "Living Room", sub: "Common Area", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { label: "Backyard Porch", sub: "Common Area", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
      { label: "Backyard", sub: "Common Area", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
    ],
    nearby: ["Walgreens — 0.75 mi", "Kaiser — 0.1 mi", "Lincoln Parks & Recreation — 0.2 mi", "Grocery & hardware stores within 2 mi"],
  },
];

const FAQS = [
  { q: "What is the application process?", a: "$0, 5-minute, self-reported application — no credit check required." },
  { q: "What is included in the monthly payment?", a: "Rent, utilities, and services are all bundled into one monthly payment." },
  { q: "What is the guest policy?", a: "Guests are welcome! We limit overnight stays to encourage a good quality of living for everyone." },
  { q: "What areas of the house are shared?", a: "Everything except living quarters and private bathrooms — kitchen, laundry, living room, and backyard are communal." },
  { q: "What are the lease duration options?", a: "6, 12, or 24-month terms offered. Other lengths are also considered — just ask." },
  { q: "How much is the security deposit?", a: "Equal to one month's rent." },
  { q: "Are pets allowed?", a: "Service animals are accepted." },
  { q: "Is the room furnished?", a: "No — you furnish your own room as well as your own dishware, cookware, and silverware." },
];

const WHY_ITEMS = [
  { icon: "🏡", title: "Affordable Housing", desc: "$0, 5-minute self-reported application" },
  { icon: "📅", title: "Flexible Terms", desc: "Long-term or short-term accommodations" },
  { icon: "🔒", title: "Safe & Screened", desc: "All residents background-screened" },
  { icon: "⚡", title: "Fast Move-In", desc: "Move in as soon as 1 day after booking" },
];

// ─── Reusable Components ──────────────────────────────────────────────────────

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce-in">
      <span className="text-xl">✅</span>
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 text-white/70 hover:text-white text-lg leading-none">×</button>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex justify-between items-center gap-4 group"
      >
        <span className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors">{q}</span>
        <span className={`text-amber-400 text-xl transition-transform duration-300 flex-shrink-0 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-4" : "max-h-0"}`}>
        <p className="text-white/65 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function RoomCard({ room }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={room.img} alt={room.label} className={`w-full aspect-square object-cover transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`} />
      <div className={`absolute inset-0 bg-gradient-to-t from-[#1a2f4e]/90 to-transparent flex flex-col justify-end p-3 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-80"}`}>
        <div className="text-white font-semibold text-xs">{room.label}</div>
        <div className="text-white/60 text-xs">{room.sub}</div>
      </div>
    </div>
  );
}

function PropertyCard({ property, onApply }) {
  const [activeTab, setActiveTab] = useState("details");
  const tabs = ["details", "rooms", "location"];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      {/* Hero image */}
      <div className="relative h-56 overflow-hidden">
        <img src={property.heroImg} alt={property.address} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f4e]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block bg-amber-400 text-[#1a2f4e] text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">{property.tag}</span>
          <h3 className="text-white font-bold text-lg leading-tight">{property.address}</h3>
          <p className="text-white/80 text-sm">{property.city}</p>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {[`🛏 ${property.beds}`, `🚿 ${property.baths}`, `${property.stories}🏠`].map((badge, i) => (
            <span key={i} className="bg-white/90 text-[#1a2f4e] text-xs font-bold px-2 py-1 rounded-full">{badge}</span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === tab ? "text-[#E87722] border-b-2 border-[#E87722]" : "text-gray-400 hover:text-gray-600"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5 min-h-[220px]">
        {activeTab === "details" && (
          <ul className="space-y-2">
            {property.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}
              </li>
            ))}
          </ul>
        )}
        {activeTab === "rooms" && (
          <div className="grid grid-cols-3 gap-2">
            {property.rooms.map((r, i) => <RoomCard key={i} room={r} />)}
          </div>
        )}
        {activeTab === "location" && (
          <div>
            <p className="text-sm font-bold text-[#1a2f4e] mb-3">📍 Nearby</p>
            <ul className="space-y-2">
              {property.nearby.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 flex gap-3">
        <button
          onClick={() => onApply(property.address + ", " + property.city)}
          className="flex-1 bg-[#E87722] hover:bg-[#cf6610] active:scale-95 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wider transition-all duration-150 shadow-md hover:shadow-lg"
        >
          Apply Now — $0
        </button>
        <button className="px-4 py-3 border-2 border-[#1a2f4e] text-[#1a2f4e] hover:bg-[#1a2f4e] hover:text-white rounded-xl text-sm font-bold transition-all duration-150 active:scale-95">
          🎥 Tour
        </button>
      </div>
    </div>
  );
}

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [toast, setToast] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", property: "", term: "", movein: "", notes: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const showToast = (msg) => setToast(msg);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleApply = (addr) => {
    setForm(f => ({ ...f, property: addr }));
    scrollTo("apply");
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = "Valid email required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.property) errs.property = "Select a property";
    if (!form.term) errs.term = "Select a lease term";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", phone: "", property: "", term: "", movein: "", notes: "" });
      setFormErrors({});
      showToast("Application submitted! We'll be in touch within 24 hours.");
    }, 1400);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm bg-white transition-colors focus:outline-none focus:border-[#E87722] ${formErrors[field] ? "border-red-400" : "border-gray-200"}`;

  return (
    <div className="font-sans antialiased text-gray-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .hero-gradient { background: linear-gradient(135deg, #122039 0%, #1a2f4e 60%, #1e3a5f 100%); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .animate-fadeup { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.15s; opacity:0; }
        .delay-2 { animation-delay: 0.3s; opacity:0; }
        .delay-3 { animation-delay: 0.45s; opacity:0; }
        @keyframes bounceIn { 0% { transform: translateY(20px); opacity:0; } 60% { transform: translateY(-4px); } 100% { transform: translateY(0); opacity:1; } }
        .animate-bounce-in { animation: bounceIn 0.5s ease forwards; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 bg-[#122039]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="font-display text-white text-lg tracking-tight">Rent by the Room</span>
          <ul className="hidden md:flex items-center gap-7">
            {[["Properties","properties"],["Why Us","why"],["FAQ","faq"],["Apply","apply"],["Contact","contact"]].map(([label,id]) => (
              <li key={id}>
                <button onClick={() => scrollTo(id)} className="text-white/70 hover:text-white text-sm font-medium transition-colors">{label}</button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => scrollTo("apply")}
            className="hidden md:inline-flex bg-[#E87722] hover:bg-[#cf6610] active:scale-95 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
          >
            Apply Now — $0
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#1a2f4e] border-t border-white/10 px-5 py-4 flex flex-col gap-3">
            {[["Properties","properties"],["Why Us","why"],["FAQ","faq"],["Apply","apply"],["Contact","contact"]].map(([label,id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-white/80 py-1 text-sm font-medium">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="hero-gradient min-h-[92vh] flex flex-col justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-3">
            <span className="inline-block bg-[#E87722]/20 text-[#E87722] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest animate-fadeup">
              Lincoln & Sacramento, CA
            </span>
          </div>
          <h1 className="font-display text-white text-6xl md:text-8xl leading-none mb-6 animate-fadeup delay-1">
            Rent<br />by the<br /><span className="text-[#E87722]">Room</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-md mb-10 animate-fadeup delay-2">
            Affordable, flexible, and move-in ready. <br />
            Find your room in a screened community — no credit check.
          </p>

          <div className="flex flex-wrap gap-4 mb-14 animate-fadeup delay-2">
            <button
              onClick={() => scrollTo("apply")}
              className="bg-[#E87722] hover:bg-[#cf6610] active:scale-95 text-white font-bold px-8 py-4 rounded-xl text-base uppercase tracking-wider shadow-xl transition-all"
            >
              Apply Now — It's Free
            </button>
            <button
              onClick={() => scrollTo("properties")}
              className="border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-xl text-base uppercase tracking-wider transition-all active:scale-95"
            >
              View Properties
            </button>
          </div>

          {/* Property cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeup delay-3">
            {PROPERTIES.map(p => (
              <div
                key={p.id}
                onClick={() => scrollTo("properties")}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-52"
              >
                <img src={p.heroImg} alt={p.address} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{p.address}</p>
                  <p className="text-white/60 text-xs">{p.city}</p>
                </div>
                <div className="absolute inset-0 bg-[#E87722]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE PILLS ── */}
      <section className="bg-[#f5f2ed] py-14 px-6">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "📅", label: "Flexible Stays", sub: "6, 12, or 24-month terms" },
              { icon: "🔒", label: "$0 Application", sub: "No credit check required" },
              { icon: "⚡", label: "Fast Move-In", sub: "As soon as 1 day after booking" },
              { icon: "☀️", label: "Solar-Powered", sub: "All utilities included" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <span className="text-3xl mb-3">{item.icon}</span>
                <p className="font-bold text-[#1a2f4e] text-sm">{item.label}</p>
                <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section id="why" className="bg-[#1a2f4e] py-20 px-6">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto">
            <p className="text-[#E87722] text-xs font-bold uppercase tracking-widest mb-3 text-center">Why Us</p>
            <h2 className="font-display text-white text-4xl text-center mb-14">Why Choose Rent by the Room</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="bg-amber-400 rounded-2xl p-6 relative hover:scale-105 transition-transform duration-200 cursor-default"
                  style={{ boxShadow: "6px 6px 0 rgba(0,0,0,0.15)" }}
                >
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="font-bold text-[#1a2f4e] text-base mb-1">{item.title}</h3>
                  <p className="text-[#1a2f4e]/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── PROPERTIES ── */}
      <section id="properties" className="bg-white py-20 px-6">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto">
            <p className="text-[#E87722] text-xs font-bold uppercase tracking-widest mb-3">Our Properties</p>
            <h2 className="font-display text-[#1a2f4e] text-4xl mb-14">Find Your Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROPERTIES.map(p => (
                <PropertyCard key={p.id} property={p} onApply={handleApply} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-[#1a2f4e] py-20 px-6">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <p className="text-[#E87722] text-xs font-bold uppercase tracking-widest mb-3 text-center">Got Questions?</p>
            <h2 className="font-display text-white text-4xl text-center mb-12">Frequently Asked Questions</h2>
            <div className="bg-white/5 rounded-2xl p-6">
              {FAQS.map((faq, i) => <FaqItem key={i} {...faq} />)}
            </div>
            <p className="text-center text-white/40 text-sm mt-8">
              Still have questions?{" "}
              <button onClick={() => scrollTo("contact")} className="text-amber-400 hover:underline">Contact us</button>
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="bg-[#f5f2ed] py-20 px-6">
        <AnimatedSection>
          <div className="max-w-xl mx-auto">
            <p className="text-[#E87722] text-xs font-bold uppercase tracking-widest mb-3 text-center">Join Us</p>
            <h2 className="font-display text-[#1a2f4e] text-4xl text-center mb-3">Member Application</h2>
            <p className="text-gray-500 text-center text-sm mb-10">Free, 5-minute self-reported application — no credit check.</p>

            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Full Name</label>
                  <input className={inputClass("name")} placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({...f,name:e.target.value}))} />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Phone</label>
                  <input className={inputClass("phone")} placeholder="(323) 000-0000" value={form.phone} onChange={e => setForm(f => ({...f,phone:e.target.value}))} />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Email</label>
                <input className={inputClass("email")} placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))} />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Preferred Property</label>
                <select className={inputClass("property")} value={form.property} onChange={e => setForm(f => ({...f,property:e.target.value}))}>
                  <option value="">Choose a property…</option>
                  {PROPERTIES.map(p => <option key={p.id} value={`${p.address}, ${p.city}`}>{p.address}, {p.city}</option>)}
                </select>
                {formErrors.property && <p className="text-red-500 text-xs mt-1">{formErrors.property}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Lease Term</label>
                <select className={inputClass("term")} value={form.term} onChange={e => setForm(f => ({...f,term:e.target.value}))}>
                  <option value="">Choose a term…</option>
                  <option>6 months</option>
                  <option>12 months</option>
                  <option>24 months</option>
                  <option>Other — I'll explain in notes</option>
                </select>
                {formErrors.term && <p className="text-red-500 text-xs mt-1">{formErrors.term}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Desired Move-In Date</label>
                <input type="date" className={inputClass("movein")} value={form.movein} onChange={e => setForm(f => ({...f,movein:e.target.value}))} />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Additional Notes</label>
                <textarea
                  className={`${inputClass("notes")} resize-none`}
                  rows={3}
                  placeholder="Tell us anything else we should know…"
                  value={form.notes}
                  onChange={e => setForm(f => ({...f,notes:e.target.value}))}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all active:scale-95 shadow-md ${submitting ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#E87722] hover:bg-[#cf6610] text-white shadow-orange-200 hover:shadow-lg"}`}
              >
                {submitting ? "Submitting…" : "Submit Application — Free"}
              </button>

              <p className="text-center text-gray-400 text-xs">No credit check · No application fee · Move in as fast as tomorrow</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[#1a2f4e] py-20 px-6">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#E87722] text-xs font-bold uppercase tracking-widest mb-3">Get in Touch</p>
              <h2 className="font-display text-white text-4xl mb-8">Contact Us</h2>
              {[
                { icon: "👤", label: "Contact", value: "Jude", href: null },
                { icon: "✉️", label: "Email", value: "RentByTheRoomProperties@gmail.com", href: "mailto:RentByTheRoomProperties@gmail.com" },
                { icon: "📞", label: "Phone", value: "(323) 503-1862", href: "tel:+13235031862" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="text-white font-semibold text-sm hover:text-amber-400 transition-colors">{item.value}</a>
                      : <p className="text-white font-semibold text-sm">{item.value}</p>
                    }
                  </div>
                </div>
              ))}
              <button
                onClick={() => { window.location.href = "mailto:RentByTheRoomProperties@gmail.com"; showToast("Opening your email client…"); }}
                className="mt-4 bg-[#E87722] hover:bg-[#cf6610] active:scale-95 text-white font-bold px-7 py-3 rounded-xl text-sm uppercase tracking-wider transition-all shadow-md"
              >
                Send an Email
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden h-72 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80" alt="Property" className="w-full h-full object-cover" />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0d1a2e] py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-white text-base">Rent by the Room Properties</span>
        <div className="flex gap-6">
          {[["properties","Properties"],["why","Why Us"],["faq","FAQ"],["apply","Apply"],["contact","Contact"]].map(([id,label]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-white/40 hover:text-white text-xs transition-colors">{label}</button>
          ))}
        </div>
        <p className="text-white/30 text-xs">© 2025 Rent by the Room Properties · Lincoln & Sacramento, CA</p>
      </footer>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
