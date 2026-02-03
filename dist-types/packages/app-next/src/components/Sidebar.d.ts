/// <reference types="react" />
export declare const navigationExtension: import("@backstage/frontend-plugin-api").OverridableExtensionDefinition<{
    config: {};
    configInput: {};
    output: import("@backstage/frontend-plugin-api").ExtensionDataRef<import("react").JSX.Element, "core.reactElement", {}>;
    inputs: {
        [x: string]: import("@backstage/frontend-plugin-api").ExtensionInput<import("@backstage/frontend-plugin-api").ExtensionDataRef<unknown, string, {
            optional?: true | undefined;
        }>, {
            singleton: boolean;
            optional: boolean;
        }>;
    };
    params: never;
    kind: undefined;
    name: "nav";
}>;
