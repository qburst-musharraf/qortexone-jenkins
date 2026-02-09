/// <reference types="react" />
import * as _backstage_catalog_model from '@backstage/catalog-model';
import * as react from 'react';
import * as _backstage_plugin_catalog_react_alpha from '@backstage/plugin-catalog-react/alpha';
import * as _backstage_frontend_plugin_api from '@backstage/frontend-plugin-api';

/**
 * @alpha
 */
declare const _default: _backstage_frontend_plugin_api.OverridableFrontendPlugin<{
    entityContent: _backstage_frontend_plugin_api.RouteRef<undefined>;
}, {}, {
    "api:jenkins/jenkins": _backstage_frontend_plugin_api.OverridableExtensionDefinition<{
        kind: "api";
        name: "jenkins";
        config: {};
        configInput: {};
        output: _backstage_frontend_plugin_api.ExtensionDataRef<_backstage_frontend_plugin_api.AnyApiFactory, "core.api.factory", {}>;
        inputs: {};
        params: <TApi, TImpl extends TApi, TDeps extends {
            [x: string]: unknown;
        }>(params: _backstage_frontend_plugin_api.ApiFactory<TApi, TImpl, TDeps>) => _backstage_frontend_plugin_api.ExtensionBlueprintParams<_backstage_frontend_plugin_api.AnyApiFactory>;
    }>;
    "entity-card:jenkins/latest-run": _backstage_frontend_plugin_api.OverridableExtensionDefinition<{
        config: {
            branch: string;
            variant: "flex" | "fullHeight" | "gridItem" | undefined;
            filter: _backstage_plugin_catalog_react_alpha.EntityPredicate | undefined;
            type: "summary" | "content" | "info" | undefined;
        };
        configInput: {
            branch?: string | undefined;
            variant?: "flex" | "fullHeight" | "gridItem" | undefined;
            filter?: _backstage_plugin_catalog_react_alpha.EntityPredicate | undefined;
            type?: "summary" | "content" | "info" | undefined;
        };
        output: _backstage_frontend_plugin_api.ExtensionDataRef<react.JSX.Element, "core.reactElement", {}> | _backstage_frontend_plugin_api.ExtensionDataRef<(entity: _backstage_catalog_model.Entity) => boolean, "catalog.entity-filter-function", {
            optional: true;
        }> | _backstage_frontend_plugin_api.ExtensionDataRef<string, "catalog.entity-filter-expression", {
            optional: true;
        }> | _backstage_frontend_plugin_api.ExtensionDataRef<_backstage_plugin_catalog_react_alpha.EntityCardType, "catalog.entity-card-type", {
            optional: true;
        }>;
        inputs: {};
        kind: "entity-card";
        name: "latest-run";
        params: {
            loader: () => Promise<JSX.Element>;
            filter?: _backstage_plugin_catalog_react_alpha.EntityPredicate | ((entity: _backstage_catalog_model.Entity) => boolean) | undefined;
            type?: _backstage_plugin_catalog_react_alpha.EntityCardType | undefined;
        };
    }>;
    "entity-content:jenkins/projects": _backstage_frontend_plugin_api.OverridableExtensionDefinition<{
        kind: "entity-content";
        name: "projects";
        config: {
            path: string | undefined;
            title: string | undefined;
            filter: _backstage_plugin_catalog_react_alpha.EntityPredicate | undefined;
            group: string | false | undefined;
        };
        configInput: {
            filter?: _backstage_plugin_catalog_react_alpha.EntityPredicate | undefined;
            title?: string | undefined;
            path?: string | undefined;
            group?: string | false | undefined;
        };
        output: _backstage_frontend_plugin_api.ExtensionDataRef<react.JSX.Element, "core.reactElement", {}> | _backstage_frontend_plugin_api.ExtensionDataRef<string, "core.routing.path", {}> | _backstage_frontend_plugin_api.ExtensionDataRef<_backstage_frontend_plugin_api.RouteRef<_backstage_frontend_plugin_api.AnyRouteRefParams>, "core.routing.ref", {
            optional: true;
        }> | _backstage_frontend_plugin_api.ExtensionDataRef<(entity: _backstage_catalog_model.Entity) => boolean, "catalog.entity-filter-function", {
            optional: true;
        }> | _backstage_frontend_plugin_api.ExtensionDataRef<string, "catalog.entity-filter-expression", {
            optional: true;
        }> | _backstage_frontend_plugin_api.ExtensionDataRef<string, "catalog.entity-content-title", {}> | _backstage_frontend_plugin_api.ExtensionDataRef<string, "catalog.entity-content-group", {
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
            routeRef?: _backstage_frontend_plugin_api.RouteRef<_backstage_frontend_plugin_api.AnyRouteRefParams> | undefined;
            filter?: _backstage_plugin_catalog_react_alpha.EntityPredicate | ((entity: _backstage_catalog_model.Entity) => boolean) | undefined;
        };
    }>;
}>;

export { _default as default };
