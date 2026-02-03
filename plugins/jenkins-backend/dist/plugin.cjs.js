'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var pluginCatalogNode = require('@backstage/plugin-catalog-node');
var jenkinsInfoProvider = require('./service/jenkinsInfoProvider.cjs.js');
var JenkinsBuilder = require('./service/JenkinsBuilder.cjs.js');

const jenkinsPlugin = backendPluginApi.createBackendPlugin({
  pluginId: "jenkins",
  register(env) {
    env.registerInit({
      deps: {
        logger: backendPluginApi.coreServices.logger,
        permissions: backendPluginApi.coreServices.permissions,
        httpRouter: backendPluginApi.coreServices.httpRouter,
        config: backendPluginApi.coreServices.rootConfig,
        catalog: pluginCatalogNode.catalogServiceRef,
        discovery: backendPluginApi.coreServices.discovery,
        auth: backendPluginApi.coreServices.auth,
        httpAuth: backendPluginApi.coreServices.httpAuth
      },
      async init({
        logger,
        permissions,
        httpRouter,
        config,
        catalog,
        discovery,
        auth,
        httpAuth
      }) {
        const jenkinsInfoProvider$1 = jenkinsInfoProvider.DefaultJenkinsInfoProvider.fromConfig({
          auth,
          httpAuth,
          config,
          catalog,
          discovery,
          logger
        });
        const builder = JenkinsBuilder.JenkinsBuilder.createBuilder({
          logger,
          jenkinsInfoProvider: jenkinsInfoProvider$1,
          config,
          permissions,
          discovery,
          auth,
          httpAuth
        });
        const { router } = await builder.build();
        httpRouter.use(router);
      }
    });
  }
});

exports.jenkinsPlugin = jenkinsPlugin;
//# sourceMappingURL=plugin.cjs.js.map
