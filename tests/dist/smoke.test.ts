import { describe, expect, it } from "vitest";
import { pageExists, readPage } from "./helpers";

describe("build output", () => {
  it("builds the English home page as static HTML", () => {
    expect(pageExists("/")).toBe(true);
    expect(readPage("/").querySelector("html")?.getAttribute("lang")).toBe("en");
  });
});
