'use strict';

function createJobApi(deps) {
  const { normalizeJobName, request } = deps;
  const paramsToSearchParams = (params) => {
    if (!params) {
      return new URLSearchParams();
    }
    if (params instanceof URLSearchParams) {
      return params;
    }
    const result = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v === void 0 || v === null) {
        continue;
      }
      result.set(k, String(v));
    }
    return result;
  };
  const leafSegment = (name) => {
    if (Array.isArray(name)) {
      return name[name.length - 1];
    }
    const parts = name.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? "";
  };
  const parentSegments = (name) => {
    if (!name) {
      return [];
    }
    if (Array.isArray(name)) {
      return name.slice(0, -1);
    }
    const parts = name.split("/").filter(Boolean);
    if (parts.length > 1) {
      return parts.slice(0, -1);
    }
    return [];
  };
  return {
    /**
     * Retrieves a job’s JSON representation from Jenkins.
     *
     * @param input - A {@link JobGetOptions} object. `tree` and `depth`
     *                are forwarded to `/api/json` as query params.
     * @returns The parsed job JSON.
     */
    get: async (input) => {
      const { name, tree, depth } = input;
      const jobPath = normalizeJobName(name);
      const query = {};
      if (tree) {
        query.tree = tree;
      }
      if (typeof depth === "number") {
        query.depth = depth;
      }
      return request(`${jobPath}/api/json`, { query });
    },
    /**
     * Retrieves only the builds portion of a job (server-side filtered via `tree`).
     *
     * @param name - The job name (string or array).
     * @param tree - The Jenkins Remote API `tree` expression selecting build fields.
     *               Defaults to `builds[number,url,result,timestamp,id,queueId,displayName,duration]`
     * @returns A JSON object containing the requested build fields.
     */
    getBuilds: async (name, tree = "builds[number,url,result,timestamp,id,queueId,displayName,duration]") => {
      const jobPath = normalizeJobName(name);
      return request(`${jobPath}/api/json`, {
        query: { tree }
      });
    },
    /**
     * Triggers a Jenkins job build.
     *
     * Uses `/build` or `/buildWithParameters` depending on whether parameters are provided.
     * Automatically URL-encodes parameters and supports legacy options like `delay` and `token`.
     *
     * @param name - The job name (string or array form).
     * @param opts - Optional build options (parameters, token, delay).
     * @returns A promise that resolves when the build request is accepted.
     */
    build: async (name, opts) => {
      const { parameters, token, delay } = opts ?? {};
      const jobPath = normalizeJobName(name);
      const hasParams = parameters instanceof URLSearchParams ? parameters.toString().length > 0 : parameters && Object.keys(parameters).length > 0;
      const endpoint = hasParams ? "buildWithParameters" : "build";
      const query = {
        ...token ? { token } : {},
        // Legacy client support: add delay option
        ...delay !== void 0 ? { delay } : {}
      };
      const body = hasParams ? paramsToSearchParams(parameters) : void 0;
      return request(`${jobPath}/${endpoint}`, {
        method: "POST",
        query,
        body
      });
    },
    /**
     * Copies a job to a new name (optionally inside folders).
     *
     * **Important:** For the `from` argument, pass the *slashy* full name (e.g. `"a/b/src"`).
     * Do **not** normalize it to `/job/...` form, Jenkins expects the raw slash-separated name.
     * Only the *leaf* of the new job goes in the `?name=` query; parent folders are derived
     * from `name` and embedded in the URL path.
     *
     * @param name - Target job name (string or segments). Parent parts become folders; leaf is the new job name.
     * @param from - Source job’s slashy full name (e.g. `"folder/old"`).
     */
    copy: async (name, from) => {
      const segments = parentSegments(name);
      const leaf = leafSegment(name);
      const folderPath = segments.length ? segments.map(normalizeJobName).join("/") : "";
      const url = folderPath ? `${folderPath}/createItem` : "createItem";
      return request(url, {
        method: "POST",
        query: {
          name: leaf,
          mode: "copy",
          from
          // Keep slashy!
        }
      });
    },
    /**
     * Creates a new job from an XML configuration payload.
     *
     * Only the *leaf* job name is sent in `?name=`; any parent segments become
     * folder parts embedded in the URL path.
     *
     * @param name - The destination job name (string or segments).
     * @param xml - The Jenkins job config.xml content.
     */
    create: async (name, xml) => {
      const segments = parentSegments(name);
      const leaf = leafSegment(name);
      const folderPath = segments.length ? segments.map(normalizeJobName).join("/") : "";
      const url = folderPath ? `${folderPath}/createItem` : "createItem";
      return request(url, {
        method: "POST",
        query: { name: leaf },
        body: xml,
        contentType: "application/xml"
      });
    },
    /**
     * Permanently deletes a job.
     *
     * @param name - The job name (string or segments).
     */
    destroy: async (name) => {
      const jobPath = normalizeJobName(name);
      return request(`${jobPath}/doDelete`, { method: "POST" });
    },
    /**
     * Enables a disabled job.
     *
     * @param name - The job name (string or segments).
     */
    enable: async (name) => {
      const jobPath = normalizeJobName(name);
      return request(`${jobPath}/enable`, { method: "POST" });
    },
    /**
     * Disables a job (prevents builds from being scheduled).
     *
     * @param name - The job name (string or segments).
     */
    disable: async (name) => {
      const jobPath = normalizeJobName(name);
      return request(`${jobPath}/disable`, { method: "POST" });
    }
  };
}

exports.createJobApi = createJobApi;
//# sourceMappingURL=jobApi.cjs.js.map
