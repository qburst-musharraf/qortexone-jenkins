import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import type { CompoundEntityRef } from '@backstage/catalog-model';
export declare const jenkinsApiRef: import("@backstage/frontend-plugin-api").ApiRef<JenkinsApi>;
export interface Build {
    timestamp: number;
    building: boolean;
    duration: number;
    result?: string;
    fullDisplayName: string;
    displayName: string;
    url: string;
    number: number;
    source?: {
        branchName: string;
        displayName: string;
        url: string;
        commit: {
            hash: string;
        };
        author: string;
    };
    tests: {
        passed: number;
        skipped: number;
        failed: number;
        total: number;
        testUrl: string;
    };
    status: string;
}
export interface JobBuild {
    timestamp: number;
    building: boolean;
    duration: number;
    result?: string;
    fullDisplayName: string;
    displayName: string;
    url: string;
    number: number;
    inProgress: boolean;
    queueId: number;
    id: number;
}
export interface Job {
    name: string;
    displayName: string;
    description: string;
    fullDisplayName: string;
    inQueue: boolean;
    fullName: string;
    url: string;
    builds: JobBuild[];
}
/** @public */
export interface Project {
    lastBuild: Build;
    displayName: string;
    fullDisplayName: string;
    fullName: string;
    inQueue: string;
    status: string;
    onRestartClick: () => Promise<void>;
}
export interface BuildConsoleText {
    consoleText: string;
}
export interface JenkinsApi {
    /**
     * Get the projects (jobs which have builds, not folders) including info about their lastBuild.
     *
     * Deciding what jobs are for an entity can be configured by the backstage _Integrator_ in the plugin-jenkins-backend setup
     * and by the _Software Engineer_ using annotations agreed with the _Integrator_.
     *
     * Typically, a folder job will be identified and the backend plugin will recursively look for projects (jobs with builds) within that folder.
     */
    getProjects(options: {
        /** the entity whose jobs should be retrieved. */
        entity: CompoundEntityRef;
        /** a filter on jobs. Currently this just takes a branch (and assumes certain structures in jenkins) */
        filter: {
            branch?: string;
        };
    }): Promise<Project[]>;
    /**
     * Get a single build.
     *
     * This takes an entity to support selecting between multiple jenkins instances.
     *
     * TODO: abstract jobFullName (so we could support differentiating between the same named job on multiple instances).
     */
    getBuild(options: {
        entity: CompoundEntityRef;
        jobFullName: string;
        buildNumber: string;
    }): Promise<Build>;
    getJobBuilds(options: {
        entity: CompoundEntityRef;
        jobFullName: string;
    }): Promise<Job>;
    retry(options: {
        entity: CompoundEntityRef;
        jobFullName: string;
        buildNumber: string;
    }): Promise<void>;
    /**
     * Gets the consoleText for a single build
     */
    getBuildConsoleText(options: {
        entity: CompoundEntityRef;
        jobFullName: string;
        buildNumber: string;
    }): Promise<BuildConsoleText>;
}
export declare class JenkinsClient implements JenkinsApi {
    private readonly discoveryApi;
    private readonly fetchApi;
    constructor(options: {
        discoveryApi: DiscoveryApi;
        fetchApi: FetchApi;
    });
    getProjects(options: {
        entity: CompoundEntityRef;
        filter: {
            branch?: string;
        };
    }): Promise<Project[]>;
    getBuild(options: {
        entity: CompoundEntityRef;
        jobFullName: string;
        buildNumber: string;
    }): Promise<Build>;
    retry(options: {
        entity: CompoundEntityRef;
        jobFullName: string;
        buildNumber: string;
    }): Promise<void>;
    getJobBuilds(options: {
        entity: CompoundEntityRef;
        jobFullName: string;
    }): Promise<Job>;
    getBuildConsoleText(options: {
        entity: CompoundEntityRef;
        jobFullName: string;
        buildNumber: string;
    }): Promise<BuildConsoleText>;
}
