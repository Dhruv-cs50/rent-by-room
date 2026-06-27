import { useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  ["properties", "Properties"],
  ["why", "Why Us"],
  ["faq", "FAQ"],
  ["apply", "Apply"],
  ["contact", "Contact"],
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="bg-[#0d1a2e] py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display text-white text-base">Rent by the Room Properties</span>
      <div className="flex gap-6 flex-wrap justify-center">
        {LINKS.map(([id, label]) => (
          <button key={id} onClick={() => goToSection(id)} className="text-white/40 hover:text-white text-xs transition-colors">{label}</button>
        ))}
      </div>
      <p className="text-white/30 text-xs">© 2025 Rent by the Room Properties · Lincoln & Sacramento, CA</p>
    </footer>
  );
}
