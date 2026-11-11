import type { ExperienceKind } from "@entities/site-artwork/model";


const GROUP_COMMANDS: Record<ExperienceKind, string> = {
    work: "_t(experience.commands.work)",
    education: "_t(experience.commands.education)",
};

export { GROUP_COMMANDS };
