// Utility types
type Primitive = bigint | boolean | number | string | symbol | null | undefined;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type Builtin = Date | Function | Primitive | RegExp;

/**
 * IsTuple<T> -> true if T is a tuple type (fixed length), false for regular arrays.
 * Implementation: if T is readonly any[] and its 'length' is a numeric literal (not number),
 * then it's a tuple.
 */
type IsTuple<T> =
    T extends readonly unknown[]
        ? number extends T["length"]
            ? false
            : true
        : false;

/**
 * ConcatArrays preserves tuple spreads when either side is a tuple.
 * - If both are tuples => [...T, ...U]
 * - If one side is tuple and the other is an array/tuple => [...T, ...U] (TS will widen the other)
 * - If both are non-tuple arrays => Array<T[number] | U[number]>
 */
type ConcatArrays<T, U> =
    T extends readonly unknown[]
        ? U extends readonly unknown[]
            ? IsTuple<T> extends true
                ? IsTuple<U> extends true
                    ? [...T, ...U] // Both tuples -> exact concat tuple
                    : [...T, ...U] // Left tuple, right array/tuple -> spread (may widen)
                : IsTuple<U> extends true
                    ? [...T, ...U] // Right tuple, left array -> spread
                    : (T[number] | U[number])[] // Both plain arrays -> union element array
            : U
        : U;

/**
 * DeepMerge type:
 * - Builtins/primitives: U wins
 * - Arrays: concatenated using ConcatArrays
 * - Objects: recursive merge. Right wins on key conflict, but both objects are merged.
 */
type DeepMerge<T, U> =
    U extends Builtin ? U :
        T extends Builtin ? U :
            T extends readonly unknown[]
                ? U extends readonly unknown[]
                    ? ConcatArrays<T, U>
                    : U
                : T extends object
                    ? U extends object
                        ? {
                            [K in keyof T | keyof U]:
                            K extends keyof U
                                ? K extends keyof T
                                    ? NonNullable<DeepMerge<T[K], U[K]>>
                                    : U[K]
                                : K extends keyof T
                                    ? T[K]
                                    : never
                        }
                        : U
                    : U;

// ---------- Runtime helpers (no `any`) ----------
const isPlainObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    !(v instanceof Date) &&
    !(v instanceof RegExp);

const isBuiltin = (v: unknown): boolean => v === null ||
    v === undefined ||
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "boolean" ||
    typeof v === "bigint" ||
    typeof v === "symbol" ||
    typeof v === "function" ||
    v instanceof Date ||
    v instanceof RegExp;

/**
 * DeepMerge: objects merged recursively (right preferred),
 * arrays concatenated (left then right),
 * primitives/builtins replaced by right,
 * tuples preserved where possible.
 */
function deepMerge<T, U>(left: T, right: U): DeepMerge<T, U> {
    // If right is builtin or not an object -> right wins
    if (isBuiltin(right) || typeof right !== "object" || right === null) {
        return right as unknown as DeepMerge<T, U>;
    }

    /*
     * Now right is object or array
     * If both arrays -> concatenate
     */
    if (Array.isArray(left) && Array.isArray(right)) {
        const la = left as readonly unknown[];
        const ra = right as readonly unknown[];
        const out = [...la, ...ra];

        return out as unknown as DeepMerge<T, U>;
    }

    // If left is array but right is not -> right wins
    if (Array.isArray(left) && !Array.isArray(right)) {
        return right as unknown as DeepMerge<T, U>;
    }

    // If both are plain objects -> merge keys
    if (isPlainObject(left) && isPlainObject(right)) {
        const out: Record<string, unknown> = {};
        const keys = new Set<string>([...Object.keys(left), ...Object.keys(right)]);
        for (const k of keys) {
            const lHas = Object.hasOwn(left, k);
            const rHas = Object.hasOwn(right, k);
            if (lHas && rHas) {
                out[k] = deepMerge(
                    (left as Record<string, unknown>)[k],
                    (right as Record<string, unknown>)[k]
                );
            } else if (rHas) {
                out[k] = (right as Record<string, unknown>)[k];
            } else if (lHas) {
                out[k] = (left as Record<string, unknown>)[k];
            }
        }

        return out as unknown as DeepMerge<T, U>;
    }

    // Otherwise prefer right
    return right as unknown as DeepMerge<T, U>;
}

export { deepMerge };
export type { DeepMerge };
