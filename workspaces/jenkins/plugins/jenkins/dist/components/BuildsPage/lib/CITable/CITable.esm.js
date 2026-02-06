import { jsx, jsxs } from 'react/jsx-runtime';
import { Table } from '@backstage/core-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RetryIcon from '@material-ui/icons/Replay';
import JenkinsLogo from '../../../../assets/JenkinsLogo.svg';
import { useBuilds } from '../../../useBuilds.esm.js';
import { columnFactories } from './columns.esm.js';
import { defaultCITableColumns } from './presets.esm.js';

const CITableView = ({
  title = "Projects",
  loading,
  pageSize,
  page,
  retry,
  projects,
  onChangePage,
  onChangePageSize,
  columns,
  total
}) => {
  const projectsInPage = projects?.slice(
    page * pageSize,
    Math.min(projects.length, (page + 1) * pageSize)
  );
  return /* @__PURE__ */ jsx(
    Table,
    {
      isLoading: loading,
      options: { paging: true, pageSize, padding: "dense" },
      totalCount: total,
      page,
      actions: [
        {
          icon: () => /* @__PURE__ */ jsx(RetryIcon, {}),
          tooltip: "Refresh Data",
          isFreeAction: true,
          onClick: () => retry()
        }
      ],
      data: projectsInPage ?? [],
      onPageChange: onChangePage,
      onRowsPerPageChange: onChangePageSize,
      title: /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", children: [
        /* @__PURE__ */ jsx("img", { src: JenkinsLogo, alt: "Jenkins logo", height: "50px" }),
        /* @__PURE__ */ jsx(Box, { mr: 2 }),
        /* @__PURE__ */ jsx(Typography, { variant: "h6", children: title })
      ] }),
      columns: columns && columns.length !== 0 ? columns : defaultCITableColumns
    }
  );
};
const CITable = ({ title, columns }) => {
  const [tableProps, { setPage, retry, setPageSize }] = useBuilds();
  return /* @__PURE__ */ jsx(
    CITableView,
    {
      ...tableProps,
      title,
      columns: columns || [],
      retry,
      onChangePageSize: setPageSize,
      onChangePage: setPage
    }
  );
};
CITable.columns = columnFactories;
CITable.defaultCITableColumns = defaultCITableColumns;

export { CITable, CITableView };
//# sourceMappingURL=CITable.esm.js.map
