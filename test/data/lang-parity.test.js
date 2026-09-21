import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "..", "..");
const LANGUAGES = ["en", "de", "es", "pt-BR", "cn"];

/**
 * Every leaf key of a localization file, as a dot-path.
 * @param {Object} object - A parsed language file
 * @param {String} [prefix] - The path accumulated so far
 * @returns {String[]} The dot-paths
 */
function leafKeys(object, prefix = "") {
  return Object.entries(object).flatMap(([key, value]) => {
    const keyPath = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === "object" && !Array.isArray(value) ? leafKeys(value, keyPath) : [keyPath];
  });
}

/**
 * One of the module's language files.
 * @param {String} language - The language code
 * @returns {Object} The parsed file
 */
function readLanguage(language) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "lang", `${language}.json`), "utf8"));
}

describe("the module's language files", () => {
  test.each(LANGUAGES)("%s is valid JSON and carries keys", language => {
    expect(leafKeys(readLanguage(language)).length).toBeGreaterThan(0);
  });

  test.each(LANGUAGES.filter(language => language !== "en"))("%s has exactly the keys English has", language => {
    const english = leafKeys(readLanguage("en")).sort();
    expect(leafKeys(readLanguage(language)).sort()).toEqual(english);
  });

  test("every key belongs to this module, not to the core system", () => {
    const owned = ["ep2e.ki.", "ep2e.rule.ki.", "ep2e.roll.announce.ki.", "ep2e.actorSheet.rightTabs.kiTab", "ep2e.item.aspect.table.family.ki"];
    const strays = leafKeys(readLanguage("en")).filter(key => !owned.some(prefix => key === prefix || key.startsWith(prefix)));
    expect(strays).toEqual([]);
  });
});
