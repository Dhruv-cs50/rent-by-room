import RoomCard from "./RoomCard.jsx";

export default function RoomGrid({ rooms, cols = "grid-cols-3" }) {
  return (
    <div className={`grid ${cols} gap-2`}>
      {rooms.map((r, i) => <RoomCard key={i} room={r} />)}
    </div>
  );
}
