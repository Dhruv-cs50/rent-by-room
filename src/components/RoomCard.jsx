import { useState } from "react";

export default function RoomCard({ room }) {
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
