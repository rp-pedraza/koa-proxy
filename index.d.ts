import * as Koa from "koa";

declare namespace proxy {
    type RequestOptionFunc = (request: Koa.Request, opts: any) => any;

    interface IndexedObject {
        [key: string]: string;
    }

    type MapFunction = (path: string) => string;
    type MatchFunction = (path: string) => boolean;

    interface Options {
        host?: string;
        encoding?: string | null;
        url?: string;
        map?: IndexedObject | MapFunction;
        match?: RegExp | MatchFunction;
        jar?: boolean;
        suppressRequestHeaders?: string[]; // case-insensitive
        suppressResponseHeaders?: string[]; // case-insensitive
        overrideResponseHeaders?: any;
        requestOptions?: RequestOptionFunc | IndexedObject;
        followRedirect?: boolean;
        yieldNext?: boolean;
    }
}

declare function proxy(options?: proxy.Options): Koa.Middleware;

export = proxy;
