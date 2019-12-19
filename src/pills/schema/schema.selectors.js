export const schemaSelectorCreator = (stateKey, defaultValue) => (store) =>
  store.Schema.entities[stateKey] || defaultValue;
