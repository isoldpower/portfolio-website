import type {
    EmscriptenModule,
    EmscriptenModuleOptions,
    EmscriptenProgram
} from "../model/emscripten-types.ts";
import type { TerminalProgramSource } from "../model/types.ts";


type EmscriptenLoadOptions = Omit<EmscriptenModuleOptions, "locateFile">;

function locateArtifact(source: TerminalProgramSource, path: string, prefix: string): string {
    return path.endsWith(".wasm") ? source.wasmSource : prefix + path;
}

async function loadEmscriptenProgram(
    source: TerminalProgramSource,
    options: EmscriptenLoadOptions
): Promise<EmscriptenProgram> {
    const module = await import(/* @vite-ignore */ source.jsSource) as EmscriptenModule;

    return module.default({
        ...options,
        locateFile: locateArtifact.bind(null, source),
    });
}

export { loadEmscriptenProgram };
