// Just enough of Foundry for a module that registers config tables, one strain family and one
// template. No documents are created here, so there is no document layer to mock.

const hookHandlers = new Map();

/**
 * Deep-merges source into target the way foundry.utils.mergeObject does for plain objects.
 * @param {Object} target - The object written into
 * @param {Object} source - The object read from
 * @returns {Object} target
 */
function mergeObject(target, source = {}) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value) && target[key] && typeof target[key] === "object") {
      mergeObject(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

/**
 * Reads a dot-path off an object.
 * @param {Object} object - The object to read from
 * @param {String} key - A dot-separated path
 * @returns {*} The value, or undefined
 */
function getProperty(object, key) {
  return String(key).split(".").reduce((node, part) => (node == null ? node : node[part]), object);
}

global.Hooks = {
  on(event, fn) {
    if (!hookHandlers.has(event)) hookHandlers.set(event, []);
    hookHandlers.get(event).push(fn);
    return fn;
  },
  once(event, fn) {
    return global.Hooks.on(event, fn);
  },
  callAll(event, ...args) {
    for (const fn of hookHandlers.get(event) ?? []) fn(...args);
    return true;
  }
};

global.foundry = {
  utils: { mergeObject, getProperty, deepClone: value => JSON.parse(JSON.stringify(value)) },
  applications: { handlebars: { loadTemplates: async paths => paths } }
};

global.CONFIG = { eclipsephase: { strainFamilies: { psi: "ep2e.item.aspect.table.family.psi" } } };

global.game = {
  modules: new Map(),
  eclipsephase: { api: { actors: {} } },
  i18n: { localize: key => key }
};

global.__ki = {
  hookHandlers,
  reset() {
    hookHandlers.clear();
    global.CONFIG.eclipsephase = { strainFamilies: { psi: "ep2e.item.aspect.table.family.psi" } };
  }
};
