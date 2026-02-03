import { jsx, jsxs } from 'react/jsx-runtime';
import { useEntity, MissingAnnotationEmptyState } from '@backstage/plugin-catalog-react';
import { Routes, Route } from 'react-router-dom';
import { JENKINS_ANNOTATION, LEGACY_JENKINS_ANNOTATION } from '../constants.esm.js';
import { buildRouteRef, jobRunsRouteRef } from '../plugin.esm.js';
import { CITable } from './BuildsPage/lib/CITable/CITable.esm.js';
import Page from './BuildWithStepsPage/BuildWithStepsPage.esm.js';
import { JobRunsTable } from './JobRunsTable/JobRunsTable.esm.js';

const isJenkinsAvailable = (entity) => Boolean(entity.metadata.annotations?.[JENKINS_ANNOTATION]) || Boolean(entity.metadata.annotations?.[LEGACY_JENKINS_ANNOTATION]);
const Router = (props) => {
  const { entity } = useEntity();
  if (!isJenkinsAvailable(entity)) {
    return /* @__PURE__ */ jsx(MissingAnnotationEmptyState, { annotation: JENKINS_ANNOTATION });
  }
  const { title, columns } = props;
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(CITable, { title, columns }) }),
    /* @__PURE__ */ jsx(Route, { path: `/${buildRouteRef.path}`, element: /* @__PURE__ */ jsx(Page, {}) }),
    /* @__PURE__ */ jsx(Route, { path: `/${jobRunsRouteRef.path}`, element: /* @__PURE__ */ jsx(JobRunsTable, {}) })
  ] });
};

export { Router, isJenkinsAvailable };
//# sourceMappingURL=Router.esm.js.map
