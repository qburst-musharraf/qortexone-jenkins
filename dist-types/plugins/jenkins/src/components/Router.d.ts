import { Entity } from '@backstage/catalog-model';
import { TableColumn } from '@backstage/core-components';
import { Project } from '../api';
/** @public */
export declare const isJenkinsAvailable: (entity: Entity) => boolean;
export declare const Router: (props: {
    title?: string;
    columns?: TableColumn<Project>[];
}) => import("react/jsx-runtime").JSX.Element;
