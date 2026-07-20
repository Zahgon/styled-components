import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, useColorScheme, View } from 'react-native';
import styled, { useMediaQuery } from 'styled-components/native';

type Vec3 = [number, number, number];
type Quat = [number, number, number, number];
type Mat4 = number[];

const PHI = (1 + Math.sqrt(5)) / 2;

function vNorm(v: Vec3): Vec3 {
  const r = Math.hypot(v[0], v[1], v[2]);
  return r > 0 ? [v[0] / r, v[1] / r, v[2] / r] : v;
}
function vSub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function vCross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function vDot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function qMul(a: Quat, b: Quat): Quat {
  return [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
  ];
}
function qNorm(q: Quat): Quat {
    throw new Error("STUB");
}
function qFromAxisAngle(axis: Vec3, rad: number): Quat {
  const half = rad / 2;
  const s = Math.sin(half);
  return [Math.cos(half), axis[0] * s, axis[1] * s, axis[2] * s];
}

// Quaternion → 3×3 rotation (row-major nine-element array).
function qToRot(q: Quat): number[] {
    throw new Error("STUB");
}

// Build column-major Mat4 from row-major 3×3 rotation + translation.
function buildMat4(rot: number[], tx: number, ty: number, tz: number): Mat4 {
  return [
    rot[0],
    rot[3],
    rot[6],
    0,
    rot[1],
    rot[4],
    rot[7],
    0,
    rot[2],
    rot[5],
    rot[8],
    0,
    tx,
    ty,
    tz,
    1,
  ];
}

// Mat4 multiply (column-major), C = A × B.
function mat4Mul(a: Mat4, b: Mat4): Mat4 {
    throw new Error("STUB");
}

// Solid definitions - vertices on unit sphere, faces by vertex index.
function nv(verts: Vec3[]): Vec3[] {
  return verts.map(vNorm);
}

const SOLIDS: { name: string; verts: Vec3[]; faces: number[][] }[] = [
  {
    name: 'tetrahedron',
    verts: nv([
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ]),
    faces: [
      [0, 1, 2],
      [0, 3, 1],
      [0, 2, 3],
      [1, 3, 2],
    ],
  },
  {
    name: 'cube',
    verts: nv([
      [-1, -1, -1],
      [-1, -1, 1],
      [-1, 1, -1],
      [-1, 1, 1],
      [1, -1, -1],
      [1, -1, 1],
      [1, 1, -1],
      [1, 1, 1],
    ]),
    faces: [
      [0, 1, 3, 2],
      [4, 6, 7, 5],
      [0, 4, 5, 1],
      [2, 3, 7, 6],
      [0, 2, 6, 4],
      [1, 5, 7, 3],
    ],
  },
  {
    name: 'octahedron',
    verts: nv([
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ]),
    faces: [
      [0, 2, 4],
      [0, 4, 3],
      [0, 3, 5],
      [0, 5, 2],
      [1, 4, 2],
      [1, 3, 4],
      [1, 5, 3],
      [1, 2, 5],
    ],
  },
  {
    name: 'dodecahedron',
    verts: nv([
      [1, 1, 1],
      [1, 1, -1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, 1, 1],
      [-1, 1, -1],
      [-1, -1, 1],
      [-1, -1, -1],
      [0, 1 / PHI, PHI],
      [0, 1 / PHI, -PHI],
      [0, -1 / PHI, PHI],
      [0, -1 / PHI, -PHI],
      [1 / PHI, PHI, 0],
      [1 / PHI, -PHI, 0],
      [-1 / PHI, PHI, 0],
      [-1 / PHI, -PHI, 0],
      [PHI, 0, 1 / PHI],
      [PHI, 0, -1 / PHI],
      [-PHI, 0, 1 / PHI],
      [-PHI, 0, -1 / PHI],
    ]),
    faces: [
      [0, 8, 4, 14, 12],
      [0, 12, 1, 17, 16],
      [0, 16, 2, 10, 8],
      [3, 11, 7, 15, 13],
      [3, 13, 2, 16, 17],
      [3, 17, 1, 9, 11],
      [4, 8, 10, 6, 18],
      [4, 18, 19, 5, 14],
      [5, 19, 7, 11, 9],
      [1, 12, 14, 5, 9],
      [2, 13, 15, 6, 10],
      [6, 15, 7, 19, 18],
    ],
  },
  {
    name: 'icosahedron',
    verts: nv([
      [-1, PHI, 0],
      [1, PHI, 0],
      [-1, -PHI, 0],
      [1, -PHI, 0],
      [0, -1, PHI],
      [0, 1, PHI],
      [0, -1, -PHI],
      [0, 1, -PHI],
      [PHI, 0, -1],
      [PHI, 0, 1],
      [-PHI, 0, -1],
      [-PHI, 0, 1],
    ]),
    faces: [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1],
    ],
  },
];

type FaceData = {
  vertCount: 3 | 4 | 5;
  /** Face center on unit sphere (used for translation × SOLID_RADIUS). */
  center: Vec3;
  /** Row-major 3×3: face local plane (u, v, n) → world. */
  basis: number[];
};

function computeFaces(verts: Vec3[], faces: number[][]): FaceData[] {
  return faces.map(f => {
      throw new Error("STUB");
  });
}

const ALL_FACES = SOLIDS.map(s => { throw new Error("STUB"); });

// Per-solid edge length on the unit sphere. All faces of a Platonic solid are
// congruent, so one sample (vertex 0 → vertex 1 of face 0) suffices.
const SOLID_SIDE: number[] = SOLIDS.map(s => {
    throw new Error("STUB");
});

// One scale factor per solid maps unit-sphere coordinates to pixels. Used for
// BOTH the matrix translations (face center × r) AND the rendered polygon
// edge length (sideLength × r). Sharing the factor is what makes adjacent
// face edges actually meet - they're both at the same 3D position and they
// both render with the same length, so the seams align.
const SOLID_RADIUS_PX = 65;

const ALL_LOCAL_MATS: Mat4[][] = ALL_FACES.map(faces =>
  { throw new Error("STUB"); }
);

// ---------------------------------------------------------------------------
// Render: face shapes
// ---------------------------------------------------------------------------

// Stage diameter sized just above the rotating polyhedron's bounding sphere
// (= 2 × SOLID_RADIUS_PX). Generous extra padding wastes vertical space
// and shows up as a phantom gap before the heading text below.
const STAGE_SIZE = SOLID_RADIUS_PX * 2 + 16;

const Stage = styled.View`
  width: ${STAGE_SIZE}px;
  height: ${STAGE_SIZE}px;
  align-items: center;
  justify-content: center;
  overflow: visible;
  perspective: 1200px;
  /* The faces must blend against EACH OTHER, not the page background
     (soft-light over the pale page washes the solid to pastel), so the
     blend group is scoped here. It cannot sit on SceneOrigin: isolation
     is a grouping value (CSS Transforms 2) and would force that node's
     preserve-3d to compute to flat, collapsing the 3D face placement on
     web. No filter here either: a mounted gated filter function (e.g.
     saturate) disables descendant mix-blend-mode compositing entirely on
     iOS at RN 0.85's default release level, flattening every face
     opaque. */
  isolation: isolate;
  /* Cursor + selection guards stay scoped to mouse / trackpad inputs so
     iOS / Android touch surfaces don't try to compile a :active bucket
     on a non-Pressable View (which can drop the static rule and collapse
     Stage's explicit width / height). */
  @media (hover: hover) and (pointer: fine) {
    cursor: grab;
    user-select: none;
    &:active {
      cursor: grabbing;
    }
  }
`;

// Stage flex-centers SceneOrigin to (STAGE/2, STAGE/2). FaceWrappers are
// absolute children so their (0, 0) is the scene center.
const SceneOrigin = styled.View`
  width: 0;
  height: 0;
  /* z-index: auto escapes rn-web's default View stacking context so
     descendant mix-blend-mode reaches the scene backdrop. No isolation
     here: it would force preserve-3d to flat (grouping value). */
  z-index: auto;
  transform-style: preserve-3d;
`;

// mix-blend-mode lands here (not on the inner shape) because rn-web's
// View baseline forces `position: relative; z-index: 0`, which gives
// every styled.View its own stacking context. A blend on the inner
// shape would composite only against that wrapper's own content (just
// itself), never sibling faces. Placing it on FaceWrapper lets each
// face's full composited output blend against the scene backdrop,
// which carries the already-blended pixels of every earlier sibling.
const FaceWrapper = styled.View`
  position: absolute;
  width: 0;
  height: 0;
  align-items: center;
  justify-content: center;
  z-index: auto;
  transform-style: preserve-3d;
  backface-visibility: visible;
  mix-blend-mode: soft-light;
`;

// Overshoot each face by 1.5% so adjacent faces overlap fractionally
// at their shared edges; CSS 3D matrix composition snaps pixel-aligned
// edges with subpixel float drift, leaving hairline gaps where two
// faces meet exactly. The overlap is symmetric (FaceWrapper centers
// the shape on the origin) so the geometric edge stays in place.
const EDGE_OVERLAP = 1.006;

// Square face (cube only) - solid color block. No border: the 3D arrangement
// already separates faces by their distinct colors, and a 1px ink border
// would z-fight with neighboring faces along shared cube edges.
const SquareFace = styled.View<{ $color: string; $size: number }>`
  width: ${p => { throw new Error("STUB"); }}px;
  height: ${p => { throw new Error("STUB"); }}px;
  background-color: ${p => { throw new Error("STUB"); }};
`;

/**
 * Equilateral triangle via the CSS triangle border trick. The View has zero
 * intrinsic size; its three transparent borders define the triangle shape.
 * Pointing-up by default (apex at top); we wrap and recenter so the visual
 * centroid (not the bounding box) sits at the wrapper origin.
 */
const TriangleShape = styled.View<{ $color: string; $size: number }>`
  width: 0;
  height: 0;
  border-left-width: ${p => { throw new Error("STUB"); }}px;
  border-right-width: ${p => { throw new Error("STUB"); }}px;
  border-bottom-width: ${p => { throw new Error("STUB"); }}px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: ${p => { throw new Error("STUB"); }};
`;

function TriangleFace({ size, color }: { size: number; color: string }) {
    throw new Error("STUB");
}

/**
 * Regular pentagon as 5 isoceles triangles fanning from the center. Each
 * slice subtends 72° with its apex at the pentagon center.
 *
 * `size` is the pentagon's edge length (the side it shares with adjacent
 * pentagons in 3D). For an isoceles slice with that base, height (apothem)
 * is `size · cot(π/5) / 2`. Slice border-box width = `size`, height = apothem.
 *
 * The slight 1.01 scale on each slice closes hairline seams along the
 * diagonals where subpixel antialiasing would otherwise leave faint cracks.
 *
 * All slice styles are inline rather than styled-component interpolations:
 * the geometry and per-slice color all change per render, so styled-component
 * compile gives no cache benefit here.
 */
function PentagonFace({ size, color }: { size: number; color: string }) {
    throw new Error("STUB");
}

function FaceShape({
  vertCount,
  size,
  color,
}: {
  vertCount: 3 | 4 | 5;
  size: number;
  color: string;
}) {
    throw new Error("STUB");
}

// ---------------------------------------------------------------------------
// Color palette - sRGB cusp colors (Ottosson max-saturation per hue) run
// through qlab's `harmonize` optimizer (medium drift tolerance, ΔE target
// 8.0). The cusp seeds give max chroma per hue; harmonize then trims a
// few percent off the saturation peaks to spread perceptual distance more
// evenly, smoothing the transitions at near-similar hues like adjacent
// oranges/ambers without sacrificing the vivid character.
//
// Anchored at h=28° (matches the website logo's first hue). Pentagon slices
// render via inline `style` so static hex is required.
// ---------------------------------------------------------------------------

const PALETTE_STEPS = 20;

export const RING_PALETTE: string[] = [
  '#F52728', // h=28   red
  '#F7742A', // h=46   orange
  '#F59B35', // h=64   amber-orange
  '#F8BC3F', // h=82   amber
  '#F7E23E', // h=102  yellow
  '#DFFB3B', // h=118  chartreuse
  '#80F92D', // h=136  green
  '#38FA8B', // h=152  mint
  '#44FBCC', // h=171  cyan-mint
  '#34FBF3', // h=190  cyan
  '#2FE3F7', // h=207  light blue
  '#35C5F5', // h=225  sky
  '#2BA4F2', // h=243  blue
  '#175DF8', // h=263  pure blue
  '#4A00F6', // h=278  violet
  '#8A22F5', // h=298  purple
  '#C61CF5', // h=317  magenta
  '#F930E0', // h=334  pink-magenta
  '#F927A2', // h=352  hot pink
  '#F62569', // h=10   rose
];

/**
 * Per-solid palette indices, ordered by face-normal azimuth (sampling axis
 * rotated −45° around Y, like the website). Faces pointing in similar
 * directions get adjacent ring positions, so the colored solid reads as
 * a smooth gradient rather than a random scatter.
 */
function paletteAssignmentForFaces(faces: FaceData[]): number[] {
    throw new Error("STUB");
}

const SOLID_PALETTE_IDX: number[][] = ALL_FACES.map(paletteAssignmentForFaces);

// ---------------------------------------------------------------------------
// Component - hero variant. Auto-cycles through all 5 solids while idle,
// drag-to-rotate, no surrounding chrome. Lives at the top of the catalog
// as the brand mark, not as a widget.
// ---------------------------------------------------------------------------

// Idle angular velocity, expressed as pixel-equivalent (dx, dy) so it composes
// with pointer-derived velocity from drag. After a fling, current velocity
// blends toward this idle target so the logo settles back into its rest spin.
// Idle tumble: clockwise (viewed from above, the front face slides left
// while a new face cycles in from the right) with a gentle upward tilt.
// dx is negative because the drag-direction fix negates dx when building
// the Y rotation, so a positive idle-rightward velocity would actually
// turn the cube counter-clockwise. Storing the idle as negative-dx keeps
// the visible behavior matching the comment.
const IDLE_VEL = { dx: -1.0, dy: -0.4 };
const FLING_SENSITIVITY = 0.01; // pixels → radians factor
// Reference per-frame blend assumed to fire at 60fps; the tick scales it by
// `dt * 60` so the per-second decay is preserved on 120Hz displays (web,
// ProMotion iPhones, etc.).
const VELOCITY_BLEND_RATE = 0.04;
const INITIAL_TILT: Quat = qMul(qFromAxisAngle([1, 0, 0], -0.4), qFromAxisAngle([0, 1, 0], 0.5));
const SOLID_CYCLE_MS = 10000;
// Total collapse-and-expand duration. Faces shrink to origin then expand
// back out; the "from" solid renders before peak, the "to" solid after.
// The swap happens at peak (collapseT=1, fully invisible).
const TRANSITION_MS = 700;

// Persist the user-controllable parts of the logo: which solid is showing
// and whether the auto-cycle is paused. Orientation is intentionally NOT
// persisted - the idle spin would consume it within a frame anyway, and
// JSON-serialized quaternions don't round-trip exactly.
const STORAGE_KEY = 'sc-showcase:logo';
const DEFAULT_SOLID_IDX = 4; // icosahedron - visually richest at rest
type PersistedLogoState = { paused: boolean; solidIdx: number };

function parsePersistedState(raw: string | null): Partial<PersistedLogoState> {
    throw new Error("STUB");
}

type TransitionState = {
  startTime: number;
  fromSolid: number;
  toSolid: number;
  /** Orientation captured at transition start; held constant through the
   *  entire collapse → expand sequence. Idle spin resumes after the
   *  transition finishes. Without this, the new solid emerges ~25° off
   *  from where the old one disappeared and the expand reads as a
   *  different motion than the collapse. */
  freezeQuat: Quat;
};

// Asymmetric collapse-expand easing. Collapse takes the first 35% of the
// transition (snappy), expand takes the remaining 65% (softer reveal). The
// "to" solid takes over at t=0.35, which is also the curve's peak - the
// moment of full invisibility. Returns collapseT (0..1, scale = 1 - collapseT).
const SWAP_AT = 0.35;
function collapseEase(t: number): number {
    throw new Error("STUB");
}

/** Build a face's local matrix scaled and translated by `s` (1 = full
 *  position, 0 = collapsed to origin with zero size). Used by the collapse-
 *  expand animation to interpolate between resting and collapsed states. */
function buildScaledLocalMat(face: FaceData, s: number): Mat4 {
    throw new Error("STUB");
}

// ---------------------------------------------------------------------------
// Controls - small playback chrome above the stage. Four discrete buttons
// (prev / pause / play / next) so each affordance is unambiguous; the
// non-active member of pause↔play renders dimmed but stays clickable for
// idempotent affordance ("press the icon you want to be in").
//
// Glyphs come from Feather via @expo/vector-icons - clean monoline set
// that matches the showcase's restrained type. Hand-rolled View borders
// would render quirkily at sub-16px sizes under rn-web's flex layout, and
// emoji are too platform-skewed (color, baseline, scaling) to use as UI
// chrome.
// ---------------------------------------------------------------------------

const ICON_SIZE = 14;

const HeroColumn = styled.View`
  align-items: center;
  gap: 6px;
`;

const CONTROLS_HIDE_MS = 3000;

const Controls = styled.View<{ $visible: boolean }>`
  flex-direction: row;
  gap: 4px;
  opacity: ${p => { throw new Error("STUB"); }};
  pointer-events: ${p => { throw new Error("STUB"); }};
  transition: opacity 240ms ease-out;
  /* Web-only: keep controls visible while the user hovers the logo's
     column. The :hover rule on the column class only fires on web; on
     native the prop-driven opacity carries the state from touch and
     button interactions. */
  ${HeroColumn}:hover & {
    opacity: 0.75;
    pointer-events: auto;
  }
`;

const CtrlBtn = styled.Pressable<{ $dim?: boolean }>`
  width: 28px;
  height: 22px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${p => { throw new Error("STUB"); }};
  transition: opacity 120ms ease-out;

  &:hover {
    opacity: ${p => { throw new Error("STUB"); }};
  }

  &:active {
    opacity: ${p => { throw new Error("STUB"); }};
  }
`;

export function PlatonicLogo() {
    throw new Error("STUB");
}
