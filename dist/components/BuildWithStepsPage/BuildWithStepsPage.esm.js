import { jsx, jsxs } from 'react/jsx-runtime';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ExternalLinkIcon from '@material-ui/icons/Launch';
import { buildRouteRef } from '../../plugin.esm.js';
import { JenkinsRunStatus } from '../BuildsPage/lib/Status/JenkinsRunStatus.esm.js';
import { useBuildWithSteps } from '../useBuildWithSteps.esm.js';
import { Content, Breadcrumbs, Link } from '@backstage/core-components';
import { useRouteRefParams } from '@backstage/core-plugin-api';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 720
  },
  table: {
    padding: theme.spacing(1)
  },
  externalLinkIcon: {
    fontSize: "inherit",
    verticalAlign: "bottom"
  }
}));
const BuildWithStepsView = () => {
  const { jobFullName, buildNumber } = useRouteRefParams(buildRouteRef);
  const classes = useStyles();
  const [{ value }] = useBuildWithSteps({ jobFullName, buildNumber });
  return /* @__PURE__ */ jsxs("div", { className: classes.root, children: [
    /* @__PURE__ */ jsxs(Breadcrumbs, { "aria-label": "breadcrumb", children: [
      /* @__PURE__ */ jsx(Link, { to: "..", children: "Projects" }),
      /* @__PURE__ */ jsx(Typography, { children: "Run" })
    ] }),
    /* @__PURE__ */ jsx(Box, { m: 2 }),
    /* @__PURE__ */ jsx(TableContainer, { component: Paper, className: classes.table, children: /* @__PURE__ */ jsx(Table, { children: /* @__PURE__ */ jsxs(TableBody, { children: [
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Typography, { noWrap: true, children: "Branch" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: value?.source?.branchName })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Typography, { noWrap: true, children: "Message" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: value?.source?.displayName })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Typography, { noWrap: true, children: "Commit ID" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: value?.source?.commit?.hash })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Typography, { noWrap: true, children: "Status" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(JenkinsRunStatus, { status: value?.status }) })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Typography, { noWrap: true, children: "Author" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: value?.source?.author })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Typography, { noWrap: true, children: "Jenkins" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: value?.url && /* @__PURE__ */ jsxs(Link, { to: value.url, children: [
          "View on Jenkins",
          " ",
          /* @__PURE__ */ jsx(ExternalLinkIcon, { className: classes.externalLinkIcon })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Typography, { noWrap: true, children: "GitHub" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: value?.source?.url && /* @__PURE__ */ jsxs(Link, { to: value.source.url, children: [
          "View on GitHub",
          " ",
          /* @__PURE__ */ jsx(ExternalLinkIcon, { className: classes.externalLinkIcon })
        ] }) })
      ] })
    ] }) }) })
  ] });
};
const Page = () => /* @__PURE__ */ jsx(Content, { children: /* @__PURE__ */ jsx(BuildWithStepsView, {}) });

export { BuildWithStepsView as BuildWithSteps, Page as default };
//# sourceMappingURL=BuildWithStepsPage.esm.js.map
