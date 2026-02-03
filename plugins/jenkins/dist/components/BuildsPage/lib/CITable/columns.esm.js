import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { Link, Progress } from '@backstage/core-components';
import { useApi, alertApiRef, useRouteRef } from '@backstage/core-plugin-api';
import { useEntityPermission } from '@backstage/plugin-catalog-react/alpha';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import RetryIcon from '@material-ui/icons/Replay';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HistoryIcon from '@material-ui/icons/History';
import { useState } from 'react';
import { jobRunsRouteRef, buildRouteRef } from '../../../../plugin.esm.js';
import { JenkinsRunStatus } from '../Status/JenkinsRunStatus.esm.js';
import { jenkinsExecutePermission } from '@qortexone-jenkins/jenkins-common';

const FailCount = ({ count }) => {
  if (count !== 0) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      count,
      " failed"
    ] });
  }
  return null;
};
const SkippedCount = ({ count }) => {
  if (count !== 0) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      count,
      " skipped"
    ] });
  }
  return null;
};
const FailSkippedWidget = ({
  skipped,
  failed
}) => {
  if (skipped === 0 && failed === 0) {
    return null;
  }
  if (skipped !== 0 && failed !== 0) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      " ",
      "(",
      /* @__PURE__ */ jsx(FailCount, { count: failed }),
      ", ",
      /* @__PURE__ */ jsx(SkippedCount, { count: skipped }),
      ")"
    ] });
  }
  if (failed !== 0) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      " ",
      "(",
      /* @__PURE__ */ jsx(FailCount, { count: failed }),
      ")"
    ] });
  }
  if (skipped !== 0) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      " ",
      "(",
      /* @__PURE__ */ jsx(SkippedCount, { count: skipped }),
      ")"
    ] });
  }
  return null;
};
const columnFactories = Object.freeze({
  createTimestampColumn() {
    return {
      title: "Timestamp",
      defaultSort: "desc",
      hidden: true,
      field: "lastBuild.timestamp"
    };
  },
  createBuildColumn() {
    return {
      title: "Build",
      field: "fullName",
      highlight: true,
      render: (row) => {
        const LinkWrapper = () => {
          const routeLink = useRouteRef(buildRouteRef);
          if (!row.fullName || !row.lastBuild?.number) {
            return /* @__PURE__ */ jsx(Fragment, { children: row.fullName || row.fullDisplayName || row.displayName || "Unknown" });
          }
          return /* @__PURE__ */ jsx(
            Link,
            {
              to: routeLink({
                jobFullName: encodeURIComponent(row.fullName),
                buildNumber: String(row.lastBuild?.number)
              }),
              children: row.fullDisplayName
            }
          );
        };
        return /* @__PURE__ */ jsx(LinkWrapper, {});
      }
    };
  },
  createSourceColumn() {
    return {
      title: "Source",
      field: "lastBuild.source.branchName",
      render: (row) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Typography, { paragraph: true, children: /* @__PURE__ */ jsx(Link, { to: row.lastBuild?.source?.url ?? "", children: row.lastBuild?.source?.branchName }) }),
        /* @__PURE__ */ jsx(Typography, { paragraph: true, children: row.lastBuild?.source?.commit?.hash })
      ] })
    };
  },
  createStatusColumn() {
    return {
      title: "Status",
      field: "status",
      render: (row) => {
        return /* @__PURE__ */ jsx(Box, { display: "flex", alignItems: "center", children: /* @__PURE__ */ jsx(JenkinsRunStatus, { status: row.status }) });
      }
    };
  },
  createTestColumn() {
    return {
      title: "Tests",
      sorting: false,
      render: (row) => {
        return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Typography, { paragraph: true, children: [
          row.lastBuild?.tests && /* @__PURE__ */ jsxs(Link, { to: row.lastBuild?.tests.testUrl ?? "", children: [
            row.lastBuild?.tests.passed,
            " / ",
            row.lastBuild?.tests.total,
            " ",
            "passed",
            /* @__PURE__ */ jsx(
              FailSkippedWidget,
              {
                skipped: row.lastBuild?.tests.skipped,
                failed: row.lastBuild?.tests.failed
              }
            )
          ] }),
          !row.lastBuild?.tests && "n/a"
        ] }) });
      }
    };
  },
  createLastRunDuration() {
    return {
      title: "Last Run Duration",
      align: "left",
      render: (row) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Typography, { children: [
        row?.lastBuild?.duration ? (row?.lastBuild?.duration / 1e3).toFixed(1).toString().concat(" s") : "",
        " "
      ] }) })
    };
  },
  createActionsColumn() {
    return {
      title: "Actions",
      sorting: false,
      render: (row) => {
        const ActionWrapper = () => {
          const [isLoadingRebuild, setIsLoadingRebuild] = useState(false);
          const { allowed, loading } = useEntityPermission(
            jenkinsExecutePermission
          );
          const alertApi = useApi(alertApiRef);
          const jobRunsLink = useRouteRef(jobRunsRouteRef);
          const onRebuild = async () => {
            if (row.onRestartClick) {
              setIsLoadingRebuild(true);
              try {
                await row.onRestartClick();
                alertApi.post({
                  message: "Jenkins re-build has successfully executed",
                  severity: "success",
                  display: "transient"
                });
              } catch (e) {
                alertApi.post({
                  message: `Jenkins re-build has failed. Error: ${e.message}`,
                  severity: "error"
                });
              } finally {
                setIsLoadingRebuild(false);
              }
            }
          };
          return /* @__PURE__ */ jsxs("div", { style: { width: "148px" }, children: [
            row.lastBuild?.url && /* @__PURE__ */ jsx(Tooltip, { title: "View build", children: /* @__PURE__ */ jsx(IconButton, { href: row.lastBuild.url, target: "_blank", children: /* @__PURE__ */ jsx(VisibilityIcon, {}) }) }),
            isLoadingRebuild && /* @__PURE__ */ jsx(Progress, {}),
            !isLoadingRebuild && /* @__PURE__ */ jsx(Tooltip, { title: "Rerun build", children: /* @__PURE__ */ jsx(
              IconButton,
              {
                onClick: onRebuild,
                disabled: loading || !allowed,
                children: /* @__PURE__ */ jsx(RetryIcon, {})
              }
            ) }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: jobRunsLink({
                  jobFullName: encodeURIComponent(row.fullName || "")
                }),
                children: /* @__PURE__ */ jsx(Tooltip, { title: "View Runs", children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(HistoryIcon, {}) }) })
              }
            )
          ] });
        };
        return /* @__PURE__ */ jsx(ActionWrapper, {});
      },
      width: "10%"
    };
  }
});

export { columnFactories };
//# sourceMappingURL=columns.esm.js.map
