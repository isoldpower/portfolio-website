import { RabbitScene } from "@widgets/site-artwork/rabbit-scene";
import { cn } from "@shared/lib/utilities";

import type { HomePageData } from "@pages/home/types.ts";
import type { ClientLayoutPage } from "@shared/lib/types";


const HomePage: ClientLayoutPage<HomePageData> = ({
    projects,
}) => {
    return (
        <section className="grid grid-cols-12 gap-x-gutter">
            <div className="col-span-12 col-start-1 row-start-1 md:col-span-5" />
            <div
                className={cn(
                    "pointer-events-none relative row-start-1 aspect-[4/5]",
                    "col-span-12 col-start-1 opacity-30",
                    "md:col-span-7 md:col-start-6 md:opacity-100"
                )}
            >
                <RabbitScene />
            </div>
        </section>
    );
}

export { HomePage };
