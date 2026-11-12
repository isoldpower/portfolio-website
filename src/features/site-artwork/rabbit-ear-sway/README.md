# Rabbit ear sway

Makes the rabbit's ears wobble. The motion is idle by default and livelier while the pointer moves. The bending happens in a vertex shader. The CPU only drives two angle pairs through damped springs.

```
pointer movement ──▶ energy E ──▶ amplitude, speed
                                      │
              phase φ += 2π·f·speed·dt│
                                      ▼
               target angles (sum of sines)
                                      │ damped spring
                                      ▼
              uniforms earA, earB (vec2 angles)
                                      │
                vertex shader bends ear vertices ──▶ faceted grey shading
```

```tsx
const material = useEarSwayMaterial();

<RabbitModel material={material}>{(model) => <RabbitMesh model={model} />}</RabbitModel>
<EarSway material={material} amountDegrees={9} />
```

The material is created once in the widget and shared. `rabbit-model` applies it to every mesh, and `EarSway` writes its uniforms.

## Layout

| Path                             | Responsibility                                               |
|----------------------------------|--------------------------------------------------------------|
| `shader/ear-bend-shader.ts`      | GLSL: bends the ears, shades faces                           |
| `shader/use-ear-sway-material.ts`| Creates and disposes the `ShaderMaterial`                    |
| `sway/use-pointer-energy.ts`     | Pointer listener; accumulates and decays energy              |
| `sway/use-ear-springs.ts`        | Per-ear phase and spring state; writes uniforms              |
| `sway/use-ear-sway.ts`           | Per-frame orchestration: energy → drive → springs            |

## 1. Shader

The model arrives from `rabbit-model` normalised to a unit bounding sphere centred at the origin, as non-indexed geometry with only `position`. All constants below are in that space.

### Selecting the ears

```glsl
weight = smoothstep(0.3, 0.78, y) · (1 − smoothstep(0.05, 0.32, x))
```

Vertices that are high up (`y > 0.3`) and toward `−x` (`x < 0.32`, where the ears sit on this model) get a weight in `[0, 1]`. The body stays at 0. Inside an ear the weight grows from base to tip, so the tip rotates further than the base and the ear **curves** instead of swinging as a rigid stick.

### Telling the two ears apart

The ears are separated by a vertical plane through `SPLIT_CENTER` with normal `SPLIT_NORMAL` in the `xz` plane:

```glsl
side = smoothstep(−0.06, 0.06, dot(p.xz − SPLIT_CENTER, SPLIT_NORMAL))
```

`side` is 0 on ear A's side and 1 on ear B's, with a soft 0.12-wide band between them so no seam appears where the ears meet.

### Bending

Each ear rotates around its own base pivot (`BASE_A`, `BASE_B`), first in the `xy` plane (sideways sway) and then in `yz` (forward/back tilt):

```
local    = p − base
local.xy = R(angle.x · weight) · local.xy
local.yz = R(angle.y · weight) · local.yz
bent     = local + base

R(θ) = mat2(c, s, −s, c)   (column-major → standard counter-clockwise rotation)
```

The final position blends both candidates: `mix(bendA(p), bendB(p), side)`.

### Shading

The geometry has no normals. The fragment shader rebuilds the face normal from screen-space derivatives of the view-space position:

```glsl
n     = normalize(cross(dFdx(vPosition), dFdy(vPosition)))
light = clamp(n · L, 0, 1) · 0.8 + 0.2           L = normalize(0.75, 0.25, 0.6)
```

That gives flat, per-triangle Lambert shading with a 0.2 ambient floor. The output is grey (`r = g = b = light`), and that is exactly what the ASCII rasterizer reads as luminance.

## 2. Pointer energy

Energy `E ∈ [0, 1]` measures how actively the pointer is moving:

```
on pointermove:  E ← min(1, E + hypot(movementX, movementY) / 600)
every frame:     E ← E · e^(−1.1·dt)
```

About 600 px of travel saturates it. The decay half-life is `ln 2 / 1.1 ≈ 0.63 s`.

## 3. Drive

Each frame, `dt` is clamped to `0.05 s` so a background tab can't make the springs explode. Then:

```
amplitude A = radians(amountDegrees) · (0.3 + 0.7·E)     30% sway when idle, 100% when excited
speed     s = 1 + 2.6·E                                  up to 3.6× faster
```

## 4. Targets

Each ear advances its own phase with its own base frequency `f` (A: 0.55 Hz, B: 0.43 Hz). Ear B starts at a phase offset of 1.3 rad.

```
φ ← φ + 2π · f · s · dt

target.x = A · (0.75·sin(φ + shiftX) + 0.25·sin(2.3φ + shiftY))     sideways
target.y = A · 0.45 · sin(0.7φ + shiftY)                            tilt
```

The frequency ratios (1, 2.3, 0.7) don't divide evenly, and the two ears run at different base frequencies. So the combined motion doesn't visibly repeat.

## 5. Springs

The ears don't follow the targets directly. Each axis is a damped spring, integrated with semi-implicit Euler. The velocity is updated first, so the step stays stable at frame-rate step sizes:

```
v ← (v + k·(target − θ)·dt) · e^(−c·dt)
θ ← θ + v·dt
```

| Ear | stiffness k | damping c | ω = √k        | ζ = c / 2√k |
|-----|-------------|-----------|---------------|-------------|
| A   | 70          | 6.5       | 8.4 rad/s (1.3 Hz) | 0.39   |
| B   | 50          | 5         | 7.1 rad/s (1.1 Hz) | 0.35   |

Both springs are underdamped (`ζ < 1`), so the ears lag behind the targets and overshoot slightly, which reads as floppy. The different `k` and `c` mean the two ears never move in lockstep. The resulting `(θx, θy)` go straight into `earA` / `earB`.

## Disabling

With `prefers-reduced-motion` or `amountDegrees ≤ 0`, the pointer listener is never attached and the frame callback does nothing. The uniforms stay at `(0, 0)`, so the ears rest in their modelled pose.
