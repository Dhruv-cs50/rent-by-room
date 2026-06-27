import "@testing-library/jest-dom";

// jsdom lacks IntersectionObserver — App.jsx uses it for scroll reveals.
class IntersectionObserverMock {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver = IntersectionObserverMock;
