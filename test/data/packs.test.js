import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
const SOURCE = path.join(ROOT, "src", "packs", "ki-sleights");

/**
 * Every source document of the module's compendium, split into items and folders.
 * @returns {{items: Object[], folders: Object[]}} The documents
 */
function packDocuments() {
  const all = fs.readdirSync(SOURCE)
    .filter(file => file.endsWith(".json"))
    .map(file => ({ file, data: JSON.parse(fs.readFileSync(path.join(SOURCE, file), "utf8")) }));
  return {
    items: all.filter(entry => entry.data.system !== undefined),
    folders: all.filter(entry => entry.data.system === undefined)
  };
}

describe("the Ki sleight compendium", () => {
  const { items, folders } = packDocuments();
  const sleights = items.filter(entry => entry.data.type === "aspect");
  const traits = items.filter(entry => entry.data.type === "traits");

  test("it carries the forty Ki sleights", () => {
    expect(sleights).toHaveLength(40);
  });

  test("every sleight is an aspect belonging to the Ki family", () => {
    const offenders = sleights.filter(entry => entry.data.system.strainFamily !== "ki").map(entry => entry.file);
    expect(offenders).toEqual([]);
  });

  test("every sleight declares a known psi type", () => {
    const known = new Set(["chi", "gamma", "epsilon"]);
    const offenders = sleights.filter(entry => !known.has(entry.data.system.psiType)).map(entry => entry.file);
    expect(offenders).toEqual([]);
  });

  test("it carries the two prerequisite traits the registry points at", () => {
    expect(traits.map(entry => entry.data.name).sort()).toEqual(["Ki I", "Ki II"]);
  });

  test("the traits sit at the compendium root, not in a folder left behind by the core pack", () => {
    expect(traits.every(entry => !entry.data.folder)).toBe(true);
  });

  test("it brings the Ki folder and its two sub-folders", () => {
    expect(folders).toHaveLength(3);
    expect(folders.map(entry => entry.data.name).sort()).toEqual(["Chi", "Gamma", "Ki"]);
  });

  test("every document carries an id, so packing keeps them stable", () => {
    const offenders = [...items, ...folders].filter(entry => !entry.data._id).map(entry => entry.file);
    expect(offenders).toEqual([]);
  });
});
