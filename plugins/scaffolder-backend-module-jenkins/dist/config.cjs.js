'use strict';

var pluginJenkinsCommon = require('@qortexone/plugin-jenkins-common');

function buildJenkinsClient(config) {
  const baseUrl = new URL(config.getString("jenkins.baseUrl"));
  baseUrl.username = config.getOptionalString("jenkins.username");
  baseUrl.password = config.getOptionalString("jenkins.apiKey");
  return new pluginJenkinsCommon.Jenkins({
    baseUrl: baseUrl.toString(),
    headers: config.getOptional("jenkins.headers"),
    crumbIssuer: config.getOptionalBoolean("jenkins.crumbIssuerEnabled") ?? true
  });
}

exports.buildJenkinsClient = buildJenkinsClient;
//# sourceMappingURL=config.cjs.js.map
