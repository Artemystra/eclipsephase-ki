// The tables the Ki discipline needs on CONFIG.eclipsephase. The core system carries none of
// them; index.js merges this object in when the module loads.
const kiConfig = {};


kiConfig.kiStrains = {
    none: "ep2e.ki.strain.none",
    crucible: "ep2e.ki.strain.crucible",
    redline: "ep2e.ki.strain.redline",
    signal: "ep2e.ki.strain.signal",
    ruin: "ep2e.ki.strain.ruin",
    colony: "ep2e.ki.strain.colony"
}

kiConfig.cruciblePreoccupation = {
    none: "ep2e.ki.strain.none",
    enhance: "ep2e.ki.effect.crucible.preoccupation.enhance",
    recycle: "ep2e.ki.effect.crucible.preoccupation.recycle",
    research: "ep2e.ki.effect.crucible.preoccupation.research"
}

kiConfig.crucibleReconfiguration = {
    none: "ep2e.ki.strain.none",
    forced: "ep2e.ki.effect.crucible.reconfiguration.forced",
    shutdown: "ep2e.ki.effect.crucible.reconfiguration.shutdown",
    rearranged: "ep2e.ki.effect.crucible.reconfiguration.rearranged"
}

kiConfig.crucibleRecalibration = {
    none: "ep2e.ki.strain.none",
    weapon: "ep2e.ki.effect.crucible.recalibration.weapon",
    armor: "ep2e.ki.effect.crucible.recalibration.armor",
    accessory: "ep2e.ki.effect.crucible.recalibration.accessory"
}

kiConfig.redlineGovernor = {
    none: "ep2e.ki.strain.none",
    limited: "ep2e.ki.effect.redline.governor.limited",
    overridden: "ep2e.ki.effect.redline.governor.overridden",
    runaway: "ep2e.ki.effect.redline.governor.runaway"
}

kiConfig.redlineCompulsion = {
    none: "ep2e.ki.strain.none",
    overdoIt: "ep2e.ki.effect.redline.compulsion.overdoIt",
    testTheLimits: "ep2e.ki.effect.redline.compulsion.testTheLimits",
    redTape: "ep2e.ki.effect.redline.compulsion.redTape"
}

kiConfig.redlineCalibration = {
    none: "ep2e.ki.strain.none",
    efficiency: "ep2e.ki.effect.redline.calibration.efficiency",
    experimental: "ep2e.ki.effect.redline.calibration.experimental",
    pushTheLimit: "ep2e.ki.effect.redline.calibration.pushTheLimit"
}

kiConfig.redlineRerouting = {
    none: "ep2e.ki.strain.none",
    boost: "ep2e.ki.effect.redline.rerouting.boost",
    support: "ep2e.ki.effect.redline.rerouting.support",
    switch: "ep2e.ki.effect.redline.rerouting.switch"
}

kiConfig.redlinePushing = {
    none: "ep2e.ki.strain.none",
    overclocking: "ep2e.ki.effect.redline.pushing.overclocking",
    dampening: "ep2e.ki.effect.redline.pushing.dampening",
    switching: "ep2e.ki.effect.redline.pushing.switching"
}

kiConfig.signalCarrier = {
    none: "ep2e.ki.strain.none",
    location: "ep2e.ki.effect.signal.carrier.location",
    diagnostics: "ep2e.ki.effect.signal.carrier.diagnostics",
    sensorFeed: "ep2e.ki.effect.signal.carrier.sensorFeed"
}

kiConfig.signalInterference = {
    none: "ep2e.ki.strain.none",
    whiteNoise: "ep2e.ki.effect.signal.interference.whiteNoise",
    signalBoost: "ep2e.ki.effect.signal.interference.signalBoost"
}

kiConfig.signalDependency = {
    none: "ep2e.ki.strain.none",
    tacticalNetwork: "ep2e.ki.effect.signal.dependency.tacticalNetwork",
    ping: "ep2e.ki.effect.signal.dependency.ping",
    experimentalApi: "ep2e.ki.effect.signal.dependency.experimentalApi"
}

kiConfig.ruinFatigue = {
    none: "ep2e.ki.strain.none",
    brittleArmor: "ep2e.ki.effect.ruin.fatigue.brittleArmor",
    fatiguedActuators: "ep2e.ki.effect.ruin.fatigue.fatiguedActuators",
    leakingConstruction: "ep2e.ki.effect.ruin.fatigue.leakingConstruction"
}

kiConfig.ruinSeized = {
    none: "ep2e.ki.strain.none",
    ware: "ep2e.ki.effect.ruin.seized.ware",
    sense: "ep2e.ki.effect.ruin.seized.sense",
    movement: "ep2e.ki.effect.ruin.seized.movement"
}

kiConfig.ruinIntermittent = {
    none: "ep2e.ki.strain.none",
    malfunction: "ep2e.ki.effect.ruin.intermittent.malfunction",
    sensorDecay: "ep2e.ki.effect.ruin.intermittent.sensorDecay",
    heuristicErrors: "ep2e.ki.effect.ruin.intermittent.heuristicErrors"
}

kiConfig.ruinShedding = {
    none: "ep2e.ki.strain.none",
    wareComponent: "ep2e.ki.effect.ruin.shedding.wareComponent",
    armorPlate: "ep2e.ki.effect.ruin.shedding.armorPlate"
}

kiConfig.colonyWitnesses = {
    none: "ep2e.ki.strain.none",
    eyes: "ep2e.ki.effect.colony.witnesses.eyes",
    attention: "ep2e.ki.effect.colony.witnesses.attention"
}

kiConfig.colonyBorrowed = {
    none: "ep2e.ki.strain.none",
    eye: "ep2e.ki.effect.colony.borrowed.eye",
    hand: "ep2e.ki.effect.colony.borrowed.hand",
    voice: "ep2e.ki.effect.colony.borrowed.voice",
    organ: "ep2e.ki.effect.colony.borrowed.organ"
}

kiConfig.colonyGathering = {
    none: "ep2e.ki.strain.none",
    procession: "ep2e.ki.effect.colony.gathering.procession",
    encirclement: "ep2e.ki.effect.colony.gathering.encirclement",
    nest: "ep2e.ki.effect.colony.gathering.nest"
}

/**
 * Per-result chat output for every Ki sub-strain, keyed by the d6 result. A row with "base" reads
 * the player's stored choice and appends it to that base key, a row with "copy" is fixed text.
 * Result 1 is shared by all sub-strains and handled separately.
 */
kiConfig.kiInfluence = {
    crucible: {
        2: { label: "ep2e.ki.effect.crucible.preoccupation.label", base: "ep2e.ki.effect.crucible.preoccupation" },
        3: { label: "ep2e.ki.effect.crucible.reconfiguration.label", base: "ep2e.ki.effect.crucible.reconfiguration" },
        4: { label: "ep2e.ki.effect.crucible.recalibration.label", base: "ep2e.ki.effect.crucible.recalibration" },
        5: { label: "ep2e.ki.effect.crucible.motivation.label", copy: "ep2e.ki.effect.crucible.motivation.text" },
        6: { label: "ep2e.ki.effect.crucible.revision.label", copy: "ep2e.ki.effect.crucible.revision.text" }
    },
    redline: {
        2: { label: "ep2e.ki.effect.redline.governor.label", base: "ep2e.ki.effect.redline.governor" },
        3: { label: "ep2e.ki.effect.redline.compulsion.label", base: "ep2e.ki.effect.redline.compulsion" },
        4: { label: "ep2e.ki.effect.redline.calibration.label", base: "ep2e.ki.effect.redline.calibration" },
        5: { label: "ep2e.ki.effect.redline.rerouting.label", base: "ep2e.ki.effect.redline.rerouting" },
        6: { label: "ep2e.ki.effect.redline.pushing.label", base: "ep2e.ki.effect.redline.pushing" }
    },
    signal: {
        2: { label: "ep2e.ki.effect.signal.carrier.label", base: "ep2e.ki.effect.signal.carrier" },
        3: { label: "ep2e.ki.effect.signal.saturation.label", copy: "ep2e.ki.effect.signal.saturation.text" },
        4: { label: "ep2e.ki.effect.signal.interference.label", base: "ep2e.ki.effect.signal.interference" },
        5: { label: "ep2e.ki.effect.signal.dependency.label", base: "ep2e.ki.effect.signal.dependency" },
        6: { label: "ep2e.ki.effect.signal.beacon.label", copy: "ep2e.ki.effect.signal.beacon.text" }
    },
    ruin: {
        2: { label: "ep2e.ki.effect.ruin.fatigue.label", base: "ep2e.ki.effect.ruin.fatigue" },
        3: { label: "ep2e.ki.effect.ruin.seized.label", base: "ep2e.ki.effect.ruin.seized" },
        4: { label: "ep2e.ki.effect.ruin.intermittent.label", base: "ep2e.ki.effect.ruin.intermittent" },
        5: { label: "ep2e.ki.effect.ruin.shedding.label", base: "ep2e.ki.effect.ruin.shedding" },
        6: { label: "ep2e.ki.effect.ruin.breakdown.label", copy: "ep2e.ki.effect.ruin.breakdown.text" }
    },
    colony: {
        2: { label: "ep2e.ki.effect.colony.witnesses.label", base: "ep2e.ki.effect.colony.witnesses" },
        3: { label: "ep2e.ki.effect.colony.sympathetic.label", copy: "ep2e.ki.effect.colony.sympathetic.text" },
        4: { label: "ep2e.ki.effect.colony.borrowed.label", base: "ep2e.ki.effect.colony.borrowed" },
        5: { label: "ep2e.ki.effect.colony.gathering.label", base: "ep2e.ki.effect.colony.gathering" },
        6: { label: "ep2e.ki.effect.colony.avatar.label", copy: "ep2e.ki.effect.colony.avatar.text" }
    }
}

export default kiConfig;
