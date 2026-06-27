import { useState, useEffect, useCallback } from "react";

export default function ListingGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 group">
        <img
          src={images[active]}
          alt={`${alt} — view ${active + 1}`}
          className="w-full aspect-[16/10] object-cover cursor-zoom-in"
          onClick={() => setLightbox(true)}
        />
        <button onClick={prev} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white text-xl flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">‹</button>
        <button onClick={next} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white text-xl flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">›</button>
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">{active + 1} / {images.length}</div>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === active ? "border-[#E87722] scale-105" : "border-transparent opacity-70 hover:opacity-100"}`}
          >
            <img src={img} alt={`thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-bounce-in"
          onClick={() => setLightbox(false)}
        >
          <button onClick={() => setLightbox(false)} aria-label="Close" className="absolute top-5 right-6 text-white/80 hover:text-white text-4xl leading-none">×</button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" className="absolute left-4 md:left-10 text-white/70 hover:text-white text-5xl">‹</button>
          <img src={images[active]} alt={`${alt} — enlarged`} className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" className="absolute right-4 md:right-10 text-white/70 hover:text-white text-5xl">›</button>
          <div className="absolute bottom-6 text-white/70 text-sm">{active + 1} / {images.length}</div>
        </div>
      )}
    </div>
  );
}
