import { TableColumn } from '@backstage/core-components';
import { Project } from '../../../../api/JenkinsApi';
type Props = {
    title?: string;
    loading: boolean;
    retry: () => void;
    projects?: Project[];
    page: number;
    onChangePage: (page: number) => void;
    total: number;
    pageSize: number;
    onChangePageSize: (pageSize: number) => void;
    columns: TableColumn<Project>[];
};
export declare const CITableView: ({ title, loading, pageSize, page, retry, projects, onChangePage, onChangePageSize, columns, total, }: Props) => import("react/jsx-runtime").JSX.Element;
type CITableProps = {
    title?: string;
    columns?: TableColumn<Project>[];
};
export declare const CITable: {
    ({ title, columns }: CITableProps): import("react/jsx-runtime").JSX.Element;
    columns: Readonly<{
        createTimestampColumn(): TableColumn<Project>;
        createBuildColumn(): TableColumn<Project>;
        createSourceColumn(): TableColumn<Project>;
        createStatusColumn(): TableColumn<Project>;
        createTestColumn(): TableColumn<Project>;
        createLastRunDuration(): TableColumn<Project>;
        createActionsColumn(): TableColumn<Project>;
    }>;
    defaultCITableColumns: TableColumn<Project>[];
};
export {};
