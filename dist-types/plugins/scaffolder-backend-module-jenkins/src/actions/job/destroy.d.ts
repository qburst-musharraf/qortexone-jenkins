import { Jenkins } from '@qortexone-jenkins/jenkins-common';
/**
 * This destroyJob function, deletes a job given a job name
 *
 * @param jenkins - The client to interact with jenkins instance
 * @returns Empty response, in case of error an exception will be thrown by jenkins client
 */
export declare function destroyJob(jenkins: Jenkins): import("@backstage/plugin-scaffolder-node").TemplateAction<{
    jobName: string;
}, {
    [x: string]: any;
}, "v2">;
