import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import ExternalLinkIcon from '@material-ui/icons/Launch';
import { DateTime, Duration } from 'luxon';
import { JenkinsRunStatus } from '../BuildsPage/lib/Status/JenkinsRunStatus.esm.js';
import { useBuilds, ErrorType } from '../useBuilds.esm.js';
import { InfoCard, StructuredMetadataTable, Link, WarningPanel } from '@backstage/core-components';

const useStyles = makeStyles({
  externalLinkIcon: {
    fontSize: "inherit",
    verticalAlign: "bottom"
  }
});
const WidgetContent = ({
  loading,
  latestRun
}) => {
  const classes = useStyles();
  if (loading || !latestRun) return /* @__PURE__ */ jsx(LinearProgress, {});
  const displayDate = DateTime.fromMillis(
    latestRun.lastBuild.timestamp
  ).toRelative();
  const displayDuration = (latestRun.lastBuild.building ? "Running for " : "") + DateTime.local().minus(Duration.fromMillis(latestRun.lastBuild.duration)).toRelative({ locale: "en" })?.replace(" ago", "");
  return /* @__PURE__ */ jsx(
    StructuredMetadataTable,
    {
      metadata: {
        status: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(JenkinsRunStatus, { status: latestRun.lastBuild.status }) }),
        build: latestRun.fullDisplayName,
        "latest run": displayDate,
        duration: displayDuration,
        link: /* @__PURE__ */ jsxs(Link, { to: latestRun.lastBuild.url, children: [
          "See more on Jenkins",
          " ",
          /* @__PURE__ */ jsx(ExternalLinkIcon, { className: classes.externalLinkIcon })
        ] })
      }
    }
  );
};
const JenkinsApiErrorPanel = (props) => {
  const { message, errorType } = props;
  let title = void 0;
  if (errorType === ErrorType.CONNECTION_ERROR) {
    title = "Can't connect to Jenkins";
  } else if (errorType === ErrorType.NOT_FOUND) {
    title = "Can't find Jenkins project";
  }
  return /* @__PURE__ */ jsx(WarningPanel, { severity: "error", title, message });
};
const renderLatestRunCardTitle = (branch, title) => {
  if (title && typeof title === "function") {
    return title(branch);
  }
  return title || `Latest ${branch} build`;
};
const LatestRunCard = (props) => {
  const { branch = "master", variant, title } = props;
  const [{ projects, loading, error }] = useBuilds({ branch });
  const latestRun = projects?.[0];
  return /* @__PURE__ */ jsx(InfoCard, { title: renderLatestRunCardTitle(branch, title), variant, children: !error ? /* @__PURE__ */ jsx(
    WidgetContent,
    {
      loading,
      branch,
      latestRun
    }
  ) : /* @__PURE__ */ jsx(
    JenkinsApiErrorPanel,
    {
      message: error.message,
      errorType: error.errorType
    }
  ) });
};

export { LatestRunCard };
//# sourceMappingURL=Cards.esm.js.map
