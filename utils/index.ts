export type Success<T> = {
    data: T;
    error: null;
};

export type Failure<E> = {
    data: null;
    error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Executes a function synchronously and wraps the result in a Result type,
 * catching any errors that may be thrown during execution.
 *
 * This utility provides a type-safe way to handle operations that might throw
 * errors without using try/catch blocks at the call site.
 *
 * @template T - expected return type of the promise
 * @template E - error
 *
 * @param promise
 *
 * @returns The parsed data or an error
 *
 * @example
 * const { data, error } = await result<string>(promiseFn());
 */
export async function result<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
    try {
        const data = await promise;
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}

/**
 * Executes a function or constructor synchronously and wraps the result in a Result type,
 * catching any errors that may be thrown during execution.
 *
 * @typeParam T - The return type of the function being executed
 * @typeParam A - The tuple type of the function's arguments
 * @typeParam E - The error type (defaults to Error)
 *
 * @param fn - The function or constructor to execute within a try/catch block
 * @param args - Arguments to pass to the function
 *
 * @returns A Result object containing either data or error
 */
export function resultSync<T, A extends unknown[], E = Error>(
    fn: ((...args: A) => T) | (new (...args: A) => T),
    ...args: A
): Result<T, E> {
    try {
        // Check if it's a constructor function
        if (typeof fn.prototype !== "undefined") {
            const data = new (fn as new (...args: A) => T)(...args);
            return { data, error: null };
        }

        const data = (fn as (...args: A) => T)(...args);
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}
