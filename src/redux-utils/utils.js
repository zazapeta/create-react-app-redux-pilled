export function addPrefixToActionTypes(actionTypes, domain) {
  let domainRegistry = {};
  for (let actionKeys in actionTypes) {
    domainRegistry[actionKeys] = `@${domain}/${actionTypes[actionKeys]}`;
  }
  return domainRegistry;
}
