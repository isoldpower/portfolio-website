import { proxiedImageUrl } from "@shared/lib/utilities";

import type { AboutPortraitDto, AboutProfileDto, AboutVariableDto } from "./types.ts";
import type { AboutPortrait, AboutProfile, AboutVariable } from "@entities/site-artwork/model";


const PORTRAIT_WIDTHS = [320, 640, 960] as const;
const PORTRAIT_DEFAULT_WIDTH = 640;

function portraitUrl(url: string, width: number): string {
    return proxiedImageUrl(`${url}?w=${width}&auto=format`);
}

function mapPortrait(dto: AboutPortraitDto | null): AboutPortrait | null {
    if (!dto?.asset) {
        return null;
    }

    const { url, width, height } = dto.asset;

    return {
        src: portraitUrl(url, PORTRAIT_DEFAULT_WIDTH),
        srcSet: PORTRAIT_WIDTHS
            .map((size) => `${portraitUrl(url, size)} ${size}w`)
            .join(", "),
        width,
        height,
        alt: dto.alt ?? {},
    };
}

function mapVariable(dto: AboutVariableDto): AboutVariable {
    return {
        key: dto._key,
        type: dto.type,
        name: dto.name,
        value: dto.value ?? {},
    };
}

function mapAboutProfile(dto: AboutProfileDto): AboutProfile {
    return {
        portrait: mapPortrait(dto.portrait),
        description: dto.description ?? {},
        variables: (dto.variables ?? []).map(mapVariable),
        note: dto.note ?? {},
    };
}

export { mapAboutProfile };
