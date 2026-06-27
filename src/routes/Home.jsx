import { useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { PROPERTIES, FAQS, WHY_ITEMS, CONTACT } from "../data/properties.js";
import AnimatedSection from "../components/AnimatedSection.jsx";
import PropertyCard from "../components/PropertyCard.jsx";
import FaqItem from "../components/FaqItem.jsx";
import ApplyForm from "../components/ApplyForm.jsx";

export default function Home() {
  const { showToast } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  // When navigating home from another route with a section target, scroll to it.
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.state]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
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

          {/* Property preview row — links to detail pages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeup delay-3">
            {PROPERTIES.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/listings/${p.slug}`)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-52 text-left"
              >
                <img src={p.heroImg} alt={p.address} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#E87722] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">${p.price}/mo</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{p.address}</p>
                  <p className="text-white/60 text-xs">{p.city}</p>
                </div>
                <div className="absolute inset-0 bg-[#E87722]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
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
              {PROPERTIES.map((p) => <PropertyCard key={p.id} property={p} />)}
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
      <ApplyForm onToast={showToast} />

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[#1a2f4e] py-20 px-6">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#E87722] text-xs font-bold uppercase tracking-widest mb-3">Get in Touch</p>
              <h2 className="font-display text-white text-4xl mb-8">Contact Us</h2>
              {[
                { icon: "👤", label: "Contact", value: CONTACT.name, href: null },
                { icon: "✉️", label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { icon: "📞", label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="text-white font-semibold text-sm hover:text-amber-400 transition-colors">{item.value}</a>
                      : <p className="text-white font-semibold text-sm">{item.value}</p>}
                  </div>
                </div>
              ))}
              <button
                onClick={() => { window.location.href = `mailto:${CONTACT.email}`; showToast("Opening your email client…"); }}
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
    </>
  );
}
