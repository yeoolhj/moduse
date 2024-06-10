function isObject(item: any) {
  return (
    item && typeof item === "object" && !Array.isArray(item) && item !== null
  );
}

export function defaults(target: any, ...sources: any[]) {
  if (!isObject(target)) {
    target = {};
  }

  sources.forEach((source) => {
    if (isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (target[key] === undefined) {
          target[key] = source[key];
        }
      });
    }
  });

  return target;
}

export function defaultsDeep(target: any, ...sources: any[]) {
  if (!isObject(target)) {
    target = {};
  }

  sources.forEach((source) => {
    if (isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!target[key] || !isObject(target[key])) {
            target[key] = {};
          }
          defaultsDeep(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      });
    }
  });

  return target;
}
