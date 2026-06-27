// ─── Single source of truth for all listing data ────────────────────────────

export const PROPERTIES = [
  {
    id: 1,
    slug: "2105-1st-street-lincoln",
    address: "2105 1st Street",
    city: "Lincoln, CA 95648",
    tag: "Solar-Powered Haven",
    price: 950,
    beds: 6, baths: 3, stories: 2,
    heroImg: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80",
    features: [
      "Private bedrooms each with own full bathroom",
      "Spacious master suite with walk-in closet — ideal for couples",
      "Three non-master bedrooms upstairs sharing a full bathroom",
      "Two non-master bedrooms downstairs with full bath access",
      "Fully equipped kitchen & furnished living room",
      "Expansive backyard with stunning views",
    ],
    rooms: [
      { label: "Kitchen", sub: "Common Area", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
      { label: "Master Bedroom", sub: "Private", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" },
      { label: "Non-Primary Bedroom", sub: "Private", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { label: "Non-Primary Bathroom", sub: "Shared", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80" },
      { label: "Laundry Room", sub: "Common Area", img: "https://images.unsplash.com/photo-1558618047-3d3e4f0f7d7d?w=400&q=80" },
      { label: "Backyard", sub: "Common Area", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
    ],
    nearby: ["Sprouts Farmers Market — 1.2 mi", "Target — 1.4 mi", "Walmart — 1.4 mi", "Raley's Supermarket — 1.5 mi"],
  },
  {
    id: 2,
    slug: "3199-western-avenue-sacramento",
    address: "3199 Western Avenue",
    city: "Sacramento, CA 95838",
    tag: "North Sacramento Retreat",
    price: 875,
    beds: 5, baths: 3, stories: 1,
    heroImg: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80",
    features: [
      "Private unfurnished bedrooms with own full bathroom",
      "Expansive master bedroom with separate full bath — great for couples",
      "Four additional bedrooms sharing two full bathrooms",
      "Fully equipped kitchen & furnished living room",
      "Lush front and backyards with trees and plants",
      "Conveniently close to freeway access and all essentials",
    ],
    rooms: [
      { label: "Front Entry", sub: "Common Area", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" },
      { label: "Kitchen", sub: "Common Area", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
      { label: "Master Bedroom", sub: "Private", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" },
      { label: "Master Bathroom", sub: "Private", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80" },
      { label: "Non-Primary Bedroom", sub: "Private", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { label: "Non-Primary Bathroom", sub: "Shared", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80" },
    ],
    nearby: ["Power Market — 0.8 mi", "Safeway — 1.4 mi", "Walmart — 3.7 mi", "Sprouts Farmers Market — 5.8 mi", "Easy freeway access"],
  },
  {
    id: 3,
    slug: "940-cabra-street-lincoln",
    address: "940 Cabra Street",
    city: "Lincoln, CA 95648",
    tag: "Twelve Bridges Gem",
    price: 1050,
    beds: 6, baths: 3, stories: 2,
    heroImg: "/listings/940-cabra-street/exterior.jpg",
    features: [
      "Private unfurnished bedrooms with full bathroom — solar powered",
      "King-size master suite with walk-in closet — perfect for couples",
      "Three non-master bedrooms sharing an upstairs full bathroom",
      "Two downstairs bedrooms with full bath access",
      "Fully equipped kitchen, living room & upstairs loft",
      "Backyard patio with stunning sunset views over open field",
    ],
    rooms: [
      { label: "Kitchen", sub: "Common Area", img: "/listings/940-cabra-street/kitchen.jpg" },
      { label: "Dining Area", sub: "Common Area", img: "/listings/940-cabra-street/kitchen-dining.jpg" },
      { label: "Living Room", sub: "Common Area", img: "/listings/940-cabra-street/living-room-2.jpg" },
      { label: "Non-Primary Bedroom", sub: "Private", img: "/listings/940-cabra-street/bedroom.jpg" },
      { label: "Non-Primary Bathroom", sub: "Shared", img: "/listings/940-cabra-street/bathroom.jpg" },
      { label: "Backyard", sub: "Common Area", img: "/listings/940-cabra-street/backyard.jpg" },
    ],
    // Real photos from the 940 Cabra Street presentation — explicit gallery (all 9)
    gallery: [
      "/listings/940-cabra-street/exterior.jpg",
      "/listings/940-cabra-street/kitchen-dining.jpg",
      "/listings/940-cabra-street/kitchen.jpg",
      "/listings/940-cabra-street/living-room-1.jpg",
      "/listings/940-cabra-street/living-room-2.jpg",
      "/listings/940-cabra-street/bedroom.jpg",
      "/listings/940-cabra-street/bathroom.jpg",
      "/listings/940-cabra-street/patio.jpg",
      "/listings/940-cabra-street/backyard.jpg",
    ],
    nearby: ["Walgreens — 0.75 mi", "Kaiser — 0.1 mi", "Lincoln Parks & Recreation — 0.2 mi", "Grocery & hardware stores within 2 mi"],
  },
];

// For properties without an explicit gallery, build one from hero + room images.
PROPERTIES.forEach((p) => {
  if (!p.gallery) {
    p.gallery = [p.heroImg, ...p.rooms.map((r) => r.img)].filter(
      (url, i, arr) => arr.indexOf(url) === i
    );
  }
});

export const getPropertyBySlug = (slug) =>
  PROPERTIES.find((p) => p.slug === slug);

export const FAQS = [
  { q: "What is the application process?", a: "$0, 5-minute, self-reported application — no credit check required." },
  { q: "What is included in the monthly payment?", a: "Rent, utilities, and services are all bundled into one monthly payment." },
  { q: "What is the guest policy?", a: "Guests are welcome! We limit overnight stays to encourage a good quality of living for everyone." },
  { q: "What areas of the house are shared?", a: "Everything except living quarters and private bathrooms — kitchen, laundry, living room, and backyard are communal." },
  { q: "What are the lease duration options?", a: "6, 12, or 24-month terms offered. Other lengths are also considered — just ask." },
  { q: "How much is the security deposit?", a: "Equal to one month's rent." },
  { q: "Are pets allowed?", a: "Service animals are accepted." },
  { q: "Is the room furnished?", a: "No — you furnish your own room as well as your own dishware, cookware, and silverware." },
];

export const WHY_ITEMS = [
  { icon: "🏡", title: "Affordable Housing", desc: "$0, 5-minute self-reported application" },
  { icon: "📅", title: "Flexible Terms", desc: "Long-term or short-term accommodations" },
  { icon: "🔒", title: "Safe & Screened", desc: "All residents background-screened" },
  { icon: "⚡", title: "Fast Move-In", desc: "Move in as soon as 1 day after booking" },
];

export const CONTACT = {
  name: "Jude",
  email: "RentByTheRoomProperties@gmail.com",
  phone: "(323) 503-1862",
  phoneHref: "tel:+13235031862",
};
