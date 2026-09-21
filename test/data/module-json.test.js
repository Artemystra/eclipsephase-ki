import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "module.json"), "utf8"));

describe("the module manifest", () => {
  test("it identifies itself as the Ki module", () => {
    expect(manifest.id).toEqual("eclipsephase-ki");
    expect(manifest.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test("it requires a system version that has the strain-family registry", () => {
    const system = manifest.relationships.systems.find(entry => entry.id === "eclipsephase");
    expect(system.compatibility.minimum).toEqual("2.5");
  });

  test("it declares no document sub-type, since Ki adds no actor or item type", () => {
    expect(manifest.documentTypes).toBeUndefined();
  });

  test("every file it points at exists", () => {
    for (const relative of [...manifest.esmodules, ...manifest.languages.map(l => l.path)]) {
      expect(fs.existsSync(path.join(ROOT, relative))).toBe(true);
    }
  });

  test("it ships the Ki sleight compendium", () => {
    const pack = manifest.packs.find(entry => entry.name === "ki-sleights");
    expect(pack.type).toEqual("Item");
    expect(pack.system).toEqual("eclipsephase");
    expect(fs.existsSync(path.join(ROOT, pack.path))).toBe(true);
  });

  test("it offers all five languages", () => {
    expect(manifest.languages.map(entry => entry.lang).sort()).toEqual(["cn", "de", "en", "es", "pt-BR"]);
  });
});
