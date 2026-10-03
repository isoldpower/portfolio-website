type ReadByte = () => number | null | undefined;
type WriteByte = (byte: number | null) => void;

interface EmscriptenTtyOps {
    get_char?: (tty: unknown) => number | null | undefined;
    put_char?: (tty: unknown, byte: number | null) => void;
    fsync?: (tty: unknown) => void;
    ioctl_tiocgwinsz?: (tty: unknown) => [number, number];
}

interface EmscriptenRuntime {
    FS: {
        init(stdin: ReadByte | null, stdout: WriteByte | null, stderr: WriteByte | null): void;
    };
    TTY?: {
        default_tty_ops: EmscriptenTtyOps;
        default_tty1_ops: EmscriptenTtyOps;
    };
}

interface EmscriptenModuleOptions {
    preRun: ((runtime: EmscriptenRuntime) => void)[];
    locateFile: (path: string, prefix: string) => string;
    onExit: (status: number) => void;
    onAbort: (reason: unknown) => void;
}

type EmscriptenProgram = EmscriptenRuntime & Record<string, unknown>;

type EmscriptenFactory = (options: EmscriptenModuleOptions) => Promise<EmscriptenProgram>;

interface EmscriptenModule {
    default: EmscriptenFactory;
}

export type {
    ReadByte,
    WriteByte,
    EmscriptenTtyOps,
    EmscriptenRuntime,
    EmscriptenModuleOptions,
    EmscriptenProgram,
    EmscriptenFactory,
    EmscriptenModule
};
