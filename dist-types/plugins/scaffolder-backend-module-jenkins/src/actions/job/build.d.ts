import { Jenkins } from '@qortexone-jenkins/jenkins-common';
/**
 *
 * This buildJob function, creates a template action for running a Jenkins job
 *
 * @param jenkins - The client to interact with jenkins instance
 * @returns Empty response, in case of error an exception will be thrown by jenkins client
 */
export declare function buildJob(jenkins: Jenkins): import("@backstage/plugin-scaffolder-node").TemplateAction<{
    jobName: string;
    jobParameters?: Record<string, any> | undefined;
}, {
    [x: string]: any;
}, "v2">;
