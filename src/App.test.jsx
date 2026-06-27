import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import { describe, it, expect } from "vitest";
import App from "./App.jsx";
import Home from "./routes/Home.jsx";
import Listing from "./routes/Listing.jsx";
import { PROPERTIES } from "./data/properties.js";

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="listings/:slug" element={<Listing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("Routing", () => {
  it("renders the home page hero", () => {
    renderAt("/");
    expect(screen.getAllByText(/Rent by the Room/i).length).toBeGreaterThan(0);
  });

  it("renders each listing detail page by slug", () => {
    PROPERTIES.forEach((p) => {
      const { unmount } = renderAt(`/listings/${p.slug}`);
      expect(screen.getAllByText(p.address).length).toBeGreaterThan(0);
      expect(screen.getByText(/What's included/i)).toBeTruthy();
      unmount();
    });
  });

  it("redirects unknown listing slug back home", () => {
    renderAt("/listings/does-not-exist");
    // Home hero present, listing-only heading absent
    expect(screen.getAllByText(/Rent by the Room/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/What's included/i)).toBeNull();
  });

  it("every property has a slug, price and gallery", () => {
    PROPERTIES.forEach((p) => {
      expect(p.slug).toBeTruthy();
      expect(typeof p.price).toBe("number");
      expect(p.gallery.length).toBeGreaterThan(0);
    });
  });
});
