import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

import type { UserConfig } from "vite";


export default defineConfig({
    envPrefix: [ "CLIENT_" ],
    server: {
        port: 3000
    },
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        tanstackStart({
            srcDirectory: "src",
            router: {
                entry: "router.ts",
                routesDirectory: "app/routes",
                generatedRouteTree: "app/routes/routeTree.gen.ts",
            }
        }),
        tailwindcss(),
        nitro({ preset: "node-server" }),
        react()
    ],
} satisfies UserConfig);
