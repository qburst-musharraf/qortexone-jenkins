'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');

function buildJob(jenkins) {
  return pluginScaffolderNode.createTemplateAction({
    id: "jenkins:job:build",
    description: "Run an existing job jenkins given a name",
    schema: {
      input: {
        jobName: (z) => z.string({ description: "Name of jenkins item" }),
        jobParameters: (z) => z.record(z.any()).optional()
      }
    },
    async handler(ctx) {
      ctx.logger.info(`Starting jenkins job ${ctx.input.jobName}`);
      await jenkins.job.build(ctx.input.jobName, ctx.input.jobParameters);
      ctx.logger.info("Job started successfully!");
    }
  });
}

exports.buildJob = buildJob;
//# sourceMappingURL=build.cjs.js.map
