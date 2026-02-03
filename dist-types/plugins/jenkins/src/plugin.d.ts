/** @public */
export declare const rootRouteRef: import("@backstage/core-plugin-api").RouteRef<undefined>;
/** @public */
export declare const buildRouteRef: import("@backstage/core-plugin-api").SubRouteRef<import("@backstage/core-plugin-api").PathParams<"/builds/:jobFullName/:buildNumber">>;
/** @public */
export declare const jobRunsRouteRef: import("@backstage/core-plugin-api").SubRouteRef<import("@backstage/core-plugin-api").PathParams<"/builds/:jobFullName/runs">>;
/** @public */
export declare const jenkinsPlugin: import("@backstage/core-plugin-api").BackstagePlugin<{
    entityContent: import("@backstage/core-plugin-api").RouteRef<undefined>;
}, {}, {}>;
/** @public */
export declare const EntityJenkinsContent: (props: {
    title?: string | undefined;
    columns?: import("@backstage/core-components").TableColumn<import("./api").Project>[] | undefined;
}) => import("react/jsx-runtime").JSX.Element;
/** @public */
export declare const EntityLatestJenkinsRunCard: (props: {
    branch: string;
    variant?: import("@backstage/core-components").InfoCardVariants | undefined;
    title?: string | ((branch: string) => string) | undefined;
}) => import("react/jsx-runtime").JSX.Element;
/** @public */
export declare const EntityJobRunsTable: () => import("react/jsx-runtime").JSX.Element;
