/**
 * A Backstage backend plugin that integrates towards Jenkins
 *
 * @packageDocumentation
 */
export * from './service';
export { jenkinsPlugin as default } from './plugin';
export { JenkinsBuilder } from './service';
