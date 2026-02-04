/// <reference types="react" />
/**
 * @alpha
 */
export declare const entityJenkinsProjects: import("@backstage/frontend-plugin-api").OverridableExtensionDefinition<{
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
