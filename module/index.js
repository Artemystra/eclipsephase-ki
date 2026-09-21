import kiConfig from "./ki-config.js";

const MODULE_ID = "eclipsephase-ki";
const DETAILS_PARTIAL = "modules/eclipsephase-ki/templates/strain-details-ki.html";

// The Ki tables the sheet and the roll pipeline look up on CONFIG.eclipsephase. Merged rather than
// assigned, so the core's own entries survive.
Hooks.once("init", () => {
  foundry.utils.mergeObject(CONFIG.eclipsephase, kiConfig);
  CONFIG.eclipsephase.strainFamilies.ki = "ep2e.item.aspect.table.family.ki";
});

// The sub-strain block the actor sheet renders for a Ki character.
Hooks.once("setup", async () => {
  await foundry.applications.handlebars.loadTemplates([DETAILS_PARTIAL]);
});

// Everything that differs between Ki and Psi, handed to the core's registry as one entry.
Hooks.once("eclipsephase.ready", ({ api }) => {
  api.registry.registerStrainFamily("ki", {
    label: "ep2e.item.aspect.table.family.ki",
    tabLabel: "ep2e.actorSheet.rightTabs.kiTab",
    substrate(actor) {
      const { sleevedNervousSystem, chainHasWareMarker, CYBERBRAIN_MARKER } = game.eclipsephase.api.actors;
      const nervousSystem = sleevedNervousSystem(actor);
      const blocked = nervousSystem === "info" || !chainHasWareMarker(actor, CYBERBRAIN_MARKER);
      return {
        blocked,
        jamBlocked: false,
        penalised: !blocked && nervousSystem === "bio",
        reasonKey: "ep2e.roll.announce.ki.noCyberbrain",
        tooltipKey: "ep2e.roll.announce.ki.substrateBlockedTooltip"
      };
    },
    subStrains: CONFIG.eclipsephase.kiStrains,
    influence(result, { strainLabel, archetypeData }) {
      if (result === 1) return { label: "ep2e.ki.effect.cognitiveFeedback", copy: "ep2e.ki.effect.takeStrain", withRule: true };

      const row = CONFIG.eclipsephase.kiInfluence[strainLabel]?.[result];
      const choice = archetypeData?.["influence" + result]?.description;
      const copy = row?.base ? (choice && choice !== "none" ? row.base + "." + choice : "") : row?.copy;

      return { label: row?.label, copy, withRule: true };
    },
    tierTraits: {
      1: { name: "Ki I", pack: "eclipsephase-ki.ki-sleights" },
      2: { name: "Ki II", pack: "eclipsephase-ki.ki-sleights" }
    },
    feedback: { target: "mental", copyKey: "ep2e.ki.effect.takeStrain" },
    mismatchKey: "ep2e.roll.announce.ki.substrateMismatch",
    dataPath: "flags.eclipsephase-ki.subStrain",
    detailsPartial: "modules/eclipsephase-ki/templates/strain-details-ki.html"
  });
});
