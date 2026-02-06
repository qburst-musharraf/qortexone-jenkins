import { createApiRef } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';

const jenkinsApiRef = createApiRef({
  id: "plugin.jenkins.service2"
});
class JenkinsClient {
  discoveryApi;
  fetchApi;
  constructor(options) {
    this.discoveryApi = options.discoveryApi;
    this.fetchApi = options.fetchApi;
  }
  async getProjects(options) {
    const { entity, filter } = options;
    const url = new URL(
      `${await this.discoveryApi.getBaseUrl(
        "jenkins"
      )}/v1/entity/${encodeURIComponent(entity.namespace)}/${encodeURIComponent(
        entity.kind
      )}/${encodeURIComponent(entity.name)}/projects`
    );
    if (filter.branch) {
      url.searchParams.append("branch", filter.branch);
    }
    const response = await this.fetchApi.fetch(url);
    return (await response.json()).projects?.map((p) => ({
      ...p,
      onRestartClick: () => {
        return this.retry({
          entity,
          jobFullName: p.fullName,
          buildNumber: String(p.lastBuild.number)
        });
      }
    })) || [];
  }
  async getBuild(options) {
    const { entity, jobFullName, buildNumber } = options;
    const url = `${await this.discoveryApi.getBaseUrl(
      "jenkins"
    )}/v1/entity/${encodeURIComponent(entity.namespace)}/${encodeURIComponent(
      entity.kind
    )}/${encodeURIComponent(entity.name)}/job/${encodeURIComponent(
      jobFullName
    )}/${encodeURIComponent(buildNumber)}`;
    const response = await this.fetchApi.fetch(url);
    return (await response.json()).build;
  }
  async retry(options) {
    const { entity, jobFullName, buildNumber } = options;
    const url = `${await this.discoveryApi.getBaseUrl(
      "jenkins"
    )}/v1/entity/${encodeURIComponent(entity.namespace)}/${encodeURIComponent(
      entity.kind
    )}/${encodeURIComponent(entity.name)}/job/${encodeURIComponent(
      jobFullName
    )}/${encodeURIComponent(buildNumber)}`;
    const response = await this.fetchApi.fetch(url, { method: "POST" });
    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }
  }
  async getJobBuilds(options) {
    const { entity, jobFullName } = options;
    const url = `${await this.discoveryApi.getBaseUrl(
      "jenkins"
    )}/v1/entity/${encodeURIComponent(entity.namespace)}/${encodeURIComponent(
      entity.kind
    )}/${encodeURIComponent(entity.name)}/job/${encodeURIComponent(
      jobFullName
    )}`;
    const response = await this.fetchApi.fetch(url);
    return (await response.json()).build;
  }
  async getBuildConsoleText(options) {
    const { entity, jobFullName, buildNumber } = options;
    const url = `${await this.discoveryApi.getBaseUrl(
      "jenkins"
    )}/v1/entity/${encodeURIComponent(entity.namespace)}/${encodeURIComponent(
      entity.kind
    )}/${encodeURIComponent(entity.name)}/job/${encodeURIComponent(
      jobFullName
    )}/${encodeURIComponent(buildNumber)}/consoleText`;
    const response = await this.fetchApi.fetch(url);
    return await response.json();
  }
}

export { JenkinsClient, jenkinsApiRef };
//# sourceMappingURL=JenkinsApi.esm.js.map
