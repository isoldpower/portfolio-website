import { AboutBody } from "@entities/site-artwork/about-body";
import { useLocalize } from "@features/localization/localized-value";

import type { AboutPortrait as AboutPortraitData } from "@entities/site-artwork/model";


interface AboutPortraitProps {
    portrait: AboutPortraitData;
}

function AboutPortrait({ portrait }: AboutPortraitProps) {
    const localize = useLocalize();

    return (
        <AboutBody.Portrait
            src={portrait.src}
            srcSet={portrait.srcSet}
            width={portrait.width}
            height={portrait.height}
            alt={localize(portrait.alt)}
        />
    );
}

export { AboutPortrait };
export type { AboutPortraitProps };
