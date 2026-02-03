import { CrumbData, HeaderValue } from './client/types';
/** @public */
export interface JenkinsClientOptions {
    baseUrl: string;
    crumbIssuer?: boolean | ((client: any) => Promise<CrumbData>) | undefined;
    headers?: Record<string, HeaderValue>;
    promisify?: boolean;
}
/** @public */
export declare class Jenkins {
    private crumbData?;
    readonly opts: JenkinsClientOptions;
    constructor(opts: JenkinsClientOptions);
    job: {
        get: (input: import("./client/types").JobGetOptions) => Promise<any>;
        getBuilds: (name: string | string[], tree?: string) => Promise<unknown>;
        build: (name: string | string[], opts?: import("./client/types").JobBuildOptions | undefined) => Promise<unknown>;
        copy: (name: string | string[], from: string) => Promise<void>;
        create: (name: string | string[], xml: string) => Promise<void>;
        destroy: (name: string | string[]) => Promise<void>;
        enable: (name: string | string[]) => Promise<void>;
        disable: (name: string | string[]) => Promise<void>;
    };
    build: {
        get: (name: string | string[], buildNumber: string | number) => Promise<import("./types").JenkinsBuild>;
        getConsoleText: (name: string | string[], buildNumber: string | number) => Promise<string>;
    };
    /**
     * Retrieves and caches the Jenkins CSRF protection crumb.
     *
     * Jenkins uses a "crumb" (similar to a CSRF token) to protect write operations
     * such as POST requests. This method handles retrieving that crumb based on
     * the client's configuration.
     *
     * Behavior:
     * - If `crumbIssuer` is not enabled in the client options, it returns `undefined`.
     * - If a cached crumb already exists, it is returned immediately.
     * - If `crumbIssuer` is a function, that function is called to obtain the crumb.
     * - Otherwise, it performs a network request to
     *   `<baseUrl>/crumbIssuer/api/json` to fetch the crumb from Jenkins.
     *
     * The result is cached in `this.crumbData` for subsequent calls.
     *
     * @returns A `CrumbData` object containing the header name and value,
     *          or `undefined` if no crumb issuer is configured or the request fails.
     * @throws Any network or parsing errors that occur during the crumb fetch.
     */
    private getCrumb;
    private request;
    private fetchRaw;
    /**
     * Normalizes a Jenkins job name into a fully qualified job path.
     *
     * Jenkins job URLs use a hierarchical format like:
     *   `/job/folder/job/subfolder/job/pipeline`
     *
     * This method takes a job name (either a string like `"folder/pipeline"`
     * or an array like `["folder", "pipeline"]`) and converts it into the proper
     * Jenkins API path format by inserting `job/` segments and URL-encoding
     * each component.
     *
     * - If the input already contains `/job/` segments, it is returned as-is
     *   (after trimming any leading slash).
     * - If the input is undefined, an error is thrown.
     *
     * @param name - The job name to normalize, either as a string or an array of path segments.
     * @returns The normalized Jenkins job path (e.g. `"job/folder/job/pipeline"`).
     * @throws If the name is undefined or empty.
     */
    private normalizeJobName;
}
