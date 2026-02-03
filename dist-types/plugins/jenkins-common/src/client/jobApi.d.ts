import type { JobBuildOptions, JobGetOptions } from './types';
export interface JobDeps {
    normalizeJobName(name: string | string[] | undefined): string | undefined;
    request(path: string, opts?: {
        method?: string;
        query?: Record<string, string | number | undefined>;
        body?: any;
        rawText?: boolean;
        contentType?: string;
    }): Promise<any>;
}
/**
 * Factory for creating a Jenkins Job API interface.
 *
 * Provides helpers for common Jenkins job operations such as:
 * - Fetching job details (`get`)
 * - Triggering builds (`build`)
 * - Copying or creating jobs (`copy`, `create`)
 * - Managing job state (`enable`, `disable`, `destroy`)
 *
 * This function is intended to be used by higher-level clients (e.g., `Jenkins`)
 * and delegates low-level requests to the provided `request` dependency.
 *
 * @param deps - Dependency injection hooks for request handling and job name normalization.
 * @returns An object with methods for interacting with Jenkins jobs.
 */
export declare function createJobApi(deps: JobDeps): {
    /**
     * Retrieves a job’s JSON representation from Jenkins.
     *
     * @param input - A {@link JobGetOptions} object. `tree` and `depth`
     *                are forwarded to `/api/json` as query params.
     * @returns The parsed job JSON.
     */
    get: (input: JobGetOptions) => Promise<any>;
    /**
     * Retrieves only the builds portion of a job (server-side filtered via `tree`).
     *
     * @param name - The job name (string or array).
     * @param tree - The Jenkins Remote API `tree` expression selecting build fields.
     *               Defaults to `builds[number,url,result,timestamp,id,queueId,displayName,duration]`
     * @returns A JSON object containing the requested build fields.
     */
    getBuilds: (name: string | string[], tree?: string) => Promise<unknown>;
    /**
     * Triggers a Jenkins job build.
     *
     * Uses `/build` or `/buildWithParameters` depending on whether parameters are provided.
     * Automatically URL-encodes parameters and supports legacy options like `delay` and `token`.
     *
     * @param name - The job name (string or array form).
     * @param opts - Optional build options (parameters, token, delay).
     * @returns A promise that resolves when the build request is accepted.
     */
    build: (name: string | string[], opts?: JobBuildOptions) => Promise<unknown>;
    /**
     * Copies a job to a new name (optionally inside folders).
     *
     * **Important:** For the `from` argument, pass the *slashy* full name (e.g. `"a/b/src"`).
     * Do **not** normalize it to `/job/...` form, Jenkins expects the raw slash-separated name.
     * Only the *leaf* of the new job goes in the `?name=` query; parent folders are derived
     * from `name` and embedded in the URL path.
     *
     * @param name - Target job name (string or segments). Parent parts become folders; leaf is the new job name.
     * @param from - Source job’s slashy full name (e.g. `"folder/old"`).
     */
    copy: (name: string | string[], from: string) => Promise<void>;
    /**
     * Creates a new job from an XML configuration payload.
     *
     * Only the *leaf* job name is sent in `?name=`; any parent segments become
     * folder parts embedded in the URL path.
     *
     * @param name - The destination job name (string or segments).
     * @param xml - The Jenkins job config.xml content.
     */
    create: (name: string | string[], xml: string) => Promise<void>;
    /**
     * Permanently deletes a job.
     *
     * @param name - The job name (string or segments).
     */
    destroy: (name: string | string[]) => Promise<void>;
    /**
     * Enables a disabled job.
     *
     * @param name - The job name (string or segments).
     */
    enable: (name: string | string[]) => Promise<void>;
    /**
     * Disables a job (prevents builds from being scheduled).
     *
     * @param name - The job name (string or segments).
     */
    disable: (name: string | string[]) => Promise<void>;
};
