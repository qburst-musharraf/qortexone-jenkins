import { convertLegacyRouteRefs } from '@backstage/core-compat-api';
import { createFrontendPlugin } from '@backstage/frontend-plugin-api';
import { jenkinsApi } from './alpha/apis.esm.js';
import { entityLatestJenkinsRunCard } from './alpha/entityCards.esm.js';
import { entityJenkinsProjects } from './alpha/entityContent.esm.js';
import { rootRouteRef } from './plugin.esm.js';

var alpha = createFrontendPlugin({
  pluginId: "jenkins",
  routes: convertLegacyRouteRefs({
    entityContent: rootRouteRef
  }),
  extensions: [entityJenkinsProjects, entityLatestJenkinsRunCard, jenkinsApi]
});

export { alpha as default };
//# sourceMappingURL=alpha.esm.js.map
