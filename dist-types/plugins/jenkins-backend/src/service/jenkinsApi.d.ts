import type { JenkinsInfo } from './jenkinsInfoProvider';
import type { BackstageBuild, BackstageProject } from '../types';
import { BackstageCredentials, PermissionsService } from '@backstage/backend-plugin-api';
export declare class JenkinsApiImpl {
    private readonly permissionApi?;
    private static readonly lastBuildTreeSpec;
    private static readonly jobTreeSpec;
    private static readonly jobsTreeSpec;
    private static readonly jobBuildsTreeSpec;
    constructor(permissionApi?: PermissionsService | undefined);
    /**
     * Get a list of projects for the given JenkinsInfo.
     * @see ../../../jenkins/src/api/JenkinsApi.ts#getProjects
     */
    getProjects(jenkinsInfo: JenkinsInfo, branches?: string[]): Promise<BackstageProject[]>;
    private fetchBranchSpecificProjects;
    private fetchAllProjects;
    /**
     * Get a single build.
     * @see ../../../jenkins/src/api/JenkinsApi.ts#getBuild
     */
    getBuild(jenkinsInfo: JenkinsInfo, jobs: string[], buildNumber: number): Promise<BackstageBuild>;
    /**
     * Trigger a build of a project
     * @see ../../../jenkins/src/api/JenkinsApi.ts#retry
     */
    rebuildProject(jenkinsInfo: JenkinsInfo, jobs: string[], buildNumber: number, resourceRef: string, options: {
        credentials: BackstageCredentials;
    }): Promise<number>;
    private static getClient;
    private augmentProject;
    private augmentBuild;
    private static extractScmDetailsFromJob;
    private getTestReport;
    private getBuildUrl;
    getJobBuilds(jenkinsInfo: JenkinsInfo, jobs: string[]): Promise<unknown>;
    /**
     * Get the console text for a single build.
     * @see ../../../jenkins/src/api/JenkinsApi.ts#getBuildConsoleText
     */
    getBuildConsoleText(jenkinsInfo: JenkinsInfo, jobs: string[], buildNumber: number): Promise<string>;
}
