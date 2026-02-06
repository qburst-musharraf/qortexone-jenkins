import { jsx } from 'react/jsx-runtime';
import { compatWrapper, convertLegacyRouteRef } from '@backstage/core-compat-api';
import { EntityContentBlueprint } from '@backstage/plugin-catalog-react/alpha';
import { rootRouteRef } from '../plugin.esm.js';
import { isJenkinsAvailable } from '../components/Router.esm.js';

const entityJenkinsProjects = EntityContentBlueprint.make({
  name: "projects",
  params: {
    path: "jenkins",
    title: "Jenkins",
    filter: isJenkinsAvailable,
    routeRef: convertLegacyRouteRef(rootRouteRef),
    loader: () => import('../components/Router.esm.js').then((m) => compatWrapper(/* @__PURE__ */ jsx(m.Router, {})))
  }
});

export { entityJenkinsProjects };
//# sourceMappingURL=entityContent.esm.js.map
