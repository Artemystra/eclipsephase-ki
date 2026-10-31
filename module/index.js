import kiConfig from "./ki-config.js";

const MODULE_ID = "eclipsephase-ki";
const BIOLOGICAL = ["biomorph", "animal"];
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
    detailsPartial: "modules/eclipsephase-ki/templates/strain-details-ki.html",
    targeting: {
      refuses(actor, kinds) {
        if (kinds.includes("infomorph")) return "infomorph";
        if (kinds.includes("cyberbrain")) return null;
        return kinds.find(kind => BIOLOGICAL.includes(kind)) ?? null;
      },
      modifiers: (actor, kinds) => kinds.includes("cyberbrain") && kinds.some(kind => BIOLOGICAL.includes(kind)) ? [{ text: "ep2e.roll.announce.ki.biologicalBody", value: -30 }] : [],
      doublesRange: actor => !!actor?.items?.some(item => (item.type === "aspect" && item.system?.strainFamily === "ki") || (item.type === "traits" && ["Ki I", "Ki II"].includes(item.name))),
      resist: { aptitude: "som", pool: "Vigor" },
      durationAptitude: "som"
    },
    labels: { spendRez: "ep2e.ki.spendRez", infection: "ep2e.ki.rollInfection" }
  });

  api.registry.registerLandingRule("kiPowerDrain", {
    label: "ep2e.ki.landingRule.powerDrain",
    instant: true,
    async onLand({ target, landing, result }) {
      const { count, factor } = api.attacks.sleightPotency(landing, result);
      const vigor = Number(target.system?.pools?.vigor?.value) || 0;
      const lost = Math.min(vigor, count * factor);
      if (lost) await target.update({ "system.pools.vigor.value": vigor - lost });
      await api.ui.postCard(target, { icon: "fa-battery-quarter", color: "--iconBlue", headline: game.i18n.format("ep2e.ki.powerDrained", { sleight: landing.name, target: target.name, lost }) });
    }
  });
});
