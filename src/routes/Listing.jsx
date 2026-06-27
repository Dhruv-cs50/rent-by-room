import { useEffect } from "react";
import { useParams, Navigate, Link, useNavigate, useOutletContext } from "react-router-dom";
import { PROPERTIES, getPropertyBySlug } from "../data/properties.js";
import ListingGallery from "../components/ListingGallery.jsx";
import RoomGrid from "../components/RoomGrid.jsx";
import ApplyForm from "../components/ApplyForm.jsx";
import AnimatedSection from "../components/AnimatedSection.jsx";

export default function Listing() {
  const { slug } = useParams();
  const { showToast } = useOutletContext();
  const navigate = useNavigate();
  const property = getPropertyBySlug(slug);

  // scroll to top on slug change
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!property) return <Navigate to="/" replace />;

  const idx = PROPERTIES.findIndex((p) => p.slug === slug);
  const prev = PROPERTIES[(idx - 1 + PROPERTIES.length) % PROPERTIES.length];
  const next = PROPERTIES[(idx + 1) % PROPERTIES.length];

  const scrollToApply = () => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-gradient pt-10 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="text-white/50 text-sm mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/" state={{ scrollTo: "properties" }} className="hover:text-amber-400 transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-white/80">{property.address}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-block bg-amber-400 text-[#1a2f4e] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">{property.tag}</span>
              <h1 className="font-display text-white text-4xl md:text-5xl leading-tight">{property.address}</h1>
              <p className="text-white/60 text-lg mt-1">{property.city}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {[`🛏 ${property.beds}`, `🚿 ${property.baths}`, `${property.stories}🏠`].map((b, i) => (
                  <span key={i} className="bg-white/10 text-white text-sm font-bold px-3 py-2 rounded-xl">{b}</span>
                ))}
              </div>
              <div className="text-right">
                <p className="text-[#E87722] font-display text-3xl">${property.price}<span className="text-white/50 text-base font-sans">/mo</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY + DETAILS ── */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <ListingGallery images={property.gallery} alt={property.address} />
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h2 className="font-display text-[#1a2f4e] text-2xl mb-4">What's included</h2>
            <ul className="space-y-3 mb-8">
              {property.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>

            <h2 className="font-display text-[#1a2f4e] text-2xl mb-4">📍 Nearby</h2>
            <ul className="space-y-2 mb-8">
              {property.nearby.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>

            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(property.address + " " + property.city)}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#E87722] text-sm font-semibold hover:underline mb-6 inline-block"
            >
              View on Google Maps →
            </a>

            <button
              onClick={scrollToApply}
              className="mt-auto w-full bg-[#E87722] hover:bg-[#cf6610] active:scale-95 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Apply for this room — $0
            </button>
          </div>
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section className="bg-[#f5f2ed] py-16 px-6">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-[#1a2f4e] text-3xl mb-8">Inside the home</h2>
            <RoomGrid rooms={property.rooms} cols="grid-cols-2 md:grid-cols-3" />
          </div>
        </AnimatedSection>
      </section>

      {/* ── APPLY (prefilled) ── */}
      <ApplyForm initialProperty={`${property.address}, ${property.city}`} onToast={showToast} />

      {/* ── PREV / NEXT ── */}
      <section className="bg-white py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between gap-4">
          <button onClick={() => navigate(`/listings/${prev.slug}`)} className="text-left group flex-1">
            <span className="text-gray-400 text-xs uppercase tracking-wider">← Previous</span>
            <p className="font-semibold text-[#1a2f4e] text-sm group-hover:text-[#E87722] transition-colors">{prev.address}</p>
          </button>
          <button onClick={() => navigate(`/listings/${next.slug}`)} className="text-right group flex-1">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Next →</span>
            <p className="font-semibold text-[#1a2f4e] text-sm group-hover:text-[#E87722] transition-colors">{next.address}</p>
          </button>
        </div>
      </section>
    </>
  );
}
