import { describe, expect, it } from "vitest";
import { navItems } from "./nav";

describe("navItems", () => {
  it("localizes every link", () => {
    expect(navItems("fr", "/").map((item) => item.href)).toEqual([
      "/fr/work/",
      "/fr/#services",
      "/fr/about/",
      "/fr/contact/",
    ]);
  });

  it("labels links in the page's language", () => {
    expect(navItems("fr", "/").map((item) => item.label)).toEqual(["Réalisations", "Services", "À propos", "Contact"]);
  });

  it("marks the section of the current page as active", () => {
    const active = (path: string) =>
      navItems("en", path)
        .filter((item) => item.active)
        .map((item) => item.label);
    expect(active("/work/prnow/")).toEqual(["Work"]);
    expect(active("/services/ai-transcription-apps/")).toEqual(["Services"]);
    expect(active("/")).toEqual([]);
  });

  it("marks an item exact only on its own page", () => {
    const work = (path: string) => navItems("en", path).find((item) => item.label === "Work");
    expect(work("/work/")).toMatchObject({ active: true, exact: true });
    expect(work("/work/prnow/")).toMatchObject({ active: true, exact: false });
    expect(work("/about/")).toMatchObject({ active: false, exact: false });
  });

  it("never marks the Services link exact, since it points at a section of the home page", () => {
    const services = navItems("en", "/").find((item) => item.label === "Services");
    expect(services).toMatchObject({ active: false, exact: false });
  });
});
