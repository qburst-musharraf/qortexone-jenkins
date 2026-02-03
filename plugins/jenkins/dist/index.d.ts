import * as react_jsx_runtime from 'react/jsx-runtime';
import * as _backstage_core_components from '@backstage/core-components';
import { InfoCardVariants, TableColumn } from '@backstage/core-components';
import * as _backstage_frontend_plugin_api from '@backstage/frontend-plugin-api';
import * as _backstage_core_plugin_api from '@backstage/core-plugin-api';
import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { CompoundEntityRef, Entity } from '@backstage/catalog-model';

declare const jenkinsApiRef: _backstage_frontend_plugin_api.ApiRef<JenkinsApi>;
interface Build {
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
interface JobBuild {
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
interface Job {
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
interface Project {
    lastBuild: Build;
    displayName: string;
    fullDisplayName: string;
    fullName: string;
    inQueue: string;
    status: string;
    onRestartClick: () => Promise<void>;
}
interface BuildConsoleText {
    consoleText: string;
}
interface JenkinsApi {
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
declare class JenkinsClient implements JenkinsApi {
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

/** @public */
declare const jenkinsPlugin: _backstage_core_plugin_api.BackstagePlugin<{
    entityContent: _backstage_core_plugin_api.RouteRef<undefined>;
}, {}, {}>;
/** @public */
declare const EntityJenkinsContent: (props: {
    title?: string | undefined;
    columns?: _backstage_core_components.TableColumn<Project>[] | undefined;
}) => react_jsx_runtime.JSX.Element;
/** @public */
declare const EntityLatestJenkinsRunCard: (props: {
    branch: string;
    variant?: _backstage_core_components.InfoCardVariants | undefined;
    title?: string | ((branch: string) => string) | undefined;
}) => react_jsx_runtime.JSX.Element;
/** @public */
declare const EntityJobRunsTable: () => react_jsx_runtime.JSX.Element;

declare const LatestRunCard: (props: {
    branch: string;
    variant?: InfoCardVariants | undefined;
    title?: string | ((branch: string) => string) | undefined;
}) => react_jsx_runtime.JSX.Element;

/** @public */
declare const isJenkinsAvailable: (entity: Entity) => boolean;
declare const Router: (props: {
    title?: string;
    columns?: TableColumn<Project>[];
}) => react_jsx_runtime.JSX.Element;

declare const JENKINS_ANNOTATION = "jenkins.io/job-full-name";
declare const LEGACY_JENKINS_ANNOTATION = "jenkins.io/github-folder";

export { EntityJenkinsContent, EntityJobRunsTable, EntityLatestJenkinsRunCard, JENKINS_ANNOTATION, JenkinsClient, LEGACY_JENKINS_ANNOTATION, LatestRunCard, Router, isJenkinsAvailable, isJenkinsAvailable as isPluginApplicableToEntity, jenkinsApiRef, jenkinsPlugin, jenkinsPlugin as plugin };
export type { JenkinsApi, Project };
