'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');

function enableJob(jenkins) {
  return pluginScaffolderNode.createTemplateAction({
    id: "jenkins:job:enable",
    description: "Enable an existing Jenkins job given a name",
    schema: {
      input: {
        jobName: (z) => z.string({ description: "Name of jenkins item" })
      }
    },
    async handler(ctx) {
      ctx.logger.info(`Enabling jenkins job ${ctx.input.jobName}`);
      await jenkins.job.enable(ctx.input.jobName);
      ctx.logger.info("Job enabled successfully!");
    }
  });
}

exports.enableJob = enableJob;
//# sourceMappingURL=enable.cjs.js.map
