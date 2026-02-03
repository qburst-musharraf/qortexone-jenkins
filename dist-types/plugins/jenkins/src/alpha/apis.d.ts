/**
 * @alpha
 */
export declare const jenkinsApi: import("@backstage/frontend-plugin-api").OverridableExtensionDefinition<{
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
