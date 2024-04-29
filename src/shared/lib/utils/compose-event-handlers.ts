export const composeEventHandlers = <E extends React.SyntheticEvent>(
    external: ((event: E) => void) | undefined,
    internal: (event: E) => void
): ((event: E) => void) => {
    return function (event) {
        external?.(event);

        if (!event.defaultPrevented) {
            return internal(event);
        }
    };
};
