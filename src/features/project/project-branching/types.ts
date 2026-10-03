import type { EmbeddedProject, TerminalProject, WebProject } from "@entities/project";
import type { FC, PropsWithChildren } from "react";


type BranchingSchema = {
    "terminal": (project: TerminalProject) => FC<PropsWithChildren>;
    "embedded": (project: EmbeddedProject) => FC<PropsWithChildren>;
    "web": (project: WebProject) => FC<PropsWithChildren>;
};

export type { BranchingSchema };