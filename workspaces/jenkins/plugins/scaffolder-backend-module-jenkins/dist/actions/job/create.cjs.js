'use strict';

var backendPluginApi = require('@backstage/backend-plugin-api');
var config = require('../../config.cjs.js');
var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var fs = require('fs/promises');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fs__default = /*#__PURE__*/_interopDefaultCompat(fs);

function createJob(jenkins, config$1) {
  return pluginScaffolderNode.createTemplateAction({
    id: "jenkins:job:create",
    description: "Create a job jenkins given a name and gitlab repo",
    schema: {
      input: {
        serverUrl: (z) => z.string({ description: "URL" }).optional(),
        configPath: (z) => z.string({ description: "Path to config file of job" }).optional(),
        jobName: (z) => z.string({ description: "Name of jenkins item" }),
        jobXml: (z) => z.string({
          description: "XML of job used by jenkins to create the job"
        }).optional(),
        folderName: (z) => z.string().optional()
      }
    },
    async handler(ctx) {
      ctx.logger.info(`Creating jenkins job ${ctx.input.jobName}`);
      const { configPath, folderName, serverUrl } = ctx.input;
      let jobXml = ctx.input.jobXml;
      if (configPath) {
        jobXml = await fs__default.default.readFile(
          backendPluginApi.resolveSafeChildPath(ctx.workspacePath, configPath),
          "utf8"
        );
      }
      let jobName;
      if (folderName) {
        jobName = `${folderName}/${ctx.input.jobName}`;
      } else {
        jobName = ctx.input.jobName;
      }
      if (!jobXml) {
        throw new Error(
          "JobXml cannot be null or empty, please configure with inline content or from xml file!"
        );
      }
      const client = serverUrl ? config.buildJenkinsClient(config$1) : jenkins;
      await client.job.create(jobName, jobXml);
      ctx.logger.info("Job created successfully!");
    }
  });
}

exports.createJob = createJob;
//# sourceMappingURL=create.cjs.js.map
