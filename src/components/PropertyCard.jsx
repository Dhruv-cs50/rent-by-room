import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomGrid from "./RoomGrid.jsx";

export default function PropertyCard({ property }) {
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();
  const tabs = ["details", "rooms", "location"];

  const openListing = () => navigate(`/listings/${property.slug}`);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Hero image — click opens detail page */}
      <button onClick={openListing} className="relative h-56 overflow-hidden text-left group">
        <img src={property.heroImg} alt={property.address} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
        <div className="absolute top-3 left-3">
          <span className="bg-[#E87722] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">${property.price}/mo</span>
        </div>
      </button>

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
        {activeTab === "rooms" && <RoomGrid rooms={property.rooms} />}
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
      <div className="px-5 pb-5 mt-auto flex gap-3">
        <button
          onClick={openListing}
          className="flex-1 bg-[#E87722] hover:bg-[#cf6610] active:scale-95 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-wider transition-all duration-150 shadow-md hover:shadow-lg"
        >
          View Listing
        </button>
        <button
          onClick={openListing}
          className="px-4 py-3 border-2 border-[#1a2f4e] text-[#1a2f4e] hover:bg-[#1a2f4e] hover:text-white rounded-xl text-sm font-bold transition-all duration-150 active:scale-95"
        >
          🎥 Tour
        </button>
      </div>
    </div>
  );
}
