'use strict';

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');

function copyJob(jenkins) {
  return pluginScaffolderNode.createTemplateAction({
    id: "jenkins:job:copy",
    description: "Creating a job jenkins given an existing job",
    schema: {
      input: {
        sourceJobName: (z) => z.string({ description: "Name of the source jenkins item" }),
        targetJobName: (z) => z.string({ description: "Name of the target jenkins item" })
      }
    },
    async handler(ctx) {
      ctx.logger.info(
        `Copying jenkins job ${ctx.input.sourceJobName} to ${ctx.input.targetJobName} to `
      );
      await jenkins.job.copy(ctx.input.targetJobName, ctx.input.sourceJobName);
      ctx.logger.info("Job copied successfully!");
    }
  });
}

exports.copyJob = copyJob;
//# sourceMappingURL=copy.cjs.js.map
