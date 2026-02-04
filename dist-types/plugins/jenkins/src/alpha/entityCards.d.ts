/// <reference types="react" />
/**
 * @alpha
 */
export declare const entityLatestJenkinsRunCard: import("@backstage/frontend-plugin-api").OverridableExtensionDefinition<{
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
/**
 * @alpha
 */
export declare const entityJobRunsTable: import("@backstage/frontend-plugin-api").OverridableExtensionDefinition<{
    kind: "entity-card";
    name: "job-runs";
    config: {
        filter: import("@backstage/plugin-catalog-react/alpha").EntityPredicate | undefined;
        type: "summary" | "content" | "info" | undefined;
    };
    configInput: {
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
    params: {
        loader: () => Promise<JSX.Element>;
        filter?: import("@backstage/plugin-catalog-react/alpha").EntityPredicate | ((entity: import("@backstage/catalog-model").Entity) => boolean) | undefined;
        type?: import("@backstage/plugin-catalog-react/alpha").EntityCardType | undefined;
    };
}>;
