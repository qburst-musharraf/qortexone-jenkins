'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');

function disableJob(jenkins) {
  return pluginScaffolderNode.createTemplateAction({
    id: "jenkins:job:disable",
    description: "Disable an existing job jenkins given a name",
    schema: {
      input: {
        jobName: (z) => z.string({ description: "Name of jenkins item" })
      }
    },
    async handler(ctx) {
      ctx.logger.info(`Disabling jenkins job ${ctx.input.jobName}`);
      await jenkins.job.disable(ctx.input.jobName);
      ctx.logger.info("Job disabled successfully!");
    }
  });
}

exports.disableJob = disableJob;
//# sourceMappingURL=disable.cjs.js.map
