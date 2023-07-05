const setImmediateIds = new Map();

function setImmediate2(cb, ...args) {
  const id = setImmediateIds.size + 1;

  setImmediateIds.set(id, true);

  queueMicrotask(() => {
    if (setImmediateIds.get(id) === true) {
      return;
    }

    cb(...args);
  });

  return id;
}

function clearImmediate2(id) {
  setImmediateIds.set(id, false);
}
