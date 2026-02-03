'use strict';

var fetch = require('node-fetch');
var jobApi = require('./client/jobApi.cjs.js');
var buildApi = require('./client/buildApi.cjs.js');
var utils = require('./client/utils.cjs.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var fetch__default = /*#__PURE__*/_interopDefaultCompat(fetch);

class Jenkins {
  crumbData;
  opts;
  constructor(opts) {
    if (!opts.baseUrl) {
      throw new Error("Jenkins: opts.baseUrl is required");
    }
    if (opts.crumbIssuer === void 0) {
      opts.crumbIssuer = true;
    }
    const referer = utils.ensureTrailingSlash(opts.baseUrl);
    opts.headers = { referer, ...opts.headers ?? {} };
    this.opts = opts;
  }
  // Add APIs
  job = jobApi.createJobApi({
    normalizeJobName: (name) => this.normalizeJobName(name),
    request: (path, opts) => this.request(path, opts)
  });
  build = buildApi.createBuildApi({
    normalizeJobName: (name) => this.normalizeJobName(name),
    request: (path, opts) => this.request(path, opts)
  });
  /**
   * Retrieves and caches the Jenkins CSRF protection crumb.
   *
   * Jenkins uses a "crumb" (similar to a CSRF token) to protect write operations
   * such as POST requests. This method handles retrieving that crumb based on
   * the client's configuration.
   *
   * Behavior:
   * - If `crumbIssuer` is not enabled in the client options, it returns `undefined`.
   * - If a cached crumb already exists, it is returned immediately.
   * - If `crumbIssuer` is a function, that function is called to obtain the crumb.
   * - Otherwise, it performs a network request to
   *   `<baseUrl>/crumbIssuer/api/json` to fetch the crumb from Jenkins.
   *
   * The result is cached in `this.crumbData` for subsequent calls.
   *
   * @returns A `CrumbData` object containing the header name and value,
   *          or `undefined` if no crumb issuer is configured or the request fails.
   * @throws Any network or parsing errors that occur during the crumb fetch.
   */
  async getCrumb() {
    const { crumbIssuer } = this.opts;
    if (!crumbIssuer) {
      return void 0;
    }
    if (this.crumbData) {
      return this.crumbData;
    }
    if (typeof crumbIssuer === "function") {
      this.crumbData = await crumbIssuer(this);
      return this.crumbData;
    }
    const res = await this.fetchRaw(
      `${utils.ensureTrailingSlash(this.opts.baseUrl)}crumbIssuer/api/json`
    );
    if (!res.ok) {
      return void 0;
    }
    const data = await res.json();
    this.crumbData = {
      headerName: data.crumbRequestField,
      headerValue: data.crumb
    };
    return this.crumbData;
  }
  async request(path, opts = {}) {
    let url = new URL(
      utils.joinUrl(utils.ensureTrailingSlash(this.opts.baseUrl), utils.trimLeadingSlash(path))
    );
    if (opts.query) {
      url = utils.addQueryParams(url, opts.query);
    }
    const method = (opts?.method || (opts?.body ? "POST" : "GET")).toLocaleUpperCase("en-US");
    const headers = {
      ...this.opts.headers ?? {}
    };
    if (method !== "GET" && method !== "HEAD") {
      const crumb = await this.getCrumb();
      if (crumb) {
        headers[crumb.headerName] = crumb.headerValue;
        if (crumb.cookies?.length) {
          const prior = typeof headers.cookie === "string" ? headers.cookie : "";
          const extra = crumb.cookies.join("; ");
          headers.cookie = prior ? `${prior}; ${extra}` : extra;
        }
      }
    }
    let resolvedContentType;
    if (opts?.contentType) {
      resolvedContentType = opts?.contentType;
    }
    if (!resolvedContentType && opts?.body instanceof URLSearchParams) {
      resolvedContentType = "application/x-www-form-urlencoded; charset=UTF-8";
    }
    if (resolvedContentType) {
      headers["content-type"] = resolvedContentType;
    }
    const res = await this.fetchRaw(url.toString(), {
      method,
      headers,
      body: opts?.body
    });
    if (!res.ok) {
      const text = await utils.safeExtractText(res);
      throw new Error(
        `Jenkins API error ${res.status} ${method} ${url.toString()}: ${text}`
      );
    }
    if (opts?.rawText) {
      return res.text();
    }
    const contentType = (res.headers.get("content-type") || "").toLocaleLowerCase("en-US");
    if (contentType.includes("application/json")) {
      return res.json();
    }
    return res.text();
  }
  async fetchRaw(input, init) {
    const flattened = {};
    for (const [k, v] of Object.entries(init?.headers ?? {})) {
      if (Array.isArray(v)) {
        flattened[k] = v.join(", ");
      } else if (v === void 0) {
        continue;
      } else {
        flattened[k] = v;
      }
    }
    return fetch__default.default(input, {
      ...init ?? {},
      headers: flattened
    });
  }
  /**
   * Normalizes a Jenkins job name into a fully qualified job path.
   *
   * Jenkins job URLs use a hierarchical format like:
   *   `/job/folder/job/subfolder/job/pipeline`
   *
   * This method takes a job name (either a string like `"folder/pipeline"`
   * or an array like `["folder", "pipeline"]`) and converts it into the proper
   * Jenkins API path format by inserting `job/` segments and URL-encoding
   * each component.
   *
   * - If the input already contains `/job/` segments, it is returned as-is
   *   (after trimming any leading slash).
   * - If the input is undefined, an error is thrown.
   *
   * @param name - The job name to normalize, either as a string or an array of path segments.
   * @returns The normalized Jenkins job path (e.g. `"job/folder/job/pipeline"`).
   * @throws If the name is undefined or empty.
   */
  normalizeJobName(name) {
    if (!name) {
      throw new Error('Jenkins.normalizeJobName: "name" is required');
    }
    const parts = Array.isArray(name) ? name : name.split("/").filter(Boolean);
    if (parts.join("/").includes("/job/")) {
      return utils.trimLeadingSlash(Array.isArray(name) ? parts.join("/") : name);
    }
    return parts.map(encodeURIComponent).map((s) => `job/${s}`).join("/");
  }
}

exports.Jenkins = Jenkins;
//# sourceMappingURL=client.cjs.js.map
