import type { RegisteredRouter, RouteById, RouteIds } from "@tanstack/react-router";
import type { FC } from "react";


type RouteTree = RegisteredRouter["routeTree"];

type PageRouteId = RouteIds<RouteTree>;

type PageRouteTypes<TRouteId extends PageRouteId> = RouteById<RouteTree, TRouteId>["types"];

type PageLoaderData<TRouteId extends PageRouteId> = PageRouteTypes<TRouteId>["loaderData"] & object;

interface PageAdditionalProps<TRouteId extends PageRouteId = PageRouteId> {
    params: PageRouteTypes<TRouteId>["allParams"];
    search: PageRouteTypes<TRouteId>["fullSearchSchema"];
    loaderDeps: PageRouteTypes<TRouteId>["loaderDeps"];
    context: PageRouteTypes<TRouteId>["allContext"];
}

type ClientLayoutPageProps<
    TData extends object,
    TRouteId extends PageRouteId = PageRouteId
> = TData & {
    additionalProps: PageAdditionalProps<TRouteId>;
}

type ClientLayoutPage<
    TData extends object,
    TRouteId extends PageRouteId = PageRouteId
> = FC<ClientLayoutPageProps<TData, TRouteId>>;

export type {
    PageRouteId,
    PageLoaderData,
    PageAdditionalProps,
    ClientLayoutPageProps,
    ClientLayoutPage
};
