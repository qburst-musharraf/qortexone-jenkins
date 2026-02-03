import { Jenkins } from '@qortexone-jenkins/jenkins-common';
/**
 * This disableJob function, disables a job given a job name
 *
 * @param jenkins - The client to interact with jenkins instance
 * @returns Empty response, in case of error an exception will be thrown by jenkins client
 */
export declare function disableJob(jenkins: Jenkins): import("@backstage/plugin-scaffolder-node").TemplateAction<{
    jobName: string;
}, {
    [x: string]: any;
}, "v2">;
