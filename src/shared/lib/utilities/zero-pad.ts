const zeroPad = (value: number, digits: number): string => {
    return String(value).padStart(digits, "0");
};

export { zeroPad };
