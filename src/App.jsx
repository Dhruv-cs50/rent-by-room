import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";

// Layout shell shared by every route. Holds the global toast and exposes
// showToast to child routes via Outlet context.
export default function App() {
  const [toast, setToast] = useState(null);
  const showToast = (msg) => setToast(msg);

  return (
    <div className="font-sans antialiased text-gray-800">
      <Nav />
      <Outlet context={{ showToast }} />
      <Footer />
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
