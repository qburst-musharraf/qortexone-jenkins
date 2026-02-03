/** @public */
export interface CrumbData {
    headerName: string;
    headerValue: string;
    cookies?: string[];
}
/** @public */
export interface CrumbDataHeaderValues {
    crumbRequestField: string;
    crumb: string;
}
/** @public */
export type HeaderValue = string | string[] | undefined;
/** @public */
export type JenkinsParams = Record<string, unknown> | URLSearchParams | undefined;
/** @public */
export interface JobBuildOptions {
    parameters?: JenkinsParams;
    token?: string;
    delay?: string;
}
/** @public */
export interface JobGetOptions {
    name: string | string[];
    tree?: string;
    depth?: number;
}
