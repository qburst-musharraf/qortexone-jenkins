import { createRouteRef, createSubRouteRef, createPlugin, createApiFactory, fetchApiRef, discoveryApiRef, createRoutableExtension, createComponentExtension } from '@backstage/core-plugin-api';
import { JenkinsClient, jenkinsApiRef } from './api/JenkinsApi.esm.js';

const rootRouteRef = createRouteRef({
  id: "jenkins"
});
const buildRouteRef = createSubRouteRef({
  id: "jenkins/builds",
  path: "/builds/:jobFullName/:buildNumber",
  parent: rootRouteRef
});
const jobRunsRouteRef = createSubRouteRef({
  id: "jenkins/job/runs",
  path: "/builds/:jobFullName/runs",
  parent: rootRouteRef
});
const jenkinsPlugin = createPlugin({
  id: "jenkins",
  apis: [
    createApiFactory({
      api: jenkinsApiRef,
      deps: { discoveryApi: discoveryApiRef, fetchApi: fetchApiRef },
      factory: ({ discoveryApi, fetchApi }) => new JenkinsClient({ discoveryApi, fetchApi })
    })
  ],
  routes: {
    entityContent: rootRouteRef
  }
});
const EntityJenkinsContent = jenkinsPlugin.provide(
  createRoutableExtension({
    name: "EntityJenkinsContent",
    component: () => import('./components/Router.esm.js').then((m) => m.Router),
    mountPoint: rootRouteRef
  })
);
const EntityLatestJenkinsRunCard = jenkinsPlugin.provide(
  createComponentExtension({
    name: "EntityLatestJenkinsRunCard",
    component: {
      lazy: () => import('./components/Cards/index.esm.js').then((m) => m.LatestRunCard)
    }
  })
);
const EntityJobRunsTable = jenkinsPlugin.provide(
  createComponentExtension({
    name: "EntityJobRunsTable",
    component: {
      lazy: () => import('./components/JobRunsTable/index.esm.js').then((m) => m.JobRunsTable)
    }
  })
);

export { EntityJenkinsContent, EntityJobRunsTable, EntityLatestJenkinsRunCard, buildRouteRef, jenkinsPlugin, jobRunsRouteRef, rootRouteRef };
//# sourceMappingURL=plugin.esm.js.map
