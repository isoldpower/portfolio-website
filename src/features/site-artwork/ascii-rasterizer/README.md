# ASCII rasterizer

Turns whatever is in the surrounding React Three Fiber scene into glyphs on a separate 2D canvas. The WebGL output is never shown directly: the scene is rendered off-screen at a low resolution, read back to the CPU, and every grid cell becomes one character.

```
R3F scene ──ortho camera──▶ render target (columns·3 × rows·3)
                                   │ readRenderTargetPixels
                                   ▼
                        Uint8Array RGBA pixels
                                   │ 3×3 samples per cell
                                   ▼
                  coverage + luminance per cell
                                   │ thresholds
                                   ▼
             glyph + colour + opacity ──fillText──▶ 2D canvas
```

```tsx
<AsciiRasterizer canvas={asciiCanvasRef} cell={14} glyphs="+$@" />
```

`glyphs` is ordered dark → light, one per shade level. `cell` is the glyph pitch in CSS pixels.

## Layout

| Folder     | Responsibility                                                                  |
|------------|---------------------------------------------------------------------------------|
| `grid/`    | Measures the host element into a cell grid; precomputes per-cell positions and pixel offsets |
| `canvas/`  | Sizes the 2D canvas for the device pixel ratio; tracks whether it is on screen  |
| `palette/` | Builds the glyph font, waits for it to load, reads colour tokens from CSS       |
| `target/`  | Owns the orthographic camera and render target; fits the camera to the scene    |
| `frame/`   | The per-frame loop: throttle → render samples → paint glyphs                    |

## 1. Grid

The canvas parent is observed with a `ResizeObserver`:

```
columns = max(4, ⌊width  / cell⌋)
rows    = max(4, ⌊height / cell⌋)
pixelRatio = min(2, devicePixelRatio)
```

The 2D canvas backing store is `width·pixelRatio × height·pixelRatio` with a matching `setTransform`, so all drawing happens in CSS pixels. The grid is centred, so each cell centre is:

```
originX = (width  − columns·cell) / 2 + cell / 2
x(column) = originX + column·cell        (same for y / rows)
```

## 2. Camera fit

The render target is `columns·S × rows·S` pixels with supersampling `S = 3`. An orthographic camera is fitted to the scene's world bounding box once per target (`isFitted`). A new grid means a new target and a fresh fit.

```
content = bounds.size · (1 + 0.06)          6% margin so the swaying ears never clip
aspect  = columns / rows
viewW   = content.w / content.h > aspect ? content.w : content.h · aspect
viewH   = viewW / aspect
frustum = bounds.center ± (viewW/2, viewH/2)
```

That is "contain" fitting: the tighter axis touches the edge and the other gets padding. Because the frustum has the grid's aspect ratio, every cell samples a square patch of world space.

## 3. Sampling

`gl.readRenderTargetPixels` returns rows bottom-up (GL origin is bottom-left) while the grid is top-down, so the row is flipped when the base offset of each cell is precomputed:

```
sampleWidth = columns · S
offset(row, column) = ((rows − 1 − row) · S · sampleWidth + column · S) · 4
```

The 9 sub-pixel offsets inside a cell are the same for every cell, so they are precomputed once too:

```
sampleOffset(sr, sc) = (sr · sampleWidth + sc) · 4      sr, sc ∈ {0, 1, 2}
```

For each cell, with `αᵢ` and `rᵢ` the alpha and red channels normalised to `[0, 1]`:

```
coverage  C = Σ αᵢ
luminance L = Σ rᵢ · αᵢ
shade     = L / C          alpha-weighted mean brightness of the covered part
filled  f = C / 9          fraction of the cell the model covers
```

Only red is read because the rabbit's material outputs greyscale.

## 4. Glyph selection

```
f < 0.12               → cell skipped (empty)
shade < 0.36           → level 0  (glyphs[0], --color-ascii-shadow)
shade < 0.66           → level 1  (glyphs[1], --color-ascii-mid)
otherwise              → level 2  (glyphs[2], --color-ascii-light)

opacity = min(1, (f − 0.12) / 0.55) ^ 0.9
```

Shade picks the character. Coverage picks how opaque it is, so cells on the silhouette fade in instead of popping. That is a cheap anti-aliasing of the outline. Coverage reaches full opacity at `f ≈ 0.67`, and the `0.9` exponent bends the ramp slightly upward.

## 5. Frame loop

The loop is registered with `useFrame(…, 1)`. In R3F a positive priority takes over the render loop, so the WebGL canvas itself is never drawn. Only the rasterizer renders, and only into its target.

A frame draws when all of these hold:

- the 2D context, grid, target and layout exist;
- the font has loaded and the colours have been read (`palette.isReady`);
- the canvas is intersecting the viewport (`IntersectionObserver`), except for the very first frame, which always draws so the intro can treat the rabbit as ready;
- at least `1/30 s` has passed since the last draw;
- with `prefers-reduced-motion`, nothing has been drawn yet. In that case it draws a single still frame and stops.

Per-frame work allocates no arrays: it is one `forEach` over the precomputed cells and one `reduce` into a single accumulator per cell.
