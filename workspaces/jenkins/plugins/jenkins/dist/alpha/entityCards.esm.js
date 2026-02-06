import { jsx } from 'react/jsx-runtime';
import { EntityCardBlueprint } from '@backstage/plugin-catalog-react/alpha';
import { isJenkinsAvailable } from '../components/Router.esm.js';

const entityLatestJenkinsRunCard = EntityCardBlueprint.makeWithOverrides(
  {
    name: "latest-run",
    config: {
      schema: {
        branch: (z) => z.string().default("master"),
        variant: (z) => z.enum(["flex", "fullHeight", "gridItem"]).optional()
      }
    },
    factory(originalFactory, { config }) {
      return originalFactory({
        filter: isJenkinsAvailable,
        loader: async () => import('../components/Cards/index.esm.js').then((m) => /* @__PURE__ */ jsx(m.LatestRunCard, { ...config }))
      });
    }
  }
);
EntityCardBlueprint.make({
  name: "job-runs",
  params: {
    filter: isJenkinsAvailable,
    loader: () => import('../components/JobRunsTable/index.esm.js').then((m) => /* @__PURE__ */ jsx(m.JobRunsTable, {}))
  }
});

export { entityLatestJenkinsRunCard };
//# sourceMappingURL=entityCards.esm.js.map
