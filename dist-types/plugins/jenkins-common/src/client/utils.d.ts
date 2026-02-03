import { type Response } from 'node-fetch';
/**
 * Copies the {@link URL} object passed, appends query params and returns the resulting {@link URL}.
 *
 * @param u The {@link URL} object that will be copied
 * @param q The {@link Record<string, string | number | undefined>} that stores query params
 * @returns The resulting {@link URL} with query params.
 */
export declare function addQueryParams(u: URL, q: Record<string, string | number | undefined>): URL;
/**
 * Joins the base URL string with the specified path.
 * Appends a `/` to the end of the `base` if it doesn't already have it.
 *
 * @param base The base URL string
 * @param path The path that appends to the base string
 * @returns A string of the full URL
 */
export declare function joinUrl(base: string, path: string): string;
/**
 * Utility function that removes the `/` from the start of a string if it exists.
 *
 * @param p The string to trim
 * @returns The string without the leading `/`
 */
export declare function trimLeadingSlash(p: string): string;
/**
 * Utility function that ensures that string ends with `/`,
 *
 * @param u The string to modify
 * @returns The resulting string, ending with `/`
 */
export declare function ensureTrailingSlash(u: string): string;
/**
 * Utility function that safely extracts the text from a response.
 * If the operation results in an error a default string is returned instead.
 *
 * @param res The {@link Response} containing the `Body.text`
 * @returns The resulting `Body.text` value or a default string if the operation failed
 */
export declare function safeExtractText(res: Response): Promise<string>;
