import { useState } from "react";

export default function FaqItem({ q, a }) {
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
