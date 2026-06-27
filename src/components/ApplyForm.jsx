import { useState, useEffect } from "react";
import { PROPERTIES } from "../data/properties.js";
import AnimatedSection from "./AnimatedSection.jsx";

const EMPTY = { name: "", email: "", phone: "", property: "", term: "", movein: "", notes: "" };

export default function ApplyForm({ initialProperty = "", onToast }) {
  const [form, setForm] = useState({ ...EMPTY, property: initialProperty });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // keep prefilled property in sync when arriving from a listing page
  useEffect(() => {
    if (initialProperty) setForm((f) => ({ ...f, property: initialProperty }));
  }, [initialProperty]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.property) e.property = "Select a property";
    if (!form.term) e.term = "Select a lease term";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      // focus first invalid field
      const first = document.querySelector(`[data-field="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ ...EMPTY });
      setErrors({});
      onToast?.("Application submitted! We'll be in touch within 24 hours.");
    }, 1400);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm bg-white transition-colors focus:outline-none focus:border-[#E87722] ${errors[field] ? "border-red-400" : "border-gray-200"}`;

  const set = (field) => (ev) => setForm((f) => ({ ...f, [field]: ev.target.value }));

  return (
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
                <input data-field="name" className={inputClass("name")} placeholder="Jane Smith" value={form.name} onChange={set("name")} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Phone</label>
                <input data-field="phone" className={inputClass("phone")} placeholder="(323) 000-0000" value={form.phone} onChange={set("phone")} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Email</label>
              <input data-field="email" className={inputClass("email")} placeholder="you@email.com" value={form.email} onChange={set("email")} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Preferred Property</label>
              <select data-field="property" className={inputClass("property")} value={form.property} onChange={set("property")}>
                <option value="">Choose a property…</option>
                {PROPERTIES.map((p) => (
                  <option key={p.id} value={`${p.address}, ${p.city}`}>{p.address}, {p.city}</option>
                ))}
              </select>
              {errors.property && <p className="text-red-500 text-xs mt-1">{errors.property}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Lease Term</label>
              <select data-field="term" className={inputClass("term")} value={form.term} onChange={set("term")}>
                <option value="">Choose a term…</option>
                <option>6 months</option>
                <option>12 months</option>
                <option>24 months</option>
                <option>Other — I'll explain in notes</option>
              </select>
              {errors.term && <p className="text-red-500 text-xs mt-1">{errors.term}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Desired Move-In Date</label>
              <input data-field="movein" type="date" className={inputClass("movein")} value={form.movein} onChange={set("movein")} />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a2f4e] mb-1.5 uppercase tracking-wide">Additional Notes</label>
              <textarea data-field="notes" className={`${inputClass("notes")} resize-none`} rows={3} placeholder="Tell us anything else we should know…" value={form.notes} onChange={set("notes")} />
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
  );
}
