'use strict';

function addQueryParams(u, q) {
  const dup = new URL(u.toString());
  for (const [k, v] of Object.entries(q)) {
    if (v === void 0) {
      continue;
    }
    dup.searchParams.set(k, String(v));
  }
  return dup;
}
function joinUrl(base, path) {
  let dupBase = base;
  if (!dupBase.endsWith("/")) {
    dupBase += "/";
  }
  return dupBase + path;
}
function trimLeadingSlash(p) {
  return p.startsWith("/") ? p.slice(1) : p;
}
function ensureTrailingSlash(u) {
  return u.endsWith("/") ? u : `${u}/`;
}
async function safeExtractText(res) {
  try {
    return await res.text();
  } catch {
    return "<no response body>";
  }
}

exports.addQueryParams = addQueryParams;
exports.ensureTrailingSlash = ensureTrailingSlash;
exports.joinUrl = joinUrl;
exports.safeExtractText = safeExtractText;
exports.trimLeadingSlash = trimLeadingSlash;
//# sourceMappingURL=utils.cjs.js.map
