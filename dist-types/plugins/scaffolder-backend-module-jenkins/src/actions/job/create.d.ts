import { RootConfigService } from '@backstage/backend-plugin-api';
import { Jenkins } from '@qortexone-jenkins/jenkins-common';
/**
 * This createJob function, creates a job given a job name and own configuration file as xml format
 *
 * @param jenkins - The client to interact with jenkins instance
 * @returns Empty response, in case of error an exception will be thrown by jenkins client
 */
export declare function createJob(jenkins: Jenkins, config: RootConfigService): import("@backstage/plugin-scaffolder-node").TemplateAction<{
    jobName: string;
    serverUrl?: string | undefined;
    configPath?: string | undefined;
    jobXml?: string | undefined;
    folderName?: string | undefined;
}, {
    [x: string]: any;
}, "v2">;
