import { Jenkins } from '@qortexone-jenkins/jenkins-common';
/**
 * This copyJob function, creates a job given a source job name
 *
 * @param jenkins - The client to interact with jenkins instance
 * @returns Empty response, in case of error an exception will be thrown by jenkins client
 */
export declare function copyJob(jenkins: Jenkins): import("@backstage/plugin-scaffolder-node").TemplateAction<{
    sourceJobName: string;
    targetJobName: string;
}, {
    [x: string]: any;
}, "v2">;
