import { describe, expect, it } from "vitest";
import { findForbidden, loadPrivateNames } from "./forbidden";

describe("findForbidden", () => {
  it("finds private product names regardless of case, in list order", () => {
    expect(findForbidden("Built on AcmeAPI and BetaTranscribe", ["acmeapi", "betatranscribe"])).toEqual(["acmeapi", "betatranscribe"]);
  });

  it("finds retired claims, in list order", () => {
    expect(findForbidden("Escrow-protected, 190+ countries", [])).toEqual(["190+", "escrow"]);
  });

  it("lists private names first, then retired claims, then IP addresses", () => {
    expect(findForbidden("203.0.113.7 runs AcmeAPI with escrow", ["acmeapi"])).toEqual(["acmeapi", "escrow", "IPv4 203.0.113.7"]);
  });

  it("finds IPv4 addresses", () => {
    expect(findForbidden("server 203.0.113.7 is up", [])).toEqual(["IPv4 203.0.113.7"]);
  });

  it("ignores dotted numbers inside SVG path data", () => {
    expect(findForbidden('d="M10.6.2.8 3"', [])).toEqual([]);
  });

  it.each(["server 203.0.113.7.", "http://203.0.113.7/", "ip:203.0.113.7"])("finds an IPv4 address in %s", (text) => {
    expect(findForbidden(text, [])).toEqual(["IPv4 203.0.113.7"]);
  });

  it("passes clean copy, including three-part version numbers", () => {
    expect(findForbidden("PRNow sells 11 premium add-ons. Version 1.2.3 shipped.", [])).toEqual([]);
  });
});

describe("loadPrivateNames", () => {
  it("loads a non-empty list of names from forbidden.local.json", () => {
    const names = loadPrivateNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names.every((name) => typeof name === "string" && name.length > 0)).toBe(true);
  });
});
