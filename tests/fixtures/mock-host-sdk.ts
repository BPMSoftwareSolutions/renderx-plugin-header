import { vi } from "vitest";

// Global mock for @renderx/host-sdk used by plugin tests
vi.mock("@renderx/host-sdk", () => ({
  useConductor: () => ({
    play: vi.fn().mockImplementation(async (_pluginId: string, sequenceId: string, data?: any, callback?: (result: any) => void) => {
      let result: any = {};
      if (sequenceId === "header-ui-theme-get-symphony") {
        const current = document?.documentElement?.getAttribute("data-theme") || "light";
        // Fire optional streaming callback
        if (data && typeof data.onTheme === "function") {
          try { data.onTheme(current); } catch {}
        }
        result = { theme: current };
      } else if (sequenceId === "header-ui-theme-toggle-symphony") {
        const theme = (data?.theme as "light" | "dark") || "light";
        try { document?.documentElement?.setAttribute("data-theme", theme); } catch {}
        result = { theme };
      }
      if (typeof callback === "function") {
        try { callback(result); } catch {}
      }
      return result;
    })
  }),
  resolveInteraction: (interaction: string) => {
    if (interaction === "app.ui.theme.get") {
      return { pluginId: "HeaderThemePlugin", sequenceId: "header-ui-theme-get-symphony" };
    }
    return { pluginId: "HeaderThemePlugin", sequenceId: "header-ui-theme-toggle-symphony" };
  }
}));

export {};

