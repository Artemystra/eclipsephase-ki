import kiConfig from "../../module/ki-config.js";

let rules = {};
const KI_STRAINS = ["crucible", "redline", "signal", "ruin", "colony"];

/**
 * Loads the module afresh and fires the hooks Foundry would, returning what it registered.
 * @returns {Object} The strain-family definition the module handed to the registry
 */
function loadModule() {
  const registered = {};
  rules = {};
  global.__ki.reset();
  jest.isolateModules(() => {
    require("../../module/index.js");
  });
  Hooks.callAll("init");
  Hooks.callAll("eclipsephase.ready", {
    api: { registry: { registerStrainFamily: (id, definition) => { registered[id] = definition; }, registerLandingRule: (id, definition) => { rules[id] = definition; } } }
  });
  return registered;
}

describe("the tables the module contributes", () => {
  test("it brings the Ki sub-strains and their influence table", () => {
    expect(Object.keys(kiConfig.kiStrains)).toEqual(expect.arrayContaining(KI_STRAINS));
    expect(Object.keys(kiConfig.kiInfluence).sort()).toEqual([...KI_STRAINS].sort());
  });

  test("every sub-strain's influence table covers results two to six", () => {
    for (const strain of KI_STRAINS) {
      expect(Object.keys(kiConfig.kiInfluence[strain]).sort()).toEqual(["2", "3", "4", "5", "6"]);
    }
  });

  test("it brings an option list for every dropdown the sheet renders", () => {
    expect(Object.keys(kiConfig).length).toEqual(20);
  });

  test("merging leaves the core's own config alone", () => {
    loadModule();
    expect(CONFIG.eclipsephase.strains).toBeUndefined();
    expect(CONFIG.eclipsephase.kiStrains).toEqual(kiConfig.kiStrains);
  });

  test("it adds Ki to the family dropdown without dropping Psi", () => {
    loadModule();
    expect(CONFIG.eclipsephase.strainFamilies).toEqual({
      psi: "ep2e.item.aspect.table.family.psi",
      ki: "ep2e.item.aspect.table.family.ki"
    });
  });
});

describe("who Ki reaches and what it drains", () => {
  test("machines and cyberbrains are reached, biological brains and infomorphs are not", () => {
    const { refuses } = loadModule().ki.targeting;
    expect(refuses({}, ["synthmorph"])).toBeNull();
    expect(refuses({}, ["bot"])).toBeNull();
    expect(refuses({}, ["vehicle"])).toBeNull();
    expect(refuses({}, ["biomorph", "cyberbrain"])).toBeNull();
    expect(refuses({}, ["biomorph"])).toBe("biomorph");
    expect(refuses({}, ["animal"])).toBe("animal");
    expect(refuses({}, ["infomorph"])).toBe("infomorph");
    const { modifiers, doublesRange, resist, durationAptitude } = loadModule().ki.targeting;
    expect(modifiers({}, ["biomorph", "cyberbrain"]).map(entry => entry.value)).toEqual([-30]);
    expect(modifiers({}, ["synthmorph", "cyberbrain"])).toEqual([]);
    expect(doublesRange({ items: [{ type: "aspect", system: { strainFamily: "ki" } }] })).toBe(true);
    expect(doublesRange({ items: [{ type: "traits", name: "Ki II" }] })).toBe(true);
    expect(doublesRange({ items: [{ type: "aspect", system: { strainFamily: "psi" } }] })).toBe(false);
    expect(resist).toEqual({ aptitude: "som", pool: "Vigor" });
    expect(durationAptitude).toBe("som");
  });

  test("Power Drain takes Vigor per its potency, never below zero", async () => {
    loadModule();
    const update = jest.fn();
    global.game = { ...(global.game ?? {}), i18n: { format: key => key } };
    const api = { attacks: { sleightPotency: () => ({ count: 2, factor: 2 }) }, ui: { postCard: jest.fn() } };
    Hooks.callAll("eclipsephase.ready", { api: { ...api, registry: { registerStrainFamily: () => {}, registerLandingRule: (id, definition) => { rules[id] = definition; } } } });
    await rules.kiPowerDrain.onLand({ target: { name: "Bot", system: { pools: { vigor: { value: 3 } } }, update }, landing: { name: "Power Drain" }, result: 4 });
    expect(update).toHaveBeenCalledWith({ "system.pools.vigor.value": 0 });
    expect(api.ui.postCard).toHaveBeenCalledTimes(1);
  });
});

describe("the strain family the module registers", () => {
  test("it registers itself as ki through the public registry", () => {
    expect(Object.keys(loadModule())).toEqual(["ki"]);
  });

  test("its data lives in the module's own flags, not in system data", () => {
    expect(loadModule().ki.dataPath).toEqual("flags.eclipsephase-ki.subStrain");
  });

  test("its prerequisite traits point at the module's own compendium", () => {
    const { tierTraits } = loadModule().ki;
    expect(tierTraits[1]).toEqual({ name: "Ki I", pack: "eclipsephase-ki.ki-sleights" });
    expect(tierTraits[2]).toEqual({ name: "Ki II", pack: "eclipsephase-ki.ki-sleights" });
  });

  test("its details partial is served from the module", () => {
    expect(loadModule().ki.detailsPartial).toEqual("modules/eclipsephase-ki/templates/strain-details-ki.html");
  });

  test("feedback damage goes to the mental track", () => {
    expect(loadModule().ki.feedback).toEqual({ target: "mental", copyKey: "ep2e.ki.effect.takeStrain" });
  });

  test("its substrate rule needs a Cyberbrain and penalises a biological body", () => {
    const { substrate } = loadModule().ki;
    game.eclipsephase.api.actors = {
      CYBERBRAIN_MARKER: "flags.eclipsephase.grantsCyberbrain",
      sleevedNervousSystem: actor => actor.nervousSystem,
      chainHasWareMarker: actor => actor.cyberbrain === true
    };

    expect(substrate({ nervousSystem: "synth", cyberbrain: false }).blocked).toBe(true);
    expect(substrate({ nervousSystem: "info", cyberbrain: true }).blocked).toBe(true);
    expect(substrate({ nervousSystem: "synth", cyberbrain: true })).toMatchObject({ blocked: false, penalised: false });
    expect(substrate({ nervousSystem: "bio", cyberbrain: true })).toMatchObject({ blocked: false, penalised: true });
  });

  test("jamming never blocks Ki the way it blocks Psi", () => {
    const { substrate } = loadModule().ki;
    game.eclipsephase.api.actors = {
      CYBERBRAIN_MARKER: "x",
      sleevedNervousSystem: () => "synth",
      chainHasWareMarker: () => true
    };
    expect(substrate({ system: { activeJam: "morph1" } }).jamBlocked).toBe(false);
  });
});

describe("the influence resolver the module brings", () => {
  test("result one is always cognitive feedback", () => {
    const resolved = loadModule().ki.influence(1, { strainLabel: "crucible", archetypeData: {} });
    expect(resolved).toEqual({ label: "ep2e.ki.effect.cognitiveFeedback", copy: "ep2e.ki.effect.takeStrain", withRule: true });
  });

  test("a row with a base takes the player's own choice", () => {
    const resolved = loadModule().ki.influence(2, {
      strainLabel: "crucible",
      archetypeData: { influence2: { description: "work" } }
    });
    expect(resolved.label).toEqual("ep2e.ki.effect.crucible.preoccupation.label");
    expect(resolved.copy).toEqual("ep2e.ki.effect.crucible.preoccupation.work");
  });

  test("a row with fixed copy ignores any stored choice", () => {
    const resolved = loadModule().ki.influence(5, { strainLabel: "crucible", archetypeData: { influence5: { description: "ignored" } } });
    expect(resolved.copy).toEqual("ep2e.ki.effect.crucible.motivation.text");
  });

  test("an unchosen option resolves to no copy rather than a broken key", () => {
    const resolved = loadModule().ki.influence(2, { strainLabel: "crucible", archetypeData: { influence2: { description: "none" } } });
    expect(resolved.copy).toEqual("");
  });

  test("a sub-strain the table does not know resolves to nothing instead of throwing", () => {
    expect(() => loadModule().ki.influence(3, { strainLabel: "architect", archetypeData: {} })).not.toThrow();
  });
});
