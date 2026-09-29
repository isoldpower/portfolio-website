function functionUndefined(
    title = "Unknown"
): never {
    throw new Error(`Function not implemented: ${title} function`);
}

export { functionUndefined };