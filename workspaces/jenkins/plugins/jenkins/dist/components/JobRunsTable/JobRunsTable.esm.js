import { jsx, jsxs } from 'react/jsx-runtime';
import { Table, Link } from '@backstage/core-components';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import JenkinsLogo from './../../assets/JenkinsLogo.svg';
import { useJobRuns } from '../useJobRuns.esm.js';
import { JenkinsRunStatus } from '../BuildsPage/lib/Status/JenkinsRunStatus.esm.js';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { jobRunsRouteRef } from '../../plugin.esm.js';
import { useRouteRefParams } from '@backstage/core-plugin-api';

const generatedColumns = [
  {
    title: "Number",
    field: "number",
    render: (row) => {
      return /* @__PURE__ */ jsx(Box, { display: "flex", alignItems: "center", children: /* @__PURE__ */ jsx(Typography, { paragraph: true, children: /* @__PURE__ */ jsx(Link, { to: row.url ?? "", children: row.number }) }) });
    }
  },
  {
    title: "Timestamp",
    field: "timestamp",
    render: (row) => {
      return /* @__PURE__ */ jsx(Box, { display: "flex", alignItems: "center", children: /* @__PURE__ */ jsx(Typography, { children: row?.timestamp ? new Date(row?.timestamp).toLocaleString() : " " }) });
    }
  },
  {
    title: "Result",
    field: "result",
    render: (row) => {
      return /* @__PURE__ */ jsx(Box, { display: "flex", alignItems: "center", children: row.inProgress ? /* @__PURE__ */ jsx(Typography, { children: "In Progress" }) : /* @__PURE__ */ jsx(JenkinsRunStatus, { status: row?.result }) });
    }
  },
  {
    title: "Duration",
    field: "duration",
    render: (row) => {
      return /* @__PURE__ */ jsx(Box, { display: "flex", alignItems: "center", children: /* @__PURE__ */ jsx(Typography, { children: row?.duration ? (row.duration / 1e3).toFixed(1).toString().concat(" s") : "" }) });
    }
  },
  {
    title: "Actions",
    render: (row) => {
      const ActionWrapper = () => {
        return /* @__PURE__ */ jsx("div", { style: { width: "98px" }, children: row?.url && /* @__PURE__ */ jsx(Tooltip, { title: "View build", children: /* @__PURE__ */ jsx(Link, { component: IconButton, to: row.url, children: /* @__PURE__ */ jsx(VisibilityIcon, {}) }) }) });
      };
      return /* @__PURE__ */ jsx(ActionWrapper, {});
    },
    width: "10%"
  }
];
const JobRunsTableView = ({
  loading,
  pageSize,
  page,
  jobRuns,
  onChangePage,
  onChangePageSize
}) => {
  const builds = jobRuns?.builds.slice(
    page * pageSize,
    page * pageSize + pageSize
  );
  let sumOfAllSuccessfulJobDuration = 0;
  const successfulJobCount = builds?.reduce((count, build) => {
    if (!build.inProgress && build.result === "SUCCESS") {
      sumOfAllSuccessfulJobDuration += build.duration;
      return count + 1;
    }
    return count;
  }, 0) || 0;
  let avgTime;
  if (successfulJobCount > 0) {
    avgTime = (sumOfAllSuccessfulJobDuration / successfulJobCount / 1e3).toFixed(1).toString();
  }
  return /* @__PURE__ */ jsx(
    Table,
    {
      isLoading: loading,
      options: { paging: true, pageSize, padding: "dense" },
      totalCount: jobRuns?.builds.length || 0,
      page,
      data: builds ?? [],
      onPageChange: onChangePage,
      onRowsPerPageChange: onChangePageSize,
      title: /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", children: [
          /* @__PURE__ */ jsx("img", { src: JenkinsLogo, alt: "Jenkins logo", height: "50px" }),
          /* @__PURE__ */ jsx(Box, { mr: 2 }),
          /* @__PURE__ */ jsx(Typography, { variant: "h6", children: `${jobRuns?.displayName} Runs` })
        ] }),
        /* @__PURE__ */ jsx(Box, { display: "flex", alignItems: "center", mt: 2, children: /* @__PURE__ */ jsxs(Typography, { variant: "h6", children: [
          "Average Build Time For Last ",
          successfulJobCount,
          " Successful jobs :",
          " ",
          avgTime || 0
        ] }) })
      ] }),
      columns: generatedColumns
    }
  );
};
const JobRunsTable = () => {
  const { jobFullName } = useRouteRefParams(jobRunsRouteRef);
  const [tableProps, { setPage, setPageSize }] = useJobRuns(jobFullName);
  return /* @__PURE__ */ jsx(
    JobRunsTableView,
    {
      ...tableProps,
      onChangePageSize: setPageSize,
      onChangePage: setPage
    }
  );
};

export { JobRunsTable, JobRunsTableView };
//# sourceMappingURL=JobRunsTable.esm.js.map
