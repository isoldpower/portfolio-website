import { BodyText } from "@shared/ui-toolkit/typography";
import { useMemo } from "react";

import type { ProjectPreview } from "@entities/project";
import type { ReactNode } from "react";


interface ProtectEmptyPreviewsProps {
    previews: ProjectPreview[];
    fallback?: ReactNode;
    children: ReactNode;
}

function ProtectEmptyPreviews({
    previews,
    fallback,
    children
}: ProtectEmptyPreviewsProps) {
    const fallbackProtected = useMemo(() => {
        return fallback ?? (
            <BodyText>
                No projects published yet.
            </BodyText>
        );
    }, []);

    return previews.length === 0
        ? fallbackProtected
        : children;
}

export { ProtectEmptyPreviews };
export type { ProtectEmptyPreviewsProps };
