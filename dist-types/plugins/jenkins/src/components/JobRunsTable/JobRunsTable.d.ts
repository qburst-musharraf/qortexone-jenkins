import { Job } from './../../api/JenkinsApi';
type Props = {
    loading: boolean;
    jobRuns?: Job;
    page: number;
    onChangePage: (page: number) => void;
    pageSize: number;
    onChangePageSize: (pageSize: number) => void;
};
export declare const JobRunsTableView: ({ loading, pageSize, page, jobRuns, onChangePage, onChangePageSize, }: Props) => import("react/jsx-runtime").JSX.Element;
export declare const JobRunsTable: () => import("react/jsx-runtime").JSX.Element;
export {};
