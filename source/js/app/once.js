const keys = new Set();

const normalizeKey = (key) => String(key).trim().replace(/[^a-zA-Z0-9]/g, "_");

export const onceGlobal = (key, callback) => {
  if (typeof callback !== "function") {
    return;
  }

  const normalizedKey = normalizeKey(key);
  if (keys.has(normalizedKey)) {
    return;
  }

  keys.add(normalizedKey);
  callback();
};

export const oncePerElement = (element, key, callback) => {
  if (!element?.dataset || typeof callback !== "function") {
    return;
  }

  const dataKey = `redefine${normalizeKey(key)}`;
  if (element.dataset[dataKey]) {
    return;
  }

  element.dataset[dataKey] = "true";
  callback(element);
};
