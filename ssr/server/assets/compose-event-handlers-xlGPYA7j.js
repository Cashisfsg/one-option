const composeEventHandlers = (external, internal) => {
  return function(event) {
    external == null ? void 0 : external(event);
    if (!event.defaultPrevented) {
      return internal(event);
    }
  };
};
export {
  composeEventHandlers as c
};
