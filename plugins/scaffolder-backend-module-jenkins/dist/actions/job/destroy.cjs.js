'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');

function destroyJob(jenkins) {
  return pluginScaffolderNode.createTemplateAction({
    id: "jenkins:job:destroy",
    description: "Destroy an existing job jenkins given a name",
    schema: {
      input: {
        jobName: (z) => z.string({ description: "Name of jenkins item" })
      }
    },
    async handler(ctx) {
      ctx.logger.info(`Destroying jenkins job ${ctx.input.jobName}`);
      await jenkins.job.destroy(ctx.input.jobName);
      ctx.logger.info("Job destroyed successfully!");
    }
  });
}

exports.destroyJob = destroyJob;
//# sourceMappingURL=destroy.cjs.js.map
