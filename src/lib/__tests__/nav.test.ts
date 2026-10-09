import { describe, expect, it } from "vitest";
import { digitizingNav, printingNav, productsNav } from "@/lib/nav";
import { routes } from "@/lib/services";

describe("service category destinations", () => {
  it("sends Printing and the homepage print group to the printing overview", () => {
    expect(printingNav.href).toBe("/printing");
    expect(printingNav.children.map((item) => item.href)).toEqual(["/screen-printing", "/dtf-printing"]);
    expect(routes.find((route) => route.id === "printing")?.href).toBe("/printing");
  });

  it("keeps Digitizing and Custom Products on their overview pages", () => {
    expect(digitizingNav.href).toBe("/digitizing-artwork");
    expect(productsNav.href).toBe("/custom-products");
    expect(routes.find((route) => route.id === "digitizing")?.href).toBe("/digitizing-artwork");
    expect(routes.find((route) => route.id === "products")?.href).toBe("/custom-products");
  });
});
