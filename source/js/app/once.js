const keys = new Set();

const normalizeKey = (key) => String(key).trim().replace(/[^a-zA-Z0-9]/g, "_");

const isPromiseLike = (value) => value && typeof value.then === "function";

export const onceGlobal = (key, callback) => {
  if (typeof callback !== "function") {
    return;
  }

  const normalizedKey = normalizeKey(key);
  if (keys.has(normalizedKey)) {
    return;
  }

  try {
    const result = callback();
    if (isPromiseLike(result)) {
      return result.then((value) => {
        keys.add(normalizedKey);
        return value;
      });
    }
    keys.add(normalizedKey);
    return result;
  } catch (error) {
    throw error;
  }
};

export const oncePerElement = (element, key, callback) => {
  if (!element?.dataset || typeof callback !== "function") {
    return;
  }

  const dataKey = `redefine${normalizeKey(key)}`;
  if (element.dataset[dataKey]) {
    return;
  }

  try {
    const result = callback(element);
    if (isPromiseLike(result)) {
      return result.then((value) => {
        element.dataset[dataKey] = "true";
        return value;
      });
    }
    element.dataset[dataKey] = "true";
    return result;
  } catch (error) {
    throw error;
  }
};
