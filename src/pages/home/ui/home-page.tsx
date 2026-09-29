import { getRouteApi, useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

import { updateCount } from "../api/count.ts";


const routeApi = getRouteApi("/");

function HomePage() {
    const router = useRouter();
    const count = routeApi.useLoaderData();

    const handleIncrement = useCallback(() => {
        updateCount({ data: 1 })
            .then(() => router.invalidate())
            .catch((error: unknown) => {
                console.error("Count Update Error:", error);
            });
    }, [router]);

    return (
        <button type="button" onClick={handleIncrement}>
            Add 1 to {count}?
        </button>
    );
}

export { HomePage };
