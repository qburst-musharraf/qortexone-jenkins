/// <reference types="react" />
/**
 * @alpha
 */
declare const _default: import("@backstage/frontend-plugin-api").OverridableFrontendPlugin<{
    entityContent: import("@backstage/frontend-plugin-api").RouteRef<undefined>;
}, {}, {
    "api:jenkins/jenkins": import("@backstage/frontend-plugin-api").OverridableExtensionDefinition<{
        kind: "api";
        name: "jenkins";
        config: {};
        configInput: {};
        output: import("@backstage/frontend-plugin-api").ExtensionDataRef<import("@backstage/frontend-plugin-api").AnyApiFactory, "core.api.factory", {}>;
        inputs: {};
        params: <TApi, TImpl extends TApi, TDeps extends {
            [x: string]: unknown;
        }>(params: import("@backstage/frontend-plugin-api").ApiFactory<TApi, TImpl, TDeps>) => import("@backstage/frontend-plugin-api").ExtensionBlueprintParams<import("@backstage/frontend-plugin-api").AnyApiFactory>;
    }>;
    "entity-card:jenkins/latest-run": import("@backstage/frontend-plugin-api").OverridableExtensionDefinition<{
        config: {
            branch: string;
            variant: "flex" | "fullHeight" | "gridItem" | undefined;
            filter: import("@backstage/plugin-catalog-react/alpha").EntityPredicate | undefined;
            type: "summary" | "content" | "info" | undefined;
        };
        configInput: {
            variant?: "flex" | "fullHeight" | "gridItem" | undefined;
            branch?: string | undefined;
            filter?: import("@backstage/plugin-catalog-react/alpha").EntityPredicate | undefined;
            type?: "summary" | "content" | "info" | undefined;
        };
        output: import("@backstage/frontend-plugin-api").ExtensionDataRef<import("react").JSX.Element, "core.reactElement", {}> | import("@backstage/frontend-plugin-api").ExtensionDataRef<(entity: import("@backstage/catalog-model").Entity) => boolean, "catalog.entity-filter-function", {
            optional: true;
        }> | import("@backstage/frontend-plugin-api").ExtensionDataRef<string, "catalog.entity-filter-expression", {
            optional: true;
        }> | import("@backstage/frontend-plugin-api").ExtensionDataRef<import("@backstage/plugin-catalog-react/alpha").EntityCardType, "catalog.entity-card-type", {
            optional: true;
        }>;
        inputs: {};
        kind: "entity-card";
        name: "latest-run";
        params: {
            loader: () => Promise<JSX.Element>;
            filter?: import("@backstage/plugin-catalog-react/alpha").EntityPredicate | ((entity: import("@backstage/catalog-model").Entity) => boolean) | undefined;
            type?: import("@backstage/plugin-catalog-react/alpha").EntityCardType | undefined;
        };
    }>;
    "entity-content:jenkins/projects": import("@backstage/frontend-plugin-api").OverridableExtensionDefinition<{
        kind: "entity-content";
        name: "projects";
        config: {
            path: string | undefined;
            title: string | undefined;
            filter: import("@backstage/plugin-catalog-react/alpha").EntityPredicate | undefined;
            group: string | false | undefined;
        };
        configInput: {
            filter?: import("@backstage/plugin-catalog-react/alpha").EntityPredicate | undefined;
            title?: string | undefined;
            path?: string | undefined;
            group?: string | false | undefined;
        };
        output: import("@backstage/frontend-plugin-api").ExtensionDataRef<import("react").JSX.Element, "core.reactElement", {}> | import("@backstage/frontend-plugin-api").ExtensionDataRef<string, "core.routing.path", {}> | import("@backstage/frontend-plugin-api").ExtensionDataRef<import("@backstage/frontend-plugin-api").RouteRef<import("@backstage/frontend-plugin-api").AnyRouteRefParams>, "core.routing.ref", {
            optional: true;
        }> | import("@backstage/frontend-plugin-api").ExtensionDataRef<(entity: import("@backstage/catalog-model").Entity) => boolean, "catalog.entity-filter-function", {
            optional: true;
        }> | import("@backstage/frontend-plugin-api").ExtensionDataRef<string, "catalog.entity-filter-expression", {
            optional: true;
        }> | import("@backstage/frontend-plugin-api").ExtensionDataRef<string, "catalog.entity-content-title", {}> | import("@backstage/frontend-plugin-api").ExtensionDataRef<string, "catalog.entity-content-group", {
            optional: true;
        }>;
        inputs: {};
        params: {
            defaultPath?: [Error: "Use the 'path' param instead"] | undefined;
            path: string;
            defaultTitle?: [Error: "Use the 'title' param instead"] | undefined;
            title: string;
            defaultGroup?: [Error: "Use the 'group' param instead"] | undefined;
            group?: (string & {}) | "development" | "overview" | "documentation" | "deployment" | "operation" | "observability" | undefined;
            loader: () => Promise<JSX.Element>;
            routeRef?: import("@backstage/frontend-plugin-api").RouteRef<import("@backstage/frontend-plugin-api").AnyRouteRefParams> | undefined;
            filter?: import("@backstage/plugin-catalog-react/alpha").EntityPredicate | ((entity: import("@backstage/catalog-model").Entity) => boolean) | undefined;
        };
    }>;
}>;
export default _default;
