// Vitest global setup for the plugin package tests
// - Ensures JSDOM env has a predictable starting state
// - Imports the host-sdk mock so component tests work without the host
import "../fixtures/mock-host-sdk";

// Ensure no lingering theme between tests
beforeEach(() => {
  document.documentElement.removeAttribute("data-theme");
});

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
});

