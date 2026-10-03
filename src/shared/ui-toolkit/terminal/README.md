# Terminal

Runs real console programs, compiled to WebAssembly, inside a [wterm](https://github.com/vercel-labs/wterm) terminal on the project page.

```
C++ project ──emcc──▶ name.js + name.wasm ──CI──▶ GitHub release
                                                      │
Sanity terminal project (repo, tag, artifact names) ──┤
                                                      ▼
                              same-origin artifact route (COOP/COEP)
                                                      │
StyledTerminal (wterm) ◀── useTerminalAdapter ◀── runtime adapter ◀── program
```

1. [Build the target project](#1-build-the-target-project)
2. [Publish the artifacts](#2-publish-the-artifacts)
3. [Register the project in the CMS](#3-register-the-project-in-the-cms)
4. [Serve the artifacts](#4-serve-the-artifacts)
5. [Render the terminal](#5-render-the-terminal)
6. [How a session runs](#6-how-a-session-runs)
7. [Runtimes](#7-runtimes)
8. [Writing an adapter](#8-writing-an-adapter)
9. [Styling](#9-styling)
10. [Troubleshooting](#10-troubleshooting)

## 1. Build the target project

The program is compiled with Emscripten into an ES module that exports a factory, so the page decides when and how the program starts. `cpp-warships` uses these link options:

```cmake
if (EMSCRIPTEN)
    target_link_options(cpp_warships
            PRIVATE -pthread
            PRIVATE -sPROXY_TO_PTHREAD=1
            PRIVATE -sALLOW_MEMORY_GROWTH=1
            PRIVATE -sEXIT_RUNTIME=1
            PRIVATE -sMODULARIZE=1
            PRIVATE -sEXPORT_ES6=1
            PRIVATE -sEXPORT_NAME=createCppWarships
            PRIVATE -sENVIRONMENT=web,worker
            PRIVATE -sEXPORTED_RUNTIME_METHODS=FS,UTF8ToString,stringToNewUTF8
            PRIVATE -sEXPORTED_FUNCTIONS=_main,_ftxui_on_resize
    )
endif()
```

| Option | Why |
|---|---|
| `MODULARIZE` + `EXPORT_ES6` | The adapter `import()`s the script and calls its default export with its own options. |
| `-pthread` + `PROXY_TO_PTHREAD` | `main` runs on a worker, so a blocking event loop never freezes the page. Requires cross-origin isolation (see [4](#4-serve-the-artifacts)). |
| `ENVIRONMENT=web,worker` | The main script is also the pthread worker script. |
| `EXIT_RUNTIME` | `onExit` fires when `main` returns, so the terminal can say the program finished. |
| `EXPORTED_RUNTIME_METHODS` | `FS` is required by every adapter; add `TTY` for the `ncurses` runtime. |
| `EXPORTED_FUNCTIONS` | `_main`, plus whatever the runtime needs (`_ftxui_on_resize` for FTXUI). |

Build it with the Emscripten toolchain:

```bash
emcmake cmake -B build-wasm -S . -DCMAKE_BUILD_TYPE=Release
cmake --build build-wasm --target cpp_warships
```

The result is two files, `cpp_warships.js` and `cpp_warships.wasm`. To try them locally outside this site, serve them with COOP/COEP headers (`cpp-warships/external/web/serve.py` does that).

## 2. Publish the artifacts

The site never builds programs; it fetches released artifacts. In `cpp-warships`, `.github/workflows/webassembly.yaml`:

1. sets up `emsdk` (`mymindstorm/setup-emsdk`),
2. runs `make webassembly`,
3. writes `SHA256SUMS`,
4. on a `v*` tag, attaches `build-wasm/dist/*` to the GitHub release.

A release is immutable, so a tag pins exactly which build the site runs.

## 3. Register the project in the CMS

A `terminal` project in Sanity names the release to run:

| Field | Example |
|---|---|
| `wasm_repo` | `https://github.com/isoldpower/cpp-warships` |
| `wasm_tag` | `v0.1.0` |
| `js_artifact` | `cpp_warships.js` |
| `wasm_artifact` | `cpp_warships.wasm` |

They reach the page as `TerminalProject.wasmRepo`, `wasmTag`, `jsArtifact` and `wasmArtifact`, and become a `TerminalProgramSource` (`{ jsSource, wasmSource }`).

## 4. Serve the artifacts

A threaded build only starts on a cross-origin isolated page, and that puts hard rules on where the files come from:

- **The page** must be served with `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`. Without them `crossOriginIsolated` is `false`, `SharedArrayBuffer` is missing and the program cannot start.
- **The artifacts must be same-origin.** Emscripten starts its workers with `new Worker(new URL("name.js", import.meta.url))`, and browsers refuse cross-origin worker scripts. GitHub release downloads also lack `Cross-Origin-Resource-Policy`, so a COEP page cannot load them directly.
- **The artifact responses need their own headers:** `Cross-Origin-Embedder-Policy: require-corp` and `Cross-Origin-Resource-Policy: same-origin`. A worker script without COEP is blocked, and Chrome only reports `worker sent an error! undefined:undefined: undefined`.
- **Not from `public/`.** Vite refuses to `import()` files from `public/` in dev.

So the sources must point at a route on this site that downloads the release asset (following GitHub's redirect), caches it by tag, and responds with the headers above, for example `/wasm/<owner>/<repo>/<tag>/<artifact>`. Until that route exists, sources built straight from GitHub URLs will fail to load.

## 5. Render the terminal

Load wterm's stylesheet once (in `app/style/globals.css`):

```css
@import "@wterm/dom/css" layer(components);
```

Then bind a terminal to a runtime adapter:

```tsx
const source = useProjectSources(project);
const terminalBindings = useTerminalAdapter("ftxui", {
    jsSource: source.jsSource,
    wasmSource: source.wasmSource,
});

return (
    <StyledTerminal
        autoResize
        terminalRuntime="ftxui"
        className="h-100"
        {...terminalBindings}
    />
);
```

- `autoResize` fits columns and rows to the element, so give it a height.
- `useTerminalAdapter` returns stable `onReady`, `onData` and `onResize` handlers. Passing `onData` is also what stops wterm from echoing keys itself.
- A custom registry can be passed as the third argument: `useTerminalAdapter(runtime, source, new TerminalAdapterRegistry({ ... }))`.

## 6. How a session runs

1. wterm initialises and calls `onReady(terminal)`.
2. `TerminalAdapterController` resolves the runtime in the registry and calls `adapter.start(terminal, source)`. An unknown runtime throws `UnknownTerminalRuntimeError`, which is printed in the terminal.
3. `EmscriptenSession.start()` `import()`s `jsSource` and calls its factory with:
   - `locateFile`, which points the `.wasm` request at `wasmSource`,
   - `preRun`, where the session wires stdin/stdout (`attach`),
   - `onExit`, which prints that the program finished.
4. Keys typed in wterm go `onData` → `session.input` → `InputQueue`, which the program reads byte by byte.
5. The program writes bytes; the session turns them into `terminal.write` calls (per frame or per animation frame).
6. Size changes go `onResize` → `session.resize` → whatever the runtime uses to learn its size.
7. When the program exits (`onExit`), aborts (`onAbort`) or is interrupted, the session reports `isFinished` and the terminal asks for Enter. Pressing it clears the screen and the controller starts a fresh session on the same terminal; the factory is called again, so the program gets a new runtime (`EXIT_RUNTIME` has already shut the old one's threads down).
8. On unmount the controller calls `session.stop()`. Emscripten has no teardown, so stopping cuts the program off from the terminal; its workers live until the page goes away.

## 7. Runtimes

| Runtime | Input | Output | Resize | Build needs |
|---|---|---|---|---|
| `ftxui` | `FS.init` stdin | bytes until a `\0`, one write per frame; device control strings (`ESC P … ESC \`, e.g. FTXUI's cursor-shape query) are dropped because wterm's built-in core prints them as text | `_ftxui_on_resize(cols, rows)` | `_ftxui_on_resize` in `EXPORTED_FUNCTIONS` |
| `ncurses` | TTY `get_char` | TTY `put_char`, batched per animation frame | answers `TIOCGWINSZ`; the program sees it on its next query | `TTY` in `EXPORTED_RUNTIME_METHODS` |
| `cli` | line editing in the adapter (echo, backspace, Enter, Ctrl+D) | `\n` → `\r\n`, batched per animation frame | ignored | nothing extra; the program must cope with `EAGAIN` on stdin, or be built with Asyncify/JSPI |
| `ratatui` | — | — | — | no adapter yet: Rust TUIs are not Emscripten builds and need their own loader |

`ftxui` is the only runtime tested against a real program (`cpp-warships` v0.1.0).

## 8. Writing an adapter

An adapter is anything with `start(terminal, source)` that returns a session:

```ts
interface TerminalAdapterSession {
    readonly isFinished: boolean;
    input(data: string): void;
    resize(cols: number, rows: number): void;
    stop(): void;
}
```

For Emscripten programs, extend `EmscriptenSession`. It loads the program, owns the `InputQueue`, tracks stop/exit and reports failures; a subclass only wires the streams:

```ts
class MySession extends EmscriptenSession {
    protected override attach(runtime: EmscriptenRuntime): void {
        runtime.FS.init(this.inputQueue.read, this.#writeByte.bind(this), null);
    }

    #writeByte(byte: number | null): void {
        if (byte !== null && !this.isStopped) {
            this.terminal.write(new Uint8Array([byte]));
        }
    }
}

function startMySession(terminal: TerminalSurface, source: TerminalProgramSource): TerminalAdapterSession {
    return new MySession(terminal, source).start();
}

const registry = new TerminalAdapterRegistry({ ftxui: ftxuiAdapter, cli: { start: startMySession } });
```

Override `handleLoaded(program)` to read exports, `flushOutput()` to write buffered output before the program finishes, and `resize`/`stop` when the runtime needs them. Use `OutputBatcher` when the program has no frame marker.

## 9. Styling

wterm is themed entirely with CSS custom properties on `.wterm`:

| Property | Controls |
|---|---|
| `--term-fg`, `--term-bg` | default text and background |
| `--term-cursor`, `--term-selection-bg` | cursor and selection |
| `--term-color-0` … `--term-color-15` | the 16 ANSI colours (0–7 normal, 8–15 bright) |
| `--term-font-family`, `--term-font-size`, `--term-line-height` | font; row height is measured from it |

Set them in a stylesheet, inline, or with Tailwind (`[--term-bg:var(--color-background)]`). Importing the wterm stylesheet into the `components` layer keeps its own `padding`, `border-radius` and `box-shadow` overridable by utilities.

## 10. Troubleshooting

| Symptom | Cause |
|---|---|
| "This page is not cross-origin isolated" | The page lacks COOP/COEP headers. |
| `worker sent an error! undefined:undefined: undefined` | The artifact `.js` was served without `Cross-Origin-Embedder-Policy: require-corp`, or from another origin. |
| `Failed to load url /name.js ... This file is in /public` | Artifacts placed in `public/`; serve them from a route instead. |
| Typed keys appear twice | `onData` was not passed to the terminal, so wterm echoes them. |
| `FTXUI program does not export _ftxui_on_resize` | Add `_ftxui_on_resize` to `EXPORTED_FUNCTIONS`. |
| `ncurses adapter needs the TTY runtime object` | Add `TTY` to `EXPORTED_RUNTIME_METHODS`. |
| `No terminal adapter is registered for runtime "..."` | The runtime has no adapter in the registry in use. |
| FTXUI program goes blank on Ctrl+C | FTXUI leaves its loop and re-raises `SIGINT`; Emscripten's default action calls `_Exit` on the program's thread, which never reaches the page's `onExit`. `FtxuiSession` treats Ctrl+C followed by leaving the alternate screen as an interrupt. The cleaner fix is in the program: `ForceHandleCtrlC(false)` and quit on `Event::CtrlC` via `Exit()`. |
