import { createImageUrlBuilder } from "@sanity/image-url";

import { proxiedImageUrl } from "@shared/lib/utilities";

import { sanityConfigOf } from "../providers/api-servers";

import type { SanityImageSource, ImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityConfigOf(import.meta.env));


function getImageBuilder(source: SanityImageSource): ImageUrlBuilder {
    return builder.image(source);
}

function buildImageUrl(source: SanityImageSource): string {
    const image = getImageBuilder(source);

    return proxiedImageUrl(image.url());
}

export { buildImageUrl, getImageBuilder };
