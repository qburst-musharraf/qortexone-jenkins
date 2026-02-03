import express from 'express';
import { JenkinsInfoProvider } from './jenkinsInfoProvider';
import { PermissionEvaluator } from '@backstage/plugin-permission-common';
import { AuthService, DiscoveryService, HttpAuthService, LoggerService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
/** @public */
export type JenkinsBuilderReturn = Promise<{
    router: express.Router;
}>;
/** @public */
export interface JenkinsEnvironment {
    permissions: PermissionEvaluator;
    config: Config;
    logger: LoggerService;
    jenkinsInfoProvider: JenkinsInfoProvider;
    discovery: DiscoveryService;
    auth?: AuthService;
    httpAuth: HttpAuthService;
}
/** @public */
export declare class JenkinsBuilder {
    protected readonly env: JenkinsEnvironment;
    static createBuilder(env: JenkinsEnvironment): JenkinsBuilder;
    constructor(env: JenkinsEnvironment);
    build(): Promise<{
        router: express.Router;
    }>;
    protected buildRouter(jenkinsInfoProvider: JenkinsInfoProvider, permissionApi: PermissionEvaluator, httpAuth: HttpAuthService): express.Router;
    private jobFullNameParamToJobs;
}
