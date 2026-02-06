'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var build = require('./actions/job/build.cjs.js');
var copy = require('./actions/job/copy.cjs.js');
var create = require('./actions/job/create.cjs.js');
var destroy = require('./actions/job/destroy.cjs.js');
var disable = require('./actions/job/disable.cjs.js');
var enable = require('./actions/job/enable.cjs.js');
var config = require('./config.cjs.js');

const scaffolderBackendModuleJenkins = backendPluginApi.createBackendModule({
  pluginId: "scaffolder",
  moduleId: "jenkins",
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolderActions: pluginScaffolderNode.scaffolderActionsExtensionPoint,
        config: backendPluginApi.coreServices.rootConfig,
        logger: backendPluginApi.coreServices.logger
      },
      async init({ config: config$1, logger, scaffolderActions }) {
        const jenkinsClient = config.buildJenkinsClient(config$1);
        scaffolderActions.addActions(create.createJob(jenkinsClient, config$1));
        scaffolderActions.addActions(copy.copyJob(jenkinsClient));
        scaffolderActions.addActions(build.buildJob(jenkinsClient));
        scaffolderActions.addActions(enable.enableJob(jenkinsClient));
        scaffolderActions.addActions(disable.disableJob(jenkinsClient));
        scaffolderActions.addActions(destroy.destroyJob(jenkinsClient));
        logger.info("Jenkins actions module started successfully");
      }
    });
  }
});

exports.scaffolderBackendModuleJenkins = scaffolderBackendModuleJenkins;
//# sourceMappingURL=module.cjs.js.map
