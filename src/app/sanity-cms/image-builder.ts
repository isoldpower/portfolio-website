import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityClient } from "./client.ts";

import type { SanityImageSource, ImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);


function getImageBuilder(source: SanityImageSource): ImageUrlBuilder {
    return builder.image(source);
}

function buildImageUrl(source: SanityImageSource): string {
    const image = getImageBuilder(source);

    return image.url();
}

export { buildImageUrl, getImageBuilder };
