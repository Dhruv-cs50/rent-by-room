import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  ["Properties", "properties"],
  ["Why Us", "why"],
  ["FAQ", "faq"],
  ["Apply", "apply"],
  ["Contact", "contact"],
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to a home-page section. If we're on another route, go home first
  // then scroll once the section exists.
  const goToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#122039]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="font-display text-white text-lg tracking-tight hover:text-amber-400 transition-colors"
        >
          Rent by the Room
        </button>
        <ul className="hidden md:flex items-center gap-7">
          {LINKS.map(([label, id]) => (
            <li key={id}>
              <button onClick={() => goToSection(id)} className="text-white/70 hover:text-white text-sm font-medium transition-colors">{label}</button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => goToSection("apply")}
          className="hidden md:inline-flex bg-[#E87722] hover:bg-[#cf6610] active:scale-95 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
        >
          Apply Now — $0
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl" aria-label="Menu">☰</button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#1a2f4e] border-t border-white/10 px-5 py-4 flex flex-col gap-3">
          {LINKS.map(([label, id]) => (
            <button key={id} onClick={() => goToSection(id)} className="text-left text-white/80 py-1 text-sm font-medium">{label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
