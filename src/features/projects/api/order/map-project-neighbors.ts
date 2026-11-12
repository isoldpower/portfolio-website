import type { ProjectOrderDto } from "./list-project-order.ts";
import type { ProjectLink, ProjectNeighbors } from "@entities/projects/model";


const NO_NEIGHBORS: ProjectNeighbors = { previous: null, next: null };

const mapProjectNeighbors = (
    order: readonly ProjectOrderDto[],
    slug: string
): ProjectNeighbors => {
    const index = order.findIndex((entry) => entry.slug === slug);
    if (index === -1 || order.length < 2) {
        return NO_NEIGHBORS;
    }

    const linkAt = (position: number): ProjectLink => {
        const entry = order[(position + order.length) % order.length];
        return { slug: entry.slug, title: entry.title };
    };

    return {
        previous: linkAt(index - 1),
        next: linkAt(index + 1)
    };
};

export { mapProjectNeighbors };
