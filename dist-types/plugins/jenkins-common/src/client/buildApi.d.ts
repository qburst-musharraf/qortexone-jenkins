import { JenkinsBuild } from '../types';
export interface BuildDeps {
    normalizeJobName(string: string | string[] | undefined): string | undefined;
    request(path: string, opts?: {
        method?: string;
        query?: Record<string, string | number | undefined>;
        body?: any;
        rawText?: boolean;
        contentType?: string;
    }): Promise<any>;
}
/**
 * Factory for creating a Jenkins Build API interface.
 *
 * Provides helpers for common Jenkins job operations such as:
 * - Fetching build details (`get`)
 * - Fetching build console output as plain text (`getConsoleText`)
 *
 * This function is intended to be used by higher-level clients (e.g., `Jenkins`)
 * and delegates low-level requests to the provided `request` dependency.
 *
 * @param deps - Dependency injection hooks for request handling and job name normalization.
 * @returns An object with methods for interacting with Jenkins builds.
 */
export declare function createBuildApi(deps: BuildDeps): {
    /**
     * Retrieves a build's JSON representation from Jenkins.
     *
     * @param name - A build name (string or segments).
     * @param buildNumber - The build number to retrieve.
     * @returns A `JenkinsBuild` object with metadata about the specified build.
     */
    get: (name: string | string[], buildNumber: number | string) => Promise<JenkinsBuild>;
    /**
     * Retrieves a build's consoleText from Jenkins.
     *
     * @param name - A build name (string or segments).
     * @param buildNumber - The build number to retrieve logs for.
     * @returns The build's console output as plain text.
     */
    getConsoleText: (name: string | string[], buildNumber: number | string) => Promise<string>;
};
