import { ApiBlueprint, fetchApiRef, discoveryApiRef } from '@backstage/frontend-plugin-api';
import { JenkinsClient, jenkinsApiRef } from '../api/JenkinsApi.esm.js';

const jenkinsApi = ApiBlueprint.make({
  name: "jenkins",
  params: (defineParams) => defineParams({
    api: jenkinsApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      fetchApi: fetchApiRef
    },
    factory: ({ discoveryApi, fetchApi }) => new JenkinsClient({ discoveryApi, fetchApi })
  })
});

export { jenkinsApi };
//# sourceMappingURL=apis.esm.js.map
