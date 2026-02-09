'use strict';

function createBuildApi(deps) {
  const { normalizeJobName, request } = deps;
  return {
    /**
     * Retrieves a build's JSON representation from Jenkins.
     *
     * @param name - A build name (string or segments).
     * @param buildNumber - The build number to retrieve.
     * @returns A `JenkinsBuild` object with metadata about the specified build.
     */
    get: async (name, buildNumber) => {
      const jobPath = normalizeJobName(name);
      return request(`${jobPath}/${buildNumber}/api/json`);
    },
    /**
     * Retrieves a build's consoleText from Jenkins.
     *
     * @param name - A build name (string or segments).
     * @param buildNumber - The build number to retrieve logs for.
     * @returns The build's console output as plain text.
     */
    getConsoleText: async (name, buildNumber) => {
      const jobPath = normalizeJobName(name);
      return request(`${jobPath}/${buildNumber}/consoleText`, {
        rawText: true
      });
    }
  };
}

exports.createBuildApi = createBuildApi;
//# sourceMappingURL=buildApi.cjs.js.map
