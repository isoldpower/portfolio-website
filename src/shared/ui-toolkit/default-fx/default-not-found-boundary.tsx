import { useRouter, useMatch, rootRouteId } from "@tanstack/react-router";
import { useCallback } from "react";

import { BodyText } from "@shared/ui-toolkit/typography";

import type { PropsWithChildren } from "react";


type NotFoundProps = PropsWithChildren<object>;

export function DefaultNotFoundBoundary({
    children
}: NotFoundProps) {
    const router = useRouter();
    const isRoot = useMatch({
        strict: false,
        select: (state) => state.id === rootRouteId,
    });

    const handleHomeNavigation = useCallback(() => {
        router.navigate({ to: "/" })
            .catch((error: unknown) => {
                console.error("Home Navigation Error:", error);
            });
    }, [router]);

    return (
        <div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
            <BodyText size="lg">
                {children ?? "The page you are looking for doesn't exist"}
            </BodyText>
            {!isRoot && (
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={handleHomeNavigation}
                >
                    Go to Home
                </button>
            )}
        </div>
    );
}
