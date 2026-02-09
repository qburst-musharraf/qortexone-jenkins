import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { StatusWarning, StatusAborted, StatusOK, StatusError, StatusRunning, StatusPending } from '@backstage/core-components';

const JenkinsRunStatus = ({
  status
}) => {
  if (status === void 0) return null;
  switch (status.toLocaleLowerCase("en-US")) {
    case "queued":
    case "scheduled":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(StatusPending, {}),
        " Queued"
      ] });
    case "running":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(StatusRunning, {}),
        " In progress"
      ] });
    case "unstable":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(StatusWarning, {}),
        " Unstable"
      ] });
    case "failure":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(StatusError, {}),
        " Failed"
      ] });
    case "success":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(StatusOK, {}),
        " Completed"
      ] });
    case "aborted":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(StatusAborted, {}),
        " Aborted"
      ] });
    default:
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(StatusWarning, {}),
        " ",
        status
      ] });
  }
};

export { JenkinsRunStatus };
//# sourceMappingURL=JenkinsRunStatus.esm.js.map
