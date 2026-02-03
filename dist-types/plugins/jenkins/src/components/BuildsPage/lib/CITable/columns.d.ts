import { TableColumn } from '@backstage/core-components';
import { Project } from '../../../../api/JenkinsApi';
export declare const columnFactories: Readonly<{
    createTimestampColumn(): TableColumn<Project>;
    createBuildColumn(): TableColumn<Project>;
    createSourceColumn(): TableColumn<Project>;
    createStatusColumn(): TableColumn<Project>;
    createTestColumn(): TableColumn<Project>;
    createLastRunDuration(): TableColumn<Project>;
    createActionsColumn(): TableColumn<Project>;
}>;
