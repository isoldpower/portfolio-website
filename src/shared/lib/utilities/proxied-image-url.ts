const SANITY_IMAGE_ORIGIN = "https://cdn.sanity.io";
const SANITY_IMAGE_PREFIX = "/images/";
const REMOTE_IMAGE_PREFIX = "/remote-images/";
const REMOTE_IMAGE_HOSTS: ReadonlySet<string> = new Set(["cdn.iconscout.com"]);

function isSanityImage(url: URL): boolean {
    return url.origin === SANITY_IMAGE_ORIGIN && url.pathname.startsWith(SANITY_IMAGE_PREFIX);
}

function isRemoteImageHost(host: string): boolean {
    return REMOTE_IMAGE_HOSTS.has(host);
}

function parseAbsoluteUrl(value: string): URL | null {
    try {
        return new URL(value);
    } catch {
        return null;
    }
}

function proxiedImageUrl(value: string): string {
    const url = parseAbsoluteUrl(value);
    if (url === null) {
        return value;
    }
    if (isSanityImage(url)) {
        return `${url.pathname}${url.search}`;
    }
    if (url.protocol === "https:" && isRemoteImageHost(url.host)) {
        return `${REMOTE_IMAGE_PREFIX}${url.host}${url.pathname}${url.search}`;
    }

    return value;
}

export { SANITY_IMAGE_ORIGIN, isRemoteImageHost, proxiedImageUrl };
