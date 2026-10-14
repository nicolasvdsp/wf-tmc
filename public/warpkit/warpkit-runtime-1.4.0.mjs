var fd = Object.defineProperty;
var jn = (e) => {
  throw TypeError(e);
};
var gd = (e, t, s) => t in e ? fd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var zt = (e, t, s) => gd(e, typeof t != "symbol" ? t + "" : t, s), Da = (e, t, s) => t.has(e) || jn("Cannot " + s);
var ue = (e, t, s) => (Da(e, t, "read from private field"), s ? s.call(e) : t.get(e)), rt = (e, t, s) => t.has(e) ? jn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), ze = (e, t, s, o) => (Da(e, t, "write to private field"), o ? o.call(e, s) : t.set(e, s), s), Ze = (e, t, s) => (Da(e, t, "access private method"), s);
import * as p from "three/webgpu";
import { Scene as bd, BoxGeometry as yd, MeshStandardMaterial as $n, BackSide as wd, PointLight as vd, Mesh as Os, InstancedMesh as xd, Object3D as Md, MeshBasicMaterial as kd, REVISION as Sd, WebGPURenderer as Pd, MeshBasicNodeMaterial as Nn } from "three/webgpu";
import { uniform as r, vec2 as E, length as Pe, atan as Ut, sin as Ae, cos as Ve, mix as $, clamp as fe, fract as Se, max as ne, float as b, vec4 as ie, floor as Ue, mod as tc, texture as nt, vec3 as te, step as pe, uint as Ct, Fn as st, Loop as os, min as ve, smoothstep as Me, sqrt as sc, dot as Re, abs as we, exp as Rt, uv as vs, mx_noise_float as De, positionLocal as So, normalLocal as Qo, normalize as ws, transformNormalToView as Ad, normalView as Td, positionView as Cd, mx_fractal_noise_float as Bt, mx_worley_noise_float as oc, select as Ht, sign as Id, If as ys, pow as $e, cross as Ed, log2 as ac, fwidth as xs, uniformArray as co, round as Fd, asin as Ld, int as Ha, log as Rd } from "three/tsl";
import { mergeGeometries as Ks, mergeVertices as Dd } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry as Bn } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { GLTFLoader as nc } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader as Hd } from "three/examples/jsm/loaders/DRACOLoader.js";
import { TessellateModifier as Od } from "three/examples/jsm/modifiers/TessellateModifier.js";
import "three/examples/jsm/loaders/SVGLoader.js";
function Bd(...e) {
  const t = e.length;
  return e.map((s, o) => ({
    color: s,
    pos: t === 1 ? 0 : Math.round(o / (t - 1) * 100)
  }));
}
const et = (e, ...t) => ({
  type: "linear",
  angle: e,
  stops: Bd(...t)
}), Es = (e, ...t) => ({
  type: "linear",
  angle: e,
  stops: t.map(([s, o]) => ({ color: o, pos: s }))
}), rc = [
  { name: "Dusk", value: et(90, "#0F2027", "#203A43", "#2C5364") },
  { name: "Midnight", value: et(90, "#141E30", "#243B55") },
  { name: "Ember", value: et(90, "#F12711", "#F5AF19") },
  { name: "Mango", value: et(90, "#FFE259", "#FFA751") },
  { name: "Sunset", value: et(90, "#FF512F", "#DD2476") },
  { name: "Flamingo", value: et(90, "#F093FB", "#F5576C") },
  { name: "Coral", value: et(90, "#FF9A9E", "#FECFEF") },
  { name: "Grape", value: et(90, "#7F00FF", "#E100FF") },
  { name: "Indigo", value: et(90, "#4776E6", "#8E54E9") },
  { name: "Candy", value: et(90, "#FC466B", "#3F5EFB") },
  { name: "Ocean", value: et(90, "#2E3192", "#1BFFFF") },
  { name: "Neon", value: et(90, "#00F260", "#0575E6") },
  { name: "Aurora", value: et(90, "#00C9FF", "#92FE9D") },
  { name: "Mint", value: et(90, "#43E97B", "#38F9D7") },
  { name: "Lush", value: et(90, "#56AB2F", "#A8E063") },
  { name: "Solar", value: et(90, "#F83600", "#F9D423") },
  { name: "Violet Dawn", value: et(90, "#654EA3", "#EAAFC8") },
  { name: "Spectrum", value: et(90, "#DDD623", "#367C41", "#2B50D7", "#A966FF") },
  { name: "Steel", value: et(90, "#BDC3C7", "#2C3E50") },
  { name: "Mono", value: et(90, "#000000", "#FFFFFF") },
  // ── Drawn from print, not from the web ──────────────────────────────────
  //
  // Everything above is a two-stop screen gradient of the kind the last decade
  // produced by the thousand: one hue easing into its neighbour, nothing in the
  // middle to look at. These are lifted from designers and processes that had to
  // survive ink, so they behave differently — three, four, six hues that are not
  // adjacent on the wheel, meeting hard enough to make a third colour at the
  // seam. They are the ones to reach for when a gradient is the artwork rather
  // than the backdrop, and they go *after* the set above so `DEFAULT_GRADIENT`
  // (index 0, Dusk) is unchanged and no existing scene moves.
  {
    // Mitsuo Katsui — the postwar Japanese spectrum. The pale blue at 12.5 is
    // the whole trick: it interrupts a spectral sweep early, so the run reads
    // as deliberate rather than as a colour wheel.
    //
    // Angle 90 like every other preset, not the 260 of the scene this came
    // from, because `applyPreset` copies stops and leaves the angle alone
    // (GradientControl.vue) — a palette must not rotate a gradient you have
    // already aimed. 260 is worth knowing and is not this file's to set.
    name: "Katsui",
    value: Es(
      90,
      [0, "#e85a9a"],
      [12.5, "#8ec6de"],
      [25, "#52a371"],
      [50, "#305cc5"],
      [75, "#fbde1c"],
      [100, "#f7a558"]
    )
  },
  {
    // Itten's primaries — the palette the school actually printed with, not the
    // pastel it gets remembered as.
    //
    // Black sits *between* the yellow and the blue rather than at the end,
    // because those two are the pair that mixes worst: interpolated in sRGB
    // they pass through a dead grey-lavender that looks like a mistake. Black
    // in the gap turns that stretch into a gutter, which is what a poster of
    // this kind does with it anyway.
    name: "Bauhaus",
    value: et(90, "#E63329", "#FDC300", "#111111", "#1D4E9F")
  },
  {
    // Risograph drum inks. They are spot colours, so they never blend on paper;
    // put them in a gradient and the mixtures are the part you don't get in
    // print.
    name: "Riso Inks",
    value: et(90, "#FF48B0", "#FFE800", "#00A95C", "#0078BF")
  },
  {
    // Tadanori Yokoo — hot red through gold, dropped into an indigo that stops
    // the whole thing dead.
    name: "Yokoo",
    value: et(90, "#E5002D", "#F26522", "#F5C400", "#7B1E3A", "#1B1464")
  },
  {
    // Prussian blue woodblock, sand and coral. The one quiet entry here — worth
    // keeping for the scene where everything else on the canvas is shouting.
    name: "Hokusai",
    value: et(90, "#1B3A6B", "#2E6FA7", "#8FB8D8", "#E8D9B5", "#C46B4B")
  },
  // ── Material ramps ────────────────────────────────────────────────────────
  //
  // Every preset above is meant to be *seen* — laid flat behind artwork, read
  // as a colour. These are meant to be *shaded*: put one under a Glass or
  // Mirror Shape, or fold it with Smudge, and the ramp stops being a backdrop
  // and becomes the light the material reflects and refracts.
  //
  // That job makes them look wrong in the swatch grid, and it is deliberate.
  // They repeat (Platinum crosses white three times), they hold near-black for
  // long runs, and their stops are bunched rather than evenly spaced — because
  // a metal reads as metal from the *rate* light changes across it, not from
  // its hue. A smooth two-stop sweep refracts into a smooth two-stop sweep and
  // looks like plastic. A hard light-to-dark reversal every quarter-turn is
  // what makes a highlight snap, and a spread of them is what makes a caustic.
  {
    // The chrome ramp: white → pale steel → near-black, three times over, with
    // a cool cast in the mid-tones because polished metal is never neutral. The
    // reversals at 28 and 80 are the specular breaks.
    name: "Platinum",
    value: Es(
      105,
      [0, "#FFFFFF"],
      [14, "#C8D2DC"],
      [28, "#1C2028"],
      [40, "#9AA6B4"],
      [52, "#FFFFFF"],
      [66, "#67717F"],
      [80, "#191D24"],
      [100, "#EEF3F9"]
    )
  },
  {
    // A full spectral run with no black in it, so a glass surface over it never
    // goes dead — every refracted direction lands on a colour. Magenta is given
    // the most room because it is the one hue the others all read against.
    name: "Prism Flow",
    value: Es(
      90,
      [0, "#C81FD8"],
      [18, "#E8563C"],
      [32, "#FF8A2B"],
      [46, "#FFC24A"],
      [58, "#F2F5A0"],
      [70, "#7DE8B0"],
      [84, "#22B8E8"],
      [100, "#1E5AD8"]
    )
  },
  {
    // Fire: a long hold in the black-to-ember stretch, then everything happens
    // at once from 48 up. The bunching is the point — it is what makes the
    // bright part look like it is emitting rather than merely being orange.
    name: "Flame",
    value: Es(
      90,
      [0, "#000000"],
      [14, "#2B0A00"],
      [30, "#8C2200"],
      [48, "#E85405"],
      [62, "#FF8A17"],
      [78, "#FFC53D"],
      [92, "#FFF3C4"],
      [100, "#FFFFFF"]
    )
  },
  {
    // The thermal-camera LUT, in its conventional order. Unlike the rest of this
    // group it maps a *quantity*, so the hue order is not a free choice: cold is
    // blue, hot is red, and swapping any two makes it stop reading as heat.
    name: "Heat Vision",
    value: Es(
      90,
      [0, "#000008"],
      [18, "#0B1C6B"],
      [34, "#1E4FD8"],
      [50, "#14C4D9"],
      [64, "#3CE04A"],
      [78, "#C8E82A"],
      [100, "#FF3B10"]
    )
  },
  {
    // One hue, black to blown-out. A single-hue ramp is the cheapest way to make
    // a shape look self-lit, because the eye reads the whole range as one light
    // getting stronger rather than as a sequence of different colours.
    name: "Neon Bloom",
    value: Es(
      90,
      [0, "#000000"],
      [16, "#04240C"],
      [36, "#0A7A22"],
      [56, "#2FD447"],
      [74, "#86F56A"],
      [90, "#DFFFC2"],
      [100, "#FFFFFF"]
    )
  },
  {
    // Cold glass: deep navy through ice, with one rust band at 46. The warm
    // stop is doing all the work — an all-blue ramp refracts into something
    // that reads as tinted plastic, and a single opposing hue is what suggests
    // there is a room on the other side of the glass.
    name: "Cold Glass",
    value: Es(
      90,
      [0, "#04060B"],
      [18, "#16294D"],
      [34, "#2B4E85"],
      [46, "#9A6A4A"],
      [58, "#4E86C0"],
      [74, "#8FC0E4"],
      [88, "#D8ECFA"],
      [100, "#F2FAFF"]
    )
  },
  {
    // Teal to white on a long black hold. The narrowest of these — it exists for
    // the case where the dispersion fringe is meant to be the only colour in the
    // frame, so the ramp underneath has to stay out of its way.
    name: "Cryo",
    value: Es(
      90,
      [0, "#000000"],
      [14, "#001A1E"],
      [30, "#00464F"],
      [48, "#00919E"],
      [62, "#17C8CE"],
      [76, "#7FE8E4"],
      [90, "#D8FBF8"],
      [100, "#FFFFFF"]
    )
  }
], jt = rc[0].value;
function va(e) {
  return [...e.stops].sort((t, s) => t.pos - s.pos);
}
function Pt(e) {
  return { type: e.type, angle: e.angle, stops: e.stops.map((t) => ({ ...t })) };
}
const zd = {
  // Solid is a one-click flat colour; Gradient opens the multi-stop editor.
  fill: {
    type: "dropdown",
    label: "Fill",
    options: [
      { label: "Gradient", value: "gradient" },
      { label: "Solid color", value: "solid" }
    ],
    default: "gradient",
    structural: !0,
    description: "Whether the layer is one flat colour or a gradient. This swaps which of the two colour controls applies."
  },
  color: {
    type: "color",
    label: "Color",
    default: "#11131a",
    showIf: (e) => e.fill === "solid",
    description: "The flat colour, used when Fill is Solid color."
  },
  gradient: {
    type: "gradient",
    label: "Color",
    default: Pt(jt),
    showIf: (e) => e.fill !== "solid",
    description: "The colour ramp, used when Fill is Gradient. Multi-stop: each stop carries a colour and a position from 0 to 100 along the ramp. Linear sweeps across the frame at the Angle; Radial runs out from the centre in rings; Conic sweeps round the centre like a colour wheel, starting at the Angle — match the first and last stop to hide where it wraps."
  },
  // Where a radial or conic ramp is centred. Linear has no centre.
  centerX: {
    type: "slider",
    label: "Centre X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    showIf: (e) => {
      var t;
      return e.fill !== "solid" && ((t = e.gradient) == null ? void 0 : t.type) !== "linear";
    },
    description: "Moves the centre of a radial or conic ramp sideways. 0 is the middle of the frame; 100 is half the frame's height to the right. Radial and Conic only."
  },
  centerY: {
    type: "slider",
    label: "Centre Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    showIf: (e) => {
      var t;
      return e.fill !== "solid" && ((t = e.gradient) == null ? void 0 : t.type) !== "linear";
    },
    description: "Moves the centre of a radial or conic ramp up or down. 0 is the middle; 100 is the top edge, -100 the bottom. Radial and Conic only."
  },
  // What happens past the ramp's ends — the corners of a diagonal, outside a
  // radial's last ring, wherever Warp pushes over. Only offered while the ramp
  // is one still sweep: Frequency above 1 or any Speed repeats it regardless.
  // Not called `repeat`: older Gradient layers carry a stale `repeat` key.
  ends: {
    type: "dropdown",
    label: "Ends",
    options: [
      { label: "Hold", value: "hold" },
      { label: "Repeat", value: "repeat" }
    ],
    default: "hold",
    showIf: (e) => {
      var t;
      return e.fill !== "solid" && (e.frequency ?? 1) === 1 && (e.speed ?? 0) === 0 && ((t = e.gradient) == null ? void 0 : t.type) !== "conic";
    },
    description: "What fills the frame past either end of the ramp — the corners of a diagonal, outside a radial's outer ring, wherever Warp pushes it over. Hold keeps the end colour; Repeat starts the ramp again. Shown only while Frequency is 1 and Speed is 0: anything that repeats or moves already repeats."
  },
  // Motion. All three rest at "still", so a Background behaves as it always
  // has until one of them is moved.
  frequency: {
    type: "slider",
    label: "Frequency",
    min: 1,
    max: 12,
    step: 1,
    default: 1,
    group: "Animation",
    showIf: (e) => e.fill !== "solid",
    description: "How many times the ramp repeats across the frame. 1 is a single sweep; higher values band it into repeating rings, stripes or sectors."
  },
  warp: {
    type: "slider",
    label: "Warp",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    showIf: (e) => e.fill !== "solid",
    description: "How much a slow wave bends the ramp out of a clean sweep. 0 is a straight geometric gradient; high values fold it into drifting liquid bands."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    showIf: (e) => e.fill !== "solid",
    description: "How fast the ramp travels, and which way. Signed: positive runs outward on a radial ramp, clockwise round a conic one and one way along a linear one; negative reverses it. 0 holds it still, and is the default."
  }
}, Vd = {
  fill: "gradient",
  color: "#11131a",
  gradient: Pt(jt),
  ends: "hold",
  centerX: 0,
  centerY: 0,
  frequency: 1,
  warp: 0,
  speed: 0
};
let _d = performance.now();
const Zs = { active: !1, duration: 6 };
function Ce() {
  return (performance.now() - _d) / 1e3;
}
function Ne() {
  const e = Zs.duration > 0 ? Zs.duration : 1, t = Ce() / e % 1;
  return t < 0 ? t + 1 : t;
}
function Xd() {
  const e = Zs.duration > 0 ? Zs.duration : 1, t = Ce();
  return t > 0 && t % e === 0 ? e : Ne() * e;
}
function Qe() {
  return Zs;
}
function qn(e) {
  Zs.active = e;
}
function Zn(e) {
  Zs.duration = e;
}
let ic = 0;
function Wd(e) {
  ic = e > 0 ? e : 0;
}
function Jt() {
  return ic;
}
const Gd = {
  // Same multi-stop gradient editor as the Background layer (consistent UX).
  gradient: {
    type: "gradient",
    label: "Color",
    default: Pt(jt),
    description: "The colour ramp. The same multi-stop editor as the Background layer, but this one moves. Linear sweeps across the frame at the Angle; Radial runs out from the centre in rings; Conic sweeps round the centre like a colour wheel, starting at the Angle — match the first and last stop to hide where it wraps."
  },
  // Where a radial ramp's rings or a conic ramp's sweep is centred. Linear has
  // no centre, so these are hidden there rather than left doing nothing.
  centerX: {
    type: "slider",
    label: "Centre X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    showIf: (e) => {
      var t;
      return ((t = e.gradient) == null ? void 0 : t.type) !== "linear";
    },
    description: "Moves the centre of a radial or conic ramp sideways. 0 is the middle of the frame; 100 is half the frame's height to the right. Radial and Conic only."
  },
  centerY: {
    type: "slider",
    label: "Centre Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    showIf: (e) => {
      var t;
      return ((t = e.gradient) == null ? void 0 : t.type) !== "linear";
    },
    description: "Moves the centre of a radial or conic ramp up or down. 0 is the middle; 100 is the top edge, -100 the bottom. Radial and Conic only."
  },
  // Animation / distortion — what makes this a *living* gradient vs Background.
  frequency: {
    type: "slider",
    label: "Frequency",
    min: 1,
    max: 12,
    step: 1,
    default: 1,
    group: "Animation",
    description: "How many times the ramp repeats across the frame. 1 is a single sweep; higher values band it into repeating rings or stripes."
  },
  warp: {
    type: "slider",
    label: "Warp",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    group: "Animation",
    description: "How much noise bends the ramp out of a clean sweep. 0 is a straight geometric gradient; high values fold it into drifting liquid bands."
  },
  // Bipolar: the sign is the direction (outward vs inward on a radial ramp, and
  // which way a linear one scrolls). The clock hands out plain time and the
  // shader does the multiply, so the sign only ever reaches the shader. Matches
  // Blinds, which has been signed all along.
  speed: {
    type: "slider",
    label: "Speed",
    min: -100,
    max: 100,
    step: 1,
    default: 15,
    group: "Animation",
    description: "How fast the ramp travels, and which way. Signed: positive runs outward on a radial ramp, clockwise round a conic one and one way along a linear one; negative reverses it. 0 holds it still."
  }
}, Yd = {
  gradient: Pt(jt),
  centerX: 0,
  centerY: 0,
  frequency: 1,
  warp: 25,
  speed: 15
};
function lc(e, { clampAtRest: t = !1 } = {}) {
  const s = e.gradient ?? jt, o = s.type === "radial", a = s.type === "conic", n = va(s), l = Math.max(1, n.length), i = n.map((C) => r(new p.Color(C.color))), u = n.map((C) => r(C.pos / 100)), d = r((s.angle ?? 90) * (Math.PI / 180)), c = (C, P, F) => C[P] ?? F, h = (C) => !t || a || C.ends === "repeat" || c(C, "frequency", 1) > 1 || c(C, "speed", 0) !== 0 ? 1 : 0, m = r(c(e, "frequency", 1)), x = r(c(e, "warp", 0) / 100 * 0.25), g = r(c(e, "speed", 0) / 100 * 0.4), w = r(h(e)), S = r(1), v = r(new p.Vector2(...Kn(e))), y = r(0), k = r(0), A = (C) => {
    const P = y.mul(g);
    let F;
    if (o || a) {
      const L = C.sub(0.5), B = E(L.x.mul(S).sub(v.x), L.y.sub(v.y));
      F = o ? Pe(B).mul(2) : Ut(B.x, B.y).div(Math.PI * 2).sub(d.div(Math.PI * 2));
    } else {
      const L = E(Ae(d), Ve(d));
      F = C.sub(0.5).dot(L).add(0.5);
    }
    const M = Ae(C.x.mul(Math.PI * 3).add(k.mul(g).mul(1.7))).mul(x), I = F.mul(m).add(P).add(M), f = $(fe(I, 0, 1), Se(I), w);
    let D = i[0];
    for (let L = 1; L < l; L++) {
      const B = ne(u[L].sub(u[L - 1]), b(1e-4)), z = fe(f.sub(u[L - 1]).div(B), 0, 1);
      D = $(D, i[L], z);
    }
    return ie(D, b(1));
  }, O = (C) => {
    const P = C.gradient ?? s, F = va(P), M = Math.min(l, F.length);
    for (let I = 0; I < M; I++)
      i[I].value.set(F[I].color), u[I].value = F[I].pos / 100;
    d.value = (P.angle ?? 90) * (Math.PI / 180), m.value = c(C, "frequency", 1), x.value = c(C, "warp", 0) / 100 * 0.25, g.value = c(C, "speed", 0) / 100 * 0.4, w.value = h(C), v.value.set(...Kn(C));
  }, R = new p.Vector2();
  return { layerFn: A, updateUniforms: O, renderPass: (C) => {
    y.value = Ce(), k.value = Ce(), C.getDrawingBufferSize(R), S.value = R.x / Math.max(1, R.y);
  } };
}
function Ud(e, t) {
  return lc(e);
}
function Kn(e) {
  return [(e.centerX ?? 0) / 100 * 0.5, (e.centerY ?? 0) / 100 * 0.5];
}
const jd = {
  meta: {
    id: "gradient",
    group: "content",
    name: "Gradient",
    // Background's Gradient fill now does all of this, on the same shader.
    retiredInto: "background",
    description: "Animated multi-stop gradient (frequency, warp, scroll)",
    keywords: ["ramp", "blend", "fade", "linear", "radial", "conic", "angular", "sweep", "pinwheel", "stops", "colour", "color", "mesh", "sky"]
  },
  kind: "generator",
  paramSchema: Gd,
  defaultParams: Yd,
  buildLayer: Ud
};
function $d(e, t) {
  if (e.fill === "solid") {
    const s = r(new p.Color(e.color ?? "#11131a"));
    return {
      layerFn: () => ie(s, b(1)),
      updateUniforms: (o) => {
        s.value.set(o.color ?? "#11131a");
      }
    };
  }
  return lc(e, { clampAtRest: !0 });
}
const Nd = {
  meta: {
    id: "background",
    group: "content",
    name: "Background",
    description: "Solid colour or gradient backdrop — the gradient can drift, warp and repeat",
    keywords: ["backdrop", "solid", "fill", "colour", "color", "base", "ground", "canvas", "gradient", "ramp", "linear", "radial", "conic", "animated gradient", "sky"]
  },
  kind: "generator",
  paramSchema: zd,
  defaultParams: Vd,
  buildLayer: $d
}, cc = {
  ditherType: {
    type: "dropdown",
    label: "Pattern",
    options: [
      { label: "Bayer 2×2", value: "bayer2" },
      { label: "Bayer 4×4", value: "bayer4" },
      { label: "Bayer 8×8", value: "bayer8" },
      { label: "Noise", value: "noise" }
    ],
    default: "bayer4",
    structural: !0,
    description: "The threshold pattern. The Bayer matrices give the ordered crosshatch of a print screen, larger matrices carrying more distinct steps and reading finer. Noise scatters the threshold instead, for a grainier, less mechanical break-up."
  },
  levels: {
    type: "slider",
    label: "Levels",
    min: 2,
    max: 6,
    step: 1,
    default: 2,
    description: "How many tones survive per channel. 2 is pure black and white per channel — the classic 1-bit look; 6 keeps enough steps to still read as a shaded image."
  },
  scale: {
    type: "slider",
    label: "Pattern Scale",
    min: 1,
    max: 16,
    step: 1,
    default: 4,
    description: "How many screen pixels one cell of the pattern covers. 1 is pixel-fine and nearly invisible at a distance; 16 gives a coarse, deliberately visible screen."
  },
  mix: {
    type: "slider",
    label: "Mix",
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    description: "How much of the dithered result replaces the original. 100 is fully dithered; lower values let the smooth image show through underneath."
  }
}, qd = Object.fromEntries(
  Object.entries(cc).map(([e, t]) => [e, t.default])
), Zd = [0, 2, 3, 1], Kd = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], Qd = [
  0,
  32,
  8,
  40,
  2,
  34,
  10,
  42,
  48,
  16,
  56,
  24,
  50,
  18,
  58,
  26,
  12,
  44,
  4,
  36,
  14,
  46,
  6,
  38,
  60,
  28,
  52,
  20,
  62,
  30,
  54,
  22,
  3,
  35,
  11,
  43,
  1,
  33,
  9,
  41,
  51,
  19,
  59,
  27,
  49,
  17,
  57,
  25,
  15,
  47,
  7,
  39,
  13,
  45,
  5,
  37,
  63,
  31,
  55,
  23,
  61,
  29,
  53,
  21
];
function Oa(e, t, s) {
  const o = new Uint8Array(e.map((n) => Math.round(n / s * 255))), a = new p.DataTexture(o, t, t, p.RedFormat);
  return a.minFilter = p.NearestFilter, a.magFilter = p.NearestFilter, a.wrapS = p.RepeatWrapping, a.wrapT = p.RepeatWrapping, a.needsUpdate = !0, a;
}
function Jd(e = 64) {
  const t = new Uint8Array(e * e);
  for (let o = 0; o < t.length; o++) t[o] = Math.floor(Math.random() * 256);
  const s = new p.DataTexture(t, e, e, p.RedFormat);
  return s.minFilter = p.NearestFilter, s.magFilter = p.NearestFilter, s.wrapS = p.RepeatWrapping, s.wrapT = p.RepeatWrapping, s.needsUpdate = !0, s;
}
const eh = {
  bayer2: Oa(Zd, 2, 3),
  bayer4: Oa(Kd, 4, 15),
  bayer8: Oa(Qd, 8, 63),
  noise: Jd(64)
}, th = {
  bayer2: 2,
  bayer4: 4,
  bayer8: 8,
  noise: 64
};
function sh(e, t) {
  const s = e.ditherType || "bayer4", o = eh[s], a = b(th[s]), n = r(e.scale), l = r(e.mix / 100), i = r(e.levels), u = r(new p.Vector2(1920, 1080));
  return { layerFn: (m) => {
    const x = t(m), g = Ue(m.mul(u).div(n)), w = tc(g, a).div(a), S = nt(o, w).r, v = i.sub(1), y = x.rgb.mul(v).add(S).floor().div(v).clamp(0, 1), k = $(x.rgb, y, l);
    return ie(k, x.a);
  }, updateUniforms: (m) => {
    n.value = m.scale, l.value = m.mix / 100, i.value = m.levels;
  }, renderPass: (m, x) => {
    u.value.set(Math.max(1, x.width), Math.max(1, x.height));
  } };
}
const oh = {
  meta: {
    id: "dither",
    name: "Dither",
    description: "Ordered dithering of the layers below (duotone or reduced color)",
    keywords: ["grain", "bayer", "ordered", "stipple", "threshold", "1-bit", "8-bit", "retro", "noise", "halftone", "pixel"],
    group: "stylise"
  },
  kind: "processor",
  paramSchema: cc,
  defaultParams: qd,
  buildLayer: sh
}, Qn = {
  classic: " .:-=+*#%@",
  squares: " ░▒▓█",
  circles: " ·•●",
  stars: " .+*★",
  waffle: " .▒▦▩█",
  diagonals: " .╱╳█",
  vertical: " .│┃█",
  horizontal: " .─━█",
  redacted: " ▁▂▄▆█"
}, uc = " .oO0@", dc = {
  charset: {
    type: "dropdown",
    label: "Glyphs",
    options: [
      { label: "Classic", value: "classic" },
      { label: "Squares", value: "squares" },
      { label: "Circles", value: "circles" },
      { label: "Stars", value: "stars" },
      { label: "Waffle", value: "waffle" },
      { label: "Diagonals", value: "diagonals" },
      { label: "Vertical Lines", value: "vertical" },
      { label: "Horizontal Lines", value: "horizontal" },
      { label: "Redacted", value: "redacted" },
      { label: "Characters", value: "custom" }
    ],
    default: "classic",
    structural: !0,
    description: "Which set of glyphs the image is drawn with. Each ramp runs from least ink to most, so the darkest areas take the first character and the brightest the last. Classic is the familiar ASCII ramp; Squares, Waffle and Redacted use block characters for a denser, more graphic result; Diagonals, Vertical and Horizontal read as hatching. Characters lets you supply your own."
  },
  customChars: {
    type: "text",
    label: "Characters",
    default: uc,
    placeholder: 'Dark → bright, e.g. " .oO0@"',
    // Baked into the glyph atlas at build time, so it can't hot-update.
    structural: !0,
    showIf: (e) => e.charset === "custom",
    description: "Your own ramp, ordered dark to bright — the first character is used for the darkest cell, the last for the brightest. A word, an alphabet, anything. Only when Glyphs is Characters."
  },
  cellSize: {
    type: "slider",
    label: "Cell size",
    min: 4,
    max: 40,
    step: 1,
    default: 12,
    description: "How many screen pixels one glyph occupies. Small keeps the picture legible and the type tiny; large turns the image into a few big characters."
  },
  colorMode: {
    type: "dropdown",
    label: "Color",
    options: [
      { label: "Mono", value: "mono" },
      { label: "Source", value: "source" }
    ],
    default: "mono",
    structural: !0,
    description: "Where the glyph colour comes from. Mono prints every glyph in Ink; Source takes each glyph's colour from the artwork underneath, which keeps the original palette while replacing its texture."
  },
  inkColor: {
    type: "color",
    label: "Ink",
    default: "#e8ff00",
    showIf: (e) => e.colorMode !== "source",
    description: "The glyph colour. Only when Color is Mono."
  },
  bgColor: {
    type: "color",
    label: "Background",
    default: "#080808",
    description: "The colour behind the glyphs."
  },
  invert: {
    type: "dropdown",
    label: "Mapping",
    options: [
      { label: "Normal", value: "normal" },
      { label: "Inverted", value: "invert" }
    ],
    default: "normal",
    structural: !0,
    description: "Which end of the ramp maps to bright. Normal puts the most ink in the dark areas, as print does; Inverted puts it in the light ones, which reads as glowing type on black."
  }
}, ah = Object.fromEntries(
  Object.entries(dc).map(([e, t]) => [e, t.default])
), Bs = 64;
function nh(e) {
  const t = e.length, s = document.createElement("canvas");
  s.width = Bs * t, s.height = Bs;
  const o = s.getContext("2d");
  o.fillStyle = "#000", o.fillRect(0, 0, s.width, s.height), o.fillStyle = "#fff", o.font = `${Math.floor(Bs * 0.92)}px "JetBrains Mono", "IBM Plex Mono", monospace`, o.textAlign = "center", o.textBaseline = "middle";
  for (let n = 0; n < t; n++)
    o.fillText(e[n], n * Bs + Bs / 2, Bs / 2 + Bs * 0.04);
  const a = new p.CanvasTexture(s);
  return a.generateMipmaps = !1, a.minFilter = p.LinearFilter, a.magFilter = p.LinearFilter, a.wrapS = p.ClampToEdgeWrapping, a.wrapT = p.ClampToEdgeWrapping, a.colorSpace = p.NoColorSpace, a.needsUpdate = !0, a;
}
const rh = te(0.299, 0.587, 0.114);
function ih(e, t) {
  const s = e.charset === "custom" ? e.customChars || uc : Qn[e.charset] ?? Qn.classic, o = s.length, a = e.invert === "invert", n = e.colorMode === "source", l = nh(s), i = r(e.cellSize), u = r(new p.Color(e.inkColor)), d = r(new p.Color(e.bgColor)), c = r(new p.Vector2(1920, 1080));
  return { layerFn: (w) => {
    const S = E(i.div(c.x), i.div(c.y)), y = Ue(w.div(S)).add(0.5).mul(S), k = Se(w.div(S)), A = t(y);
    let O = A.rgb.dot(rh);
    a && (O = O.oneMinus());
    const T = fe(Ue(O.mul(o)), b(0), b(o - 1)).add(k.x).div(o), C = k.y, P = nt(l, E(T, C)).r, F = n ? A.rgb : u, M = $(d, F, P);
    return ie(M, b(1));
  }, updateUniforms: (w) => {
    i.value = w.cellSize, u.value.set(w.inkColor), d.value.set(w.bgColor);
  }, renderPass: (w, S) => {
    c.value.set(Math.max(1, S.width), Math.max(1, S.height));
  }, dispose: () => l.dispose() };
}
const lh = {
  meta: {
    id: "glyphDither",
    name: "Glyph Dither",
    description: "ASCII/glyph rendering of the layers below, by brightness",
    keywords: ["ascii", "glyph", "characters", "letters", "terminal", "text", "type", "mosaic", "code"],
    group: "stylise"
  },
  kind: "processor",
  paramSchema: dc,
  defaultParams: ah,
  buildLayer: ih
}, ch = 6, hc = {
  levels: {
    type: "dropdown",
    label: "Levels",
    options: [
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" }
    ],
    default: "4",
    structural: !0,
    description: "How many colour bands the image is reduced to. Each band takes its colour from the slots below, in order — so 2 uses Color 1 and 2 only, from darkest to lightest."
  },
  c1: {
    type: "color",
    label: "Color 1",
    default: "#d6d6d6",
    description: "The colour for the darkest band."
  },
  c2: {
    type: "color",
    label: "Color 2",
    default: "#aef03a",
    description: "The colour for the second band."
  },
  c3: {
    type: "color",
    label: "Color 3",
    default: "#2d1b8e",
    description: "The colour for the third band. Used once Levels is 3 or more."
  },
  c4: {
    type: "color",
    label: "Color 4",
    default: "#15103a",
    description: "The colour for the fourth band. Used once Levels is 4 or more."
  },
  c5: {
    type: "color",
    label: "Color 5",
    default: "#ff37c0",
    description: "The colour for the fifth band. Used once Levels is 5 or more."
  },
  c6: {
    type: "color",
    label: "Color 6",
    default: "#f0e63a",
    description: "The colour for the lightest band. Used once Levels is 6."
  }
}, uh = Object.fromEntries(
  Object.entries(hc).map(([e, t]) => [e, t.default])
), dh = Array.from({ length: ch }, (e, t) => `c${t + 1}`);
function hh(e) {
  const t = new Uint8Array(e * 4), s = new p.DataTexture(t, e, 1, p.RGBAFormat);
  return s.minFilter = p.NearestFilter, s.magFilter = p.NearestFilter, s.wrapS = p.ClampToEdgeWrapping, s.wrapT = p.ClampToEdgeWrapping, s;
}
function Jn(e, t, s) {
  const o = e.image.data, a = new p.Color();
  for (let n = 0; n < t; n++)
    a.set(s[dh[n]]), o[n * 4 + 0] = Math.round(a.r * 255), o[n * 4 + 1] = Math.round(a.g * 255), o[n * 4 + 2] = Math.round(a.b * 255), o[n * 4 + 3] = 255;
  e.needsUpdate = !0;
}
function mh(e, t) {
  const s = Math.max(2, parseInt(e.levels, 10) || 4), o = hh(s);
  return Jn(o, s, e), { layerFn: (l) => {
    const u = t(l).rgb.dot(te(0.299, 0.587, 0.114)), c = fe(Ue(u.mul(s)), 0, s - 1).add(0.5).div(s), h = nt(o, E(c, 0.5)).rgb;
    return ie(h, b(1));
  }, updateUniforms: (l) => {
    Jn(o, s, l);
  } };
}
const ph = {
  meta: {
    id: "posterize",
    name: "Posterize",
    description: "Quantize luminance into a flat color palette",
    keywords: ["quantize", "quantise", "flat", "banding", "levels", "palette", "poster", "reduce", "cel", "toon"],
    group: "stylise"
  },
  kind: "processor",
  paramSchema: hc,
  defaultParams: uh,
  buildLayer: mh
};
function Ke(e) {
  const t = /* @__PURE__ */ new Map();
  return (s) => {
    const o = t.get(s);
    if (o !== void 0) return o;
    const a = e(s);
    return t.set(s, a), a;
  };
}
const mc = {
  blocksX: {
    type: "slider",
    label: "Blocks X",
    min: 2,
    max: 256,
    step: 1,
    default: 48,
    description: "How many blocks across the frame. Low numbers give big chunky cells; 256 is fine enough to read as texture rather than mosaic. Pair it with Blocks Y — matching the two to the canvas ratio keeps cells square, and mismatching them on purpose gives letterbox-shaped pixels."
  },
  blocksY: {
    type: "slider",
    label: "Blocks Y",
    min: 2,
    max: 256,
    step: 1,
    default: 24,
    description: "How many blocks down the frame. Together with Blocks X this sets both how coarse the grid is and the shape of a single cell."
  }
}, fh = Object.fromEntries(
  Object.entries(mc).map(([e, t]) => [e, t.default])
);
function gh(e, t) {
  const s = r(E(e.blocksX, e.blocksY)), o = Ke((i) => Ue(i.mul(s)).add(0.5).div(s));
  return { layerFn: (i) => t(o(i)), updateUniforms: (i) => {
    s.value.set(i.blocksX, i.blocksY);
  }, warpUv: o, maskFn: (i, u) => pe(b(0.5), i(o(u))) };
}
const bh = {
  meta: {
    id: "pixelate",
    name: "Pixelate",
    description: "Snap coordinates to a coarse block grid",
    keywords: ["pixels", "blocks", "mosaic", "grid", "8-bit", "low res", "lowres", "retro", "censor", "chunky"],
    group: "stylise"
  },
  kind: "processor",
  // Snapped UV — the silhouette quantises with the fill.
  transformsSilhouette: !0,
  paramSchema: mc,
  defaultParams: fh,
  buildLayer: gh
};
function St(e, t, s) {
  const o = e.mul(Ct(2376512323)).bitXor(t.mul(Ct(3625334849))).bitXor(s.mul(Ct(3407524639))), a = o.bitXor(o.shiftRight(Ct(16))).mul(Ct(2146121005)), n = a.bitXor(a.shiftRight(Ct(15))).mul(Ct(2221713035));
  return n.bitXor(n.shiftRight(Ct(16))).toFloat().mul(1 / 4294967296);
}
function Be(e) {
  return Ue(e).add(32768).toUint();
}
const pc = 5, fc = {
  /**
   * What decides whether a block breaks in two.
   *
   * `structural` because Detail reads the picture — four taps of the input per
   * level — and Chance reads nothing at all. Baking the choice keeps the cheap
   * mode cheap; a uniform would make every Chance layer pay for taps it never
   * looks at.
   */
  source: {
    type: "dropdown",
    label: "Split by",
    options: [
      { label: "Chance", value: "chance" },
      { label: "Detail", value: "detail" }
    ],
    default: "chance",
    structural: !0,
    group: "Blocks",
    description: "What decides whether a block splits again. Chance splits at random, giving an even scatter of sizes; Detail splits where the picture has detail, so busy areas break into small blocks and flat ones stay large — the quadtree look."
  },
  // Floored at 2 the way Pixelate is, and for a sharper reason: on Chance a 1x1
  // grid is a single coin flip for the entire frame, so roughly a third of the
  // seeds leave it whole and the effect reads as broken. Four cells make that
  // outcome rare enough to be randomness rather than a fault.
  blocksX: {
    type: "slider",
    label: "Blocks X",
    min: 2,
    max: 32,
    step: 1,
    default: 4,
    description: "How many blocks across the frame before any splitting."
  },
  blocksY: {
    type: "slider",
    label: "Blocks Y",
    min: 2,
    max: 32,
    step: 1,
    default: 4,
    description: "How many blocks down the frame before any splitting."
  },
  /**
   * Turns the lattice off-axis.
   *
   * Not a garnish — it is the control that decides whether the layer reads as
   * planes or as pixelation. A grid parallel to the frame is filed by the eye
   * as "low resolution" however unequal its cells are; the same blocks at 20
   * degrees read as facets cutting across the picture. It matters most on
   * smooth material (a noise field, a gradient), where axis-aligned blocks have
   * nothing but their size to distinguish them from a Pixelate.
   */
  angle: {
    type: "slider",
    label: "Angle",
    min: -90,
    max: 90,
    step: 1,
    default: 0,
    description: "Turns the whole lattice off-axis, in degrees. This is what decides whether the layer reads as planes or as pixelation: a grid parallel to the frame is filed by the eye as low resolution however uneven its cells are, while the same blocks at 20 degrees read as facets cutting across the picture. It matters most on smooth material, where axis-aligned blocks have nothing but size to distinguish them from a Pixelate."
  },
  depth: {
    type: "slider",
    label: "Depth",
    min: 0,
    max: pc,
    step: 1,
    default: 3,
    description: "How many times a block may split. 0 leaves the starting grid; each level can quarter a block again, so small increases change the texture a lot."
  },
  split: {
    type: "slider",
    label: "Split",
    min: 0,
    max: 100,
    step: 1,
    default: 60,
    description: "How likely a block is to split at each level. Low leaves most of the starting grid intact, high drives nearly everything to full Depth."
  },
  // How far each block reaches for its colour, in its own widths. A block that
  // shows what was already under it is a mosaic; a block showing what was
  // *nearby* is a plane slid out of place. The block itself never moves.
  displace: {
    type: "slider",
    label: "Displace",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How far each block reaches for its colour, in its own widths. A block showing what was already under it is a mosaic; a block showing what was nearby is a plane slid out of place. The block itself never moves."
  },
  // The line between blocks — off at 0, so the plain block mosaic is the default
  // and the ruled composition is something you turn on.
  rule: {
    type: "slider",
    label: "Width",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Rule",
    description: "How thick the line between blocks is drawn. 0 is off, so the plain mosaic is the default and the ruled, architectural composition is something you turn on."
  },
  ruleColor: {
    type: "color",
    label: "Color",
    default: "#000000",
    description: "The colour of that line."
  },
  // Animation last, always (EFFECTS.md). Detail takes its arrangement from the
  // picture, so there is nothing for a reshuffle to re-roll.
  shuffle: {
    type: "slider",
    label: "Shuffle",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    showIf: (e) => e.source === "chance",
    description: "How fast the random arrangement is re-rolled. 0 holds one arrangement still. Chance only — Detail takes its arrangement from the picture, so there is nothing to reshuffle."
  }
}, yh = Object.fromEntries(
  Object.entries(fc).map(([e, t]) => [e, t.default])
), wh = pc, vh = 4093, xh = 3571, Mh = 8191, kh = 1201, Sh = 6317, er = 0.75, Ph = te(0.2126, 0.7152, 0.0722), tr = 0.5, Ah = 2e-3, sr = (e) => tr * Math.pow(Ah / tr, e / 100), or = (e) => e / 100 * 0.02, ar = (e) => e / 100 * 3, nr = (e) => e / 100 * 4;
function rr(e, t) {
  const s = t * (Math.PI / 180);
  e.set(Math.cos(s), Math.sin(s));
}
function Th(e, t) {
  const s = e.source === "detail", o = r(E(e.blocksX, e.blocksY)), a = r(e.depth), n = r(e.split / 100), l = r(sr(e.split)), i = r(ar(e.displace)), u = r(0), d = r(1), c = r(new p.Vector2(1, 0));
  rr(c.value, e.angle);
  const h = r(or(e.rule)), m = r(new p.Color(e.ruleColor)), x = r(1 / 1080);
  let g = nr(e.shuffle);
  const w = (f) => {
    const D = E(f.x.sub(0.5).mul(d), f.y.sub(0.5));
    return E(D.x.mul(c.x).sub(D.y.mul(c.y)), D.x.mul(c.y).add(D.y.mul(c.x)));
  }, S = (f, D) => {
    const L = E(f.x.mul(d).div(D.x), f.y.div(D.y)), B = E(L.x.mul(c.x).add(L.y.mul(c.y)), L.y.mul(c.x).sub(L.x.mul(c.y)));
    return E(B.x.div(d).add(0.5), B.y.add(0.5));
  }, v = (f, D) => E(f.x.mul(D.x).div(d), f.y.mul(D.y)), y = (f, D, L) => St(
    Be(f.x.add(D.x.mul(vh))),
    Be(f.y.add(D.y.mul(xh))),
    Be(u.add(L))
  ), k = (f) => sc(Re(t(f).rgb, Ph)), A = (f, D) => {
    if (!s) return pe(y(f, D, 0), n);
    const L = k(S(f.add(E(0.25, 0.25)), D)), B = k(S(f.add(E(0.75, 0.25)), D)), z = k(S(f.add(E(0.25, 0.75)), D)), V = k(S(f.add(E(0.75, 0.75)), D)), Y = ne(ne(L, B), ne(z, V)), U = ve(ve(L, B), ve(z, V));
    return pe(l, Y.sub(U));
  }, O = st(([f]) => {
    const D = w(f).toVar(), L = E(o.x, o.y).toVar(), B = b(1).toVar();
    os(wh, ({ i: Y }) => {
      const U = b(Y), j = Ue(v(D, L)), X = pe(U.add(0.5), a), N = B.mul(X).mul(A(j, L)), G = pe(L.x, L.y.mul(d)), W = $(b(1 - er), b(er), G), J = pe(y(j, L, Mh), W);
      L.mulAssign(E(N.mul(J).add(1), N.mul(J.oneMinus()).add(1))), B.assign(N);
    });
    const z = Ue(v(D, L)), V = E(
      y(z, L, kh).sub(0.5),
      y(z, L, Sh).sub(0.5)
    ).mul(i);
    return ie(S(z.add(0.5).add(V), L), L);
  }), R = Ke((f) => O(f)), T = Ke((f) => R(f).xy), C = (f) => {
    const D = t(T(f)), L = R(f).zw, B = Se(v(w(f), L)), z = ve(B.x, B.x.oneMinus()).div(L.x).mul(d), V = ve(B.y, B.y.oneMinus()).div(L.y), Y = ve(z, V), U = ve(b(1).div(L.x).mul(d), b(1).div(L.y)), j = ve(h, U.mul(0.3)), X = pe(b(1e-4), h), N = Me(j.sub(x), j.add(x), Y).oneMinus().mul(X);
    return ie($(D.rgb, m, N), D.a);
  }, P = (f, D) => pe(b(0.5), f(T(D))), F = (f) => {
    o.value.set(f.blocksX, f.blocksY), a.value = f.depth, n.value = f.split / 100, l.value = sr(f.split), i.value = ar(f.displace), rr(c.value, f.angle), h.value = or(f.rule), m.value.set(f.ruleColor), g = nr(f.shuffle);
  }, M = new p.Vector2();
  return { layerFn: C, updateUniforms: F, renderPass: (f) => {
    f.getDrawingBufferSize(M);
    const D = Math.max(1, M.y);
    if (d.value = M.x / D, x.value = 1 / D, s || g <= 0) {
      u.value = 0;
      return;
    }
    u.value = Math.floor(Ce() * g) % 65536;
  }, warpUv: T, maskFn: P };
}
const Ch = {
  meta: {
    id: "subdivide",
    name: "Subdivide",
    description: "Break the layers below into blocks that keep splitting, by chance or by detail",
    keywords: [
      "quadtree",
      "cubist",
      "cubism",
      "blocks",
      "block",
      "mosaic",
      "subdivision",
      "partition",
      "rectangles",
      "grid",
      "fracture",
      "shatter",
      "adaptive pixelate",
      "variable pixelate",
      "de stijl",
      "neoplastic",
      "bento",
      "masonry",
      "tiles",
      "facet",
      "planes"
    ],
    group: "stylise"
  },
  kind: "processor",
  /**
   * Detail reads the input four times per level. Chance reads it once and would
   * rather not have a render target at all — but `resampling` is a property of
   * the effect, not of a layer's params, and the alternative was shipping the
   * same look twice under two names. One extra full-screen pass is the price;
   * what it buys is that both modes cost the same whatever is underneath them.
   */
  resampling: !0,
  // Snapped (and optionally displaced) UV — the silhouette breaks into the same
  // blocks as the fill and travels with them.
  transformsSilhouette: !0,
  paramSchema: fc,
  defaultParams: yh,
  buildLayer: Th
}, gc = {
  repeatX: {
    type: "slider",
    label: "Repeat X",
    min: 1,
    max: 24,
    step: 1,
    default: 11,
    description: "How many copies fit across the frame."
  },
  repeatY: {
    type: "slider",
    label: "Repeat Y",
    min: 1,
    max: 24,
    step: 1,
    default: 1,
    description: "How many copies fit down the frame. Repeat X at 11 with this at 1 gives a strip; raising both gives a grid."
  },
  mirror: {
    type: "dropdown",
    label: "Mirror",
    options: [
      { label: "Off", value: "off" },
      { label: "On", value: "on" }
    ],
    default: "off",
    structural: !0,
    description: "Whether alternate copies flip. On mirrors neighbouring tiles so their edges always meet; Off butts identical copies together, where any mismatch at the seam shows."
  },
  // Endless conveyor: scrolls the tiled grid at the authored rate. Nothing
  // rounds it to whole tiles per loop — see the rate note in clock.ts — so a
  // rate that doesn't divide the loop seams, on purpose. Negative reverses.
  scrollX: {
    type: "slider",
    label: "Scroll X",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the tiled grid travels sideways, and which way. Signed. It runs at the rate you set and nothing rounds it, so a rate that does not carry a whole number of tiles across the loop will seam at the loop point."
  },
  scrollY: {
    type: "slider",
    label: "Scroll Y",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the tiled grid travels vertically, and which way. Signed: positive streams downward. Same loop caveat as Scroll X."
  }
}, Ih = Object.fromEntries(
  Object.entries(gc).map(([e, t]) => [e, t.default])
);
function Eh(e, t) {
  const s = r(E(e.repeatX, e.repeatY)), o = r(E(0, 0)), a = e.mirror === "on";
  let n = e.scrollX / 100 * 0.6, l = e.scrollY / 100 * 0.6;
  const i = Ke((h) => {
    const m = h.mul(s).add(o);
    return a ? we(Se(m.mul(0.5)).mul(2).sub(1)) : Se(m);
  });
  return { layerFn: (h) => t(i(h)), updateUniforms: (h) => {
    s.value.set(h.repeatX, h.repeatY), n = h.scrollX / 100 * 0.6, l = h.scrollY / 100 * 0.6;
  }, renderPass: () => {
    const h = Ce();
    o.value.set(h * n, h * l);
  }, warpUv: i };
}
const Fh = {
  meta: {
    id: "tile",
    name: "Tile",
    description: "Repeat the layers below across a grid",
    keywords: ["repeat", "pattern", "grid", "wallpaper", "mirror", "kaleidoscope", "array", "wrap", "step"],
    group: "distort"
  },
  kind: "processor",
  // Wrapped/mirrored UV — the silhouette repeats with the fill.
  transformsSilhouette: !0,
  paramSchema: gc,
  defaultParams: Ih,
  buildLayer: Eh
}, ir = 2, Ns = { x: 0, y: 0, active: !1 }, lr = (e) => Math.max(-ir, Math.min(ir, e));
function Lh(e, t) {
  Ns.x = lr(e), Ns.y = lr(t), Ns.active = !0;
}
function Rh() {
  Ns.x = 0, Ns.y = 0, Ns.active = !1;
}
function ns() {
  return Ns;
}
function Dh(e, t) {
  const s = e.getBoundingClientRect();
  if (s.width <= 0 || s.height <= 0) return;
  const o = (t.clientX - s.left) / s.width, a = (t.clientY - s.top) / s.height;
  Lh(o * 2 - 1, -(a * 2 - 1));
}
const Hh = {
  _ixFollow: {
    type: "slider",
    label: "Follow mouse",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How far the layer slides toward the cursor. 0 is off. Every public surface tracks the pointer across the whole window; the editor tracks it over the canvas only, so the layer rests at centre while you work."
  },
  _ixTilt: {
    type: "slider",
    label: "Tilt",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How far the layer tips toward the cursor instead of sliding toward it, for a parallax lean. 0 is off. Composes with Follow mouse."
  },
  _ixAxes: {
    type: "dropdown",
    label: "Axes",
    options: [
      { label: "Both", value: "both" },
      { label: "X only", value: "x" },
      { label: "Y only", value: "y" }
    ],
    default: "both",
    showIf: (e) => Ot(e._ixFollow) > 0 || Ot(e._ixTilt) > 0,
    description: "Which axes the cursor is allowed to move the layer on. Only once Follow mouse or Tilt is above 0."
  },
  _ixMomentum: {
    type: "slider",
    label: "Momentum",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    showIf: (e) => Ot(e._ixFollow) > 0 || Ot(e._ixTilt) > 0,
    description: "How much the layer carries past the cursor before settling. 0 tracks the pointer exactly; high values give it weight. Only once Follow mouse or Tilt is above 0."
  },
  _ixSpring: {
    type: "slider",
    label: "Spring",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    showIf: (e) => Ot(e._ixFollow) > 0 || Ot(e._ixTilt) > 0,
    description: "How briskly the layer springs back to rest when the cursor stops or leaves. Only once Follow mouse or Tilt is above 0."
  }
}, Jo = Object.fromEntries(
  Object.entries(Hh).map(([e, t]) => [e, t.default])
);
function Ot(e) {
  return typeof e == "number" ? e : 0;
}
const xa = 0.5, cr = 0.6, Ma = (e) => e < -1 ? -1 : e > 1 ? 1 : e;
function Oh(e) {
  const t = r(new p.Vector2(0, 0)), s = r(new p.Vector2(0, 0));
  let o = 0, a = 0, n = 0.55, l = 0.5, i = "both";
  const u = (w) => {
    o = Ot(w._ixFollow ?? Jo._ixFollow) / 100, a = Ot(w._ixTilt ?? Jo._ixTilt) / 100, n = Ot(w._ixMomentum ?? Jo._ixMomentum) / 100, l = Ot(w._ixSpring ?? Jo._ixSpring) / 100, i = w._ixAxes ?? "both";
  };
  u(e);
  let d = 0, c = 0, h = 0, m = 0;
  return { wrap: (w) => (S) => {
    const v = S.sub(0.5), y = b(1).add(s.x.mul(v.x)).add(s.y.mul(v.y)), k = v.div(y).add(0.5).add(t);
    return w(k);
  }, update: u, renderPass: () => {
    const w = Math.min(Jt(), 0.05), S = ns(), v = i === "y" ? 0 : S.x, y = i === "x" ? 0 : S.y, k = 30 + l * 320, A = 0.8 + n * 0.185;
    h += (v - d) * k * w, m += (y - c) * k * w, h *= A, m *= A, d += h * w, c += m * w, t.value.set(
      -Ma(d) * o * xa,
      -Ma(c) * o * xa
    ), s.value.set(d * a * cr, c * a * cr);
  } };
}
const bt = {
  _ixFollow: {
    type: "slider",
    label: "Follow mouse",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Interactivity",
    description: "How far this effect's focal point follows the cursor. 0 pins it where the Position controls put it."
  },
  _ixMomentum: {
    type: "slider",
    label: "Momentum",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    showIf: (e) => Ot(e._ixFollow) > 0,
    description: "How much the focal point carries past the cursor before settling. Only once Follow mouse is above 0."
  },
  _ixSpring: {
    type: "slider",
    label: "Spring",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    showIf: (e) => Ot(e._ixFollow) > 0,
    description: "How briskly the focal point springs back to rest when the cursor stops or leaves. Only once Follow mouse is above 0."
  }
}, Ba = Object.fromEntries(
  Object.entries(bt).map(([e, t]) => [e, t.default])
);
function Lt(e) {
  const t = new p.Vector2(0, 0), s = r(t);
  let o = 0, a = 0.55, n = 0.5;
  const l = (m) => {
    o = Ot(m._ixFollow ?? Ba._ixFollow) / 100, a = Ot(m._ixMomentum ?? Ba._ixMomentum) / 100, n = Ot(m._ixSpring ?? Ba._ixSpring) / 100;
  };
  l(e);
  let i = 0, u = 0, d = 0, c = 0;
  return { offset: s, value: t, update: l, renderPass: () => {
    const m = Math.min(Jt(), 0.05), x = ns(), g = 30 + n * 320, w = 0.8 + a * 0.185;
    d += (x.x - i) * g * m, c += (x.y - u) * g * m, d *= w, c *= w, i += d * m, u += c * m, s.value.set(
      Ma(i) * o * xa,
      Ma(u) * o * xa
    );
  } };
}
const bc = {
  // Even numbers only. Each mirror line through the centre makes two slices, so
  // an odd count would leave one slice with no partner and a hard seam where the
  // angle wraps. 2 is a single mirror: the left half reflected onto the right.
  segments: {
    type: "slider",
    label: "Segments",
    min: 2,
    max: 24,
    step: 2,
    default: 6,
    description: "How many mirrored slices meet at the centre. Even numbers only, because every mirror line makes two. 2 is a single mirror, one half reflected onto the other; 6 is the classic three-mirror kaleidoscope; 24 is a dense mandala."
  },
  // A multiplier on the picture below, so "Scale" (see EFFECTS.md, which word).
  scale: {
    type: "slider",
    label: "Scale",
    min: 25,
    max: 400,
    step: 1,
    default: 100,
    description: "How large the layers below appear inside each slice, in percent. Above 100 each slice shows a smaller patch of the picture, magnified; below 100 it takes in more of it and the pattern gets busier."
  },
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the centre the slices meet at sideways, as a percentage of the frame. 0 is centred. The picture is read from around this point too."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the centre the slices meet at vertically, as a percentage of the frame. 0 is centred."
  },
  rotate: {
    type: "slider",
    label: "Rotate",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "Turns the whole pattern about its centre, in degrees."
  },
  // Repeats per loop, authored in loop terms the way Cylinder's Spin is — an
  // integer, so there is nothing to round and the loop closes at any value. A
  // repeat is one mirrored pair of slices, not a full turn: the slowest step that
  // lands on an identical frame, so Spin 1 is calm rather than a full revolution.
  spin: {
    type: "slider",
    label: "Spin",
    min: -12,
    max: 12,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How many times the pattern turns onto itself over the loop: 1 rotates it by one mirrored pair of slices, which is the slowest turn that stays seamless. With more Segments each step is smaller, so the same Spin turns more gently. Negative turns it the other way; 0 holds it at Rotate."
  },
  // The tumble: the picture slides under the mirrors along a circle travelled
  // once per loop, so it closes on itself whatever the distance.
  drift: {
    type: "slider",
    label: "Drift",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How far the picture slides about under the mirrors, which is what makes the pattern tumble and re-form the way a real kaleidoscope does when you turn it. It travels one circle per loop, so it is seamless at any value. 0 holds the picture still."
  },
  ...bt
}, Bh = Object.fromEntries(
  Object.entries(bc).map(([e, t]) => [e, t.default])
), ur = 0.3, za = (e) => Math.max(2, Math.round(e.segments / 2) * 2);
function zh(e, t) {
  const s = r(4 * Math.PI / za(e)), o = r(e.scale / 100), a = r(new p.Vector2(
    e.posX / 100 * 0.5,
    e.posY / 100 * 0.5
  )), n = r(0), l = r(new p.Vector2(0, 0)), i = r(1), u = Lt(e), d = (k) => b(1).sub(we(Se(k.mul(0.5)).mul(2).sub(1))), c = Ke((k) => {
    const A = a.x.add(u.offset.x), O = a.y.add(u.offset.y), R = E(k.x.sub(0.5).sub(A).mul(i), k.y.sub(0.5).sub(O)), T = Pe(R), C = Ut(R.y, R.x).sub(n), P = C.sub(s.mul(Ue(C.div(s)))), F = ve(P, s.sub(P)), M = E(Ve(F), Ae(F)).mul(T).div(o).add(l);
    return E(
      d(M.x.div(i).add(0.5).add(A)),
      d(M.y.add(0.5).add(O))
    );
  }), h = (k) => t(c(k));
  let m = e.rotate * Math.PI / 180, x = Math.round(e.spin), g = 4 * Math.PI / za(e), w = e.drift / 100 * ur;
  const S = (k) => {
    g = 4 * Math.PI / za(k), s.value = g, o.value = Math.max(0.01, k.scale / 100), a.value.set(k.posX / 100 * 0.5, k.posY / 100 * 0.5), m = k.rotate * Math.PI / 180, x = Math.round(k.spin), w = k.drift / 100 * ur, u.update(k);
  }, v = new p.Vector2();
  return { layerFn: h, updateUniforms: S, renderPass: (k) => {
    k.getDrawingBufferSize(v), i.value = v.x / Math.max(1, v.y);
    const A = Qe().duration > 0 ? Ne() : 0, O = A * Math.PI * 2;
    n.value = m + x * g * A, l.value.set(w * Math.cos(O), w * Math.sin(O)), u.renderPass();
  }, warpUv: c };
}
const Vh = {
  meta: {
    id: "kaleidoscope",
    name: "Kaleidoscope",
    description: "Mirrors the layers below into slices that meet at a point",
    keywords: ["mirror", "symmetry", "symmetric", "mandala", "reflect", "reflection", "fold", "prism", "radial", "rosette", "flip"],
    group: "distort"
  },
  kind: "processor",
  // Folded UV — a clip run is mirrored along with the fill.
  transformsSilhouette: !0,
  paramSchema: bc,
  defaultParams: Bh,
  buildLayer: zh
}, yc = {
  amount: {
    type: "slider",
    label: "Amount",
    min: 0,
    max: 100,
    step: 1,
    default: 18,
    description: "How far the red and blue channels slide apart, up to 5% of the frame. Under about 20 it reads as a lens fringe on edges; higher and the image separates into three legible colour ghosts."
  },
  angle: {
    type: "slider",
    label: "Angle",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "Which axis the channels separate along, in degrees. 0 splits them horizontally, 90 vertically. Red offsets one way and blue the opposite way, so this is an axis rather than a direction."
  }
}, _h = Object.fromEntries(
  Object.entries(yc).map(([e, t]) => [e, t.default])
);
function Xh(e, t) {
  const s = r(e.amount / 100 * 0.05), o = r(e.angle * (Math.PI / 180));
  return { layerFn: (l) => {
    const i = E(Ve(o), Ae(o)).mul(s), u = t(l.add(i)).r, d = t(l).g, c = t(l.sub(i)).b;
    return ie(u, d, c, b(1));
  }, updateUniforms: (l) => {
    s.value = l.amount / 100 * 0.05, o.value = l.angle * (Math.PI / 180);
  } };
}
const Wh = {
  meta: {
    id: "channelSplit",
    name: "Channel Split",
    description: "Offset R/B channels for chromatic fringing",
    keywords: ["chromatic", "aberration", "rgb", "fringe", "fringing", "glitch", "vhs", "anaglyph", "offset"],
    group: "colour"
  },
  kind: "processor",
  // per-channel offsets — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: yc,
  defaultParams: _h,
  buildLayer: Xh
}, wc = {
  rows: {
    type: "slider",
    label: "Rows",
    min: 4,
    max: 200,
    step: 1,
    default: 48,
    description: "How many horizontal bands the frame is sliced into. Few gives thick torn blocks, many gives a fine scanline tear."
  },
  amount: {
    type: "slider",
    label: "Shift",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "How far a displaced band slides sideways. 0 leaves the image whole."
  },
  density: {
    type: "slider",
    label: "Density",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    description: "How many of the bands are displaced at any moment. Low picks the occasional band for an intermittent fault, high tears most of the frame at once."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 20,
    group: "Animation",
    description: "How fast the pattern of torn bands is reshuffled. 0 freezes one arrangement, which is the difference between a broken signal and a single damaged frame."
  },
  lineAmount: {
    type: "slider",
    label: "Scanlines",
    min: 0,
    max: 100,
    step: 1,
    default: 20,
    description: "How strongly horizontal scanlines are drawn over the result. 0 is off."
  },
  lineColor: {
    type: "color",
    label: "Line Color",
    default: "#f0e63a",
    description: "The colour of those scanlines."
  }
}, Gh = Object.fromEntries(
  Object.entries(wc).map(([e, t]) => [e, t.default])
);
function Va(e) {
  return Se(Ae(e.mul(12.9898)).mul(43758.5453));
}
const Yh = 4096;
function Uh(e, t) {
  const s = r(e.rows), o = r(e.amount / 100 * 0.2), a = r(e.density / 100), n = r(e.lineAmount / 100), l = r(new p.Color(e.lineColor)), i = r(0), u = (m) => {
    const x = i, g = Ue(m.y.mul(s)), w = Va(g.add(x.mul(1.7))), S = pe(a.oneMinus(), w), v = Va(g.add(x).add(7)).sub(0.5).mul(o).mul(S), y = E(Se(m.x.add(v)), m.y);
    let k = t(y);
    const A = Va(g.mul(1.31).add(x.mul(0.5))), O = pe(0.97, A).mul(n), R = $(k.rgb, l, O);
    return k = ie(R, b(1)), k;
  }, d = (m) => {
    s.value = m.rows, o.value = m.amount / 100 * 0.2, a.value = m.density / 100, c = m.speed / 100 * 6, n.value = m.lineAmount / 100, l.value.set(m.lineColor);
  };
  let c = e.speed / 100 * 6;
  return { layerFn: u, updateUniforms: d, renderPass: () => {
    if (c <= 0) {
      i.value = 0;
      return;
    }
    i.value = Math.floor(Ce() * c) % Yh;
  } };
}
const jh = {
  meta: {
    id: "glitch",
    name: "Glitch",
    description: "Row displacement and scanline injection",
    keywords: ["datamosh", "corrupt", "vhs", "scanline", "scanlines", "tear", "broken", "error", "digital", "distort", "displace"],
    group: "stylise"
  },
  kind: "processor",
  paramSchema: wc,
  defaultParams: Gh,
  buildLayer: Uh
}, vc = {
  // Live: picked by a uniform, so hovering the menu previews each.
  sort: {
    type: "dropdown",
    label: "Sort",
    options: [
      { label: "Brights", value: "bright" },
      { label: "Darks", value: "dark" }
    ],
    default: "bright",
    description: "Which parts of the picture get sorted. Brights sorts everything lighter than the Threshold — skies, highlights, skin; Darks sorts everything darker — shadows, hair, ink."
  },
  threshold: {
    type: "slider",
    label: "Threshold",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "Where the sorting starts. With Brights, only pixels lighter than this sort and the rest stay put; raise it to sort less of the picture. With Darks it works the other way round."
  },
  length: {
    type: "slider",
    label: "Length",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    description: "The longest a sorted streak can run, as a share of the frame. Short keeps the picture readable with a combed texture; long melts whole regions into smooth bands."
  },
  angle: {
    type: "slider",
    label: "Angle",
    min: 0,
    max: 360,
    step: 1,
    default: 90,
    group: "Position",
    description: "Which way the pixels are sorted, in degrees — dark to light along this direction. 90 runs downward, the classic glitch-art drip."
  },
  // Whole breaths per loop, Bulge's convention — seamless at any value.
  pulse: {
    type: "slider",
    label: "Pulse",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How far the Threshold breathes up and down, so the sorted streaks grow and retreat. 0 holds it steady."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 1,
    max: 12,
    step: 1,
    default: 1,
    showIf: (e) => e.pulse > 0,
    description: "How many breaths fit in the loop. Whole numbers only, which is what keeps it seamless."
  },
  // Follow mouse steers the sort direction toward the cursor, over the whole
  // picture — the same block and feel as Directional Blur. For sorting only
  // *under* the cursor, clip Pixel Sort "Inside" a Shape that follows the mouse.
  ...bt
}, $h = Object.fromEntries(
  Object.entries(vc).map(([e, t]) => [e, t.default])
), dr = 24, Po = 10, hr = 0.8, _a = te(0.2126, 0.7152, 0.0722), mr = 4;
function Nh(e, t) {
  const s = r(e.sort === "dark" ? 1 : 0), o = r(e.threshold / 100), a = r(e.length / 100 * hr), n = r(new p.Vector2(0, -1)), l = r(0), i = Lt(e), u = (k) => {
    const A = t(k);
    return ne(Re(A.rgb, _a), 0).pow(1 / 2.2);
  }, d = () => fe(o.add(l), 0, 1), c = (k, A) => $(pe(A, k), pe(k, A), s), h = (k) => pe(0, k.x).mul(pe(k.x, 1)).mul(pe(0, k.y)).mul(pe(k.y, 1)), m = (k) => {
    const A = t(k), O = d(), R = (Q) => c(Q, O), T = R(ne(Re(A.rgb, _a), 0).pow(1 / 2.2)), C = a.div(dr), P = n.mul(C), F = Se(Ae(Re(k, E(12.9898, 78.233))).mul(43758.5453));
    let M = b(1), I = b(0), f = b(1), D = b(0);
    for (let Q = 1; Q <= dr; Q++) {
      const se = F.add(Q - 1), K = k.sub(P.mul(se));
      M = M.mul(R(u(K))).mul(h(K)), I = I.add(M);
      const le = k.add(P.mul(se));
      f = f.mul(R(u(le))).mul(h(le)), D = D.add(f);
    }
    const L = ne(I.add(F).sub(1), 0), B = ne(D.add(F).sub(1), 0), z = L.add(B).add(1), V = L.add(0.5).div(z), Y = k.sub(P.mul(L)), U = [], j = [];
    for (let Q = 0; Q < Po; Q++) {
      const se = Y.add(P.mul(z.mul((Q + 0.5) / Po).sub(0.5))), K = t(se);
      U.push(K), j.push(ne(Re(K.rgb, _a), 0));
    }
    const X = V.mul(Po);
    let N = ie(0, 0, 0, 0), G = b(0);
    for (let Q = 0; Q < Po; Q++) {
      let se = b(0);
      for (let le = 0; le < Po; le++)
        le !== Q && (se = se.add(le < Q ? pe(j[le], j[Q]) : pe(j[le], j[Q].sub(1e-6))));
      const K = Rt(se.add(0.5).sub(X).pow(2).mul(-3));
      N = N.add(U[Q].mul(K)), G = G.add(K);
    }
    const W = N.div(ne(G, 1e-4)), J = T.mul(pe(1.5, z));
    return $(A, W, J);
  };
  let x = e.angle * Math.PI / 180, g = e.pulse / 100, w = Math.max(1, Math.round(e.speed));
  const S = (k) => {
    s.value = k.sort === "dark" ? 1 : 0, o.value = k.threshold / 100, a.value = k.length / 100 * hr, x = k.angle * Math.PI / 180, g = k.pulse / 100, w = Math.max(1, Math.round(k.speed)), i.update(k);
  }, v = new p.Vector2();
  return { layerFn: m, updateUniforms: S, renderPass: (k) => {
    k.getDrawingBufferSize(v);
    const A = v.x / Math.max(1, v.y);
    i.renderPass();
    const O = Math.cos(x) + i.value.x * mr, R = -Math.sin(x) + i.value.y * mr, T = Math.hypot(O, R) || 1;
    n.value.set(O / T / A, R / T);
    const C = Qe().duration > 0 ? Ne() : 0;
    l.value = g * 0.25 * Math.sin(C * w * Math.PI * 2);
  } };
}
const qh = {
  meta: {
    id: "pixelSort",
    name: "Pixel Sort",
    description: "Sorts runs of pixels by brightness into dripping streaks — the glitch-art classic",
    keywords: ["pixel sort", "pixel sorting", "sort", "glitch", "datamosh", "streak", "drip", "melt", "smear", "glitch art"],
    group: "stylise"
  },
  kind: "processor",
  // Up to 2×MARCH + SORT taps — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: vc,
  defaultParams: $h,
  buildLayer: Nh
}, zn = new nc(), Ca = new Hd();
Ca.setDecoderPath("/draco/");
zn.setDRACOLoader(Ca);
function Zh(e) {
  Ca.setDecoderPath(e.endsWith("/") ? e : `${e}/`);
}
const Kh = new p.MeshBasicMaterial();
zn.register(() => ({
  name: "WARPKIT_skip_materials",
  loadMaterial: () => Promise.resolve(Kh)
}));
const Vn = new nc();
Vn.setDRACOLoader(Ca);
const Qh = new p.TextureLoader();
Vn.register((e) => ({
  name: "WARPKIT_img_textures",
  loadTexture(t) {
    const s = e, o = s.json.textures[t];
    return s.loadTextureImage(t, o.source, Qh);
  }
}));
function ka(e) {
  const t = new Float32Array(e.count * 3);
  for (let s = 0; s < e.count; s++)
    t[s * 3 + 0] = e.getX(s), t[s * 3 + 1] = e.getY(s), t[s * 3 + 2] = e.getZ(s);
  return new p.BufferAttribute(t, 3);
}
function Jh(e) {
  const t = [];
  if (e.updateMatrixWorld(!0), e.traverse((n) => {
    const l = n;
    if (!l.isMesh || !l.geometry) return;
    const i = l.geometry, u = i.getAttribute("position");
    if (!u) return;
    const d = new p.BufferGeometry();
    d.setAttribute("position", ka(u));
    const c = i.getAttribute("normal");
    c && d.setAttribute("normal", ka(c)), i.index && d.setIndex(i.index.clone()), d.applyMatrix4(l.matrixWorld), c || d.computeVertexNormals(), t.push(d.toNonIndexed()), d.dispose();
  }), !t.length) return null;
  const s = t.length > 1 ? Ks(t, !1) : t[0];
  if (!s) return null;
  s.computeBoundingBox();
  const o = new p.Vector3();
  s.boundingBox.getSize(o);
  const a = 1.4 / Math.max(o.x, o.y, o.z, 1e-4);
  return s.scale(a, a, a), s.center(), s;
}
const e0 = {
  MeshStandardMaterial: p.MeshStandardNodeMaterial,
  MeshPhysicalMaterial: p.MeshPhysicalNodeMaterial,
  MeshBasicMaterial: p.MeshBasicNodeMaterial,
  MeshLambertMaterial: p.MeshLambertNodeMaterial,
  MeshPhongMaterial: p.MeshPhongNodeMaterial,
  MeshMatcapMaterial: p.MeshMatcapNodeMaterial
};
function t0(e) {
  if (e.isNodeMaterial) return e;
  const t = e0[e.type];
  if (!t) return e;
  const s = new t();
  for (const o in e)
    s[o] = e[o];
  return s.type = s.constructor.name, s;
}
function ea(e, t) {
  const s = new Float32Array(e.count * t), o = ["getX", "getY", "getZ", "getW"];
  for (let a = 0; a < e.count; a++)
    for (let n = 0; n < t; n++)
      s[a * t + n] = n < e.itemSize ? e[o[n]].call(e, a) : 0;
  return new p.BufferAttribute(s, t);
}
function s0(e) {
  const t = [], s = [];
  e.updateMatrixWorld(!0);
  let o = !1, a = !1, n = !1, l = !1;
  if (e.traverse((c) => {
    const h = c;
    !h.isMesh || !h.geometry || (h.geometry.getAttribute("uv") && (o = !0), h.geometry.getAttribute("uv1") && (a = !0), h.geometry.getAttribute("color") && (n = !0), h.geometry.getAttribute("tangent") && (l = !0));
  }), e.traverse((c) => {
    const h = c;
    if (!h.isMesh || !h.geometry) return;
    const m = h.geometry, x = m.getAttribute("position");
    if (!x) return;
    const g = new p.BufferGeometry();
    g.setAttribute("position", ka(x));
    const w = m.getAttribute("normal");
    if (w && g.setAttribute("normal", ka(w)), o) {
      const v = m.getAttribute("uv");
      g.setAttribute("uv", v ? ea(v, 2) : new p.BufferAttribute(new Float32Array(x.count * 2), 2));
    }
    if (a) {
      const v = m.getAttribute("uv1") ?? m.getAttribute("uv");
      g.setAttribute("uv1", v ? ea(v, 2) : new p.BufferAttribute(new Float32Array(x.count * 2), 2));
    }
    if (n) {
      const v = m.getAttribute("color"), y = new Float32Array(x.count * 3);
      v || y.fill(1), g.setAttribute("color", v ? ea(v, 3) : new p.BufferAttribute(y, 3));
    }
    if (l) {
      const v = m.getAttribute("tangent");
      if (v)
        g.setAttribute("tangent", ea(v, 4));
      else {
        const y = new Float32Array(x.count * 4);
        for (let k = 0; k < x.count; k++)
          y[k * 4] = 1, y[k * 4 + 3] = 1;
        g.setAttribute("tangent", new p.BufferAttribute(y, 4));
      }
    }
    m.index && g.setIndex(m.index.clone()), g.applyMatrix4(h.matrixWorld), w || g.computeVertexNormals(), t.push(g.toNonIndexed()), g.dispose();
    const S = h.material;
    s.push(t0(Array.isArray(S) ? S[0] : S));
  }), !t.length) return null;
  const i = Ks(t, !0);
  if (!i) return null;
  for (const c of t) c.dispose();
  i.computeBoundingBox();
  const u = new p.Vector3();
  i.boundingBox.getSize(u);
  const d = 1.4 / Math.max(u.x, u.y, u.z, 1e-4);
  return i.scale(d, d, d), i.center(), { geometry: i, materials: s };
}
function o0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of e) {
    for (const o in s) {
      const a = s[o];
      a && a.isTexture && !t.has(a) && (t.add(a), a.dispose());
    }
    s.dispose();
  }
}
const bn = {
  chrome: { hi: "#ffffff", mid: "#9fb0c0", shadow: "#20242b", rim: "#cfe0ff" },
  gold: { hi: "#fff3c0", mid: "#e8b53a", shadow: "#2e1d05", rim: "#ffe08a" },
  copper: { hi: "#ffd9b0", mid: "#c9784a", shadow: "#2a1208", rim: "#ffb27a" },
  pearl: { hi: "#ffffff", mid: "#d9c7e6", shadow: "#2a2440", rim: "#b9a0ff" },
  emerald: { hi: "#d6ffe6", mid: "#2fae6a", shadow: "#07261a", rim: "#6effb0" },
  obsidian: { hi: "#6a7fb0", mid: "#1a1f2e", shadow: "#050507", rim: "#3a6cff" },
  candy: { hi: "#ffe0f0", mid: "#ff5fa2", shadow: "#3a0a22", rim: "#ff9ad0" },
  ink: { hi: "#cccccc", mid: "#555555", shadow: "#0a0a0a", rim: "#ffffff" }
}, a0 = Object.keys(bn).map((e) => ({
  value: e,
  label: e[0].toUpperCase() + e.slice(1)
}));
function n0(e) {
  const t = bn[e] ?? bn.chrome, s = 256, o = document.createElement("canvas");
  o.width = o.height = s;
  const a = o.getContext("2d");
  a.fillStyle = t.shadow, a.fillRect(0, 0, s, s);
  const n = a.createRadialGradient(s * 0.36, s * 0.32, s * 0.02, s * 0.5, s * 0.5, s * 0.5);
  n.addColorStop(0, t.hi), n.addColorStop(0.45, t.mid), n.addColorStop(1, t.shadow), a.fillStyle = n, a.beginPath(), a.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2), a.fill(), a.globalCompositeOperation = "lighter";
  const l = a.createRadialGradient(s * 0.72, s * 0.8, 0, s * 0.72, s * 0.8, s * 0.42);
  l.addColorStop(0, t.rim), l.addColorStop(1, "rgba(0,0,0,0)"), a.fillStyle = l, a.beginPath(), a.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2), a.fill();
  const i = a.createRadialGradient(s * 0.36, s * 0.3, 0, s * 0.36, s * 0.3, s * 0.13);
  i.addColorStop(0, "rgba(255,255,255,0.9)"), i.addColorStop(1, "rgba(255,255,255,0)"), a.fillStyle = i, a.beginPath(), a.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2), a.fill(), a.globalCompositeOperation = "source-over";
  const u = new p.CanvasTexture(o);
  return u.colorSpace = p.SRGBColorSpace, u.needsUpdate = !0, u;
}
const Ft = (...e) => {
  const t = e.filter(Boolean);
  if (t.length)
    return t.length === 1 ? t[0] : (s) => t.every((o) => o(s));
};
function _n(e = {}) {
  const t = e.gate, s = e.hidden ? (n) => !e.hidden(n) : void 0, o = e.extraSurfaces ?? [], a = (n) => n.surface !== "xray";
  return {
    // ── Material ──
    surface: {
      type: "dropdown",
      label: "Material",
      group: "Material",
      options: [
        // Plainest first, most stylised last. Original is the model exactly as
        // its author shaded it — its own materials, its own texture maps — and is
        // offered only for a model, because a primitive has no authored material
        // to show.
        //
        // There is deliberately no plain "Standard" solid here. One was built and
        // removed the same day: an opaque non-metal lit surface is what Glass
        // *already is* at Amount 0 (transmission 0, metalness 0), and the one
        // thing meant to separate them — a much lower `envMapIntensity` — turned
        // out to do nothing at all. See the note in index.ts.
        ...o,
        { label: "Glass", value: "glass" },
        { label: "Mirror", value: "mirror" },
        { label: "Matcap", value: "matcap" },
        { label: "X-ray", value: "xray" }
      ],
      default: "glass",
      showIf: t,
      structural: !0,
      description: "How the form is shaded. Glass transmits and refracts what is behind it; Mirror reflects; Matcap bakes a lit look into a texture, which is cheap and very controllable; X-ray sees through the whole form, so where it overlaps itself it adds up brighter, and it glows most where the surface turns away from you; Original keeps the materials and maps the file was authored with, and is offered only for a model."
    },
    matcap: {
      type: "dropdown",
      label: "Matcap",
      options: a0,
      default: "chrome",
      showIf: Ft(t, (n) => n.surface === "matcap"),
      structural: !0,
      description: "Which baked lighting texture to shade with. Matcap only."
    },
    xrayEdge: {
      type: "slider",
      label: "Edge",
      min: 0,
      max: 100,
      step: 1,
      default: 55,
      showIf: Ft(t, (n) => n.surface === "xray"),
      description: "How far the glow draws in to the outline. Low reads as dense and cloudy, the whole body lit; high leaves only the rims and the places the form folds over itself. The brightness is the Color: a darker one exposes less. X-ray only."
    },
    // Transmission for Glass, metalness for Mirror. At 0 either one is a plain
    // opaque solid, which is why there is no separate material for that.
    amount: {
      type: "slider",
      label: "Amount",
      min: 0,
      max: 100,
      step: 1,
      default: 70,
      showIf: Ft(t, (n) => n.surface !== "matcap" && n.surface !== "xray", s),
      description: "Transmission for Glass, metalness for Mirror. At 0 either one is a plain opaque solid, which is why there is no separate material for that."
    },
    ior: {
      type: "slider",
      label: "IOR",
      min: 100,
      max: 233,
      step: 1,
      default: 145,
      showIf: Ft(t, (n) => n.surface === "glass"),
      description: "Index of refraction, times 100 — 145 is about glass, 233 about diamond. How hard the material bends what sits behind it. Glass only."
    },
    dispersion: {
      type: "slider",
      label: "Dispersion",
      min: 0,
      max: 100,
      step: 1,
      default: 25,
      showIf: Ft(t, (n) => n.surface === "glass"),
      description: "How far the colour channels separate as they refract — the prism edge on thick glass. Glass only."
    },
    roughness: {
      type: "slider",
      label: "Roughness",
      min: 0,
      max: 100,
      step: 1,
      default: 8,
      showIf: Ft(t, (n) => n.surface !== "matcap" && n.surface !== "xray", s),
      description: "How polished the surface is. 0 is a mirror finish; high values scatter reflections into a soft satin."
    },
    // Marble and Ripple both write the surface — one its colour through the
    // volume, the other its shading normal — so both would paint straight over
    // the maps the file brought with it. Hidden under Original rather than left
    // on screen doing nothing — and under X-ray (see `surfaced`).
    marble: {
      type: "slider",
      label: "Marble",
      min: 0,
      max: 100,
      step: 1,
      default: 0,
      group: "Marble",
      showIf: Ft(t, a, s),
      description: "How much colour runs through the volume of the material rather than sitting on its surface. Ripple is how light bounces off it; this is what it is made of. 0 is off."
    },
    marbleColor: {
      type: "color",
      label: "Vein",
      default: "#ffd9c9",
      group: "Marble",
      showIf: Ft(t, a, (n) => n.marble > 0, s),
      description: "The colour of the veins. Only once Marble is above 0."
    },
    marbleFlow: {
      type: "slider",
      label: "Flow",
      min: 0,
      max: 100,
      step: 1,
      default: 45,
      group: "Marble",
      showIf: Ft(t, a, (n) => n.marble > 0, s),
      description: "How far the veins are stretched and dragged, turning blobs into strata. Only once Marble is above 0."
    },
    marbleScale: {
      type: "slider",
      label: "Marble Scale",
      min: 1,
      max: 100,
      step: 1,
      default: 35,
      group: "Marble",
      showIf: Ft(t, a, (n) => n.marble > 0, s),
      description: "How big the veining features are. Only once Marble is above 0."
    },
    marbleSpeed: {
      type: "slider",
      label: "Marble Speed",
      min: 0,
      max: 100,
      step: 1,
      default: 20,
      group: "Marble",
      showIf: Ft(t, a, (n) => n.marble > 0, s),
      description: "How fast the veining churns. 0 freezes it. Only once Marble is above 0."
    },
    // ── Ripple ──
    // Per-pixel normal detail. Deliberately its own group rather than a Distort
    // sub-control: Distort changes the silhouette, this only changes how light
    // reads across the surface, and they're worth reaching for separately.
    ripple: {
      type: "slider",
      label: "Ripple",
      min: 0,
      max: 100,
      step: 1,
      default: 0,
      group: "Ripple",
      showIf: Ft(t, a, s),
      description: "Per-pixel surface relief. This changes only how light reads across the surface, never the silhouette — Distort is the one that moves the outline. 0 is off."
    },
    rippleScale: {
      type: "slider",
      label: "Ripple Scale",
      min: 1,
      max: 100,
      step: 1,
      default: 40,
      group: "Ripple",
      showIf: Ft(t, a, (n) => n.ripple > 0, s),
      description: "How fine the ripple detail is. Only once Ripple is above 0."
    },
    rippleSpeed: {
      type: "slider",
      label: "Ripple Speed",
      min: 0,
      max: 100,
      step: 1,
      default: 25,
      group: "Ripple",
      showIf: Ft(t, a, (n) => n.ripple > 0, s),
      description: "How fast the ripple travels. 0 freezes it. Only once Ripple is above 0."
    },
    // ── Distort (animated 3D noise pushing the surface in/out along its normals) ──
    distort: {
      type: "slider",
      label: "Distort",
      min: 0,
      max: 100,
      step: 1,
      default: 0,
      group: "Distort",
      showIf: t,
      description: "How far 3D noise pushes the surface in and out along its normals. This moves the silhouette, unlike Ripple. 0 is off."
    },
    distortScale: {
      type: "slider",
      label: "Distort Scale",
      min: 0,
      max: 100,
      step: 1,
      default: 35,
      group: "Distort",
      showIf: Ft(t, (n) => n.distort > 0),
      description: "How big the distortion features are. Only once Distort is above 0."
    },
    // Distort is per-vertex displacement, so its finest ripple is the distance
    // between vertices. Most uploaded models are far too coarse for that (a
    // typical head is ~1,700 vertices), which reads as crumpling rather than
    // liquid. This subdivides the mesh so the noise has somewhere to live.
    distortDetail: {
      type: "dropdown",
      label: "Detail",
      options: [
        { label: "Auto", value: "auto" },
        { label: "High", value: "high" }
      ],
      default: "auto",
      group: "Distort",
      showIf: Ft(t, (n) => n.distort > 0),
      description: "How finely the mesh is subdivided before it is displaced. Distort moves vertices, so its finest ripple is the distance between them, and a typical uploaded model is far too coarse — it crumples rather than flows. High subdivides so the noise has somewhere to live, at a cost. Only once Distort is above 0."
    },
    distortSpeed: {
      type: "slider",
      label: "Distort Speed",
      min: 0,
      max: 100,
      step: 1,
      default: 30,
      group: "Distort",
      showIf: Ft(t, (n) => n.distort > 0),
      description: "How fast the distortion churns. 0 freezes it. Only once Distort is above 0."
    }
  };
}
const r0 = {
  // Lit sphere as three offset concentric circles — a flat-shaded terminator.
  // Cheaper and far more robust than hand-computed crescent arcs, which is what
  // this was before and it collapsed to a flat disc.
  sphere: '<circle cx="40" cy="25" r="16" fill="var(--dim)"/><circle cx="37.5" cy="22.5" r="13" fill="var(--secondary)"/><circle cx="35" cy="20" r="7" fill="var(--text)"/>',
  capsule: '<rect x="31" y="7" width="18" height="36" rx="9" fill="var(--secondary)"/><path d="M40 7h-1a8 8 0 0 0-8 8v20a8 8 0 0 0 8 8h1Z" fill="var(--text)"/><path d="M45 7.7A9 9 0 0 1 49 16v18a9 9 0 0 1-4 8.3Z" fill="var(--dim)"/>',
  cylinder: '<rect x="29" y="13" width="22" height="27" fill="var(--secondary)"/><rect x="29" y="13" width="8" height="27" fill="var(--text)"/><rect x="45" y="13" width="6" height="27" fill="var(--dim)"/><ellipse cx="40" cy="13" rx="11" ry="4.4" fill="var(--text)"/><ellipse cx="40" cy="40" rx="11" ry="4.4" fill="var(--muted)"/>',
  cone: '<path d="M40 8 53 40H27Z" fill="var(--text)"/><path d="M40 8v32h13Z" fill="var(--dim)"/><ellipse cx="40" cy="40" rx="13" ry="4.6" fill="var(--muted)"/>',
  disc: '<ellipse cx="40" cy="24" rx="17" ry="9" fill="var(--text)"/><path d="M23 24a17 9 0 0 0 34 0v4a17 9 0 0 1-34 0Z" fill="var(--dim)"/>',
  torus: '<path d="M40 9a17 17 0 1 1-.1 0Zm0 9a8 8 0 1 0 .1 0Z" fill="var(--secondary)" fill-rule="evenodd"/><path d="M40 9a17 17 0 0 0-12 29 8 8 0 0 1 0-11.3A17 17 0 0 1 40 9Z" fill="var(--text)"/>',
  torusKnot: '<g fill="none" stroke-width="5.5" stroke-linecap="round"><path d="M28 17c12-13 24 0 17 11s-19 8-18-2" stroke="var(--text)"/><path d="M52 33c-12 13-24 0-17-11s19-8 18 2" stroke="var(--dim)"/></g>',
  spring: '<g fill="none" stroke-width="4.4" stroke-linecap="round"><path d="M30 12a10 5 0 0 0 20 0M30 20a10 5 0 0 0 20 0M30 28a10 5 0 0 0 20 0M30 36a10 5 0 0 0 20 0" stroke="var(--dim)"/><path d="M50 12a10 5 0 0 1-20 8M50 20a10 5 0 0 1-20 8M50 28a10 5 0 0 1-20 8" stroke="var(--text)"/></g>',
  box: '<path d="M40 8 56 16 40 24 24 16Z" fill="var(--text)"/><path d="M24 16 40 24v18l-16-8Z" fill="var(--dim)"/><path d="M56 16 40 24v18l16-8Z" fill="var(--secondary)"/>',
  // Two offset plates read as a rounded slab with depth. The previous version
  // tried to draw a mitred side wall and produced a broken skirt below the box.
  roundedRect: '<rect x="27" y="11" width="30" height="21" rx="6" fill="var(--dim)"/><rect x="23" y="17" width="30" height="21" rx="6" fill="var(--text)"/>',
  boxFrame: '<g fill="none" stroke="var(--text)" stroke-width="3" stroke-linejoin="round"><path d="M28 18 40 12 52 18 40 24Z"/><path d="M28 18v16l12 6V24"/><path d="M52 18v16l-12 6" stroke="var(--dim)"/></g>',
  pyramid: '<path d="M40 9 58 40H40Z" fill="var(--dim)"/><path d="M40 9 22 40h18Z" fill="var(--text)"/>',
  triangle: '<path d="M40 8 54 33H26Z" fill="var(--text)"/><path d="M26 33h28v7H26Z" fill="var(--dim)"/><path d="M40 8v25h14Z" fill="var(--secondary)"/>',
  hexPrism: '<path d="M31 11h18l7 14-7 14H31l-7-14Z" fill="var(--text)"/><path d="M40 11h9l7 14-7 14h-9Z" fill="var(--dim)"/>',
  octahedron: '<path d="M40 6 58 25 40 44 22 25Z" fill="var(--secondary)"/><path d="M40 6 22 25h18Z" fill="var(--text)"/><path d="M40 25h18L40 44Z" fill="var(--dim)"/>',
  // Front elevation: shallow crown over a deep pavilion, which is the whole
  // reason it reads as a cut gem next to the octahedron above it.
  diamond: '<path d="M31 7 23 16h17V7Z" fill="var(--text)"/><path d="M49 7 57 16H40V7Z" fill="var(--dim)"/><path d="M23 16 40 43V16Z" fill="var(--secondary)"/><path d="M57 16 40 43V16Z" fill="var(--muted)"/>',
  icosahedron: '<path d="M40 7 57 19 51 39H29L23 19Z" fill="var(--secondary)"/><path d="M40 7 57 19 40 25Z" fill="var(--text)"/><path d="M40 25 51 39H29Z" fill="var(--dim)"/><path d="M40 7 23 19l17 6Z" fill="var(--muted)"/>',
  dodecahedron: '<path d="M40 7 56 17 52 36H28L24 17Z" fill="var(--secondary)"/><path d="M40 7 56 17 46 22H34L24 17Z" fill="var(--text)"/><path d="M34 22h12l6 14H28Z" fill="var(--dim)"/>',
  star: '<path d="M40 7 46 21 61 22 49 31 53 45 40 37 27 45 31 31 19 22 34 21Z" fill="var(--text)"/><path d="M40 7 46 21 61 22 49 31 53 45 40 37Z" fill="var(--secondary)"/>',
  asterisk: '<g fill="var(--secondary)"><rect x="20" y="21" width="40" height="8" rx="1"/><rect x="20" y="21" width="40" height="8" rx="1" transform="rotate(60 40 25)"/><rect x="20" y="21" width="40" height="8" rx="1" transform="rotate(120 40 25)"/></g><rect x="20" y="21" width="40" height="8" rx="1" fill="var(--text)"/>',
  roundedCross: '<rect x="20" y="18" width="40" height="14" rx="5" fill="var(--secondary)"/><rect x="33" y="5" width="14" height="40" rx="5" fill="var(--text)"/>',
  tricylinder: '<rect x="18" y="21" width="44" height="9" rx="4.5" fill="var(--secondary)"/><rect x="24" y="9" width="9" height="32" rx="4.5" fill="var(--dim)" transform="rotate(-38 40 25)"/><rect x="35.5" y="3" width="9" height="44" rx="4.5" fill="var(--text)"/>',
  mergedDiscs: '<ellipse cx="32" cy="20" rx="13" ry="9" fill="var(--text)"/><ellipse cx="48" cy="30" rx="13" ry="9" fill="var(--secondary)"/>',
  rippledSphere: '<circle cx="40" cy="25" r="16" fill="var(--dim)"/><circle cx="37.5" cy="22.5" r="13" fill="var(--secondary)"/><g fill="none" stroke="var(--text)" stroke-width="1.8"><ellipse cx="40" cy="25" rx="15" ry="3"/><ellipse cx="40" cy="25" rx="13.5" ry="7.5"/><ellipse cx="40" cy="25" rx="11" ry="11"/></g>',
  // The upload path sets this; it never appears in the picker (hidden option),
  // but a tile exists so a model layer isn't a blank square if one ever shows.
  custom: '<g fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M40 14v16M33 21l7-7 7 7"/><path d="M26 32v4h28v-4"/></g>',
  // Skull: cranium as a lit dome, two deep sockets, a nasal notch and the jaw
  // mass below. Facets rather than outline — at 80×50 an outlined skull turns
  // to mush, where blocked tones still read at a glance.
  skull: '<path d="M40 8c-9 0-15 6-15 14 0 5 2 8 3 11l1 5h22l1-5c1-3 3-6 3-11 0-8-6-14-15-14z" fill="var(--secondary)"/><path d="M40 8c-9 0-15 6-15 14 0 5 2 8 3 11l1 5h5V8z" fill="var(--dim)"/><ellipse cx="33" cy="22" rx="4.6" ry="5.2" fill="var(--muted)"/><ellipse cx="47" cy="22" rx="4.6" ry="5.2" fill="var(--muted)"/><path d="M40 27l-2.6 5h5.2z" fill="var(--muted)"/><path d="M31 38h18l-1.5 5H32.5z" fill="var(--text)"/><path d="M34 38v5M40 38v5M46 38v5" stroke="var(--dim)" stroke-width="1"/>',
  // Boulder: an irregular lump lit from upper-left. Three tones do the work —
  // an outline would read as a potato, blocked facets read as stone.
  boulder: '<path d="M22 34c-2-5 0-11 5-14 3-2 5-6 10-6 6 0 9 3 12 6 4 3 7 8 6 13-1 4-6 6-16 6s-15-1-17-5z" fill="var(--secondary)"/><path d="M22 34c-2-5 0-11 5-14 3-2 5-6 10-6l-2 25z" fill="var(--text)"/><path d="M49 20c4 3 7 8 6 13-1 4-6 6-16 6l2-25z" fill="var(--dim)"/><path d="M33 24l5-3 4 4-4 3z" fill="var(--muted)"/>',
  // Knight: the chess piece in profile — plinth, collar, arched neck and muzzle.
  // Silhouette carries it, so this is one filled path plus a mane facet.
  knight: '<path d="M28 44h24v-4H28z" fill="var(--text)"/><path d="M31 40h18l-2-4H33z" fill="var(--secondary)"/><path d="M33 36c-1-6 1-11 5-14 1-3 0-5 2-7 2 3 5 2 7 4 4 3 6 8 5 17z" fill="var(--secondary)"/><path d="M40 15c-1 2 0 4-2 7-4 3-6 8-5 14h6z" fill="var(--text)"/><path d="M45 18c3 3 5 8 4 18h-4z" fill="var(--dim)"/><circle cx="42" cy="21" r="1.4" fill="var(--muted)"/>',
  // Crown: a banded circlet with five points and a jewel. Reads at 80×50
  // because the silhouette is distinctive — no need to model the metal.
  crown: '<path d="M25 38h30v5H25z" fill="var(--text)"/><path d="M25 38l-2-19 8 7 6-11 6 11 8-7-2 19z" fill="var(--secondary)"/><path d="M25 38l-2-19 8 7 6-11v23z" fill="var(--text)"/><circle cx="23" cy="19" r="2.4" fill="var(--dim)"/><circle cx="57" cy="19" r="2.4" fill="var(--dim)"/><circle cx="40" cy="15" r="2.8" fill="var(--muted)"/><circle cx="40" cy="31" r="2.6" fill="var(--muted)"/>',
  // Hand: a palm block with four fingers of stepped height plus an angled
  // thumb — the stepped lengths read as a hand even flat-shaded at this size.
  hand: '<rect x="30" y="27" width="20" height="16" rx="6" fill="var(--secondary)"/><rect x="41" y="27" width="9" height="16" rx="5" fill="var(--dim)"/><rect x="31" y="15" width="5.5" height="15" rx="2.75" fill="var(--text)"/><rect x="37.5" y="9" width="5.5" height="21" rx="2.75" fill="var(--text)"/><rect x="44" y="8" width="5.5" height="22" rx="2.75" fill="var(--secondary)"/><rect x="50.5" y="12" width="5.5" height="18" rx="2.75" fill="var(--dim)"/><rect x="22" y="29" width="6.5" height="16" rx="3.25" fill="var(--text)" transform="rotate(-35 25.25 37)"/>',
  // Smiley: the house mark. The face is drawn in the deep tone rather than
  // masked out — these tiles allow no defs, and at 36px a filled slot and a
  // hole read the same. Geometry comes straight from BrandMark.vue's 100-unit
  // box, mapped onto the tile by the group transform, so the two can't drift.
  smiley: '<circle cx="40" cy="25" r="18" fill="var(--text)"/><path d="M46 8.2a18 18 0 0 1 0 33.6z" fill="var(--secondary)"/><g transform="translate(40 25) scale(.36) translate(-50 -50)" fill="var(--muted)"><rect x="34.5" y="19" width="7.75" height="31"/><rect x="57.75" y="19" width="7.75" height="31"/><path d="M19,50h7.75v7.75h7.75v7.75h7.75v7.75h15.5v-7.75h7.75v-7.75h7.75v-7.75h7.75v15.5h-7.75v7.75h-7.75v7.75h-31v-7.75h-7.75v-7.75h-7.75z"/></g>'
}, Xn = [
  {
    value: "skull",
    label: "Skull",
    url: "/models/skull.glb",
    credit: "Public domain (CC0)"
  },
  {
    value: "boulder",
    label: "Boulder",
    url: "/models/boulder.glb",
    credit: "Boulder by Poly by Google [CC-BY]"
  },
  {
    value: "knight",
    label: "Knight",
    url: "/models/knight.glb",
    credit: "Knight chess piece by Poly by Google [CC-BY]"
  },
  {
    value: "crown",
    label: "Crown",
    url: "/models/crown.glb",
    credit: "Crown by Poly by Google [CC-BY]"
  },
  {
    value: "hand",
    label: "Hand",
    url: "/models/hand.glb",
    credit: "Rigged Hand by J-Toastie [CC-BY] via Poly Pizza"
  },
  // The house mark, and the only prefab that is ours. Same geometry as
  // BrandMark.vue — an 8x8 pixel face on a chamfered coin — with the face cut
  // clean through the body, so whatever is stacked behind it shows through the
  // eyes and mouth. The embossed variant exists too but needs a key light to
  // read at all, which is not a promise a bundled model can make.
  {
    value: "smiley",
    label: "Smiley",
    url: "/models/smiley.glb",
    credit: "Smiley by WarpKit"
  }
], i0 = new Map(Xn.map((e) => [e.value, e]));
function l0(e) {
  return i0.get(e) ?? null;
}
const c0 = (e) => e.map((t) => ({ ...t, thumb: r0[t.value] })), xc = (e) => e.shape === "custom" || Xn.some((t) => t.value === e.shape), pr = (e) => e.surface === "original" && xc(e), Mc = {
  shape: {
    type: "dropdown",
    label: "Shape",
    // A grid, not a menu: past ~20 entries a scrolling list of words makes you
    // translate each name into a form before you can judge it, and a shape is
    // the one thing you recognise instantly by sight.
    display: "grid",
    // Grouped by family — you rarely want a *named* shape, you want "something
    // angular". Bands are formed from consecutive matching `group` values, so
    // order here is the order on screen.
    options: c0([
      { label: "Sphere", value: "sphere", group: "Round" },
      { label: "Capsule", value: "capsule", group: "Round" },
      { label: "Cylinder", value: "cylinder", group: "Round" },
      { label: "Cone", value: "cone", group: "Round" },
      { label: "Disc", value: "disc", group: "Round" },
      { label: "Torus", value: "torus", group: "Round" },
      { label: "Torus Knot", value: "torusKnot", group: "Round" },
      { label: "Spring", value: "spring", group: "Round" },
      { label: "Box", value: "box", group: "Boxy" },
      { label: "Rounded Rectangle", value: "roundedRect", group: "Boxy" },
      { label: "Box Frame", value: "boxFrame", group: "Boxy" },
      { label: "Pyramid", value: "pyramid", group: "Polyhedra" },
      { label: "Triangle", value: "triangle", group: "Polyhedra" },
      { label: "Hex Prism", value: "hexPrism", group: "Polyhedra" },
      { label: "Octahedron", value: "octahedron", group: "Polyhedra" },
      { label: "Diamond", value: "diamond", group: "Polyhedra" },
      { label: "Icosahedron", value: "icosahedron", group: "Polyhedra" },
      { label: "Dodecahedron", value: "dodecahedron", group: "Polyhedra" },
      { label: "Star", value: "star", group: "Character" },
      { label: "Asterisk", value: "asterisk", group: "Character" },
      { label: "Rounded Cross", value: "roundedCross", group: "Character" },
      { label: "Tricylinder", value: "tricylinder", group: "Character" },
      { label: "Merged Discs", value: "mergedDiscs", group: "Character" },
      { label: "Rippled Sphere", value: "rippledSphere", group: "Character" },
      // Bundled models — same loader as an upload, so they normalise, subdivide
      // and shade identically. See prefabs.ts for where the files live.
      ...Xn.map((e) => ({ label: e.label, value: e.value, group: "Models" })),
      // Not pickable here — a custom model arrives via the layer picker
      // ("Custom Model" under Asset → Content), which adds a shape layer and
      // sets this value itself; the Model control below then takes the file or
      // a pick from the library. Two doors to one upload was the confusion.
      // The value stays legal so those layers keep working and keep their name.
      { label: "Custom model", value: "custom", hidden: !0 }
    ]),
    default: "icosahedron",
    structural: !0,
    description: "Which form is drawn — a primitive, one of the bundled models, or Custom model for your own upload. The picker bands them as Round, Boxy, Polyhedra, Character and Models."
  },
  model: {
    type: "model",
    label: "Model",
    default: "",
    showIf: (e) => e.shape === "custom",
    description: "Your own GLB or GLTF file. Only when Shape is Custom model, which the layer picker sets for you when you add one."
  },
  color: {
    type: "color",
    label: "Color",
    default: "#aef03a",
    showIf: (e) => !pr(e),
    description: "The base colour of the material. Hidden under the Original material, which keeps the colours the model was authored with."
  },
  scale: {
    type: "slider",
    label: "Scale",
    min: 10,
    max: 100,
    step: 1,
    default: 55,
    description: "How big the form is drawn in the frame."
  },
  // Box-only: rounds the cube's corners (hidden for other shapes).
  cornerRadius: {
    type: "slider",
    label: "Corner Radius",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    showIf: (e) => e.shape === "box",
    description: "How rounded the cube's corners are. Box only."
  },
  // What the form is made of. Shared with every other layer that stands on the
  // 3D stage, so a material added there arrives here too — and cannot drift.
  // Only this layer can show a model as its author shaded it, so Original is
  // passed in rather than living in the shared set.
  ..._n({
    hidden: pr,
    extraSurfaces: [{ label: "Original", value: "original", showIf: xc }]
  }),
  // ── Position ──
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the form sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the form vertically, as a percentage of the frame. 0 is centred."
  },
  // ── Rotation ──
  rotateX: {
    type: "slider",
    label: "Rotate X",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    group: "Rotation",
    description: "Turns the form about the X axis, in degrees."
  },
  rotateY: {
    type: "slider",
    label: "Rotate Y",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "Turns the form about the Y axis, in degrees."
  },
  rotateZ: {
    type: "slider",
    label: "Rotate Z",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "Turns the form about the Z axis, in degrees."
  },
  // ── Repeat ──
  // Structural, and it has to be: the copies are instances of one mesh, and the
  // number of them is fixed when the material compiles — see `layoutInstances`
  // in index.ts. Live, this dropdown moved copy 0 and left every other copy
  // stacked on top of it, so Repeat looked dead on any layer that wasn't already
  // repeating when it was built (i.e. all of them — the default is None).
  repeat: {
    type: "dropdown",
    label: "Repeat",
    group: "Repeat",
    options: [
      { label: "None", value: "none" },
      { label: "Grid", value: "grid" },
      { label: "Radial", value: "radial" },
      { label: "Spiral", value: "spiral" }
    ],
    default: "none",
    structural: !0,
    description: "Arranges copies of the form. Grid lays them in rows, Radial rings them around the centre, Spiral winds them outward. None is a single instance."
  },
  count: {
    type: "slider",
    label: "Count",
    min: 2,
    max: 24,
    step: 1,
    default: 6,
    showIf: (e) => e.repeat !== "none",
    description: "How many copies are drawn. Only once Repeat is set."
  },
  spacing: {
    type: "slider",
    label: "Spacing",
    min: 5,
    max: 100,
    step: 1,
    default: 40,
    showIf: (e) => e.repeat !== "none",
    description: "How far apart the copies sit. Only once Repeat is set."
  },
  // ── Animation ──
  spinAxis: {
    type: "dropdown",
    label: "Spin Axis",
    group: "Animation",
    options: [
      { label: "X", value: "x" },
      { label: "Y", value: "y" },
      { label: "Z", value: "z" },
      { label: "Tumble", value: "tumble" }
    ],
    default: "y",
    description: "Which axis the form spins about. Tumble turns it about more than one at once."
  },
  // Signed: negative reverses the spin direction.
  speed: {
    type: "slider",
    label: "Spin Speed",
    min: -100,
    max: 100,
    step: 1,
    default: 20,
    description: "How fast the form spins, and which way. Signed: negative reverses, 0 holds it still. This is an authored rate and nothing rounds it to close the loop, so a spin that does not complete a whole number of turns in the loop length will seam."
  }
}, u0 = Object.fromEntries(
  Object.entries(Mc).map(([e, t]) => [e, t.default])
), yn = /* @__PURE__ */ new Map(), d0 = /* @__PURE__ */ new Set();
function kc() {
  for (const e of d0) e();
}
function Ia(e, t = "missing") {
  !e || e.startsWith("data:") || yn.get(e) === t || (yn.set(e, t), kc());
}
function Ea(e) {
  yn.delete(e) && kc();
}
class h0 extends bd {
  constructor() {
    super();
    const t = new yd();
    t.deleteAttribute("uv");
    const s = new $n({ side: wd }), o = new $n(), a = new vd(16777215, 900, 28, 2);
    a.position.set(0.418, 16.199, 0.3), this.add(a);
    const n = new Os(t, s);
    n.position.set(-0.757, 13.219, 0.717), n.scale.set(31.713, 28.305, 28.591), this.add(n);
    const l = new xd(t, o, 6), i = new Md();
    i.position.set(-10.906, 2.009, 1.846), i.rotation.set(0, -0.195, 0), i.scale.set(2.328, 7.905, 4.651), i.updateMatrix(), l.setMatrixAt(0, i.matrix), i.position.set(-5.607, -0.754, -0.758), i.rotation.set(0, 0.994, 0), i.scale.set(1.97, 1.534, 3.955), i.updateMatrix(), l.setMatrixAt(1, i.matrix), i.position.set(6.167, 0.857, 7.803), i.rotation.set(0, 0.561, 0), i.scale.set(3.927, 6.285, 3.687), i.updateMatrix(), l.setMatrixAt(2, i.matrix), i.position.set(-2.017, 0.018, 6.124), i.rotation.set(0, 0.333, 0), i.scale.set(2.002, 4.566, 2.064), i.updateMatrix(), l.setMatrixAt(3, i.matrix), i.position.set(2.291, -0.756, -2.621), i.rotation.set(0, -0.286, 0), i.scale.set(1.546, 1.552, 1.496), i.updateMatrix(), l.setMatrixAt(4, i.matrix), i.position.set(-2.193, -0.369, -5.547), i.rotation.set(0, 0.516, 0), i.scale.set(3.875, 3.487, 2.986), i.updateMatrix(), l.setMatrixAt(5, i.matrix), this.add(l);
    const u = new Os(t, to(50));
    u.position.set(-16.116, 14.37, 8.208), u.scale.set(0.1, 2.428, 2.739), this.add(u);
    const d = new Os(t, to(50));
    d.position.set(-16.109, 18.021, -8.207), d.scale.set(0.1, 2.425, 2.751), this.add(d);
    const c = new Os(t, to(17));
    c.position.set(14.904, 12.198, -1.832), c.scale.set(0.15, 4.265, 6.331), this.add(c);
    const h = new Os(t, to(43));
    h.position.set(-0.462, 8.89, 14.52), h.scale.set(4.38, 5.441, 0.088), this.add(h);
    const m = new Os(t, to(20));
    m.position.set(3.235, 11.486, -12.541), m.scale.set(2.5, 2, 0.1), this.add(m);
    const x = new Os(t, to(100));
    x.position.set(0, 20, 0), x.scale.set(1, 0.1, 1), this.add(x);
  }
  /**
   * Frees internal resources. This method should be called
   * when the environment is no longer required.
   */
  dispose() {
    const t = /* @__PURE__ */ new Set();
    this.traverse((s) => {
      s.isMesh && (t.add(s.geometry), t.add(s.material));
    });
    for (const s of t)
      s.dispose();
  }
}
function to(e) {
  const t = new kd();
  return t.color.setScalar(e), t;
}
const tt = (e, t) => typeof e == "number" ? e : t, fr = b(4e-3), Wn = Math.tan(45 / 2 * (Math.PI / 180)) * 3.4, Gn = 1.4, so = (e) => e.color ?? "#ffffff", gr = (e) => e.marbleColor ?? "#ffd9c9", m0 = { auto: 0.055, high: 0.03 }, br = 2e5;
function p0(e, t) {
  const s = m0[t];
  let o = e;
  for (let a = 0; a < 6; a++) {
    const n = o.attributes.position.count;
    if (n >= br || n * 4 > br) break;
    const l = new Od(s, 1).modify(o.clone());
    if (l.attributes.position.count === n) {
      l.dispose();
      break;
    }
    o !== e && o.dispose(), o = l;
  }
  return o;
}
const f0 = { repeat: "none", count: 1, spacing: 40 };
function Yn(e) {
  const { params: t, input: s, geometry: o } = e, a = e.transform, n = e.repeat ?? (() => f0), l = new p.RenderTarget(512, 512, {
    minFilter: p.LinearFilter,
    magFilter: p.LinearFilter
  }), i = new p.RenderTarget(512, 512, {
    minFilter: p.LinearFilter,
    magFilter: p.LinearFilter
  }), u = new p.RenderTarget(512, 512, {
    minFilter: p.LinearFilter,
    magFilter: p.LinearFilter
  }), d = new p.Scene(), c = new p.OrthographicCamera(-1, 1, 1, -1, 0, 1), h = new p.MeshBasicNodeMaterial();
  h.colorNode = s(vs()), d.add(new p.Mesh(new p.PlaneGeometry(2, 2), h));
  const m = new p.Scene(), x = new p.PerspectiveCamera(45, 1, 0.1, 100);
  x.position.set(0, 0, 3.4);
  const g = t.surface ?? "glass", w = g === "matcap", S = g === "xray", v = !!e.allowOriginal && g === "original", y = w || g === "mirror", k = y || S;
  m.background = k ? null : u.texture, S && (l.texture.type = p.HalfFloatType);
  const A = v ? 0.8 : 1, O = new p.DirectionalLight(16777215, 2.6 * A);
  O.position.set(2, 3, 4);
  const R = new p.DirectionalLight(16777215, 1 * A);
  R.position.set(-3, -1, 2);
  const T = new p.AmbientLight(16777215, 0.4 * A);
  m.add(O, R, T);
  let C = tt(t.distort, 0), P = t.distortDetail ?? "auto";
  const F = r(0), M = r(1.5), I = r(0), f = r(0), D = r(8), L = r(0), B = r(0), z = r(4), V = r(0), Y = r(0), U = r(new p.Color(so(t))), j = r(new p.Color(gr(t))), X = De(So.mul(M).add(I)), N = So.add(Qo.mul(X.mul(F)));
  let G = w ? n0(t.matcap) : null;
  const W = w ? new p.MeshMatcapNodeMaterial({ color: new p.Color(so(t)), matcap: G }) : S ? new p.MeshBasicNodeMaterial({
    color: new p.Color(so(t)),
    transparent: !0,
    blending: p.AdditiveBlending,
    depthWrite: !1,
    depthTest: !1,
    side: p.DoubleSide
  }) : new p.MeshPhysicalNodeMaterial({
    color: new p.Color(so(t)),
    metalness: 0,
    roughness: 0.1,
    // Built at zero for Original rather than set to zero in `apply`: three
    // decides whether to compile the transmission pass from the value it
    // sees at build time, and this material is only a fallback for a
    // primitive that shouldn't pay for one. `surface` is structural, so the
    // layer rebuilds when this changes.
    transmission: v ? 0 : 1,
    thickness: 2.5,
    ior: 1.45,
    dispersion: 0,
    // Inert today — see the note above. Left at the value glass has always
    // carried so that if three ever wires it up, this path starts from what
    // it was written for rather than from a silent 1.
    envMapIntensity: 1.2
  });
  W.positionNode = N;
  const J = 2e-3, Q = So.mul(D).add(L), se = De(Q), K = te(
    De(Q.add(te(J, 0, 0))).sub(se),
    De(Q.add(te(0, J, 0))).sub(se),
    De(Q.add(te(0, 0, J))).sub(se)
  ).div(J), le = K.sub(Qo.mul(Re(K, Qo))), ce = ws(Qo.sub(le.mul(f)));
  S || (W.normalNode = Ad(ce));
  const oe = te(1, 0.38, 1), de = So.mul(z).mul(oe), me = So.mul(z).mul(0.55), xe = te(
    De(me.add(te(0, 0, V))),
    De(me.add(te(5.2, 1.3, V))),
    De(me.add(te(9.1, 7.7, V)))
  ).mul(Y), ge = de.add(xe).add(V.mul(0.35)), Ge = De(ge).mul(0.65).add(De(ge.mul(2.7)).mul(0.35)).mul(0.5).add(0.5).pow(2.4).clamp(0, 1);
  W.colorNode = $(U, j, Ge.mul(B));
  const _e = r(2.5);
  if (S) {
    const Ie = we(Re(ws(Td), ws(Cd.negate()))).oneMinus().pow(_e);
    W.colorNode = ie(U.mul(Ie.mul(fr.oneMinus()).add(fr)), 1);
  }
  const Ye = new p.MeshBasicNodeMaterial();
  Ye.positionNode = N, Ye.colorNode = ie(1, 1, 1, 1);
  const _ = 64, H = new p.InstancedMesh(o, W, _);
  H.count = 1, H.frustumCulled = !1, m.add(H);
  let q = o, ee = null, Z = null;
  function ae(he, Ie) {
    if (he <= 0 || q.groups.length > 0) {
      H.geometry !== q && (H.geometry = q);
      return;
    }
    (!ee || Z !== Ie) && (ee == null || ee.dispose(), ee = p0(q, Ie), Z = Ie), H.geometry !== ee && (H.geometry = ee);
  }
  function re(he, Ie, pt) {
    const dt = q;
    q = he, ee == null || ee.dispose(), ee = null, Z = null, ae(Ie, pt), dt !== he && dt.dispose();
  }
  const be = {
    setGeometry: (he) => re(he, C, P),
    setVisible: (he) => {
      H.visible = he;
    },
    material: W,
    positionNode: N,
    mesh: H,
    isMatcap: w,
    isOriginal: v
  }, ye = new p.Object3D();
  function ke(he, Ie, pt) {
    const dt = pt / 100 * 3, ft = [];
    if (he === "grid") {
      const Xe = Math.ceil(Math.sqrt(Ie)), vt = Math.ceil(Ie / Xe);
      for (let Et = 0; Et < Ie; Et++) {
        const ts = Math.floor(Et / Xe), Tt = Et - ts * Xe, Nt = Math.min(Xe, Ie - ts * Xe);
        ft.push([(Tt - (Nt - 1) / 2) * dt, ((vt - 1) / 2 - ts) * dt, 0]);
      }
    } else if (he === "radial")
      if (Ie <= 1)
        ft.push([0, 0, 0]);
      else {
        const Xe = dt / (2 * Math.sin(Math.PI / Ie));
        for (let vt = 0; vt < Ie; vt++) {
          const Et = -Math.PI / 2 + vt / Ie * Math.PI * 2;
          ft.push([Math.cos(Et) * Xe, Math.sin(Et) * Xe, 0]);
        }
      }
    else if (he === "spiral")
      for (let Xe = 0; Xe < Ie; Xe++) {
        const vt = Xe * 2.39996, Et = dt * 0.4 * Math.sqrt(Xe);
        ft.push([Math.cos(vt) * Et, Math.sin(vt) * Et, 0]);
      }
    else
      ft.push([0, 0, 0]);
    const Ts = Math.max(1, Math.min(ft.length, _));
    for (let Xe = 0; Xe < Ts; Xe++)
      ye.position.set(ft[Xe][0], ft[Xe][1], ft[Xe][2]), ye.scale.setScalar(1), ye.rotation.set(0, 0, 0), ye.updateMatrix(), H.setMatrixAt(Xe, ye.matrix);
    H.count = Ts, H.instanceMatrix.needsUpdate = !0;
  }
  ke(n(t).repeat, n(t).count, n(t).spacing);
  let Fe = a(t).spinSpeed;
  const Oe = 20 * (Math.PI / 180);
  let Te = a(t).rotX, qe = a(t).rotY, it = a(t).rotZ, yt = a(t).spinAxis, wt = 0;
  const Xt = Wn;
  let It = a(t).posX, Je = a(t).posY, ot = 0, He = 0, at = 0.55, mt = 0.5, lt = "both", At = 0, ct = 0, ut = 0, Wt = 0.45, Gt = 0.3, rs = 0.18, is = 0, ls = 0, ks = 0, Ss = 0, Ps = 1, cs = 1;
  function us(he) {
    var dt;
    W.color.set(so(he)), w || (W.roughness = tt(he.roughness, 8) / 100);
    const Ie = a(he);
    Ps = Ie.scale, H.scale.setScalar(Ps * cs), Fe = Ie.spinSpeed, Te = Ie.rotX, qe = Ie.rotY, it = Ie.rotZ, yt = Ie.spinAxis, C = tt(he.distort, 0), P = he.distortDetail ?? "auto", ae(C, P), B.value = tt(he.marble, 0) / 100, z.value = 1 + tt(he.marbleScale, 35) / 100 * 11, rs = tt(he.marbleSpeed, 20) / 100 * 0.9, Y.value = tt(he.marbleFlow, 45) / 100 * 1.2, U.value.set(so(he)), j.value.set(gr(he)), f.value = tt(he.ripple, 0) / 100 * 0.35, D.value = 2 + tt(he.rippleScale, 40) / 100 * 46, Gt = tt(he.rippleSpeed, 25) / 100 * 1.2, F.value = tt(he.distort, 0) / 100 * 0.5, M.value = 0.6 + tt(he.distortScale, 35) / 100 * 4, Wt = tt(he.distortSpeed, 30) / 100 * 1.5;
    const pt = n(he);
    if (ke(pt.repeat, pt.count, pt.spacing), It = Ie.posX, Je = Ie.posY, ot = tt(he._ixFollow, 0) / 100, He = tt(he._ixTilt, 0) / 100, at = tt(he._ixMomentum, 55) / 100, mt = tt(he._ixSpring, 50) / 100, lt = he._ixAxes ?? "both", At = tt(he._mxDriftX, 0) / 100, ct = tt(he._mxDriftY, 0) / 100, ut = tt(he._mxSpeed, 30) / 100 * 1.5, (dt = e.onApply) == null || dt.call(e, he, be), v)
      W.metalness = 0, W.transmission = 0, W.dispersion = 0;
    else if (S)
      _e.value = 0.6 + tt(he.xrayEdge, 55) / 100 * 5.4;
    else if (!w) {
      const ft = tt(he.amount, 70) / 100;
      he.surface === "mirror" ? (W.metalness = ft, W.transmission = 0, W.dispersion = 0) : (W.metalness = 0, W.transmission = ft, W.ior = tt(he.ior, 145) / 100, W.dispersion = tt(he.dispersion, 25) / 100 * 5);
    }
  }
  us(t);
  const ds = new p.Vector2(), $t = new p.Color();
  let es = !1;
  return { layerFn: (he) => {
    const Ie = E(he.x, he.y.oneMinus());
    if (S) {
      const pt = te(1).sub(Rt(nt(l.texture, Ie).rgb.mul(-1.6))), dt = ne(ne(pt.r, pt.g), pt.b);
      return ie(pt.div(ne(dt, 1e-4)), dt);
    }
    return y ? ie(nt(l.texture, Ie).rgb, nt(l.texture, Ie).a) : ie(nt(l.texture, Ie).rgb, nt(i.texture, Ie).r);
  }, updateUniforms: (he) => us(he), renderPass: (he) => {
    if (!es) {
      es = !0;
      const Vt = new p.PMREMGenerator(he);
      Vt.fromSceneAsync(new h0(), 0.04).then((pd) => {
        m.environment = pd.texture, Vt.dispose();
      }).catch(() => Vt.dispose());
    }
    const Ie = Ce(), pt = Ce();
    I.value = Ce() * Wt, L.value = Ce() * Gt, V.value = Ce() * rs;
    const dt = Math.min(Jt(), 0.1), ft = ns(), Ts = lt === "y" ? 0 : ft.x, Xe = lt === "x" ? 0 : ft.y, vt = 30 + mt * 320, Et = 0.8 + at * 0.185;
    ks += (Ts - is) * vt * dt, Ss += (Xe - ls) * vt * dt, ks *= Et, Ss *= Et, is += ks * dt, ls += Ss * dt;
    const ts = (Vt) => Vt < -1 ? -1 : Vt > 1 ? 1 : Vt, Tt = ts(is) * ot, Nt = ts(ls) * ot, hs = ts(is) * He * Oe, eo = -ts(ls) * He * Oe;
    wt = Ie * Fe * Gn, yt === "tumble" ? H.rotation.set(
      Te + wt * 0.45 + eo,
      qe + wt + hs,
      it
    ) : H.rotation.set(
      Te + (yt === "x" ? wt : 0) + eo,
      qe + (yt === "y" ? wt : 0) + hs,
      it + (yt === "z" ? wt : 0)
    );
    const Zo = At * Math.sin(pt * ut) * 0.5, La = ct * Math.sin(pt * ut + 1.5) * 0.5, Ko = (It + Zo + Tt) * Xt * x.aspect, Ra = (Je + La + Nt) * Xt;
    H.position.set(Ko, Ra, 0), he.getDrawingBufferSize(ds);
    const Cs = Math.max(2, Math.round(ds.x)), Is = Math.max(2, Math.round(ds.y));
    if (e.frameScale) {
      const Vt = e.frameScale(Cs / Is);
      Vt !== cs && (cs = Vt, H.scale.setScalar(Ps * Vt));
    }
    (l.width !== Cs || l.height !== Is) && (l.setSize(Cs, Is), u.setSize(Cs, Is), i.setSize(Cs, Is), x.aspect = Cs / Is, x.updateProjectionMatrix());
    const ko = he.getRenderTarget();
    if (k) {
      const Vt = he.getClearAlpha();
      he.getClearColor($t), he.setClearColor(0, 0), he.setRenderTarget(l), he.render(m, x), he.setClearColor($t, Vt), he.setRenderTarget(ko);
      return;
    }
    !w && (W.transmission ?? 0) > 0 && (he.setRenderTarget(u), he.render(d, c)), he.setRenderTarget(l), he.render(m, x);
    const md = he.getClearAlpha();
    he.getClearColor($t), m.overrideMaterial = Ye, m.background = null, he.setClearColor(0, 0), he.setRenderTarget(i), he.render(m, x), m.overrideMaterial = null, m.background = u.texture, he.setClearColor($t, md), he.setRenderTarget(ko);
  }, dispose: () => {
    var he, Ie;
    l.dispose(), u.dispose(), i.dispose(), h.dispose(), Ye.dispose(), H.geometry.dispose(), W.dispose(), (he = e.onDispose) == null || he.call(e), G == null || G.dispose(), (Ie = m.environment) == null || Ie.dispose();
  }, api: be };
}
function g0() {
  const e = () => new p.CylinderGeometry(0.55, 0.55, 0.3, 64).rotateX(Math.PI / 2), t = e().translate(-0.28, 0.16, 0), s = e().translate(0.28, -0.16, 0);
  return Ks([t, s]);
}
function b0() {
  const e = (t, s) => new Bn(t, s, 0.5, 6, 0.18);
  return Ks([e(1.5, 0.5), e(0.5, 1.5)]);
}
function Vo(e) {
  e.deleteAttribute("uv"), e.deleteAttribute("uv1"), e.deleteAttribute("normal");
  const t = Dd(e);
  return t.computeVertexNormals(), t;
}
function y0() {
  const e = () => new p.CylinderGeometry(0.34, 0.34, 1.5, 48);
  return Ks([e(), e().rotateX(Math.PI / 2), e().rotateZ(Math.PI / 2)]);
}
function w0() {
  const e = [];
  for (let t = 0; t < 3; t++)
    e.push(new p.BoxGeometry(1.5, 0.3, 0.3).rotateZ(t * Math.PI / 3));
  return Ks(e);
}
function v0() {
  const o = [];
  for (const a of [-0.67, 0.67]) for (const n of [-0.67, 0.67]) o.push(new p.BoxGeometry(1.34 + 0.13, 0.13, 0.13).translate(0, a, n));
  for (const a of [-0.67, 0.67]) for (const n of [-0.67, 0.67]) o.push(new p.BoxGeometry(0.13, 1.34 + 0.13, 0.13).translate(a, 0, n));
  for (const a of [-0.67, 0.67]) for (const n of [-0.67, 0.67]) o.push(new p.BoxGeometry(0.13, 0.13, 1.34 + 0.13).translate(a, n, 0));
  return Ks(o);
}
function x0() {
  const l = (g, w) => Array.from({ length: 8 }, (S, v) => {
    const y = v / 8 * Math.PI * 2;
    return new p.Vector3(Math.cos(y) * g, w, Math.sin(y) * g);
  }), i = l(0.4, 0.32), u = l(0.74, 0.04), d = new p.Vector3(0, 0.32, 0), c = new p.Vector3(0, -0.82, 0), h = [], m = (g, w, S) => h.push(g.x, g.y, g.z, w.x, w.y, w.z, S.x, S.y, S.z);
  for (let g = 0; g < 8; g++) {
    const w = (g + 1) % 8;
    m(d, i[w], i[g]), m(i[g], u[w], u[g]), m(i[g], i[w], u[w]), m(u[g], u[w], c);
  }
  const x = new p.BufferGeometry();
  return x.setAttribute("position", new p.Float32BufferAttribute(h, 3)), x.computeVertexNormals(), x.center();
}
function M0() {
  const e = [];
  for (let n = 0; n < 10; n++) {
    const l = n % 2 ? 0.31 : 0.76, i = n / 10 * Math.PI * 2 - Math.PI / 2;
    e.push(new p.Vector2(Math.cos(i) * l, Math.sin(i) * l));
  }
  const a = new p.ExtrudeGeometry(new p.Shape(e), {
    depth: 0.3,
    bevelEnabled: !0,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 2
  });
  return a.center(), a;
}
function k0() {
  const s = [];
  for (let a = 0; a <= 240; a++) {
    const n = a / 240, l = n * Math.PI * 2 * 3.5;
    s.push(new p.Vector3(Math.cos(l) * 0.46, n * 1.2 - 0.6, Math.sin(l) * 0.46));
  }
  const o = new p.CatmullRomCurve3(s);
  return Vo(new p.TubeGeometry(o, 420, 0.115, 20, !1));
}
function S0() {
  const e = new p.SphereGeometry(0.8, 160, 160), t = e.attributes.position, s = new p.Vector3();
  for (let o = 0; o < t.count; o++) {
    s.fromBufferAttribute(t, o);
    const a = s.length(), n = Math.asin(s.y / a), l = 1 + 0.07 * Math.sin(n * 14);
    s.setLength(a * l), t.setXYZ(o, s.x, s.y, s.z);
  }
  return t.needsUpdate = !0, Vo(e);
}
function P0(e) {
  const s = p.MathUtils.clamp(e, 0, 1) * 0.55 * 0.98;
  return s < 0.01 ? new p.BoxGeometry(1.1, 1.1, 1.1) : new Bn(1.1, 1.1, 1.1, 8, s);
}
function yr(e, t = 0) {
  switch (e) {
    case "box":
      return P0(t / 100);
    case "sphere":
      return Vo(new p.SphereGeometry(0.75, 96, 96));
    case "torus":
      return new p.TorusGeometry(0.55, 0.22, 48, 128);
    case "cone":
      return new p.ConeGeometry(0.75, 1.3, 64);
    case "cylinder":
      return new p.CylinderGeometry(0.6, 0.6, 1.3, 64);
    case "torusKnot":
      return new p.TorusKnotGeometry(0.5, 0.18, 160, 32);
    case "mergedDiscs":
      return g0();
    case "roundedCross":
      return b0();
    case "rippledSphere":
      return S0();
    // Smooth forms — welded so glass/Distort see one continuous surface.
    case "capsule":
      return Vo(new p.CapsuleGeometry(0.42, 0.66, 24, 48));
    case "spring":
      return k0();
    case "tricylinder":
      return Vo(y0());
    // Faceted solids — left unwelded so their flat faces stay flat.
    // Radii below are chosen from the *bounding box*, not the circumradius: an
    // octahedron and a pyramid put vertices straight out on their axes, so the
    // same radius that suits a sphere reads a size larger on screen.
    case "octahedron":
      return new p.OctahedronGeometry(0.75, 0);
    case "diamond":
      return x0();
    case "dodecahedron":
      return new p.DodecahedronGeometry(0.82, 0);
    case "pyramid":
      return new p.ConeGeometry(0.75, 1.3, 4);
    // A 3-gon cylinder stands on its axis, so at rest the camera saw two
    // rectangular sides and no triangle. Tip it so a triangular face points at
    // the camera, apex up (three's first radial vertex is on +Z; -90° about X
    // sends it to +Y), and keep it a slab like the picker tile. The
    // cross-section sits off-centre in its own bounds (centroid ≠
    // circumcentre), so re-centre or it orbits when the layer spins.
    case "triangle":
      return new p.CylinderGeometry(0.85, 0.85, 0.6, 3).rotateX(-Math.PI / 2).center();
    case "hexPrism":
      return new p.CylinderGeometry(0.7, 0.7, 1.2, 6);
    case "disc":
      return new p.CylinderGeometry(0.75, 0.75, 0.22, 64).rotateX(Math.PI / 2);
    case "roundedRect":
      return new Bn(1.5, 1, 0.36, 6, 0.16);
    case "star":
      return M0();
    case "asterisk":
      return w0();
    case "boxFrame":
      return v0();
    case "custom":
      return new p.BoxGeometry(1, 1, 1);
    // placeholder until the upload loads
    case "icosahedron":
    default:
      return new p.IcosahedronGeometry(0.85, 0);
  }
}
function A0(e) {
  return new Promise((t) => {
    zn.load(
      e,
      (s) => {
        Ea(e), t(Jh(s.scene));
      },
      void 0,
      // Usually a remix whose uploader deleted the model. The layer falls back
      // to its built-in shape; flag it so the UI can explain the change rather
      // than leaving the piece quietly different from the original.
      (s) => {
        console.error("GLB load failed", s);
        const o = String((s == null ? void 0 : s.message) ?? s ?? ""), a = /extension|draco|meshopt|ktx|basis|parse|invalid|unsupported|unknown/i.test(o);
        Ia(e, a ? "unreadable" : "missing"), t(null);
      }
    );
  });
}
function T0(e) {
  return new Promise((t) => {
    Vn.load(
      e,
      (s) => {
        Ea(e), t(s0(s.scene));
      },
      void 0,
      (s) => {
        console.error("GLB load failed", s);
        const o = String((s == null ? void 0 : s.message) ?? s ?? ""), a = /extension|draco|meshopt|ktx|basis|parse|invalid|unsupported|unknown/i.test(o);
        Ia(e, a ? "unreadable" : "missing"), t(null);
      }
    );
  });
}
const Xa = Math.PI / 180;
function C0(e, t) {
  const s = yr(e.shape, e.cornerRadius);
  let o = e.cornerRadius, a = null, n = "", l = !1;
  function i(c, h) {
    const m = c;
    m.isNodeMaterial && (m.positionNode = h.positionNode);
  }
  function u() {
    a && (o0(a), a = null);
  }
  function d(c, h) {
    if (n = c, l = !1, h.setVisible(!1), !!c) {
      if (h.isOriginal) {
        T0(c).then((m) => {
          !m || n !== c || (u(), m.materials.forEach((x) => i(x, h)), a = m.materials, h.setGeometry(m.geometry), h.mesh.material = a, l = !0, h.setVisible(!0));
        });
        return;
      }
      A0(c).then((m) => {
        !m || n !== c || (h.setGeometry(m), l = !0, h.setVisible(!0));
      });
    }
  }
  return Yn({
    params: e,
    input: t,
    geometry: s,
    // Only a GLB carries authored materials, so only this layer offers to show
    // them. See `asAuthored` in params.ts for the controls that step aside.
    allowOriginal: !0,
    transform: (c) => ({
      scale: c.scale / 50,
      posX: c.posX / 100,
      posY: c.posY / 100,
      rotX: c.rotateX * Xa,
      rotY: c.rotateY * Xa,
      rotZ: c.rotateZ * Xa,
      spinAxis: c.spinAxis ?? "y",
      spinSpeed: c.speed / 100
    }),
    repeat: (c) => ({
      repeat: c.repeat ?? "none",
      count: c.count ?? 6,
      spacing: c.spacing ?? 40
    }),
    onApply: (c, h) => {
      const m = c.shape, x = l0(m);
      if (m === "custom" || x) {
        const w = x ? x.url : c.model ?? "";
        w !== n && d(w, h), h.setVisible(l);
      } else
        h.setVisible(!0);
      const g = c.cornerRadius;
      m === "box" && g !== o && (h.setGeometry(yr("box", g)), o = g);
    },
    onDispose: u
  });
}
const I0 = {
  meta: {
    id: "shape",
    group: "content",
    name: "3D Model",
    description: "A primitive or a ready-made model — as authored, or in glass, mirror or matcap",
    keywords: ["3d", "mesh", "geometry", "sphere", "cube", "torus", "primitive", "glass", "mirror", "model", "glb", "object", "diamond", "gem", "crystal"]
  },
  kind: "generator",
  // Moves its own mesh for position/interactivity/motion (so the refraction
  // backdrop stays put and only the shape moves).
  selfPositioned: !0,
  paramSchema: Mc,
  defaultParams: u0,
  buildLayer: C0
}, Sc = {
  type: {
    type: "dropdown",
    label: "Type",
    options: [
      { label: "Simplex", value: "simplex" },
      { label: "Perlin", value: "perlin" },
      { label: "Voronoi", value: "voronoi" }
    ],
    default: "simplex",
    structural: !0,
    description: "Which noise generates the field. Simplex is smooth and organic, the general-purpose choice; Perlin is similar but with a squarer, more axis-aligned character; Voronoi builds from cell centres instead, giving cracked, cellular structure rather than smooth undulation."
  },
  scale: {
    type: "slider",
    label: "Scale",
    min: 1,
    max: 100,
    step: 1,
    default: 40,
    description: "How big the features of the noise are. Low gives broad soft clouds, high a fine granular texture."
  },
  amplitude: {
    type: "slider",
    label: "Amplitude",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "How much contrast the field has between its low and high values. Low keeps everything near the middle of the colour ramp, high drives it to both ends."
  },
  skew: {
    type: "slider",
    label: "Skew",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "How much the field is stretched along one axis. 50 is unstretched; away from it the noise smears into directional streaks rather than round blobs."
  },
  angle: {
    type: "slider",
    label: "Angle",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "Which way the skew stretches, in degrees. Only meaningful once Skew is away from 50."
  },
  phase: {
    type: "slider",
    label: "Phase",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "Steps the field to a different arrangement without animating it. Use it to reroll the pattern when you like the settings but not this particular shape."
  },
  threshold: {
    type: "slider",
    label: "Threshold",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "Where the midpoint between the two colours sits. 50 is even; moving it pushes the balance toward one colour and hardens the boundary between them, which is how you get bold two-tone shapes rather than a soft blend."
  },
  colorA: {
    type: "color",
    label: "Color A",
    default: "#ffd198",
    description: "The colour at the low end of the field."
  },
  colorB: {
    type: "color",
    label: "Color B",
    default: "#9600e6",
    description: "The colour at the high end."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    group: "Animation",
    description: "How fast the field evolves in place. 0 freezes it into a static texture."
  },
  // Endless directional drift of the field (same control as Tile / Flow Field).
  scrollX: {
    type: "slider",
    label: "Scroll X",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the whole field drifts sideways, and which way. Signed. A conveyor, distinct from Speed: it translates the pattern rather than changing it."
  },
  scrollY: {
    type: "slider",
    label: "Scroll Y",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the whole field drifts vertically, and which way. Signed."
  }
}, E0 = Object.fromEntries(
  Object.entries(Sc).map(([e, t]) => [e, t.default])
);
function wr(e, t) {
  switch (e) {
    case "voronoi":
      return oc(t, b(1)).oneMinus();
    case "perlin":
      return Bt(t, 4, 2, 0.5).mul(0.5).add(0.5);
    case "simplex":
    default:
      return De(t).mul(0.5).add(0.5);
  }
}
function F0(e, t) {
  const s = r(new p.Color(e.colorA)), o = r(new p.Color(e.colorB)), a = r(e.scale / 10), n = r(e.amplitude / 50), l = r((e.skew - 50) / 50), i = r(e.angle * (Math.PI / 180)), u = r(e.phase / 20), d = r(e.threshold / 100), c = r(e.speed / 100 * 2), h = r(e.scrollX / 100 * 0.5), m = r(e.scrollY / 100 * 0.5), x = r(0), g = r(0), w = r(0), S = r(0), v = r(E(0, 0)), y = e.type;
  return { layerFn: (R) => {
    const T = R.sub(0.5), C = Ve(i), P = Ae(i), F = E(T.x.mul(C).sub(T.y.mul(P)), T.x.mul(P).add(T.y.mul(C))), M = E(F.x.add(F.y.mul(l)), F.y), I = u.add(x.mul(c)), f = E(x.mul(h), x.mul(m)), D = $(I, u.add(S.mul(w)), g), L = $(I, u.add(S.mul(w.sub(1))), g), B = $(f, v.mul(w), g), z = $(f, v.mul(w.sub(1)), g), V = M.add(B).mul(a), Y = M.add(z).mul(a), j = $(
      wr(y, te(V, D)),
      wr(y, te(Y, L)),
      w.mul(g)
    ).sub(0.5).mul(n).add(d).clamp(0, 1);
    return ie($(s, o, j), b(1));
  }, updateUniforms: (R) => {
    s.value.set(R.colorA), o.value.set(R.colorB), a.value = R.scale / 10, n.value = R.amplitude / 50, l.value = (R.skew - 50) / 50, i.value = R.angle * (Math.PI / 180), u.value = R.phase / 20, d.value = R.threshold / 100, c.value = R.speed / 100 * 2, h.value = R.scrollX / 100 * 0.5, m.value = R.scrollY / 100 * 0.5;
  }, renderPass: () => {
    x.value = Ce();
    const R = Qe();
    g.value = R.active ? 1 : 0, w.value = Ne(), S.value = c.value * R.duration, v.value.set(h.value * R.duration, m.value * R.duration);
  } };
}
const L0 = {
  meta: {
    id: "noiseFill",
    name: "Noise Fill",
    description: "Animated Simplex / Perlin / Voronoi noise between two colors",
    keywords: ["perlin", "simplex", "fbm", "clouds", "fog", "smoke", "grain", "organic", "texture", "static"],
    group: "generative"
  },
  kind: "generator",
  paramSchema: Sc,
  defaultParams: E0,
  buildLayer: F0
}, Pc = {
  // Two colours map the flow's low→high values; the third tints the ribbons.
  colorA: {
    type: "color",
    label: "Color A",
    default: "#1b1066",
    description: "The colour at the low end of the flow field — the base of the image."
  },
  colorB: {
    type: "color",
    label: "Color B",
    default: "#33e0ff",
    description: "The colour at the high end. A and B together are the ground the ribbons run over."
  },
  colorC: {
    type: "color",
    label: "Ribbon",
    default: "#ff5ea2",
    description: "The ribbon colour. The ribbons are the streamlines drawn through the field, so this is the one that reads as the drawn mark rather than the background."
  },
  scale: {
    type: "slider",
    label: "Scale",
    min: 1,
    max: 100,
    step: 1,
    default: 32,
    description: "How big the features of the field are. Low gives broad slow currents, high a tight turbulent weave."
  },
  swirl: {
    type: "slider",
    label: "Swirl",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How much the field curls rather than running straight. 0 gives near-parallel flow, high gives vortices and eddies."
  },
  lines: {
    type: "slider",
    label: "Ribbons",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "How strongly the streamlines are drawn. 0 leaves only the smooth colour field with no visible ribbons; high makes the drawn strands dominate."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    group: "Animation",
    description: "How fast the field evolves in place. 0 freezes it into a still pattern."
  },
  // Endless directional drift of the field (same control as Tile / Noise Fill).
  scrollX: {
    type: "slider",
    label: "Scroll X",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the whole field drifts sideways, and which way. Signed. A conveyor, distinct from Speed: it translates the pattern rather than changing it."
  },
  scrollY: {
    type: "slider",
    label: "Scroll Y",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the whole field drifts vertically, and which way. Signed."
  }
}, R0 = Object.fromEntries(
  Object.entries(Pc).map(([e, t]) => [e, t.default])
);
function D0(e, t) {
  const s = r(new p.Color(e.colorA)), o = r(new p.Color(e.colorB)), a = r(new p.Color(e.colorC)), n = r(e.scale / 18), l = r(e.swirl / 100 * 2.2), i = r(e.lines / 100 * 16), u = r(Math.min(1, e.lines / 30)), d = r(e.speed / 100 * 0.6), c = r(e.scrollX / 100 * 0.4), h = r(e.scrollY / 100 * 0.4), m = r(1), x = r(0), g = r(0), w = r(0), S = r(0), v = r(E(0, 0)), y = (T, C, P) => {
    const F = T.sub(0.5).add(P), M = E(F.x.mul(m), F.y).mul(n), I = De(te(M, C)), f = De(te(M.add(E(3.7, 1.9)), C)), D = M.add(E(I, f).mul(l)), L = Bt(te(D, C), 4, 2, 0.5).mul(0.5).add(0.5), B = Ae(D.y.add(D.x.mul(0.5)).mul(i).add(C.mul(3))).mul(0.5).add(0.5);
    let z = $(s, o, L);
    return z = $(z, a, B.mul(u).mul(L)), z;
  }, k = (T) => {
    const C = x.mul(d), P = E(x.mul(c), x.mul(h)), F = $(C, S.mul(w), g), M = $(C, S.mul(w.sub(1)), g), I = $(P, v.mul(w), g), f = $(P, v.mul(w.sub(1)), g), D = y(T, F, I), L = y(T, M, f), B = $(D, L, w.mul(g));
    return ie(B, b(1));
  }, A = (T) => {
    s.value.set(T.colorA), o.value.set(T.colorB), a.value.set(T.colorC), n.value = T.scale / 18, l.value = T.swirl / 100 * 2.2, i.value = T.lines / 100 * 16, u.value = Math.min(1, T.lines / 30), d.value = T.speed / 100 * 0.6, c.value = T.scrollX / 100 * 0.4, h.value = T.scrollY / 100 * 0.4;
  }, O = new p.Vector2();
  return { layerFn: k, updateUniforms: A, renderPass: (T) => {
    x.value = Ce();
    const C = Qe();
    g.value = C.active ? 1 : 0, w.value = Ne(), S.value = d.value * C.duration, v.value.set(c.value * C.duration, h.value * C.duration), T.getDrawingBufferSize(O), m.value = O.x / Math.max(1, O.y);
  } };
}
const H0 = {
  meta: {
    id: "flowField",
    name: "Flow Field",
    description: "Domain-warped noise that streams as flowing ribbons",
    keywords: ["ribbons", "streams", "curl", "silk", "marble", "domain warp", "smoke", "flowing", "liquid"],
    group: "generative"
  },
  kind: "generator",
  paramSchema: Pc,
  defaultParams: R0,
  buildLayer: D0
}, Ac = [
  { id: "topLeft", fx: -1, fy: 1, title: "Top left" },
  { id: "top", fx: 0, fy: 1, title: "Top" },
  { id: "topRight", fx: 1, fy: 1, title: "Top right" },
  { id: "left", fx: -1, fy: 0, title: "Left" },
  { id: "center", fx: 0, fy: 0, title: "Centre" },
  { id: "right", fx: 1, fy: 0, title: "Right" },
  { id: "bottomLeft", fx: -1, fy: -1, title: "Bottom left" },
  { id: "bottom", fx: 0, fy: -1, title: "Bottom" },
  { id: "bottomRight", fx: 1, fy: -1, title: "Bottom right" }
], wn = "custom", ta = 200, qo = {
  anchorPreset: {
    type: "anchor",
    label: "Anchor",
    default: "center",
    description: "The pivot Rotate turns about. One of the nine named points — center, topLeft and so on — or 'custom' where the gizmo has placed it somewhere those nine cannot name."
  },
  anchorX: {
    type: "slider",
    label: "Anchor X",
    min: -ta,
    max: ta,
    step: 1,
    default: 0,
    showIf: () => !1,
    description: "The resolved pivot, in Position units, written alongside the preset so a reader that is not the editor — the export runtime, the thumbnailer — finds it without re-deriving it. Set Anchor instead; this follows."
  },
  anchorY: {
    type: "slider",
    label: "Anchor Y",
    min: -ta,
    max: ta,
    step: 1,
    default: 0,
    showIf: () => !1,
    description: "The resolved pivot Y. See Anchor X."
  }
};
function Tc(e) {
  return "anchorPreset" in e || "anchorX" in e;
}
function O0(e) {
  const t = e.anchorX ?? 0, s = e.anchorY ?? 0, o = e.anchorPreset;
  return typeof o == "string" && (o === wn || Ac.some((n) => n.id === o)) && !(o === "center" && (t !== 0 || s !== 0)) ? o : t === 0 && s === 0 ? "center" : wn;
}
function as(e) {
  return [
    (e.anchorX ?? 0) / 100 * 0.5,
    (e.anchorY ?? 0) / 100 * 0.5
  ];
}
function Fa(e, t, s) {
  const o = Ve(s), a = Ae(s), n = e.sub(t);
  return E(
    n.x.mul(o).sub(n.y.mul(a)),
    n.x.mul(a).add(n.y.mul(o))
  ).add(t);
}
const ps = (e) => e.depth > 0, sa = (e) => !ps(e), B0 = (e) => e.shape === "rect" ? "width" : e.shape === "circle" ? "circleWidth" : null, z0 = (e) => {
  const t = B0(e);
  if (!t) return 1;
  const s = e[t];
  return (typeof s == "number" && Number.isFinite(s) ? s : t === "width" ? 140 : 100) / 100;
}, Cc = {
  shape: {
    type: "dropdown",
    label: "Shape",
    options: [
      { label: "Rectangle", value: "rect" },
      { label: "Circle", value: "circle" },
      { label: "Polygon", value: "polygon" }
    ],
    default: "rect",
    structural: !0,
    description: "Which primitive is drawn. Rectangle, Circle and Polygon each expose their own controls below."
  },
  // "None" empties the fill so a shape with a stroke can show as an outline
  // only — the same on/off-by-value language `repeat`'s "None" and the
  // Readout dropdown already use elsewhere in this file.
  fill: {
    type: "dropdown",
    label: "Fill",
    showIf: sa,
    options: [
      { label: "Solid", value: "on" },
      { label: "None", value: "off" }
    ],
    default: "on",
    description: "Whether the shape has a filled interior. None empties it, so a shape with a stroke reads as an outline only."
  },
  color: {
    type: "color",
    label: "Color",
    default: "#e8ff00",
    // Solid, the fill dropdown is gone and this is the material's colour.
    showIf: (e) => ps(e) || e.fill !== "off",
    description: "The shape's colour. Flat, this is the fill and applies only when Fill is Solid; with Depth above 0 it is the colour of the material."
  },
  size: {
    type: "slider",
    label: "Size",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    description: "How big the shape is, as a percentage of the frame."
  },
  width: {
    type: "slider",
    label: "Width",
    min: 20,
    max: 300,
    step: 1,
    default: 140,
    showIf: (e) => e.shape === "rect",
    description: "A Rectangle's width against its height, as a percentage. 100 is square, 300 is three times wider than tall. Rectangle only."
  },
  circleWidth: {
    type: "slider",
    label: "Width",
    min: 20,
    max: 300,
    step: 1,
    default: 100,
    showIf: (e) => e.shape === "circle",
    description: "A Circle's width against its height, as a percentage. 100 is a circle; anything else is an ellipse, 300 three times wider than tall. Circle only."
  },
  corner: {
    type: "slider",
    label: "Corner radius",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    showIf: (e) => e.shape === "rect",
    description: "How rounded a Rectangle's corners are. 0 is sharp; 100 rounds them until the shape becomes a stadium. Rectangle only."
  },
  sides: {
    type: "slider",
    label: "Sides",
    min: 3,
    max: 10,
    step: 1,
    default: 6,
    showIf: (e) => e.shape === "polygon",
    description: "How many sides a Polygon has. 3 is a triangle, 6 a hexagon. Polygon only."
  },
  // Key stays `softness` for scene-file compatibility; "Feather" is the
  // designer-facing term for softening a shape's edge. It belongs up here with
  // the other things that decide what the shape *looks* like, not stranded
  // below the transform block.
  softness: {
    type: "slider",
    label: "Feather",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    showIf: sa,
    description: "How soft the shape's edge is. 0 is crisp; raising it feathers the shape out into a soft blob."
  },
  // ── Stroke ──
  // Zero-is-off, same as Distort's `distort` slider gating `distortSpeed` in
  // the 3D Shape effect — no separate on/off toggle needed, and it means
  // Stroke width and Fill can each go to zero/None independently, so the
  // shape can be fill-only, stroke-only, both, or (rarely, on purpose)
  // neither.
  strokeSize: {
    type: "slider",
    label: "Stroke width",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Stroke",
    showIf: sa,
    description: "How thick the outline is. 0 is off, so a shape can be fill-only, stroke-only, both, or deliberately neither."
  },
  strokeColor: {
    type: "color",
    label: "Stroke color",
    default: "#000000",
    showIf: (e) => sa(e) && e.strokeSize > 0,
    description: "The outline colour. Only once Stroke width is above 0."
  },
  // Depth opens the Material section and everything in it: it is the switch,
  // so it reads as the first thing under that heading rather than as a stray
  // slider among the shape's own controls.
  // ── Depth ──
  // Structural, and it has to be: above 0 this layer stops being a signed
  // distance field on a flat quad and becomes a mesh in a perspective camera
  // with its own render passes. That is a different layer, not a different
  // uniform.
  depth: {
    type: "slider",
    label: "Depth",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Material",
    structural: !0,
    description: "Makes the shape solid. 0 is flat — the shape is drawn as an outline filled with colour, which costs almost nothing. Above 0 it is extruded into real geometry in a real camera, which is what lets it take a material: glass that refracts what is behind it, mirror, chrome, or marble running through its volume. Depth also sets how far light travels through it, so a deeper form tints harder under Glass."
  },
  bevel: {
    type: "slider",
    label: "Bevel",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    showIf: ps,
    description: "How far the edge is rounded off between the face and the wall. 0 is a hard edge; 100 is as much as this shape can take before it runs out of room, measured from the outline rather than fixed. The bevel is what catches a highlight along the edge, and a little of it is most of the difference between a solid and a slab. Only once Depth is above 0."
  },
  // What the solid is made of — the same set the 3D Model layer has, from one
  // definition, so neither can drift from the other.
  ..._n({ gate: ps }),
  // ── Position ──
  // Place it, then turn it: the order Text, Beam and the 3D Shape all use.
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the shape sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the shape vertically, as a percentage of the frame. 0 is centred."
  },
  // ── Rotation ──
  // "Rotate" everywhere — Image said "Rotate", this said "Rotation", Text says
  // "Rotate Z". One verb, optionally qualified by an axis, and unqualified here
  // because this shape only turns in the plane.
  //
  // A lone rotation slider is not a section (Beam's stays ungrouped for exactly
  // that reason). This one has the Anchor under it — the point it turns about —
  // and two controls that belong together are.
  angle: {
    type: "slider",
    label: "Rotate",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    group: "Rotation",
    description: "Turns the shape in the plane, in degrees, about the Anchor."
  },
  // Turning in the plane is Rotate, above; a solid can also be leaned out of
  // it. Deliberately not named "Rotate X/Y" against a bare "Rotate": the axis
  // qualifier only earns its place once there is more than one axis.
  rotateX: {
    type: "slider",
    label: "Rotate X",
    min: -180,
    max: 180,
    step: 1,
    default: 0,
    group: "Rotation",
    showIf: ps,
    description: "Leans the solid toward or away from you, in degrees. Only once Depth is above 0 — a flat shape has no face to turn."
  },
  rotateY: {
    type: "slider",
    label: "Rotate Y",
    min: -180,
    max: 180,
    step: 1,
    default: 0,
    showIf: ps,
    description: "Turns the solid about its vertical axis, in degrees. Only once Depth is above 0."
  },
  ...qo,
  speed: {
    type: "slider",
    label: "Spin Speed",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the shape turns, and which way. Signed: negative reverses, 0 holds it still. Flat, it turns in the plane about the Anchor, adding to Rotate; solid, it turns about the Spin Axis. The rate is identical either way, so crossing Depth does not change the motion. This is an authored rate and nothing rounds it to close the loop, so a spin that does not complete a whole number of turns in the loop length will seam."
  },
  spinAxis: {
    type: "dropdown",
    label: "Spin Axis",
    options: [
      { label: "X", value: "x" },
      { label: "Y", value: "y" },
      { label: "Z", value: "z" },
      { label: "Tumble", value: "tumble" }
    ],
    // Z, not the 3D Model layer's Y: flat, this layer turns in the plane, and
    // defaulting to anything else would mean crossing Depth silently changed
    // the axis of a spin that was already running.
    default: "z",
    showIf: ps,
    // Flat there is only one axis, so offering a choice of one is noise.
    description: "Which axis the solid spins about. Tumble turns it about more than one at once."
  }
}, V0 = Object.fromEntries(
  Object.entries(Cc).map(([e, t]) => [e, t.default])
), _0 = 1.4;
function X0(e) {
  if (!e.startsWith("e1 ")) return [];
  const t = [];
  for (const s of e.slice(3).split("|")) {
    const o = s.split(";").map((n) => n.split(" ").filter(Boolean).map((l) => {
      const [i, u] = l.split(",");
      return new p.Vector2(parseFloat(i), parseFloat(u));
    }));
    if (!o.length || o[0].length < 3) continue;
    const a = new p.Shape(o[0]);
    for (let n = 1; n < o.length; n++) a.holes.push(new p.Path(o[n]));
    t.push(a);
  }
  return t;
}
function vr(e) {
  let t = 0, s = 0;
  for (let o = 0, a = e.length; o < a; o++) {
    const n = e[o], l = e[(o + 1) % a];
    t += n.x * l.y - l.x * n.y, s += Math.hypot(l.x - n.x, l.y - n.y);
  }
  return { area: Math.abs(t) / 2, perimeter: s };
}
function W0(e, t) {
  let s = 0, o = 0;
  for (const a of e) {
    const n = vr(a.getPoints());
    s += n.area, o += n.perimeter;
    for (const l of a.holes) {
      const i = vr(l.getPoints());
      s -= i.area, o += i.perimeter;
    }
  }
  return o <= 0 || s <= 0 ? 0 : Math.min(0.6 * (s / o), 0.45 * t);
}
function G0(e, t) {
  const s = X0(e);
  return s.length ? Ic(s, t) : null;
}
function Ic(e, { depth: t, bevel: s, fit: o = _0, curveSegments: a = 1 }) {
  if (!e.length) return null;
  const n = Math.max(0, Math.min(1, s)) * W0(e, t);
  let l;
  try {
    l = new p.ExtrudeGeometry(e, {
      depth: t,
      bevelEnabled: n > 0,
      bevelThickness: n,
      bevelSize: n,
      bevelSegments: 4,
      curveSegments: a,
      steps: 1
    });
  } catch {
    return null;
  }
  l.computeBoundingBox();
  const i = l.boundingBox;
  if (!i) return null;
  if (o !== null) {
    const u = i.max.x - i.min.x, d = i.max.y - i.min.y, c = o / Math.max(u, d, 1e-6);
    l.scale(c, c, c);
  }
  return l.center(), l;
}
const Ec = (e, t) => ({
  depth: 0.02 + e * 0.58,
  bevel: t
}), oa = (e, t) => typeof e == "number" ? e : t, Y0 = 32, wo = 0.5;
function U0(e, t) {
  const s = wo, o = wo * e, a = Math.min(t, 1) * Math.min(o, s), n = new p.Shape();
  return a <= 1e-6 ? (n.moveTo(-o, -s), n.lineTo(o, -s), n.lineTo(o, s), n.lineTo(-o, s), n.closePath(), n) : (n.moveTo(-o + a, -s), n.lineTo(o - a, -s), n.absarc(o - a, -s + a, a, -Math.PI / 2, 0, !1), n.lineTo(o, s - a), n.absarc(o - a, s - a, a, 0, Math.PI / 2, !1), n.lineTo(-o + a, s), n.absarc(-o + a, s - a, a, Math.PI / 2, Math.PI, !1), n.lineTo(-o, -s + a), n.absarc(-o + a, -s + a, a, Math.PI, Math.PI * 1.5, !1), n.closePath(), n);
}
function j0(e) {
  const t = new p.Shape();
  for (let s = 0; s < e; s++) {
    const o = s / e * Math.PI * 2 + Math.PI / 2, a = Math.cos(o) * wo, n = Math.sin(o) * wo;
    s === 0 ? t.moveTo(a, n) : t.lineTo(a, n);
  }
  return t.closePath(), t;
}
function $0(e) {
  const t = e.shape ?? "rect";
  if (t === "circle") {
    const s = new p.Shape();
    return s.absellipse(0, 0, wo * (oa(e.circleWidth, 100) / 100), wo, 0, Math.PI * 2, !1, 0), [s];
  }
  return t === "polygon" ? [j0(Math.round(oa(e.sides, 6)))] : [U0(oa(e.width, 140) / 100, oa(e.corner, 0) / 100)];
}
const xr = (e) => (e.circleWidth ?? 100) / 100, Wa = Math.PI / 180;
function Mr(e) {
  const t = e.depth / 100, s = (e.bevel ?? 35) / 100;
  return Ic($0(e), {
    ...Ec(t, s),
    // The contours are already the size the layer means — Size scales the mesh
    // on the stage — so nothing re-fits them here.
    fit: null,
    curveSegments: Y0
  });
}
function N0(e, t) {
  const s = Mr(e) ?? new p.BufferGeometry(), o = (n) => [n.shape, n.width, n.circleWidth, n.corner, n.sides, n.depth, n.bevel].join("|");
  let a = o(e);
  return Yn({
    params: e,
    input: t,
    geometry: s,
    transform: (n) => ({
      // Size is the half-height in the flat layer's UV space, where the frame
      // is 1 tall; the stage's frame is 2 × STAGE_HALF_H tall and the mesh is
      // built 1 tall. Hence the doubling.
      scale: n.size / 100 * Wn * 2,
      posX: n.posX / 100,
      posY: n.posY / 100,
      rotX: (n.rotateX ?? 0) * Wa,
      rotY: (n.rotateY ?? 0) * Wa,
      // Rotate, in the plane — the same slider the flat shape turns with.
      rotZ: n.angle * Wa,
      spinAxis: n.spinAxis ?? "y",
      spinSpeed: (n.speed ?? 0) / 100
    }),
    onApply: (n, l) => {
      const i = o(n);
      if (i === a) return;
      a = i;
      const u = Mr(n);
      if (!u) {
        l.setVisible(!1);
        return;
      }
      l.setGeometry(u), u.computeBoundingBox();
      const d = u.boundingBox;
      !l.isMatcap && d && (l.material.thickness = Math.max(d.max.z - d.min.z, 0.01)), l.setVisible(!0);
    }
  });
}
function q0(e, t) {
  if (ps(e)) return N0(e, t);
  const s = e.shape ?? "rect", o = r(new p.Color(e.color)), a = r(e.fill !== "off" ? 1 : 0), n = r(new p.Color(e.strokeColor)), l = r(e.strokeSize / 100 * 0.125), i = r(e.strokeSize > 0 ? 1 : 0), u = r(e.size / 100 * 0.5), d = r(e.width / 100), c = r(xr(e)), h = r(e.corner / 100), m = r(e.angle * (Math.PI / 180));
  let x = e.angle * (Math.PI / 180), g = (e.speed ?? 0) / 100;
  const w = r(new p.Vector2(
    e.posX / 100 * 0.5,
    e.posY / 100 * 0.5
  )), S = r(new p.Vector2(...as(e))), v = r(e.softness / 100 * 0.25), y = r(Math.PI * 2 / e.sides), k = r(Math.cos(Math.PI / e.sides)), A = r(Math.sin(Math.PI / e.sides)), O = r(1), R = (F) => {
    let M = F.sub(0.5).sub(w);
    M = E(M.x.mul(O), M.y), M = Fa(M, E(S.x.mul(O), S.y), m);
    let I;
    if (s === "circle") {
      const V = E(u.mul(c), u), Y = Pe(M.div(V)), U = Pe(M.div(V.mul(V))), j = Ht(U.lessThan(1e-6), ve(V.x, V.y).negate(), Y.mul(Y.sub(1)).div(ne(U, b(1e-6))));
      I = Ht(we(c.sub(1)).lessThan(1e-4), Pe(M).sub(u), j);
    } else if (s === "polygon") {
      const V = Ut(M.x, M.y), Y = tc(V.add(y.mul(0.5)), y).sub(y.mul(0.5));
      let U = Pe(M).mul(E(Ve(Y), we(Ae(Y))));
      U = U.sub(E(u.mul(k), u.mul(A))), U = E(U.x, U.y.add(fe(U.y.negate(), b(0), u.mul(A)))), I = Pe(U).mul(Id(U.x));
    } else {
      const V = E(u.mul(d), u), Y = h.mul(ve(V.x, V.y)), U = we(M).sub(V).add(Y), j = Pe(ne(U, E(0, 0))), X = ve(ne(U.x, U.y), b(0));
      I = j.add(X).sub(Y);
    }
    const f = ne(v, b(15e-4)), D = b(1).sub(Me(f.negate(), f, I)).mul(a), L = b(1).sub(Me(f.negate(), f, we(I).sub(l))).mul(i), B = $(o, n, L), z = ne(D, L);
    return ie(B, z);
  }, T = (F) => {
    o.value.set(F.color), a.value = F.fill !== "off" ? 1 : 0, n.value.set(F.strokeColor), l.value = F.strokeSize / 100 * 0.125, i.value = F.strokeSize > 0 ? 1 : 0, u.value = F.size / 100 * 0.5, d.value = F.width / 100, c.value = xr(F), h.value = F.corner / 100, x = F.angle * (Math.PI / 180), g = (F.speed ?? 0) / 100, w.value.set(F.posX / 100 * 0.5, F.posY / 100 * 0.5), S.value.set(...as(F)), v.value = F.softness / 100 * 0.25, y.value = Math.PI * 2 / F.sides, k.value = Math.cos(Math.PI / F.sides), A.value = Math.sin(Math.PI / F.sides);
  }, C = new p.Vector2();
  return { layerFn: R, updateUniforms: T, renderPass: (F) => {
    m.value = x + Ce() * g * Gn, F.getDrawingBufferSize(C), O.value = C.x / Math.max(1, C.y);
  } };
}
const Z0 = {
  meta: {
    id: "shape2d",
    group: "content",
    name: "Shape",
    description: "A flat rectangle, circle, or polygon with adjustable design params",
    keywords: ["rectangle", "square", "circle", "ellipse", "polygon", "triangle", "vector", "geometry", "clip", "matte", "mask", "stroke", "outline", "border"]
  },
  kind: "generator",
  // Solid, it moves its own mesh for position, interactivity and motion, so
  // the refraction backdrop stays put and only the shape moves — and the
  // compositor must not warp it a second time. Flat, it keeps the shared UV
  // warp it has always had.
  selfPositioned: ps,
  paramSchema: Cc,
  defaultParams: V0,
  buildLayer: q0
}, Fc = {
  radius: {
    type: "slider",
    label: "Radius",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    description: "How big the brush is. Drag, Turbulence and Spread all scale with it, so the whole thing reads as one physical tool rather than as unrelated sliders."
  },
  strength: {
    type: "slider",
    label: "Strength",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "How hard the mark pushes pixels away from its own centre. This is the radial half of the distortion — on its own it reads as a lens stuck to the cursor."
  },
  hardness: {
    type: "slider",
    label: "Hardness",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How sharp the edge of the mark is. 0 falls off softly, 100 gives a hard-edged disc."
  },
  // 75, not 50. Nodes are committed by *distance* and faded by *time*, so a
  // short Tail kills the node behind the head before the hand has travelled far
  // enough to lay the next one and the mark never accumulates into a stroke.
  // Measured at the old default: four live nodes, weights 1.0 / 0.36 / 0.07 /
  // 0.01 — a head and one ghost. Tighter node spacing (see `index.ts`) does most
  // of the repair; this puts the default somewhere the stroke actually reads.
  // Saved scenes keep whatever they stored, so nothing existing moves.
  tail: {
    type: "slider",
    label: "Tail",
    min: 0,
    max: 100,
    step: 1,
    default: 75,
    description: "How long the stroke lingers behind the cursor. 0 leaves only the head; high values accumulate a wake several nodes long."
  },
  // How much the cursor carries the medium along its path, as a fraction of the
  // brush. Strength alone pushes *radially* — every node shoves pixels away from
  // its own centre, which reads as a lens stuck to the cursor rather than as
  // something being dragged through. This is the directional half: the layers
  // below get carried in the direction the hand was actually travelling when
  // each node was laid down, so a stroke leaves a wake that follows the gesture
  // and curves with it.
  //
  // Scaled by Radius, so a bigger brush drags further — the two read as one
  // physical tool rather than as two unrelated sliders.
  drag: {
    type: "slider",
    label: "Drag",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "How much the mark carries the layers below along the direction the cursor was actually travelling. The directional half of the distortion, and what makes a stroke leave a wake that follows the gesture and curves with it. Scales with Radius."
  },
  // An organic field that breaks the mark's edge up, so the cursor reads as
  // something pulled through a medium with a grain to it rather than a clean
  // geometric lens. Local to the mark — the amplitude follows coverage, so it
  // distorts the stroke and leaves the rest of the frame alone. That is what
  // separates it from the Noise Warp effect, which wobbles the whole layer.
  //
  // A parameter, not an entry in the Effect menu. That menu holds *treatments* —
  // blur it, quantise it, invert it — which really are alternatives to each
  // other. This is a *distortion*, the same family as Strength and Drag, and it
  // composes with every one of them: turbulent Pixelate is a different and
  // better thing than either alone, and a dropdown slot would have forced a
  // choice between them.
  //
  // Scaled by Radius like Drag, so the three read as one tool. 0 by default, so
  // no saved scene moves.
  turbulence: {
    type: "slider",
    label: "Turbulence",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How much an organic field breaks up the mark, so the cursor reads as something pulled through a medium with a grain rather than a clean geometric lens. Local to the mark — the rest of the frame is untouched, which is what separates it from the Noise Warp effect. Scales with Radius."
  },
  turbulenceScale: {
    type: "slider",
    label: "Grain",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    showIf: (e) => e.turbulence > 0,
    description: "How fine the turbulence grain is. Only once Turbulence is above 0."
  },
  chromatic: {
    type: "slider",
    label: "Chromatic",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How far the colour channels separate inside the mark, adding a prismatic fringe."
  },
  effect: {
    type: "dropdown",
    label: "Effect",
    options: [
      { label: "None", value: "none" },
      { label: "Motion Blur", value: "motionBlur" },
      { label: "Pixelate", value: "pixelate" },
      // Throws each pixel by its own random offset, so the layers below shatter
      // into stipple inside the mark. The incoherent sibling of the Turbulence
      // parameter below: that one samples a *smooth* fbm field, so neighbouring
      // pixels move together and the artwork warps like a liquid; this one draws
      // an independent offset per pixel, so nothing moves together and the
      // artwork disintegrates into grain instead.
      //
      // It is a treatment, not a distortion knob — it replaces what the mark
      // shows rather than modifying it — which is why it belongs here and
      // Turbulence does not.
      //
      // Best on high-contrast artwork. Because it *moves* pixels rather than
      // mixing them, a two-value image stays two-valued however hard it is
      // thrown: black and white shatter into black and white, never into grey.
      { label: "Scatter", value: "scatter" },
      // Keeps the layers below only inside the mark and paints `bgColor`
      // everywhere else — a knockout, which is what makes a stack of "gradient,
      // then this" read as a trail cut out of the dark. Nothing else in the app
      // does it.
      //
      // Its mirror, "Solid Fill" (value `reveal`, which shipped under the wrong
      // name), used to sit next to it and painted `bgColor` *inside* the mark
      // instead. It is gone. It was the only mode that added ink rather than
      // treating what was below, and that job belongs to Light Trail — `Driven
      // by: Cursor` with `Style: Ink` gives a gradient, a taper, softness, bleed
      // and turbulence. Solid Fill was a strictly worse subset: one flat colour
      // and a hard edge it could not avoid, because `cover` clamps to 1 and so
      // saturates across the whole mark. No saved scene used it.
      { label: "Reveal Below", value: "revealBelow" },
      { label: "Invert Color", value: "invert" }
    ],
    default: "none",
    structural: !0,
    description: "A treatment applied to what shows inside the mark — as opposed to the sliders above, which distort it. Motion Blur smears along the cursor's travel. Pixelate quantises to a grid. Scatter throws each pixel by its own offset so the artwork disintegrates into stipple, best on high-contrast work since moving pixels rather than mixing them keeps a two-value image two-valued. Reveal Below keeps the layers below only inside the mark and paints Background everywhere else, which is what makes a stack read as a trail cut out of the dark. Invert Color flips what is under it."
  },
  // How far Scatter throws a pixel, as a fraction of the brush — Radius again,
  // so it stays in proportion to the tool like Drag and Turbulence. Declared
  // here rather than up with Drag so it lands *below* the Effect menu in the
  // panel, next to the other controls a mode brings with it.
  spread: {
    type: "slider",
    label: "Spread",
    min: 1,
    max: 100,
    step: 1,
    default: 35,
    showIf: (e) => e.effect === "scatter",
    description: "How far Scatter throws a pixel, as a fraction of the brush. Scatter only."
  },
  // How long the Motion Blur shutter stays open, in the cursor's own travel —
  // the smear is `velocity x this`, so it lengthens when the hand moves faster
  // and vanishes when it stops. Deliberately its own control rather than a
  // by-product of Strength: the smear used to be the *displacement* vector
  // scaled, which made Motion Blur a no-op at Strength 0 and tied how far it
  // reached to how hard the layer was being pushed around.
  smear: {
    type: "slider",
    label: "Blur",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    showIf: (e) => e.effect === "motionBlur",
    description: "How long the Motion Blur shutter stays open, measured in the cursor's own travel — the smear lengthens when the hand moves faster and vanishes when it stops. Motion Blur only."
  },
  // The mosaic's cell size, as the *pitch of the grid* rather than a cell count:
  // bigger reads as chunkier, which is the direction the label promises. Stepped
  // geometrically (200 cells down to 8) so each 10 points is the same ratio,
  // rather than spending most of the slider between 199 and 200 cells.
  //
  // 50 lands on exactly 40 cells, which is the fixed grid this used to hardcode
  // — so a scene saved before the control existed looks the same afterwards.
  pixelSize: {
    type: "slider",
    label: "Pixel Size",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    showIf: (e) => e.effect === "pixelate",
    description: "The mosaic's cell pitch: bigger reads as chunkier. Stepped geometrically from 200 cells down to 8, so each 10 points is the same ratio. Pixelate only."
  },
  bgColor: {
    type: "color",
    label: "Background",
    default: "#000000",
    showIf: (e) => e.effect === "revealBelow",
    description: "What gets painted outside the mark. Reveal Below only."
  }
}, K0 = Object.fromEntries(
  Object.entries(Fc).map(([e, t]) => [e, t.default])
), Ao = 32, kr = 40, Sr = 200, Q0 = 8, Pr = (e) => {
  const t = Math.min(1, Math.max(0, e / 100));
  return Math.round(Sr * Math.pow(Q0 / Sr, t));
}, Ga = 2, Ar = 0.3, Tr = 0.05, J0 = 0.05, em = 0.12, tm = 0.5;
function sm(e, t) {
  const s = r(e.radius / 100 * 0.5), o = r(e.strength / 100 * 0.5), a = r(e.hardness / 100 * 0.98), n = r(e.chromatic / 100 * 0.5), l = r((e.drag ?? 50) / 100 * 0.6), i = r((e.turbulence ?? 0) / 100 * 0.4), u = r((e.turbulenceScale ?? 50) / 100 * 12), d = r((e.spread ?? 35) / 100 * 0.5), c = r(1), h = r(new p.Color(e.bgColor)), m = e.effect ?? "none", x = m === "scatter", g = r((e.smear ?? 50) / 100 * Ar), w = r(new p.Vector2(1920, 1080)), S = r(new p.Vector2(40, 40));
  let v = Pr(e.pixelSize ?? 50);
  const y = Array.from({ length: Ao }, () => r(new p.Vector3(0.5, 0.5, 0))), k = Array.from({ length: Ao }, () => r(new p.Vector4(0, 0, 0, 0))), A = 0.02, O = 0.8;
  let R = A;
  const T = (H) => {
    R = A * Math.pow(O / A, Math.min(1, Math.max(0, H / 100)));
  };
  T(e.tail);
  const C = (H) => {
    let q = E(0, 0), ee = b(0), Z = ie(0, 0, 0, 0);
    for (let qe = 0; qe < Ao; qe++) {
      const it = y[qe], yt = H.sub(it.xy), wt = yt.mul(E(c, 1)).length(), Xt = s.mul(a), It = Me(Xt, s, wt).oneMinus().mul(it.z);
      q = q.add(yt.mul(It)), ee = ee.add(It), Z = Z.add(k[qe].mul(It));
    }
    const ae = ee.clamp(0, 1), re = ee.sub(0.5).max(b(0)), be = ee.min(b(0.5)).add(re.mul(-2).exp().oneMinus().mul(0.5)), ye = Z.zw.div(ee.max(b(1e-4))), ke = E(ye.x.mul(c), ye.y), Fe = ke.div(ke.length().max(b(tm))), Le = E(Fe.x.div(c), Fe.y).mul(l).mul(s).mul(be), Oe = () => {
      const qe = E(H.x.mul(c), H.y).mul(u), it = Bt(te(qe.x, qe.y, b(0)), 3, 2, 0.5), yt = Bt(te(qe.x.add(11.3), qe.y.add(5.7), b(2.1)), 3, 2, 0.5);
      return E(it.div(c), yt).mul(i).mul(s).mul(be);
    };
    let Te = E(0, 0);
    if (x) {
      const qe = Be(H.x.mul(w.x)), it = Be(H.y.mul(w.y)), yt = St(qe, it, Ct(40503)).sub(0.5), wt = St(qe, it, Ct(34283)).sub(0.5);
      Te = E(yt.div(c), wt).mul(d).mul(s).mul(be);
    }
    return {
      disp: q.mul(o).sub(Le).add(Te),
      turbAt: Oe,
      cover: ae,
      // The *mean* velocity of the nodes covering this pixel — divided by the
      // raw sum, not the clamped one, or the answer would be scaled by however
      // many brushes happen to overlap here rather than being their average.
      // Deliberately not aspect-corrected: this is the cursor's own UV velocity,
      // so following it traces the path the hand actually took across the canvas.
      vel: Z.xy.div(ee.max(b(1e-4)))
    };
  }, P = r(new p.Vector4(1, 1, 0, 0)), F = (H) => H.x.greaterThanEqual(P.x).and(H.y.greaterThanEqual(P.y)).and(H.x.lessThanEqual(P.z)).and(H.y.lessThanEqual(P.w)), M = st(([H]) => {
    const q = ie(0, 0, 0, 0).toVar();
    return ys(F(H), () => {
      const ee = C(H);
      q.assign(ie(ee.disp, ee.cover, b(0))), ys(i.greaterThan(0), () => {
        q.assign(ie(q.xy.add(ee.turbAt()), q.z, b(0)));
      });
    }), q;
  }), I = st(([H]) => {
    const q = E(0, 0).toVar();
    return ys(F(H), () => {
      q.assign(C(H).vel);
    }), q;
  }), f = /* @__PURE__ */ new Map(), D = (H) => {
    const q = f.get(H);
    if (q) return q;
    const ee = M(H), Z = { disp: ee.xy, cover: ee.z, vel: I(H) };
    return f.set(H, Z), Z;
  }, L = Ke((H) => H.add(D(H).disp)), B = Ke((H) => Ue(H.mul(S)).add(0.5).div(S)), z = Ke((H) => {
    const q = B(H);
    return q.add(D(q).disp);
  }), V = Ke((H) => pe(b(0.5), D(B(H)).cover)), Y = /* @__PURE__ */ new Map(), U = (H) => {
    const q = Y.get(H);
    if (q) return q;
    const ee = g.mul(0.5), Z = L(H), ae = Z.sub(D(H).vel.mul(ee)), re = ae.sub(D(ae).vel.mul(ee)), be = ae.mul(2).sub(Z.add(re).mul(0.5)), ye = St(Be(H.x.mul(w.x)), Be(H.y.mul(w.y)), Ct(0)), ke = [];
    for (let Fe = 0; Fe < kr; Fe++) {
      const Le = ye.add(Fe).div(kr), Oe = Le.oneMinus();
      ke.push({
        at: Z.mul(Oe.mul(Oe)).add(be.mul(Oe.mul(Le).mul(2))).add(re.mul(Le.mul(Le))),
        // Taper along the streak rather than averaging the interval flat. A box
        // average is what a shutter really does, but it ends the streak at full
        // strength — every tap stops at the same distance, so the smear is cut
        // off along a hard arc instead of going out. Weighting the far end down
        // is what makes it read as something being dragged and thinning rather
        // than a stamp with a sharp edge.
        w: Oe
      });
    }
    return Y.set(H, ke), ke;
  }, j = st(([H]) => {
    const q = z(H), ee = D(B(H)).disp.mul(n), Z = te(t(q.add(ee)).r, t(q).g, t(q.sub(ee)).b).toVar();
    return ys(V(H).lessThan(0.5), () => {
      const ae = M(H).xy, re = ae.mul(n), be = H.add(ae);
      Z.assign(te(t(be.add(re)).r, t(be).g, t(be.sub(re)).b));
    }), Z;
  }), X = (H) => {
    const { disp: q, cover: ee } = D(H), Z = q.mul(n), ae = L(H);
    let re = te(
      t(ae.add(Z)).r,
      t(ae).g,
      t(ae.sub(Z)).b
    );
    if (m === "invert")
      re = $(re, re.oneMinus(), ee);
    else if (m === "revealBelow")
      re = $(h, re, ee);
    else if (m === "pixelate")
      re = j(H);
    else if (m === "motionBlur") {
      let be = te(0, 0, 0), ye = b(0);
      for (const { at: ke, w: Fe } of U(H))
        be = be.add(t(ke).rgb.mul(Fe)), ye = ye.add(Fe);
      re = $(re, be.div(ye), ee);
    }
    return ie(re, b(1));
  }, N = m === "motionBlur" ? (H, q) => {
    const { cover: ee } = D(q);
    let Z = b(0), ae = b(0);
    for (const { at: re, w: be } of U(q))
      Z = Z.add(H(re).mul(be)), ae = ae.add(be);
    return $(H(L(q)), Z.div(ae), ee);
  } : m === "pixelate" ? (H, q) => $(H(L(q)), H(z(q)), V(q)) : void 0, G = (H) => {
    s.value = H.radius / 100 * 0.5, o.value = H.strength / 100 * 0.5, a.value = H.hardness / 100 * 0.98, n.value = H.chromatic / 100 * 0.5, l.value = (H.drag ?? 50) / 100 * 0.6, i.value = (H.turbulence ?? 0) / 100 * 0.4, u.value = (H.turbulenceScale ?? 50) / 100 * 12, d.value = (H.spread ?? 35) / 100 * 0.5, g.value = (H.smear ?? 50) / 100 * Ar, v = Pr(H.pixelSize ?? 50), We(), h.value.set(H.bgColor), T(H.tail), _e();
  };
  let W = 0, J = 0, Q = 0, se = 0, K = 0, le = !1, ce = 0, oe = 0, de = 0, me = 0, xe = 0;
  const ge = new p.Vector2(), We = () => {
    S.value.set(Math.max(2, Math.round(v * c.value)), v);
  }, Ge = 2e-3, _e = () => {
    let H = 1 / 0, q = 1 / 0, ee = -1 / 0, Z = -1 / 0;
    for (const be of y) {
      const ye = be.value;
      ye.z < Ge || (ye.x < H && (H = ye.x), ye.x > ee && (ee = ye.x), ye.y < q && (q = ye.y), ye.y > Z && (Z = ye.y));
    }
    if (H > ee) {
      P.value.set(1, 1, 0, 0);
      return;
    }
    const ae = s.value / c.value, re = s.value;
    P.value.set(H - ae, q - re, ee + ae, Z + re);
  }, Ye = (H) => {
    H.getDrawingBufferSize(ge), c.value = ge.x / Math.max(1, ge.y), w.value.copy(ge), We();
    const q = Jt();
    q > 0 && _(q), _e();
  }, _ = (H) => {
    const q = Math.pow(0.5, H / R);
    for (const Te of y) Te.value.z *= q;
    const ee = ns();
    if (!ee.active) {
      le = !1;
      return;
    }
    const Z = ee.x * 0.5 + 0.5, ae = ee.y * 0.5 + 0.5;
    if (!le) {
      W = (W + 1) % Ao, y[W].value.set(Z, ae, 1), ce = 0, oe = 0, de = 0, me = 0, xe = 0, k[W].value.set(0, 0, 0, 0), se = Z, K = ae, J = Z, Q = ae, le = !0;
      return;
    }
    const re = Math.abs(Z - J) >= 1e-4 || Math.abs(ae - Q) >= 1e-4;
    if (xe += H, re) {
      const Te = 1 - Math.exp(-xe / Tr);
      ce += ((Z - J) / xe - ce) * Te, oe += ((ae - Q) / xe - oe) * Te, xe = 0;
    } else if (xe > J0) {
      const Te = 1 - Math.exp(-H / Tr);
      ce -= ce * Te, oe -= oe * Te;
    }
    const be = Math.hypot(ce, oe);
    if (be > Ga && (ce = ce / be * Ga, oe = oe / be * Ga), re) {
      const Te = 1 - Math.exp(-H / em);
      de += (ce - de) * Te, me += (oe - me) * Te;
    }
    if (k[W].value.set(ce, oe, de, me), !re) return;
    J = Z, Q = ae;
    const ye = (Z - se) * c.value, ke = ae - K, Fe = Math.min(0.2, Math.max(4e-3, s.value * 0.15)), Le = Math.hypot(ye, ke), Oe = y[W].value;
    Oe.set(Z, ae, Math.max(Oe.z, Math.min(1, Le / Fe))), Le >= Fe && (Oe.z = 1, W = (W + 1) % Ao, y[W].value.set(Z, ae, 0), k[W].value.set(ce, oe, de, me), se = Z, K = ae);
  };
  return { layerFn: X, updateUniforms: G, renderPass: Ye, warpUv: L, maskFn: N };
}
const om = {
  meta: {
    id: "mouseTrail",
    name: "Mouse Trail",
    description: "Displaces the layers below along a fading trail of the cursor",
    keywords: ["cursor", "pointer", "interactive", "hover", "smear", "drag", "ripple", "tail"],
    group: "distort"
  },
  kind: "processor",
  // The whole effect is the cursor's path, so it responds whatever its params say.
  usesPointer: () => !0,
  // per-channel offsets + a 6-tap smear — see `resampling` in types/effects.ts.
  resampling: !0,
  // The smear drags the silhouette with it, so a clip follows the mark instead
  // of cropping it back to where the base was drawn. Only consulted when the
  // layer is clipped — an unclipped Mouse Trail is untouched by this.
  transformsSilhouette: !0,
  paramSchema: Fc,
  defaultParams: K0,
  buildLayer: sm
}, am = [
  "Albert Sans",
  "Alegreya",
  "Alfa Slab One",
  "Anton",
  "Antonio",
  "Anybody",
  "Archivo",
  "Archivo Black",
  "Azeret Mono",
  "Barlow",
  "Bebas Neue",
  "Big Shoulders Display",
  "Bodoni Moda",
  "Bricolage Grotesque",
  "Bungee",
  "Chivo",
  "Cormorant Garamond",
  "Courier Prime",
  "Crimson Pro",
  "DM Mono",
  "DM Sans",
  "DM Serif Display",
  "EB Garamond",
  "Epilogue",
  "Familjen Grotesk",
  "Figtree",
  "Fira Code",
  "Fragment Mono",
  "Fraunces",
  "Geist",
  "Geist Mono",
  "Gloock",
  "Hanken Grotesk",
  "IBM Plex Mono",
  "IBM Plex Sans",
  "IBM Plex Serif",
  "Instrument Sans",
  "Instrument Serif",
  "Inter",
  "Inter Tight",
  "JetBrains Mono",
  "Karla",
  "Lexend",
  "Libre Baskerville",
  "Libre Caslon Display",
  "Literata",
  "Lora",
  "Manrope",
  "Martian Mono",
  "Merriweather",
  "Newsreader",
  "Oswald",
  "Outfit",
  "Playfair Display",
  "Plus Jakarta Sans",
  "Public Sans",
  "Red Hat Display",
  "Red Hat Mono",
  "Roboto Mono",
  "Rubik",
  "Schibsted Grotesk",
  "Sora",
  "Source Code Pro",
  "Source Sans 3",
  "Source Serif 4",
  "Space Grotesk",
  "Space Mono",
  "Spectral",
  "Staatliches",
  "Syne",
  "Unbounded",
  "Urbanist",
  "Vollkorn",
  "Work Sans",
  "Young Serif",
  "Zilla Slab"
], nm = /* @__PURE__ */ new Set([
  "Albert Sans",
  "Alegreya",
  "Anybody",
  "Archivo",
  "Azeret Mono",
  "Barlow",
  "Bodoni Moda",
  "Chivo",
  "Cormorant Garamond",
  "Courier Prime",
  "Crimson Pro",
  "DM Mono",
  "DM Sans",
  "DM Serif Display",
  "EB Garamond",
  "Epilogue",
  "Familjen Grotesk",
  "Figtree",
  "Fragment Mono",
  "Fraunces",
  "Geist",
  "Geist Mono",
  "Hanken Grotesk",
  "IBM Plex Mono",
  "IBM Plex Sans",
  "IBM Plex Serif",
  "Instrument Sans",
  "Instrument Serif",
  "Inter",
  "Inter Tight",
  "JetBrains Mono",
  "Karla",
  "Libre Baskerville",
  "Literata",
  "Lora",
  "Merriweather",
  "Newsreader",
  "Playfair Display",
  "Plus Jakarta Sans",
  "Public Sans",
  "Red Hat Display",
  "Red Hat Mono",
  "Roboto Mono",
  "Rubik",
  "Schibsted Grotesk",
  "Source Code Pro",
  "Source Sans 3",
  "Source Serif 4",
  "Space Mono",
  "Spectral",
  "Urbanist",
  "Vollkorn",
  "Work Sans",
  "Zilla Slab"
]), Cr = (e) => String(e.text ?? "").includes(`
`), rm = (e) => e.repeatX > 1 || e.repeatY > 1 || e.moveX !== 0 || e.moveY !== 0, Lc = {
  text: {
    type: "text",
    label: "Text",
    default: "WARPKIT",
    placeholder: "Type something…",
    // Enter makes a line. A tour list, a credit block or an address is one
    // object with one type size, not six layers that have to be talked into
    // agreeing — and only the text engine can set them on a shared baseline
    // grid, which is what makes the rhythm even.
    multiline: !0,
    description: "The words to set. Enter makes a new line — a tour list, a credit block or an address is one layer on a shared baseline grid, not six layers talked into agreeing."
  },
  font: {
    type: "dropdown",
    label: "Font",
    options: am.map((e) => ({ label: e, value: e })),
    default: "Anton",
    description: "The typeface. A curated set of Google fonts, loaded on demand, listed A–Z."
  },
  weight: {
    type: "dropdown",
    label: "Weight",
    options: [
      { label: "Light", value: "300" },
      { label: "Regular", value: "400" },
      { label: "Medium", value: "500" },
      { label: "Semibold", value: "600" },
      { label: "Bold", value: "700" },
      { label: "Extrabold", value: "800" },
      { label: "Black", value: "900" }
    ],
    default: "700",
    description: "How heavy the face is drawn."
  },
  style: {
    type: "dropdown",
    label: "Style",
    options: [
      { label: "Roman", value: "normal" },
      { label: "Italic", value: "italic" }
    ],
    default: "normal",
    showIf: (e) => nm.has(e.font),
    description: "Roman or a real italic. Only offered for families that ship a genuine italic cut — a sheared upright is a smeared face, not an italic. Slant is the deliberate geometric version."
  },
  /**
   * A type size: one em, as a percentage of the frame height. Size 20 sets the
   * text at a fifth of the frame — the same fifth whether it says "ICA" or
   * "Glad Cafe + Glasgow", whether it holds one line or seven, and whatever the
   * canvas ratio. Two layers at the same Size match, which is the whole point:
   * it is what lets a date column and a venue column be built as two layers and
   * still read as one setting.
   *
   * It used to be a fill fraction — the block was scaled down until it fitted
   * the frame — so a long string came out smaller than a short one at the same
   * number, and Size silently meant "% of width" for wide text and "% of height"
   * for tall. Type now overruns and crops instead, which is a layout you can
   * choose rather than a resize you can't predict.
   *
   * Ceiling is 400 — four times the frame height — because oversized cropped
   * type is a real layout. Half steps because the low end is where blocks live:
   * six lines filling two thirds of a poster is Size 10, and whole numbers there
   * are 10% jumps in type size.
   */
  // Labelled "Font size", not "Size", though it is this layer's size control and
  // sits where every other layer's Size sits. The block used to be the thing
  // that got sized, and those two readings are the whole reason this control was
  // confusing — so the label now says which one it is instead of leaving it to
  // be discovered.
  size: {
    type: "slider",
    label: "Font size",
    min: 1,
    max: 400,
    step: 0.5,
    default: 20,
    description: "One em, as a percentage of the frame height. Size 20 sets the type at a fifth of the frame — the same fifth whether it holds one line or seven, and whatever the canvas ratio, so two layers at the same Size match. Type overruns and crops rather than shrinking to fit, so a long string stays the size you asked for."
  },
  // Baseline to baseline, as a percentage of the font size — the same unit the
  // type is set in, so the rhythm survives a change of size. Most faces' own
  // line box is ~120%; display type set as a block usually wants tighter than
  // that, hence a floor below 100.
  //
  // Both this and Alignment describe how lines relate to each other, so both are
  // inert on a single line — there is no second baseline to place, and the box
  // hugs the only line there is. Shown once there's a second line, rather than
  // sitting in the panel doing nothing on every headline in the app.
  leading: {
    type: "slider",
    label: "Line height",
    min: 70,
    max: 250,
    step: 1,
    default: 110,
    showIf: Cr,
    description: "Baseline to baseline, as a percentage of the font size, so the rhythm survives a change of Size. Most faces' own line box is about 120; display type set as a block usually wants tighter. Only shown once there is a second line."
  },
  align: {
    type: "dropdown",
    display: "segmented",
    label: "Alignment",
    // Ragged where the setting leaves the lines ragged, flush where it doesn't:
    // the icon is a picture of the result, so it doesn't have to be read.
    options: [
      { label: "Left", value: "left", icon: "M2 3.5h12M2 6.5h7M2 9.5h12M2 12.5h7" },
      { label: "Centre", value: "center", icon: "M2 3.5h12M4.5 6.5h7M2 9.5h12M4.5 12.5h7" },
      { label: "Right", value: "right", icon: "M2 3.5h12M7 6.5h7M2 9.5h12M7 12.5h7" }
    ],
    default: "center",
    showIf: Cr,
    description: "How the lines sit against each other. Only shown once there is a second line — a single line has nothing to align to."
  },
  color: {
    type: "color",
    label: "Color",
    default: "#ffffff",
    description: "The type colour."
  },
  // ── Shape ──
  // Type-design vocabulary, not transform vocabulary: you are choosing a width
  // and a slant the way you would pick a cut, not scaling a box. 0 is the drawn
  // proportion in each case, so every control reads as a departure from the
  // typeface rather than as an arbitrary number, and 0/0/0/0 is always the font
  // as its designer drew it.
  //
  // Width and Height run to ±200 rather than ±100. The scale is unchanged —
  // every 100 is still one doubling (`stretchOf` = 2^(v/100)) — so a scene built
  // at the old ends looks identical; the track simply carries on, from a quarter
  // to four times the drawn proportion. ±100 stopped exactly where a compressed
  // column or a stretched slab starts to be worth having, which is a ceiling in
  // the wrong place. The raster follows: `maybeRescale` sizes the glyph source by
  // the stretch as well, so a 4× letterform is drawn from a bigger bitmap instead
  // of a magnified one.
  width: {
    type: "slider",
    label: "Width",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Shape",
    description: "How wide the letterforms are drawn, against the face's own proportion. 0 is as drawn and every 100 is one doubling, so 200 is four times as wide and -200 a quarter. This stretches the strokes; Tracking moves letters apart without thickening them."
  },
  height: {
    type: "slider",
    label: "Height",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "How tall the letterforms are drawn, against the face's own proportion. 0 is as drawn, every 100 one doubling."
  },
  slant: {
    type: "slider",
    label: "Slant",
    min: -60,
    max: 60,
    step: 1,
    default: 0,
    description: "A geometric slant, in degrees, for when you want an oblique the family does not provide. 0 is upright. Not the same as Italic, which is a separately drawn cut."
  },
  // The print word for the space between letters, and the one the rest of this
  // panel's vocabulary asks for — Spacing is already taken, by the gap between
  // *copies* under Replicate, and two controls called spacing on one layer is a
  // coin toss every time you reach for one. Measured in hundredths of an em, so
  // it holds its proportion as Size changes: 10 is 0.10em, the loose caps
  // setting; negative tightens. Unlike Width, this moves the letters apart
  // rather than stretching them, so the strokes keep their drawn weight.
  tracking: {
    type: "slider",
    label: "Tracking",
    min: -20,
    max: 100,
    step: 1,
    default: 0,
    description: "The space between letters, in hundredths of an em, so it holds its proportion as Size changes. 10 is 0.10em — the loose caps setting; negative tightens. Moves the letters apart rather than stretching them, so the strokes keep their drawn weight."
  },
  // ── Position ──
  // Where the type sits, standing still. What it does *over time* is Animation,
  // at the bottom.
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the type sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the type vertically, as a percentage of the frame. 0 is centred."
  },
  // ── Rotation ──
  // X and Y tip the plane away from the viewer in perspective; Z spins it in
  // the plane. Listed X, Y, Z — the order the 3D Shape already uses and the one
  // an axis triple is read in anywhere else. Z came first here only because it
  // existed first, as `angle`; the key stays that so existing scenes keep their
  // rotation, and only the reading order changes.
  rotateX: {
    type: "slider",
    label: "Rotate X",
    min: -70,
    max: 70,
    step: 1,
    default: 0,
    group: "Rotation",
    description: "Tips the type plane away from the viewer about the horizontal axis, in perspective."
  },
  rotateY: {
    type: "slider",
    label: "Rotate Y",
    min: -70,
    max: 70,
    step: 1,
    default: 0,
    description: "Tips the type plane away from the viewer about the vertical axis, in perspective."
  },
  angle: {
    type: "slider",
    label: "Rotate Z",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "Spins the type in its own plane, in degrees, about the Anchor."
  },
  ...qo,
  // ── Replicate ──
  repeatX: {
    type: "slider",
    label: "Repeat X",
    min: 1,
    max: 20,
    step: 1,
    default: 1,
    group: "Replicate",
    description: "How many copies sit across the frame. 1 is a single setting."
  },
  repeatY: {
    type: "slider",
    label: "Repeat Y",
    min: 1,
    max: 20,
    step: 1,
    default: 1,
    description: "How many copies sit down the frame."
  },
  // The gap between *copies*, made the only way a fixed grid allows: by drawing
  // the type smaller inside a cell whose pitch is 1/Repeat. So it applies only
  // where there are copies — on a single still word it would just be a second,
  // quieter Size, which is exactly the confusion Size was rewritten to end.
  spacing: {
    type: "slider",
    label: "Spacing",
    min: 0,
    max: 90,
    step: 1,
    default: 15,
    showIf: rm,
    description: "The gap between copies, made by drawing the type smaller inside its cell. Only applies where copies exist — Repeat above 1, or a scroll running."
  },
  // ── Animation ──
  // How it moves — always last, as everywhere else. This is Tile's conveyor, not
  // a second Position: the type drifts endlessly and wraps, at the authored rate.
  // Hence the name it carries in Tile, Flow Field and Noise Fill — the keys stay
  // `moveX`/`moveY` so existing scenes and their keyframes are untouched.
  moveX: {
    type: "slider",
    label: "Scroll X",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the type drifts sideways and wraps, and which way. Signed. This is a conveyor rather than a second Position: it runs at the rate you set and never arrives."
  },
  moveY: {
    type: "slider",
    label: "Scroll Y",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    description: "How fast the type drifts vertically and wraps, and which way. Signed."
  }
}, im = Object.fromEntries(
  Object.entries(Lc).map(([e, t]) => [e, t.default])
);
function Rc(e, t, s) {
  const o = e * (Math.PI / 180), a = Math.cos(o), n = Math.sin(o);
  return [
    0.5 * (Math.abs(a) + Math.abs(a * t - n) / s),
    0.5 * (Math.abs(n) * s + Math.abs(n * t + a))
  ];
}
const lm = (e) => (e ?? "").split(`
`);
function Dc(e, t, s) {
  e.font = `${t.italic ? "italic " : ""}${t.weight} ${s}px "${t.font}", sans-serif`, e.letterSpacing = `${s * (t.tracking / 100)}px`;
}
function vn(e, t, s) {
  Dc(e, t, s);
  const o = lm(t.text), a = e.measureText("Hg"), n = a.fontBoundingBoxAscent || s * 0.8, l = a.fontBoundingBoxDescent || s * 0.2, i = s * (t.tracking / 100), u = (w) => w ? Math.max(0, e.measureText(w).width - i) : 0, d = s * t.leading, c = s * 0.03, h = s * 0.03, m = Math.max(2, Math.ceil(Math.max(1, ...o.map(u)) + c * 2)), x = Math.max(2, Math.ceil((o.length - 1) * d + n + l + h * 2)), g = t.align === "left" ? c : t.align === "right" ? m - c + i : m / 2 + i / 2;
  return {
    lines: o,
    width: m,
    height: x,
    emH: x / s,
    aspect: m / x,
    firstBaseline: h + n,
    lineH: d,
    x: g
  };
}
const Ir = 1024, Er = [300, 400, 500, 600, 700, 800, 900], cm = (e, t) => `${e}|${t ? 1 : 0}`, Fr = /* @__PURE__ */ new Map(), xn = /* @__PURE__ */ new Set(), Hc = (e, t, s) => `${s ? "italic " : ""}${t} 200px "${e}"`;
function um(e, t) {
  const s = cm(e, t);
  let o = Fr.get(s);
  if (!o) {
    const a = t ? `ital,wght@${Er.map((l) => `1,${l}`).join(";")}` : `wght@${Er.join(";")}`, n = document.createElement("link");
    n.rel = "stylesheet", n.href = `https://fonts.googleapis.com/css2?family=${e.replace(/ /g, "+")}:${a}&display=swap`, o = new Promise((l) => {
      n.addEventListener("load", () => l(), { once: !0 }), n.addEventListener("error", () => l(), { once: !0 });
    }), document.head.appendChild(n), Fr.set(s, o);
  }
  return o;
}
function dm(e, t, s) {
  return xn.has(Hc(e, t, s));
}
async function Lr(e, t = 700, s = !1) {
  const o = Hc(e, t, s);
  if (!xn.has(o) && (await um(e, s), !!document.fonts)) {
    try {
      await document.fonts.load(o);
    } catch {
    }
    xn.add(o);
  }
}
function hm(e, t) {
  const s = document.createElement("canvas");
  s.width = Ir, s.height = Ir;
  const o = s.getContext("2d"), a = new p.CanvasTexture(s);
  a.colorSpace = p.SRGBColorSpace, a.generateMipmaps = !1, a.minFilter = p.LinearFilter, a.magFilter = p.LinearFilter, a.wrapS = p.ClampToEdgeWrapping, a.wrapT = p.ClampToEdgeWrapping;
  let n = e.text, l = e.font, i = e.weight ?? "700", u = e.style === "italic", d = e.tracking ?? 0;
  const c = (oe) => (oe.leading ?? 110) / 100;
  let h = c(e), m = e.align ?? "center", x = 1.2, g = s.width, w = s.height;
  const S = r(new p.Color(e.color)), v = r(new p.Vector2(e.repeatX, e.repeatY)), y = r(e.angle * (Math.PI / 180)), k = r(new p.Vector2(e.moveX / 100 * 0.2, e.moveY / 100 * 0.2)), A = r(new p.Vector2(e.posX / 100 * 0.5, e.posY / 100 * 0.5)), O = r(new p.Vector2(0, 0)), R = r(1), T = r(1), C = r(0.24), P = r(new p.Vector2(0, 0)), F = r(new p.Vector2(0, 0)), M = r(0), I = r(new p.Vector2(1, 1)), f = r(new p.Vector2(...as(e))), D = r(new p.Vector2(0.5, 0.5)), L = (oe, de) => oe > 1 || de !== 0 ? 1 : 0, B = (oe) => P.value.set(
    L(oe.repeatX, oe.moveX),
    L(oe.repeatY, oe.moveY)
  );
  B(e);
  const z = (oe) => Math.pow(2, oe / 100), V = (oe) => {
    const de = (oe.rotateX ?? 0) * (Math.PI / 180), me = (oe.rotateY ?? 0) * (Math.PI / 180);
    F.value.set(Math.sin(me), Math.sin(de)), M.value = Math.tan((oe.slant ?? 0) * (Math.PI / 180)), I.value.set(
      z(oe.width ?? 0),
      z(oe.height ?? 0)
    );
  };
  V(e);
  const Y = () => D.value.set(
    ...Rc(y.value * (180 / Math.PI), M.value, R.value)
  );
  Y();
  let U = 256, j = 1080, X = e.size, N = e.spacing;
  function G() {
    const de = P.value.x > 0 || P.value.y > 0 ? 1 - N / 100 : 1;
    C.value = x * (X / 100) * de;
  }
  G();
  function W() {
    if (!dm(l, i, u)) return;
    const oe = { text: n ?? "", font: l, weight: i, italic: u, tracking: d, leading: h, align: m };
    let de = U, me = vn(o, oe, de);
    const xe = 4096;
    (me.width > xe || me.height > xe) && (de = Math.max(8, Math.floor(de * Math.min(xe / me.width, xe / me.height))), me = vn(o, oe, de)), s.width = me.width, s.height = me.height, o.clearRect(0, 0, s.width, s.height), o.fillStyle = "#ffffff", o.textAlign = m, o.textBaseline = "alphabetic", Dc(o, oe, de), me.lines.forEach((ge, We) => {
      ge && o.fillText(ge, me.x, me.firstBaseline + We * me.lineH);
    }), T.value = me.aspect, x = me.emH, G(), (s.width !== g || s.height !== w) && (g = s.width, w = s.height, a.dispose()), a.needsUpdate = !0;
  }
  W(), Lr(l, i, u).then(W);
  const J = (oe) => {
    const de = oe.sub(0.5).sub(A).sub(f), me = E(de.x.mul(R), de.y), xe = E(me.x.add(me.y.mul(M)), me.y), ge = Ve(y), We = Ae(y), Ge = E(
      xe.x.mul(ge).sub(xe.y.mul(We)),
      xe.x.mul(We).add(xe.y.mul(ge))
    ), _e = E(Ge.x.div(R), Ge.y).add(f).add(0.5), _ = _e.add(k.mul(O)).mul(v), H = E(
      $(_.x, Se(_.x), P.x),
      $(_.y, Se(_.y), P.y)
    ), q = C.mul(T).div(R).mul(I.x).mul(v.x), ee = C.mul(I.y).mul(v.y), Z = E(H.x.sub(0.5).div(q), H.y.sub(0.5).div(ee)), ae = E(
      $(f.x.mul(v.x).div(q), b(0), P.x),
      $(f.y.mul(v.y).div(ee), b(0), P.y)
    ), re = Z.sub(ae), be = b(1).add(F.x.mul(re.x)).add(F.y.mul(re.y)), ye = re.div(ne(be, b(0.05))).add(ae).add(0.5), ke = nt(a, ye), Fe = pe(we(_e.x.sub(0.5)), D.x), Le = pe(we(_e.y.sub(0.5)), D.y), Oe = $(b(1), Fe, P.x).mul($(b(1), Le, P.y)), Te = pe(b(0), ye.x).mul(pe(ye.x, b(1))).mul(pe(b(0), ye.y)).mul(pe(ye.y, b(1)));
    return ie(S, ke.a.mul(Oe).mul(Te));
  }, Q = (oe) => {
    S.value.set(oe.color), v.value.set(oe.repeatX, oe.repeatY), y.value = oe.angle * (Math.PI / 180), k.value.set(oe.moveX / 100 * 0.2, oe.moveY / 100 * 0.2), A.value.set(oe.posX / 100 * 0.5, oe.posY / 100 * 0.5), f.value.set(...as(oe)), B(oe), V(oe), X = oe.size, N = oe.spacing, G();
    const de = oe.text, me = oe.font, xe = oe.weight ?? "700", ge = oe.style === "italic", We = oe.tracking ?? 0, Ge = c(oe), _e = oe.align ?? "center";
    if (de !== n || me !== l || xe !== i || ge !== u || We !== d || Ge !== h || _e !== m) {
      const Ye = me !== l || xe !== i || ge !== u;
      n = de, l = me, i = xe, u = ge, d = We, h = Ge, m = _e, Ye ? Lr(l, i, u).then(W) : W();
    }
  };
  function se() {
    const oe = Math.max(I.value.x, I.value.y, 1), de = j * (C.value / Math.max(1e-4, x)) * oe, me = Math.max(1e-4, T.value), xe = Math.floor(4e3 / (x * Math.max(1, me))), ge = Math.max(64, Math.min(2048, xe, Math.round(de * 1.1)));
    (ge > U * 1.15 || ge < U * 0.6) && (U = ge, W());
  }
  const K = new p.Vector2();
  return { layerFn: J, updateUniforms: Q, renderPass: (oe) => {
    const de = Ce();
    O.value.set(de, de), oe.getDrawingBufferSize(K), R.value = K.x / Math.max(1, K.y), j = Math.max(1, K.y), Y(), se();
  }, dispose: () => {
    a.dispose();
  } };
}
const mm = {
  meta: {
    id: "text",
    group: "content",
    name: "Text",
    description: "Editable text with Google fonts; replicate, move and rotate",
    keywords: ["type", "typography", "typeface", "font", "letters", "glyph", "word", "headline", "caption", "copy"]
  },
  kind: "generator",
  paramSchema: Lc,
  defaultParams: im,
  buildLayer: hm
}, pm = "Shapes by Mo, https://shapes.gallery/", ao = Array.from({ length: 72 }, (e, t) => {
  const s = t + 1, o = String(s).padStart(2, "0");
  return {
    id: `gallery-${o}`,
    label: `Shape ${o}`,
    url: `/shapes/gallery/gallery-${o}.svg`,
    keywords: ["shape", "abstract", "svg", "gallery"]
  };
});
new Map(ao.map((e) => [e.url, e]));
const Oc = (e) => typeof e.outline == "string" && e.outline.length > 0, fs = (e) => Oc(e) && e.depth > 0, Rr = (e) => !fs(e), Bc = {
  src: {
    type: "image",
    label: "Image",
    default: "",
    // Where an uploaded SVG's contours are kept. See ImageParam.outlineKey.
    outlineKey: "outline",
    // Depth simply not being there is the wrong way to say "this artwork has no
    // outline" — the absence looks like a missing feature, or a bug. The
    // contours are captured when the file is chosen, so artwork added before
    // that existed has none either, and re-choosing the same file fixes it.
    // Only said once there is artwork to say it about.
    note: (e) => e.src && !e.outline ? "No outline to make solid, so there is no Depth. That needs an SVG — choose one here, or pick the same file again if it was added earlier." : null,
    description: `The image to draw. Uploaded images live in the assets bucket and are referenced by URL — never inline the bytes into the scene. ${ao.length} built-in shapes need no upload: set src to any of "${ao[0].url}" through "${ao[ao.length - 1].url}" (zero-padded, gallery-01 to gallery-` + String(ao.length).padStart(2, "0") + `). Each is a plain abstract vector mark with no name or theme beyond its number — pick one for texture or a silhouette, not for depicting anything specific. ${pm}.`
  },
  // Written by the image control when an SVG is dropped in, never edited
  // directly — there is no control for it and there should not be. A logo is
  // a few kilobytes of contours, so unlike the picture itself it rides in the
  // scene rather than the assets bucket.
  outline: {
    type: "text",
    label: "Outline",
    default: "",
    showIf: () => !1,
    description: "The contours of an uploaded SVG, kept so the layer can be made solid. Written when the file is chosen; not editable."
  },
  fit: {
    type: "dropdown",
    label: "Fit",
    options: [
      { label: "Contain", value: "contain" },
      { label: "Cover", value: "cover" },
      // Both are measured in pixels, and a solid has none — it is contours.
      { label: "Stretch", value: "stretch", showIf: Rr },
      { label: "Actual size", value: "actual", showIf: Rr }
    ],
    default: "contain",
    description: "How the image is placed in the frame. Contain fits the whole image and leaves margins; Cover fills the frame and crops the overflow; Stretch distorts it to the frame exactly; Actual size draws it at its own pixel dimensions."
  },
  scale: {
    type: "slider",
    label: "Scale",
    min: 1,
    max: 300,
    step: 1,
    default: 100,
    description: "Scales the image, as a percentage of however Fit placed it — 100 means as Fit placed it, not the image's own pixels. A small source is already blown up well past its real size at 100, which is why the range runs down to 1."
  },
  // Depth opens the Material section and everything in it: it is the switch,
  // so it reads as the first thing under that heading rather than as a stray
  // slider up among the transform controls.
  depth: {
    type: "slider",
    label: "Depth",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Material",
    structural: !0,
    showIf: Oc,
    description: "Makes the artwork solid. 0 draws the picture flat, as it always has. Above 0 the outline is extruded into real geometry in a real camera, which is what lets it take a material: glass that refracts what is behind it, mirror, chrome, or marble running through its volume. Only for an SVG — a photograph has no outline to make solid."
  },
  bevel: {
    type: "slider",
    label: "Bevel",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    showIf: fs,
    description: "How far the edge is rounded off between the face and the wall. 0 is a hard edge; 100 is as much as this artwork can take before its own strokes run out of room, which is measured from the outline rather than fixed — the same bevel that barely marks a bold letter would shatter a hairline. Only once Depth is above 0."
  },
  // Scale is a multiplier on the *fit*, so 100 means "as Fit placed it", not
  // "the image's own pixels". A small source — a 64px sprite on a 1920 canvas —
  // is therefore blown up ~20x at 100, and the old floor of 10 could only bring
  // it back to twice its real size. Down to 1 there is always a way back.
  // Lowering the floor cannot disturb existing work: a stored scale keeps its
  // number, and only the range the slider will *reach* changes.
  color: {
    type: "color",
    label: "Color",
    default: "#ffffff",
    group: "Material",
    showIf: fs,
    // The contours carry no colour — a multi-coloured logo merges into one
    // silhouette when it becomes one solid — so a solid needs a colour of its
    // own. Flat, the picture supplies it and this would be a lie.
    description: "The colour of the material. Only once Depth is above 0: the contours of an SVG carry no colour of their own, so a solid takes one here. A multi-coloured mark becomes a single solid."
  },
  // What the solid is made of — the same set the 3D Model and Shape layers
  // have, from one definition, so none of them can drift from the others.
  ..._n({ gate: fs }),
  // ── Position ──
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the image sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the image vertically, as a percentage of the frame. 0 is centred."
  },
  // ── Rotation ──
  // The Anchor sits with the rotation it is the pivot for, rather than alone at
  // the bottom of the panel where the spread used to leave it.
  angle: {
    type: "slider",
    label: "Rotate",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    group: "Rotation",
    description: "Turns the image, in degrees, about the Anchor."
  },
  rotateX: {
    type: "slider",
    label: "Rotate X",
    min: -180,
    max: 180,
    step: 1,
    default: 0,
    group: "Rotation",
    showIf: fs,
    description: "Leans the solid toward or away from you, in degrees. Only once Depth is above 0 — flat artwork has no face to turn."
  },
  rotateY: {
    type: "slider",
    label: "Rotate Y",
    min: -180,
    max: 180,
    step: 1,
    default: 0,
    showIf: fs,
    description: "Turns the solid about its vertical axis, in degrees. Only once Depth is above 0."
  },
  ...qo,
  speed: {
    type: "slider",
    label: "Spin Speed",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the artwork turns, and which way. Signed: negative reverses, 0 holds it still. Flat, it turns in the plane about the Anchor, adding to Rotate; solid, it turns about the Spin Axis. The rate is identical either way, so crossing Depth does not change the motion. This is an authored rate and nothing rounds it to close the loop, so a spin that does not complete a whole number of turns in the loop length will seam."
  },
  spinAxis: {
    type: "dropdown",
    label: "Spin Axis",
    options: [
      { label: "X", value: "x" },
      { label: "Y", value: "y" },
      { label: "Z", value: "z" },
      { label: "Tumble", value: "tumble" }
    ],
    // Z, not the 3D Model layer's Y: flat, this layer turns in the plane, and
    // defaulting to anything else would mean crossing Depth silently changed
    // the axis of a spin that was already running.
    default: "z",
    showIf: fs,
    // Flat there is only one axis, so offering a choice of one is noise.
    description: "Which axis the solid spins about. Tumble turns it about more than one at once."
  }
}, fm = Object.fromEntries(
  Object.entries(Bc).map(([e, t]) => [e, t.default])
), Ya = Math.PI / 180, Dr = (e, t) => typeof e == "number" ? e : t;
function gm(e, t) {
  const s = (c) => G0(
    c.outline ?? "",
    Ec(c.depth / 100, (c.bevel ?? 35) / 100)
  ), o = s(e) ?? new p.BufferGeometry(), a = (c) => [c.outline, c.depth, c.bevel].join("|");
  let n = a(e), l = 1, i = 1, u = e.fit ?? "contain";
  function d(c) {
    c.computeBoundingBox();
    const h = c.boundingBox;
    h && (i = Math.max(h.max.y - h.min.y, 1e-6), l = Math.max(h.max.x - h.min.x, 1e-6) / i);
  }
  return d(o), Yn({
    params: e,
    input: t,
    geometry: o,
    transform: (c) => ({
      // Just the Scale slider. How big the artwork sits in the frame is Fit's
      // business, resolved per frame in `frameScale` below — the same way the
      // flat layer resolves it, so crossing Depth 0 does not move anything.
      scale: c.scale / 100,
      posX: c.posX / 100,
      posY: c.posY / 100,
      rotX: (c.rotateX ?? 0) * Ya,
      rotY: (c.rotateY ?? 0) * Ya,
      rotZ: c.angle * Ya,
      spinAxis: c.spinAxis ?? "y",
      spinSpeed: (c.speed ?? 0) / 100
    }),
    frameScale: (c) => {
      const h = Wn * 2, m = h * c, x = c > l;
      return ((u === "cover" ? !x : x) ? h : m / l) / Math.max(i, 1e-6);
    },
    onApply: (c, h) => {
      u = c.fit ?? "contain";
      const m = a(c);
      if (m === n) return;
      n = m;
      const x = s(c);
      if (!x) {
        h.setVisible(!1);
        return;
      }
      h.setGeometry(x), d(x), x.computeBoundingBox();
      const g = x.boundingBox;
      !h.isMatcap && g && (h.material.thickness = Math.max(g.max.z - g.min.z, 0.01)), h.setVisible(!0);
    }
  });
}
function bm(e, t) {
  if (fs(e)) return gm(e, t);
  const s = new p.Texture();
  s.colorSpace = p.SRGBColorSpace, s.wrapS = p.ClampToEdgeWrapping, s.wrapT = p.ClampToEdgeWrapping, s.minFilter = p.LinearFilter, s.magFilter = p.LinearFilter;
  let o = e.src, a = e.fit, n = e.scale / 100, l = 1, i = 1, u = 1, d = !1;
  const c = r(new p.Vector2(e.posX / 100 * 0.5, e.posY / 100 * 0.5)), h = r(e.angle * (Math.PI / 180));
  let m = e.angle * (Math.PI / 180), x = Dr(e.speed, 0) / 100;
  const g = r(new p.Vector2(1, 1)), w = r(new p.Vector2(...as(e))), S = r(1), v = r(0);
  function y(C) {
    if (!C) {
      d = !1, v.value = 0;
      return;
    }
    const P = new Image();
    C.startsWith("data:") || (P.crossOrigin = "anonymous"), P.onload = () => {
      s.image = P, s.needsUpdate = !0, i = Math.max(1, P.width), u = Math.max(1, P.height), l = i / u, d = !0, v.value = 1, Ea(C);
    }, P.onerror = () => {
      d = !1, v.value = 0, Ia(C);
    }, P.src = C;
  }
  y(o);
  const k = (C) => {
    const P = C.sub(0.5).sub(c), F = E(P.x.mul(S), P.y), M = Fa(F, E(w.x.mul(S), w.y), h), I = E(M.x.div(S), M.y).mul(g).add(0.5), f = I.x.greaterThanEqual(0).and(I.x.lessThanEqual(1)), D = I.y.greaterThanEqual(0).and(I.y.lessThanEqual(1)), L = b(f.and(D)).mul(v), B = nt(s, I);
    return ie(B.rgb, B.a.mul(L));
  }, A = (C) => {
    c.value.set(C.posX / 100 * 0.5, C.posY / 100 * 0.5), w.value.set(...as(C)), m = C.angle * (Math.PI / 180), x = Dr(C.speed, 0) / 100, n = C.scale / 100, a = C.fit, C.src !== o && (o = C.src, y(o));
  }, O = new p.Vector2();
  return { layerFn: k, updateUniforms: A, renderPass: (C, P) => {
    h.value = m + Ce() * x * Gn, C.getDrawingBufferSize(O);
    const F = O.x / Math.max(1, O.y);
    S.value = F;
    let M = 1, I = 1;
    if (d && a === "actual")
      M = P.width / i, I = P.height / u;
    else if (d && a !== "stretch") {
      const f = F > l;
      a === "cover" ? f ? I = l / F : M = F / l : f ? M = F / l : I = l / F;
    }
    g.value.set(M / n, I / n);
  }, dispose: () => {
    s.dispose();
  } };
}
const ym = {
  meta: {
    id: "image",
    group: "content",
    name: "Image",
    description: "Upload a picture or an SVG as a layer, or pick one of 72 built-in shapes; position, scale and rotate it",
    keywords: [
      "photo",
      "picture",
      "bitmap",
      "upload",
      "png",
      "jpg",
      "svg",
      "vector",
      "texture",
      "logo",
      "artwork",
      "shape",
      "shapes",
      "built-in shapes",
      "icon",
      "mark",
      "silhouette",
      "gallery"
    ]
  },
  kind: "generator",
  // Solid, it moves its own mesh for position, interactivity and motion, so the
  // refraction backdrop stays put and only the artwork moves — and the
  // compositor must not warp it a second time. Flat, it keeps the shared UV
  // warp it has always had.
  selfPositioned: fs,
  paramSchema: Bc,
  defaultParams: fm,
  buildLayer: bm
}, wm = "Clip by Pachón in Motion, https://www.instagram.com/pachon.in.motion/", Mn = [
  {
    id: "gallery-01",
    label: "Warp",
    url: "/video/gallery/gallery-01.mp4",
    keywords: ["warp", "streaks", "burst", "abstract", "loop"]
  }
];
new Map(Mn.map((e) => [e.url, e]));
const zc = {
  src: {
    type: "video",
    label: "Video",
    default: Mn[0].url,
    description: `The video to draw, muted and looping — there is no audio pipeline, so sound is never decoded. "${Mn[0].label}" is a first-party clip that costs nothing to store, so it renders, saves, shares and exports on every plan. Uploading your own clip is Warp Speed, the same split as the Image and 3D Model layers, for the same reason: it's heavier bytes than anything procedural, and it's the one kind of layer content this app cannot generate a moderation-free guarantee for. ${wm}.`
  },
  fit: {
    type: "dropdown",
    label: "Fit",
    options: [
      { label: "Contain", value: "contain" },
      { label: "Cover", value: "cover" },
      { label: "Stretch", value: "stretch" },
      { label: "Actual size", value: "actual" }
    ],
    default: "cover",
    description: "How the video is placed in the frame. Contain fits the whole frame and leaves margins; Cover fills the frame and crops the overflow; Stretch distorts it to the frame exactly; Actual size draws it at its own pixel dimensions."
  },
  scale: {
    type: "slider",
    label: "Scale",
    min: 1,
    max: 300,
    step: 1,
    default: 100,
    description: "Scales the video, as a percentage of however Fit placed it — 100 means as Fit placed it, not the source's own pixels."
  },
  // ── Position ──
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the video sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the video vertically, as a percentage of the frame. 0 is centred."
  },
  // ── Rotation ──
  angle: {
    type: "slider",
    label: "Rotate",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    group: "Rotation",
    description: "Turns the video, in degrees, about the Anchor."
  },
  ...qo,
  // ── Animation — always last ──
  playbackSpeed: {
    type: "slider",
    label: "Playback Speed",
    min: 25,
    max: 400,
    step: 1,
    default: 100,
    group: "Animation",
    description: "A plain multiplier on the source's own playback rate — 100 is exactly as filmed. Never adjusted to force a loop to close; a speed set here is the speed that plays, on the timeline and in the exported file alike."
  },
  playMode: {
    type: "dropdown",
    label: "Play mode",
    options: [
      { label: "Loop", value: "loop" },
      { label: "Once", value: "once" }
    ],
    default: "loop",
    description: "Loop repeats the clip from its start the instant it ends. Once plays through a single time and holds the last frame. Neither trims or blends the source, so footage that wasn't shot to loop will seam at the repeat — the built-in clip is cut to close cleanly; your own upload may not."
  }
}, vm = Object.fromEntries(
  Object.entries(zc).map(([e, t]) => [e, t.default])
);
function xm(e, t) {
  const s = document.createElement("video");
  s.muted = !0, s.playsInline = !0, s.loop = e.playMode !== "once", s.playbackRate = e.playbackSpeed / 100;
  const o = new p.VideoTexture(s);
  o.colorSpace = p.SRGBColorSpace, o.wrapS = p.ClampToEdgeWrapping, o.wrapT = p.ClampToEdgeWrapping, o.minFilter = p.LinearFilter, o.magFilter = p.LinearFilter;
  let a = e.src, n = e.fit, l = e.scale / 100, i = 1, u = 1, d = 1, c = !1, h = e.playbackSpeed / 100, m = e.playMode, x = Number.NaN;
  const g = r(new p.Vector2(e.posX / 100 * 0.5, e.posY / 100 * 0.5)), w = r(e.angle * (Math.PI / 180)), S = r(new p.Vector2(1, 1)), v = r(new p.Vector2(...as(e))), y = r(1), k = r(0);
  function A(L) {
    if (!L) {
      c = !1, k.value = 0, s.removeAttribute("src"), s.load();
      return;
    }
    L.startsWith("data:") || (s.crossOrigin = "anonymous"), c = !1, k.value = 0, s.src = L, s.load();
  }
  s.addEventListener("loadeddata", () => {
    u = Math.max(1, s.videoWidth), d = Math.max(1, s.videoHeight), i = u / d, c = !0, k.value = 1, Ea(a), x = Number.NaN;
  }), s.addEventListener("error", () => {
    c = !1, k.value = 0, Ia(a);
  }), s.addEventListener("seeked", () => {
    o.needsUpdate = !0;
  }), A(a);
  const O = (L) => {
    const B = L.sub(0.5).sub(g), z = E(B.x.mul(y), B.y), V = Fa(z, E(v.x.mul(y), v.y), w), Y = E(V.x.div(y), V.y).mul(S).add(0.5), U = Y.x.greaterThanEqual(0).and(Y.x.lessThanEqual(1)), j = Y.y.greaterThanEqual(0).and(Y.y.lessThanEqual(1)), X = b(U.and(j)).mul(k), N = nt(o, Y);
    return ie(N.rgb, N.a.mul(X));
  }, R = (L) => {
    g.value.set(L.posX / 100 * 0.5, L.posY / 100 * 0.5), v.value.set(...as(L)), w.value = L.angle * (Math.PI / 180), l = L.scale / 100, n = L.fit, m = L.playMode, h = L.playbackSpeed / 100, s.loop = m !== "once", L.src !== a && (a = L.src, A(a));
  }, T = 0.25, C = 1 / 20;
  let P = Number.NaN;
  function F(L) {
    Math.abs(P - L) < 1e-4 || (P = L, s.currentTime = L);
  }
  function M() {
    const L = s.duration;
    if (!c || !L || !isFinite(L)) return;
    const B = Ce(), z = B !== x;
    x = B;
    const V = B * h, Y = Math.max(0, L - C), U = m === "once" && V >= Y, j = U ? Y : (V % L + L) % L;
    if (!z || U) {
      s.paused || s.pause(), Math.abs(s.currentTime - j) > C && F(j);
      return;
    }
    s.paused && s.play().catch(() => {
    }), s.playbackRate !== h && (s.playbackRate = h);
    const X = Math.abs(s.currentTime - j);
    X > T && X < L - T && F(j);
  }
  const I = new p.Vector2();
  return { layerFn: O, updateUniforms: R, renderPass: (L, B) => {
    const z = M();
    L.getDrawingBufferSize(I);
    const V = I.x / Math.max(1, I.y);
    y.value = V;
    let Y = 1, U = 1;
    if (c && n === "actual")
      Y = B.width / u, U = B.height / d;
    else if (c && n !== "stretch") {
      const j = V > i;
      n === "cover" ? j ? U = i / V : Y = V / i : j ? Y = V / i : U = i / V;
    }
    return S.value.set(Y / l, U / l), z;
  }, dispose: () => {
    s.pause(), s.removeAttribute("src"), s.load(), o.dispose();
  } };
}
const Mm = {
  meta: {
    id: "video",
    group: "content",
    name: "Video",
    description: "Play a muted, looping video clip as a layer; position, scale and rotate it",
    keywords: [
      "clip",
      "footage",
      "movie",
      "upload",
      "mp4",
      "webm",
      "loop",
      "background video",
      "motion background"
    ]
  },
  kind: "generator",
  paramSchema: zc,
  defaultParams: vm,
  buildLayer: xm
}, Vc = {
  input: {
    type: "device",
    label: "Input",
    device: "audio",
    default: "",
    description: "Which audio input to listen to. Any input the machine has: a built-in microphone, an interface, or a virtual loopback device (BlackHole, Loopback) carrying another application's output — which is how a player or a DAW drives a scene. Nothing is recorded, uploaded or saved; the sound is measured in the browser, frame by frame, and only the four numbers below ever leave this layer. The scene remembers which input it wants, never a permission: a saved scene asks again when it is opened, because the browser grants access to a person clicking, not to a file. To drive a scene from music the machine is playing, on macOS: in Audio MIDI Setup build a Multi-Output Device holding both the speakers and a loopback device, make it the system output, then choose the loopback device here. The Multi-Output Device itself is never in this list and never will be — it is an output, with no input to read; it is what keeps the music audible while the loopback device carries a copy to the browser. Two things make a Multi-Output Device go silent, and both look like a broken setup: the physical output has to be ticked in it alongside the loopback device and set as the primary (clock) device, and a Multi-Output Device ignores the volume keys — the level is the one on the underlying device or in the player, so a muted device stays muted however hard the keys are pressed.",
    // The one thing about this control that cannot be worked out by looking at
    // it: the device you built is not the device you pick. Shown while nothing
    // is chosen, which is exactly when someone is reading the list for a name
    // that is not there, and gone the moment a choice is made.
    note: (e) => e.input ? null : "A Multi-Output Device will not appear in this list — it is an output, with nothing to read. To drive a scene from what this machine is playing, put your speakers and a loopback device (BlackHole) in one Multi-Output Device in Audio MIDI Setup, make that the system output, then choose the loopback device here."
  },
  // ── Response ──
  attack: {
    type: "slider",
    label: "Attack",
    min: 0,
    max: 100,
    step: 1,
    default: 85,
    group: "Response",
    description: "How quickly a param rises when a sound arrives. High is instant, which is what makes a kick land as a hit; low rounds the front off a transient so the movement swells instead of snapping."
  },
  release: {
    type: "slider",
    label: "Release",
    min: 0,
    max: 100,
    step: 1,
    default: 70,
    description: "How slowly it falls again once the sound stops. This is the control that decides whether a beat reads as a pulse or as a flicker — a fast attack with a slow release is the shape almost everything wants. Turn it up for a long swell, down for a twitch."
  }
}, km = Object.fromEntries(
  Object.entries(Vc).map(([e, t]) => [e, t.default])
), Sm = { level: 0, low: 0, mid: 0, high: 0, active: !1 };
function Pm() {
  return Sm;
}
function Am(e) {
  return e.attack, e.release, { layerFn: () => ie(0, 0, 0, 0), updateUniforms: (o) => {
    o.attack, o.release;
  } };
}
const Tm = {
  meta: {
    id: "audio",
    group: "live",
    name: "Audio",
    description: "Listen to a track, a tab, an input or the room, and drive any slider in the scene from what it hears",
    keywords: [
      "audio",
      "sound",
      "mic",
      "microphone",
      "music",
      "reactive",
      "react",
      "live",
      "input",
      "beat",
      "bass",
      "treble",
      "spectrum",
      "level",
      "vu",
      "loud",
      "song",
      "track",
      "mp3",
      "spotify",
      "visualiser",
      "visualizer",
      "tab audio"
    ]
  },
  kind: "generator",
  // Draws nothing; it exists so other layers' sliders have something to hear.
  signalSource: "audio",
  paramSchema: Vc,
  defaultParams: km,
  buildLayer: Am
}, _c = {
  input: {
    type: "device",
    label: "Camera",
    device: "video",
    default: "",
    description: "Which camera to look through. Nothing is recorded, uploaded or saved: the frames are decoded in the browser, drawn, and thrown away. The scene remembers which camera it wants, never a permission — a saved scene asks again when it is opened, because the browser grants access to a person clicking, not to a file. Nothing ever opens a camera on its own: a shared link and a presentation link offer the viewer a button that names what is being asked for, and until it is pressed — or if it is refused — this layer simply draws nothing and the rest of the work carries on. An embed on someone else's site is not offered it at all. This is a live layer, so it belongs in the editor rather than in a video you intend to keep — an export records whatever the camera happens to be doing while it renders, at whatever pace the render runs, not at the pace it happened. To put footage in an export, record a clip and use the Video layer.",
    note: (e) => e.input ? null : "Everything above this layer in the stack works on the live picture — run a Liquid, Smudge or Halftone over it and it processes the feed."
  },
  fit: {
    type: "dropdown",
    label: "Fit",
    options: [
      { label: "Contain", value: "contain" },
      { label: "Cover", value: "cover" },
      { label: "Stretch", value: "stretch" }
    ],
    default: "cover",
    description: "How the picture is placed in the frame. Contain fits the whole frame and leaves margins; Cover fills the frame and crops the overflow; Stretch distorts it to the frame exactly. There is no Actual size: a camera has no authored dimensions, only whatever the device handed over."
  },
  scale: {
    type: "slider",
    label: "Scale",
    min: 1,
    max: 300,
    step: 1,
    default: 100,
    description: "Scales the picture, as a percentage of however Fit placed it — 100 means as Fit placed it, not the camera's own pixels."
  },
  // ── Position ──
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the picture sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the picture vertically, as a percentage of the frame. 0 is centred."
  },
  // ── Rotation ──
  angle: {
    type: "slider",
    label: "Rotate",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    group: "Rotation",
    description: "Turns the picture, in degrees, about the Anchor."
  },
  ...qo
}, Cm = Object.fromEntries(
  Object.entries(_c).map(([e, t]) => [e, t.default])
);
let Im = null;
const Hr = /* @__PURE__ */ new Set();
function Xc(e) {
  return Hr.add(e), e(Im), () => {
    Hr.delete(e);
  };
}
function Em(e) {
  const t = document.createElement("video");
  t.muted = !0, t.playsInline = !0, t.autoplay = !0;
  const s = new p.VideoTexture(t);
  s.colorSpace = p.SRGBColorSpace, s.wrapS = p.ClampToEdgeWrapping, s.wrapT = p.ClampToEdgeWrapping, s.minFilter = p.LinearFilter, s.magFilter = p.LinearFilter;
  let o = e.fit, a = e.scale / 100, n = 1, l = !1;
  const i = r(new p.Vector2(e.posX / 100 * 0.5, e.posY / 100 * 0.5)), u = r(e.angle * (Math.PI / 180)), d = r(new p.Vector2(1, 1)), c = r(new p.Vector2(...as(e))), h = r(1), m = r(0);
  t.addEventListener("loadedmetadata", () => {
    n = Math.max(1, t.videoWidth) / Math.max(1, t.videoHeight), l = !0, m.value = 1;
  });
  const x = Xc((k) => {
    k ? (t.srcObject = k, t.play().catch(() => {
    })) : (t.srcObject = null, l = !1, m.value = 0);
  }), g = (k) => {
    const A = k.sub(0.5).sub(i), O = E(A.x.mul(h), A.y), R = Fa(O, E(c.x.mul(h), c.y), u), T = E(R.x.div(h), R.y).mul(d).add(0.5), C = T.x.greaterThanEqual(0).and(T.x.lessThanEqual(1)), P = T.y.greaterThanEqual(0).and(T.y.lessThanEqual(1)), F = b(C.and(P)).mul(m), M = nt(s, E(T.x.oneMinus(), T.y));
    return ie(M.rgb, M.a.mul(F));
  }, w = (k) => {
    i.value.set(k.posX / 100 * 0.5, k.posY / 100 * 0.5), c.value.set(...as(k)), u.value = k.angle * (Math.PI / 180), a = k.scale / 100, o = k.fit;
  }, S = new p.Vector2();
  return { layerFn: g, updateUniforms: w, renderPass: (k, A) => {
    k.getDrawingBufferSize(S);
    const O = S.x / Math.max(1, S.y);
    h.value = O;
    let R = 1, T = 1;
    if (l && o !== "stretch") {
      const C = O > n;
      o === "cover" ? C ? T = n / O : R = O / n : C ? R = O / n : T = n / O;
    }
    d.value.set(R / a, T / a);
  }, dispose: () => {
    x(), t.pause(), t.srcObject = null, s.dispose();
  } };
}
const Fm = {
  meta: {
    id: "camera",
    group: "live",
    name: "Camera Image",
    description: "Draw a webcam as a layer — everything above it in the stack processes the live picture. Add Camera Signal instead to react to a camera without showing it",
    keywords: [
      "camera",
      "webcam",
      "video input",
      "live",
      "capture",
      "facetime",
      "cam",
      "selfie",
      "mirror",
      "feed",
      "stream",
      "real time",
      "realtime",
      "face"
    ]
  },
  kind: "generator",
  paramSchema: _c,
  defaultParams: Cm,
  buildLayer: Em
}, Wc = {
  input: {
    type: "device",
    label: "Camera",
    device: "video",
    default: "",
    description: "Which camera to read. Nothing is drawn, recorded, uploaded or saved: the frames are measured in the browser — how much is moving, roughly where, and how light the room is — and thrown away. Four numbers are all that ever leaves this layer, which is what lets a scene react to whoever is in front of it without ever showing them. Add a Camera Image layer as well if you want the picture too; both read the one camera. The scene remembers which camera it wants, never a permission: a shared link and a presentation link offer the viewer a button, and until it is pressed — or if it is refused — every param bound to this layer holds at the value you gave it. Live, so it belongs in the editor rather than in a video you intend to keep: an export reads whatever the room is doing while it renders, at whatever pace the render runs, not at the pace it happened.",
    note: (e) => e.input ? null : "This layer draws nothing. It puts Motion, Sideways, Up-down, Presence and Light on every slider in the stack."
  },
  // ── Response ──
  attack: {
    type: "slider",
    label: "Attack",
    min: 0,
    max: 100,
    step: 1,
    default: 80,
    group: "Response",
    description: "How quickly Motion rises when something moves. High is instant, which is what makes a wave land as a hit; low rounds the front off so the movement swells instead of snapping."
  },
  release: {
    type: "slider",
    label: "Release",
    min: 0,
    max: 100,
    step: 1,
    default: 75,
    description: "How slowly Motion falls again once the room goes still — the control that decides whether a gesture reads as a pulse or as a flicker."
  },
  smoothing: {
    type: "slider",
    label: "Smoothing",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "How softly Sideways, Up-down and Presence follow the people in front of the camera. Sideways and Up-down are where they are while they move, Presence is how much of the frame they fill; once nobody is moving, both positions glide back to the middle. Low tracks closely; high glides after them, taking about a second to arrive at 100, which is what a tilt or a pan wants."
  }
}, Lm = Object.fromEntries(
  Object.entries(Wc).map(([e, t]) => [e, t.default])
), ht = { motion: 0, moveX: 0, moveY: 0, presence: 0, bright: 0, active: !1 };
function Rm() {
  return ht;
}
function Or() {
  ht.motion = 0, ht.moveX = 0, ht.moveY = 0, ht.presence = 0, Pa = Aa = Un = 0, fa = ga = ba = 0, Zt = null, Oo = 0, ro = 0, ht.bright = 0, ht.active = !1;
}
const qs = 64, _o = 48;
let kt = null, no = null, Xo = null, Ws = null, kn = 0, Sa = Number.NaN, Wo = Number.NaN, To = null, Br = !1;
function Dm(e) {
  e !== Br && (Br = e, e ? (kt = document.createElement("video"), kt.muted = !0, kt.playsInline = !0, kt.autoplay = !0, no = document.createElement("canvas"), no.width = qs, no.height = _o, Xo = no.getContext("2d", { willReadFrequently: !0 }), To = Xc((t) => {
    kt && (t ? (kt.srcObject = t, kt.play().catch(() => {
    })) : (kt.srcObject = null, Ws = null, Sa = Number.NaN, Wo = Number.NaN, Or()));
  })) : (To == null || To(), To = null, kt == null || kt.pause(), kt && (kt.srcObject = null), kt = null, no = null, Xo = null, Ws = null, kn = 0, Sa = Number.NaN, Wo = Number.NaN, Or()));
}
let oo = 1, Co = 0;
const Hm = 0.4, Om = 0.25;
let Gc = 40, Yc = 4, Uc = 0.22;
function zr(e, t, s) {
  Gc = 2 * Math.pow(60, Math.min(100, Math.max(0, e)) / 100), Yc = 2 * Math.pow(60, (100 - Math.min(100, Math.max(0, t))) / 100);
  const o = Number.isFinite(s) ? s : 50;
  Uc = 0.04 * Math.pow(30, Math.min(100, Math.max(0, o)) / 100);
}
const Bm = 2, zm = 12, Vr = 0.08, Vm = 0.01, _m = 0.3, Xm = 0.01, _r = 15e-4, Wm = 0.1, Gm = 0.8;
let ro = 0, Zt = null, Oo = 0, Pa = 0, Aa = 0, Un = 0, fa = 0, ga = 0, ba = 0;
function jc(e) {
  const t = 1 - Math.exp(-e / (Uc / 2));
  fa += (Pa - fa) * t, ga += (Aa - ga) * t, ba += (Un - ba) * t, ht.moveX += (fa - ht.moveX) * t, ht.moveY += (ga - ht.moveY) * t, ht.presence += (ba - ht.presence) * t;
}
function Ym(e, t, s) {
  const o = e.length;
  if (!Zt) {
    Zt = e.slice();
    return;
  }
  const a = Math.min(1, Math.max(0, s - _r) / (Xm - _r)), n = a > ro ? Wm : Gm;
  ro += (a - ro) * (1 - Math.exp(-t / n));
  let l = 0, i = 0;
  for (let w = 0; w < o; w++) {
    const S = e[w] - Zt[w];
    S > -0.15 && S < 0.15 && (l += S, i++);
  }
  l = i ? l / i : 0;
  const u = 1 - Math.exp(-t / Bm), d = 1 - Math.exp(-t / zm);
  let c = 0, h = 0, m = 0, x = 0;
  for (let w = 0; w < o; w++) {
    const S = Math.abs(e[w] - Zt[w] - l);
    if (S > Vr) {
      c++;
      const v = S - Vr;
      h += v, m += v * (w % qs), x += v * (w / qs | 0), Zt[w] += (e[w] - Zt[w]) * d;
    } else
      Zt[w] += (e[w] - Zt[w]) * u;
  }
  const g = c / o;
  Oo = g > 0.6 ? Oo + t : 0, Oo > 1.5 && (Zt = e.slice(), Oo = 0), Un = Math.min(1, g / _m), g > Vm && h > 0 ? (Pa = -(m / h / (qs - 1) * 2 - 1) * ro, Aa = -(x / h / (_o - 1) * 2 - 1) * ro) : (Pa = 0, Aa = 0);
}
function Um() {
  if (!kt || !Xo || !no || kt.readyState < 2 || !kt.videoWidth) return;
  const e = Jt();
  if (e === 0) {
    ht.active = !0;
    return;
  }
  const t = kt.currentTime;
  if (t === Sa) return Xr(e);
  Sa = t, Xo.drawImage(kt, 0, 0, qs, _o);
  const s = Xo.getImageData(0, 0, qs, _o).data, o = qs * _o, a = new Float32Array(o);
  let n = 0;
  for (let x = 0; x < o; x++) {
    const g = x * 4, w = (s[g] * 0.299 + s[g + 1] * 0.587 + s[g + 2] * 0.114) / 255;
    a[x] = w, n += w;
  }
  const l = n / o;
  if (Ws && jm(Ws, a)) return Xr(e);
  const i = Number.isFinite(Wo) ? Math.min(1 / 5, Math.max(1 / 120, t - Wo)) : 0;
  Wo = t;
  let u = 0, d = 0;
  if (Ws && i > 0) {
    const x = l - kn;
    for (let g = 0; g < o; g++) {
      const w = Math.abs(a[g] - Ws[g] - x);
      w < 0.04 || (d++, u += w);
    }
  }
  const c = i > 0 ? u / o / i : 0;
  Ws = a, kn = l, Co = c > Co ? c : Co - Co * Hm * e, oo = c < oo ? c : oo + (c - oo) * Om * e;
  const h = Co - oo, m = h > 1e-9 ? Math.min(1, Math.max(0, (c - oo) / h)) : 0;
  $c(m, e), (i > 0 || !Zt) && Ym(a, i, d / o), jc(e), ht.bright = l, ht.active = !0;
}
function Xr(e) {
  $c(ht.motion, e), jc(e), ht.active = !0;
}
function jm(e, t) {
  for (let s = 0; s < e.length; s++) if (e[s] !== t[s]) return !1;
  return !0;
}
function $c(e, t) {
  const s = e > ht.motion ? Gc : Yc;
  ht.motion += (e - ht.motion) * Math.min(1, s * t);
}
function $m(e) {
  return zr(e.attack, e.release, e.smoothing), { layerFn: () => ie(0, 0, 0, 0), updateUniforms: (o) => {
    zr(o.attack, o.release, o.smoothing);
  } };
}
const Nm = {
  meta: {
    id: "cameraSignal",
    group: "live",
    name: "Camera Signal",
    description: "Read a camera without showing it — drive any slider from how much is moving, where it is moving, and how light the room is",
    keywords: [
      "camera",
      "signal",
      "motion",
      "movement",
      "webcam",
      "reactive",
      "react",
      "live",
      "gesture",
      "wave",
      "presence",
      "room",
      "tracking",
      "brightness",
      "light",
      "hands free",
      "installation",
      "interactive"
    ]
  },
  kind: "generator",
  // Draws nothing; it exists so other layers' sliders have something to watch.
  signalSource: "camera",
  paramSchema: Wc,
  defaultParams: Lm,
  buildLayer: $m
}, Nc = {
  amount: {
    type: "slider",
    label: "Amount",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    description: "How much noise is mixed into the image. 0 is clean; past about 60 the grain starts to dominate flat areas rather than sit on them."
  },
  size: {
    type: "slider",
    label: "Size",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    description: "How big a single speck is. This runs opposite to the underlying cell count — sliding right makes specks bigger by asking for fewer of them. Low values give fine ISO-like sand, high values give coarse visible flecks."
  },
  animate: {
    type: "slider",
    label: "Animate",
    min: 0,
    max: 100,
    step: 1,
    default: 60,
    group: "Animation",
    description: "How fast the grain field is replaced, reaching 24 distinct fields a second at 100. 0 freezes it into a static texture; high values give the restless flicker of projected film."
  }
}, qm = Object.fromEntries(
  Object.entries(Nc).map(([e, t]) => [e, t.default])
), Zm = 24;
function Km(e, t) {
  const s = r(e.amount / 100), o = r(Wr(e.size)), a = r(1), n = r(0), l = (h) => {
    const m = t(h), x = E(h.x.mul(a), h.y).mul(o), w = St(Be(x.x), Be(x.y), n.toUint()).sub(0.5).mul(s);
    return ie(m.rgb.add(w).clamp(0, 1), m.a);
  };
  let i = e.animate / 100;
  const u = (h) => {
    s.value = h.amount / 100, o.value = Wr(h.size), i = h.animate / 100;
  }, d = new p.Vector2();
  return { layerFn: l, updateUniforms: u, renderPass: (h) => {
    h.getDrawingBufferSize(d), a.value = d.x / Math.max(1, d.y);
    const m = i * Zm;
    if (m <= 0) {
      n.value = 0;
      return;
    }
    n.value = Math.floor(Ce() * m) % 65536;
  } };
}
function Wr(e) {
  return 60 + (1 - e / 100) * 1400;
}
const Qm = {
  meta: {
    id: "grain",
    name: "Grain",
    description: "Film grain noise, optionally animated",
    keywords: ["noise", "film", "static", "speckle", "dust", "sand", "analog", "analogue", "texture", "iso", "dither"],
    group: "stylise"
  },
  kind: "processor",
  paramSchema: Nc,
  defaultParams: qm,
  buildLayer: Km
}, aa = (e) => e.style === "vhs", qc = {
  // CRT is the clean monitor; VHS is the same glass playing a worn tape.
  style: {
    type: "dropdown",
    label: "Style",
    options: [
      { label: "CRT", value: "crt" },
      { label: "VHS", value: "vhs" }
    ],
    default: "crt",
    structural: !0,
    description: "Which screen it is. CRT is a clean tube monitor: scanlines and a phosphor grid behind curved glass. VHS plays the picture off a worn tape instead — no phosphor grid, but colour that bleeds sideways, wobbling lines and speckled noise."
  },
  // Counted across the frame, not in pixels: the screen looks the same in the
  // editor, on a shared page and in a 4K export.
  lines: {
    type: "slider",
    label: "Lines",
    min: 60,
    max: 480,
    step: 1,
    default: 240,
    description: "How many scanlines fill the frame top to bottom. Fewer is chunkier, like an old arcade cabinet; more is finer, like a studio monitor. Counted across the frame, so it looks the same at any export size."
  },
  scanlines: {
    type: "slider",
    label: "Scanlines",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How dark the gaps between the lines are. 0 hides them."
  },
  mask: {
    type: "slider",
    label: "Mask",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    showIf: (e) => !aa(e),
    description: "How visible the grid of red, green and blue phosphor stripes the picture is made of. 0 hides it. CRT only."
  },
  bleed: {
    type: "slider",
    label: "Bleed",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    showIf: aa,
    description: "How far colour smears sideways past the edges it belongs to, the way tape blurs colour. VHS only."
  },
  wobble: {
    type: "slider",
    label: "Wobble",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    showIf: aa,
    description: "How much bands of lines jitter sideways, as if the tracking were slipping. VHS only."
  },
  noise: {
    type: "slider",
    label: "Noise",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    showIf: aa,
    description: "How much tape speckle and snow sits over the picture. VHS only."
  },
  curvature: {
    type: "slider",
    label: "Curvature",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    description: "How much the glass bulges. The picture curves toward rounded corners, and beyond the edge of the screen the frame is cut away so the layers beneath show through. 0 is a flat screen."
  },
  // Whole passes per loop — seamless at every value, nothing rounded.
  roll: {
    type: "slider",
    label: "Roll",
    min: 0,
    max: 12,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How many times a soft bright band rolls down the screen over the loop. Whole numbers only, which is what keeps it seamless. 0 turns it off."
  },
  flicker: {
    type: "slider",
    label: "Flicker",
    min: 0,
    max: 100,
    step: 1,
    default: 15,
    description: "How much the brightness shimmers from moment to moment. 0 holds it steady."
  },
  // An authored rate, used as is: nothing rounds it to close the loop. The noise
  // it drives is uncorrelated from one step to the next, so the wrap is just
  // one more step.
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    description: "How fast the screen lives: flicker, tape noise and the tracking sway. 100 changes 24 times a second, like real tape; lower is calmer, and 0 freezes it. Roll keeps its own pace."
  }
}, Jm = Object.fromEntries(
  Object.entries(qc).map(([e, t]) => [e, t.default])
), Gr = 0.15, Yr = 24, ep = 0.35, Ur = 1, na = 6, jr = 0.012, tp = 24, $r = 0.012;
function sp(e, t) {
  const s = e.style === "vhs", o = r(e.lines), a = r(e.scanlines / 100), n = r(e.mask / 100), l = r(e.bleed / 100 * jr), i = r(e.wobble / 100 * $r), u = r(e.noise / 100), d = r(e.curvature / 100 * Gr), c = r(1), h = r(4), m = r(0), x = r(-1), g = r(1), w = r(0), S = (F) => {
    const M = F.sub(0.5).mul(2);
    return M.add(M.mul(E(M.y.mul(M.y), M.x.mul(M.x))).mul(d)).mul(0.5).add(0.5);
  }, v = (F) => {
    const M = Ae(F.y.mul(9).add(w)).mul(0.6), I = Be(F.y.mul(o).div(tp)), f = St(I, Be(b(3)), m.toUint()).sub(0.5).mul(0.8);
    return M.add(f).mul(i);
  }, y = Ke((F) => {
    const M = S(F);
    return s ? E(M.x.add(v(M)), M.y) : M;
  }), k = (F) => {
    const M = S(F), I = y(F), f = t(I);
    let D = f.rgb;
    if (s) {
      const G = (me) => Re(me, te(0.299, 0.587, 0.114)), W = (me) => Re(me, te(0.596, -0.274, -0.322)), J = (me) => Re(me, te(0.211, -0.523, 0.312));
      let Q = W(f.rgb), se = J(f.rgb);
      for (let me = 1; me < na; me++) {
        const xe = t(E(I.x.sub(l.mul(me / (na - 1))), I.y)).rgb;
        Q = Q.add(W(xe)), se = se.add(J(xe));
      }
      Q = Q.div(na), se = se.div(na);
      const K = G(f.rgb);
      D = te(
        K.add(Q.mul(0.956)).add(se.mul(0.621)),
        K.sub(Q.mul(0.272)).sub(se.mul(0.647)),
        K.sub(Q.mul(1.106)).add(se.mul(1.703))
      );
      const le = Be(M.y.mul(o)), ce = St(Be(M.x.mul(o).mul(c).mul(2)), le, m.toUint()), oe = St(Be(M.x.mul(o).mul(c).mul(0.25)), le, m.toUint().add(1)), de = Me(b(1).sub(u.mul(4e-3)), 1, oe);
      D = D.add(ce.sub(0.5).mul(u.mul(0.18))).add(de.mul(0.8));
    } else {
      const G = M.x.mul(c).mul(o).mul(Ur).mul(Math.PI * 2), W = (K) => b(0.5).add(Ve(G.sub(K)).mul(0.5)), J = te(W(0), W(Math.PI * 2 / 3), W(Math.PI * 4 / 3)).mul(2), Q = h.div(Ur * 3), se = Me(1.2, 2.2, Q);
      D = D.mul($(te(1), J, n.mul(0.55).mul(se)));
    }
    const L = b(0.5).add(Ve(M.y.mul(o).mul(Math.PI * 2)).mul(0.5)), B = a.mul(Me(1.6, 3, h));
    D = D.mul(b(1).sub(B.mul(b(1).sub(L)).mul(0.8))).mul(b(1).add(B.mul(0.3)));
    const z = Se(M.y.sub(x).add(0.5)).sub(0.5), V = Rt(z.mul(z).mul(-180)).mul(0.12).mul(x.greaterThanEqual(0).select(1, 0));
    D = D.add(V).mul(g);
    const Y = we(M.sub(0.5)).mul(E(c, 1)), U = E(c.mul(0.5), 0.5), j = d.mul(0.6).add(2e-3), X = Pe(ne(Y.sub(U).add(j), 0)).add(ve(ne(Y.x.sub(U.x), Y.y.sub(U.y)).add(j), 0)).sub(j), N = b(1).sub(Me(-2e-3, 1e-3, X));
    return ie(fe(D, 0, 1).mul(N), f.a.mul(N));
  };
  let A = Math.round(e.roll), O = e.flicker / 100, R = (e.speed ?? 100) / 100 * Yr;
  const T = (F) => {
    o.value = F.lines, a.value = F.scanlines / 100, n.value = F.mask / 100, l.value = F.bleed / 100 * jr, i.value = F.wobble / 100 * $r, u.value = F.noise / 100, d.value = F.curvature / 100 * Gr, A = Math.round(F.roll), O = F.flicker / 100, R = (F.speed ?? 100) / 100 * Yr;
  }, C = new p.Vector2();
  return { layerFn: k, updateUniforms: T, renderPass: (F) => {
    F.getDrawingBufferSize(C), c.value = C.x / Math.max(1, C.y), h.value = C.y / Math.max(1, o.value);
    const M = Ce() * R, I = Math.floor(M) % 65536;
    w.value = M * ep % (Math.PI * 2), m.value = I;
    const f = Math.abs(Math.sin(I * 12.9898) * 43758.5453) % 1;
    g.value = 1 - O * 0.18 * f;
    const D = Qe().duration > 0 ? Ne() : 0;
    x.value = A > 0 ? 1 - D * A % 1 : -1;
  }, warpUv: y };
}
const op = {
  meta: {
    id: "crt",
    name: "CRT",
    description: "Puts the layers below on a tube screen — scanlines, phosphor and curved glass, or worn VHS tape",
    keywords: [
      "tv",
      "television",
      "monitor",
      "scanline",
      "scanlines",
      "vhs",
      "tape",
      "retro",
      "arcade",
      "phosphor",
      "tube",
      "analog",
      "analogue",
      "vintage",
      "found footage",
      "crt"
    ],
    group: "stylise"
  },
  kind: "processor",
  // VHS reads the stack several times for its colour smear.
  resampling: !0,
  // The glass bends the picture — and the silhouette with it.
  transformsSilhouette: !0,
  paramSchema: qc,
  defaultParams: Jm,
  buildLayer: sp
}, Zc = {
  style: {
    type: "dropdown",
    label: "Style",
    options: [
      { label: "Blinds", value: "blinds" },
      { label: "Waves", value: "waves" },
      { label: "Tiles", value: "tiles" },
      { label: "Radial", value: "radial" },
      { label: "Circles", value: "circles" },
      { label: "Squares", value: "squares" },
      { label: "Diamonds", value: "diamonds" }
    ],
    default: "blinds",
    // Not structural: every style is compiled in and picked by a uniform, so the
    // menu previews on hover and switching never recompiles.
    description: "The pattern the slats are cut into. Blinds and Waves band along one axis; Tiles crosses two; Radial, Circles, Squares and Diamonds run out from the centre."
  },
  frequency: {
    type: "slider",
    label: "Frequency",
    min: 1,
    max: 100,
    step: 1,
    default: 24,
    description: "How many slats fit across the frame. Low numbers give a few broad bands, high numbers a fine comb."
  },
  amount: {
    type: "slider",
    label: "Amount",
    min: -100,
    max: 100,
    step: 1,
    default: 30,
    description: "How far each slat displaces the image, reaching half the frame at 100. Signed: the sign flips which way the slats push, so a negative Amount mirrors the shear."
  },
  angle: {
    type: "slider",
    label: "Angle",
    min: 0,
    max: 360,
    step: 1,
    default: 90,
    description: "Which way the slats run, in degrees. 90 is an upright blind, 0 lays them on their side. The centred patterns — Radial, Circles, Squares, Diamonds — take their direction from the centre and ignore this."
  },
  distortion: {
    type: "slider",
    label: "Distortion",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How much each slat displaces by a random amount of its own. 0 is a clean regular shear; high values scatter the slats to different depths so the pattern reads as broken glass rather than a blind."
  },
  smoothing: {
    type: "slider",
    label: "Smoothing",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How soft the edge between slats is. 0 keeps the hard reset line that makes a slat read as a slat; raising it rounds the ramp until the pattern becomes a smooth wave."
  },
  dispersion: {
    type: "slider",
    label: "Dispersion",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How far the colour channels separate across each slat, adding a prismatic fringe to the displacement. 0 is neutral."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the slats travel through the pattern, and which way. Signed: the sign is the direction. 0 holds them still."
  }
}, ap = Object.fromEntries(
  Object.entries(Zc).map(([e, t]) => [e, t.default])
), np = ["blinds", "waves", "tiles", "radial", "circles", "squares", "diamonds"], Nr = (e) => Math.max(0, np.indexOf(e ?? "blinds"));
function rp(e, t) {
  const s = r(Nr(e.style)), o = r(e.frequency), a = r(e.amount / 100 * 0.5), n = r(e.angle * (Math.PI / 180)), l = r(e.distortion / 100), i = r(e.smoothing / 100), u = r(e.dispersion / 100), d = r(e.speed / 100 * 0.5), c = r(0), h = Math.PI * 2;
  return { layerFn: (w) => {
    const S = w.sub(0.5), v = E(Ve(n), Ae(n)), y = E(v.y.negate(), v.x), k = Pe(S), A = ne(k, b(1e-3)), O = S.div(A), R = E(S.y.negate(), S.x).div(A), T = Re(S, v), C = Re(S, y), P = (Y) => {
      const U = Y.mul(o).add(c.mul(d)), j = Ue(U), X = Se(U), N = Se(Ae(j.mul(127.1)).mul(43758.5453)).mul(2).sub(1), G = $(b(1), N, l), W = X.sub(0.5), J = $(W, W.mul(Ae(X.mul(Math.PI))), i);
      return G.mul(J);
    }, F = (Y) => Ae(Y.mul(o).add(c.mul(d)).mul(h)).mul(0.5), M = [
      v.mul(a.mul(P(T))),
      // blinds — parallel slats
      v.mul(a.mul(F(T))),
      // waves
      v.mul(a.mul(P(T))).add(y.mul(a.mul(P(C)))),
      // tiles — both axes
      R.mul(a.mul(P(Ut(S.y, S.x).div(h).add(0.5)))),
      // radial — spokes
      O.mul(a.mul(P(k))),
      // circles — rings
      O.mul(a.mul(P(ne(we(T), we(C))))),
      // squares — Chebyshev
      O.mul(a.mul(P(we(T).add(we(C)))))
      // diamonds — Manhattan
    ], I = (Y) => pe(b(Y - 0.5), s).mul(pe(s, b(Y + 0.5)));
    let f = M[0].mul(I(0));
    for (let Y = 1; Y < M.length; Y++) f = f.add(M[Y].mul(I(Y)));
    const D = w.add(f), L = f.mul(u), B = t(D.add(L)), z = t(D), V = t(D.sub(L));
    return ie(B.r, z.g, V.b, z.a);
  }, updateUniforms: (w) => {
    s.value = Nr(w.style), o.value = w.frequency, a.value = w.amount / 100 * 0.5, n.value = w.angle * (Math.PI / 180), l.value = w.distortion / 100, i.value = w.smoothing / 100, u.value = w.dispersion / 100, d.value = w.speed / 100 * 0.5;
  }, renderPass: () => {
    c.value = Ce();
  } };
}
const ip = {
  meta: {
    id: "blinds",
    name: "Blinds",
    description: "Displace the image into banded slats — linear, radial or tiled",
    keywords: ["slats", "bands", "stripes", "shutters", "venetian", "strips", "slice", "louvre", "lines"],
    group: "distort"
  },
  kind: "processor",
  // per-channel offsets — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: Zc,
  defaultParams: ap,
  buildLayer: rp
}, Ua = (e) => (e.type ?? "linear") === "linear", Kc = {
  // Which camera move the smear is: a pan (along one axis), a zoom (out from a
  // point) or a spin (round a point). Linear is the default and what every scene
  // saved before this menu existed reads as.
  type: {
    type: "dropdown",
    label: "Type",
    options: [
      { label: "Linear", value: "linear" },
      { label: "Zoom", value: "zoom" },
      { label: "Spin", value: "spin" }
    ],
    default: "linear",
    structural: !0,
    description: "Which way the smear runs. Linear streaks everything along one angle, like a camera panning. Zoom streaks out from a centre point, like a lens zoomed during the exposure. Spin smears in arcs round a centre point, like the camera turning. Zoom and Spin grow toward the edges and stay calm at the centre."
  },
  amount: {
    type: "slider",
    label: "Amount",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    description: "How far the image is smeared. Linear: how long the streaks are. Zoom: how far they reach toward the centre, growing with distance from it. Spin: how far the arcs sweep, up to about 30 degrees at 100. This is the in-motion look, as opposed to Blur, which softens evenly in all directions."
  },
  angle: {
    type: "slider",
    label: "Angle",
    min: 0,
    max: 360,
    step: 1,
    default: 90,
    showIf: Ua,
    description: "Which way the smear runs, in degrees. 90 streaks vertically, 0 horizontally. Linear only."
  },
  chromatic: {
    type: "slider",
    label: "Chrom. Dispersion",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How far the colour channels separate along the smear, adding a prismatic trail to the streak. 0 is neutral."
  },
  sides: {
    type: "dropdown",
    label: "Sides",
    options: [
      { label: "One", value: "one" },
      { label: "Two", value: "two" }
    ],
    default: "two",
    structural: !0,
    description: "Whether the smear runs both ways or only one. Two is a symmetric blur through the pixel; One trails to a single side, which reads as motion with a direction rather than softness. In Zoom, One streaks toward the centre, so the picture seems to rush outward."
  },
  // The centre a zoom or spin is measured from. The shared posX/posY convention,
  // so it earns canvas dragging and Align — hidden under Linear, which has no
  // centre (isMovable honours the showIf).
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    showIf: (e) => !Ua(e),
    description: "Moves the centre of a Zoom or Spin sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    showIf: (e) => !Ua(e),
    description: "Moves the centre of a Zoom or Spin vertically, as a percentage of the frame. 0 is centred."
  },
  // Follow mouse: the focus follows the cursor. Linear — the cursor's bearing
  // from the centre pulls the direction off the Angle slider. Zoom and Spin —
  // the centre itself moves toward the cursor.
  ...bt
}, lp = Object.fromEntries(
  Object.entries(Kc).map(([e, t]) => [e, t.default])
), ra = 32, qr = 4, Zr = 0.5, Kr = Math.PI / 6;
function cp(e, t) {
  const s = r(e.amount / 100 * 0.4), o = r(e.chromatic / 100 * 0.06), a = e.sides === "two", n = e.type ?? "linear", l = r(e.amount / 100 * Zr), i = r(e.amount / 100 * Kr), u = r(new p.Vector2(
    (e.posX ?? 0) / 100 * 0.5,
    (e.posY ?? 0) / 100 * 0.5
  )), d = r(1), c = r(new p.Vector2(0, 1)), h = Lt(e);
  let m = e.angle * (Math.PI / 180), x = 1;
  const g = (A) => {
    const O = Se(Ae(Re(A, E(12.9898, 78.233))).mul(43758.5453)), R = E(u.x.add(h.offset.x).add(0.5), u.y.add(h.offset.y).add(0.5)), T = A.sub(R), C = [];
    for (let P = 0; P < ra; P++) {
      const F = O.add(P).div(ra), M = a ? F.mul(2).sub(1) : F;
      if (n === "zoom")
        C.push({ at: R.add(T.mul(b(1).sub(l.mul(M)))), fringe: T.mul(o.mul(M).mul(2)) });
      else if (n === "spin") {
        const I = i.mul(M), f = Ve(I), D = Ae(I), L = T.x.mul(d), B = L.mul(f).sub(T.y.mul(D)), z = L.mul(D).add(T.y.mul(f)), V = E(z.negate().div(d), B);
        C.push({ at: E(B.div(d), z).add(R), fringe: V.mul(o.mul(M).mul(2)) });
      } else
        C.push({ at: A.add(c.mul(s.mul(M))), fringe: c.mul(o.mul(M)) });
    }
    return C;
  }, w = (A) => {
    let O = b(0), R = b(0), T = b(0), C = b(0);
    for (const { at: F, fringe: M } of g(A)) {
      const I = t(F);
      O = O.add(t(F.add(M)).r), R = R.add(I.g), T = T.add(t(F.sub(M)).b), C = C.add(I.a);
    }
    const P = 1 / ra;
    return ie(O.mul(P), R.mul(P), T.mul(P), C.mul(P));
  }, S = (A, O) => {
    let R = b(0);
    for (const { at: T } of g(O)) R = R.add(A(T));
    return R.mul(1 / ra);
  }, v = (A) => {
    s.value = A.amount / 100 * 0.4, l.value = A.amount / 100 * Zr, i.value = A.amount / 100 * Kr, u.value.set((A.posX ?? 0) / 100 * 0.5, (A.posY ?? 0) / 100 * 0.5), o.value = A.chromatic / 100 * 0.06, m = A.angle * (Math.PI / 180), h.update(A);
  }, y = new p.Vector2();
  return { layerFn: w, updateUniforms: v, renderPass: (A) => {
    A.getDrawingBufferSize(y), x = y.x / Math.max(1, y.y), d.value = x, h.renderPass();
    const O = Math.cos(m) + h.value.x * qr, R = Math.sin(m) + h.value.y * qr, T = Math.hypot(O, R) || 1;
    c.value.set(O / T / x, R / T);
  }, maskFn: S };
}
const up = {
  meta: {
    id: "stretch",
    name: "Directional Blur",
    description: "Smears the layers below into motion-blur streaks — along a line, out from a point, or round it",
    // 'stretch', 'pull' and 'slit scan' belong to the effect that actually does
    // them (`pull`, named Stretch): hard-edged ribbons from an anchor. 'Zoom blur'
    // came back here when Type gained Zoom — this is the soft, averaged one.
    keywords: [
      "motion blur",
      "smear",
      "streak",
      "streaks",
      "speed",
      "speed lines",
      "drag",
      "long exposure",
      "squeegee",
      "directional",
      "zoom blur",
      "radial blur",
      "spin blur",
      "rotational blur",
      "warp speed",
      "hyperspace"
    ],
    group: "blur"
  },
  kind: "processor",
  // 32 taps × 3 channels — see `resampling` in types/effects.ts.
  resampling: !0,
  // The silhouette smears along with the fill. There's no single warped
  // coordinate to hand over — one per tap — so the mask is built by `maskFn`.
  transformsSilhouette: !0,
  paramSchema: Kc,
  defaultParams: lp,
  buildLayer: cp
}, Qc = {
  threshold: {
    type: "slider",
    label: "Threshold",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How bright a pixel must be before it blooms. High restricts the glow to genuine speculars; low lets midtones bloom too, which washes the whole frame in light."
  },
  intensity: {
    type: "slider",
    label: "Intensity",
    min: 0,
    max: 100,
    step: 1,
    default: 60,
    description: "How strong the glow is over the original image."
  },
  radius: {
    type: "slider",
    label: "Radius",
    min: 1,
    max: 100,
    step: 1,
    default: 45,
    description: "How far the glow spreads from its source. Small gives a tight halo, large a soft atmospheric haze across the frame."
  }
}, dp = Object.fromEntries(
  Object.entries(Qc).map(([e, t]) => [e, t.default])
), hp = [
  { r: 0.5, n: 8 },
  { r: 1, n: 8 }
];
function mp(e, t) {
  const s = r(e.threshold / 100), o = r(e.intensity / 100 * 3), a = r(e.radius / 100 * 0.06);
  return { layerFn: (i) => {
    const u = t(i);
    let d = te(0, 0, 0), c = 0;
    for (const h of hp)
      for (let m = 0; m < h.n; m++) {
        const x = m / h.n * Math.PI * 2, g = E(Math.cos(x) * h.r, Math.sin(x) * h.r), w = t(i.add(g.mul(a)));
        d = d.add(ne(w.rgb.sub(s), 0)), c++;
      }
    return d = d.mul(b(1 / c)).mul(o), ie(u.rgb.add(d).clamp(0, 1), u.a);
  }, updateUniforms: (i) => {
    s.value = i.threshold / 100, o.value = i.intensity / 100 * 3, a.value = i.radius / 100 * 0.06;
  } };
}
const pp = {
  meta: {
    id: "bloom",
    name: "Bloom",
    description: "Soft glow on the brightest areas",
    keywords: ["glow", "halation", "haze", "shine", "highlights", "light", "soft", "flare", "blur"],
    group: "light"
  },
  kind: "processor",
  // 17-tap glow kernel — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: Qc,
  defaultParams: dp,
  buildLayer: mp
}, Jc = {
  radius: {
    type: "slider",
    label: "Amount",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "How far the blur reaches. This is the plain softening pass — reach for it when hard edges need to bleed into each other. 0 is untouched."
  },
  progressive: {
    type: "slider",
    label: "Progressive",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How much the blur ramps across the frame instead of applying evenly. 0 blurs everything equally; raising it leaves one side sharp and smears the other, the tilt-shift or motion-streak look."
  },
  angle: {
    type: "slider",
    label: "Direction",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    showIf: (e) => e.progressive > 0,
    description: "Which way the progressive ramp runs, in degrees. Only once Progressive is above 0."
  }
}, fp = Object.fromEntries(
  Object.entries(Jc).map(([e, t]) => [e, t.default])
), Qr = 64, eu = Array.from({ length: Qr }, (e, t) => {
  const s = Math.sqrt((t + 0.5) / Qr), o = t * 2.39996323;
  return { x: Math.cos(o) * s, y: Math.sin(o) * s, w: Math.exp(-1.5 * s * s) };
}), Jr = eu.reduce((e, t) => e + t.w, 0);
function gp(e, t) {
  const s = r(e.radius / 100 * 0.12), o = r(e.progressive / 100), a = r(e.angle * (Math.PI / 180)), n = r(1), l = r(new p.Vector2(1, 1)), i = (x) => {
    const g = E(Ve(a), Ae(a)), w = fe(x.sub(0.5).dot(g).add(0.5), 0, 1), S = $(b(1).sub(o), b(1), w), v = s.mul(S), y = x.mul(l), k = St(Be(y.x), Be(y.y), Be(b(0))).mul(Math.PI * 2), A = Ve(k), O = Ae(k);
    return eu.map((R) => {
      const T = A.mul(R.x).sub(O.mul(R.y)), C = O.mul(R.x).add(A.mul(R.y)), P = E(v.mul(T).div(n), v.mul(C));
      return { at: x.add(P), w: R.w };
    });
  }, u = (x) => {
    let g = b(0);
    for (const { at: S, w: v } of i(x)) g = g.add(t(S).rgb.mul(v));
    const w = g.mul(b(1 / Jr));
    return ie(w, t(x).a);
  }, d = (x, g) => {
    let w = b(0);
    for (const { at: S, w: v } of i(g)) w = w.add(x(S).mul(v));
    return w.mul(1 / Jr);
  }, c = (x) => {
    s.value = x.radius / 100 * 0.12, o.value = x.progressive / 100, a.value = x.angle * (Math.PI / 180);
  }, h = new p.Vector2();
  return { layerFn: u, updateUniforms: c, renderPass: (x) => {
    x.getDrawingBufferSize(h), n.value = h.x / Math.max(1, h.y), l.value.set(h.x, h.y);
  }, maskFn: d };
}
const bp = {
  meta: {
    id: "blur",
    name: "Blur",
    description: "Gaussian blur of the layers below, with an optional progressive ramp",
    keywords: ["gaussian", "soft", "soften", "defocus", "haze", "smooth", "out of focus", "depth"],
    group: "blur"
  },
  kind: "processor",
  // 64-tap spiral kernel — see `resampling` in types/effects.ts.
  resampling: !0,
  /**
   * A wide blur reads a smaller source.
   *
   * Sixty-four taps over a disc of radius R sit about `2R/8` apart, so past a
   * few dozen pixels every one of them misses the texture cache and the layer
   * goes from cheap to the most expensive thing in the scene. Reading them from
   * a quarter-resolution copy is sixteen times less texture to walk — and it is
   * not a shortcut: each texel becomes an average of the pixels between the
   * taps, which is *closer* to the integral the kernel is approximating than a
   * point sample was.
   *
   * The divisor is derived from the radius, so this changes nothing for a
   * narrow blur: below about radius 15 the source stays full resolution. The
   * threshold is one source texel per sixteenth of the kernel radius, computed
   * against a 1080-tall buffer — the smallest we render — so a larger buffer
   * only makes it safer.
   *
   * Progressive is measured at its *sharp* end (`radius × (1 - progressive)`),
   * because that end is where the kernel is narrowest and the quantisation
   * would show first.
   */
  resamplingScale: (e) => {
    if (typeof window < "u" && new URLSearchParams(window.location.search).has("blurfull")) return 1;
    const s = (e.radius ?? 20) / 100 * 0.12 * (1 - (e.progressive ?? 0) / 100);
    return Math.min(4, Math.max(1, Math.floor(s * (1080 / 16))));
  },
  // The silhouette softens along with the fill. A kernel spreads the coordinate
  // into sixty-four places at once, so there is no single `warpUv` to hand over
  // and the mask is built by `maskFn`.
  transformsSilhouette: !0,
  paramSchema: Jc,
  defaultParams: fp,
  buildLayer: gp
}, Io = {
  linear: { pow: 1, mode: 0 },
  inQuad: { pow: 2, mode: 0 },
  outQuad: { pow: 2, mode: 1 },
  inOutQuad: { pow: 2, mode: 2 },
  inCubic: { pow: 3, mode: 0 },
  outCubic: { pow: 3, mode: 1 },
  inOutCubic: { pow: 3, mode: 2 },
  inQuart: { pow: 4, mode: 0 },
  outQuart: { pow: 4, mode: 1 },
  inOutQuart: { pow: 4, mode: 2 }
}, yp = [
  { label: "Linear", value: "linear", group: "None" },
  { label: "Ease In Quad", value: "inQuad", group: "Quad — gentlest" },
  { label: "Ease Out Quad", value: "outQuad" },
  { label: "Ease In Out Quad", value: "inOutQuad" },
  { label: "Ease In Cubic", value: "inCubic", group: "Cubic" },
  { label: "Ease Out Cubic", value: "outCubic" },
  { label: "Ease In Out Cubic", value: "inOutCubic" },
  { label: "Ease In Quart", value: "inQuart", group: "Quart — sharpest" },
  { label: "Ease Out Quart", value: "outQuart" },
  { label: "Ease In Out Quart", value: "inOutQuart" }
], tu = "_ease";
function su(e = {}) {
  const t = {
    type: "dropdown",
    label: e.label ?? "Easing",
    options: yp,
    default: e.default ?? "linear",
    description: "The shape of the ramp, rather than its size. Linear changes at a constant rate and reads as mechanical or glassy. The In curves start slow and let go late, holding the artwork together before it gives way; the Out curves let go immediately at the boundary and taper off; the InOut curves do both, easing at each end. Quad is the gentlest, Quart the most extreme.",
    // Deliberately NOT structural — see the note above. Two uniforms cover every
    // curve, so the picker can preview on hover.
    ...e.group ? { group: e.group } : {},
    ...e.showIf ? { showIf: e.showIf } : {}
  };
  return { [tu]: t };
}
const wp = {
  linear: 1,
  inQuad: 2,
  outQuad: 2,
  inOutQuad: 2,
  inCubic: 3,
  outCubic: 3,
  inOutCubic: 4,
  inQuart: 4,
  outQuart: 4,
  inOutQuart: 8
};
function ou(e) {
  const t = (a) => {
    const n = a[tu];
    return n in Io ? n : "linear";
  };
  let s = t(e);
  const o = r(new p.Vector2(Io[s].pow, Io[s].mode));
  return {
    apply: (a) => {
      const n = fe(b(a), 0, 1), l = o.x, i = $e(n, l), u = b(1).sub($e(b(1).sub(n), l)), d = $(
        $e(n.mul(2), l).mul(0.5),
        b(1).sub($e(b(2).sub(n.mul(2)), l).mul(0.5)),
        pe(0.5, n)
      ), c = o.y;
      return $($(i, u, pe(0.5, c)), d, pe(1.5, c));
    },
    update: (a) => {
      s = t(a), o.value.set(Io[s].pow, Io[s].mode);
    },
    maxSlope: () => wp[s] ?? 1
  };
}
const ja = (e) => e.radius < 100, au = {
  // Structural because the three modes are three different combines — a sum, a
  // running max, a running min — not three values of one. Blending all three and
  // picking with a uniform would pay for the two nobody asked for, on every tap.
  mode: {
    type: "dropdown",
    label: "Mode",
    default: "scatter",
    structural: !0,
    options: [
      { label: "Scatter", value: "scatter" },
      { label: "Lighten", value: "lighten" },
      { label: "Darken", value: "darken" }
    ],
    description: "How the scattered samples are combined. Scatter averages them, giving a frosted-glass blur; Lighten keeps the brightest of them, so light bleeds outward and spreads into the dark; Darken keeps the darkest, so dark spreads into the light. The two directional modes are what make this different from an ordinary blur."
  },
  amount: {
    type: "slider",
    label: "Amount",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "How far each pixel is scattered. 0 leaves the image alone."
  },
  grain: {
    type: "slider",
    label: "Grain",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "How coarse the scatter is. Low draws samples close together for a smooth frost; high spreads them out into visible speckle, more like etched or sandblasted glass."
  },
  softness: {
    type: "slider",
    label: "Softness",
    min: 0,
    max: 100,
    step: 1,
    default: 60,
    description: "How evenly the samples are weighted. High blends them into a soft even wash; low leaves the individual scattered samples more visible."
  },
  // Where the effect *is*. 100 is the whole frame — the state a blur is normally
  // in — so everything that describes an edge only appears once there is one.
  //
  // **Radius**, not Area or Size, and the distinction is the app's: a *Radius*
  // is a circular reach measured out from a centre (Bulge, Light, Vignette,
  // Bloom, Kuwahara all use the word for exactly that), while Size and Scale
  // say how big a drawn thing is. This is a reach, so it takes the word — and
  // `Amount` stays the strength, which is the other half of the same convention.
  radius: {
    type: "slider",
    label: "Radius",
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    group: "Region",
    description: "How far the effect reaches from its centre. 100 covers the whole frame, which is the state a blur is normally in — lower it to confine the effect to a patch, at which point Falloff and Position start to matter."
  },
  falloff: {
    type: "slider",
    label: "Falloff",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    showIf: ja,
    description: "How gradually the effect fades out at the edge of its region. Only once Radius is below 100."
  },
  // The ramp from full strength to none. Easing is the shared block, under the
  // shared key — see effects/easing.ts for why this previews on hover.
  ...su({ default: "inOutQuad", showIf: ja }),
  // Deliberately *not* gated on `placed`, unlike everything else about the
  // region. Movability is decided by these two keys existing at all
  // (`isMovable` in lib/layerExtents.ts), which no `showIf` can reach — so
  // hiding them would leave the Align row in the panel and a drag frame on the
  // canvas for a layer whose position the panel claims not to have. Better to
  // show the control and say when it does nothing.
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    note: (e) => ja(e) ? null : "Radius covers the frame — lower it to place the effect.",
    description: "Moves the centre of the region sideways. Only does anything once Radius is below 100."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the centre of the region vertically. Only does anything once Radius is below 100."
  },
  ...bt,
  animate: {
    type: "slider",
    label: "Animate",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How fast the scatter pattern churns. 0 freezes it into a still texture."
  }
}, vp = Object.fromEntries(
  Object.entries(au).map(([e, t]) => [e, t.default])
), uo = 32, xp = 24, ei = 0.12, Mp = 1.05, nu = (e, t) => e.radius / 100 * Math.hypot(t / 2, 0.5) * Mp;
function kp(e, t) {
  const s = e.mode || "scatter", o = r(e.amount / 100 * ei), a = r(e.softness / 100 * uo), n = r(1 / ti(e.softness)), l = r(240), i = r(1), u = r(2), d = r(0.4), c = r(new p.Vector2(
    e.posX / 100 * 0.5,
    e.posY / 100 * 0.5
  )), h = r(0), m = Lt(e), x = ou(e), g = (M) => {
    const I = M.x.sub(0.5).sub(c.x).sub(m.offset.x).mul(i), f = M.y.sub(0.5).sub(c.y).sub(m.offset.y), D = fe(Pe(E(I, f)).sub(u).div(d), 0, 1);
    return b(x.apply(D).oneMinus());
  }, w = (M) => M === 0 ? b(1) : fe(a.sub(M), 0, 1), S = (M) => {
    const I = E(M.x.mul(i), M.y).mul(l), f = Be(I.x), D = Be(I.y), L = h.mul(uo), B = o.mul(g(M));
    return Array.from({ length: uo }, (z, V) => {
      const Y = St(f, D, L.add(V).toUint()), U = Y.mul(Math.PI * 2), j = sc(Se(Y.mul(4096))).mul(B), X = E(Ve(U).mul(j).div(i), Ae(U).mul(j));
      return { at: M.add(X), w: w(V) };
    });
  }, v = st(([M]) => {
    const I = S(M), f = b(0).toVar();
    for (const { at: B, w: z } of I) f.addAssign(t(B).a.mul(z));
    if (s === "scatter") {
      const B = te(0).toVar();
      for (const { at: z, w: V } of I) B.addAssign(t(z).rgb.mul(V));
      return ie(B.mul(n), f.mul(n));
    }
    const D = s === "lighten" ? ne : ve, L = t(I[0].at).rgb.toVar();
    for (let B = 1; B < I.length; B++)
      L.assign($(L, D(L, t(I[B].at).rgb), I[B].w));
    return ie(L, f.mul(n));
  }), y = (M) => v(M), k = (M, I) => {
    let f = b(0);
    for (const { at: D, w: L } of S(I)) f = f.add(M(D).mul(L));
    return f.mul(n);
  };
  let A = e.grain, O = e.animate / 100, R = e.radius, T = e.falloff;
  const C = (M) => {
    o.value = M.amount / 100 * ei, a.value = M.softness / 100 * uo, n.value = 1 / ti(M.softness), A = M.grain, O = M.animate / 100, R = M.radius, T = M.falloff, c.value.set(M.posX / 100 * 0.5, M.posY / 100 * 0.5), m.update(M), x.update(M);
  }, P = new p.Vector2();
  return { layerFn: y, updateUniforms: C, renderPass: (M, I) => {
    M.getDrawingBufferSize(P);
    const f = P.x / Math.max(1, P.y);
    i.value = f;
    const D = Math.hypot(f / 2, 0.5);
    u.value = nu({ radius: R }, f), d.value = 0.02 + T / 100 * D, l.value = Math.max(1, I.height) / Sp(A), m.renderPass();
    const L = O * xp;
    if (L <= 0) {
      h.value = 0;
      return;
    }
    h.value = Math.floor(Ce() * L) % 65536;
  }, maskFn: k };
}
function ti(e) {
  const t = e / 100 * uo;
  let s = 1;
  for (let o = 1; o < uo; o++) s += Math.min(1, Math.max(0, t - o));
  return s;
}
function Sp(e) {
  const t = e / 100;
  return 1 + Math.pow(t, 1.35) * 3.3;
}
const Pp = {
  meta: {
    id: "diffuse",
    name: "Diffuse",
    description: "Scatters each pixel a random distance, for a grainy, frosted-glass blur",
    keywords: [
      "frosted",
      "frosted glass",
      "sand",
      "sandblast",
      "etched",
      "noise blur",
      "grain blur",
      "grainy",
      "stochastic",
      "hash blur",
      "dissolve",
      "scatter",
      "shuffle",
      "speckle",
      "translucent",
      "diffusion",
      "soft",
      "rough"
    ],
    group: "blur"
  },
  kind: "processor",
  // The region can be racked to the cursor, so the export dialog is right to
  // offer recording one — but only when Follow is actually up. Answering `true`
  // unconditionally would promise a response from a layer sitting at 0.
  usesPointer: (e) => e._ixFollow > 0,
  // 32-tap scatter kernel — see `resampling` in types/effects.ts.
  resampling: !0,
  // The silhouette breaks up along with the fill. The coordinate goes to
  // thirty-two places at once, so there is no single `warpUv` to hand over and
  // the mask is built by `maskFn`.
  transformsSilhouette: !0,
  // A field: a disc around Position, so the canvas can frame it, place it and
  // give Radius a handle. See `RadialExtent` in types/effects.ts.
  radialExtent: { key: "radius", min: 0, max: 100, reach: nu },
  paramSchema: au,
  defaultParams: vp,
  buildLayer: kp
}, ru = {
  exposure: {
    type: "slider",
    label: "Exposure",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    description: "Overall brightness, in stops. Signed: 0 is untouched."
  },
  contrast: {
    type: "slider",
    label: "Contrast",
    min: 0,
    max: 200,
    step: 1,
    default: 100,
    description: "Distance between lights and darks, as a percentage. 100 is untouched, above separates them, below flattens toward grey."
  },
  saturation: {
    type: "slider",
    label: "Saturation",
    min: 0,
    max: 200,
    step: 1,
    default: 100,
    description: "Colour intensity, as a percentage. 100 is untouched, 0 is fully greyscale, above 100 pushes colours past their original strength."
  },
  hue: {
    type: "slider",
    label: "Hue",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "Rotates every colour around the wheel, in degrees. 0 is untouched; 180 gives the complementary palette."
  },
  temperature: {
    type: "slider",
    label: "Temperature",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    description: "Warm/cool shift. Signed: positive pushes toward amber, negative toward blue. 0 is neutral."
  },
  tonemap: {
    type: "dropdown",
    label: "Tonemap",
    options: [
      { label: "None", value: "none" },
      { label: "Reinhard", value: "reinhard" },
      { label: "ACES", value: "aces" },
      { label: "Uncharted 2", value: "uncharted2" },
      { label: "Unreal", value: "unreal" },
      { label: "Lottes", value: "lottes" },
      { label: "Reinhard (White Point)", value: "reinhard2" },
      { label: "Exponential", value: "exponential" },
      { label: "Sigmoid (Tanh)", value: "tanh" }
    ],
    default: "none",
    description: "How out-of-range brightness is rolled back into what a screen can show. None clips it hard, which blows highlights to flat white. The rest are film-style curves that compress the top end instead: ACES is the neutral cinematic default, Reinhard is gentler and flatter, Uncharted 2 and Unreal are game-engine curves with more contrast, Exponential and Sigmoid roll off very softly. Worth reaching for whenever Bloom or a bright Gradient is clipping."
  },
  gamma: {
    type: "slider",
    label: "Gamma",
    min: 10,
    max: 300,
    step: 1,
    default: 100,
    description: "Midtone brightness, as a percentage, without moving black or white. 100 is untouched; below darkens the mids, above lifts them."
  },
  // The darkroom Sabattier effect: tones above a threshold fold back down. The
  // slider lowers the threshold from white (nothing folds) to mid-grey (the
  // classic V curve), and the fold is continuous, so no hard edge appears.
  solarize: {
    type: "slider",
    label: "Solarize",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "Folds the brightest tones back toward dark, the darkroom solarisation look: highlights turn into dark, glowing outlines while shadows stay put. Higher folds more of the range, down to every tone above mid-grey at 100. 0 is untouched."
  },
  invert: {
    type: "slider",
    label: "Invert",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "Blends toward the negative: black becomes white and every colour turns into its opposite. 100 is a full negative, 50 meets in flat grey, 0 is untouched."
  }
}, Ap = Object.fromEntries(
  Object.entries(ru).map(([e, t]) => [e, t.default])
), Tp = te(0.299, 0.587, 0.114), $a = te(0.57735, 0.57735, 0.57735);
function Cp(e) {
  return e.mul(e.mul(2.51).add(0.03)).div(e.mul(e.mul(2.43).add(0.59)).add(0.14)).clamp(0, 1);
}
function Ip(e) {
  return e.div(e.add(1));
}
function Ep(e) {
  return e.mul(b(1).add(e.div(16))).div(e.add(1));
}
function Fp(e) {
  return e.div(e.add(0.155)).mul(1.019);
}
function Lp(e) {
  const t = e.mul(2).exp();
  return t.sub(1).div(t.add(1));
}
function Rp(e) {
  return e.negate().exp().oneMinus();
}
function Dp(e) {
  const u = (c) => c.mul(c.mul(0.15).add(0.05)).add(4e-3).div(c.mul(c.mul(0.15).add(0.5)).add(0.06)).sub(0.06666666666666667), d = u(te(11.2, 11.2, 11.2));
  return u(e).div(d);
}
function Hp(e) {
  const l = (-Math.pow(0.18, 1.6) + Math.pow(8, 1.6) * 0.267) / ((Math.pow(8, 1.5632000000000001) - Math.pow(0.18, 1.5632000000000001)) * 0.267), i = (Math.pow(8, 1.6 * 0.977) * Math.pow(0.18, 1.6) - Math.pow(8, 1.6) * Math.pow(0.18, 1.6 * 0.977) * 0.267) / ((Math.pow(8, 1.6 * 0.977) - Math.pow(0.18, 1.6 * 0.977)) * 0.267);
  return $e(e, 1.6).div($e(e, 1.6 * 0.977).mul(l).add(i));
}
function si(e) {
  return e ? e === "softClip" ? "reinhard" : e === "cinematic" ? "aces" : e === "punch" ? "uncharted2" : e === "radiant" ? "unreal" : e === "matte" ? "lottes" : e === "gt" ? "reinhard2" : e === "sigmoid" ? "tanh" : e === "none" || e === "reinhard" || e === "reinhard2" || e === "aces" || e === "uncharted2" || e === "unreal" || e === "lottes" || e === "exponential" || e === "tanh" ? e : "none" : "none";
}
function oi(e) {
  return e === "reinhard" ? 1 : e === "aces" ? 2 : e === "uncharted2" ? 3 : e === "unreal" ? 4 : e === "lottes" ? 5 : e === "reinhard2" ? 6 : e === "exponential" ? 7 : e === "tanh" ? 8 : 0;
}
function Op(e, t) {
  const s = t, o = Ip(t), a = Cp(t), n = Dp(t), l = Fp(t), i = Hp(t), u = Ep(t), d = Rp(t), c = Lp(t), h = pe(e, b(0.5)), m = pe(b(0.5), e).mul(pe(e, b(1.5))), x = pe(b(1.5), e).mul(pe(e, b(2.5))), g = pe(b(2.5), e).mul(pe(e, b(3.5))), w = pe(b(3.5), e).mul(pe(e, b(4.5))), S = pe(b(4.5), e).mul(pe(e, b(5.5))), v = pe(b(5.5), e).mul(pe(e, b(6.5))), y = pe(b(6.5), e).mul(pe(e, b(7.5))), k = pe(b(7.5), e);
  return s.mul(h).add(o.mul(m)).add(a.mul(x)).add(n.mul(g)).add(l.mul(w)).add(i.mul(S)).add(u.mul(v)).add(d.mul(y)).add(c.mul(k));
}
function Bp(e, t, s) {
  const o = s ? s.live("solarize") || s.live("invert") : !0, a = r(Math.pow(2, e.exposure / 100)), n = r(e.contrast / 100), l = r(e.saturation / 100), i = r(e.hue * (Math.PI / 180)), u = r(e.temperature / 100 * 0.2), d = r(100 / e.gamma), c = r(oi(si(e.tonemap))), h = r(1 - (e.solarize ?? 0) / 200), m = r((e.invert ?? 0) / 100);
  return { layerFn: (w) => {
    const S = t(w);
    let v = S.rgb;
    v = v.mul(a), v = v.add(te(u, b(0), u.negate())), v = v.sub(0.5).mul(n).add(0.5);
    const y = Re(v, Tp);
    v = $(te(y, y, y), v, l);
    const k = Ve(i), A = Ae(i);
    if (v = v.mul(k).add(Ed($a, v).mul(A)).add($a.mul(Re($a, v)).mul(b(1).sub(k))), v = Op(c, ne(v, 0)), v = $e(ne(v, 0), d).clamp(0, 1), o) {
      const O = 0.45454545454545453;
      let R = $e(v, te(O, O, O));
      const T = (C) => $(C, h.mul(2).sub(C), pe(h, C));
      R = te(T(R.x), T(R.y), T(R.z)), R = $(R, b(1).sub(R), m), v = $e(ne(R, 0), te(2.2, 2.2, 2.2));
    }
    return ie(v, S.a);
  }, updateUniforms: (w) => {
    a.value = Math.pow(2, w.exposure / 100), n.value = w.contrast / 100, l.value = w.saturation / 100, i.value = w.hue * (Math.PI / 180), u.value = w.temperature / 100 * 0.2, d.value = 100 / w.gamma, c.value = oi(si(w.tonemap)), h.value = 1 - (w.solarize ?? 0) / 200, m.value = (w.invert ?? 0) / 100;
  } };
}
const zp = {
  meta: {
    id: "adjust",
    name: "Adjust",
    description: "Color grade the layers below — exposure, contrast, saturation, hue…",
    keywords: ["grade", "grading", "colour", "color", "exposure", "contrast", "saturation", "hue", "brightness", "levels", "temperature", "tone", "vibrance", "tonemap", "reinhard", "aces", "filmic", "uncharted", "unreal", "lottes", "white point", "exponential", "solarize", "solarise", "sabattier", "invert", "negative"],
    group: "colour"
  },
  kind: "processor",
  idleAtZero: ["solarize", "invert"],
  paramSchema: ru,
  defaultParams: Ap,
  buildLayer: Bp
}, iu = {
  radius: {
    type: "slider",
    label: "Radius",
    min: 1,
    max: 100,
    step: 1,
    default: 35,
    description: "How large an area each pixel samples. Bigger flattens more detail into fewer, broader strokes."
  },
  sharpness: {
    type: "slider",
    label: "Sharpness",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "How decisively the filter picks one region over its neighbours. High keeps crisp boundaries between flat patches — the painted, palette-knife look; low lets them bleed toward an ordinary blur."
  }
}, Vp = Object.fromEntries(
  Object.entries(iu).map(([e, t]) => [e, t.default])
), Na = te(0.299, 0.587, 0.114), qa = 8, ai = 16, _p = [0.5, 1], Xp = 1e-4;
function Wp(e, t) {
  const s = r(e.radius / 100 * 0.06), o = r(1 + e.sharpness / 100 * 15), a = r(1), n = (d) => {
    const c = t(d), h = c.rgb.dot(Na), m = [], x = [], g = [];
    for (let v = 0; v < qa; v++)
      m[v] = c.rgb, x[v] = h.mul(h), g[v] = 1;
    for (let v = 0; v < ai; v++) {
      const y = v / ai * Math.PI * 2, k = Math.floor(y / (Math.PI / 4)) % qa;
      for (const A of _p) {
        const O = E(
          s.mul(Math.cos(y) * A).div(a),
          s.mul(Math.sin(y) * A)
        ), R = t(d.add(O)), T = R.rgb.dot(Na);
        m[k] = m[k].add(R.rgb), x[k] = x[k].add(T.mul(T)), g[k] += 1;
      }
    }
    let w = te(0, 0, 0), S = b(0);
    for (let v = 0; v < qa; v++) {
      const y = 1 / g[v], k = m[v].mul(y), A = k.dot(Na), O = ne(x[v].mul(y).sub(A.mul(A)), b(0)), R = $e(O.add(Xp), o.negate());
      w = w.add(k.mul(R)), S = S.add(R);
    }
    return ie(w.div(S), c.a);
  }, l = (d) => {
    s.value = d.radius / 100 * 0.06, o.value = 1 + d.sharpness / 100 * 15;
  }, i = new p.Vector2();
  return { layerFn: n, updateUniforms: l, renderPass: (d) => {
    d.getDrawingBufferSize(i), a.value = i.x / Math.max(1, i.y);
  } };
}
const Gp = {
  meta: {
    id: "kuwahara",
    name: "Kuwahara",
    description: "Edge-preserving painterly smoothing of the layers below",
    keywords: ["painterly", "paint", "oil", "brush", "watercolour", "watercolor", "smooth", "stylise", "stylize", "anisotropic"],
    group: "blur"
  },
  kind: "processor",
  // 33 taps across 8 sectors — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: iu,
  defaultParams: Vp,
  buildLayer: Wp
}, lu = {
  amount: {
    type: "slider",
    label: "Amount",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "How far the noise field pushes the image. 0 leaves it untouched; high values smear it past recognition."
  },
  scale: {
    type: "slider",
    label: "Scale",
    min: 1,
    max: 100,
    step: 1,
    default: 30,
    description: "How big the features of the noise field are. Low values give broad slow undulation, high values a tight nervous ripple."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    group: "Animation",
    description: "How fast the noise field drifts. 0 freezes it into a static warp."
  },
  detail: {
    type: "dropdown",
    label: "Type",
    options: [
      { label: "Simplex", value: "simplex" },
      { label: "Turbulent", value: "turbulent" }
    ],
    default: "simplex",
    structural: !0,
    description: "Which noise the warp is built from. Simplex is smooth and organic; Turbulent stacks octaves for a rougher, more fibrous push."
  }
}, Yp = Object.fromEntries(
  Object.entries(lu).map(([e, t]) => [e, t.default])
);
function Up(e, t) {
  const s = e.detail === "turbulent", o = r(e.amount / 100 * 0.18), a = r(e.scale / 100 * 6), n = r(e.speed / 100 * 0.5), l = r(1), i = r(0), u = r(0), d = r(0), c = r(0), h = (v) => s ? Bt(v, 3, 2, 0.5) : De(v), m = Ke((v) => {
    const y = i.mul(n), k = v.mul(a), A = d.mul(Math.PI * 2), O = c.mul(Ve(A)).mul(u), R = c.mul(Ae(A)).mul(u), T = $(y, b(0), u), C = $(y.add(2.1), b(2.1), u), P = h(te(k.x.add(O), k.y.add(R), T)), F = h(te(k.x.add(11.3).add(O), k.y.add(5.7).add(R), C)), M = E(P.div(l), F).mul(o);
    return v.add(M);
  }), x = (v) => t(m(v)), g = (v) => {
    o.value = v.amount / 100 * 0.18, a.value = v.scale / 100 * 6, n.value = v.speed / 100 * 0.5;
  }, w = new p.Vector2();
  return { layerFn: x, updateUniforms: g, renderPass: (v) => {
    i.value = Ce();
    const y = Qe();
    u.value = y.active ? 1 : 0, d.value = Ne(), c.value = n.value * y.duration / (Math.PI * 2), v.getDrawingBufferSize(w), l.value = w.x / Math.max(1, w.y);
  }, warpUv: m };
}
const jp = {
  meta: {
    id: "noiseWarp",
    name: "Noise Warp",
    description: "Liquid noise displacement of the layers below",
    keywords: ["liquid", "displace", "distort", "ripple", "melt", "wobble", "turbulence", "wave", "warping", "bend"],
    group: "distort"
  },
  kind: "processor",
  // Displaced UV — the silhouette warps with the fill.
  transformsSilhouette: !0,
  paramSchema: lu,
  defaultParams: Yp,
  buildLayer: Up
}, cu = {
  // How far pigment is dragged, in total, along its curved path.
  amount: {
    type: "slider",
    label: "Amount",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "How far pigment is dragged along its curved path, in total. 0 leaves the image alone."
  },
  // Size of the flow cells — big lazy currents at the low end, tight eddies high.
  scale: {
    type: "slider",
    label: "Scale",
    min: 1,
    max: 100,
    step: 1,
    default: 35,
    description: "The size of the flow cells. Low values give big lazy currents, high values tight eddies."
  },
  // Rotates the flow off the field's own slope: 0 pushes pigment downhill
  // (it pools and pinches), 100 sends it round the ridges (whirlpools).
  swirl: {
    type: "slider",
    label: "Swirl",
    min: 0,
    max: 100,
    step: 1,
    default: 70,
    description: "How far the flow is rotated off the field's own slope. 0 pushes pigment straight downhill, where it pools and pinches; 100 sends it around the ridges instead, giving whirlpools."
  },
  // Structural: the potential field's octave count is read once in `buildLayer`
  // and baked into the node graph — it picks which noise function the shader
  // calls, which a uniform cannot do. Marbled costs twice the noise of Smooth.
  texture: {
    type: "dropdown",
    label: "Texture",
    options: [
      { label: "Smooth", value: "smooth" },
      { label: "Marbled", value: "marbled" }
    ],
    default: "smooth",
    structural: !0,
    description: "How rough the underlying current is. Smooth is a single octave of noise; Marbled stacks a second for a veined, stone-like drag, at twice the noise cost."
  },
  // How fast the current itself churns. 0 freezes the warp. Grouped with the
  // other effects that run on their own: everything that moves without you
  // touching it lives under Animation.
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    group: "Animation",
    description: "How fast the current itself churns. 0 freezes the warp into a still distortion."
  },
  ...bt
}, $p = Object.fromEntries(
  Object.entries(cu).map(([e, t]) => [e, t.default])
), uu = 5, Za = 0.05, ni = 0.3, Np = 9;
function qp(e, t) {
  const s = e.texture === "marbled", o = r(ri(e.amount)), a = r(e.scale / 100 * 6), n = r(new p.Vector2(1, 0));
  li(n.value, e.swirl);
  const l = r(1);
  let i = ii(e);
  const u = Lt(e), d = r(ci(e)), c = r(0), h = r(new p.Vector2(0, 0)), m = (A) => s ? Bt(A, 2, 2, 0.5) : De(A), x = (A) => E(
    A.x.mul(n.x).sub(A.y.mul(n.y)),
    A.x.mul(n.y).add(A.y.mul(n.x))
  ), g = st(([A]) => {
    const O = E(A.x.sub(0.5).mul(l), A.y.sub(0.5)).toVar(), R = E(u.offset.x.mul(l), u.offset.y);
    return os(uu, () => {
      const T = O.mul(a).add(h), C = m(te(T, c)), P = m(te(T.x.add(Za), T.y, c)), F = m(te(T.x, T.y.add(Za), c)), M = E(P.sub(C), F.sub(C)).mul(1 / Za), I = O.sub(R), f = Rt(I.dot(I).mul(-1 / (ni * ni))).mul(d).mul(Np);
      O.addAssign(x(M).add(x(I).mul(f)).mul(o));
    }), E(O.x.div(l).add(0.5), O.y.add(0.5));
  }), w = Ke((A) => g(A)), S = (A) => t(w(A)), v = (A) => {
    o.value = ri(A.amount), a.value = A.scale / 100 * 6, i = ii(A), li(n.value, A.swirl), d.value = ci(A), u.update(A);
  }, y = new p.Vector2();
  return { layerFn: S, updateUniforms: v, renderPass: (A) => {
    const O = Qe();
    if (O.active) {
      const R = i * O.duration / (Math.PI * 2), T = Ne() * Math.PI * 2;
      h.value.set(R * Math.cos(T), R * Math.sin(T)), c.value = 0;
    } else
      h.value.set(0, 0), c.value = Ce() * i;
    A.getDrawingBufferSize(y), l.value = y.x / Math.max(1, y.y), u.renderPass();
  }, warpUv: w };
}
function ri(e) {
  return e / 100 * 0.4 / uu;
}
function ii(e) {
  return e.speed / 100 * 0.5;
}
function li(e, t) {
  const s = t / 100 * (Math.PI / 2);
  e.set(Math.cos(s), Math.sin(s));
}
function ci(e) {
  const t = e._ixFollow;
  return (typeof t == "number" ? t : 0) / 100;
}
const Zp = {
  meta: {
    id: "smudge",
    name: "Smudge",
    description: "Drags the layers below through a viscous current, like paint pushed while wet",
    keywords: ["liquify", "liquid", "melt", "smear", "paint", "drag", "fluid", "flow", "swirl", "marble", "viscous", "warp", "distort", "ripple"],
    group: "distort"
  },
  kind: "processor",
  // Displaced UV — the silhouette flows with the fill.
  transformsSilhouette: !0,
  paramSchema: cu,
  defaultParams: $p,
  buildLayer: qp
}, ui = 128, di = 1024, Kp = 20, Qp = 0.8, hi = 0.016666;
function ho(e, t, s) {
  const o = new p.RenderTarget(e, t, {
    type: p.HalfFloatType,
    minFilter: s,
    magFilter: s,
    depthBuffer: !1,
    stencilBuffer: !1,
    generateMipmaps: !1
  });
  return o.texture.wrapS = p.ClampToEdgeWrapping, o.texture.wrapT = p.ClampToEdgeWrapping, o;
}
function Ka(e, t, s) {
  return { targets: [ho(e, t, s), ho(e, t, s)], i: 0 };
}
const Fs = (e) => e.targets[1 - e.i], Ls = (e) => {
  e.i = 1 - e.i;
};
function ia(e, t) {
  const s = t < 1 ? 1 / t : t, o = Math.round(e), a = Math.round(e * s);
  return t > 1 ? { w: a, h: o } : { w: o, h: a };
}
function Jp() {
  let e = 1, t = ia(ui, e), s = ia(di, e);
  const o = Ka(t.w, t.h, p.LinearFilter), a = Ka(s.w, s.h, p.LinearFilter), n = Ka(t.w, t.h, p.NearestFilter), l = ho(t.w, t.h, p.NearestFilter), i = ho(t.w, t.h, p.NearestFilter), u = ho(s.w, s.h, p.LinearFilter), d = ho(t.w, t.h, p.LinearFilter), c = r(new p.Vector2(1 / t.w, 1 / t.h)), h = r(hi), m = r(30), x = r(1), g = r(0.2), w = r(new p.Vector2(0.5, 0.5)), S = r(new p.Vector3(0, 0, 0)), v = r(0), y = r(25e-4), k = r(1), A = o.targets.map((_) => nt(_.texture)), O = a.targets.map((_) => nt(_.texture)), R = n.targets.map((_) => nt(_.texture)), T = nt(l.texture), C = nt(i.texture), P = (_, H) => _.sample(H), F = () => E(vs().x, vs().y.oneMinus()), M = (_, H) => ({
    L: E(_.x.sub(H.x), _.y),
    R: E(_.x.add(H.x), _.y),
    T: E(_.x, _.y.add(H.y)),
    B: E(_.x, _.y.sub(H.y))
  }), I = (_) => {
    const H = new p.MeshBasicNodeMaterial();
    return H.fragmentNode = _, H.depthTest = !1, H.depthWrite = !1, H.transparent = !1, H.blending = p.NoBlending, H;
  }, f = [], D = (_) => {
    const H = [I(_(0)), I(_(1))];
    return f.push(...H), H;
  }, L = (_) => {
    const H = [[I(_(0, 0)), I(_(0, 1))], [I(_(1, 0)), I(_(1, 1))]];
    return f.push(H[0][0], H[0][1], H[1][0], H[1][1]), H;
  }, B = (_) => st(() => {
    const H = F(), q = E(H.x.sub(w.x).mul(k), H.y.sub(w.y)), ee = Rt(q.dot(q).div(y).negate()), Z = P(_, H);
    return ie(Z.xyz.add(ee.mul(S)), Z.w.add(ee.mul(v)));
  })(), z = D((_) => B(A[_])), V = D((_) => B(O[_])), Y = D((_) => st(() => {
    const H = F(), q = M(H, c), ee = P(A[_], q.L).y, Z = P(A[_], q.R).y, ae = P(A[_], q.T).x, re = P(A[_], q.B).x;
    return ie(Z.sub(ee).sub(ae).add(re).mul(0.5), 0, 0, 1);
  })()), U = D((_) => st(() => {
    const H = F(), q = M(H, c), ee = P(C, q.L).x, Z = P(C, q.R).x, ae = P(C, q.T).x, re = P(C, q.B).x, be = P(C, H).x, ye = E(we(ae).sub(we(re)), we(Z).sub(we(ee))).mul(0.5).toVar();
    ye.divAssign(Pe(ye).add(1e-4)), ye.mulAssign(m.mul(be)), ye.y.mulAssign(-1);
    const ke = P(A[_], H).xy.add(ye.mul(h));
    return ie(fe(ke, E(-1e3, -1e3), E(1e3, 1e3)), 0, 1);
  })()), j = D((_) => st(() => {
    const H = F(), q = M(H, c), ee = P(A[_], H).xy, Z = P(A[_], q.L).x.toVar(), ae = P(A[_], q.R).x.toVar(), re = P(A[_], q.T).y.toVar(), be = P(A[_], q.B).y.toVar();
    return ys(q.L.x.lessThan(0), () => {
      Z.assign(ee.x.negate());
    }), ys(q.R.x.greaterThan(1), () => {
      ae.assign(ee.x.negate());
    }), ys(q.T.y.greaterThan(1), () => {
      re.assign(ee.y.negate());
    }), ys(q.B.y.lessThan(0), () => {
      be.assign(ee.y.negate());
    }), ie(ae.sub(Z).add(re).sub(be).mul(0.5), 0, 0, 1);
  })()), X = D((_) => st(() => P(R[_], F()).mul(Qp))()), N = D((_) => st(() => {
    const H = F(), q = M(H, c), ee = P(R[_], q.L).x, Z = P(R[_], q.R).x, ae = P(R[_], q.T).x, re = P(R[_], q.B).x, be = P(T, H).x;
    return ie(ee.add(Z).add(re).add(ae).sub(be).mul(0.25), 0, 0, 1);
  })()), G = L((_, H) => st(() => {
    const q = F(), ee = M(q, c), Z = P(R[_], ee.L).x, ae = P(R[_], ee.R).x, re = P(R[_], ee.T).x, be = P(R[_], ee.B).x, ye = P(A[H], q).xy;
    return ie(ye.sub(E(ae.sub(Z), re.sub(be))), 0, 1);
  })()), W = (_, H, q) => st(() => {
    const ee = F(), Z = ee.sub(P(_, ee).xy.mul(h).mul(c));
    return P(H, Z).div(q.mul(h).add(1));
  })(), J = D((_) => W(A[_], A[_], g)), Q = L((_, H) => W(A[_], O[H], x)), se = D((_) => st(() => P(O[_], F()))()), K = D((_) => st(() => P(A[_], F()))()), le = I(ie(0, 0, 0, 0));
  f.push(le);
  const ce = new p.Scene(), oe = new p.OrthographicCamera(-1, 1, 1, -1, 0, 1), de = new p.PlaneGeometry(2, 2), me = new p.Mesh(de, le);
  me.frustumCulled = !1, ce.add(me);
  let xe = !1;
  const ge = (_, H, q) => {
    me.material = H, _.setRenderTarget(q), _.render(ce, oe);
  }, We = (_) => {
    for (const H of [
      ...o.targets,
      ...a.targets,
      ...n.targets,
      l,
      i,
      u,
      d
    ]) ge(_, le, H);
    o.i = 0, a.i = 0, n.i = 0, xe = !0;
  };
  return {
    dyeTexture: () => u.texture,
    velocityTexture: () => d.texture,
    dyeTexel: () => ({ x: 1 / s.w, y: 1 / s.h }),
    simTexel: () => ({ x: 1 / t.w, y: 1 / t.h }),
    step: (_, H, q, ee) => {
      const Z = _.getRenderTarget(), ae = _.autoClear;
      _.autoClear = !1, xe || We(_), k.value = e, y.value = e > 1 ? ee.radius * e : ee.radius, m.value = ee.curl, x.value = ee.dyeDissipation, g.value = ee.velocityDissipation, h.value = Math.max(0, Math.min(hi, H));
      for (const re of q)
        w.value.set(re.x, re.y), S.value.set(re.dx, re.dy, 0), v.value = 0, ge(_, z[o.i], Fs(o)), Ls(o), S.value.set(re.r, re.g, re.b), v.value = re.a, ge(_, V[a.i], Fs(a)), Ls(a);
      ge(_, Y[o.i], i), ge(_, U[o.i], Fs(o)), Ls(o), ge(_, j[o.i], l), ge(_, X[n.i], Fs(n)), Ls(n);
      for (let re = 0; re < Kp; re++)
        ge(_, N[n.i], Fs(n)), Ls(n);
      ge(_, G[n.i][o.i], Fs(o)), Ls(o), ge(_, J[o.i], Fs(o)), Ls(o), ge(_, Q[o.i][a.i], Fs(a)), Ls(a), ge(_, se[a.i], u), ge(_, K[o.i], d), _.autoClear = ae, _.setRenderTarget(Z);
    },
    resize: (_) => {
      if (!(_ > 0) || Math.abs(_ - e) < 1e-4) return;
      e = _;
      const H = ia(ui, _), q = ia(di, _);
      if (!(H.w === t.w && H.h === t.h)) {
        t = H, s = q;
        for (const ee of [...o.targets, ...n.targets, l, i, d])
          ee.setSize(t.w, t.h);
        for (const ee of [...a.targets, u]) ee.setSize(s.w, s.h);
        c.value.set(1 / t.w, 1 / t.h), xe = !1;
      }
    },
    dispose: () => {
      for (const _ of [
        ...o.targets,
        ...a.targets,
        ...n.targets,
        l,
        i,
        u,
        d
      ]) _.dispose();
      de.dispose();
      for (const _ of f) _.dispose();
    }
  };
}
const du = {
  // ── What it is: where the stroke that stirs the fluid comes from ──────────
  source: {
    type: "dropdown",
    label: "Driven by",
    group: "Flow",
    options: [
      { label: "Auto path", value: "auto" },
      { label: "Cursor", value: "pointer" }
    ],
    default: "auto",
    description: "What stirs the fluid. Auto path runs a stroke along a figure of its own forever, so the layer keeps moving unattended; Cursor hands it to the viewer's pointer, so the fluid is stirred by whoever is looking. Cursor makes the layer interactive and does nothing in a still export."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 1,
    max: 100,
    step: 1,
    default: 30,
    showIf: (e) => e.source !== "pointer",
    description: "How fast the stroke travels its figure. Auto path only."
  },
  spread: {
    type: "slider",
    label: "Spread",
    min: 5,
    max: 100,
    step: 1,
    default: 65,
    showIf: (e) => e.source !== "pointer",
    description: "How much of the frame the stroke covers. Low keeps the fluid churning in the middle, high sweeps it corner to corner. Auto path only."
  },
  force: {
    type: "slider",
    label: "Force",
    min: 1,
    max: 100,
    step: 1,
    default: 55,
    description: "How hard the stroke pushes. This is the only energy the fluid ever gets, so it sets how violently the field churns — low is a slow drift, high throws jets that tear across the frame and keep curling long after the stroke has moved on."
  },
  radius: {
    type: "slider",
    label: "Radius",
    min: 1,
    max: 100,
    step: 1,
    default: 38,
    description: "How wide the stroke's touch is. Small is a fine nib that draws thin filaments; large is a palm pushing a whole region at once."
  },
  // ── How it looks: what the flow does to the layers below ──────────────────
  amount: {
    type: "slider",
    label: "Amount",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    group: "Distortion",
    description: "How far the flow drags the picture underneath it. At 0 the fluid only lays ink and the layers below stay put; high pulls them into long ribbons that follow the eddies, far enough that a shape can be smeared right across the frame."
  },
  // Named to match Lens Distort, which already owns this control: a designer
  // who has learnt Fringing there has learnt it here.
  chromatic: {
    type: "slider",
    label: "Fringing",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    description: "Splits red and blue slightly further apart than green as the picture is dragged, so fast-moving edges break into a prismatic rim. The chromatic aberration of a cheap lens, driven by the flow rather than by the frame."
  },
  // ── Surface detail on that: the ink the flow carries ──────────────────────
  color: {
    type: "dropdown",
    label: "Ink",
    group: "Ink",
    options: [
      { label: "Spectrum", value: "spectrum" },
      { label: "Flow", value: "flow" },
      { label: "Single", value: "single" }
    ],
    default: "spectrum",
    structural: !0,
    description: "What colour the stroke lays down. Spectrum walks the hue as it goes, so the fluid folds bands of unmixed colour through each other — the classic look, and the one that rewards a long stroke. Flow paints the velocity itself, so hue reads direction and the negative half of the field goes ink-black beside saturated colour. Single is one chosen colour, for ink dropped in water rather than a spectrum."
  },
  tint: {
    type: "color",
    label: "Colour",
    default: "#ff2d55",
    showIf: (e) => e.color === "single",
    description: "The ink's colour. Single only."
  },
  ink: {
    type: "slider",
    label: "Density",
    min: 0,
    max: 100,
    step: 1,
    default: 70,
    description: "How strongly the ink covers the picture. At 0 the fluid is invisible and only its distortion shows — the layers below churn with nothing on top. High is opaque pigment that hides whatever it flows over. A single pass of the stroke is faint at any setting: the ink accumulates, so colour only burns through where the fluid has folded over itself."
  },
  fade: {
    type: "slider",
    label: "Fade",
    min: 0,
    max: 100,
    step: 1,
    default: 38,
    description: "How fast the ink thins out behind the stroke. At 0 it never fades and the frame fills until every part of it is saturated; high clears the ink almost as fast as it is laid, leaving only what is being drawn now."
  },
  // ── How it moves: the fluid's own behaviour ───────────────────────────────
  swirl: {
    type: "slider",
    label: "Swirl",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    group: "Fluid",
    description: "How hard the solver puts back the curl a coarse grid loses each step. At 0 the flow spreads and settles like a spilt liquid; high keeps the eddies tightening into whorls and filaments. Worth knowing: this *adds* energy rather than shaping what is there, so a high setting will keep the fluid turning long after the stroke has stopped — past about 60 it can outrun Damping altogether and the frame never fully comes to rest."
  },
  damping: {
    type: "slider",
    label: "Damping",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "How quickly the flow itself runs out. Low is near-frictionless — a push keeps travelling and the frame stays alive long after the stroke; high brings the fluid to rest within a second of it. Once the flow has run down, whatever is underneath is restored exactly, so this is really how long the layer holds on to a gesture."
  }
}, ef = Object.fromEntries(
  Object.entries(du).map(([e, t]) => [e, t.default])
);
function tf(e, t) {
  const s = Jp(), o = e.color ?? "spectrum", a = r(fi(e.amount)), n = r(e.chromatic / 100), l = r(gi(e.ink)), i = r(new p.Vector2(1 / 1024, 1 / 1024)), u = r(new p.Vector3(1, 1, 1)), d = r(new p.Vector2(1 / 128, 1 / 128)), c = nt(s.velocityTexture()), h = nt(s.dyeTexture()), m = (G) => E(G.x, G.y.oneMinus()), x = Ke((G) => {
    const W = m(G), J = E(d.x.mul(2), 0), Q = E(0, d.y.mul(2)), se = c.sample(W).xy.mul(0.36).add(c.sample(W.add(J)).xy.mul(0.16)).add(c.sample(W.sub(J)).xy.mul(0.16)).add(c.sample(W.add(Q)).xy.mul(0.16)).add(c.sample(W.sub(Q)).xy.mul(0.16));
    return E(se.x, se.y.negate());
  }), g = (G) => $e(Me(sf, of, Pe(G)), 1.2), w = Ke((G) => {
    const W = x(G);
    return W.mul(a).mul(g(W));
  }), S = Ke((G) => G.sub(w(G))), v = (G, W) => {
    const J = G(h.sample(E(W.x.sub(i.x), W.y))), Q = G(h.sample(E(W.x.add(i.x), W.y))), se = G(h.sample(E(W.x, W.y.add(i.y)))), K = G(h.sample(E(W.x, W.y.sub(i.y)))), le = ws(te(Q.sub(J), se.sub(K), Pe(i)));
    return fe(Re(le, te(0, 0, 1)).add(0.7), 0.7, 1);
  }, y = (G) => Pe(G.rgb), k = (G) => G.a, A = Ke((G) => {
    const W = m(G), J = h.sample(W);
    let Q, se;
    return o === "flow" ? (Q = J.rgb.mul(nf).add(0.5), se = fe(Pe(J.rg).mul(rf).sub(Qa).mul(l), 0, 1)) : o === "single" ? (Q = u.mul(v(k, W)), se = fe(J.a.sub(Qa).mul(l), 0, 1)) : (Q = J.rgb.mul(v(y, W)), se = fe(ne(ne(Q.r, Q.g), Q.b).sub(Qa).mul(l), 0, 1)), ie(Q, se);
  }), O = (G) => {
    const W = w(G), J = S(G), Q = W.mul(n.mul(af)), se = t(J), K = t(J.sub(Q)).r, le = t(J.add(Q)).b, ce = ie(K, se.g, le, se.a), oe = A(G);
    return ie($(ce.rgb, oe.rgb, oe.a), ce.a);
  }, R = (G) => ne(A(G).a, g(x(G)).mul(pe(1e-9, a)));
  let T = e.source ?? "auto", C = bi(e.force), P = yi(e.speed), F = e.spread / 100, M = ki(e.tint);
  u.value.set(M[0], M[1], M[2]);
  const I = {
    radius: wi(e.radius),
    curl: vi(e.swirl),
    dyeDissipation: xi(e.fade),
    velocityDissipation: Mi(e.damping)
  }, f = (G) => {
    a.value = fi(G.amount), n.value = G.chromatic / 100, l.value = gi(G.ink), T = G.source ?? "auto", C = bi(G.force), P = yi(G.speed), F = G.spread / 100, M = ki(G.tint), u.value.set(M[0], M[1], M[2]), I.radius = wi(G.radius), I.curl = vi(G.swirl), I.dyeDissipation = xi(G.fade), I.velocityDissipation = Mi(G.damping);
  }, D = (G, W) => ({ x: G, y: 1 - W });
  let L = 1, B = 0.5, z = 0.5, V = !1;
  const Y = [], U = (G, W) => ({
    dx: L < 1 ? G * L : G,
    dy: L > 1 ? W / L : W
  }), j = (G, W) => o === "spectrum" ? cf(Ce() * 0.35 % 1, 1, 1).map((J) => J * Eo) : o === "single" ? [M[0] * Eo, M[1] * Eo, M[2] * Eo] : [G, W, 1], X = (G, W, J, Q) => {
    const se = U(J, Q), K = D(G, W), le = se.dx * C, ce = -se.dy * C;
    Y.push({ x: K.x, y: K.y, dx: le, dy: ce, ...lf(j(le, ce)), a: Eo });
  };
  return { layerFn: O, updateUniforms: f, renderPass: (G, W) => {
    L = W.width / Math.max(1, W.height), s.resize(L);
    const J = s.dyeTexel();
    i.value.set(J.x, J.y);
    const Q = s.simTexel();
    d.value.set(Q.x, Q.y);
    const se = Jt();
    if (Y.length = 0, T === "pointer") {
      const K = ns(), le = K.x * 0.5 + 0.5, ce = K.y * 0.5 + 0.5;
      if (K.active && V) {
        const oe = pi(le - B), de = pi(ce - z);
        (oe !== 0 || de !== 0) && X(le, ce, oe, de);
      }
      B = le, z = ce, V = K.active;
    } else if (se > 0) {
      const K = Ce() * P, le = F * 0.5, ce = F * 0.35;
      X(
        0.5 + le * Math.sin(K),
        0.5 + ce * Math.sin(K * 2),
        le * Math.cos(K) * P * se,
        ce * 2 * Math.cos(K * 2) * P * se
      ), V = !1;
    }
    s.step(G, se, Y, I);
  }, warpUv: S, coverageFn: R, dispose: s.dispose };
}
const mi = 0.06, pi = (e) => Math.max(-mi, Math.min(mi, e)), sf = 3, of = 55, Qa = 0.01, Eo = 0.15, af = 0.5, nf = 0.1, rf = 6e-3;
function fi(e) {
  return e / 100 * 6e-4;
}
function gi(e) {
  return e / 100 * 2;
}
function bi(e) {
  return e / 100 * 12e3;
}
function yi(e) {
  return e / 100 * 6;
}
function wi(e) {
  return e / 100 * 0.01;
}
function vi(e) {
  return e / 100 * 60;
}
function xi(e) {
  return e / 100 * 3;
}
function Mi(e) {
  const t = e / 100;
  return t * t * 5;
}
const lf = ([e, t, s]) => ({ r: e, g: t, b: s });
function ki(e) {
  const t = (e ?? "#ffffff").replace("#", ""), s = parseInt(t.length === 3 ? t.split("").map((o) => o + o).join("") : t, 16);
  return Number.isFinite(s) ? [(s >> 16 & 255) / 255, (s >> 8 & 255) / 255, (s & 255) / 255] : [1, 1, 1];
}
function cf(e, t, s) {
  const o = Math.floor(e * 6), a = e * 6 - o, n = s * (1 - t), l = s * (1 - a * t), i = s * (1 - (1 - a) * t);
  switch (o % 6) {
    case 0:
      return [s, i, n];
    case 1:
      return [l, s, n];
    case 2:
      return [n, s, i];
    case 3:
      return [n, l, s];
    case 4:
      return [i, n, s];
    default:
      return [s, n, l];
  }
}
const uf = {
  meta: {
    id: "fluid",
    name: "Fluid",
    description: "A stirred fluid simulation that paints the frame and drags the layers below it",
    keywords: [
      "fluid",
      "liquid",
      "ink",
      "dye",
      "water",
      "smoke",
      "navier",
      "stokes",
      "simulation",
      "sim",
      "advection",
      "vorticity",
      "curl",
      "swirl",
      "eddy",
      "turbulence",
      "flow",
      "stir",
      "displacement",
      "distort",
      "refract",
      "marble",
      "paint",
      "cursor",
      "interactive",
      "mouse",
      "trail",
      "rainbow"
    ],
    group: "distort"
  },
  kind: "processor",
  // Three taps of the input per pixel (two of them fringed), plus four more of
  // the dye for shading — so the stack below is worth rendering once instead of
  // three times.
  resampling: !0,
  // Displaced uv: the silhouette flows with the fill.
  transformsSilhouette: !0,
  usesPointer: (e) => e.source === "pointer",
  paramSchema: du,
  defaultParams: ef,
  buildLayer: tf
}, hu = {
  mode: {
    type: "dropdown",
    label: "Mode",
    options: [
      { label: "Glow", value: "glow" },
      { label: "Spotlight", value: "spotlight" }
    ],
    default: "glow",
    structural: !0,
    description: "The shape of the light. Glow is an omnidirectional pool that falls off in all directions; Spotlight is a directed cone."
  },
  color: {
    type: "color",
    label: "Color",
    default: "#ffd9a0",
    description: "The light colour. Warm values read as lamp or sun, cool as moon or screen light."
  },
  intensity: {
    type: "slider",
    label: "Intensity",
    min: 0,
    max: 200,
    step: 1,
    default: 100,
    description: "How bright the light is. Above 100 overdrives, which pairs with Bloom."
  },
  radius: {
    type: "slider",
    label: "Radius",
    min: 5,
    max: 150,
    step: 1,
    default: 60,
    description: "How far the light reaches across the frame."
  },
  falloff: {
    type: "slider",
    label: "Falloff",
    min: 1,
    max: 8,
    step: 1,
    default: 2,
    description: "How sharply the light fades with distance. 1 is a slow, almost linear fade filling much of the frame; 8 concentrates it into a tight pool with a dark surround."
  },
  // Position (draggable on canvas).
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the light source sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the light source vertically, as a percentage of the frame. 0 is centred."
  },
  // Lens ghosts: the chain of discs and rings a bright source throws across a
  // camera lens. They sit on the line from the light through the frame's
  // centre, so they swing round as the light moves — which is the whole effect.
  ghosts: {
    type: "slider",
    label: "Ghosts",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Lens",
    description: "Adds lens flare ghosts: soft coloured discs and rings strung along the line from the light through the centre of the frame, the way a camera lens reflects a bright source. They swing across the frame as the light moves. 0 is off."
  },
  ...bt
}, df = Object.fromEntries(
  Object.entries(hu).map(([e, t]) => [e, t.default])
), hf = [
  { k: 0.45, r: 0.025, ring: !1, gain: 0.35, tint: 0.2 },
  { k: 0.15, r: 0.06, ring: !1, gain: 0.18, tint: 0.6 },
  { k: -0.25, r: 0.04, ring: !1, gain: 0.28, tint: 0.9 },
  { k: -0.5, r: 0.11, ring: !0, gain: 0.12, tint: 0.4 },
  { k: -0.8, r: 0.07, ring: !1, gain: 0.16, tint: 1 },
  { k: -1.15, r: 0.2, ring: !0, gain: 0.07, tint: 0.7 }
], mf = te(0.55, 0.85, 1);
function pf(e, t, s) {
  const o = s ? s.live("ghosts") : !0, a = r((e.ghosts ?? 0) / 100), n = Lt(e), l = e.mode === "spotlight", i = r(new p.Color(e.color)), u = r(e.intensity / 100), d = r(e.radius / 100), c = r(e.falloff), h = r(new p.Vector2(
    0.5 + e.posX / 100 * 0.5,
    0.5 + e.posY / 100 * 0.5
  )), m = r(1), x = (v) => {
    const y = t(v), k = h.x.add(n.offset.x), A = h.y.add(n.offset.y), O = Pe(E(v.x.sub(k).mul(m), v.y.sub(A))), R = $e(fe(b(1).sub(O.div(d)), 0, 1), c);
    let T;
    if (l) {
      const C = b(0.06).add(R.mul(u));
      T = y.rgb.mul(i).mul(C).clamp(0, 1);
    } else
      T = y.rgb.add(i.mul(u).mul(R)).clamp(0, 1);
    if (o) {
      const C = k.sub(0.5).mul(m), P = A.sub(0.5), F = v.x.sub(0.5).mul(m), M = v.y.sub(0.5);
      let I = te(0, 0, 0);
      for (const f of hf) {
        const D = Pe(E(F.sub(C.mul(f.k)), M.sub(P.mul(f.k)))), L = f.ring ? b(1).sub(Me(0, f.r * 0.4, we(D.sub(f.r)))) : b(1).sub(Me(f.r * 0.55, f.r, D)), B = $(i, mf, f.tint);
        I = I.add(B.mul(L).mul(f.gain));
      }
      T = T.add(I.mul(a).mul(u)).clamp(0, 1);
    }
    return ie(T, y.a);
  }, g = (v) => {
    i.value.set(v.color), u.value = v.intensity / 100, d.value = v.radius / 100, c.value = v.falloff, h.value.set(
      0.5 + v.posX / 100 * 0.5,
      0.5 + v.posY / 100 * 0.5
    ), a.value = (v.ghosts ?? 0) / 100, n.update(v);
  }, w = new p.Vector2();
  return { layerFn: x, updateUniforms: g, renderPass: (v) => {
    v.getDrawingBufferSize(w), m.value = w.x / Math.max(1, w.y), n.renderPass();
  } };
}
const ff = {
  meta: {
    id: "light",
    name: "2D Light",
    description: "A positioned light over the layers below — glow or spotlight",
    keywords: ["glow", "spotlight", "lamp", "lighting", "illuminate", "flare", "lens flare", "ghosts", "sun", "anamorphic", "falloff", "shine"],
    group: "light"
  },
  kind: "processor",
  idleAtZero: ["ghosts"],
  // A field: the lamp reaches `radius/100` from Position in screen-isotropic
  // units — the same line `layerFn` measures `d` against — so the canvas can
  // frame that reach and let it be dragged and resized directly.
  radialExtent: {
    key: "radius",
    min: 5,
    max: 150,
    reach: (e) => e.radius / 100
  },
  paramSchema: hu,
  defaultParams: df,
  buildLayer: pf
};
function Ms(e) {
  const t = e ?? jt, s = va(t), o = Math.max(1, s.length), a = s.map((d) => r(new p.Color(d.color))), n = s.map((d) => r(d.pos / 100));
  return { sample: (d) => {
    let c = a[0];
    for (let h = 1; h < o; h++) {
      const m = ne(n[h].sub(n[h - 1]), b(1e-4)), x = fe(d.sub(n[h - 1]).div(m), 0, 1);
      c = $(c, a[h], x);
    }
    return c;
  }, sampleCpu: (d, c) => {
    c.copy(a[0].value);
    for (let h = 1; h < o; h++) {
      const m = Math.max(n[h].value - n[h - 1].value, 1e-4), x = Math.min(1, Math.max(0, (d - n[h - 1].value) / m));
      c.lerp(a[h].value, x);
    }
    return c;
  }, update: (d) => {
    const c = va(d ?? t), h = Math.min(o, c.length);
    for (let m = 0; m < h; m++)
      a[m].value.set(c[m].color), n[m].value = c[m].pos / 100;
  }, stopCount: o };
}
const gf = {
  type: "linear",
  angle: 90,
  stops: [
    { color: "#3a2bff", pos: 0 },
    { color: "#00d0ff", pos: 20 },
    { color: "#e8fff4", pos: 38 },
    { color: "#ff3fd0", pos: 56 },
    { color: "#ff5a00", pos: 76 },
    { color: "#ffc400", pos: 100 }
  ]
}, mu = {
  height: {
    type: "slider",
    label: "Height",
    min: -100,
    max: 100,
    step: 1,
    default: 50,
    description: "How far the picture is pushed into relief, reading its brightness as height. Positive raises the light parts into domes and ridges; negative presses them in, so bright shapes read as hollows. 0 leaves it flat."
  },
  softness: {
    type: "slider",
    label: "Softness",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "How wide a slope the surface is shaped over. Low follows every edge closely, crisp as embossed paper; high rounds the whole picture into soft, poured forms."
  },
  angle: {
    type: "slider",
    label: "Light angle",
    min: 0,
    max: 360,
    step: 1,
    default: 135,
    description: "Where the light comes from, in degrees around the frame. 0 is from the right, 90 from above, 180 from the left."
  },
  gloss: {
    type: "slider",
    label: "Gloss",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    description: "How wet the surface looks — the strength of the white highlight where the surface faces the light. 0 is matte, a soft shaded relief; high is glazed ceramic or liquid."
  },
  film: {
    type: "slider",
    label: "Film",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "Thin-film colour on the slopes, the way a soap bubble or oil on water shimmers: flat areas keep their colour and the colour shifts as the surface turns. 0 is off."
  },
  filmColor: {
    type: "gradient",
    ramp: !0,
    label: "Film color",
    default: Pt(gf),
    showIf: (e) => e.film > 0,
    description: "The colours the slopes run through, from gently sloped at the left end to steepest at the right."
  }
}, bf = Object.fromEntries(
  Object.entries(mu).map(([e, t]) => [e, t.type === "gradient" ? Pt(t.default) : t.default])
), Sn = Math.PI / 180, Si = 35 * Sn, Pi = 6, yf = 48, Ai = (e) => 12e-4 + (e / 100) ** 2 * 0.02;
function wf(e, t) {
  const s = r(e.height / 100 * Pi), o = r(Ai(e.softness)), a = r(e.angle * Sn), n = r(e.gloss / 100 * 1.5), l = r(e.film / 100), i = r(1), u = r(new p.Vector2(1080, 1080)), d = Ms(e.filmColor);
  return { layerFn: (x) => {
    const g = t(x), w = (B) => B.r.mul(0.299).add(B.g.mul(0.587)).add(B.b.mul(0.114)), S = x.mul(u), v = Se(b(52.9829189).mul(Se(S.x.mul(0.06711056).add(S.y.mul(583715e-8))))).mul(Math.PI / 4), y = (B, z) => {
      let V = E(0, 0);
      for (let Y = 0; Y < 8; Y++) {
        const U = v.add(z + Y / 8 * Math.PI * 2), j = E(U.cos(), U.sin());
        V = V.add(j.mul(w(t(x.add(E(B.div(i).mul(j.x), B.mul(j.y)))))));
      }
      return V.div(4);
    }, k = [[1, 0], [0.75, 0.41], [0.5, 0.17], [0.25, 0.63]];
    let A = E(0, 0);
    for (const [B, z] of k) A = A.add(y(o.mul(B), z));
    A = A.div(k.length);
    const O = ws(te(A.x.mul(s).negate(), A.y.mul(s).negate(), b(1))), R = Math.cos(Si), T = Math.sin(Si), C = te(a.cos().mul(R), a.sin().mul(R), b(T)), P = fe(Re(O, C).div(T), 0, 2), F = g.rgb.mul($(b(1), P, 0.85)), M = ws(C.add(te(0, 0, 1))), I = $e(ne(Re(O, M), b(0)), b(yf)).mul(n), f = fe(b(1).sub(O.z).div(0.5), 0, 1), D = d.sample(f).mul($(b(1), P, 0.5)), L = $(F, D, l.mul(Me(0, 0.15, f)));
    return ie(L.add(I).clamp(0, 1), g.a);
  }, updateUniforms: (x) => {
    s.value = x.height / 100 * Pi, o.value = Ai(x.softness), a.value = x.angle * Sn, n.value = x.gloss / 100 * 1.5, l.value = x.film / 100, d.update(x.filmColor);
  }, renderPass: (x, g) => {
    i.value = g.width / Math.max(1, g.height), u.value.set(g.width, g.height);
  } };
}
const vf = {
  meta: {
    id: "sheen",
    name: "Sheen",
    description: "Reads brightness as height and lights it — gloss, relief and thin-film colour",
    keywords: [
      "emboss",
      "relief",
      "bump",
      "bevel",
      "height map",
      "normal map",
      "lighting",
      "shading",
      "gloss",
      "glossy",
      "specular",
      "highlight",
      "iridescent",
      "iridescence",
      "holographic",
      "thin film",
      "soap bubble",
      "oil slick",
      "3d",
      "liquid",
      "chrome",
      "plastic"
    ],
    group: "light"
  },
  kind: "processor",
  // Four rings of eight taps — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: mu,
  defaultParams: bf,
  buildLayer: wf
}, Ti = 48, pu = Array.from({ length: Ti }, (e, t) => {
  const s = Math.sqrt((t + 0.5) / Ti), o = t * 2.39996323;
  return { x: Math.cos(o) * s, y: Math.sin(o) * s, w: Math.exp(-2 * s * s) };
}), Ci = pu.reduce((e, t) => e + t.w, 0);
function Uo(e, t, s, o, a, n, l = (i) => i.a) {
  const i = ac(ne(s.mul(a.y).div(3), b(1))), u = n ? (h) => n(h, i) : e;
  let d = b(0), c = E(0, 0);
  for (const h of pu) {
    const m = h.x, x = h.y, g = l(u(t.add(E(s.mul(m).div(o), s.mul(x))))).mul(h.w);
    d = d.add(g), c = c.add(E(m, x).mul(g));
  }
  return { coverage: d.mul(1 / Ci), toward: c.mul(1 / Ci) };
}
const xf = {
  stops: [
    { color: "#2a241f", pos: 0 },
    { color: "#7d6e60", pos: 26 },
    { color: "#d6cdc2", pos: 45 },
    { color: "#121317", pos: 50 },
    { color: "#ffffff", pos: 55 },
    { color: "#c8d2df", pos: 76 },
    { color: "#56657a", pos: 100 }
  ]
}, fu = {
  color: {
    type: "color",
    label: "Colour",
    default: "#ffffff",
    group: "Metal",
    description: "The colour of the metal. White is chrome; a warm yellow (#e8b04a) is gold, an orange-pink (#d9805a) copper, a dark blue-grey (#6b7280) gunmetal. The reflection keeps its horizon and highlights whatever the colour.",
    note: (e, t) => t.clipped ? null : "Clip this layer to a logo or text layer — the metal takes that shape and its edges round over."
  },
  bevel: {
    type: "slider",
    label: "Bevel",
    min: 1,
    max: 100,
    step: 1,
    default: 35,
    description: "How far in from the edge the surface rounds over. Low is a crisp chamfer with a flat face; high puffs the whole shape up like a drop of mercury."
  },
  dispersion: {
    type: "slider",
    label: "Dispersion",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "Rainbow fringing where the surface curves away at the edges, the way light splits on a polished rim. 0 is clean metal."
  },
  // How the liquid moves.
  ripple: {
    type: "slider",
    label: "Ripple",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    group: "Flow",
    description: "How much the reflection ripples, as if the metal were still molten. 0 is solid polished metal."
  },
  rippleSize: {
    type: "slider",
    label: "Ripple size",
    min: 1,
    max: 100,
    step: 1,
    default: 40,
    description: "How big the ripples are. Low gives broad slow swells, high a fine shimmer."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    group: "Animation",
    description: "How fast the metal flows. 0 freezes it."
  }
}, Mf = Object.fromEntries(
  Object.entries(fu).map(([e, t]) => [e, t.default])
), Ii = (e) => 2e-3 + e.bevel / 100 * 0.08, Ei = (e) => e.speed / 100 * 0.8, kf = 7;
function Sf(e, t, s) {
  const o = r(Ii(e)), a = r(1), n = r(new p.Vector2(1, 1)), l = r(new p.Color(e.color)), i = r(0), u = r(0), d = r(1), c = r(0), h = r(0), m = r(0), x = Ms(xf), w = new p.Vector3(-0.4, 0.55, 0.73).normalize().clone().add(new p.Vector3(0, 0, 1)).normalize(), S = (T) => b(1).sub(we(Se(T.mul(0.5)).mul(2).sub(1))), v = (T) => {
    const C = t(T), { coverage: P, toward: F } = Uo(t, T, o, a, n, s == null ? void 0 : s.inputLevel), M = fe(P.sub(0.5).mul(2), 0, 1), I = F.mul(b(1).sub(M)).mul(kf), f = ws(te(I.x.negate(), I.y.negate(), 1)), D = f.y.mul(f.z).mul(2), L = E(T.x.sub(0.5).mul(a), T.y.sub(0.5)).mul(d), B = $(
      De(te(L, c)),
      De(te(L.add(31.7), h)),
      m
    ).mul(u), z = b(0.5).add(D.mul(0.5)).add(T.y.sub(0.5).mul(0.6)).add(B.mul(0.18)), Y = fe(Pe(F).mul(4), 0, 1).mul(b(1).sub(M)).mul(i), j = te(
      x.sample(S(z.add(Y))).r,
      x.sample(S(z)).g,
      x.sample(S(z.sub(Y))).b
    ).mul(l), X = $e(ne(Re(f, te(w.x, w.y, w.z)), b(0)), b(90)).mul(0.8);
    return ie(fe(j.add(X), 0, 1), C.a);
  }, y = (T) => {
    o.value = Ii(T), l.value.set(T.color), i.value = T.dispersion / 100 * 0.12, u.value = T.ripple / 100, d.value = 1.5 + T.rippleSize / 100 * 10;
  };
  y(e);
  let k = Ei(e);
  const A = (T) => {
    y(T), k = Ei(T);
  }, O = new p.Vector2();
  return { layerFn: v, updateUniforms: A, renderPass: (T) => {
    T.getDrawingBufferSize(O), a.value = O.x / Math.max(1, O.y), n.value.set(O.x, O.y);
    const C = Qe();
    if (C.active && C.duration > 0) {
      const P = Ne();
      c.value = k * P * C.duration, h.value = k * (P - 1) * C.duration, m.value = P;
    } else
      c.value = k * Ce(), h.value = 0, m.value = 0;
  } };
}
const Pf = {
  meta: {
    id: "liquidMetal",
    name: "Liquid Metal",
    description: "Turns a logo or word into polished, slowly molten metal — chrome, gold, mercury",
    keywords: [
      "chrome",
      "metal",
      "metallic",
      "liquid",
      "mercury",
      "gold",
      "silver",
      "steel",
      "molten",
      "reflective",
      "mirror",
      "bevel",
      "emboss",
      "y2k",
      "logo",
      "shiny",
      "polished"
    ],
    group: "stylise"
  },
  kind: "processor",
  // A 48-tap disc over the shape's alpha, read from a pre-averaged mip level
  // so the surface is smooth — see silhouetteField.ts.
  resampling: !0,
  resamplingKeepsAlpha: !0,
  resamplingMipmaps: !0,
  paramSchema: fu,
  defaultParams: Mf,
  buildLayer: Sf
}, Af = {
  type: "linear",
  angle: 90,
  stops: [
    { color: "#000000", pos: 0 },
    { color: "#0d1a5e", pos: 10 },
    { color: "#1c3aa8", pos: 22 },
    { color: "#2f8fe6", pos: 42 },
    { color: "#9ad8ff", pos: 56 },
    { color: "#ffe57a", pos: 70 },
    { color: "#ff9420", pos: 84 },
    { color: "#ff4508", pos: 100 }
  ]
}, gu = {
  source: {
    type: "dropdown",
    label: "Heat from",
    options: [
      { label: "Shape", value: "shape" },
      { label: "Brightness", value: "brightness" }
    ],
    default: "shape",
    group: "Heat",
    structural: !0,
    description: "Where the heat comes from. Shape: a logo, word or image clipped below burns along its outline and glows out past it. Brightness: whatever is below reads like a thermal camera — light areas hot, dark areas cold.",
    note: (e, t) => e.source === "shape" && !t.clipped ? "Clip this layer to a logo, text or image layer, or set Heat from to Brightness." : null
  },
  palette: {
    type: "gradient",
    ramp: !0,
    label: "Palette",
    default: Pt(Af),
    description: "The colours heat runs through, cold on the left to hottest on the right."
  },
  edge: {
    type: "slider",
    label: "Edge",
    min: 1,
    max: 100,
    step: 1,
    default: 37,
    description: "How far the heat reaches in from the outline. Low is a thin burning rim around a cold middle; high warms the whole shape."
  },
  glow: {
    type: "slider",
    label: "Glow",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    description: "How far the heat radiates out past the outline onto what is behind it. 0 keeps it inside the shape. Only applies with Heat from: Shape, clipped."
  },
  detail: {
    type: "slider",
    label: "Detail",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    description: "How much of the picture inside the shape shows through as warmer and cooler patches — dark type on a poster reads colder. 0 is a clean silhouette."
  },
  waves: {
    type: "slider",
    label: "Waves",
    min: 0,
    max: 100,
    step: 1,
    default: 75,
    group: "Waves",
    description: "A smooth wave of heat sweeping across the shape, lighting it from the edges in. 0 is a still heatmap."
  },
  from: {
    type: "dropdown",
    label: "Waves from",
    options: [
      { label: "One side", value: "side" },
      { label: "A point", value: "point" }
    ],
    default: "side",
    description: "Where the heat comes from. One side: the waves sweep across in one direction. A point: they ripple out from a hot spot in the middle of the frame — turn up Follow mouse and the hot spot follows the cursor."
  },
  waveSize: {
    type: "slider",
    label: "Wave size",
    min: 1,
    max: 100,
    step: 1,
    default: 10,
    description: "How broad the front is. Low gives one wide sweep, high several narrow bands."
  },
  direction: {
    type: "slider",
    label: "Direction",
    min: -180,
    max: 180,
    step: 1,
    default: 0,
    showIf: (e) => e.from !== "point",
    description: "Which way the front travels, in degrees. 0 is upward, 90 to the right."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    group: "Animation",
    description: "How fast the front travels. 0 freezes it."
  },
  // Follow mouse keeps the meaning it has everywhere else; what it moves
  // depends on Waves from. Re-declared after the spread so the group keeps its
  // usual order (see Cylinder).
  ...bt,
  _ixFollow: {
    ...bt._ixFollow,
    description: "How far the cursor moves the heat. With Waves from: A point, the hot spot follows the cursor and the waves ripple out from it. With One side, the sweep turns to travel toward the cursor. 0 leaves both where the controls above put them."
  }
}, Tf = Object.fromEntries(
  Object.entries(gu).map(([e, t]) => [e, t.type === "gradient" ? Pt(t.default) : t.default])
), Fi = (e) => 4e-3 + e.edge / 100 * 0.15, Li = (e) => 0.03 + e.glow / 100 * 0.5, Ri = (e) => e.speed / 100 * 1.2, Cf = te(0.2126, 0.7152, 0.0722), Di = 4;
function If(e, t, s) {
  const o = e.source !== "brightness", a = r(Fi(e)), n = r(Li(e)), l = r(0), i = r(0), u = r(1), d = r(new p.Vector2(1, 1)), c = r(0), h = r(1), m = r(new p.Vector2(0, 1)), x = r(e.from === "point" ? 1 : 0), g = r(new p.Vector2(0, 0)), w = Lt(e), S = r(0), v = r(0), y = r(0), k = Ms(e.palette), A = (z) => Re(z.rgb, Cf).mul(z.a), O = o ? void 0 : A, R = /* @__PURE__ */ new Map(), T = (z) => {
    let V = R.get(z);
    return V || (V = {
      inner: Uo(t, z, a, u, d, s == null ? void 0 : s.inputLevel, O),
      outer: Uo(t, z, n, u, d, s == null ? void 0 : s.inputLevel, O)
    }, R.set(z, V)), V;
  }, C = (z) => {
    const V = E(z.x.sub(0.5).mul(u), z.y.sub(0.5)), Y = V.sub(g), U = Re(V, m), j = Pe(Y), X = $(U, j, x).mul(h), N = Re(V, E(m.y.negate(), m.x)).mul(0.35), G = ws(Y.add(E(1e-4, 0))).mul(0.6), W = $(E(N, 0), G, x), J = $(
      De(te(X.sub(S), W)),
      De(te(X.sub(v), W.add(17.3))),
      y
    ), Q = Me(b(-0.3), b(0.35), J).mul(c), se = Rt(j.mul(j).mul(-14)).mul(x);
    return ne(Q, se);
  }, P = (z) => {
    const V = t(z), { inner: Y, outer: U } = T(z), j = C(z);
    let X;
    if (o) {
      const N = fe(Y.coverage.sub(0.5).mul(2), 0, 1), G = b(1).sub(N), W = b(1).sub(Me(b(0), b(0.08).add(j.mul(0.2)), N)), J = A(V).sub(0.5).mul(i), Q = b(0.1).add(G.mul(G).mul(0.5)).add(W.mul(0.9)).add(j.mul(b(0.5).add(G.mul(0.35)))).add(J), se = Me(b(0), b(0.5), U.coverage), K = se.mul(se).mul(b(0.5).add(j.mul(0.45)));
      X = $(K, Q, V.a);
    } else
      X = Y.coverage.mul(0.85).add(j.mul(0.3));
    return ie(k.sample(fe(X, 0, 1)).rgb, V.a);
  }, F = (z, V) => {
    const Y = z(V);
    if (!o) return Y;
    const j = Me(b(0), b(0.5), T(V).outer.coverage).pow(1.4).mul(l);
    return ne(Y, j);
  };
  let M = 0;
  const I = (z) => {
    a.value = Fi(z), n.value = Li(z), l.value = Math.min(1, z.glow / 10), i.value = z.detail / 100 * 0.6, c.value = z.waves / 100, h.value = 2.5 + z.waveSize / 100 * 10, M = z.direction * Math.PI / 180, x.value = z.from === "point" ? 1 : 0, w.update(z), k.update(z.palette);
  };
  I(e);
  let f = Ri(e);
  const D = (z) => {
    I(z), f = Ri(z);
  }, L = new p.Vector2();
  return { layerFn: P, updateUniforms: D, renderPass: (z) => {
    z.getDrawingBufferSize(L), u.value = L.x / Math.max(1, L.y), d.value.set(L.x, L.y), w.renderPass();
    const V = w.value;
    g.value.set(V.x * u.value, V.y);
    const Y = Math.sin(M) + V.x * Di, U = Math.cos(M) + V.y * Di, j = Math.hypot(Y, U) || 1;
    m.value.set(Y / j, U / j);
    const X = Qe();
    if (X.active && X.duration > 0) {
      const N = Ne();
      S.value = f * N * X.duration, v.value = f * (N - 1) * X.duration, y.value = N;
    } else
      S.value = f * Ce(), v.value = 0, y.value = 0;
  }, maskFn: F };
}
const Ef = {
  meta: {
    id: "heatmap",
    name: "Heatmap",
    description: "A logo, word or image seen through a thermal camera — a burning outline, a wide glow, a hot front sweeping across",
    keywords: [
      "heat",
      "heatmap",
      "thermal",
      "infrared",
      "temperature",
      "glow",
      "hot",
      "predator",
      "false colour",
      "false color",
      "logo",
      "pulse",
      "aura"
    ],
    group: "stylise"
  },
  kind: "processor",
  // The glow spreads the silhouette rather than moving it — `maskFn` says
  // where. Two 48-tap discs read from pre-averaged mip levels: see
  // silhouetteField.ts.
  transformsSilhouette: !0,
  resampling: !0,
  resamplingKeepsAlpha: !0,
  resamplingMipmaps: !0,
  paramSchema: gu,
  defaultParams: Tf,
  buildLayer: If
}, Ja = (e) => e.colors ?? 4, bu = {
  colors: {
    type: "slider",
    label: "Colours",
    min: 2,
    max: 5,
    step: 1,
    default: 4,
    group: "Colours",
    description: "How many colours melt into each other. Each one is a soft patch that drifts on its own."
  },
  color1: { type: "color", label: "Colour 1", default: "#2a1a7a", description: "The first colour patch." },
  color2: { type: "color", label: "Colour 2", default: "#e2408e", description: "The second colour patch." },
  color3: {
    type: "color",
    label: "Colour 3",
    default: "#ff9248",
    showIf: (e) => Ja(e) >= 3,
    description: "The third colour patch."
  },
  color4: {
    type: "color",
    label: "Colour 4",
    default: "#ffe2c2",
    showIf: (e) => Ja(e) >= 4,
    description: "The fourth colour patch."
  },
  color5: {
    type: "color",
    label: "Colour 5",
    default: "#1aa3b8",
    showIf: (e) => Ja(e) >= 5,
    description: "The fifth colour patch."
  },
  arrangement: {
    type: "slider",
    label: "Arrangement",
    min: 1,
    max: 100,
    step: 1,
    default: 7,
    group: "Shape",
    description: "Where the colour patches sit. Each value is a different layout — slide it until one looks right."
  },
  blend: {
    type: "slider",
    label: "Blend",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "How the patches meet. Low washes them into one soft haze; high gives each colour its own defined region."
  },
  distortion: {
    type: "slider",
    label: "Distortion",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    description: "How much the borders between colours bend into flowing, organic shapes. 0 keeps them smooth and round."
  },
  swirl: {
    type: "slider",
    label: "Swirl",
    min: 0,
    max: 100,
    step: 1,
    default: 20,
    description: "Twists the colours around the middle of the frame, like stirring paint."
  },
  drift: {
    type: "slider",
    label: "Drift",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    group: "Animation",
    description: "How far each colour patch wanders from where Arrangement put it."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    description: "How fast the patches wander and the borders flow. 0 holds it still."
  },
  grain: {
    type: "slider",
    label: "Grain",
    min: 0,
    max: 100,
    step: 1,
    default: 15,
    group: "Finish",
    description: "A fine film grain over the gradient. A little hides the banding smooth gradients get in exported video."
  }
}, Ff = Object.fromEntries(
  Object.entries(bu).map(([e, t]) => [e, t.default])
), ms = 5;
function Hi(e) {
  let t = e * 2654435761 >>> 0;
  const s = () => {
    t = t + 1831565813 >>> 0;
    let a = t;
    return a = Math.imul(a ^ a >>> 15, a | 1), a ^= a + Math.imul(a ^ a >>> 7, a | 61), ((a ^ a >>> 14) >>> 0) / 4294967296;
  }, o = s() * Math.PI * 2;
  return Array.from({ length: ms }, (a, n) => {
    const l = o + n / ms * Math.PI * 2 + (s() - 0.5) * 0.9, i = 0.18 + s() * 0.22;
    return [Math.cos(l) * i, Math.sin(l) * i];
  });
}
function Oi(e, t, s) {
  const o = t * 1.731 + s * 4.113;
  return (Math.sin(e * 0.83 + o) + 0.6 * Math.sin(e * 1.37 + o * 2.3) + 0.3 * Math.sin(e * 2.21 + o * 0.7)) / 1.9;
}
function Lf(e, t) {
  const s = Array.from({ length: ms }, (C, P) => r(new p.Color(e[`color${P + 1}`]))), o = Array.from({ length: ms }, () => r(1)), a = Array.from({ length: ms }, () => r(new p.Vector2())), n = Array.from({ length: ms }, () => r(new p.Vector2())), l = r(0), i = r(0), u = r(0), d = r(1), c = r(new p.Vector2(1, 1)), h = r(2), m = r(0), x = r(0), g = r(0), w = (C, P, F) => {
    const M = C.mul(1.6), I = E(
      De(te(M, F)),
      De(te(M.add(E(7.3, 2.9)), F))
    ).mul(m);
    let f = C.add(I);
    const D = x.mul(Rt(Re(f, f).mul(-3))), L = Ve(D), B = Ae(D);
    f = E(f.x.mul(L).sub(f.y.mul(B)), f.x.mul(B).add(f.y.mul(L)));
    let z = te(0, 0, 0), V = b(0);
    for (let Y = 0; Y < ms; Y++) {
      const U = f.sub(P[Y]), j = $e(Re(U, U).add(0.015), h.mul(-0.5)).mul(o[Y]);
      z = z.add(s[Y].mul(j)), V = V.add(j);
    }
    return z.div(ne(V, b(1e-6)));
  }, S = (C) => {
    const P = E(C.x.sub(0.5).mul(d), C.y.sub(0.5)), F = w(P, a, l), M = w(P, n, i);
    let I = $(F, M, u);
    const f = C.mul(c), D = St(Be(f.x), Be(f.y), Ct(7)).sub(0.5);
    return I = I.mul(D.mul(g).add(1)), ie(ne(I, te(0, 0, 0)), b(1));
  };
  let v = Hi(e.arrangement), y = 0, k = 0;
  const A = (C) => {
    const P = C.colors ?? 4;
    for (let F = 0; F < ms; F++)
      s[F].value.set(C[`color${F + 1}`]), o[F].value = F < P ? 1 : 0;
    v = Hi(C.arrangement), h.value = 1.2 + C.blend / 100 * 4.3, m.value = C.distortion / 100 * 0.35, x.value = C.swirl / 100 * 3, g.value = C.grain / 100 * 0.5, k = C.drift / 100 * 0.22, y = C.speed / 100 * 0.6;
  };
  A(e);
  const O = (C, P, F) => {
    for (let M = 0; M < ms; M++) {
      const [I, f] = v[M];
      C[M].value.set(
        (I + Oi(P, M, 0) * k) * F,
        f + Oi(P, M, 1) * k
      );
    }
  }, R = new p.Vector2();
  return { layerFn: S, updateUniforms: A, renderPass: (C) => {
    C.getDrawingBufferSize(R);
    const P = R.x / Math.max(1, R.y);
    d.value = P, c.value.set(R.x, R.y);
    const F = Qe();
    if (F.active && F.duration > 0) {
      const M = Ne(), I = y * M * F.duration, f = y * (M - 1) * F.duration;
      O(a, I, P), O(n, f, P), l.value = I * 0.5, i.value = f * 0.5, u.value = M;
    } else {
      const M = y * Ce();
      O(a, M, P), O(n, M, P), l.value = M * 0.5, i.value = M * 0.5, u.value = 0;
    }
  } };
}
const Rf = {
  meta: {
    id: "meshGradient",
    name: "Mesh Gradient",
    group: "content",
    description: "A few colours melting into one another as soft, drifting patches — the silky mesh-gradient look",
    keywords: [
      "mesh",
      "gradient",
      "blend",
      "colour",
      "color",
      "aurora",
      "silk",
      "liquid",
      "blob",
      "soft",
      "background",
      "wash",
      "grain",
      "freeform"
    ]
  },
  kind: "generator",
  paramSchema: bu,
  defaultParams: Ff,
  buildLayer: Lf
}, en = (e) => e.colors ?? 1, yu = {
  shape: {
    type: "dropdown",
    label: "Shape",
    options: [
      { label: "Circle", value: "circle" },
      { label: "Square", value: "square" },
      { label: "Diamond", value: "diamond" },
      { label: "Triangle", value: "triangle" }
    ],
    default: "circle",
    group: "Dots",
    description: "The shape of every dot."
  },
  size: {
    type: "slider",
    label: "Size",
    min: 1,
    max: 100,
    step: 1,
    default: 45,
    description: "How big each dot is, relative to the space it has. 100 lets neighbours touch."
  },
  spacing: {
    type: "slider",
    label: "Spacing",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "How far apart the dots sit. Low packs a fine dense grid; high spreads a few large ones."
  },
  variation: {
    type: "slider",
    label: "Size variation",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "Mixes big and small dots at random. 0 is a perfectly even grid."
  },
  grid: {
    type: "dropdown",
    label: "Grid",
    options: [
      { label: "Square", value: "square" },
      { label: "Hex", value: "hex" }
    ],
    default: "square",
    description: "How the rows line up. Square stacks them; Hex staggers every other row for a denser, more organic field."
  },
  colors: {
    type: "slider",
    label: "Colours",
    min: 1,
    max: 4,
    step: 1,
    default: 1,
    group: "Colour",
    description: "How many colours the dots use. Each dot takes one at random."
  },
  color1: { type: "color", label: "Colour 1", default: "#f4f1ea", description: "A dot colour." },
  color2: { type: "color", label: "Colour 2", default: "#ff5a36", showIf: (e) => en(e) >= 2, description: "A dot colour." },
  color3: { type: "color", label: "Colour 3", default: "#3a7bff", showIf: (e) => en(e) >= 3, description: "A dot colour." },
  color4: { type: "color", label: "Colour 4", default: "#ffd23f", showIf: (e) => en(e) >= 4, description: "A dot colour." },
  ground: { type: "color", label: "Ground", default: "#0a0a0c", description: "The colour between the dots." },
  groundOpacity: {
    type: "slider",
    label: "Ground opacity",
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    description: "How solid the ground is. 0 leaves only the dots, over whatever is below this layer."
  },
  motion: {
    type: "dropdown",
    label: "Motion",
    options: [
      { label: "Still", value: "still" },
      { label: "Orbit", value: "orbit" },
      { label: "Breathe", value: "breathe" }
    ],
    default: "orbit",
    group: "Motion",
    description: "How the dots move. Orbit: each one circles its place on its own path. Breathe: patches of dots swell and shrink, rolling across the grid."
  },
  orbit: {
    type: "slider",
    label: "Orbit size",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    showIf: (e) => e.motion === "orbit",
    description: "How far each dot travels from its place. 100 lets it wander into its neighbours' space."
  },
  swell: {
    type: "slider",
    label: "Swell",
    min: 0,
    max: 100,
    step: 1,
    default: 70,
    showIf: (e) => e.motion === "breathe",
    description: "How much the dots grow and shrink. 100 shrinks some away to nothing."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    showIf: (e) => e.motion !== "still",
    description: "How fast the dots move."
  },
  cursor: {
    type: "dropdown",
    label: "Cursor",
    options: [
      { label: "Off", value: "off" },
      { label: "Push away", value: "push" },
      { label: "Pull in", value: "pull" },
      { label: "Grow", value: "grow" }
    ],
    default: "off",
    group: "Interactivity",
    description: "What the dots do near the cursor. Push away: they part around it. Pull in: they crowd toward it. Grow: they swell under it. Every public surface tracks the cursor across the whole window; the editor over the canvas only."
  },
  reach: {
    type: "slider",
    label: "Reach",
    min: 1,
    max: 100,
    step: 1,
    default: 40,
    showIf: (e) => e.cursor !== "off" && e.cursor !== void 0,
    description: "How far from the cursor the dots react."
  },
  strength: {
    type: "slider",
    label: "Strength",
    min: 0,
    max: 100,
    step: 1,
    default: 70,
    showIf: (e) => e.cursor !== "off" && e.cursor !== void 0,
    description: "How strongly they react — how far they move, or how much they swell."
  }
}, Df = Object.fromEntries(
  Object.entries(yu).map(([e, t]) => [e, t.default])
), Hf = ["circle", "square", "diamond", "triangle"], Of = ["still", "orbit", "breathe"], Bf = Math.sqrt(3) / 2, Bi = (e) => 64 * Math.pow(5 / 64, e.spacing / 100), zi = (e) => e.speed / 100 * 1.2;
function zf(e, t) {
  const s = r(0), o = r(0), a = r(Bi(e)), n = r(0.2), l = r(0), i = r(1), u = [1, 2, 3, 4].map((B) => r(new p.Color(e[`color${B}`]))), d = r(new p.Color(e.ground)), c = r(1), h = r(0), m = r(0), x = r(1), g = r(new p.Vector2(0, 0)), w = r(0), S = r(new p.Vector2(0, 0)), v = r(0), y = r(0), k = r(0.2), A = (B, z) => {
    const V = Pe(B).sub(z), Y = ne(we(B.x), we(B.y)).sub(z.mul(0.86)), U = we(B.x).add(we(B.y)).mul(0.7071).sub(z.mul(0.8)), j = B.y.add(z.mul(0.25)), X = ne(we(B.x).mul(0.866).add(j.mul(0.5)), j.negate()).sub(z.mul(0.62));
    return Ht(
      s.lessThan(0.5),
      V,
      Ht(s.lessThan(1.5), Y, Ht(s.lessThan(2.5), U, X))
    );
  }, O = (B) => {
    const z = E(B.x.sub(0.5).mul(x), B.y.sub(0.5)), V = z.mul(a), Y = ne(ne(xs(V.x), xs(V.y)), 1e-5), U = $(b(1), b(Bf), o), j = (se) => Rt(Re(se, se).div(k.mul(k)).negate()), X = z.sub(S);
    let N = X;
    for (let se = 0; se < 2; se++) N = X.div(b(1).add(v.mul(j(N))));
    const G = S.add(N).mul(a), W = Ue(G.y.div(U));
    let J = d, Q = c;
    for (let se = -1; se <= 1; se++) {
      const K = W.add(se), ce = K.sub(Ue(K.mul(0.5)).mul(2)).mul(0.5).mul(o), oe = Ue(G.x.sub(ce));
      for (let de = -1; de <= 1; de++) {
        const me = oe.add(de), xe = Be(me), ge = Be(K), We = St(xe, ge, Ct(1)), Ge = St(xe, ge, Ct(2)), _e = St(xe, ge, Ct(3)).mul(97), Ye = St(xe, ge, Ct(4)).mul(97), _ = E(me.add(0.5).add(ce), K.add(0.5).mul(U)), H = _.div(a).sub(S), q = j(H), ee = S.add(H.mul(b(1).add(v.mul(q)))).mul(a), Z = te(_e.add(g.x), Ye.add(g.y), w), ae = E(
          De(Z),
          De(Z.add(te(31.4, 17.9, 0)))
        ).mul(h), re = De(te(_.mul(0.18).add(g), w.add(7.7))), be = $(b(1), fe(re.mul(1.6).add(0.55), 0, 1.4), m), ye = n.mul(b(1).sub(We.mul(l))).mul(be).mul(b(1).add(y.mul(q))), ke = A(V.sub(ee.add(ae)), ye), Fe = fe(b(0.5).sub(ke.div(Y)), 0, 1), Le = Ue(Ge.mul(i)), Oe = Ht(
          Le.lessThan(0.5),
          u[0],
          Ht(Le.lessThan(1.5), u[1], Ht(Le.lessThan(2.5), u[2], u[3]))
        );
        J = $(J, Oe, Fe), Q = ne(Q, Fe);
      }
    }
    return ie(J, ve(Q, 1));
  };
  let R = zi(e), T = "off", C = 0, P = 0, F = 0, M = 0, I = 0;
  const f = (B) => {
    s.value = Math.max(0, Hf.indexOf(B.shape)), o.value = B.grid === "hex" ? 1 : 0, a.value = Bi(B), n.value = B.size / 100 * 0.5, l.value = B.variation / 100 * 0.85, i.value = B.colors ?? 1;
    for (let Y = 0; Y < 4; Y++) u[Y].value.set(B[`color${Y + 1}`]);
    d.value.set(B.ground), c.value = B.groundOpacity / 100;
    const z = Math.max(0, Of.indexOf(B.motion));
    h.value = z === 1 ? B.orbit / 100 * 0.7 : 0, m.value = z === 2 ? B.swell / 100 : 0, R = z === 0 ? 0 : zi(B);
    const V = (B.strength ?? 0) / 100;
    T = B.cursor ?? "off", C = T === "push" ? V * 0.9 : T === "pull" ? -V * 0.9 : 0, P = T === "grow" ? V * 1.4 : 0, k.value = 0.03 + (B.reach ?? 40) / 100 * 0.45;
  };
  f(e);
  const D = new p.Vector2();
  return { layerFn: O, updateUniforms: f, renderPass: (B) => {
    B.getDrawingBufferSize(D);
    const z = D.x / Math.max(1, D.y);
    x.value = z;
    const V = Math.min(Jt(), 0.1), Y = ns(), U = 1 - Math.exp(-V * 12);
    F += (Y.x * z * 0.5 - F) * U, M += (Y.y * 0.5 - M) * U, I += ((Y.active && T !== "off" ? 1 : 0) - I) * (1 - Math.exp(-V * 5)), S.value.set(F, M), v.value = C * I, y.value = P * I;
    const j = Qe();
    if (j.active && j.duration > 0) {
      const X = R * j.duration / (Math.PI * 2), N = Ne() * Math.PI * 2;
      g.value.set(X * Math.cos(N), X * Math.sin(N)), w.value = 0;
    } else
      g.value.set(0, 0), w.value = Ce() * R;
  } };
}
const Vf = {
  meta: {
    id: "dotGrid",
    name: "Dot Grid",
    group: "content",
    description: "A field of dots — circles, squares, diamonds or triangles — still, orbiting or breathing",
    keywords: [
      "dots",
      "dot",
      "grid",
      "polka",
      "circles",
      "pattern",
      "orbit",
      "halftone",
      "matrix",
      "led",
      "points",
      "confetti",
      "hex",
      "breathe"
    ]
  },
  kind: "generator",
  // The cursor moves the dots, not the layer — see the header note.
  ownsPointer: !0,
  usesPointer: (e) => (e.cursor ?? "off") !== "off" && (e.strength ?? 0) > 0,
  paramSchema: yu,
  defaultParams: Df,
  buildLayer: zf
}, _f = {
  type: "linear",
  angle: 90,
  stops: [
    { color: "#3a0f7a", pos: 0 },
    { color: "#7b3cff", pos: 28 },
    { color: "#ff3fa4", pos: 55 },
    { color: "#ffb05c", pos: 80 },
    { color: "#fff1d2", pos: 100 }
  ]
}, wu = {
  palette: {
    type: "gradient",
    ramp: !0,
    label: "Smoke colours",
    default: Pt(_f),
    group: "Smoke",
    description: "The colours the smoke drifts through, thin on the left to thickest on the right.",
    note: (e, t) => t.clipped ? null : "Clip this layer to a logo or text layer — the smoke fills that shape and swirls along its edges."
  },
  density: {
    type: "slider",
    label: "Density",
    min: 0,
    max: 100,
    step: 1,
    default: 60,
    description: "How thick the smoke is. Low is a few faint wisps in clear glass; high fills the shape."
  },
  swirl: {
    type: "slider",
    label: "Swirl",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How strongly the smoke is drawn along the edges, curling round each letter and inside its holes. 0 lets it drift freely."
  },
  scale: {
    type: "slider",
    label: "Smoke scale",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    description: "Big soft billows at low values, fine threads at high."
  },
  edge: {
    type: "slider",
    label: "Edge depth",
    min: 1,
    max: 100,
    step: 1,
    default: 35,
    description: "How far in from the outline the smoke gathers and follows the edge. Low hugs the walls; high fills toward the middle."
  },
  glass: {
    type: "color",
    label: "Glass",
    default: "#0b0a14",
    group: "Glass",
    description: "The colour of the clear glass where there is no smoke."
  },
  rim: {
    type: "slider",
    label: "Rim",
    min: 0,
    max: 100,
    step: 1,
    default: 60,
    description: "The bright line of light just inside the outline that makes the shape read as a cut gem. 0 hides it."
  },
  glow: {
    type: "slider",
    label: "Glow",
    min: 0,
    max: 100,
    step: 1,
    default: 15,
    description: "How far light spills out past the outline onto what is behind it. 0 keeps everything inside the shape."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    group: "Animation",
    description: "How fast the smoke moves. 0 freezes it."
  },
  cursor: {
    type: "dropdown",
    label: "Cursor",
    options: [
      { label: "Off", value: "off" },
      { label: "Stir", value: "stir" },
      { label: "Light", value: "light" }
    ],
    default: "off",
    group: "Interactivity",
    description: "What the cursor does to the gem. Stir: the smoke swirls round it like a finger drawn through ink, and follows as you move. Light: it is a torch shone into the glass — the smoke and the rim brighten where it points. Every public surface tracks the cursor across the whole window; the editor over the canvas only."
  },
  reach: {
    type: "slider",
    label: "Reach",
    min: 1,
    max: 100,
    step: 1,
    default: 35,
    showIf: (e) => e.cursor !== "off" && e.cursor !== void 0,
    description: "How far from the cursor the smoke responds."
  },
  strength: {
    type: "slider",
    label: "Strength",
    min: 0,
    max: 100,
    step: 1,
    default: 70,
    showIf: (e) => e.cursor !== "off" && e.cursor !== void 0,
    description: "How hard it stirs, or how bright the torch is."
  }
}, Xf = Object.fromEntries(
  Object.entries(wu).map(([e, t]) => [e, t.type === "gradient" ? Pt(t.default) : t.default])
), Vi = 8, _i = 5e-3, Xi = (e) => 0.01 + e.edge / 100 * 0.11, Wi = (e) => e.speed / 100 * 0.8;
function Wf(e, t, s) {
  const o = r(Xi(e)), a = r(1), n = r(new p.Vector2(1, 1)), l = r(0), i = r(0), u = r(3), d = r(0), c = r(0), h = r(0.01), m = r(new p.Color(e.glass)), x = r(0), g = r(0), w = r(0), S = r(new p.Vector2(0, 0)), v = r(0.15), y = r(0), k = r(0), A = Ms(e.palette), O = (X) => {
    const N = /* @__PURE__ */ new Map();
    return (G) => {
      let W = N.get(G);
      return W === void 0 && (W = X(G), N.set(G, W)), W;
    };
  }, R = O((X) => Uo(t, X, o, a, n, s == null ? void 0 : s.inputLevel)), T = O((X) => Uo(t, X, h, a, n, s == null ? void 0 : s.inputLevel)), C = (X, N, G) => {
    const W = X.mul(u).add(N.mul(i.mul(1.6).add(G.mul(0.9)))), J = Bt(te(W, G.mul(0.35)), 3, 2, 0.5), Q = Bt(te(W.mul(0.6).add(11.3), G.mul(0.25).add(4.1)), 2, 2, 0.5);
    return E(J, Q);
  }, P = (X) => {
    const N = t(X), { coverage: G, toward: W } = R(X), J = E(X.x.sub(0.5).mul(a), X.y.sub(0.5)), Q = fe(G.sub(0.5).mul(2), 0, 1), se = Pe(W), K = E(W.y.negate(), W.x).div(ne(se, b(0.02))).mul(Me(b(0), b(0.12), se)), le = J.sub(S), ce = Rt(Re(le, le).div(v.mul(v)).negate()), oe = ce.mul(y), de = Ve(oe), me = Ae(oe), xe = S.add(E(le.x.mul(de).sub(le.y.mul(me)), le.x.mul(me).add(le.y.mul(de)))), ge = $(C(xe, K, x), C(xe, K, g), w), We = $(b(1), b(0.35), Q), Ge = Me(b(0.05), b(0.6), ge.x.add(0.15).mul(We).mul(l.mul(1.6).add(0.2))), _e = A.sample(fe(ge.y.mul(0.9).add(0.5).add(Ge.mul(0.3)), 0, 1)).rgb;
    let Ye = $(m, _e, Ge);
    const _ = ce.mul(k);
    Ye = Ye.add(_e.mul(Ge.mul(1.2).add(0.15)).mul(_));
    const H = s == null ? void 0 : s.inputLevel;
    let q = N.a;
    if (H) {
      const ye = ac(ne(n.y.mul(_i * 0.5), b(1))), ke = b(_i * 0.5), Fe = ke.div(a);
      q = H(X.add(E(Fe, ke)), ye).a.add(H(X.add(E(Fe.negate(), ke)), ye).a).add(H(X.add(E(Fe, ke.negate())), ye).a).add(H(X.add(E(Fe.negate(), ke.negate())), ye).a).mul(0.25);
    }
    const ee = b(1).sub(Me(b(0.55), b(0.98), q)).mul(N.a).mul(d.add(_.mul(1.5))), Z = $(te(1, 1, 1), A.sample(b(0.85)).rgb, 0.35);
    Ye = Ye.add(Z.mul(ee));
    const ae = Me(b(0), b(0.5), T(X).coverage), re = A.sample(ae.mul(0.4).add(0.3)).rgb.mul(ae.mul(0.75)), be = $(re, Ye, N.a);
    return ie(fe(be, 0, 1), N.a);
  }, F = (X, N) => {
    const G = X(N), W = Me(b(0), b(0.5), T(N).coverage);
    return ne(G, W.pow(1.5).mul(c));
  };
  let M = "off", I = 0, f = 0, D = 0, L = 0, B = 0;
  const z = (X) => {
    o.value = Xi(X), l.value = X.density / 100, i.value = X.swirl / 100, u.value = 1.5 + X.scale / 100 * 9, d.value = X.rim / 100 * 1.2, c.value = X.glow > 0 ? 0.5 : 0, h.value = 3e-3 + X.glow / 100 * 0.06, m.value.set(X.glass), M = X.cursor ?? "off";
    const N = (X.strength ?? 70) / 100;
    I = M === "stir" ? N * Math.PI * 2 : 0, f = M === "light" ? N * 1.4 : 0, v.value = 0.03 + (X.reach ?? 35) / 100 * 0.4, A.update(X.palette);
  };
  z(e);
  let V = Wi(e);
  const Y = (X) => {
    z(X), V = Wi(X);
  }, U = new p.Vector2();
  return { layerFn: P, updateUniforms: Y, renderPass: (X) => {
    X.getDrawingBufferSize(U), a.value = U.x / Math.max(1, U.y), n.value.set(U.x, U.y);
    const N = a.value, G = Math.min(Jt(), 0.1), W = ns(), J = 1 - Math.exp(-G * 8);
    D += (W.x * N * 0.5 - D) * J, L += (W.y * 0.5 - L) * J, B += ((W.active && M !== "off" ? 1 : 0) - B) * (1 - Math.exp(-G * 4)), S.value.set(D, L), y.value = I * B, k.value = f * B;
    const Q = Qe(), se = Q.active && Q.duration > 0, K = se ? Q.duration : Vi, le = se ? Ne() : Ce() / Vi % 1;
    x.value = V * le * K, g.value = V * (le - 1) * K, w.value = le;
  }, maskFn: F };
}
const Gf = {
  meta: {
    id: "gemSmoke",
    name: "Gem Smoke",
    description: "A logo or word as clear glass with coloured smoke swirling along its walls",
    keywords: [
      "smoke",
      "gem",
      "glass",
      "crystal",
      "jewel",
      "paperweight",
      "logo",
      "swirl",
      "ink",
      "fluid",
      "trapped",
      "nebula",
      "aurora",
      "glow"
    ],
    group: "stylise"
  },
  kind: "processor",
  // The glow spreads the silhouette — `maskFn` says where. The field reads a
  // pre-averaged mip level, as Liquid Metal and Heatmap do.
  transformsSilhouette: !0,
  usesPointer: (e) => (e.cursor ?? "off") !== "off" && (e.strength ?? 0) > 0,
  resampling: !0,
  resamplingKeepsAlpha: !0,
  resamplingMipmaps: !0,
  paramSchema: wu,
  defaultParams: Xf,
  buildLayer: Wf
}, Rs = '<ellipse cx="40" cy="25" rx="11" ry="9" fill="var(--dim)"/>', ss = 'fill="none" stroke="var(--text)" stroke-width="1.6"', Yf = {
  // Four corner elbows — the classic acquisition frame.
  brackets: Rs + `<path d="M22 12h-6v6M58 12h6v6M22 38h-6v-6M58 38h6v-6" ${ss} stroke-linecap="square"/>`,
  // Closed rectangle.
  frame: Rs + `<rect x="16" y="11" width="48" height="28" ${ss}/>`,
  // Crop marks: detached ticks at the edge midpoints.
  ticks: Rs + `<path d="M40 8v6M40 42v-6M14 25h6M66 25h-6" ${ss} stroke-linecap="square"/>`,
  // Crosshair plus a centre ring — an aiming reticle rather than a boundary.
  reticle: Rs + `<circle cx="40" cy="25" r="7" ${ss}/><path d="M40 9v7M40 41v-7M18 25h7M62 25h-7" ${ss} stroke-linecap="square"/>`,
  // Dimension arrows below and beside — measuring, not targeting.
  caliper: Rs + `<path d="M16 42h48M16 39v6M64 39v6" ${ss} stroke-linecap="square"/><path d="M70 11v28M67 11h6M67 39h6" ${ss} stroke-linecap="square"/>`,
  // Inscribed circle.
  ring: Rs + `<circle cx="40" cy="25" r="17" ${ss}/>`,
  // A dot on the centroid with a leader line out to where the readout sits.
  pin: Rs + `<circle cx="40" cy="25" r="2.6" fill="var(--text)"/><path d="M41.8 23.2 55 12h9" ${ss} stroke-linecap="square"/>`,
  // Arrowheads closing in from both sides.
  chevrons: Rs + `<path d="M18 16l7 9-7 9M62 16l-7 9 7 9" ${ss} stroke-linecap="square" stroke-linejoin="miter"/>`
}, Uf = (e) => e.map((t) => ({ ...t, thumb: Yf[t.value] })), vu = {
  source: {
    type: "dropdown",
    label: "Detect",
    options: [
      { label: "Bright areas", value: "bright" },
      { label: "Dark areas", value: "dark" },
      { label: "Saturated color", value: "color" },
      { label: "Edges", value: "edges" },
      { label: "Movement", value: "motion" }
    ],
    default: "bright",
    description: "What in the artwork counts as a target. Bright and Dark areas key on luminance; Saturated color finds vivid regions regardless of brightness; Edges finds high-contrast boundaries; Movement finds what changed since the last frame, so it only sees targets in an animated scene."
  },
  threshold: {
    type: "slider",
    label: "Sensitivity",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How readily something qualifies as a target. Low finds faint detail and produces many small targets; high keeps only the strongest."
  },
  // The dial between a swarm of small boxes and one box around the whole
  // subject. It merges neighbouring blobs without inflating the resulting box,
  // which is why there's no separate minimum-size control to go with it.
  grouping: {
    type: "slider",
    label: "Grouping",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "The dial between a swarm of small boxes and one box around the whole subject. It merges neighbouring blobs without inflating the resulting box, which is why there is no separate minimum-size control."
  },
  targets: {
    type: "slider",
    label: "Targets",
    min: 1,
    max: 12,
    step: 1,
    default: 6,
    description: "The most markers drawn at once. The strongest candidates win."
  },
  smoothing: {
    type: "slider",
    label: "Smoothing",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    group: "Tracking",
    description: "How much the markers lag their targets. 0 snaps instantly and jitters on noisy artwork; high glides, which reads as a considered machine rather than a twitchy one."
  },
  // Draws each box where its target is *heading*, from the velocity the tracker
  // measures. Wind it up and the overlay overshoots and hunts, like a system
  // straining to keep up — the one control here that only exists because the
  // targets have identity from frame to frame.
  lead: {
    type: "slider",
    label: "Lead",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Tracking",
    description: "Draws each marker where its target is heading, from the velocity the tracker measures. Wind it up and the overlay overshoots and hunts, like a system straining to keep up."
  },
  style: {
    type: "dropdown",
    label: "Marker",
    // A grid: these are shapes, and you recognise the one you want by sight far
    // faster than you can translate eight names into marks.
    display: "grid",
    options: Uf([
      { label: "Brackets", value: "brackets" },
      { label: "Frame", value: "frame" },
      { label: "Ticks", value: "ticks" },
      { label: "Reticle", value: "reticle" },
      { label: "Caliper", value: "caliper" },
      { label: "Ring", value: "ring" },
      { label: "Pin", value: "pin" },
      { label: "Chevrons", value: "chevrons" }
    ]),
    default: "brackets",
    structural: !0,
    group: "Marker",
    description: "The mark drawn at each target. Brackets and Frame read as a camera or detection overlay; Reticle and Caliper as instrumentation; Ring, Pin and Chevrons as annotation."
  },
  stroke: {
    type: "dropdown",
    label: "Stroke",
    options: [
      { label: "Solid", value: "solid" },
      { label: "Dashed", value: "dashed" },
      // Crawling dashes. Free to add (it's the dash phase on the loop clock) and
      // it does most of the work of making the overlay read as *live* rather
      // than stamped on — so it's an option here instead of its own slider.
      { label: "Marching", value: "marching" }
    ],
    default: "solid",
    group: "Marker",
    description: "How the marker outline is drawn. Marching crawls the dashes along the loop clock, which does most of the work of making the overlay read as live rather than stamped on."
  },
  size: {
    type: "slider",
    label: "Size",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    group: "Marker",
    description: "How large the markers are drawn relative to the target they found."
  },
  weight: {
    type: "slider",
    label: "Weight",
    min: 1,
    max: 100,
    step: 1,
    default: 18,
    group: "Marker",
    description: "How thick the marker stroke is."
  },
  color: {
    type: "color",
    label: "Color",
    default: "#ffffff",
    group: "Marker",
    description: "The marker stroke colour."
  },
  fill: {
    type: "color",
    label: "Fill",
    default: "#8a1f1f",
    group: "Marker",
    description: "The colour inside the marker. Only visible on markers that enclose an area."
  },
  label: {
    type: "dropdown",
    label: "Readout",
    options: [
      { label: "None", value: "none" },
      { label: "Index", value: "index" },
      { label: "Confidence", value: "confidence" },
      { label: "Coordinates", value: "coords" },
      { label: "Size", value: "size" },
      { label: "Speed", value: "velocity" },
      { label: "Class", value: "class" }
    ],
    default: "none",
    group: "Readout",
    description: "What text is printed beside each marker. Index numbers them; Confidence shows detection strength; Coordinates, Size and Speed print the measured value; Class prints a category. This is what pushes the look from graphic overlay to machine-vision readout."
  },
  labelSize: {
    type: "slider",
    label: "Text size",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    group: "Readout",
    showIf: (e) => e.label !== "none",
    description: "How large that text is drawn. Only once Readout is set."
  },
  link: {
    type: "dropdown",
    label: "Connect",
    // Each mode is a real graph decision resolved on the CPU (see links.ts), so
    // they're self-limiting and none of them needs a range slider to tame it.
    options: [
      { label: "None", value: "none" },
      { label: "Nearest", value: "nearest" },
      { label: "Chain", value: "chain" },
      { label: "Mesh", value: "mesh" },
      { label: "Hub", value: "hub" },
      { label: "Hull", value: "hull" }
    ],
    default: "none",
    group: "Connectors",
    description: "Whether the targets are joined by lines. Nearest joins each to its closest neighbour; Chain threads them in one path; Mesh connects everything to everything; Hub spokes them to one centre; Hull wraps the outermost into a boundary."
  }
}, jf = Object.fromEntries(
  Object.entries(vu).map(([e, t]) => [e, t.default])
), tn = 0.28, $f = 2.2, Nf = 0.06, qf = 0.42, Zf = 0.22, Kf = 0.299, Qf = 0.587, Jf = 0.114, _s = new Uint8Array(256);
for (let e = 0; e < 256; e++) {
  const t = e / 255, s = t <= 31308e-7 ? t * 12.92 : 1.055 * Math.pow(t, 1 / 2.4) - 0.055;
  _s[e] = Math.round(Math.min(1, Math.max(0, s)) * 255);
}
class eg {
  constructor() {
    zt(this, "tracks", []);
    zt(this, "nextId", 1);
    zt(this, "out", []);
    /** Detection field, one float per grid cell. Reused across frames. */
    zt(this, "field", new Float32Array(0));
    /** Previous frame's luma, for `source: 'motion'`. */
    zt(this, "prev", new Float32Array(0));
    zt(this, "prevValid", !1);
    /** Component labels, reused. `0` means unlabelled. */
    zt(this, "labels", new Int32Array(0));
    /** Flood-fill frontier, reused so a frame allocates nothing. */
    zt(this, "stack", new Int32Array(0));
    zt(this, "mask", new Uint8Array(0));
    zt(this, "grouped", new Uint8Array(0));
    zt(this, "gw", 0);
    zt(this, "gh", 0);
  }
  /** Drop all state — used when the detection source changes under us, where
   *  carrying tracks across would associate boxes between unrelated fields. */
  reset() {
    this.tracks = [], this.out = [], this.prevValid = !1;
  }
  get targets() {
    return this.out;
  }
  /**
   * Consume one readback. `pixels` is RGBA8; `flipY` says its first row is the
   * *top* of the frame, which is the case for a WebGPU render target read back
   * into UV space where v runs upward. `dt` is seconds since the previous call
   * (clamped by the caller).
   */
  update(t, s, o, a, n, l, i = !0) {
    if (s <= 0 || o <= 0) return;
    this.resize(s, o), this.buildField(t, l.source, i);
    const u = this.findBlobs(l);
    this.associate(u, a, n, l), this.emit(a, l);
  }
  resize(t, s) {
    if (this.gw === t && this.gh === s) return;
    const o = t * s;
    this.gw = t, this.gh = s, this.field = new Float32Array(o), this.prev = new Float32Array(o), this.labels = new Int32Array(o), this.stack = new Int32Array(o), this.mask = new Uint8Array(o), this.grouped = new Uint8Array(o), this.prevValid = !1;
  }
  /**
   * Reduce RGBA to the single scalar the chosen source cares about.
   *
   * `motion` is the one that needed the `prev` buffer: it keys on the *change*
   * between frames, so boxes appear only where something is actually moving —
   * which is the behaviour people picture when they hear "tracker" and the one
   * that reads as a machine watching rather than a machine measuring.
   */
  buildField(t, s, o) {
    const { field: a, prev: n, gw: l, gh: i } = this, u = l * i;
    if (s === "color") {
      for (let d = 0; d < i; d++) {
        const c = (o ? i - 1 - d : d) * l;
        for (let h = 0; h < l; h++) {
          const m = (c + h) * 4, x = _s[t[m]] / 255, g = _s[t[m + 1]] / 255, w = _s[t[m + 2]] / 255, S = Math.max(x, g, w), v = Math.min(x, g, w);
          a[d * l + h] = S <= 0 ? 0 : (S - v) / S;
        }
      }
      return;
    }
    for (let d = 0; d < i; d++) {
      const c = (o ? i - 1 - d : d) * l;
      for (let h = 0; h < l; h++) {
        const m = (c + h) * 4;
        a[d * l + h] = (_s[t[m]] * Kf + _s[t[m + 1]] * Qf + _s[t[m + 2]] * Jf) / 255;
      }
    }
    if (s === "dark") {
      for (let d = 0; d < u; d++) a[d] = 1 - a[d];
      return;
    }
    if (s === "edges") {
      n.set(a);
      for (let d = 0; d < i; d++)
        for (let c = 0; c < l; c++) {
          const h = Math.max(0, c - 1), m = Math.min(l - 1, c + 1), x = Math.max(0, d - 1), g = Math.min(i - 1, d + 1), w = (y, k) => n[k * l + y], S = w(m, x) + 2 * w(m, d) + w(m, g) - w(h, x) - 2 * w(h, d) - w(h, g), v = w(h, g) + 2 * w(c, g) + w(m, g) - w(h, x) - 2 * w(c, x) - w(m, x);
          a[d * l + c] = Math.min(1, Math.hypot(S, v) / 4);
        }
      this.prevValid = !1;
      return;
    }
    if (s === "motion") {
      if (!this.prevValid) {
        n.set(a), this.prevValid = !0, a.fill(0);
        return;
      }
      for (let d = 0; d < u; d++) {
        const c = a[d];
        a[d] = Math.min(1, Math.abs(c - n[d]) * 4), n[d] = c;
      }
      return;
    }
  }
  /**
   * Threshold, group, label, measure.
   *
   * `Grouping` dilates the mask before labelling but measures on the original,
   * so raising it *merges* neighbours into one target without also inflating
   * that target's box. That is the dial between a swarm of small boxes and one
   * box around the whole subject, and it is the reason there is no separate
   * "minimum size" control — specks vanish into their neighbours or fail the
   * area floor on their own.
   */
  findBlobs(t) {
    const { field: s, mask: o, grouped: a, labels: n, stack: l, gw: i, gh: u } = this, d = i * u;
    let c = 1 / 0, h = -1 / 0;
    for (let v = 0; v < d; v++) {
      const y = s[v];
      y < c && (c = y), y > h && (h = y);
    }
    if (h - c < 0.02) return [];
    const m = c + (h - c) * (1 - t.threshold);
    for (let v = 0; v < d; v++) o[v] = s[v] >= m ? 1 : 0;
    const x = Math.round(t.grouping * 6);
    x > 0 ? this.dilate(x) : a.set(o), n.fill(0);
    const g = [], w = Math.max(2, Math.round(d * 6e-4));
    let S = 0;
    for (let v = 0; v < d; v++) {
      if (a[v] === 0 || n[v] !== 0) continue;
      S++;
      let y = 0;
      l[y++] = v, n[v] = S;
      let k = 0, A = 0, O = 0, R = i, T = -1, C = u, P = -1;
      for (; y > 0; ) {
        const I = l[--y], f = I / i | 0, D = I - f * i;
        if (o[I] === 1 && (k++, A += D, O += f, D < R && (R = D), D > T && (T = D), f < C && (C = f), f > P && (P = f)), D > 0) {
          const L = I - 1;
          a[L] === 1 && n[L] === 0 && (n[L] = S, l[y++] = L);
        }
        if (D < i - 1) {
          const L = I + 1;
          a[L] === 1 && n[L] === 0 && (n[L] = S, l[y++] = L);
        }
        if (f > 0) {
          const L = I - i;
          a[L] === 1 && n[L] === 0 && (n[L] = S, l[y++] = L);
        }
        if (f < u - 1) {
          const L = I + i;
          a[L] === 1 && n[L] === 0 && (n[L] = S, l[y++] = L);
        }
      }
      if (k < w || T < 0) continue;
      const F = T - R + 1, M = P - C + 1;
      g.push({
        cx: (A / k + 0.5) / i,
        cy: (O / k + 0.5) / u,
        hx: F / 2 / i,
        hy: M / 2 / u,
        area: k / d,
        fill: k / (F * M)
      });
    }
    return g.sort((v, y) => y.area - v.area), g.length > t.maxTargets && (g.length = t.maxTargets), g;
  }
  /** Separable box dilation of `mask` into `grouped`, using `labels` as scratch. */
  dilate(t) {
    const { mask: s, grouped: o, labels: a, gw: n, gh: l } = this;
    for (let i = 0; i < l; i++) {
      const u = i * n;
      for (let d = 0; d < n; d++) {
        let c = 0;
        const h = Math.max(0, d - t), m = Math.min(n - 1, d + t);
        for (let x = h; x <= m && c === 0; x++) c = s[u + x];
        a[u + d] = c;
      }
    }
    for (let i = 0; i < n; i++)
      for (let u = 0; u < l; u++) {
        let d = 0;
        const c = Math.max(0, u - t), h = Math.min(l - 1, u + t);
        for (let m = c; m <= h && d === 0; m++) d = a[m * n + i];
        o[u * n + i] = d;
      }
  }
  /**
   * Match this frame's blobs to existing tracks, nearest-first, then smooth.
   *
   * Greedy by area: the biggest blob picks its track before the small ones get a
   * say, so the dominant subject keeps its identity (and therefore its index
   * label and its connectors) through a frame where something small crosses it.
   */
  associate(t, s, o, a) {
    const n = /* @__PURE__ */ new Set(), l = new Array(t.length).fill(-1);
    for (let c = 0; c < t.length; c++) {
      const h = t[c];
      let m = -1, x = 1 / 0;
      for (let g = 0; g < this.tracks.length; g++) {
        if (n.has(g)) continue;
        const w = this.tracks[g], S = (h.cx - w.x) * s, v = h.cy - w.y, y = Math.hypot(S, v), k = Math.max(Nf, Math.max(w.hx * s, w.hy) * $f);
        y < x && y <= k && (x = y, m = g);
      }
      m >= 0 && (n.add(m), l[c] = m);
    }
    const i = a.smoothing * qf, u = i <= 0 ? 1 : 1 - Math.exp(-o / i), d = 1 - Math.exp(-o / Zf);
    for (let c = 0; c < t.length; c++) {
      if (l[c] < 0) continue;
      const h = t[c], m = this.tracks[l[c]], x = m.x, g = m.y;
      m.x += (h.cx - m.x) * u, m.y += (h.cy - m.y) * u, m.hx += (h.hx - m.hx) * u, m.hy += (h.hy - m.hy) * u, o > 0 && (m.vx += ((m.x - x) * s / o - m.vx) * d, m.vy += ((m.y - g) / o - m.vy) * d), m.conf += (Gi(h, m.id) - m.conf) * u, m.lostFor = 0, m.age += o;
    }
    for (let c = this.tracks.length - 1; c >= 0; c--) {
      const h = this.tracks[c];
      n.has(c) || (h.lostFor += o, h.age += o, h.x += h.vx / Math.max(s, 1e-6) * o, h.y += h.vy * o, h.lostFor > tn && this.tracks.splice(c, 1));
    }
    for (let c = 0; c < t.length; c++) {
      if (l[c] >= 0) continue;
      const h = t[c], m = this.nextId++;
      this.tracks.push({
        id: m,
        x: h.cx,
        y: h.cy,
        hx: h.hx,
        hy: h.hy,
        vx: 0,
        vy: 0,
        conf: Gi(h, m),
        lostFor: 0,
        age: 0
      });
    }
    this.tracks.length > a.maxTargets * 3 && (this.tracks.sort((c, h) => c.lostFor - h.lostFor), this.tracks.length = a.maxTargets * 3);
  }
  /** Project the live tracks into the flat list the shader consumes. */
  emit(t, s) {
    const o = this.tracks.filter((a) => a.lostFor <= tn).sort((a, n) => n.hx * n.hy - a.hx * a.hy).slice(0, s.maxTargets);
    this.out = o.map((a) => {
      const n = 1 - Math.min(1, a.lostFor / tn), l = Math.min(1, a.age / 0.12);
      return {
        id: a.id,
        // `Lead` draws the box where the target is *going*, not where it is. Its
        // whole existence depends on having tracked identity long enough to know
        // a velocity — it is the one control here that a per-frame effect cannot
        // fake, and at high values it gives the overshooting, hunting lock of a
        // system straining to keep up.
        x: a.x + a.vx / Math.max(t, 1e-6) * s.lead,
        y: a.y + a.vy * s.lead,
        hx: a.hx,
        hy: a.hy,
        vx: a.vx,
        vy: a.vy,
        speed: Math.hypot(a.vx, a.vy),
        conf: a.conf,
        alpha: n * l
      };
    });
  }
}
function Gi(e, t) {
  const s = Math.sin(t * 12.9898) * 43758.5453 % 1;
  return Math.min(0.999, 0.55 + e.fill * 0.38 + Math.abs(s) * 0.06);
}
const Go = 28;
function tg(e, t, s) {
  const o = t.length;
  if (e === "none" || o < 2) return [];
  const a = (i, u) => Math.hypot((i.x - u.x) * s, i.y - u.y), n = (i, u) => [i.x, i.y, u.x, u.y], l = [];
  switch (e) {
    case "nearest": {
      const i = /* @__PURE__ */ new Set();
      for (let u = 0; u < o; u++) {
        let d = -1, c = 1 / 0;
        for (let m = 0; m < o; m++) {
          if (u === m) continue;
          const x = a(t[u], t[m]);
          x < c && (c = x, d = m);
        }
        if (d < 0) continue;
        const h = u < d ? `${u}-${d}` : `${d}-${u}`;
        i.has(h) || (i.add(h), l.push(n(t[u], t[d])));
      }
      break;
    }
    case "chain": {
      const i = new Array(o).fill(!1);
      let u = 0;
      i[0] = !0;
      for (let d = 1; d < o; d++) {
        let c = -1, h = 1 / 0;
        for (let m = 0; m < o; m++) {
          if (i[m]) continue;
          const x = a(t[u], t[m]);
          x < h && (h = x, c = m);
        }
        if (c < 0) break;
        l.push(n(t[u], t[c])), i[c] = !0, u = c;
      }
      break;
    }
    case "mesh": {
      const i = [];
      for (let u = 0; u < o; u++)
        for (let d = u + 1; d < o; d++) i.push({ d: a(t[u], t[d]), a: u, b: d });
      i.sort((u, d) => u.d - d.d);
      for (const u of i) l.push(n(t[u.a], t[u.b]));
      break;
    }
    case "hub": {
      for (let i = 1; i < o; i++) l.push(n(t[0], t[i]));
      break;
    }
    case "hull": {
      const i = sg(t, s);
      if (i.length < 2) break;
      for (let u = 0; u < i.length; u++)
        l.push(n(t[i[u]], t[i[(u + 1) % i.length]]));
      break;
    }
  }
  return l.length > Go && (l.length = Go), l;
}
function sg(e, t) {
  const s = e.map((l, i) => ({ x: l.x * t, y: l.y, i }));
  if (s.sort((l, i) => l.x - i.x || l.y - i.y), s.length < 3) return s.map((l) => l.i);
  const o = (l, i, u) => (i.x - l.x) * (u.y - l.y) - (i.y - l.y) * (u.x - l.x), a = [];
  for (const l of s) {
    for (; a.length >= 2 && o(a[a.length - 2], a[a.length - 1], l) <= 0; ) a.pop();
    a.push(l);
  }
  const n = [];
  for (let l = s.length - 1; l >= 0; l--) {
    const i = s[l];
    for (; n.length >= 2 && o(n[n.length - 2], n[n.length - 1], i) <= 0; ) n.pop();
    n.push(i);
  }
  return a.pop(), n.pop(), [...a, ...n].map((l) => l.i);
}
const Ta = " 0123456789.-+:/%_ABCDEFGHIJKLMNOPQRSTUVWXYZ", vo = 8, zs = 48, og = Object.fromEntries(
  [...Ta].map((e, t) => [e, t])
);
function ag() {
  const e = Ta.length, t = document.createElement("canvas");
  t.width = zs * e, t.height = zs;
  const s = t.getContext("2d");
  s.fillStyle = "#000", s.fillRect(0, 0, t.width, t.height), s.fillStyle = "#fff", s.font = `600 ${Math.floor(zs * 0.72)}px "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace`, s.textAlign = "center", s.textBaseline = "middle";
  for (let a = 0; a < e; a++)
    s.fillText(Ta[a], a * zs + zs / 2, zs / 2 + zs * 0.04);
  const o = new p.CanvasTexture(t);
  return o.generateMipmaps = !1, o.minFilter = p.LinearFilter, o.magFilter = p.LinearFilter, o.wrapS = p.ClampToEdgeWrapping, o.wrapT = p.ClampToEdgeWrapping, o.colorSpace = p.NoColorSpace, o.needsUpdate = !0, o;
}
const Yi = ["OBJ", "FIG", "MASS", "NODE", "FORM", "BODY", "CELL", "UNIT"], Ui = "0123456789ABCDEF", sn = (e, t) => e.length >= t ? e.slice(0, t) : "0".repeat(t - e.length) + e;
function ng(e, t, s, o) {
  switch (e) {
    case "index":
      return sn(String(s + 1), 2);
    case "confidence":
      return t.conf.toFixed(4);
    case "coords":
      return `${sn(String(Math.round(t.x * o.width)), 3)}:${sn(String(Math.round((1 - t.y) * o.height)), 3)}`;
    case "size":
      return `${Math.round(t.hx * 2 * o.width)}X${Math.round(t.hy * 2 * o.height)}`;
    case "velocity": {
      const a = Math.round(t.speed * o.height);
      return `${a > 0 ? "+" : ""}${a}/S`;
    }
    case "class":
      return `${Yi[t.id % Yi.length]}_${Ui[t.id >> 3 & 15]}${Ui[t.id & 15]}`;
    default:
      return "";
  }
}
function rg(e, t) {
  const s = e.slice(0, vo);
  for (let o = 0; o < vo; o++)
    t[o] = o < s.length ? og[s[o]] ?? 0 : 0;
}
function ig(e) {
  return Math.min(vo, e.length);
}
const Fo = 64, lg = 24, cg = 128, Lo = 12, la = vo / 4, ji = (e) => r(e, "int");
function ug(e, t) {
  const s = e.style ?? "brackets", o = r(1), a = r(0), n = r(2e-3), l = r(new p.Color(e.color)), i = r(new p.Color(e.fill)), u = ji(0), d = ji(0), c = r(0.03), h = r(0), m = r(0.03), x = r(1), g = r(0), w = Array.from({ length: Lo }, () => new p.Vector4()), S = co(w), v = Array.from({ length: Lo }, () => new p.Vector4()), y = co(v), k = Array.from({ length: Lo * la }, () => new p.Vector4()), A = co(k), O = Array.from({ length: Go }, () => new p.Vector4()), R = co(O), T = ag(), C = (_, H) => {
    const q = we(_).sub(H);
    return Pe(ne(q, E(0, 0))).add(ve(ne(q.x, q.y), b(0)));
  }, P = (_, H, q) => {
    const ee = _.sub(H), Z = q.sub(H), ae = fe(ee.dot(Z).div(Z.dot(Z).max(b(1e-9))), 0, 1);
    return Pe(ee.sub(Z.mul(ae)));
  }, F = (_, H) => {
    const q = $(_.x, _.y, pe(we(_.y), we(_.x))), ee = a.mul(0.6).add(n.mul(3));
    switch (s) {
      case "frame":
        return { d: we(C(_, H)), dash: q };
      case "brackets": {
        const Z = ve(H.x, H.y).mul(0.55).max(n.mul(4)), ae = pe(H.x.sub(Z), we(_.x)).mul(pe(H.y.sub(Z), we(_.y)));
        return { d: we(C(_, H)).add(ae.oneMinus().mul(9)), dash: q };
      }
      case "ticks": {
        const Z = H.add(ee), ae = ve(H.x, H.y).mul(0.3).max(n.mul(3)), re = pe(we(_.x), ae).add(pe(we(_.y), ae)).clamp(0, 1);
        return { d: we(C(_, Z)).add(re.oneMinus().mul(9)), dash: q };
      }
      case "reticle": {
        const Z = ve(H.x, H.y).mul(0.5), ae = we(Pe(_).sub(Z)), re = Z.mul(1.35), be = we(P(we(_), E(re, 0), E(H.x, 0))), ye = we(P(we(_), E(0, re), E(0, H.y)));
        return { d: ve(ae, ve(be, ye)), dash: Ut(_.y, _.x).mul(Z) };
      }
      case "caliper": {
        const Z = H.y.add(ee).negate(), ae = H.x.add(ee), re = n.mul(3), be = P(_, E(H.x.negate(), Z), E(H.x, Z)), ye = ve(
          P(_, E(H.x.negate(), Z.sub(re)), E(H.x.negate(), Z.add(re))),
          P(_, E(H.x, Z.sub(re)), E(H.x, Z.add(re)))
        ), ke = P(_, E(ae, H.y.negate()), E(ae, H.y)), Fe = ve(
          P(_, E(ae.sub(re), H.y.negate()), E(ae.add(re), H.y.negate())),
          P(_, E(ae.sub(re), H.y), E(ae.add(re), H.y))
        );
        return { d: ve(ve(be, ye), ve(ke, Fe)), dash: q };
      }
      case "ring": {
        const Z = ne(H.x, H.y);
        return { d: we(Pe(_).sub(Z)), dash: Ut(_.y, _.x).mul(Z) };
      }
      case "pin": {
        const Z = Pe(_).sub(n.mul(1.8)), ae = E(H.x.add(a), H.y.add(a)), re = E(n.mul(2.4), n.mul(2.4)), be = P(_, re, ae), ye = pe(b(0), _.x).mul(pe(b(0), _.y));
        return { d: ve(Z, be.add(ye.oneMinus().mul(9))), dash: _.x.add(_.y) };
      }
      case "chevrons": {
        const Z = E(we(_.x), _.y), ae = H.x.mul(0.72), re = ve(H.x, H.y).mul(0.5), be = P(Z, E(H.x, re), E(ae, 0)), ye = P(Z, E(H.x, re.negate()), E(ae, 0));
        return { d: ve(be, ye), dash: Z.y };
      }
      default:
        return { d: we(C(_, H)), dash: q };
    }
  }, M = (_, H) => $($(_.x, _.y, pe(b(1), H)), $(_.z, _.w, pe(b(3), H)), pe(b(2), H)), I = st(([_]) => {
    const H = E(_.x.mul(o), _.y), q = b(0).toVar(), ee = b(0).toVar();
    return os(u, ({ i: Z }) => {
      const ae = S.element(Z), re = y.element(Z), be = re.x, ye = E(ae.x.mul(o), ae.y), ke = E(ae.z.mul(o).add(a), ae.w.add(a)), Fe = H.sub(ye), { d: Le, dash: Oe } = F(Fe, ke), Te = Se(Oe.add(g).div(m)), qe = ne(pe(Te, x), x), it = n.mul(0.6).add(b(6e-4)), yt = Me(n.add(it), n.sub(it), Le).mul(qe).mul(be);
      q.assign(ne(q, yt));
      const wt = pe(C(Fe, ke), b(0)).mul(be);
      ee.assign(ne(ee, wt));
      const Xt = re.y, It = c.mul(0.62), Je = n.mul(2.5), ot = s === "pin" ? E(ye.x.add(ke.x).add(a), ye.y.add(ke.y).add(a)) : E(ye.x.sub(ke.x).add(Je), ye.y.sub(ke.y).add(Je)), He = H.sub(ot), at = It.mul(Xt), mt = pe(b(0), He.x).mul(pe(He.x, at)).mul(pe(b(0), He.y)).mul(pe(He.y, c)).mul(pe(b(0.5), Xt)), lt = fe(Ue(He.x.div(It)), b(0), b(vo - 1)), At = A.element(Z.mul(la).add(Ue(lt.div(4)).toInt())), ut = M(At, Fd(Se(lt.div(4)).mul(4))).add(Se(He.x.div(It))).div(b(Ta.length)), Wt = He.y.div(c), Gt = nt(T, E(ut, Wt)).r;
      q.assign(ne(q, Gt.mul(mt).mul(be).mul(h)));
    }), os(d, ({ i: Z }) => {
      const ae = R.element(Z), re = E(ae.x.mul(o), ae.y), be = E(ae.z.mul(o), ae.w), ye = P(H, re, be), ke = H.sub(re).dot(be.sub(re).add(E(1e-9, 0)).normalize()), Fe = Se(ke.add(g).div(m)), Le = ne(pe(Fe, x), x), Oe = n.mul(0.7), Te = Oe.mul(0.6).add(b(6e-4));
      q.assign(ne(q, Me(Oe.add(Te), Oe.sub(Te), ye).mul(Le).mul(0.75)));
    }), E(q, ee);
  }), f = (_) => {
    const H = t(_), q = I(_), ee = H.rgb;
    let Z = $(ee, i, q.y.mul(0.15));
    return Z = $(Z, l, q.x), ie(Z, H.a);
  }, D = new p.RenderTarget(Fo, Fo, {
    minFilter: p.NearestFilter,
    magFilter: p.NearestFilter,
    type: p.UnsignedByteType,
    depthBuffer: !1,
    stencilBuffer: !1,
    generateMipmaps: !1
  }), L = new p.Scene(), B = new p.OrthographicCamera(-1, 1, 1, -1, 0, 1), z = new p.MeshBasicNodeMaterial();
  z.colorNode = t(vs());
  const V = new p.PlaneGeometry(2, 2);
  L.add(new p.Mesh(V, z));
  const Y = new eg(), U = Fo;
  let j = Fo, X = !1, N = !1, G = 0, W = -1, J = e.source ?? "bright", Q = e.threshold / 100, se = e.grouping / 100, K = e.targets, le = e.smoothing / 100, ce = e.lead / 100 * 0.35, oe = e.label ?? "none", de = e.link ?? "none", me = e.stroke === "marching", xe = { width: 1920, height: 1080 };
  const ge = new Array(vo).fill(0);
  function We(_, H) {
    const q = Math.min(_.length, Lo);
    for (let Z = 0; Z < Lo; Z++) {
      if (Z >= q) {
        v[Z].set(0, 0, 0, 0);
        continue;
      }
      const ae = _[Z];
      w[Z].set(ae.x, ae.y, ae.hx, ae.hy);
      const re = oe === "none" ? "" : ng(oe, ae, Z, xe);
      v[Z].set(ae.alpha, ig(re), 0, 0), rg(re, ge);
      for (let be = 0; be < la; be++)
        k[Z * la + be].set(
          ge[be * 4],
          ge[be * 4 + 1],
          ge[be * 4 + 2],
          ge[be * 4 + 3]
        );
    }
    u.value = q;
    const ee = tg(de, _.slice(0, q), H);
    for (let Z = 0; Z < ee.length && Z < Go; Z++)
      O[Z].set(ee[Z][0], ee[Z][1], ee[Z][2], ee[Z][3]);
    d.value = Math.min(ee.length, Go);
  }
  return { layerFn: f, updateUniforms: (_) => {
    const H = _.source ?? "bright";
    H !== J && Y.reset(), J = H, Q = _.threshold / 100, se = _.grouping / 100, K = _.targets, le = _.smoothing / 100, ce = _.lead / 100 * 0.35, oe = _.label ?? "none", de = _.link ?? "none", l.value.set(_.color), i.value.set(_.fill), a.value = _.size / 100 * 0.06, n.value = 6e-4 + _.weight / 100 * 6e-3, c.value = 0.012 + _.labelSize / 100 * 0.038, h.value = _.label === "none" ? 0 : 1;
    const q = _.stroke ?? "solid";
    me = q === "marching", x.value = q === "solid" ? 1 : 0.55, m.value = 0.026;
  }, renderPass: (_, H) => {
    if (N) return;
    xe = H;
    const q = Math.max(1e-3, H.width / Math.max(1, H.height));
    o.value = q, g.value = me ? Ce() * 0.12 : 0;
    const ee = Math.min(cg, Math.max(lg, Math.round(Fo / q)));
    ee !== j && (j = ee, D.setSize(U, j));
    const Z = _.getRenderTarget();
    if (_.setRenderTarget(D), _.render(L, B), _.setRenderTarget(Z), X) return;
    X = !0, G = Ce();
    const ae = G, re = U, be = j;
    _.readRenderTargetPixelsAsync(D, 0, 0, re, be).then((ye) => {
      if (N) return;
      const ke = W < 0 ? 1 / 60 : Math.min(0.2, Math.max(1 / 240, ae - W));
      W = ae, Y.update(ye, re, be, q, ke, {
        source: J,
        threshold: Q,
        grouping: se,
        maxTargets: K,
        smoothing: le,
        lead: ce
      }), We(Y.targets, q);
    }).catch(() => {
    }).finally(() => {
      X = !1;
    });
  }, dispose: () => {
    N = !0, D.dispose(), z.dispose(), V.dispose(), T.dispose();
  } };
}
const dg = {
  meta: {
    id: "blobTracker",
    name: "Blob Tracker",
    description: "Locks targeting marks onto what moves below",
    keywords: ["track", "tracking", "targeting", "reticle", "crosshair", "hud", "motion", "detect", "marks", "scan"],
    group: "stylise"
  },
  kind: "processor",
  // Two taps on the stack below: the composite reads it at the pixel, and the
  // detection pass renders it into the readback target.
  resampling: !0,
  paramSchema: vu,
  defaultParams: jf,
  buildLayer: ug
}, hg = {
  type: "linear",
  angle: 90,
  stops: [
    { color: "#ff2f7a", pos: 0 },
    { color: "#ffab2e", pos: 33 },
    { color: "#2ed3ff", pos: 66 },
    { color: "#8b5cff", pos: 100 }
  ]
}, on = (e) => e.type !== "ring" && e.type !== "viewport", xu = {
  type: {
    type: "dropdown",
    label: "Type",
    options: [
      { label: "Line", value: "line" },
      // a single straight beam of light
      { label: "Cross", value: "cross" },
      // two perpendicular beams
      { label: "Star", value: "star" },
      // radial starburst rays
      { label: "Ring", value: "ring" },
      // a glowing halo
      { label: "Triangle", value: "triangle" },
      // neon triangle outline
      { label: "Viewport", value: "viewport" }
      // frame glow near the scene edge
    ],
    default: "line",
    description: "The shape of light drawn. Line is a single straight shaft; Cross two perpendicular shafts; Star a radial burst; Ring a glowing halo; Triangle a neon outline; Viewport a glow inset from the frame edge, which frames the whole scene rather than sitting in it."
  },
  // Hot magenta, not the white-blue every stock beam ships with: WarpKit's Beam
  // is a neon tube, and it should read as one the moment you drop it in.
  fill: {
    type: "dropdown",
    label: "Fill",
    options: [
      { label: "Solid color", value: "solid" },
      { label: "Palette", value: "palette" }
    ],
    default: "solid",
    description: "One colour, or a palette the light runs through along its length — round the ring, along the shaft, around the frame. With any Motion but Still the colours travel along it."
  },
  palette: {
    type: "gradient",
    ramp: !0,
    label: "Palette",
    default: Pt(hg),
    showIf: (e) => e.fill === "palette",
    description: "The colours the light runs through along its length. It is read there and back, so a closed shape never shows a seam where the ends meet."
  },
  color: {
    type: "color",
    label: "Color",
    default: "#ff1f6f",
    showIf: (e) => e.fill !== "palette",
    description: "The beam colour. The default is a hot magenta rather than the white-blue of a stock lens flare, because this is a neon tube and should read as one."
  },
  intensity: {
    type: "slider",
    label: "Intensity",
    min: 0,
    max: 300,
    step: 1,
    default: 140,
    description: "How bright the beam is. Above 100 overdrives, which is what makes it bloom when a Bloom layer sits above."
  },
  thickness: {
    type: "slider",
    label: "Thickness",
    min: 1,
    max: 100,
    step: 1,
    default: 18,
    description: "How wide the beam is."
  },
  smoke: {
    type: "slider",
    label: "Smoke",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "Breaks the clean line of light into drifting, feathered wisps. 0 is a crisp neon tube; high turns a Ring into a smoke ring and a Viewport into a smouldering glow round the frame."
  },
  length: {
    type: "slider",
    label: "Scale",
    min: 10,
    max: 200,
    step: 1,
    default: 128,
    showIf: (e) => e.type !== "viewport",
    description: "How far the beam extends. Not used by Viewport, which is pinned to the frame."
  },
  inset: {
    type: "slider",
    label: "Inset",
    min: 0,
    max: 45,
    step: 1,
    default: 10,
    showIf: (e) => e.type === "viewport",
    description: "How far in from the frame edge the glow sits. Viewport only."
  },
  rays: {
    type: "slider",
    label: "Rays",
    min: 3,
    max: 16,
    step: 1,
    default: 6,
    showIf: (e) => e.type === "star",
    description: "How many arms the burst has. Star only."
  },
  // Shapes the taper toward the tips: low is an almost-even shaft that ends
  // abruptly, high is a short bright stub trailing off to a point. Only the
  // shapes with tips have anything to taper.
  falloff: {
    type: "slider",
    label: "Falloff",
    min: 0.3,
    max: 6,
    step: 0.1,
    default: 1.6,
    showIf: (e) => e.type === "line" || e.type === "cross" || e.type === "star",
    description: "How the beam tapers toward its tips. Low is an almost-even shaft that ends abruptly; high is a short bright stub trailing to a point. Only the shapes with tips — Line, Cross, Star."
  },
  // "Rotate" — same label and range as Shape 2D, ungrouped for the same reason:
  // it's one slider, not a section.
  angle: {
    type: "slider",
    label: "Rotate",
    min: 0,
    max: 360,
    step: 1,
    default: 90,
    showIf: on,
    description: "Turns the beam, in degrees. Not offered for Ring or Viewport, which look identical at every angle."
  },
  // ── Animation ─────────────────────────────────────────────────────────────
  // One motion at a time, named for what it does to *this* shape, and only
  // offered where it does something: a Ring cannot Sweep, and a beam that isn't
  // moving has no Speed. Everything below Motion is that motion's own knob, so
  // there are never more than three controls in this section.
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    showIf: (e) => e.type !== "viewport",
    description: "Moves the emitter sideways, as a percentage of the frame. Not used by Viewport."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    showIf: (e) => e.type !== "viewport",
    description: "Moves the emitter vertically, as a percentage of the frame. Not used by Viewport."
  },
  motion: {
    type: "dropdown",
    label: "Motion",
    group: "Animation",
    options: [
      { label: "Still", value: "still" },
      // Turning motions: only for shapes you can see turn.
      { label: "Sweep", value: "sweep", showIf: on },
      // spins about the emitter — lighthouse
      { label: "Swing", value: "swing", showIf: on },
      // rocks back and forth — searchlight
      // Every shape has a path light can run along: the shaft, the arms, the
      // rays, the ring, the outline, the frame.
      { label: "Trace", value: "trace" },
      { label: "Breathe", value: "breathe" },
      { label: "Flicker", value: "flicker" }
    ],
    default: "sweep",
    description: "How the beam moves — one motion at a time, and the controls below belong to whichever you pick. Sweep spins it about the emitter, the lighthouse; Swing rocks it back and forth, the searchlight; Trace runs light along the shape's own path; Breathe pulses the intensity; Flicker makes it read as failing neon. Sweep and Swing are only offered on shapes you can see turn."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: -100,
    max: 100,
    step: 1,
    default: 12,
    showIf: (e) => e.motion !== "still",
    description: "How fast the motion runs, and which way. Signed: negative reverses. Only once Motion is not Still."
  },
  arc: {
    type: "slider",
    label: "Arc",
    min: 5,
    max: 180,
    step: 1,
    default: 45,
    showIf: (e) => e.motion === "swing",
    description: "How far the swing travels, in degrees, before it turns back. Swing only."
  },
  tail: {
    type: "slider",
    label: "Tail",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    showIf: (e) => e.motion === "trace",
    description: "How long a trail the running light leaves behind it. Trace only."
  },
  depth: {
    type: "slider",
    label: "Depth",
    min: 0,
    max: 100,
    step: 1,
    default: 60,
    showIf: (e) => e.motion === "breathe" || e.motion === "flicker",
    description: "How far the intensity drops at the bottom of each pulse. Low is a subtle breath, high cuts nearly to black. Breathe and Flicker only."
  }
  // Emitter position (draggable on canvas) — same convention as every other placed layer.
}, mg = Object.fromEntries(
  Object.entries(xu).map(([e, t]) => [e, t.type === "gradient" ? Pt(t.default) : t.default])
), $i = 0.3;
function Ni(e) {
  switch (e) {
    case "cross":
      return 1;
    case "star":
      return 2;
    case "ring":
      return 4;
    case "triangle":
      return 5;
    case "viewport":
      return 6;
    // 3 was Cone, withdrawn. A scene still holding it falls through to Line,
    // which is editable — better than a shape nobody can pick rendering on.
    default:
      return 0;
  }
}
const Pn = 0, Mu = 1, ku = 2, An = 3, Su = 4, Pu = 5;
function qi(e) {
  switch (e) {
    case "still":
      return Pn;
    case "sweep":
      return Mu;
    case "swing":
      return ku;
    case "breathe":
      return Su;
    case "flicker":
      return Pu;
    // Also catches `undefined`: Beam layers saved before Motion existed carry a
    // Speed that meant "run a light along the shaft / around the ring", which is
    // exactly what Trace does now.
    default:
      return An;
  }
}
const pg = [1, 4, 10, 22], fg = [26, 2, 0.4, 0.05], gg = [1, 0.5, 0, 0], bg = [1, 0.85, 0.6, 0.35];
function yg(e) {
  const t = Math.sin(e * 3) * 0.5 + Math.sin(e * 7 + 1.7) * 0.32 + Math.sin(e * 13 + 0.6) * 0.18, s = Math.max(0, t);
  return s * s;
}
function wg(e, t) {
  const s = r(new p.Color(e.color)), o = r(e.intensity / 100), a = r(e.thickness / 100 * 0.07), n = r(e.length / 100 * 0.9), l = r(e.angle * (Math.PI / 180)), i = r(e.falloff), u = r(e.rays), d = r(Ni(e.type)), c = r(e.inset / 100 * 0.25), h = r(0), m = r(0), x = r(1), g = 0.05 + e.tail / 100 * 0.8, w = r(g), S = r(Math.max(0.012, g * 0.15)), v = r(new p.Vector2(
    0.5 + e.posX / 100 * 0.5,
    0.5 + e.posY / 100 * 0.5
  )), y = r(1), k = r(e.fill === "palette" ? 1 : 0), A = Ms(e.palette ?? jt), O = r(0), R = r((e.smoke ?? 0) / 100), T = r(new p.Vector3(0, 0, 0)), C = {
    motion: qi(e.motion),
    rate: e.speed / 100 * Math.PI * 2,
    // rad/s — 100 is one turn a second
    arc: e.arc * (Math.PI / 180),
    depth: e.depth / 100,
    angle: e.angle * (Math.PI / 180),
    intensity: e.intensity / 100,
    thickness: e.thickness / 100 * 0.07
  }, P = (f) => {
    const D = t(f), L = b(1).div(a.mul(9).add(0.02)), B = E(f.x.sub(0.5).mul(y), f.y.sub(0.5)).mul(L), z = E(T.x, T.y), V = T.z, Y = E(
      De(te(B.add(z), V)),
      De(te(B.add(z).add(E(19.1, 7.3)), V))
    ).add(E(
      De(te(B.mul(2.7).add(z.yx), V.mul(1.5))),
      De(te(B.mul(2.7).add(z.yx).add(E(3.7, 11.9)), V.mul(1.5)))
    ).mul(0.25)), U = R.mul(a.mul(9).add(0.01)), j = f.add(E(Y.x.mul(U).div(y), Y.y.mul(U))), X = $(b(1), fe(Y.x.mul(0.9).add(1), 0.35, 1.6), R), N = j.x.sub(v.x).mul(y), G = j.y.sub(v.y), W = Pe(E(N, G)), J = Ve(l), Q = Ae(l), se = N.mul(J).sub(G.mul(Q)), K = N.mul(Q).add(G.mul(J)), le = (Tt) => fe(b(1).sub(d.sub(Tt).abs()), 0, 1), ce = le(0), oe = le(1), de = le(2), me = le(4), xe = le(5), ge = le(6), We = K.abs(), Ge = se.abs(), _e = se.abs(), Ye = K.abs(), _ = (Tt, Nt) => {
      const hs = ne(Nt.sub(n), 0);
      return Tt.mul(Tt).add(hs.mul(hs));
    }, H = pe(_(We, Ge), _(_e, Ye)), q = $(_e, We, H), ee = $(Ye, Ge, H), Z = Ut(K, se), ae = b(Math.PI * 2).div(u), re = Z.sub(Ue(Z.div(ae).add(0.5)).mul(ae)), be = W.mul(Ve(re)), ye = W.mul(Ae(re)).abs(), ke = n.mul(0.6), Fe = W.sub(ke).abs(), Le = n.mul(0.9), Oe = 0, Te = -1, qe = 0.8660254, it = 0.5, yt = -0.8660254, wt = 0.5, Xt = E(se.sub(Le.mul(Oe)), K.sub(Le.mul(Te))), It = E(Le.mul(qe - Oe), Le.mul(it - Te)), Je = fe(Xt.dot(It).div(It.dot(It)), 0, 1), ot = Pe(Xt.sub(It.mul(Je))), He = E(se.sub(Le.mul(qe)), K.sub(Le.mul(it))), at = E(Le.mul(yt - qe), Le.mul(wt - it)), mt = fe(He.dot(at).div(at.dot(at)), 0, 1), lt = Pe(He.sub(at.mul(mt))), At = E(se.sub(Le.mul(yt)), K.sub(Le.mul(wt))), ct = E(Le.mul(Oe - yt), Le.mul(Te - wt)), ut = fe(At.dot(ct).div(ct.dot(ct)), 0, 1), Wt = Pe(At.sub(ct.mul(ut))), Gt = ve(ot, ve(lt, Wt)), rs = j.x.sub(0.5).mul(y), is = j.y.sub(0.5), ls = ve(j.x, b(1).sub(j.x)).mul(y), ks = ve(j.y, b(1).sub(j.y)), Ps = ve(ls, ks).sub(c).abs(), cs = We.mul(ce).add(q.mul(oe)).add(ye.mul(de)).add(Fe.mul(me)).add(Gt.mul(xe)).add(Ps.mul(ge)), us = Ge.mul(ce).add(ee.mul(oe)).add(be.mul(de)), ds = $e(fe(b(1).sub(us.div(n)), 0, 1), i), $t = se.div(n).mul(0.5).add(0.5), es = W.div(n), As = Z.div(Math.PI * 2).add(0.5), xo = Ut(is, rs).div(Math.PI * 2).add(0.5), Js = $t.mul(ce).add(es.mul(oe)).add(es.mul(de)).add(As.mul(me)).add(As.mul(xe)).add(xo.mul(ge)), Mo = Se(m.sub(Js).mul(x).add(0.5)).sub(0.5), he = ne(n.mul(2).mul(ce).add(n.mul(oe)).add(n.mul(de)).add(n.mul(Math.PI * 2 * 0.6).mul(me)).add(n.mul(3 * Math.sqrt(3) * 0.9).mul(xe)).add(y.add(1).mul(2).mul(ge)), 1e-4), Ie = (Tt, Nt) => Nt === 0 ? b(1) : Nt === 1 ? Tt : $e(Tt, Nt), pt = cs.mul(cs), ft = pg.reduce((Tt, Nt, hs) => {
      const eo = a.mul(Nt), Zo = ne(us.sub(n.mul(bg[hs])), 0), La = pt.add(Zo.mul(Zo)).div(eo.mul(eo)), Ko = eo.div(he), Ra = fe(b(1).sub(Mo.div(w.add(Ko))), 0, 1), Cs = fe(b(1).add(Mo.div(S.add(Ko))), 0, 1), Is = $e(ve(Ra, Cs), 1.7), ko = Rt(La.mul(-1)).mul(Ie(ds, gg[hs])).mul($(b(1), Is, h)).mul(fg[hs]);
      return Tt ? Tt.add(ko) : ko;
    }, null).mul(o).mul(X), Ts = (Tt) => b(1).sub(we(Se(Tt).mul(2).sub(1))), Xe = $(te(s.r, s.g, s.b), A.sample(Ts(Js.add(O))).rgb, k), vt = (Tt) => Rt(Tt.mul(ft).mul(-1)).oneMinus(), Et = te(vt(Xe.x), vt(Xe.y), vt(Xe.z)), ts = D.rgb.add(Et).clamp(0, 1);
    return ie(ts, D.a);
  }, F = (f) => {
    s.value.set(f.color), k.value = f.fill === "palette" ? 1 : 0, f.palette && A.update(f.palette), R.value = (f.smoke ?? 0) / 100, n.value = f.length / 100 * 0.9, i.value = f.falloff, u.value = f.rays, d.value = Ni(f.type), c.value = f.inset / 100 * 0.25, w.value = 0.05 + f.tail / 100 * 0.8, S.value = Math.max(0.012, w.value * 0.15), v.value.set(
      0.5 + f.posX / 100 * 0.5,
      0.5 + f.posY / 100 * 0.5
    ), C.motion = qi(f.motion), C.rate = f.speed / 100 * Math.PI * 2, C.arc = f.arc * (Math.PI / 180), C.depth = f.depth / 100, C.angle = f.angle * (Math.PI / 180), C.intensity = f.intensity / 100, C.thickness = f.thickness / 100 * 0.07, l.value = C.angle, o.value = C.intensity, a.value = C.thickness;
  }, M = new p.Vector2();
  return { layerFn: P, updateUniforms: F, renderPass: (f) => {
    f.getDrawingBufferSize(M), y.value = M.x / Math.max(1, M.y);
    const { motion: D, rate: L, arc: B, depth: z } = C, V = D === Pn ? 0 : Ce() * L;
    l.value = C.angle + (D === Mu ? V : 0) + (D === ku ? Math.sin(V) * B : 0);
    let Y = 1, U = 1;
    if (D === Su) {
      const X = Math.sin(V);
      Y = 1 + z * 0.55 * X, U = 1 + z * 0.3 * X;
    } else D === Pu && (Y = 1 - z * 0.85 * yg(V));
    o.value = C.intensity * Y, a.value = C.thickness * U, O.value = D === Pn ? 0 : V / (Math.PI * 2);
    const j = Qe();
    if (j.active && j.duration > 0) {
      const X = $i * j.duration / (Math.PI * 2), N = Ne() * Math.PI * 2;
      T.value.set(X * Math.cos(N), X * Math.sin(N), 0);
    } else
      T.value.set(0, 0, Ce() * $i);
    if (h.value = D === An ? 1 : 0, D === An) {
      const X = V / (Math.PI * 2);
      m.value = X - Math.floor(X), x.value = L < 0 ? -1 : 1;
    }
  } };
}
const vg = {
  meta: {
    id: "beam",
    name: "Beam",
    description: "A beam of light over your scene — line, cross, star, ring, triangle or viewport frame",
    keywords: ["ray", "line", "shaft", "god ray", "godrays", "laser", "flare", "star", "cross", "ring", "triangle", "viewport", "frame", "neon", "glow", "bloom", "sweep", "searchlight", "flicker"],
    group: "light"
  },
  kind: "processor",
  paramSchema: xu,
  defaultParams: mg,
  buildLayer: wg
}, Au = {
  mode: {
    type: "dropdown",
    label: "Style",
    options: [
      { label: "On image", value: "over" },
      // colored edges over the scene
      { label: "Ink", value: "ink" },
      // line art on a flat background
      { label: "Glow", value: "glow" }
      // edges added as light
    ],
    default: "over",
    structural: !0,
    description: "What happens to the edges it finds. On image draws coloured lines over the artwork; Ink discards the artwork and keeps only the line work on a flat Background, giving a drawn or engraved look; Glow adds the edges as light, so they bloom rather than sit on top."
  },
  color: {
    type: "color",
    label: "Line color",
    default: "#ffffff",
    description: "The line colour."
  },
  background: {
    type: "color",
    label: "Background",
    default: "#0a0a0e",
    showIf: (e) => e.mode === "ink",
    description: "What the line work sits on once the artwork is discarded. Ink only."
  },
  thickness: {
    type: "slider",
    label: "Thickness",
    min: 1,
    max: 6,
    step: 0.5,
    default: 1.5,
    description: "How heavy the line is, in pixels."
  },
  threshold: {
    type: "slider",
    label: "Sensitivity",
    min: 0,
    max: 100,
    step: 1,
    default: 22,
    description: "How much local contrast counts as an edge. Low finds every subtle change and can turn a photograph into noise; high keeps only strong boundaries, which is usually what reads as a drawing."
  },
  softness: {
    type: "slider",
    label: "Softness",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "How soft the line is. 0 is a hard technical line, high a smoky charcoal one."
  },
  intensity: {
    type: "slider",
    label: "Strength",
    min: 0,
    max: 200,
    step: 1,
    default: 100,
    description: "How strongly the lines are drawn against what is beneath. Above 100 overdrives them."
  }
}, xg = Object.fromEntries(
  Object.entries(Au).map(([e, t]) => [e, t.default])
);
function Mg(e, t) {
  const s = e.mode, o = r(new p.Color(e.color)), a = r(new p.Color(e.background)), n = r(e.thickness), l = r(e.threshold / 100 * 1.5), i = r(Math.max(0.01, e.softness / 100)), u = r(e.intensity / 100), d = r(new p.Vector2(1 / 1080, 1 / 1080));
  return { layerFn: (x) => {
    const g = t(x), w = (B) => B.r.mul(0.299).add(B.g.mul(0.587)).add(B.b.mul(0.114)), S = (B, z) => w(t(x.add(E(d.x.mul(n).mul(B), d.y.mul(n).mul(z))))), v = S(-1, -1), y = S(0, -1), k = S(1, -1), A = S(-1, 0), O = S(1, 0), R = S(-1, 1), T = S(0, 1), C = S(1, 1), P = k.add(O.mul(2)).add(C).sub(v).sub(A.mul(2)).sub(R), F = R.add(T.mul(2)).add(C).sub(v).sub(y.mul(2)).sub(k), M = P.mul(P).add(F.mul(F)).sqrt(), I = fe(Me(l, l.add(i), M).mul(u), 0, 1), f = b(1).sub(I);
    let D, L = g.a;
    return s === "ink" ? (D = a.mul(f).add(o.mul(I)), L = b(1)) : s === "glow" ? D = g.rgb.add(o.mul(I)).clamp(0, 1) : D = g.rgb.mul(f).add(o.mul(I)), ie(D, L);
  }, updateUniforms: (x) => {
    o.value.set(x.color), a.value.set(x.background), n.value = x.thickness, l.value = x.threshold / 100 * 1.5, i.value = Math.max(0.01, x.softness / 100), u.value = x.intensity / 100;
  }, renderPass: (x, g) => {
    d.value.set(1 / Math.max(1, g.width), 1 / Math.max(1, g.height));
  } };
}
const kg = {
  meta: {
    id: "outline",
    name: "Contour",
    description: "Detects edges with a Sobel filter and draws them as clean outlines",
    keywords: ["edges", "edge detect", "contour", "sobel", "stroke", "line art", "trace", "sketch", "wireframe", "border"],
    group: "stylise"
  },
  kind: "processor",
  // 3×3 Sobel ring — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: Au,
  defaultParams: xg,
  buildLayer: Mg
}, Tu = {
  lines: {
    type: "slider",
    label: "Lines",
    min: 2,
    max: 40,
    step: 1,
    default: 12,
    description: "How many levels the range is cut into, from darkest to lightest. More lines sit closer together, and crowd wherever the picture changes fast."
  },
  width: {
    type: "slider",
    label: "Width",
    min: 1,
    max: 100,
    step: 1,
    default: 20,
    description: "How thick each line is. It stays the same thickness on steep and gentle slopes alike, and is sized to the frame, so an export matches the editor."
  },
  color: {
    type: "color",
    label: "Line color",
    default: "#ffffff",
    description: "The line colour."
  },
  fill: {
    type: "dropdown",
    label: "Fill",
    options: [
      { label: "Colour", value: "colour" },
      { label: "Picture", value: "picture" },
      { label: "None", value: "none" }
    ],
    default: "colour",
    structural: !0,
    description: "What sits between the lines. Colour is a flat background, the map look. Picture keeps the layers below and draws over them. None leaves only the lines, on transparent, to layer over anything."
  },
  background: {
    type: "color",
    label: "Background",
    default: "#0a0a0a",
    showIf: (e) => e.fill === "colour",
    description: "The colour between the lines when Fill is Colour."
  },
  // Whole levels per loop, signed: the lines flow through the levels and land
  // back on their own pattern at the wrap. Nothing rounded.
  travel: {
    type: "slider",
    label: "Travel",
    min: -12,
    max: 12,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How many levels the lines move through over the loop. Positive flows from dark toward light, negative the other way — ripples spreading out of the shadows, or draining into them. Whole numbers only, which is what keeps it seamless. 0 holds them still."
  }
}, Sg = Object.fromEntries(
  Object.entries(Tu).map(([e, t]) => [e, t.default])
), Pg = 8, an = 6;
function Ag(e, t) {
  const s = e.fill ?? "colour", o = r(e.lines), a = r(e.width / 100), n = r(1), l = r(0), i = r(new p.Vector2(an / 1920, an / 1080)), u = r(new p.Color(e.color)), d = r(new p.Color(e.background ?? "#0a0a0a")), c = (w) => {
    const S = t(w), v = (I) => Re(I.rgb, te(0.2126, 0.7152, 0.0722)), y = (I, f) => v(t(w.add(E(i.x.mul(I), i.y.mul(f))))), A = v(S).mul(2).add(y(1, 0)).add(y(-1, 0)).add(y(0, 1)).add(y(0, -1)).add(y(0.7, 0.7)).add(y(-0.7, 0.7)).add(y(0.7, -0.7)).add(y(-0.7, -0.7)).div(10).mul(o).sub(l), O = Se(A), R = ve(O, b(1).sub(O)), T = xs(A), C = ne(a.mul(Pg).mul(n), 0.5).mul(0.5), P = R.div(ne(T, 1e-6)), F = Me(1e-5, 1e-4, T), M = b(1).sub(Me(C.sub(0.5), C.add(0.5), P)).mul(F);
    return s === "none" ? ie(u, M) : s === "picture" ? ie($(S.rgb, u, M), ne(S.a, M)) : ie($(d, u, M), b(1));
  };
  let h = Math.round(e.travel);
  const m = (w) => {
    o.value = w.lines, a.value = w.width / 100, u.value.set(w.color), d.value.set(w.background ?? "#0a0a0a"), h = Math.round(w.travel);
  }, x = new p.Vector2();
  return { layerFn: c, updateUniforms: m, renderPass: (w) => {
    w.getDrawingBufferSize(x), n.value = x.y / 1080;
    const S = an / 1080;
    i.value.set(S * x.y / Math.max(1, x.x), S);
    const v = Qe().duration > 0 ? Ne() : 0;
    l.value = h * v;
  } };
}
const Tg = {
  meta: {
    id: "topoLines",
    name: "Topo Lines",
    description: "Draws contour lines through the layers below, like a topographic map of their brightness",
    keywords: [
      "contour",
      "contours",
      "topographic",
      "topography",
      "isoline",
      "isolines",
      "level lines",
      "map",
      "elevation",
      "terrain",
      "ripple",
      "offset outline",
      "rings",
      "bands"
    ],
    group: "stylise"
  },
  kind: "processor",
  // Nine taps for the smoothing cross — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: Tu,
  defaultParams: Sg,
  buildLayer: Ag
}, Cg = {
  // Same gradient editor as Background/Gradient — here it's a brightness→colour map.
  gradient: {
    type: "gradient",
    ramp: !0,
    label: "Color map",
    default: Pt(jt),
    description: "The colour map. Brightness is looked up along this ramp — the dark end of the image takes the stop at position 0, the bright end the stop at 100 — so a two-stop ramp gives the classic duotone and more stops give a posterised colour grade."
  },
  amount: {
    type: "slider",
    label: "Amount",
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    description: "How far the mapped colour replaces the original. 100 is a full duotone; lower blends the original back in."
  },
  contrast: {
    type: "slider",
    label: "Contrast",
    min: 0,
    max: 200,
    step: 1,
    default: 100,
    description: "How hard the image is pushed toward its ends before the colour map is applied. Above 100 drives more of the picture to the extremes of the ramp; below flattens it into the middle."
  },
  brightness: {
    type: "slider",
    label: "Brightness",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    description: "Shifts the whole image up or down the ramp before mapping, so the same gradient reads darker or lighter. 0 leaves it as it is."
  }
}, Ig = {
  gradient: Pt(jt),
  amount: 100,
  contrast: 100,
  brightness: 0
};
function Eg(e, t) {
  const s = Ms(e.gradient), o = r(e.amount / 100), a = r(e.contrast / 100), n = r(e.brightness / 100);
  return { layerFn: (u) => {
    const d = t(u), c = d.r.mul(0.299).add(d.g.mul(0.587)).add(d.b.mul(0.114)), h = fe(c.sub(0.5).mul(a).add(0.5).add(n), 0, 1), m = s.sample(h), x = d.rgb.mul(b(1).sub(o)).add(m.mul(o));
    return ie(x, d.a);
  }, updateUniforms: (u) => {
    s.update(u.gradient), o.value = u.amount / 100, a.value = u.contrast / 100, n.value = u.brightness / 100;
  } };
}
const Fg = {
  meta: {
    id: "duotone",
    name: "Duotone",
    description: "Maps the brightness below onto a colour gradient (gradient map)",
    keywords: ["gradient map", "two tone", "tint", "colourise", "colorise", "colorize", "recolour", "recolor", "palette", "risograph", "mono"],
    group: "colour"
  },
  kind: "processor",
  paramSchema: Cg,
  defaultParams: Ig,
  buildLayer: Eg
}, Cu = {
  shape: {
    type: "dropdown",
    label: "Shape",
    options: [
      { label: "Dots", value: "dots" },
      { label: "Lines", value: "lines" },
      { label: "Squares", value: "squares" }
    ],
    default: "dots",
    structural: !0,
    description: "The mark each cell is printed with. Dots is the classic newsprint screen, Lines gives an engraved hatch, Squares a blocky mechanical grid."
  },
  ink: {
    type: "color",
    label: "Ink",
    default: "#ffffff",
    description: "The colour the marks are printed in."
  },
  paper: {
    type: "color",
    label: "Paper",
    default: "#0a0a0e",
    description: "The colour behind them. The effect replaces the artwork with ink on paper rather than tinting it, so these two are the whole palette."
  },
  scale: {
    type: "slider",
    label: "Cell size",
    min: 10,
    max: 200,
    step: 1,
    default: 70,
    description: "How big one cell of the screen is. Small reads as a fine print screen at a distance, large as a deliberately coarse graphic pattern."
  },
  angle: {
    type: "slider",
    label: "Angle",
    min: 0,
    max: 90,
    step: 1,
    default: 45,
    description: "The angle of the screen, in degrees. 45 is the traditional print angle and the least visually intrusive; 0 lines the grid up with the frame, which reads far more mechanical."
  },
  contrast: {
    type: "slider",
    label: "Contrast",
    min: 0,
    max: 200,
    step: 1,
    default: 100,
    description: "How hard the image is pushed toward its ends before it is screened. Above 100 gives cleaner blacks and whites with fewer mid-sized dots."
  },
  smoothness: {
    type: "slider",
    label: "Smoothness",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "How soft the edge of each mark is. 0 gives hard-edged print dots; raising it blurs them toward a continuous tone."
  }
}, Lg = Object.fromEntries(
  Object.entries(Cu).map(([e, t]) => [e, t.default])
);
function Rg(e, t) {
  const s = e.shape, o = r(new p.Color(e.ink)), a = r(new p.Color(e.paper)), n = r(e.scale), l = r(e.angle * (Math.PI / 180)), i = r(e.contrast / 100), u = r(Math.max(0.01, e.smoothness / 100)), d = r(1), c = (g) => {
    const w = t(g), S = w.r.mul(0.299).add(w.g.mul(0.587)).add(w.b.mul(0.114)), v = fe(b(1).sub(S).sub(0.5).mul(i).add(0.5), 0, 1), y = E(g.x.sub(0.5).mul(d), g.y.sub(0.5)), k = Ve(l), A = Ae(l), R = E(y.x.mul(k).sub(y.y.mul(A)), y.x.mul(A).add(y.y.mul(k))).mul(n);
    let T;
    const C = u.mul(0.5);
    if (s === "lines") {
      const F = Se(R.y).sub(0.5), M = v.mul(0.5);
      T = Me(M.add(C), M.sub(C), we(F));
    } else if (s === "squares") {
      const F = Se(R).sub(0.5).abs(), M = ne(F.x, F.y), I = v.mul(0.5);
      T = Me(I.add(C), I.sub(C), M);
    } else {
      const F = Pe(Se(R).sub(0.5)), M = v.mul(0.72);
      T = Me(M.add(C), M.sub(C), F);
    }
    const P = a.mul(b(1).sub(T)).add(o.mul(T));
    return ie(P, w.a);
  }, h = (g) => {
    o.value.set(g.ink), a.value.set(g.paper), n.value = g.scale, l.value = g.angle * (Math.PI / 180), i.value = g.contrast / 100, u.value = Math.max(0.01, g.smoothness / 100);
  }, m = new p.Vector2();
  return { layerFn: c, updateUniforms: h, renderPass: (g) => {
    g.getDrawingBufferSize(m), d.value = m.x / Math.max(1, m.y);
  } };
}
const Dg = {
  meta: {
    id: "halftone",
    name: "Halftone",
    description: "Rebuilds the image as a rotated grid of ink dots, lines or squares",
    keywords: ["dots", "print", "printing", "screen", "newspaper", "cmyk", "comic", "ben day", "ink", "risograph", "moire", "lines"],
    group: "stylise"
  },
  kind: "processor",
  paramSchema: Cu,
  defaultParams: Lg,
  buildLayer: Rg
}, Iu = {
  // Live, not structural: both styles are built and picked by a uniform, so
  // hovering the menu previews each.
  style: {
    type: "dropdown",
    label: "Style",
    options: [
      { label: "Lines", value: "lines" },
      { label: "Spiral", value: "spiral" }
    ],
    default: "lines",
    description: "How the plate is cut. Lines runs parallel strokes at the Angle, like a banknote portrait. Spiral is one continuous groove winding out from the centre, like a coin or a record."
  },
  ink: {
    type: "color",
    label: "Ink",
    default: "#14161c",
    description: "The colour of the engraved lines."
  },
  paper: {
    type: "color",
    label: "Paper",
    default: "#f2efe6",
    description: "The colour between the lines."
  },
  // A count over the frame height — so the plate looks the same at any export size.
  lines: {
    type: "slider",
    label: "Lines",
    min: 20,
    max: 200,
    step: 1,
    default: 80,
    description: "How many lines fill the frame top to bottom. Fewer is a bold woodcut; more is fine copper-plate work."
  },
  weight: {
    type: "slider",
    label: "Weight",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "How heavy the lines run overall. Low keeps them hairline except in deep shadow; high lets them swell and close up early, for a darker, bolder plate."
  },
  bend: {
    type: "slider",
    label: "Bend",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    description: "How far the lines bow with the picture, following its light and shadow the way an engraver's burin follows a face. 0 keeps them dead straight."
  },
  hatch: {
    type: "slider",
    label: "Hatch",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    description: "Adds a second set of lines across the first, only in the shadows. Higher reaches further into the midtones. 0 is a single plate."
  },
  angle: {
    type: "slider",
    label: "Angle",
    min: 0,
    max: 180,
    step: 1,
    default: 30,
    group: "Position",
    showIf: (e) => e.style !== "spiral",
    description: "Which way the lines run, in degrees. 0 is horizontal. Lines style only."
  },
  // Whole lines per loop: the plate's own period, so the wrap is seamless.
  travel: {
    type: "slider",
    label: "Travel",
    min: -12,
    max: 12,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How many line spacings the lines slide through over the loop — across the picture for Lines, outward or inward for Spiral. Whole numbers only, which is what keeps it seamless. 0 holds them still."
  }
}, Hg = Object.fromEntries(
  Object.entries(Iu).map(([e, t]) => [e, t.default])
), Og = 3, Bg = te(0.2126, 0.7152, 0.0722);
function zg(e, t) {
  const s = r(e.style === "spiral" ? 1 : 0), o = r(new p.Color(e.ink)), a = r(new p.Color(e.paper)), n = r(e.lines), l = r(1), i = r(0), u = r(0), d = r(new p.Vector2(1, 0)), c = r(0), h = r(1), m = r(10), x = (y) => {
    const k = (Q) => {
      const se = t(Q);
      return $e(ne(Re(se.rgb.mul(se.a).add(b(1).sub(se.a)), Bg), 0), 0.45454545454545453);
    }, A = b(0.5).div(n), O = A.div(h), R = k(y).mul(2).add(k(y.add(E(O, 0)))).add(k(y.sub(E(O, 0)))).add(k(y.add(E(0, A)))).add(k(y.sub(E(0, A)))).div(6), T = fe(b(1).sub(R), 0, 1), C = E(y.x.sub(0.5).mul(h), y.y.sub(0.5)), P = Re(C, d).mul(n), F = Pe(C).mul(n), M = F.add(Ut(C.y, C.x).div(Math.PI * 2)), I = $(P, M, s), f = ne($(xs(P), xs(F), s), 1e-4), D = I.add(R.mul(i)).sub(c), L = Se(D), B = ve(L, b(1).sub(L)), z = $e(T, l).mul(0.5), V = fe(z.sub(B).div(f).add(0.5), 0, 1), Y = E(d.y.negate(), d.x), U = Re(C, Y).mul(n).add(R.mul(i)).sub(c), j = Se(U), X = ve(j, b(1).sub(j)), N = fe(T.sub(b(1).sub(u)).div(ne(u, 1e-3)), 0, 1).mul(0.35), G = fe(N.sub(X).div(f).add(0.5), 0, 1).mul(pe(1e-3, u)), W = Me(1.5, 2.5, m), J = $(ve(T.mul(1.1), 1), ne(V, G), W);
    return ie($(a, o, J), b(1));
  };
  let g = Math.round(e.travel);
  const w = (y) => {
    s.value = y.style === "spiral" ? 1 : 0, o.value.set(y.ink), a.value.set(y.paper), n.value = y.lines, l.value = 2.2 - y.weight / 100 * 1.65, i.value = y.bend / 100 * Og, u.value = y.hatch / 100 * 0.7;
    const k = y.angle * Math.PI / 180;
    d.value.set(-Math.sin(k), Math.cos(k)), g = Math.round(y.travel);
  };
  w(e);
  const S = new p.Vector2();
  return { layerFn: x, updateUniforms: w, renderPass: (y) => {
    y.getDrawingBufferSize(S), h.value = S.x / Math.max(1, S.y), m.value = S.y / Math.max(1, n.value);
    const k = Qe().duration > 0 ? Ne() : 0;
    c.value = g * k;
  } };
}
const Vg = {
  meta: {
    id: "engraving",
    name: "Engraving",
    description: "Redraws the layers below as engraved line work — banknote portrait, cross-hatching or one spiral groove",
    keywords: [
      "engrave",
      "engraving",
      "etching",
      "copperplate",
      "banknote",
      "currency",
      "money",
      "line art",
      "hatching",
      "cross-hatch",
      "woodcut",
      "linocut",
      "spiral",
      "print",
      "intaglio"
    ],
    group: "stylise"
  },
  kind: "processor",
  // Five taps for the smoothed tone — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: Iu,
  defaultParams: Hg,
  buildLayer: zg
}, _g = {
  mode: {
    type: "dropdown",
    label: "Style",
    options: [
      { label: "Cells", value: "cells" },
      // flat colour per cell
      { label: "Edges", value: "edges" },
      // stained-glass borders
      { label: "Distance", value: "distance" }
      // gradient by distance to centre
    ],
    default: "cells",
    structural: !0,
    description: "What is drawn from the cell structure. Cells fills each region with one flat colour; Edges draws only the borders, for a stained-glass or cracked-net look; Distance shades each cell by distance from its centre, giving domed, scale-like gradients."
  },
  gradient: {
    type: "gradient",
    ramp: !0,
    label: "Color",
    default: Pt(jt),
    description: "The colour ramp the cells are picked from — each cell takes one colour along it, so a wide ramp gives a varied mosaic and a narrow one a tonal set."
  },
  scale: {
    type: "slider",
    label: "Density",
    min: 2,
    max: 40,
    step: 1,
    default: 8,
    description: "How many cells fit across the frame. Low gives a few large plates, high a fine crazed texture."
  },
  jitter: {
    type: "slider",
    label: "Randomness",
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    description: "How irregular the cell centres are. 0 collapses to a regular grid of identical cells; 100 is fully organic, which is what makes it read as cracked earth or stone rather than tiling."
  },
  variety: {
    type: "slider",
    label: "Size variety",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How unequal the cells are. 0 gives cells of about one size; high lets some swell into large plates while their neighbours shrink, the way bubbles or cracked glaze sit together."
  },
  edgeWidth: {
    type: "slider",
    label: "Edge width",
    min: 1,
    max: 100,
    step: 1,
    default: 30,
    showIf: (e) => e.mode === "edges",
    description: "How thick the borders are drawn. Edges only."
  },
  roundness: {
    type: "slider",
    label: "Roundness",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    showIf: (e) => e.mode === "edges",
    description: "How far the cell corners round off. 0 keeps the sharp polygons; high turns every cell into a pebble, with the borders pooling where three cells meet. Edges only."
  },
  edgeColor: {
    type: "color",
    label: "Edge color",
    default: "#0a0a0e",
    showIf: (e) => e.mode === "edges",
    description: "The colour of those borders. Edges only."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 18,
    group: "Animation",
    description: "How fast the cell centres drift, so the mosaic slowly rearranges. 0 holds the pattern still."
  }
}, Xg = {
  mode: "cells",
  gradient: Pt(jt),
  scale: 8,
  jitter: 100,
  edgeWidth: 30,
  roundness: 0,
  variety: 0,
  edgeColor: "#0a0a0e",
  speed: 18
}, Zi = Math.PI * 2, Ki = (e) => (e ?? 0) / 100 * 0.3, Qi = (e) => (e ?? 0) / 100 * 2;
function Wg(e, t, s) {
  const o = e.mode, a = s ? s.live("roundness") || s.live("variety") : !0, n = Ms(e.gradient), l = r(new p.Color(e.edgeColor)), i = r(e.scale), u = r(e.jitter / 100), d = r(e.edgeWidth / 100 * 0.5), c = r(e.speed / 100 * 2.5), h = r(Ki(e.roundness)), m = r(Qi(e.variety)), x = r(0), g = r(1), w = (M) => Se(Ae(E(M.dot(E(127.1, 311.7)), M.dot(E(269.5, 183.3)))).mul(43758.5453)), S = (M) => Se(Ae(M.dot(E(419.2, 371.9))).mul(295.51)), v = (M) => Se(Ae(M.dot(E(63.7, 157.3))).mul(24634.6345)), y = (M, I, f) => {
    const D = ne(f.sub(we(M.sub(I))), b(0)).div(ne(f, b(1e-4)));
    return ve(M, I).sub(D.mul(D).mul(f).mul(0.25));
  }, k = (M) => {
    const I = x.mul(c).add(S(M).mul(Zi)), f = E(Ae(I), Ve(I)).mul(0.5).add(0.5);
    return $(E(0.5, 0.5), $(w(M), f, b(0.5)), u);
  }, A = (M) => {
    const I = v(M);
    return I.mul(I).mul(I).mul(m);
  }, T = a ? (M) => {
    const I = E(M.x.mul(g), M.y).mul(i), f = Ue(I), D = Se(I);
    let L = b(100), B = b(0), z = E(0, 0), V = b(0);
    const Y = [];
    for (let j = -2; j <= 2; j++)
      for (let X = -2; X <= 2; X++) {
        const N = E(b(X), b(j)), G = f.add(N), W = N.add(k(G)).sub(D), J = A(G), Q = W.dot(W).sub(J);
        Y.push({ r: W, w: J });
        const se = Q.lessThan(L);
        B = Ht(se, S(G), B), z = Ht(se, W, z), V = Ht(se, J, V), L = ve(L, Q);
      }
    let U;
    if (o === "distance")
      U = n.sample(fe(ne(L, b(0)).sqrt(), 0, 1));
    else if (o === "edges") {
      const j = h.mul(b(1).add(V.sqrt()));
      let X = b(10);
      for (const { r: G, w: W } of Y) {
        const J = Pe(G.sub(z)), Q = G.dot(G).sub(z.dot(z)).sub(W).add(V).div(ne(J, b(1e-5)).mul(2));
        X = y(X, Ht(J.lessThan(1e-5), b(10), Q), j);
      }
      const N = Me(b(0), d, X.mul(2));
      U = $(l, n.sample(B), N);
    } else
      U = n.sample(B);
    return ie(U, b(1));
  } : (M) => {
    const I = E(M.x.mul(g), M.y).mul(i), f = Ue(I), D = Se(I);
    let L = b(10), B = b(10), z = b(0);
    for (let Y = -1; Y <= 1; Y++)
      for (let U = -1; U <= 1; U++) {
        const j = E(b(U), b(Y)), X = f.add(j), N = S(X), G = N.mul(Zi), W = x.mul(c).add(G), J = E(Ae(W), Ve(W)).mul(0.5).add(0.5), Q = w(X), se = $(E(0.5, 0.5), $(Q, J, b(0.5)), u), K = j.add(se).sub(D), le = Pe(K), ce = le.lessThan(L);
        z = Ht(ce, N, z), B = ve(B, ne(L, le)), L = ve(L, le);
      }
    let V;
    if (o === "distance")
      V = n.sample(fe(L, 0, 1));
    else if (o === "edges") {
      const Y = n.sample(z), U = Me(b(0), d, B.sub(L));
      V = $(l, Y, U);
    } else
      V = n.sample(z);
    return ie(V, b(1));
  }, C = (M) => {
    n.update(M.gradient), l.value.set(M.edgeColor), i.value = M.scale, u.value = M.jitter / 100, d.value = M.edgeWidth / 100 * 0.5, c.value = M.speed / 100 * 2.5, h.value = Ki(M.roundness), m.value = Qi(M.variety);
  }, P = new p.Vector2();
  return { layerFn: T, updateUniforms: C, renderPass: (M) => {
    x.value = Ce(), M.getDrawingBufferSize(P), g.value = P.x / Math.max(1, P.y);
  } };
}
const Gg = {
  meta: {
    id: "voronoi",
    name: "Voronoi",
    description: "Animated cellular pattern — flat cells, stained-glass edges or a distance ramp",
    keywords: ["cells", "cellular", "worley", "shatter", "crack", "fracture", "mosaic", "stained glass", "web"],
    group: "generative"
  },
  kind: "generator",
  idleAtZero: ["roundness", "variety"],
  paramSchema: _g,
  defaultParams: Xg,
  buildLayer: Wg
}, Yg = (e) => e.pattern !== "checker" && e.pattern !== "cubes", Eu = {
  pattern: {
    type: "dropdown",
    label: "Pattern",
    options: [
      { label: "Truchet", value: "truchet" },
      { label: "Hex", value: "hex" },
      { label: "Checker", value: "checker" },
      { label: "Cubes", value: "cubes" },
      { label: "Weave", value: "weave" },
      { label: "Chevron", value: "chevron" },
      { label: "Brick", value: "brick" }
    ],
    default: "truchet",
    // Not structural: every tiling is compiled in and picked by a uniform, so
    // the menu previews on hover and switching never recompiles.
    description: "Which tiling to draw. Truchet: quarter-circle tiles, each turned at random, that join into a maze of curves. Hex: a honeycomb. Checker: alternating squares. Cubes: the isometric tumbling-blocks illusion, three tones per cube. Weave: threads going over and under. Chevron: zigzag lines. Brick: offset rows with mortar between."
  },
  ink: {
    type: "color",
    label: "Ink",
    default: "#e4ff1a",
    description: "The pattern colour — lines, the top of each cube, the across threads."
  },
  ground: {
    type: "color",
    label: "Ground",
    default: "#0a0a0a",
    description: "The colour behind the pattern — the gaps, the shaded cube sides, the down threads."
  },
  // Cells, not a multiplier: how many fit the frame's height.
  scale: {
    type: "slider",
    label: "Scale",
    min: 2,
    max: 40,
    step: 1,
    default: 8,
    description: "How many cells fit top to bottom. Fewer is bolder, more is finer. Cells stay square on every canvas ratio."
  },
  width: {
    type: "slider",
    label: "Width",
    min: 1,
    max: 100,
    step: 1,
    default: 25,
    showIf: Yg,
    description: "How thick the lines are, as a share of a cell. For Weave it is how wide the threads are, so higher closes the gaps between them."
  },
  rotate: {
    type: "slider",
    label: "Rotate",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    group: "Position",
    description: "Turns the whole pattern, in degrees."
  },
  // Whole repeats of the pattern per loop — its own period, so the wrap lands on
  // the identical frame. Signed for direction.
  scrollX: {
    type: "slider",
    label: "Scroll X",
    min: -8,
    max: 8,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How many times the pattern slides one full repeat sideways over the loop. Whole numbers only, which is what keeps it seamless. Negative runs the other way. It moves along the pattern's own axis, so it follows Rotate."
  },
  scrollY: {
    type: "slider",
    label: "Scroll Y",
    min: -8,
    max: 8,
    step: 1,
    default: 0,
    description: "How many times the pattern slides one full repeat up or down over the loop. Whole numbers only, which is what keeps it seamless."
  }
}, Ug = Object.fromEntries(
  Object.entries(Eu).map(([e, t]) => [e, t.default])
), Bo = Math.sqrt(3), Tn = 12;
function Ji(e) {
  switch (e) {
    case "truchet":
      return [Tn, Tn];
    case "hex":
    case "cubes":
      return [1, Bo];
    case "checker":
    case "weave":
      return [2, 2];
    case "brick":
      return [2, 2];
    case "chevron":
      return [1, 1];
    default:
      return [1, 1];
  }
}
const Vs = (e, t) => e.sub(b(t).mul(Ue(e.div(t)))), jg = (e) => (t) => fe(b(0.5).sub(t.div(e)), 0, 1), $g = ["truchet", "hex", "checker", "cubes", "weave", "chevron", "brick"], el = (e) => Math.max(0, $g.indexOf(e ?? "truchet"));
function Ng(e, t) {
  const s = r(el(e.pattern)), o = r(new p.Color(e.ink)), a = r(new p.Color(e.ground)), n = r(e.scale), l = r(e.width / 100 * 0.25), i = r(1), u = r(1), d = r(0), c = r(new p.Vector2(0, 0)), h = (A) => {
    const O = E(A.x.sub(0.5).mul(i), A.y.sub(0.5)), T = E(O.x.mul(u).sub(O.y.mul(d)), O.x.mul(d).add(O.y.mul(u))).mul(n).add(c), C = jg(ne(ne(xs(T.x), xs(T.y)), 1e-5)), P = (Te) => $(a, o, Te), F = Vs(Ue(T), Tn), M = St(Be(F.x), Be(F.y), Be(b(11))).greaterThan(0.5), I = Se(T).sub(0.5), f = E(M.select(I.x.negate(), I.x), I.y), D = P(C(ve(
      we(Pe(f.sub(0.5)).sub(0.5)),
      we(Pe(f.add(0.5)).sub(0.5))
    ).sub(l))), L = Se(T.mul(0.5)).sub(0.5), B = P(C(L.x.mul(L.y).negate().mul(4))), z = Ue(T.y), V = Se(T.x.add(Vs(z, 2).mul(0.5)).div(2)).mul(2), Y = Se(T.y), U = P(C(ve(ve(V, b(2).sub(V)), ve(Y, b(1).sub(Y))).sub(l))), j = Se(T.y.add(we(Se(T.x).sub(0.5)))), X = P(C(ve(j, b(1).sub(j)).mul(0.7071).sub(l))), N = Ue(T), G = Vs(N.x.add(N.y), 2).lessThan(0.5), W = Se(T).sub(0.5), J = b(0.25).add(l.mul(4 * 0.23)), Q = C(we(W.y).sub(J)), se = C(we(W.x).sub(J)), K = b(1).sub(W.y.div(J).mul(W.y.div(J)).mul(0.35)).sub(we(W.x).mul(G.select(0, 0.6))), le = b(1).sub(W.x.div(J).mul(W.x.div(J)).mul(0.35)).sub(we(W.y).mul(G.select(0.6, 0))), ce = $(te(0, 0, 0), o, K), oe = $(te(0, 0, 0), $(a, o, 0.38), le), de = G.select(b(1), b(0)), me = $($(a, $(ce, oe, de), $(Q, se, de)), $(oe, ce, de), $(se, Q, de)), xe = E(1, Bo), ge = E(Vs(T.x, 1), Vs(T.y, Bo)).sub(xe.mul(0.5)), We = T.sub(xe.mul(0.5)), Ge = E(Vs(We.x, 1), Vs(We.y, Bo)).sub(xe.mul(0.5)), _e = Re(ge, ge).lessThan(Re(Ge, Ge)).select(ge, Ge), Ye = we(_e), _ = ne(Re(Ye, E(0.5, Bo / 2)), Ye.x), H = P(C(we(b(0.5).sub(_)).sub(l))), q = (Te) => E(-Math.sin(Te * Math.PI / 180), Math.cos(Te * Math.PI / 180)), ee = Re(_e, q(30)), Z = Re(_e, q(150)), ae = Re(_e, q(270)), re = C(ee.negate()).mul(C(Z)), be = C(ae.negate()).mul(C(ee)), ye = fe(b(1).sub(re).sub(be), 0, 1), ke = $(te(0, 0, 0), o, re).add($(te(0, 0, 0), $(o, a, 0.55), ye)).add($(te(0, 0, 0), a, be)), Fe = (Te) => pe(b(Te - 0.5), s).mul(pe(s, b(Te + 0.5))), Le = [D, H, B, ke, me, X, U];
    let Oe = $(te(0, 0, 0), Le[0], Fe(0));
    for (let Te = 1; Te < Le.length; Te++) Oe = Oe.add($(te(0, 0, 0), Le[Te], Fe(Te)));
    return ie(Oe, b(1));
  };
  let m = e.rotate * Math.PI / 180, x = Math.round(e.scrollX), g = Math.round(e.scrollY), [w, S] = Ji(e.pattern ?? "truchet");
  const v = (A) => {
    s.value = el(A.pattern), [w, S] = Ji(A.pattern ?? "truchet"), o.value.set(A.ink), a.value.set(A.ground), n.value = A.scale, l.value = A.width / 100 * 0.25, m = A.rotate * Math.PI / 180, x = Math.round(A.scrollX), g = Math.round(A.scrollY);
  }, y = new p.Vector2();
  return { layerFn: h, updateUniforms: v, renderPass: (A) => {
    A.getDrawingBufferSize(y), i.value = y.x / Math.max(1, y.y), u.value = Math.cos(-m), d.value = Math.sin(-m);
    const O = Qe().duration > 0 ? Ne() : 0;
    c.value.set(-x * w * O, -g * S * O);
  } };
}
const qg = {
  meta: {
    id: "pattern",
    name: "Pattern",
    description: "Geometric tilings — Truchet curves, honeycomb, checker, isometric cubes, weave, chevron, brick",
    keywords: [
      "pattern",
      "tiling",
      "tile",
      "geometric",
      "truchet",
      "maze",
      "hex",
      "hexagon",
      "honeycomb",
      "checker",
      "checkerboard",
      "isometric",
      "cubes",
      "tumbling blocks",
      "weave",
      "woven",
      "chevron",
      "zigzag",
      "brick",
      "wallpaper",
      "bauhaus",
      "op art",
      "grid"
    ],
    group: "generative"
  },
  kind: "generator",
  paramSchema: Eu,
  defaultParams: Ug,
  buildLayer: Ng
}, nn = 192;
function rn(e, t, s) {
  const o = new p.RenderTarget(e, t, {
    type: p.HalfFloatType,
    minFilter: s,
    magFilter: s,
    depthBuffer: !1,
    stencilBuffer: !1,
    generateMipmaps: !1
  });
  return o.texture.wrapS = p.ClampToEdgeWrapping, o.texture.wrapT = p.ClampToEdgeWrapping, o;
}
function tl(e) {
  const t = e < 1 ? 1 / e : e, s = Math.round(nn * t);
  return e > 1 ? { w: s, h: nn } : { w: nn, h: s };
}
function Zg() {
  let e = 1, t = tl(e);
  const s = [rn(t.w, t.h, p.NearestFilter), rn(t.w, t.h, p.NearestFilter)];
  let o = 0;
  const a = rn(t.w, t.h, p.LinearFilter), n = r(new p.Vector2(1 / t.w, 1 / t.h)), l = r(0.0545), i = r(0.062), u = r(new p.Vector2(0.5, 0.5)), d = r(0.02), c = r(1), h = s.map((M) => nt(M.texture)), m = () => E(vs().x, vs().y.oneMinus()), x = [], g = (M) => {
    const I = new p.MeshBasicNodeMaterial();
    return I.fragmentNode = M, I.depthTest = !1, I.depthWrite = !1, I.blending = p.NoBlending, x.push(I), I;
  }, w = [0, 1].map((M) => g(st(() => {
    const I = m(), f = (j, X) => h[M].sample(I.add(E(n.x.mul(j), n.y.mul(X)))).xy, D = f(0, 0), L = f(-1, 0).add(f(1, 0)).add(f(0, -1)).add(f(0, 1)).mul(0.2).add(f(-1, -1).add(f(1, -1)).add(f(-1, 1)).add(f(1, 1)).mul(0.05)).sub(D), B = D.x, z = D.y, V = B.mul(z).mul(z), Y = B.add(L.x.mul(1)).sub(V).add(l.mul(b(1).sub(B))), U = z.add(L.y.mul(0.5)).add(V).sub(i.add(l).mul(z));
    return ie(fe(Y, 0, 1), fe(U, 0, 1), 0, 1);
  })())), S = [0, 1].map((M) => g(st(() => {
    const I = m(), f = h[M].sample(I).xy, D = Pe(E(I.x.sub(u.x).mul(c), I.y.sub(u.y))), L = b(1).sub(Me(d.mul(0.6), d, D)), B = Ue(I.div(n)), z = Se(Ae(Re(B, E(12.9898, 78.233))).mul(43758.5453));
    return ie(f.x.sub(L.mul(f.x.sub(0.5))), ne(f.y, L.mul(b(0.25).add(z.mul(0.35)))), 0, 1);
  })())), v = g(ie(1, 0, 0, 1)), y = [0, 1].map((M) => g(st(() => h[M].sample(m()))())), k = new p.Scene(), A = new p.OrthographicCamera(-1, 1, 1, -1, 0, 1), O = new p.PlaneGeometry(2, 2), R = new p.Mesh(O, v);
  R.frustumCulled = !1, k.add(R);
  const T = (M, I, f) => {
    R.material = I, M.setRenderTarget(f), M.render(k, A);
  };
  let C = !0;
  return {
    texture: () => a.texture,
    step: (M, I, f, D, L) => {
      const B = M.getRenderTarget(), z = M.autoClear;
      M.autoClear = !1, l.value = f, i.value = D, c.value = t.w / t.h, C && (T(M, v, s[0]), T(M, v, s[1]), o = 0, C = !1);
      for (const V of L)
        u.value.set(V.x, V.y), d.value = V.r, T(M, S[o], s[1 - o]), o = 1 - o;
      for (let V = 0; V < I; V++)
        T(M, w[o], s[1 - o]), o = 1 - o;
      T(M, y[o], a), M.autoClear = z, M.setRenderTarget(B);
    },
    reset: () => {
      C = !0;
    },
    resize: (M) => {
      if (!(M > 0) || Math.abs(M - e) < 1e-4) return;
      e = M;
      const I = tl(M);
      if (!(I.w === t.w && I.h === t.h)) {
        t = I;
        for (const f of [...s, a]) f.setSize(t.w, t.h);
        n.value.set(1 / t.w, 1 / t.h), C = !0;
      }
    },
    dispose: () => {
      for (const M of [...s, a]) M.dispose();
      O.dispose();
      for (const M of x) M.dispose();
    }
  };
}
const Fu = {
  // Live, not structural: each pattern is a pair of rates fed to the same
  // solver, so switching morphs what is already growing — and hovering the menu
  // previews it.
  pattern: {
    type: "dropdown",
    label: "Pattern",
    options: [
      { label: "Coral", value: "coral" },
      { label: "Maze", value: "maze" },
      { label: "Spots", value: "spots" },
      { label: "Worms", value: "worms" },
      { label: "Mitosis", value: "mitosis" }
    ],
    default: "coral",
    description: "What grows. Coral branches outward; Maze fills the frame with winding corridors; Spots buds into dots; Worms crawls in short strands; Mitosis splits cells that keep dividing. Switching mid-growth morphs what is already there."
  },
  ink: {
    type: "color",
    label: "Ink",
    default: "#e4ff1a",
    description: "The colour of the growth."
  },
  ground: {
    type: "color",
    label: "Ground",
    default: "#0a0a0a",
    description: "The colour it grows across."
  },
  // An authored rate in iterations per second, used as is. The key stays
  // `growth` — saved scenes store it — but the label is Speed, which is what the
  // same control is called everywhere else and avoids "Growth" inside "Grow".
  growth: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    group: "Animation",
    description: "How fast the pattern grows and moves. 0 freezes it where it is. This is a living simulation, so it cannot loop seamlessly — the last frame of an export does not meet the first."
  },
  drops: {
    type: "slider",
    label: "Drops",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    description: "How often a new seed drops somewhere in the frame and starts another colony, so the pattern keeps changing. 0 lets it settle; the cursor can still seed it."
  },
  brush: {
    type: "slider",
    label: "Brush",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    group: "Cursor",
    description: "How big a seed the cursor leaves as it moves across the canvas, so you can draw where the pattern grows. 0 ignores the cursor."
  }
}, Kg = Object.fromEntries(
  Object.entries(Fu).map(([e, t]) => [e, t.default])
), sl = {
  coral: [0.0545, 0.062],
  maze: [0.029, 0.057],
  spots: [0.03, 0.062],
  // 0.065 kill wiped every colony out
  worms: [0.078, 0.061],
  mitosis: [0.0367, 0.0649]
}, Qg = 1440, Jg = 24, e1 = 2, ol = (e) => {
  const t = Math.sin(e * 127.1 + 311.7) * 43758.5453;
  return t - Math.floor(t);
};
function t1(e, t) {
  const s = Zg(), o = nt(s.texture()), a = r(new p.Color(e.ink)), n = r(new p.Color(e.ground)), l = (S) => {
    const v = o.sample(E(S.x, S.y.oneMinus())).y, y = ne(xs(v), 1e-4), k = Me(b(0.2).sub(y), b(0.2).add(y), v);
    return ie($(n, a, k), b(1));
  };
  let i = e, u = 0, d = -1, c = 0, h = 0, m = 0, x = !1;
  return { layerFn: l, updateUniforms: (S) => {
    i = S, a.value.set(S.ink), n.value.set(S.ground);
  }, renderPass: (S, v) => {
    const y = v.width / Math.max(1, v.height);
    s.resize(y);
    const k = y > 1 ? 1 : y, A = Jt(), O = [];
    if (A > 0) {
      c += A, d < 0 && (O.push({ x: 0.5, y: 0.5, r: 0.04 * k }), d = 0);
      const P = e1 * (i.drops / 100);
      if (P > 0) {
        const I = Math.floor(c * P);
        for (let f = Math.max(d + 1, I - 3); f <= I; f++)
          O.push({ x: 0.1 + 0.8 * ol(f), y: 0.1 + 0.8 * ol(f + 0.5), r: 0.02 * k });
        d = I;
      }
      const F = i.brush / 100, M = ns();
      if (F > 0 && M.active) {
        const I = M.x * 0.5 + 0.5, f = 1 - (M.y * 0.5 + 0.5);
        x && (I !== h || f !== m) && O.push({ x: I, y: f, r: (8e-3 + F * 0.03) * k }), h = I, m = f;
      }
      x = M.active;
    }
    u += A * Qg * (i.growth / 100);
    const R = Math.min(Jg, Math.floor(u));
    u = Math.min(u - R, 1);
    const [T, C] = sl[i.pattern ?? "coral"] ?? sl.coral;
    (R > 0 || O.length) && s.step(S, R, T, C, O);
  }, dispose: s.dispose };
}
const s1 = {
  meta: {
    // The id stays `reaction` — saved scenes store it. The name is what a
    // designer would look for; the technical term lives on in the keywords.
    id: "reaction",
    name: "Grow",
    description: "Grows coral, mazes, spots and dividing cells from a few seeds — a living chemical pattern",
    keywords: [
      "reaction diffusion",
      "gray scott",
      "turing",
      "grow",
      "coral",
      "maze",
      "labyrinth",
      "spots",
      "organic",
      "growth",
      "cells",
      "mitosis",
      "biology",
      "animal print",
      "simulation",
      "generative"
    ],
    group: "generative"
  },
  kind: "generator",
  usesPointer: (e) => e.brush > 0,
  paramSchema: Fu,
  defaultParams: Kg,
  buildLayer: t1
}, Lu = {
  gradient: {
    type: "gradient",
    ramp: !0,
    label: "Color",
    default: Pt(jt),
    description: "The colour ramp across the blob field. The ramp is read by field strength, so the stop at 0 is the empty background and the stop at 100 is the dense centre of a blob."
  },
  count: {
    type: "slider",
    label: "Blobs",
    min: 2,
    max: 8,
    step: 1,
    default: 5,
    description: "How many blobs drift in the field."
  },
  size: {
    type: "slider",
    label: "Size",
    min: 10,
    max: 100,
    step: 1,
    default: 45,
    description: "How big each blob is."
  },
  gooeyness: {
    type: "slider",
    label: "Gooeyness",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How eagerly blobs merge as they approach. Low keeps them as separate circles that pass over each other; high makes them stretch toward one another and fuse with a liquid neck — the lava-lamp behaviour the effect exists for."
  },
  edge: {
    type: "slider",
    label: "Edge softness",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    description: "How soft the boundary of the field is. 0 gives a hard-edged silhouette, high a diffuse glow with no clear edge."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    group: "Animation",
    description: "How fast the blobs drift. 0 holds them still."
  }
}, o1 = Object.fromEntries(
  Object.entries(Lu).map(([e, t]) => [e, t.default])
), a1 = 8, n1 = Array.from({ length: a1 }, (e, t) => ({
  ax: 0.3 + 0.06 * (t * 7 % 5),
  ay: 0.26 + 0.05 * (t * 3 % 5),
  hx: 1 + t % 3,
  hy: 1 + (t + 1) % 3,
  ph: t * 2.399963
  // golden-angle phase spread
}));
function r1(e, t) {
  const s = Ms(e.gradient), o = r(e.count), a = r(e.size / 100 * 0.22), n = r(1 + (1 - e.gooeyness / 100) * 3), l = r(Math.max(0.01, e.edge / 100 * 0.8)), i = r(e.speed / 100 * 1), u = r(0), d = r(1), c = (g) => {
    const w = E(g.x.mul(d), g.y), S = a.mul(a);
    let v = b(0);
    n1.forEach((O, R) => {
      const T = u.mul(i), C = Ae(T.mul(O.hx).add(O.ph)).mul(O.ax).add(0.5).mul(d), P = Ve(T.mul(O.hy).add(O.ph)).mul(O.ay).add(0.5), F = w.sub(E(C, P)), M = ne(F.dot(F), b(4e-4)), I = fe(o.sub(R), 0, 1);
      v = v.add(S.div(M).mul(I));
    });
    const y = Me(n.sub(l), n.add(l), v), k = fe(v.div(n.mul(2)), 0, 1), A = s.sample(k);
    return ie(A, y);
  }, h = (g) => {
    s.update(g.gradient), o.value = g.count, a.value = g.size / 100 * 0.22, n.value = 1 + (1 - g.gooeyness / 100) * 3, l.value = Math.max(0.01, g.edge / 100 * 0.8), i.value = g.speed / 100 * 1;
  }, m = new p.Vector2();
  return { layerFn: c, updateUniforms: h, renderPass: (g) => {
    u.value = Ce(), g.getDrawingBufferSize(m), d.value = m.x / Math.max(1, m.y);
  } };
}
const i1 = {
  meta: {
    id: "metaballs",
    name: "Metaballs",
    description: "Organic blobs that merge like liquid mercury, coloured by a gradient",
    keywords: ["blobs", "liquid", "mercury", "goo", "merge", "organic", "lava", "bubbles", "droplets"],
    group: "generative"
  },
  kind: "generator",
  paramSchema: Lu,
  defaultParams: o1,
  buildLayer: r1
}, Ru = {
  // Positive = fisheye bulge (centre magnified); negative = pincushion.
  amount: {
    type: "slider",
    label: "Distortion",
    min: -100,
    max: 100,
    step: 1,
    default: 45,
    description: "How much the lens bends the image. Signed: positive bulges the centre outward like a fisheye, negative pinches it inward into pincushion. 0 is flat."
  },
  chromatic: {
    type: "slider",
    label: "Fringing",
    min: 0,
    max: 100,
    step: 1,
    default: 15,
    description: "How far the colour channels separate toward the edges, the way real glass fringes. Small values read as a lens, large ones as a prism."
  },
  zoom: {
    type: "slider",
    label: "Zoom",
    min: 50,
    max: 150,
    step: 1,
    default: 100,
    description: "Scales the image inside the frame, as a percentage. Above 100 crops into it, which is the usual way to hide the corners that a strong bulge pulls away from the edge."
  },
  ...bt
}, l1 = Object.fromEntries(
  Object.entries(Ru).map(([e, t]) => [e, t.default])
);
function c1(e, t) {
  const s = r(e.amount / 100 * 0.6), o = r(e.chromatic / 100 * 0.15), a = r(e.zoom / 100), n = r(1), l = Lt(e), i = (x) => {
    const g = E(
      x.x.sub(0.5).sub(l.offset.x).mul(n),
      x.y.sub(0.5).sub(l.offset.y)
    ).div(a), w = g.dot(g);
    return { warp: s.mul(w), back: (y) => {
      const k = g.mul(y);
      return E(
        k.x.div(n).add(0.5).add(l.offset.x),
        k.y.add(0.5).add(l.offset.y)
      );
    } };
  }, u = Ke((x) => {
    const { warp: g, back: w } = i(x);
    return w(b(1).sub(g));
  }), d = (x) => {
    const { warp: g, back: w } = i(x), S = b(1).sub(g.mul(b(1).add(o))), v = b(1).sub(g.mul(b(1).sub(o))), y = t(u(x)), k = t(w(S)).r, A = t(w(v)).b;
    return ie(k, y.g, A, y.a);
  }, c = (x) => {
    s.value = x.amount / 100 * 0.6, o.value = x.chromatic / 100 * 0.15, a.value = x.zoom / 100, l.update(x);
  }, h = new p.Vector2();
  return { layerFn: d, updateUniforms: c, renderPass: (x) => {
    x.getDrawingBufferSize(h), n.value = h.x / Math.max(1, h.y), l.renderPass();
  }, warpUv: u };
}
const u1 = {
  meta: {
    id: "lensDistort",
    name: "Lens Distort",
    description: "Fisheye / pincushion lens warp with zoom and chromatic fringing",
    keywords: ["fisheye", "pincushion", "barrel", "bulge", "warp", "zoom", "wide angle", "chromatic", "bend", "curve"],
    group: "distort"
  },
  kind: "processor",
  // per-channel chromatic offsets — see `resampling` in types/effects.ts.
  resampling: !0,
  // Warped UV — the silhouette distorts with the fill.
  transformsSilhouette: !0,
  paramSchema: Ru,
  defaultParams: l1,
  buildLayer: c1
}, Du = {
  // Positive swells the centre outward (magnifying glass); negative squeezes it in.
  amount: {
    type: "slider",
    label: "Amount",
    min: -100,
    max: 100,
    step: 1,
    default: 55,
    description: "How hard the lens pushes. Signed: positive swells the centre outward like a magnifying glass, negative squeezes it inward. 0 is flat."
  },
  // How far the glass reaches, as a share of the frame's half-height.
  radius: {
    type: "slider",
    label: "Radius",
    min: 1,
    max: 100,
    step: 1,
    default: 45,
    description: "How far the lens reaches, as a share of the frame's half-height."
  },
  // The rim: 0 is a hard-edged lens dropped on the image, 100 a soft dome that
  // fades out long before it gets there.
  falloff: {
    type: "slider",
    label: "Falloff",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How soft the rim is. 0 is a hard-edged lens dropped on the image, with a visible circular boundary; 100 is a soft dome that fades out long before it gets there."
  },
  // Same key, label and scale as Lens Distort — one vocabulary for glass.
  chromatic: {
    type: "slider",
    label: "Fringing",
    min: 0,
    max: 100,
    step: 1,
    default: 12,
    description: "How far the colour channels separate toward the rim, the way real glass fringes. Same control as Lens Distort."
  },
  // posX/posY is the shared position convention: it also earns the Align control.
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the lens sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the lens vertically, as a percentage of the frame. 0 is centred."
  },
  // Breathing, on the shared clock: how far the swell is released each breath.
  pulse: {
    type: "slider",
    label: "Pulse",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How much of the swell is released and regained each breath. 0 holds the lens steady; raising it makes the bulge breathe."
  },
  // Breaths per loop — whole numbers only, which is what keeps the pulse
  // seam-free: half a breath over the loop would jump at the wrap. 1 is the
  // original single swell, so scenes saved before this slider existed are
  // unchanged; 60 is a flutter (ten a second on the default six-second loop),
  // which is as fast as the swell still reads as a swell.
  speed: {
    type: "slider",
    label: "Speed",
    min: 1,
    max: 60,
    step: 1,
    default: 1,
    description: "How many breaths fit in the loop. Whole numbers only, which is what keeps the pulse seamless — half a breath across the loop would jump at the wrap. 1 is a single slow swell; 60 is a flutter, about as fast as a swell still reads as a swell."
  },
  ...bt
}, d1 = Object.fromEntries(
  Object.entries(Du).map(([e, t]) => [e, t.default])
), h1 = 0.85, m1 = 1.1, al = 0.08, nl = (e) => e.amount / 100 * h1, Cn = (e) => Math.max(0.02, e.radius / 100 * m1), rl = (e) => al + e.falloff / 100 * (1 - al);
function p1(e, t) {
  const s = r(nl(e)), o = r(Cn(e)), a = r(rl(e)), n = r(e.chromatic / 100 * 0.15), l = r(new p.Vector2(
    e.posX / 100 * 0.5,
    e.posY / 100 * 0.5
  )), i = r(1), u = r(1), d = Lt(e), c = (y) => {
    const k = l.x.add(d.offset.x), A = l.y.add(d.offset.y), O = E(y.x.sub(0.5).sub(k).mul(i), y.y.sub(0.5).sub(A)), R = Pe(O).div(o), T = fe(b(1).sub(R).div(a), 0, 1);
    return { w: T.mul(T).mul(b(3).sub(T.mul(2))).mul(s).mul(u), back: (M) => {
      const I = O.mul(b(1).sub(M));
      return E(I.x.div(i).add(0.5).add(k), I.y.add(0.5).add(A));
    } };
  }, h = Ke((y) => {
    const { w: k, back: A } = c(y);
    return A(k);
  }), m = (y) => {
    const { w: k, back: A } = c(y), O = t(h(y)), R = t(A(k.mul(b(1).add(n)))).r, T = t(A(k.mul(b(1).sub(n)))).b;
    return ie(R, O.g, T, O.a);
  };
  let x = e.pulse / 100, g = Math.max(1, Math.round(e.speed));
  const w = (y) => {
    s.value = nl(y), o.value = Cn(y), a.value = rl(y), n.value = y.chromatic / 100 * 0.15, l.value.set(y.posX / 100 * 0.5, y.posY / 100 * 0.5), x = y.pulse / 100, g = Math.max(1, Math.round(y.speed)), d.update(y);
  }, S = new p.Vector2();
  return { layerFn: m, updateUniforms: w, renderPass: (y) => {
    y.getDrawingBufferSize(S), i.value = S.x / Math.max(1, S.y);
    const k = Qe().duration > 0 ? Ne() : 0;
    u.value = 1 - x * (1 - Math.cos(k * g * Math.PI * 2)) / 2, d.renderPass();
  }, warpUv: h };
}
const f1 = {
  meta: {
    id: "bulge",
    name: "Bulge",
    description: "Swells the layers below outward from a point, or squeezes them in",
    keywords: ["pinch", "punch", "spherize", "magnify", "loupe", "lens", "glass", "swell", "squeeze", "dent", "warp", "distort", "fisheye"],
    group: "distort"
  },
  kind: "processor",
  // A field: the lens is a disc around Position, so the canvas frames it and
  // Radius gets a handle. `radiusOf` is the shader's own conversion, which is
  // what makes the dashed circle land exactly on the edge of the dome.
  radialExtent: { key: "radius", min: 1, max: 100, reach: (e) => Cn(e) },
  // Three taps for the per-channel fringing — see `resampling` in types/effects.ts.
  resampling: !0,
  // Warped UV — the silhouette swells with the fill.
  transformsSilhouette: !0,
  paramSchema: Du,
  defaultParams: d1,
  buildLayer: p1
}, Hu = {
  // Signed: which way it turns is half of what you want from a twirl.
  amount: {
    type: "slider",
    label: "Amount",
    min: -100,
    max: 100,
    step: 1,
    default: 50,
    description: "How hard the layers below are turned at the centre. Signed: positive twists one way, negative the other. 100 turns the very middle twice round; the turn fades to nothing at the rim. 0 is flat."
  },
  // A circular reach from the centre, so "Radius" (see EFFECTS.md, which word).
  radius: {
    type: "slider",
    label: "Radius",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    description: "How far the twist reaches, as a share of the frame's half-height."
  },
  // Bulge's rim, same key, label and scale — one vocabulary for a field's edge.
  falloff: {
    type: "slider",
    label: "Falloff",
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    description: "How soft the rim is. 0 turns the middle as one piece with a hard twisted band at the edge, a tight vortex; 100 spreads the turn smoothly from the centre to the rim, a broad swirl."
  },
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the centre of the twist sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the centre of the twist vertically, as a percentage of the frame. 0 is centred."
  },
  // Bulge's pair: how much of the twist is let go each breath, and how many
  // breaths fit in the loop. Whole breaths only, which is what keeps it
  // seamless. A steady spin is deliberately absent — see index.ts.
  pulse: {
    type: "slider",
    label: "Pulse",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How much of the twist unwinds and winds back up each breath. 0 holds it steady; 100 lets it go all the way flat between breaths, like water draining and settling."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 1,
    max: 60,
    step: 1,
    default: 1,
    description: "How many breaths fit in the loop. Whole numbers only, which is what keeps the pulse seamless. 1 is one slow wind and release; 60 is a shiver."
  },
  ...bt,
  // Continues the Interactivity section. Follow moves the vortex; this lets the
  // hand drive its strength.
  stir: {
    type: "slider",
    label: "Stir",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How much moving the cursor winds the twist up. The faster the hand, the harder it turns, and it relaxes back once the cursor stops. 100 adds up to two more turns at the centre, in the direction Amount turns. 0 ignores the cursor."
  }
}, g1 = Object.fromEntries(
  Object.entries(Hu).map(([e, t]) => [e, t.default])
), Ou = Math.PI * 4, b1 = 1.1, il = (e) => e.amount / 100 * Ou, In = (e) => Math.max(0.02, e.radius / 100 * b1), ll = 0.08, cl = (e) => ll + e.falloff / 100 * (1 - ll), y1 = 2, w1 = 4, v1 = 0.12, x1 = 0.8, ul = (e) => b(1).sub(we(Se(e.mul(0.5)).mul(2).sub(1)));
function M1(e, t) {
  const s = r(il(e)), o = r(In(e)), a = r(new p.Vector2(
    e.posX / 100 * 0.5,
    e.posY / 100 * 0.5
  )), n = r(1), l = r(cl(e)), i = r(0), u = r(1), d = Lt(e), c = Ke((T) => {
    const C = a.x.add(d.offset.x), P = a.y.add(d.offset.y), F = E(T.x.sub(0.5).sub(C).mul(n), T.y.sub(0.5).sub(P)), M = fe(b(1).sub(Pe(F).div(o)).div(l), 0, 1), I = M.mul(M).mul(b(3).sub(M.mul(2))).mul(s.mul(u).add(i)), f = Ve(I), D = Ae(I), L = E(F.x.mul(f).sub(F.y.mul(D)), F.x.mul(D).add(F.y.mul(f)));
    return E(
      ul(L.x.div(n).add(0.5).add(C)),
      ul(L.y.add(0.5).add(P))
    );
  }), h = (T) => t(c(T));
  let m = e.pulse / 100, x = Math.max(1, Math.round(e.speed)), g = e.stir / 100, w = e.amount < 0 ? -1 : 1;
  const S = (T) => {
    s.value = il(T), o.value = In(T), l.value = cl(T), a.value.set(T.posX / 100 * 0.5, T.posY / 100 * 0.5), m = T.pulse / 100, x = Math.max(1, Math.round(T.speed)), g = T.stir / 100, w = T.amount < 0 ? -1 : 1, d.update(T);
  };
  let v = 0, y = 0, k = 0, A = !1;
  const O = new p.Vector2();
  return { layerFn: h, updateUniforms: S, renderPass: (T) => {
    T.getDrawingBufferSize(O), n.value = O.x / Math.max(1, O.y);
    const C = Qe().duration > 0 ? Ne() : 0;
    u.value = 1 - m * (1 - Math.cos(C * x * Math.PI * 2)) / 2;
    const P = Math.min(Jt(), 0.1);
    if (P > 0) {
      const F = ns();
      let M = 0;
      if (F.active && A) {
        const f = Math.min(w1, Math.hypot(F.x - y, F.y - k) / P);
        M = Math.min(1, f / y1);
      }
      A = F.active, y = F.x, k = F.y;
      const I = M > v ? v1 : x1;
      v += (M - v) * (1 - Math.exp(-P / I));
    }
    i.value = w * g * v * Ou, d.renderPass();
  }, warpUv: c };
}
const k1 = {
  meta: {
    id: "twirl",
    name: "Twirl",
    description: "Twists the layers below into a spiral around a point",
    keywords: ["swirl", "vortex", "whirlpool", "spiral", "twist", "drain", "eddy", "hypnotic", "whirl", "spin", "warp", "distort"],
    group: "distort"
  },
  kind: "processor",
  // Stir reads the cursor itself; Follow is covered by the shared block.
  usesPointer: (e) => e.stir > 0,
  // A field: a centre and a reach, so the canvas gives Radius a dashed circle
  // and a handle. `radiusOf` is the shader's own conversion.
  radialExtent: { key: "radius", min: 1, max: 100, reach: (e) => In(e) },
  // Turned UV — a clip run twists with the fill.
  transformsSilhouette: !0,
  paramSchema: Hu,
  defaultParams: g1,
  buildLayer: M1
}, Bu = {
  // Where the cloth is held. A uniform blend of four distances, not a rebuild,
  // so switching it is as cheap as a slider.
  edge: {
    type: "dropdown",
    label: "Held at",
    options: [
      { label: "Left side", value: "left" },
      { label: "Right side", value: "right" },
      { label: "Top", value: "top" },
      { label: "Nowhere", value: "none" }
    ],
    default: "left",
    group: "Cloth",
    description: "Where the cloth is held still. Left side is a flag on a pole: still at the left, flapping hardest at the right. Top is a banner hung from a rail. Nowhere lets the whole sheet move evenly."
  },
  wind: {
    type: "slider",
    label: "Wind",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "How hard the wind blows — how deep the waves are. 0 hangs the cloth flat and leaves the picture untouched."
  },
  folds: {
    type: "slider",
    label: "Folds",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "How many waves fit across the cloth. Low gives a few broad billows, high a tight ripple like thin silk."
  },
  gusts: {
    type: "slider",
    label: "Gusts",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    description: "How uneven the wind is. 0 rolls clean, regular waves; high bends the crests and swells them in patches, the way a flag snaps in a real gust."
  },
  // Relative to the held edge, not a compass heading: 0 is always straight away
  // from it, so no setting blows the cloth back into its own pole. Key stays
  // `angle` so a saved scene keeps its value.
  angle: {
    type: "slider",
    label: "Direction",
    min: -90,
    max: 90,
    step: 1,
    default: 0,
    description: "Tilts the wind. 0 blows the cloth straight away from where it is held. Held at a side, positive lifts the free end upward and negative lets it droop; held at the top, positive blows it to the right and negative to the left."
  },
  // How the folds catch the light — what makes it read as fabric rather than a
  // ripple.
  shading: {
    type: "slider",
    label: "Shading",
    min: 0,
    max: 100,
    step: 1,
    default: 60,
    group: "Light",
    description: "How strongly the folds are lit and shadowed, with the light from the upper left. This is what makes it read as cloth; 0 is a pure distortion."
  },
  sheen: {
    type: "slider",
    label: "Sheen",
    min: 0,
    max: 100,
    step: 1,
    default: 20,
    description: "A soft highlight along the folds that face the light. 0 is matte cotton, high is satin."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    group: "Animation",
    description: "How fast the waves roll downwind. 0 freezes the cloth mid-flap."
  }
}, S1 = Object.fromEntries(
  Object.entries(Bu).map(([e, t]) => [e, t.default])
), ya = [
  { k: 1, tilt: 0, amp: 1 },
  { k: 1.9, tilt: 0.35, amp: 0.45 },
  { k: 3.3, tilt: -0.5, amp: 0.2 }
], P1 = ya.reduce((e, t) => e + t.amp, 0), dl = (e) => Math.pow(e, 0.75), hl = (e) => Math.PI * 2 * (0.5 + e.folds / 100 * 7.5), ml = (e) => e.speed / 100 * 10, pl = 0.18, ca = 2e-3;
function A1(e, t) {
  const o = (e === "right" ? 180 - t : e === "top" ? -90 + t : t) * Math.PI / 180;
  return [Math.cos(o), Math.sin(o)];
}
const fl = (e) => b(1).sub(we(Se(e.mul(0.5)).mul(2).sub(1)));
function T1(e, t) {
  const s = r(1), o = r(new p.Vector2(1, 0)), a = r(new p.Vector4(1, 0, 0, 0)), n = r(hl(e)), l = r(0), i = r(0), u = r(0), d = r(0), c = r(new p.Vector3()), h = r(new p.Vector3(1, 1, 1)), m = r(0), x = r(0), g = r(0), w = (f) => {
    const D = f.x.mul(o.x).add(f.y.mul(o.y)), L = f.y.mul(o.x).sub(f.x.mul(o.y)), B = n.mul(pl), z = De(te(D.mul(B).sub(m), L.mul(B).mul(1.4), m.mul(0.35))), V = De(te(D.mul(B).sub(x), L.mul(B).mul(1.4), x.mul(0.35))), Y = $(z, V, g).mul(d), U = Y.mul(2.2), j = Y.mul(0.45).add(1), X = [c.x, c.y, c.z], N = [h.x, h.y, h.z];
    let G = b(0);
    ya.forEach((Q, se) => {
      const le = D.mul(Math.cos(Q.tilt)).add(L.mul(Math.sin(Q.tilt))).mul(n.mul(Q.k)).add(U).sub(X[se]);
      G = G.add(Ae(le).mul(N[se]).mul(Q.amp / P1));
    });
    const W = f.x.add(s.mul(0.5)).div(s).mul(a.x).add(s.mul(0.5).sub(f.x).div(s).mul(a.y)).add(b(0.5).sub(f.y).mul(a.z)), J = $(fe(W, 0, 1), b(1), a.w);
    return G.mul(j).mul(J);
  }, S = (f) => E(f.x.sub(0.5).mul(s), f.y.sub(0.5)), v = Ke((f) => w(S(f))), y = Ke((f) => {
    const D = v(f), L = E(
      o.x.mul(0.8).sub(o.y.mul(0.4)),
      o.y.mul(0.8).add(o.x.mul(0.4))
    ).mul(D.mul(l));
    return E(
      fl(f.x.add(L.x.div(s))),
      fl(f.y.add(L.y))
    );
  }), k = new p.Vector3(-0.4, 0.55, 0.73).normalize(), A = te(k.x, k.y, k.z), O = (f) => {
    const D = t(y(f)), L = S(f), B = v(f), z = w(L.add(E(ca, 0))).sub(B).div(ca), V = w(L.add(E(0, ca))).sub(B).div(ca), Y = l.mul(i), U = ws(te(z.mul(Y).negate(), V.mul(Y).negate(), 1)), j = Re(U, A), X = fe(j.div(k.z), 0, 2), N = fe(j.sub(k.z).div(1 - k.z), 0, 1), G = Me(0.15, 0.8, N).mul(u), W = $(D.rgb.mul(X), te(1, 1, 1), G);
    return ie(fe(W, 0, 1), D.a);
  }, R = (f) => {
    const D = f.edge;
    o.value.set(...A1(D, f.angle)), a.value.set(D === "left" ? 1 : 0, D === "right" ? 1 : 0, D === "top" ? 1 : 0, D === "none" ? 1 : 0), n.value = hl(f), l.value = f.wind / 100 * 0.6 / n.value, i.value = f.shading / 100 * 3.5, u.value = f.sheen / 100 * 0.6, d.value = f.gusts / 100;
  };
  R(e);
  let T = ml(e);
  const C = (f) => {
    R(f), T = ml(f);
  }, P = new p.Vector2(), F = [0, 0, 0], M = [1, 1, 1];
  return { layerFn: O, updateUniforms: C, renderPass: (f) => {
    f.getDrawingBufferSize(P), s.value = P.x / Math.max(1, P.y);
    const D = Ce(), L = Qe(), B = T * pl;
    if (L.active && L.duration > 0) {
      const z = Ne(), V = L.duration;
      ya.forEach((Y, U) => {
        const j = T * dl(Y.k), X = j * z * V, N = j * (z - 1) * V, G = (1 - z) * Math.cos(X) + z * Math.cos(N), W = (1 - z) * Math.sin(X) + z * Math.sin(N), J = Math.hypot(G, W);
        F[U] = Math.atan2(W, G), M[U] = J / Math.max(J, 0.5);
      }), m.value = B * z * V, x.value = B * (z - 1) * V, g.value = z;
    } else
      ya.forEach((z, V) => {
        F[V] = T * dl(z.k) * D % (Math.PI * 2), M[V] = 1;
      }), m.value = B * D, x.value = 0, g.value = 0;
    c.value.set(F[0], F[1], F[2]), h.value.set(M[0], M[1], M[2]);
  }, warpUv: y };
}
const C1 = {
  meta: {
    id: "cloth",
    name: "Cloth",
    description: "Hangs the layers below like fabric in the wind — a flag, a banner, a curtain",
    keywords: [
      "flag",
      "banner",
      "fabric",
      "wind",
      "wave",
      "waving",
      "curtain",
      "drape",
      "satin",
      "silk",
      "sheet",
      "flutter",
      "billow",
      "ripple",
      "textile",
      "warp",
      "distort"
    ],
    group: "distort"
  },
  kind: "processor",
  // Displaced UV — a clip run flaps with the fill.
  transformsSilhouette: !0,
  paramSchema: Bu,
  defaultParams: S1,
  buildLayer: T1
}, zu = {
  // Which way the drum lies. Structural because the two cases swap which screen
  // axis runs around the surface and which runs along it, and that is a
  // different node graph rather than a different number.
  axis: {
    type: "dropdown",
    label: "Axis",
    options: [
      { label: "Upright", value: "vertical" },
      { label: "Lying down", value: "horizontal" }
    ],
    default: "vertical",
    structural: !0,
    description: "Which way the drum stands. Upright spins it left to right, like a carousel; lying down rolls it towards you, like a rolling pin."
  },
  // How far around the drum the frame can see. This is the curvature: at 0 the
  // surface is flat and the layer below comes through untouched, at 100 you are
  // looking at 170 degrees of drum and the far edges are nearly side-on.
  wrap: {
    type: "slider",
    label: "Wrap",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How far around the drum you can see. 0 is a flat surface and the layer below comes through unchanged; raise it and the surface curves away at the sides until, near 100, the far edges are almost side-on."
  },
  // Copies around the surface. One is a single picture wrapped onto the drum —
  // which is the case a photo or a video wants. More turns it into a band of
  // panels, which is what a strip of film on a reel actually is.
  repeat: {
    type: "slider",
    label: "Repeat",
    min: 1,
    max: 12,
    step: 1,
    default: 1,
    description: "How many copies of the layer below sit side by side on the surface. 1 wraps a single picture onto the drum; raise it and you get a band of panels, the way frames sit along a strip of film."
  },
  // Rotation. Authored in degrees of drum, and a whole 360 brings the next copy
  // round to exactly where this one started — so a Turn keyframed 0 → 360 closes
  // the loop on itself with nothing rounded and no crossfade. That is the thing
  // a flat marquee cannot do: a cylinder is periodic, so seamlessness is free.
  turn: {
    type: "slider",
    label: "Turn",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "How far the drum has rotated. A full 360 brings the next copy round to exactly where this one started, so keyframing Turn from 0 to 360 loops seamlessly on its own — no crossfade, and nothing rounded."
  },
  // The signed part. A drum bulging towards you foreshortens at the sides, so
  // the surface there reads shorter; wrap it the other way, around the viewer,
  // and the sides flare instead. Both are real screens and the sign picks one.
  depth: {
    type: "slider",
    label: "Depth",
    min: -100,
    max: 100,
    step: 1,
    default: -40,
    description: "How strongly the sides foreshorten as they turn away. Positive bulges the drum towards you so the sides shrink back; negative wraps it around you so they flare instead. 0 keeps the surface the same height all the way across."
  },
  // Light falling off as the surface turns away. Neither Bulge nor Lens Distort
  // can do this, because neither of them knows it is looking at a surface.
  //
  // The light is head-on, so the shading is symmetric. A drum lit from one side
  // is a *direction*, and Light and Cast Light already own that — stack one over
  // this and it shades the same surface from anywhere.
  shade: {
    type: "slider",
    label: "Shading",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    description: "How deep into shadow the surface falls as it turns away from you. It is what makes the drum read as solid rather than as a bent picture: the centre stays fully lit at any setting and the sides darken, so high values leave a bright band down the middle with the edges rolling away. 0 lights it evenly and the layer below comes through untouched. Needs Wrap to bite — a flat surface has nothing turned away to shade."
  },
  // Same key, label and scale as Lens Distort and Bulge — one vocabulary.
  zoom: {
    type: "slider",
    label: "Zoom",
    min: 50,
    max: 150,
    step: 1,
    default: 100,
    description: "Scales the image inside the frame, as a percentage. Above 100 crops into it, which is the usual way to hide the corners a strong Depth pulls away from the edge."
  },
  // Turning on its own, without a keyframe. Authored in **turns per loop**, not
  // degrees per second, and that is the whole trick: a cylinder is periodic, so
  // a whole number of revolutions across the loop lands the drum exactly where
  // it started. The loop closes by definition rather than by rounding — see the
  // rate note in clock.ts for why a rate in degrees per second could not.
  //
  // Signed, because which way a reel runs is half of what you want from it.
  // Whole numbers only: half a revolution across the loop would jump at the wrap.
  spin: {
    type: "slider",
    label: "Spin",
    min: -12,
    max: 12,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How many full turns the drum makes over the loop, without a keyframe. Whole numbers only, which is what keeps it seamless: a cylinder is periodic, so a whole number of revolutions lands it exactly where it started. Negative runs it the other way, and 0 holds it wherever Turn is set."
  },
  // The same Follow mouse / Momentum / Spring block Bulge, Bokeh and Lens
  // Distort carry, so the control reads and settles identically wherever it
  // appears — same keys, same labels, same spring.
  //
  // Only the *wording* of Follow is overridden. The shared line talks about a
  // focal point pinned by the Position controls, and Cylinder has neither: here
  // the cursor rolls the surface. Re-declaring the key after the spread keeps
  // its original place in the panel, so the group is laid out as everywhere else.
  ...bt,
  _ixFollow: {
    ...bt._ixFollow,
    description: "How far the cursor turns the drum. Moving the pointer along the surface rolls it, and it springs back when the cursor stops or leaves. 0 leaves the drum wherever Turn and Spin put it."
  }
}, I1 = Object.fromEntries(
  Object.entries(zu).map(([e, t]) => [e, t.default])
), E1 = 85 * (Math.PI / 180), gl = 0.05 * (Math.PI / 180), F1 = 4, L1 = 3, R1 = 1e-3, ln = (e) => gl + e.wrap / 100 * (E1 - gl), cn = (e) => e.turn / 360, bl = (e) => e.depth / 100, yl = (e) => e.shade / 100, wl = (e) => e.zoom / 100, vl = (e) => Math.round(e.spin), D1 = 1;
function H1(e, t) {
  const s = e.axis === "horizontal", o = r(Math.sin(ln(e))), a = r(ln(e)), n = r(e.repeat), l = r(cn(e)), i = r(bl(e)), u = r(yl(e)), d = r(wl(e)), c = Lt(e), h = (y) => {
    const k = E(y.x.sub(0.5).mul(2), y.y.sub(0.5).mul(2)).div(d), A = s ? k.y : k.x, O = s ? k.x : k.y, R = Ld(fe(A.mul(o), -1, 1)), T = Se(R.div(a).mul(0.5).add(0.5).mul(n).add(l)), C = fe(b(1).div(ne(Ve(R), 0.08)).sub(1), 0, 3), P = fe(b(1).add(i.mul(F1).mul(C)), 0.15, 4), F = O.mul(P).mul(0.5).add(0.5), M = $e(ne(Ve(R), R1), u.mul(L1));
    return { uv: s ? E(F, T) : E(T, F), lit: M };
  }, m = Ke((y) => h(y).uv), x = (y) => {
    const { lit: k } = h(y), A = t(m(y));
    return ie(A.rgb.mul(k), A.a);
  };
  let g = cn(e), w = vl(e);
  return { layerFn: x, updateUniforms: (y) => {
    const k = ln(y);
    o.value = Math.sin(k), a.value = k, n.value = y.repeat, g = cn(y), w = vl(y), l.value = g, i.value = bl(y), u.value = yl(y), d.value = wl(y), c.update(y);
  }, renderPass: () => {
    c.renderPass();
    const y = Qe().duration > 0 ? Ne() : 0, k = (s ? c.value.y : c.value.x) * D1;
    l.value = g + w * y + k;
  }, warpUv: m };
}
const O1 = {
  meta: {
    id: "cylinder",
    name: "Cylinder",
    description: "Wraps the layers below around a turning drum, with repeats and shading",
    keywords: [
      "cylinder",
      "drum",
      "barrel",
      "roll",
      "reel",
      "carousel",
      "screen",
      "curve",
      "wrap",
      "projector",
      "marquee",
      "turn",
      "spin",
      "revolve",
      "film strip"
    ],
    group: "distort"
  },
  kind: "processor",
  // One tap, but a displacing one: the input is rendered to a texture so the
  // wrap costs a fetch rather than another evaluation of the whole stack.
  resampling: !0,
  // Warped UV — the silhouette curves with the fill, which is what gives a
  // picture on the drum its bowed top and bottom edges.
  transformsSilhouette: !0,
  paramSchema: zu,
  defaultParams: I1,
  buildLayer: H1
}, Vu = {
  // Where the floor starts, as a position on the frame — the shared ±100 =
  // half the frame convention, positive up.
  horizon: {
    type: "slider",
    label: "Horizon",
    min: -90,
    max: 90,
    step: 1,
    default: -30,
    description: "Where the floor starts, as a percentage of the frame from the centre — negative is lower. Everything above it is reflected onto the floor below."
  },
  strength: {
    type: "slider",
    label: "Strength",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How bright the reflection is, right at the horizon. 100 is a perfect mirror; 0 hides it."
  },
  fade: {
    type: "slider",
    label: "Fade",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How far down the floor the reflection reaches before it disappears. Low fades it out just under the horizon; 100 carries it to the bottom of the frame."
  },
  blur: {
    type: "slider",
    label: "Blur",
    min: 0,
    max: 100,
    step: 1,
    default: 25,
    description: "How glossy the floor is. 0 is polished glass; higher softens the reflection the further it falls from the horizon, like satin or wet concrete."
  },
  // Water: rings sliding across the reflection. Speed is whole ripples per loop.
  ripple: {
    type: "slider",
    label: "Ripple",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    group: "Animation",
    description: "How much the reflection wobbles, like water. 0 is a still floor."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 0,
    max: 12,
    step: 1,
    default: 1,
    showIf: (e) => e.ripple > 0,
    description: "How many ripples pass under the horizon over the loop. Whole numbers only, which is what keeps it seamless. 0 freezes the ripple in place."
  }
}, B1 = Object.fromEntries(
  Object.entries(Vu).map(([e, t]) => [e, t.default])
), xl = 0.12, un = 12, z1 = Math.PI * (3 - Math.sqrt(5)), Ml = 0.05, V1 = 40, kl = (e) => 0.5 + e.horizon / 100 * 0.5;
function _1(e, t) {
  const s = r(kl(e)), o = r(e.strength / 100), a = r(0.02 + e.fade / 100), n = r(e.blur / 100 * xl), l = r(e.ripple / 100 * Ml), i = r(0), u = r(1), d = (g) => {
    const w = t(g), S = ne(s.sub(g.y), 0), v = pe(g.y, s), y = s.mul(2).sub(g.y), k = Ae(S.mul(V1).sub(i)).mul(l).mul(S), A = E(g.x.add(k), y), O = n.mul(S);
    let R = ie(0, 0, 0, 0);
    for (let M = 0; M < un; M++) {
      const I = Math.sqrt((M + 0.5) / un), f = M * z1, D = E(O.mul(I * Math.cos(f)).div(u), O.mul(I * Math.sin(f))), L = A.add(D);
      R = R.add(t(L).mul(pe(L.y, 1)));
    }
    const T = R.div(un), C = b(1).sub(Me(0, a, S)), P = o.mul(C).mul(v).mul(T.a), F = $(w.rgb, T.rgb.div(ne(T.a, 1e-4)), P);
    return ie(F, ne(w.a, P));
  };
  let c = Math.round(e.speed);
  const h = (g) => {
    s.value = kl(g), o.value = g.strength / 100, a.value = 0.02 + g.fade / 100, n.value = g.blur / 100 * xl, l.value = g.ripple / 100 * Ml, c = Math.round(g.speed);
  }, m = new p.Vector2();
  return { layerFn: d, updateUniforms: h, renderPass: (g) => {
    g.getDrawingBufferSize(m), u.value = m.x / Math.max(1, m.y);
    const w = Qe().duration > 0 ? Ne() : 0;
    i.value = w * c * Math.PI * 2;
  } };
}
const X1 = {
  meta: {
    id: "floor",
    name: "Reflective Floor",
    description: "Mirrors the layers below onto a glossy floor under a horizon line",
    keywords: [
      "reflection",
      "reflect",
      "mirror",
      "floor",
      "gloss",
      "glossy",
      "water",
      "puddle",
      "wet",
      "surface",
      "studio",
      "product shot",
      "ripple",
      "lake"
    ],
    group: "distort"
  },
  kind: "processor",
  // Twelve taps for the gloss — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: Vu,
  defaultParams: B1,
  buildLayer: _1
}, _u = {
  // The profile the two edges bend along: 1 at the centre of the span, 0 at its
  // ends, with the shape between them the only difference. Structural because
  // each one is a different formula rather than a different number in the same
  // one — mixing all three live would emit three profiles per pixel to throw
  // two away.
  shape: {
    type: "dropdown",
    label: "Shape",
    options: [
      { label: "Peak", value: "peak" },
      { label: "Arch", value: "arch" },
      { label: "Slant", value: "slant" }
    ],
    default: "peak",
    structural: !0,
    group: "Shape",
    description: "The profile the band's edges bend along. Peak rises to a point at the centre, Arch curves smoothly, Slant ramps from one end to the other. Each is 1 at the centre of the span and 0 at its ends."
  },
  // The two edges of the band the artwork is fitted into, each as how far it
  // moves *at the centre of the span* — the ends never move, which is what makes
  // 0/0 the untouched image and every other pair a departure from it. Both are
  // signed and both mean "up", so their combination is the whole vocabulary:
  // Bottom alone sits type on a shape (the pyramid case), Top alone lowers the
  // cap onto it, the two together bow the line into an arch without squashing
  // it, and opposite signs pinch it like a ribbon.
  //
  // ±200, not ±100: the unit is unchanged — 100 still moves that edge by one
  // band height at the centre of the span — so every scene built on the old
  // track is untouched and the extra range is simply a steeper roof than one
  // band height buys. The far end is guarded rather than new territory: once the
  // two edges meet, `MIN_SPAN` holds the span open, so the end of the track
  // saturates into maximum squash instead of dividing by zero or mirroring.
  top: {
    type: "slider",
    label: "Top",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "How far the top edge of the band moves at the centre of the span. Signed, and positive means up. The ends never move, which is why 0 leaves the image untouched."
  },
  bottom: {
    type: "slider",
    label: "Bottom",
    min: -200,
    max: 200,
    step: 1,
    default: 55,
    description: "How far the bottom edge moves at the centre of the span. Signed, positive is up. Bottom alone sits type on a shape — the pyramid case; both edges together bow the line into an arch without squashing it; opposite signs pinch it like a ribbon."
  },
  // How wide the profile spans, measured the way Shape 2D measures its shapes —
  // in aspect-corrected units, not in frame widths.
  //
  // That distinction is the point of the control. The reason to reach for a Peak
  // is usually to sit type on a triangle you drew, and Shape 2D keeps a triangle
  // a true triangle on any canvas (see `uAspect` there). Measured in frame
  // widths the envelope's slope would change with the ratio while the triangle's
  // didn't, so an aligned pair would come apart the moment you switched to 16:9.
  // Measured this way they hold. The cost is that spanning a wide frame takes a
  // number above 100, which is why the track runs long — to 600, so the profile
  // can still overspill the ends of an ultra-wide canvas and present only its
  // middle as a near-straight ramp. Downward it reaches 5, a peak narrow enough
  // to bend one letter of a word rather than the line.
  width: {
    type: "slider",
    label: "Width",
    min: 5,
    max: 600,
    step: 1,
    default: 100,
    description: "How wide the profile spans, in aspect-corrected units rather than frame widths — the same measure Shape 2D uses, so an envelope aligned to a triangle you drew stays aligned when you switch canvas ratio. Spanning a wide frame therefore takes a number above 100. Low values bend a single letter rather than the line."
  },
  // How tall the band is at rest, as a share of the frame — and the control that
  // decides whether this effect is usable on anything but full-bleed artwork.
  //
  // The band is what gets bent, and the artwork keeps its place inside it. Leave
  // the band the whole frame while the type only occupies the middle of it, and
  // the type's own top edge sits somewhere in the band's interior, where the
  // bend moves it: the line comes out bowed as well as squashed, and the flat
  // cap the reference lettering depends on is gone. Bring Height (with Position
  // Y) down onto the type and its top edge *is* the band's top edge, which the
  // bend leaves alone — the letters press down onto the slope and the cap stays
  // a straight line, wherever on the canvas the type happens to sit.
  //
  // 100 is the frame, which is right for the full-bleed poster case and is why
  // it's the default — but it is not a ceiling. Above it the band is taller than
  // the frame, so the bend is distributed over more than you can see and the
  // visible part of it is gentler: the way to a shallow bow across a full-bleed
  // image without winding Top and Bottom down to single digits. Below, 2 is a
  // band thin enough to catch a single line of type and leave the rest alone.
  height: {
    type: "slider",
    label: "Height",
    min: 2,
    max: 200,
    step: 1,
    default: 100,
    description: "How tall the band is at rest, as a share of the frame. This decides whether the effect is usable on anything but full-bleed artwork: leave the band at the whole frame while your type occupies only the middle, and the type's own top edge sits inside the band where the bend moves it, so the line comes out bowed as well as squashed. Bring Height down onto the type and its top edge is the band's top edge, which the bend leaves flat."
  },
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the band sideways, as a percentage of the frame. Pair it with Width to put the peak of the profile where the artwork actually is."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the band up or down the frame, as a percentage. Use it with Height to sit the band exactly on the artwork you mean to bend."
  }
}, W1 = Object.fromEntries(
  Object.entries(_u).map(([e, t]) => [e, t.default])
), G1 = 0.02, Sl = (e) => Math.max(0.02, e.width / 100 * 0.5), Pl = (e) => 0.5 + e.posY / 100 * 0.5 - e.height / 100 / 2;
function Y1(e, t) {
  const s = r(e.top / 100), o = r(e.bottom / 100), a = r(Sl(e)), n = r(e.posX / 100 * 0.5), l = r(e.height / 100), i = r(Pl(e)), u = r(1), d = e.shape, c = (S) => {
    const v = S.x.sub(0.5).sub(n).mul(u);
    if (d === "slant") return fe(v.div(a.mul(2)).add(0.5), 0, 1);
    const y = fe(we(v).div(a), 0, 1);
    return d === "arch" ? Ve(y.mul(Math.PI)).add(1).mul(0.5) : b(1).sub(y);
  }, h = Ke((S) => {
    const y = c(S).mul(l), k = i.add(o.mul(y)), A = i.add(l).add(s.mul(y)), O = ne(A.sub(k), b(G1)), R = S.y.sub(k).div(O).mul(l).add(i);
    return E(S.x, R);
  }), m = (S) => t(h(S)), x = (S) => {
    s.value = S.top / 100, o.value = S.bottom / 100, a.value = Sl(S), n.value = S.posX / 100 * 0.5, l.value = S.height / 100, i.value = Pl(S);
  }, g = new p.Vector2();
  return { layerFn: m, updateUniforms: x, renderPass: (S) => {
    S.getDrawingBufferSize(g), u.value = g.x / Math.max(1, g.y);
  }, warpUv: h };
}
const U1 = {
  meta: {
    id: "envelope",
    name: "Envelope",
    description: "Fits the layers below into a band with a bent top and bottom — type on a slope",
    keywords: [
      "arch",
      "arc",
      "curve",
      "bend",
      "warp text",
      "type on a path",
      "fit",
      "roof",
      "peak",
      "pyramid",
      "wedge",
      "taper",
      "banner",
      "flag",
      "squash"
    ],
    group: "distort"
  },
  kind: "processor",
  // Deliberately not `resampling`: one tap, and the inlined input is what keeps
  // warped type sampling its glyph atlas at full resolution. See the note above.
  transformsSilhouette: !0,
  paramSchema: _u,
  defaultParams: W1,
  buildLayer: Y1
}, Xu = {
  mode: {
    type: "dropdown",
    label: "Focus",
    options: [
      { label: "Radial", value: "radial" },
      // sharp centre subject
      { label: "Tilt-shift", value: "linear" }
      // sharp horizontal band
    ],
    default: "radial",
    structural: !0,
    description: "Where the image stays sharp. Radial holds a round subject at the centre in focus; Tilt-shift holds a horizontal band sharp and defocuses above and below it."
  },
  amount: {
    type: "slider",
    label: "Blur",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How strong the defocus is outside the sharp region."
  },
  focus: {
    type: "slider",
    label: "Focus point",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "Where the sharp region sits. Under Radial this is its distance out from the centre; under Tilt-shift it is the height of the sharp band up the frame."
  },
  range: {
    type: "slider",
    label: "Focus range",
    min: 1,
    max: 100,
    step: 1,
    default: 30,
    description: "How wide the sharp region is before the blur takes over. Low values give a knife-thin plane of focus, high values keep most of the frame readable."
  },
  highlights: {
    type: "slider",
    label: "Highlights",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "How much bright pixels bloom into discs. 0 is a plain defocus; raising it weights bright taps up so speculars swell into the round bokeh balls the effect is named for."
  },
  ...bt
}, j1 = Object.fromEntries(
  Object.entries(Xu).map(([e, t]) => [e, t.default])
), $1 = [
  { r: 0.4, n: 8 },
  { r: 0.75, n: 12 },
  { r: 1, n: 14 }
];
function N1(e, t) {
  const s = e.mode, o = r(e.amount / 100 * 0.08), a = r(e.focus / 100), n = r(e.range / 100), l = r(e.highlights / 100), i = r(1), u = Lt(e), d = (g) => g.r.mul(0.299).add(g.g.mul(0.587)).add(g.b.mul(0.114)), c = (g) => {
    const w = t(g);
    let S;
    if (s === "linear") {
      const O = we(g.y.sub(a).sub(u.offset.y));
      S = Me(n.mul(0.5), n.mul(0.5).add(0.28), O);
    } else {
      const O = E(
        g.x.sub(0.5).sub(u.offset.x).mul(i),
        g.y.sub(0.5).sub(u.offset.y)
      );
      S = Me(n, n.add(0.35), Pe(O).sub(a.sub(n)));
    }
    const v = S.mul(o), y = b(1).add(l.mul($e(fe(d(w), 0, 1), 3)).mul(6));
    let k = w.rgb.mul(y), A = y;
    for (const O of $1)
      for (let R = 0; R < O.n; R++) {
        const T = R / O.n * Math.PI * 2, C = E(
          v.mul(Math.cos(T) * O.r).div(i),
          v.mul(Math.sin(T) * O.r)
        ), P = t(g.add(C)), F = b(1).add(l.mul($e(fe(d(P), 0, 1), 3)).mul(6));
        k = k.add(P.rgb.mul(F)), A = A.add(F);
      }
    return ie(k.div(A), w.a);
  }, h = (g) => {
    o.value = g.amount / 100 * 0.08, a.value = g.focus / 100, n.value = g.range / 100, l.value = g.highlights / 100, u.update(g);
  }, m = new p.Vector2();
  return { layerFn: c, updateUniforms: h, renderPass: (g) => {
    g.getDrawingBufferSize(m), i.value = m.x / Math.max(1, m.y), u.renderPass();
  } };
}
const q1 = {
  meta: {
    id: "bokeh",
    name: "Bokeh",
    description: "Shallow depth-of-field blur with blooming bokeh highlights",
    keywords: ["blur", "depth of field", "dof", "defocus", "lens", "out of focus", "highlights", "circles", "soft"],
    group: "blur"
  },
  kind: "processor",
  // 35-tap disc — see `resampling` in types/effects.ts.
  resampling: !0,
  paramSchema: Xu,
  defaultParams: j1,
  buildLayer: N1
}, Wu = rc.find((e) => e.name === "Ember").value, Gu = {
  source: {
    type: "dropdown",
    label: "Driven by",
    group: "Path",
    options: [
      { label: "Auto path", value: "auto" },
      { label: "Cursor", value: "pointer" }
    ],
    default: "auto",
    description: "What moves the brush. Auto path runs it along a shape of its own forever; Cursor hands it to the viewer's pointer, so the stroke is drawn by whoever is looking. Cursor makes the layer interactive and does nothing in a still export."
  },
  path: {
    type: "dropdown",
    label: "Shape",
    options: [
      { label: "Figure eight", value: "figure8" },
      { label: "Circle", value: "circle" },
      { label: "Wander", value: "wander" }
    ],
    default: "figure8",
    showIf: (e) => e.source !== "pointer",
    description: "The route the brush travels. Figure eight crosses itself, so the stroke overlaps and builds; Circle is an even loop; Wander drifts unpredictably. Auto path only."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 1,
    max: 100,
    step: 1,
    default: 35,
    showIf: (e) => e.source !== "pointer",
    description: "How fast the brush travels its path. Auto path only."
  },
  spread: {
    type: "slider",
    label: "Spread",
    min: 5,
    max: 100,
    step: 1,
    default: 65,
    showIf: (e) => e.source !== "pointer",
    description: "How much of the frame the path covers. Low keeps the stroke in a tight knot at the centre, high sweeps the whole canvas. Auto path only."
  },
  // Length and Width are coupled in practice: the node budget is fixed, so a
  // longer stroke spreads it thinner. These defaults keep the gap well inside
  // the brush, which is what makes the stroke read as continuous light.
  length: {
    type: "slider",
    label: "Length",
    min: 1,
    max: 100,
    step: 1,
    default: 30,
    description: "How long the visible stroke is behind the head. Length and Width are coupled in practice: the node budget is fixed, so a longer stroke spreads it thinner and can start to break into beads."
  },
  style: {
    type: "dropdown",
    label: "Style",
    group: "Brush",
    options: [
      // Light emits: the stroke accumulates and tone-maps to a white-hot core,
      // and the colour runs head-to-tail. Ink is opaque pigment with an edge,
      // and the colour runs core-to-edge.
      // Spray sums *density* instead and thresholds it against the wall's
      // tooth, so overlap darkens toward the colour and the boundary is grain
      // rather than a line.
      { label: "Light", value: "light" },
      { label: "Ink", value: "ink" },
      { label: "Spray", value: "spray" }
    ],
    default: "light",
    structural: !0,
    description: "What the brush lays down. Light emits — the stroke accumulates and tone-maps to a white-hot core, with the colour ramp running head to tail. Ink is opaque pigment with a defined edge, colour running core to edge. Spray sums density and thresholds it against the surface tooth, so overlapping passes darken and the boundary is grain rather than a line. Each style brings its own controls."
  },
  width: {
    type: "slider",
    label: "Width",
    min: 1,
    max: 100,
    step: 1,
    default: 42,
    description: "How wide the brush is."
  },
  taper: {
    type: "slider",
    label: "Taper",
    min: 0,
    max: 100,
    step: 1,
    default: 65,
    description: "How much the stroke narrows toward its tail. 0 is an even ribbon, high draws it to a point behind the head."
  },
  // Every gate below names the style it belongs to. They used to read
  // `!== 'ink'`, which silently meant "and any style added later" — Spray would
  // have inherited Strength and Glow, neither of which it has a use for.
  strength: {
    type: "slider",
    label: "Strength",
    min: 1,
    max: 100,
    step: 1,
    default: 55,
    showIf: (e) => e.style === "light",
    description: "How hard the light accumulates toward its white-hot core. Light only."
  },
  glow: {
    type: "slider",
    label: "Glow",
    min: 0,
    max: 100,
    step: 1,
    default: 35,
    showIf: (e) => e.style === "light",
    description: "How far light bleeds beyond the stroke itself. Light only."
  },
  softness: {
    type: "slider",
    label: "Softness",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    showIf: (e) => e.style === "ink",
    description: "How soft the ink edge is. 0 is a hard pigment boundary. Ink only."
  },
  bleed: {
    type: "slider",
    label: "Bleed",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    showIf: (e) => e.style === "ink",
    description: "How far the ink wicks outward into the surface, as on absorbent paper. Ink only."
  },
  // Fill laid down by one pass along the stroke, as a fraction of solid. Below
  // 100 a single pass is speckled and a crossing fills in — the accumulation
  // that separates Spray from the other two styles is only visible here.
  density: {
    type: "slider",
    label: "Density",
    min: 1,
    max: 100,
    step: 1,
    default: 72,
    showIf: (e) => e.style === "spray",
    description: "How much fill one pass lays down, as a fraction of solid. Below 100 a single pass is speckled and a crossing fills in — the accumulation that separates Spray from the other styles is only visible here. Spray only."
  },
  // Shape of the aerosol cone: 0 is a tight nozzle, 100 a wide dusting that
  // reaches far past the core. Blends two lobes that are each normalised to the
  // same integral, so it never changes how dense the core lands — it is a shape
  // control, not a second Density. See the Spray branch in index.ts.
  overspray: {
    type: "slider",
    label: "Overspray",
    min: 0,
    max: 100,
    step: 1,
    default: 38,
    showIf: (e) => e.style === "spray",
    description: "The shape of the aerosol cone. 0 is a tight nozzle, 100 a wide dusting reaching far past the core. It never changes how dense the core lands, so it is a shape control rather than a second Density. Spray only."
  },
  // Grain of the surface being sprayed, not of the paint: coarse spatter at 0,
  // fine dust at 100.
  tooth: {
    type: "slider",
    label: "Tooth",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    showIf: (e) => e.style === "spray",
    description: "The grain of the surface being sprayed, not of the paint: coarse spatter at 0, fine dust at 100. Spray only."
  },
  turbulence: {
    type: "slider",
    label: "Turbulence",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How much noise pushes the stroke off its path. 0 draws a clean line; raising it gives a nervous, hand-drawn wobble."
  },
  grain: {
    type: "slider",
    label: "Grain",
    min: 1,
    max: 100,
    step: 1,
    default: 40,
    showIf: (e) => e.turbulence > 0,
    description: "How fine that turbulence is. Only once Turbulence is above 0."
  },
  gradient: {
    type: "gradient",
    ramp: !0,
    label: "Color",
    default: Pt(Wu),
    group: "Color",
    description: "The colour ramp of the stroke. Where it runs depends on Style: head to tail under Light, core to edge under Ink. A hot core with a cooler edge reads as light; two flat stops read as ink."
  }
}, Z1 = {
  ...Object.fromEntries(Object.entries(Gu).map(([e, t]) => [e, t.default])),
  gradient: Pt(Wu)
}, xt = 32;
function K1(e, t) {
  const s = Ms(e.gradient), o = r(En(e.width)), a = r(e.taper / 100), n = r(Al(e.softness, e.width)), l = r(e.bleed / 100), i = r(e.turbulence / 100 * 0.12), u = r(e.grain / 100 * 14), d = r(0.02), c = r(e.strength / 100 * 4), h = r(e.glow / 100 * 6), m = r(Tl(e.density)), x = r((e.overspray ?? 38) / 100), g = r(Cl(e.tooth)), w = r(1), S = e.style ?? "light", v = r(0), y = r(0), k = r(0), A = r(0), O = Array.from({ length: xt }, () => new p.Vector3(0.5, 0.5, 0)), R = co(O), T = Array.from({ length: xt - 1 }, () => new p.Vector3()), C = co(T), P = new p.Color(), F = () => {
    for (let K = 0; K < xt - 1; K++)
      s.sampleCpu(K / (xt - 2), P), T[K].set(P.r, P.g, P.b);
  };
  F();
  const M = st(([K]) => {
    const le = E(K.x.mul(w), K.y);
    let ce = le;
    const oe = k.mul(Math.PI * 2), de = A.mul(Ve(oe)).mul(y), me = A.mul(Ae(oe)).mul(y), xe = $(v.mul(0.25), b(0), y), ge = ce.mul(u), We = Bt(te(ge.x.add(de), ge.y.add(me), xe), 3, 2, 0.5), Ge = Bt(te(ge.x.add(11.3).add(de), ge.y.add(5.7).add(me), xe.add(2.1)), 3, 2, 0.5);
    ce = ce.add(E(We, Ge).mul(i)).toVar();
    const _e = (Je) => {
      const ot = R.element(Je), He = R.element(Je.add(1)), at = ce.sub(ot.xy), mt = He.xy.sub(ot.xy), lt = mt.dot(mt), At = Me(b(1e-8), b(1e-6), lt), ct = fe(at.dot(mt).div(lt.max(b(1e-6))), 0, 1).mul(At), ut = $(ot.z, He.z, ct);
      return { d: at.sub(mt.mul(ct)).length(), r: ut.mul(o), w: ut };
    };
    if (S === "ink") {
      const Je = b(10).toVar();
      os(xt - 1, ({ i: At }) => {
        const { d: ct, r: ut } = _e(At);
        Je.assign(ve(Je, ct.sub(ut)));
      });
      const ot = Me(n.negate(), n, Je).oneMinus(), He = o.mul(2.5).mul(l).add(1e-4), at = Me(He.negate(), He, Je).oneMinus().mul(l).mul(0.45), mt = fe(ot.max(at), 0, 1), lt = fe(Je.negate().div(o.mul(0.9).add(1e-4)), 0, 1);
      return ie(s.sample(lt), mt);
    }
    if (S === "spray") {
      const Je = b(0).toVar();
      os(xt - 1, ({ i: ut }) => {
        const Wt = R.element(ut), Gt = R.element(ut.add(1)), rs = Gt.xy.sub(Wt.xy), is = ce.sub(Wt.xy), ls = rs.dot(rs), ks = ls.sqrt(), Ss = is.dot(rs).div(ls.max(b(1e-12))), Ps = is.sub(rs.mul(Ss)).length(), cs = Wt.z.add(Gt.z).mul(0.5), us = cs.mul(o).max(o.mul(0.06)), ds = us.mul(us).add(Ps.mul(Ps)).sqrt(), $t = us.div(ds), es = Ss.negate().mul(ks).div(ds).toVar(), As = b(1).sub(Ss).mul(ks).div(ds).toVar(), xo = Ut(es).toVar(), Js = Ut(As).toVar(), Mo = Js.sub(xo), he = es.mul(es).add(1), Ie = As.mul(As).add(1), pt = (Xe, vt, Et) => Xe.div(vt.mul(vt).mul(4)).add(Xe.mul(3).div(vt.mul(8))).add(Et.mul(3 / 8)), dt = pt(As, Ie, Js).sub(pt(es, he, xo)), ft = $t.mul($t), Ts = ft.mul(ft).mul($t);
        Je.addAssign(
          cs.mul(
            Ts.mul(dt).mul(8 / 3).mul(x.oneMinus()).add($t.mul(Mo).mul(x))
          ).mul(1 / Math.PI)
        );
      });
      const ot = Je.mul(m), He = le.mul(g), at = E(
        He.x.mul(0.8253).sub(He.y.mul(0.5647)),
        He.x.mul(0.5647).add(He.y.mul(0.8253))
      ).mul(1.6180339), mt = St(Be(He.x), Be(He.y), Ct(20973)).add(St(Be(at.x), Be(at.y), Ct(40503))).mul(0.5), lt = b(0.07), At = mt.mul(b(1).sub(lt.mul(2))).add(lt), ct = Me(At.sub(lt), At.add(lt), ot);
      return ie(s.sample(fe(ot, 0, 1)), ct);
    }
    const Ye = (Je) => {
      const { d: ot, r: He, w: at } = _e(Je), mt = Me(b(0), b(0.02), at);
      return { d: ot, r: He, w: at, gate: mt, s: ot.sub(He).add(mt.oneMinus().mul(10)) };
    }, _ = o.mul(0.3).max(d.mul(0.8)).add(b(1e-5)), H = b(1e3).toVar(), q = b(0).toVar(), ee = b(0).toVar(), Z = b(0).toVar(), ae = b(0).toVar(), re = te(0, 0, 0).toVar(), be = b(0).toVar();
    os(xt - 1, ({ i: Je }) => {
      const { d: ot, r: He, w: at, gate: mt, s: lt } = Ye(Je), At = ve(H, lt).toVar(), ct = Rt(H.sub(At).negate().div(_)).toVar();
      H.assign(At), q.mulAssign(ct), ee.mulAssign(ct), Z.mulAssign(ct), ae.mulAssign(ct), re.mulAssign(ct);
      const ut = mt.mul(Rt(lt.sub(At).negate().div(_)));
      q.addAssign(ut), ee.addAssign(ot.mul(ut)), Z.addAssign(He.mul(ut)), ae.addAssign(at.mul(ut));
      const Wt = C.element(Je);
      re.addAssign(Wt.mul(ut));
      const Gt = He.mul(He).mul(9);
      be.addAssign(Gt.div(ot.mul(ot).add(Gt).max(b(1e-7))).mul(at));
    });
    const ye = be, ke = b(1).div(q.max(b(1e-6))), Fe = ee.mul(ke), Le = Z.mul(ke), Oe = ae.mul(ke), Te = re.mul(ke), qe = Le.mul(Le), it = qe.div(Fe.mul(Fe).add(qe).max(b(1e-7))), wt = it.mul(it).mul(Oe).mul(c).add(ye.div(xt).mul(h)), Xt = Rt(Te.mul(wt).negate()).oneMinus(), It = Rt(wt.negate()).oneMinus();
    return ie(Xt, It);
  }), I = (K) => M(K), f = (K) => {
    s.update(K.gradient), F(), o.value = En(K.width), a.value = K.taper / 100, n.value = Al(K.softness, K.width), l.value = K.bleed / 100, i.value = K.turbulence / 100 * 0.12, u.value = K.grain / 100 * 14, c.value = K.strength / 100 * 4, h.value = K.glow / 100 * 6, m.value = Tl(K.density), x.value = (K.overspray ?? 38) / 100, g.value = Cl(K.tooth), D = K.source ?? "auto", L = K.path ?? "figure8", B = K.speed / 100 * 0.55 + 0.02, z = K.spread / 100, V = K.length / 100;
  };
  let D = e.source ?? "auto", L = e.path ?? "figure8", B = e.speed / 100 * 0.55 + 0.02, z = e.spread / 100, V = e.length / 100;
  const Y = Array.from({ length: xt }, () => new p.Vector2(0.5, 0.5)), U = new Array(xt).fill(1 / 0), j = new p.Vector2(0.5, 0.5);
  let X = !1, N = 1;
  const G = new p.Vector2(), W = (K) => {
    K.getDrawingBufferSize(G);
    const le = G.x / Math.max(1, G.y);
    w.value = le;
    const ce = Qe();
    v.value = Ce(), y.value = ce.active ? 1 : 0, k.value = Ne(), A.value = 0.25 * ce.duration / (Math.PI * 2), D === "pointer" ? se(le) : J(le);
  };
  function J(K) {
    const le = Ce() * B, ce = V / (xt - 1);
    let oe = 0;
    for (let de = 0; de < xt; de++) {
      const me = de / (xt - 1);
      Q1(L, le - de * ce, z, K, j), de > 0 && (oe = Math.max(oe, j.distanceTo(dn))), dn.copy(j), O[de].set(j.x, j.y, Il(me, a.value));
    }
    d.value = oe;
  }
  function Q(K) {
    let le = 0;
    for (let ce = 0; ce < xt; ce++) {
      const oe = ce < N, de = oe ? Y[ce] : Y[N - 1], me = oe ? Math.max(0, 1 - U[ce] / K) : 0;
      O[ce].set(de.x, de.y, Il(ce / (xt - 1), a.value) * me), oe && ce > 0 && me > 0 && (le = Math.max(le, Y[ce].distanceTo(Y[ce - 1])));
    }
    d.value = le;
  }
  function se(K) {
    const le = Math.min(0.5, Jt());
    if (le <= 0) return;
    const ce = Math.min(0.1, le), oe = 0.8 + V * 3.5;
    for (let ge = 0; ge < xt; ge++) U[ge] += le;
    const de = ns();
    if (!de.active) {
      X = !1, Q(oe);
      return;
    }
    const me = dn.set((de.x * 0.5 + 0.5) * K, de.y * 0.5 + 0.5);
    if (!X) {
      for (const ge of Y) ge.copy(me);
      U.fill(1 / 0), N = 1, X = !0;
    }
    j.copy(Y[0]).lerp(me, 1 - Math.exp(-12 * ce));
    const xe = Math.max(1e-3, V * 1.6 / (xt - 1));
    if (j.distanceTo(Y[1]) >= xe) {
      for (let ge = xt - 1; ge > 0; ge--)
        Y[ge].copy(Y[ge - 1]), U[ge] = U[ge - 1];
      N = Math.min(xt, N + 1), U[0] = 0;
    }
    Y[0].copy(j), Q(oe);
  }
  return { layerFn: I, updateUniforms: f, renderPass: W };
}
const dn = new p.Vector2();
function En(e) {
  return e / 100 * 0.18 + 4e-3;
}
function Al(e, t) {
  return Math.max(15e-4, e / 100 * En(t) * 1.6);
}
function Tl(e) {
  return 0.04 * Math.pow(150, (e ?? 52) / 100);
}
function Cl(e) {
  return 70 * Math.pow(12, (e ?? 55) / 100);
}
function Il(e, t) {
  return 1 - t * e * e;
}
function Q1(e, t, s, o, a) {
  const n = t * Math.PI * 2;
  let l, i;
  e === "circle" ? (l = Math.cos(n), i = Math.sin(n)) : e === "wander" ? (l = 0.62 * Math.sin(n) + 0.38 * Math.sin(3 * n + 1.3), i = 0.55 * Math.cos(2 * n) + 0.45 * Math.sin(n + 0.7)) : (l = Math.sin(n), i = Math.sin(2 * n) * 0.5), a.set(
    (0.5 + l * 0.42 * s) * o,
    0.5 + i * 0.42 * s
  );
}
const J1 = {
  meta: {
    id: "trail",
    name: "Light Trail",
    description: "A glowing stroke that drags a fading tail along a path or the cursor",
    keywords: [
      "stroke",
      "tail",
      "glow",
      "cursor",
      "pointer",
      "path",
      "streak",
      "comet",
      "neon",
      "draw",
      "spray",
      "aerosol",
      "paint",
      "graffiti",
      "ink",
      "brush",
      "speckle"
    ],
    group: "generative"
  },
  kind: "generator",
  // Only in cursor mode — the autonomous path ignores the pointer entirely, and
  // saying otherwise would promise the export dialog a response this layer won't
  // give. (Follow mouse is separate and already counted generically.)
  usesPointer: (e) => e.source === "pointer",
  paramSchema: Gu,
  defaultParams: Z1,
  buildLayer: K1
}, Yu = {
  color: {
    type: "color",
    label: "Colour",
    default: "#000000",
    description: "The colour to key on."
  },
  mode: {
    type: "dropdown",
    label: "Cut out",
    options: [
      // Named by what you end up seeing, not by the maths.
      { label: "This colour", value: "knockout" },
      { label: "Everything else", value: "isolate" }
    ],
    default: "knockout",
    // The holes are only ever visible through a clip — unclipped there is
    // nothing under this layer for them to reveal, so the frame looks untouched.
    note: (e, t) => t.clipped ? null : "Clip this layer to the one below — the holes reveal what sits under the base.",
    description: "Which side is removed. This colour knocks a hole where the key colour is; Everything else keeps only the key colour and removes the rest. Either way the holes are only visible once this layer is clipped to the one below — unclipped there is nothing beneath for them to reveal."
  },
  // How far from the key colour still counts. Flat art (a Posterize ramp, a
  // Shape's fill) keys cleanly at a low number; a photograph's gradients need
  // room, which is also where Softness earns its place.
  tolerance: {
    type: "slider",
    label: "Tolerance",
    min: 0,
    max: 100,
    step: 1,
    default: 12,
    description: "How far from the key colour still counts as a match. Flat art — a Posterize ramp, a Shape fill — keys cleanly at a low number; a photograph's gradients need much more room."
  },
  softness: {
    type: "slider",
    label: "Softness",
    min: 0,
    max: 100,
    step: 1,
    default: 8,
    description: "How soft the edge of the cut is. 0 gives a hard stencil; raising it feathers the boundary, which is what makes a keyed photograph look cut rather than torn."
  }
}, eb = Object.fromEntries(
  Object.entries(Yu).map(([e, t]) => [e, t.default])
);
function tb(e, t) {
  const s = r(new p.Color(e.color)), o = r(e.tolerance / 100), a = r(e.softness / 100), n = r(e.mode === "isolate" ? 1 : 0);
  return { layerFn: (u) => {
    const d = t(u), c = Pe(d.rgb.sub(s)), h = Me(o, ne(o.add(a), o.add(b(1e-3))), c), m = $(h, h.oneMinus(), n);
    return ie(d.rgb, d.a.mul(m));
  }, updateUniforms: (u) => {
    s.value.set(u.color), o.value = u.tolerance / 100, a.value = u.softness / 100, n.value = u.mode === "isolate" ? 1 : 0;
  } };
}
const sb = {
  meta: {
    id: "colorCutout",
    name: "Colour Cutout",
    description: "Cut one colour out of the layers below, so a clip reveals what is beneath",
    keywords: ["chroma key", "green screen", "key", "knockout", "transparent", "alpha", "matte", "mask", "remove background", "eyedropper"],
    group: "colour"
  },
  kind: "processor",
  // Its alpha *is* a silhouette — a deliberate knockout, not a synthesised
  // constant — so inside a clip it must narrow the base's mask. That is the
  // whole mechanism: the holes are how the layers under the base show through.
  transformsSilhouette: !0,
  paramSchema: Yu,
  defaultParams: eb,
  buildLayer: tb
}, El = (e) => (e.mode ?? "shade") === "shade", ob = (e) => e.mode === "cutout", Uu = {
  // The first decision: does the falloff *tint* the frame or *remove* it. Both
  // run off the same shape, so switching is a live uniform, not a recompile.
  mode: {
    type: "dropdown",
    label: "Mode",
    options: [
      // Named by what you end up seeing, not by the maths — same rule as
      // Colour Cutout's menu.
      { label: "Shade", value: "shade" },
      { label: "Cut out", value: "cutout" }
    ],
    default: "shade",
    // Cut out narrows a clip's mask, so on an unclipped layer it removes alpha
    // nothing is looking at and the frame doesn't change. Say so on screen
    // rather than leaving the mode reading as broken.
    note: (e, t) => e.mode === "cutout" && !t.clipped ? "Clip this layer to the one below — the cutout reveals what sits under the base." : null,
    description: "Whether the falloff tints the frame or removes it. Shade darkens or glows toward Color; Cut out takes alpha away instead, which only shows once this layer is clipped to the one below."
  },
  color: {
    type: "color",
    label: "Color",
    default: "#000000",
    showIf: El,
    description: "The colour the shading tints toward. Shade only."
  },
  // Signed: positive darkens/tints toward Color (a classic vignette), negative
  // glows outward with it instead (a soft edge light-leak) — one control gives
  // both looks, and the sign decides which blend `layerFn` applies.
  amount: {
    type: "slider",
    label: "Amount",
    min: -100,
    max: 100,
    step: 1,
    default: 60,
    showIf: El,
    description: "How strong the shading is. Signed: positive darkens toward Color for a classic vignette, negative glows outward with it instead, for a soft edge light-leak. Shade only."
  },
  // Cut-out has no negative half — there is no "more than gone" — so it gets its
  // own 0–100 control rather than reusing half of Amount's range.
  strength: {
    type: "slider",
    label: "Strength",
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    showIf: ob,
    description: "How completely the cut-out removes what it covers. Cut out only, which has no negative half — there is no more than gone."
  },
  // Which side of the shape the effect lands on. Outside is the vignette proper;
  // Inside turns the same shape into a shadow/hole sitting in a clear frame.
  region: {
    type: "dropdown",
    label: "Affects",
    options: [
      { label: "Outside", value: "outside" },
      { label: "Inside", value: "inside" }
    ],
    default: "outside",
    description: "Which side of the shape is affected. Outside is the vignette proper, darkening the border. Inside inverts it, turning the same shape into a shadow or hole sitting in a clear frame."
  },
  radius: {
    type: "slider",
    label: "Radius",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    group: "Shape",
    description: "How large the untouched area in the middle is before the falloff starts."
  },
  softness: {
    type: "slider",
    label: "Softness",
    min: 0,
    max: 100,
    step: 1,
    default: 60,
    description: "How gradually the falloff arrives. 0 gives a hard-edged shape, 100 a long smooth ramp with no visible edge at all."
  },
  // 100 = ellipse matching the frame's own proportions (the classic photo
  // vignette); 0 = a soft rounded-rect that hugs the frame edges instead —
  // good for framing UI/title compositions rather than a photographic look.
  roundness: {
    type: "slider",
    label: "Roundness",
    min: 0,
    max: 100,
    step: 1,
    default: 100,
    description: "The shape of the falloff. 100 is an ellipse matching the frame's own proportions — the classic photographic vignette. 0 is a soft rounded rectangle hugging the frame edges instead, which frames a title or a UI composition better than a circle does."
  },
  // Signed: negative squeezes the shape into a tall slot, positive into a wide
  // band. With Rotation this is what turns a vignette into a raking shaft of
  // light rather than a circle.
  stretch: {
    type: "slider",
    label: "Stretch",
    min: -100,
    max: 100,
    step: 1,
    default: 0,
    description: "Squeezes the shape along one axis. Signed: negative narrows it into a tall slot, positive spreads it into a wide band. With Rotation this is what turns a vignette into a raking shaft of light."
  },
  rotation: {
    type: "slider",
    label: "Rotation",
    min: -180,
    max: 180,
    step: 1,
    default: 0,
    description: "Turns the shape, in degrees. Only visible once Stretch or Roundness has made it something other than a circle."
  },
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the centre of the falloff sideways, as a percentage of the frame. 0 is centred."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the centre of the falloff vertically, as a percentage of the frame. 0 is centred."
  },
  ...bt
}, ab = Object.fromEntries(
  Object.entries(Uu).map(([e, t]) => [e, t.default])
);
function nb(e, t) {
  const s = r(new p.Color(e.color)), o = r(Fl(e)), a = r(Ll(e)), n = r(new p.Vector2()), l = r(0), i = r(Rl(e.roundness)), u = r(new p.Vector2(1, 0)), d = r(e.region === "inside" ? 1 : 0), c = r(1), h = r(new p.Vector2(
    e.posX / 100 * 0.5,
    e.posY / 100 * 0.5
  )), m = Lt(e), x = (y) => {
    const k = rb(y);
    n.value.set(k.rx, k.ry), l.value = k.soft, u.value.set(k.cos, k.sin);
  };
  x(e);
  const g = (y) => {
    const k = t(y), A = y.x.sub(0.5).sub(h.x).sub(m.offset.x), O = y.y.sub(0.5).sub(h.y).sub(m.offset.y), R = A.mul(c), T = R.mul(u.x).add(O.mul(u.y)), C = O.mul(u.x).sub(R.mul(u.y)), P = we(T.div(n.x.mul(c))), F = we(C.div(n.y)), M = $e($e(P, i).add($e(F, i)), b(1).div(i)), I = Me(b(1), b(1).add(l), M), f = $(I, I.oneMinus(), d), D = ne(o, 0), L = ne(o.negate(), 0);
    let B = $(k.rgb, s, f.mul(D));
    return B = B.add(s.mul(f).mul(L)), ie(fe(B, 0, 1), k.a.mul(f.mul(a).oneMinus()));
  }, w = (y) => {
    s.value.set(y.color), o.value = Fl(y), a.value = Ll(y), i.value = Rl(y.roundness), d.value = y.region === "inside" ? 1 : 0, h.value.set(y.posX / 100 * 0.5, y.posY / 100 * 0.5), x(y), m.update(y);
  }, S = new p.Vector2();
  return { layerFn: g, updateUniforms: w, renderPass: (y) => {
    y.getDrawingBufferSize(S), c.value = S.x / Math.max(1, S.y), m.renderPass();
  } };
}
function Fl(e) {
  return (e.mode ?? "shade") !== "shade" ? 0 : e.amount / 100;
}
function Ll(e) {
  return e.mode !== "cutout" ? 0 : e.strength / 100;
}
function Rl(e) {
  return 10 - e / 100 * 8;
}
function rb(e) {
  const t = e.radius / 100 * 0.5, s = (e.stretch ?? 0) / 100, o = Math.max(t * Math.pow(2, s), 2e-3), a = Math.max(t * Math.pow(2, -s), 2e-3), n = (e.rotation ?? 0) * Math.PI / 180;
  return {
    rx: o,
    ry: a,
    soft: Math.max(e.softness / 100 * 0.6 / ((o + a) / 2), 1e-3),
    cos: Math.cos(n),
    sin: Math.sin(n)
  };
}
const ib = {
  meta: {
    id: "vignette",
    name: "Vignette",
    description: "Shade the frame edges, or cut them away so the layers below show through",
    keywords: ["darken edges", "frame", "border", "edge glow", "photo", "lens", "shading", "fade", "spotlight", "radial", "corners", "light leak", "mask", "erase", "hide", "oval", "ellipse", "feather", "matte"],
    group: "light"
  },
  kind: "processor",
  // Cut-out mode narrows alpha where it stands — a deliberate knockout, not a
  // synthesised constant — so inside a clip it must narrow the base's mask.
  // That is the whole mechanism: the soft edge is how the layers under the base
  // show through. In Shade mode the returned alpha is the input's own, which
  // reduces the compositor's fallback back to the ordinary base mask.
  transformsSilhouette: !0,
  paramSchema: Uu,
  defaultParams: ab,
  buildLayer: nb
}, ju = {
  // Structural: each gobo is a different noise construction, so it's read once
  // at build time rather than branched per pixel.
  pattern: {
    type: "dropdown",
    label: "Cast by",
    options: [
      // Named for the thing in the world that makes the shadow, because that is
      // what a designer is picturing — not for the maths that draws it.
      { label: "Foliage", value: "foliage" },
      { label: "Blinds", value: "blinds" },
      { label: "Window", value: "window" },
      { label: "Water", value: "water" },
      { label: "Cloud", value: "cloud" }
    ],
    default: "foliage",
    structural: !0,
    group: "Shadow",
    description: "What is casting the shadow. Named for the thing in the world rather than the maths: Foliage gives dappled leaf shadow, Blinds hard parallel slats, Window a mullioned rectangle, Water rippling caustics, Cloud slow soft masses."
  },
  scale: {
    type: "slider",
    label: "Scale",
    min: 5,
    max: 100,
    step: 1,
    default: 72,
    description: "How large the cast pattern is. Small reads as distant or fine-leaved, large as close and bold."
  },
  // Where the threshold sits in the pattern: low = a few dark shapes on a lit
  // wall, high = a few bright gaps in shade. The single most useful control
  // here, because it decides whether you're reading light or reading shadow.
  coverage: {
    type: "slider",
    label: "Coverage",
    min: 0,
    max: 100,
    step: 1,
    default: 56,
    description: "Where the threshold sits in the pattern, and the most useful control here — it decides whether you are reading light or reading shadow. Low gives a few dark shapes on a lit wall; high gives a few bright gaps in deep shade."
  },
  // Penumbra. A real shadow's edge softens with distance from whatever cast it,
  // and a hard-edged gobo is the fastest way to make this look like a sticker.
  softness: {
    type: "slider",
    label: "Softness",
    min: 0,
    max: 100,
    step: 1,
    default: 34,
    description: "The penumbra — how much the shadow edge softens. A real shadow's edge softens with distance from whatever cast it, and a hard-edged pattern is the fastest way to make this look like a sticker rather than light."
  },
  angle: {
    type: "slider",
    label: "Angle",
    min: -180,
    max: 180,
    step: 1,
    default: -25,
    description: "Which way the pattern is cast, in degrees."
  },
  // How it looks — the half that decides whether this reads as light at all.
  color: {
    type: "color",
    label: "Light",
    default: "#ffe9c8",
    group: "Light",
    description: "The colour of the light itself."
  },
  // Sunlight is warm and the shade is lit by the sky, so it goes cool — get that
  // one relationship right and almost anything reads as daylight. Signed, so
  // negative gives the opposite (cool key, warm bounce): overcast, or a screen.
  warmth: {
    type: "slider",
    label: "Warmth",
    min: -100,
    max: 100,
    step: 1,
    default: 80,
    description: "The split between key and shade. Sunlight is warm while shade is lit by the sky and goes cool — get that one relationship right and almost anything reads as daylight. Signed, so negative gives the opposite, a cool key with warm bounce: overcast, or a screen."
  },
  depth: {
    type: "slider",
    label: "Shadow depth",
    min: 0,
    max: 100,
    step: 1,
    default: 58,
    description: "How dark the shadowed areas go."
  },
  // Ambient fill. Nothing outdoors is ever fully unlit — light bounces back in
  // from everything around it, and without a floor the shadows crush to mud.
  bounce: {
    type: "slider",
    label: "Bounce",
    min: 0,
    max: 100,
    step: 1,
    default: 14,
    description: "Ambient fill in the shadows. Nothing outdoors is ever fully unlit — light bounces back from everything around it — and without a floor here the shadows crush to mud."
  },
  exposure: {
    type: "slider",
    label: "Exposure",
    min: -50,
    max: 100,
    step: 1,
    default: 14,
    description: "Overall brightness of the lit result. Signed."
  },
  // How it moves — always last.
  sway: {
    type: "slider",
    label: "Sway",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    group: "Animation",
    description: "How much the pattern moves in place, as leaves do in wind. 0 holds it still."
  },
  drift: {
    type: "slider",
    label: "Drift",
    min: -100,
    max: 100,
    step: 1,
    default: 12,
    description: "How fast the whole pattern travels across the frame, and which way. Signed. Distinct from Sway: this translates, Sway agitates."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 1,
    max: 100,
    step: 1,
    default: 22,
    description: "How fast the sway and drift run."
  },
  ...bt
}, lb = Object.fromEntries(
  Object.entries(ju).map(([e, t]) => [e, t.default])
);
function Dl(e, t, s) {
  switch (e) {
    case "blinds": {
      const o = Ae(t.y.mul(6.2831)).mul(0.5).add(0.5), a = De(te(t.mul(1.4), s)).mul(0.5).add(0.5);
      return $(o, o.mul(a.mul(0.5).add(0.75)), 0.55);
    }
    case "window": {
      const o = we(Ae(t.x.mul(3.1416))).pow(0.35), a = we(Ae(t.y.mul(3.1416))).pow(0.35), n = De(te(t.mul(2), s)).mul(0.5).add(0.5);
      return o.mul(a).mul(n.mul(0.35).add(0.8));
    }
    case "water": {
      const o = Bt(te(t, s), 3, 2, 0.5), a = Bt(te(t.yx.mul(1.3).add(4.7), s.mul(0.8)), 3, 2, 0.5);
      return we(o).oneMinus().mul(we(a).oneMinus()).pow(2.2);
    }
    case "cloud":
      return Bt(te(t.mul(0.6), s), 4, 2, 0.55).mul(0.5).add(0.5);
    case "foliage":
    default: {
      const o = De(te(t.mul(0.7), s.mul(0.8))), a = t.add(E(o, o.mul(0.6).add(0.4)).mul(0.9)), n = Bt(te(a.mul(0.55), s), 3, 2, 0.55).mul(0.5).add(0.5), l = oc(te(t.mul(1.15).add(11.3), s.mul(1.2)), b(1)).oneMinus();
      return n.mul(0.74).add(l.mul(0.34));
    }
  }
}
function cb(e, t) {
  const s = e.pattern, o = r(new p.Color(e.color)), a = r(0), n = r(0), l = r(0), i = r(new p.Vector2(1, 0)), u = r(0), d = r(0), c = r(0), h = r(0), m = r(0), x = r(1), g = r(0), w = r(0), S = r(0), v = r(0), y = r(0), k = r(0), A = r(0), O = Lt(e), R = (I, f, D) => {
    const B = E(I.x.sub(0.5).mul(x), I.y.sub(0.5)).sub(E(O.offset.x.mul(x), O.offset.y)), V = E(
      B.x.mul(i.x).add(B.y.mul(i.y)),
      B.y.mul(i.x).sub(B.x.mul(i.y))
    ).mul(a).add(E(D, 0)), Y = De(te(V.mul(0.35), f.mul(0.6))), U = De(te(V.mul(0.35).add(19.1), f.mul(0.6)));
    return V.add(E(Y, U).mul(m));
  }, T = (I) => {
    const f = t(I), D = g.mul(w), L = g.mul(S), B = $(D, k.mul(y), v), z = $(D, k.mul(y.sub(1)), v), V = $(L, A.mul(y), v), Y = $(L, A.mul(y.sub(1)), v), U = $(
      Dl(s, R(I, B, V), B),
      Dl(s, R(I, z, Y), z),
      y.mul(v)
    ), j = n.sub(l), X = ne(n.add(l), j.add(1e-3)), N = Me(j, X, U), G = ne(u, 0), W = ne(u.negate(), 0), J = $(te(1, 1, 1), te(1.06, 0.99, 0.88), G).mul($(te(1, 1, 1), te(0.9, 0.97, 1.08), W)), Q = $(te(1, 1, 1), te(0.86, 0.93, 1.1), G).mul($(te(1, 1, 1), te(1.08, 1, 0.9), W)), se = f.rgb.mul(J).mul(o).mul(h.add(1)), K = f.rgb.mul(Q).mul(d.oneMinus().max(c));
    return ie(fe($(K, se, N), 0, 1), f.a);
  }, C = (I) => {
    o.value.set(I.color), a.value = 220 / Math.max(5, I.scale), n.value = 0.15 + I.coverage / 100 * 0.7, l.value = I.softness / 100 * 0.45;
    const f = I.angle * Math.PI / 180;
    i.value.set(Math.cos(f), Math.sin(f)), u.value = I.warmth / 100, d.value = I.depth / 100, c.value = I.bounce / 100, h.value = I.exposure / 100, m.value = I.sway / 100 * 0.9, w.value = I.speed / 100 * 0.6, S.value = I.drift / 100 * 1.4;
  };
  C(e);
  const P = (I) => {
    C(I), O.update(I);
  }, F = new p.Vector2();
  return { layerFn: T, updateUniforms: P, renderPass: (I) => {
    I.getDrawingBufferSize(F), x.value = F.x / Math.max(1, F.y), g.value = Ce();
    const f = Qe();
    v.value = f.active ? 1 : 0, f.active && (y.value = Ne(), k.value = w.value * f.duration, A.value = S.value * f.duration), O.renderPass();
  } };
}
const ub = {
  meta: {
    id: "castLight",
    name: "Cast Light",
    description: "Daylight through leaves, a blind or a window — warm where it lands, cool in the shade",
    keywords: [
      "shadow",
      "shadows",
      "gobo",
      "dapple",
      "dappled",
      "sunlight",
      "sun",
      "daylight",
      "window light",
      "leaves",
      "foliage",
      "canopy",
      "blinds",
      "venetian",
      "louvre",
      "caustics",
      "water",
      "pool",
      "godray",
      "god rays",
      "lighting",
      "penumbra",
      "soft shadow",
      "wind",
      "breeze",
      "warm",
      "golden hour",
      "interior"
    ],
    group: "light"
  },
  kind: "processor",
  paramSchema: ju,
  defaultParams: lb,
  buildLayer: cb
}, $u = {
  // ── What emits ────────────────────────────────────────────────────────────
  // The rays are made of the artwork, so the first question is which parts of it
  // count as light. Everything above Threshold emits; everything below is an
  // occluder and casts the gaps between the shafts.
  threshold: {
    type: "slider",
    label: "Threshold",
    min: 0,
    max: 100,
    step: 1,
    default: 52,
    description: "How bright a part of the artwork must be to emit rays. The rays are made of the artwork itself, not laid over it, so this is the control that decides what counts as light — everything below it becomes an occluder and casts the gaps between the shafts."
  },
  // ── The shafts ────────────────────────────────────────────────────────────
  // How far along the line to the sun the smear reaches, as a share of that
  // distance. 100 marches the whole way, which is a full radial streak; the
  // useful range for something that still reads as *light* is well under half.
  reach: {
    type: "slider",
    label: "Reach",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    description: "How far the shafts extend toward the light source, as a share of the distance to it. 100 marches the whole way, which is a full radial streak; anything that still reads as light is usually well under half."
  },
  // How fast a sample dims as it walks back toward the sun. Low is a long even
  // shaft, high is a short flare hugging the emitter.
  falloff: {
    type: "slider",
    label: "Falloff",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    description: "How fast a shaft dims along its length. Low gives a long even beam, high a short flare hugging whatever emitted it."
  },
  intensity: {
    type: "slider",
    label: "Intensity",
    min: 0,
    max: 300,
    step: 1,
    default: 150,
    description: "How bright the shafts are drawn over the artwork. Above 100 overdrives, which pairs with Bloom."
  },
  // ── Colour ────────────────────────────────────────────────────────────────
  // Rays keep the colour of whatever threw them by default; Tint pulls them
  // toward this instead, which is how a mixed-colour frame still throws one
  // coherent shaft of sun.
  color: {
    type: "color",
    label: "Color",
    default: "#ffe1a8",
    group: "Light",
    description: "The colour the shafts are tinted toward. Only matters as far as Tint pulls them."
  },
  tint: {
    type: "slider",
    label: "Tint",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "How far the shafts take Color instead of the colour of whatever emitted them. 0 keeps each shaft the colour of its source; high unifies a mixed-colour frame into one coherent shaft of sun."
  },
  // ── Where the light is ────────────────────────────────────────────────────
  // The shared position convention, so the sun is draggable on canvas and earns
  // the Align control. ±200 lets it sit a full frame outside the canvas, which
  // is where a sun usually is.
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Where the light sits, sideways, as a percentage of the frame. The range reaches a full frame outside the canvas, which is where a sun usually is."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Where the light sits vertically. 0 is centred; negative puts it above the frame."
  },
  // ── Animation ─────────────────────────────────────────────────────────────
  // Dust in the beam: a slow noise around the fan that thins some shafts and
  // fattens others. It is the only motion built in, because the other one people
  // ask for — the sun travelling — is Position on the timeline, which is a
  // keyframe and not a param.
  shimmer: {
    type: "slider",
    label: "Shimmer",
    min: 0,
    max: 100,
    step: 1,
    default: 55,
    group: "Animation",
    description: "Dust in the beam — a slow drift that thins some shafts and fattens others. 0 gives clean static shafts."
  },
  detail: {
    type: "slider",
    label: "Detail",
    min: 1,
    max: 100,
    step: 1,
    default: 40,
    showIf: (e) => e.shimmer > 0,
    description: "How fine the shimmer variation is. Only once Shimmer is above 0."
  },
  speed: {
    type: "slider",
    label: "Speed",
    min: 1,
    max: 100,
    step: 1,
    default: 22,
    showIf: (e) => e.shimmer > 0,
    description: "How fast the shimmer drifts. Only once Shimmer is above 0."
  },
  ...bt
}, db = Object.fromEntries(
  Object.entries($u).map(([e, t]) => [e, t.default])
), Ro = 48, hb = 6.2, mb = 0.15, pb = 0.02, fb = te(0.2126, 0.7152, 0.0722), Hl = (e) => Re(e, fb), gb = (e) => Math.exp(-e.falloff / 100 * hb);
function bb(e, t) {
  const s = r(0), o = r(0), a = r(1), n = r(1 / Ro), l = r(0), i = r(new p.Color(e.color)), u = r(0), d = r(new p.Vector2(0, 0)), c = r(1), h = r(new p.Vector2(1, 1)), m = r(0), x = r(0), g = r(0), w = r(0), S = r(0), v = r(0), y = r(0), k = Lt(e), A = (f) => f.mul(Me(s, s.add(mb), Hl(f))), O = (f) => fe(ve(ve(f.x, f.y), ve(f.x.oneMinus(), f.y.oneMinus())).mul(1 / pb), 0, 1), R = (f, D, L) => {
    const B = te(Ve(f).mul(x), Ae(f).mul(x), D.mul(2.2).add(L));
    return Bt(B, 3, 2, 0.55).mul(0.5).add(0.5);
  }, T = st(([f]) => {
    const D = t(f), L = E(
      b(0.5).add(d.x).add(k.offset.x),
      b(0.5).add(d.y).add(k.offset.y)
    ).toVar(), B = f.sub(L).mul(o).div(Ro).toVar(), z = St(
      Be(f.x.mul(h.x)),
      Be(f.y.mul(h.y)),
      Be(b(7))
    ), V = f.sub(B.mul(z)).toVar(), Y = b(1).toVar(), U = te(0, 0, 0).toVar();
    os(Ro, () => {
      V.subAssign(B), U.addAssign(A(t(V).rgb).mul(Y).mul(O(V))), Y.mulAssign(a);
    });
    const j = U.mul(n).mul(l).toVar();
    j.assign($(j, i.mul(Hl(j)), u));
    const X = E(f.x.sub(L.x).mul(c), f.y.sub(L.y)).toVar(), N = Ut(X.y, X.x).toVar(), G = Pe(X).toVar(), W = R(N, G, $(g.mul(w), y.mul(v), S)).toVar();
    return ys(S.greaterThan(0.5), () => {
      W.assign($(W, R(N, G, y.mul(v.sub(1))), v));
    }), j.mulAssign(b(1).sub(m.mul(W.oneMinus()))), ie(D.rgb.add(j).clamp(0, 1), D.a);
  }), C = (f) => T(f), P = (f) => {
    s.value = f.threshold / 100, o.value = f.reach / 100, l.value = f.intensity / 100, i.value.set(f.color), u.value = f.tint / 100, d.value.set(f.posX / 100 * 0.5, f.posY / 100 * 0.5), m.value = f.shimmer / 100 * 0.85, x.value = 1.5 + f.detail / 100 * 14, w.value = f.speed / 100 * 0.8;
    const D = gb(f), L = Math.pow(D, 1 / Ro);
    a.value = L;
    const B = Math.abs(1 - L) < 1e-6 ? Ro : (1 - D) / (1 - L);
    n.value = 1 / Math.max(1e-6, B);
  };
  P(e);
  const F = (f) => {
    P(f), k.update(f);
  }, M = new p.Vector2();
  return { layerFn: C, updateUniforms: F, renderPass: (f) => {
    f.getDrawingBufferSize(M), c.value = M.x / Math.max(1, M.y), h.value.copy(M), g.value = Ce();
    const D = Qe();
    S.value = D.active ? 1 : 0, D.active && (v.value = Ne(), y.value = w.value * D.duration), k.renderPass();
  } };
}
const yb = {
  meta: {
    id: "godRays",
    name: "God Rays",
    description: "Shafts of light thrown by the bright parts of the layers below",
    keywords: [
      "god rays",
      "godrays",
      "crepuscular",
      "sunbeam",
      "sun beams",
      "light shaft",
      "shaft",
      "volumetric",
      "radial blur",
      "zoom blur",
      "streak",
      "scatter",
      "haze",
      "sunlight",
      "sun",
      "flare",
      "glow",
      "light",
      "dust",
      "beam"
    ],
    group: "light"
  },
  kind: "processor",
  // 48 taps along the march — see `resampling` in types/effects.ts. Without this
  // each tap would re-evaluate the whole stack below.
  resampling: !0,
  paramSchema: $u,
  defaultParams: db,
  buildLayer: bb
}, Nu = {
  // How hard each axis draws the far field out. Their *ratio* is the single most
  // expressive thing in the effect, because it is what curves the ribbons: a
  // ribbon's direction at any point is set by whichever axis is yielding fastest
  // there, so with Y strong and X gentle a ribbon leaves the artwork travelling
  // straight up and turns on its side as the slower horizontal give catches up.
  // Equal values never change that ratio, so every ribbon is a straight ray and
  // the effect is a starburst instead of a pour.
  //
  // This has to be per axis and a shared strength cannot stand in for it. One
  // Amount forces both axes to saturate together, and the moment it is high
  // enough to draw real ribbons vertically it has already flattened the whole
  // frame horizontally into blocks of colour — there is no setting that pours
  // one way and merely leans the other.
  stretchX: {
    type: "slider",
    label: "Stretch X",
    min: 0,
    max: 100,
    step: 1,
    default: 28,
    description: "How hard the horizontal axis draws the far field out. The ratio between this and Stretch Y is the most expressive thing in the effect: it is what curves the ribbons, because a ribbon travels in whichever direction is yielding fastest. Equal values never change that ratio, so every ribbon is a straight ray and you get a starburst instead of a pour."
  },
  stretchY: {
    type: "slider",
    label: "Stretch Y",
    min: 0,
    max: 100,
    step: 1,
    default: 46,
    description: "How hard the vertical axis draws the far field out. With Y strong and X gentle, a ribbon leaves the artwork travelling straight up and turns on its side as the slower horizontal give catches up."
  },
  // How far from the anchor each axis stays untouched — where the pull begins,
  // as opposed to how hard it pulls once it does.
  //
  // Two axes because one is not enough for the case this effect exists for. A
  // circular untouched region wide enough to hold a line of type is also tall
  // enough to hold the lines above and below it, so the pour has nowhere to
  // start; shrink it until they pour and it eats the ends off the words. A wide,
  // short ellipse keeps a line intact and lets go immediately above and below it.
  // Equal values give a circle on any canvas.
  reachX: {
    type: "slider",
    label: "Reach X",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    description: "How far from the anchor the horizontal axis stays untouched — where the pull begins, as opposed to how hard it pulls once it does."
  },
  reachY: {
    type: "slider",
    label: "Reach Y",
    min: 0,
    max: 100,
    step: 1,
    default: 20,
    description: "How far the vertical axis stays untouched. Two axes because one is not enough: a circular untouched region wide enough to hold a line of type is also tall enough to hold the lines above and below it, so nothing pours. A wide, short ellipse keeps a line intact and lets go immediately above and below it."
  },
  // How far past Reach the pull takes to arrive, measured against the frame. Short
  // and it happens at the edge and is over; long and it spreads across the frame,
  // which is what gives the ribbons room to bend rather than snapping straight out.
  falloff: {
    type: "slider",
    label: "Falloff",
    min: 0,
    max: 100,
    step: 1,
    default: 45,
    description: "How far past Reach the pull takes to arrive, measured against the frame. Short and it happens at the edge and is over; long and it spreads across the frame, which is what gives ribbons room to bend rather than snapping straight out."
  },
  // The *shape* of that arrival, by name. Linear pours evenly and reads as glass;
  // the In curves hold the artwork together and let go late; the Out curves let go
  // at the boundary and taper. See effects/easing.ts for why this previews on hover.
  ...su({ default: "inOutQuad" }),
  // Turns the whole construction, Reach ellipse and all. This is what makes the
  // effect general rather than a one-look preset: the same wide-and-short Reach
  // that pours downward pours sideways at 90°, or on a diagonal at 45°.
  angle: {
    type: "slider",
    label: "Angle",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "Turns the whole construction, Reach ellipse and all. This is what makes the effect general rather than one look: the same wide-and-short Reach that pours downward pours sideways at 90."
  },
  // Turns the two independent axes into one folded sheet.
  //
  // At 0 the axes are separate: each pours outward on its own and the frame reads
  // as blown out from a point. Turning it up ties the horizontal scale to how far
  // the surface has receded vertically, which is what a fold actually does — tip a
  // sheet away from the eye and it narrows in both directions at once. The frame
  // gains a horizon at the anchor line: rows near it converge and go edge-on,
  // rows out toward the edges spread and splay back toward the viewer.
  //
  // This is the difference between "squashed along Y" and "warped across a
  // dimension". Straight per-axis compression cannot produce the splay.
  //
  // At 100 the horizontal scale equals the vertical one exactly — honest
  // isotropic foreshortening, the sheet seen in perspective. Half is the
  // default because it keeps some independent horizontal give, which is what
  // lets Stretch X still mean something of its own.
  fold: {
    type: "slider",
    label: "Fold",
    min: 0,
    max: 100,
    step: 1,
    default: 50,
    description: "Ties the horizontal scale to how far the surface has receded vertically — what a fold actually does, since tipping a sheet away from the eye narrows it in both directions at once. At 0 the axes are independent and the frame reads as blown outward from a point. Raise it and the frame gains a horizon at the anchor: rows near it converge and go edge-on, rows further out splay back toward the viewer. At 100 it is honest isotropic foreshortening."
  },
  // Which way the warp runs, and the difference between this reading as a radial
  // effect and as the scene being stretched along a direction.
  //
  // Two pours away from the anchor on both sides at once — symmetric, and what
  // you want when the anchor sits inside the artwork. One gates the whole warp to
  // one half of the frame, so the other half stays exactly as drawn: the scene
  // gets stretched *across a dimension* rather than blown outward from a point.
  // Angle chooses which half.
  sides: {
    type: "dropdown",
    label: "Sides",
    options: [
      { label: "Two", value: "two" },
      { label: "One", value: "one" }
    ],
    default: "two",
    description: "Which way the warp runs. Two pours away from the anchor on both sides at once, which is what you want when the anchor sits inside the artwork. One gates the warp to a single half of the frame so the other half stays exactly as drawn — the scene stretched across a dimension rather than blown outward from a point. Angle chooses which half."
  },
  // Splits the per-channel strength rather than offsetting channels, so the
  // fringing is absent at the anchor and widens with the ribbon on its own —
  // the reason this isn't just Channel Split stacked on top.
  chromatic: {
    type: "slider",
    label: "Chrom. Dispersion",
    min: 0,
    max: 100,
    step: 1,
    default: 20,
    description: "How far the colour channels separate along the ribbons. This splits per-channel strength rather than offsetting channels, so the fringing is absent at the anchor and widens with the ribbon on its own — which is why it is not simply Channel Split stacked on top."
  },
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    group: "Position",
    description: "Moves the anchor sideways, as a percentage of the frame. The anchor is the untouched centre everything pours away from."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    description: "Moves the anchor vertically, as a percentage of the frame."
  },
  // Follow mouse moves the anchor, so the untouched region tracks the cursor and
  // the ribbons re-aim around it. Same block as Bulge and Bokeh.
  ...bt
}, wb = Object.fromEntries(
  Object.entries(Nu).map(([e, t]) => [e, t.default])
), vb = 0.72, xb = 0.02, ua = (e) => Math.max(xb, e / 100 * vb), da = (e) => 0.02 + e.falloff / 100 * 1.2, ha = (e) => {
  const t = 1 - e / 100 * 0.98;
  return t * t;
};
function Mb(e, t) {
  const s = r(ua(e.reachX)), o = r(ua(e.reachY)), a = r(da(e)), n = r(da(e) * ha(e.stretchX)), l = r(da(e) * ha(e.stretchY)), i = r(e.chromatic / 100 * 0.5), u = r(e.sides === "one" ? 1 : 0), d = r(e.fold / 100), c = ou(e), h = r(new p.Vector2(
    e.posX / 100 * 0.5,
    e.posY / 100 * 0.5
  )), m = r(new p.Vector2(1, 0)), x = r(1), g = Lt(e), w = (R) => {
    const T = h.x.add(g.offset.x), C = h.y.add(g.offset.y), P = E(R.x.sub(0.5).sub(T).mul(x), R.y.sub(0.5).sub(C)), F = E(
      P.x.mul(m.x).add(P.y.mul(m.y)),
      P.y.mul(m.x).sub(P.x.mul(m.y))
    ), M = we(F.x), I = we(F.y), f = (z, V, Y) => {
      const U = b(z), j = b(V), X = U.sub(j).div(a);
      return ve(U, j).add(c.apply(X).mul(b(Y)));
    }, D = (z) => $(b(1), z, $(b(1), pe(0, F.y), u)), L = (z, V, Y) => {
      const U = b(z);
      return b(1).add(f(U, V, Y).sub(U).div(ne(U, 1e-5)));
    };
    return { back: (z) => {
      const V = b(z), Y = D(L(M, s, n.mul(V))), U = D(L(I, o, l.mul(V))), j = $(Y, U, d), X = E(F.x.mul(j), F.y.mul(U));
      return E(
        X.x.mul(m.x).sub(X.y.mul(m.y)).div(x).add(0.5).add(T),
        X.x.mul(m.y).add(X.y.mul(m.x)).add(0.5).add(C)
      );
    } };
  }, S = Ke((R) => w(R).back(b(1))), v = (R) => {
    const { back: T } = w(R), C = t(S(R)), P = t(T(ne(b(1).sub(i), 0.05))).r, F = t(T(b(1).add(i))).b;
    return ie(P, C.g, F, C.a);
  };
  let y = e.angle * (Math.PI / 180);
  const k = (R) => {
    s.value = ua(R.reachX), o.value = ua(R.reachY), c.update(R);
    const T = da(R);
    a.value = T, n.value = T * ha(R.stretchX), l.value = T * ha(R.stretchY), i.value = R.chromatic / 100 * 0.5, u.value = R.sides === "one" ? 1 : 0, d.value = R.fold / 100, h.value.set(R.posX / 100 * 0.5, R.posY / 100 * 0.5), y = R.angle * (Math.PI / 180), m.value.set(Math.cos(y), Math.sin(y)), g.update(R);
  };
  m.value.set(Math.cos(y), Math.sin(y));
  const A = new p.Vector2();
  return { layerFn: v, updateUniforms: k, renderPass: (R) => {
    R.getDrawingBufferSize(A), x.value = A.x / Math.max(1, A.y), g.renderPass();
  }, warpUv: S };
}
const kb = {
  meta: {
    id: "pull",
    name: "Stretch",
    description: "Pulls the layers below away from a point into long, hard-edged ribbons",
    keywords: [
      "stretch",
      "pull",
      "taffy",
      "melt",
      "drip",
      "pour",
      "ribbon",
      "ribbons",
      "slit scan",
      "time warp",
      "liquify",
      "elongate",
      "smear",
      "zoom",
      "radial",
      "columns",
      "streak",
      "squash",
      "glass",
      "bend",
      "curve"
    ],
    group: "blur"
  },
  kind: "processor",
  // Three taps for the per-channel dispersion — see `resampling` in types/effects.ts.
  resampling: !0,
  // Warped UV — the silhouette stretches with the fill.
  transformsSilhouette: !0,
  paramSchema: Nu,
  defaultParams: wb,
  buildLayer: Mb
}, qu = {
  copies: {
    type: "slider",
    label: "Copies",
    min: 2,
    max: 64,
    step: 1,
    default: 16,
    description: "How many copies of the layers below make up the echo, the original included. Few copies read as distinct stamped steps; many close up into a solid, hard-edged extrusion."
  },
  distance: {
    type: "slider",
    label: "Distance",
    min: 0,
    max: 100,
    step: 1,
    default: 30,
    description: "How far the last copy sits from the original, as a share of the frame height. The copies are spread evenly along it, so Copies sets how dense the steps are and Distance how long the trail is."
  },
  angle: {
    type: "slider",
    label: "Angle",
    min: 0,
    max: 360,
    step: 1,
    default: 0,
    description: "Which way the copies step, in degrees. 0 runs right, 90 runs up."
  },
  order: {
    type: "dropdown",
    label: "In front",
    options: [
      { label: "Original", value: "first" },
      { label: "Last copy", value: "last" }
    ],
    default: "first",
    description: "Which end of the echo is on top. Original keeps the artwork whole with its copies stacked behind it, like an extrusion; Last copy lays each step over the one before, so every copy shows its leading edge."
  },
  tailColor: {
    type: "color",
    label: "Tail colour",
    default: "#1a0010",
    group: "Colour",
    description: "The colour the copies shift toward as they recede."
  },
  tint: {
    type: "slider",
    label: "Tint",
    min: 0,
    max: 100,
    step: 1,
    default: 80,
    description: "How far the last copy is pulled to the Tail colour. The copies between shift by degrees; 0 leaves every copy the colour of the original."
  },
  fade: {
    type: "slider",
    label: "Fade",
    min: 0,
    max: 100,
    step: 1,
    default: 0,
    description: "How transparent the last copy is. 0 keeps every copy solid; 100 lets the trail thin out to nothing."
  },
  scale: {
    type: "slider",
    label: "Scale",
    min: 25,
    max: 200,
    step: 1,
    default: 100,
    group: "Perspective",
    description: "The size of the last copy against the original, about the vanishing point. Under 100 the echo recedes into depth; over 100 it rushes forward."
  },
  // posX/posY is the shared position convention: it earns canvas dragging, the
  // arrow nudge and the Align control. Here it places the vanishing point Scale
  // works from, so it is hidden — and not draggable — while Scale is 100.
  posX: {
    type: "slider",
    label: "Position X",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    showIf: (e) => e.scale !== 100,
    description: "Moves the vanishing point sideways, as a percentage of the frame. 0 is centred. Put it behind the artwork so the copies recede into it rather than drifting toward the middle."
  },
  posY: {
    type: "slider",
    label: "Position Y",
    min: -200,
    max: 200,
    step: 1,
    default: 0,
    showIf: (e) => e.scale !== 100,
    description: "Moves the vanishing point vertically, as a percentage of the frame. 0 is centred."
  },
  // Follow mouse steers the trail, away from the cursor (a long shadow cast by a
  // light at the pointer) or toward it (the copies reach for it). Distance still
  // sets how far it reaches.
  ...bt,
  followSide: {
    type: "dropdown",
    label: "Trail runs",
    options: [
      { label: "Away from cursor", value: "away" },
      { label: "Toward cursor", value: "toward" }
    ],
    default: "away",
    group: "Interactivity",
    showIf: (e) => e._ixFollow > 0,
    description: "Which way the cursor swings the echo. Away runs the copies from the pointer like a shadow; Toward reaches them out to it. Only once Follow mouse is above 0."
  }
}, Sb = Object.fromEntries(
  Object.entries(qu).map(([e, t]) => [e, t.default])
), Pb = 0.8, Ol = 4, Yt = 4e-3, Ab = [
  [Yt, Yt],
  [0.5, Yt],
  [1 - Yt, Yt],
  [Yt, 0.5],
  [1 - Yt, 0.5],
  [Yt, 1 - Yt],
  [0.5, 1 - Yt],
  [1 - Yt, 1 - Yt]
], Bl = 0.04, Tb = 0.08, Cb = 0.06, Ib = 0.05;
function Eb(e, t) {
  const s = r(Ha(16)), o = r(15), a = r(new p.Vector2(0, 0)), n = r(0), l = r(new p.Color("#1a0010")), i = r(0), u = r(0), d = r(1), c = r(new p.Vector2(0.5, 0.5));
  let h = 0, m = 0, x = -1, g = 1;
  const w = Lt(e), S = (P) => pe(0, ve(ve(P.x, P.y), ve(P.x.oneMinus(), P.y.oneMinus()))), v = (P, F) => {
    const M = b(F), I = $(M, o.sub(M), n), f = I.div(ne(o, 1)), D = $(b(1), d, f);
    return { at: P.sub(a.mul(I)).sub(c).div(D).add(c), t: f };
  }, y = st(([P]) => {
    const F = Ab.map(([X, N]) => t(E(X, N)).toVar());
    let M = F[0], I = b(1e9);
    F.forEach((X, N) => {
      let G = b(0);
      F.forEach((J, Q) => {
        Q !== N && (G = G.add(Pe(X.sub(J))));
      });
      const W = G.lessThan(I).toVar();
      M = Ht(W, X, M).toVar(), I = Ht(W, G, I).toVar();
    });
    const f = M, D = f.rgb, L = f.a, B = te(0, 0, 0).toVar(), z = b(0).toVar(), V = b(0).toVar();
    os({ start: Ha(0), end: s, type: "int", condition: "<" }, ({ i: X }) => {
      const { at: N, t: G } = v(P, X), W = t(N), J = Pe(W.rgb.sub(D)).mul(S(N)).toVar();
      V.assign(ne(V, J));
      const Q = Me(0, Cb, xs(J).div(ne(V, 1e-3))), se = $(b(1), fe(J.div(ne(V, 1e-5)), Ib, 1), Q.mul(L)), K = D.add(W.rgb.sub(D).div(se)).saturate(), le = Me(Bl, Bl + Tb, J), ce = W.a.mul($(b(1), le.mul(se), L)).mul(S(N)).mul(b(1).sub(u.mul(G))), oe = $(K, l, i.mul(G)), de = ce.add(z.mul(ce.oneMinus()));
      B.assign(oe.mul(ce).add(B.mul(z).mul(ce.oneMinus())).div(ne(de, 1e-5))), z.assign(de);
    });
    const Y = t(P), U = z.add(Y.a.mul(z.oneMinus())), j = B.mul(z).add(Y.rgb.mul(Y.a).mul(z.oneMinus())).div(ne(U, 1e-5));
    return ie(j, U);
  }), k = (P) => y(P), A = (P, F) => st(([I]) => {
    const f = b(0).toVar();
    return os({ start: Ha(0), end: s, type: "int", condition: "<" }, ({ i: D }) => {
      const { at: L, t: B } = v(I, D), z = P(L).mul(S(L)).mul(b(1).sub(u.mul(B)));
      f.assign(z.add(f.mul(z.oneMinus())));
    }), f;
  })(F), O = (P) => {
    const F = Math.max(2, Math.round(P.copies));
    s.value = F, o.value = F - 1, n.value = P.order === "last" ? 0 : 1, l.value.set(P.tailColor), i.value = P.tint / 100, u.value = P.fade / 100, d.value = P.scale / 100, c.value.set(0.5 + P.posX / 200, 0.5 + P.posY / 200), h = P.angle * (Math.PI / 180), m = P.distance / 100 * Pb, x = P.followSide === "toward" ? 1 : -1, w.update(P), R();
  }, R = () => {
    const P = m / Math.max(1, o.value), F = Math.cos(h) + x * w.value.x * Ol, M = Math.sin(h) + x * w.value.y * Ol, I = Math.hypot(F, M) || 1;
    a.value.set(F / I * P / g, M / I * P);
  };
  O(e);
  const T = new p.Vector2();
  return { layerFn: k, updateUniforms: O, renderPass: (P) => {
    P.getDrawingBufferSize(T), g = T.x / Math.max(1, T.y), w.renderPass(), R();
  }, maskFn: A };
}
const Fb = {
  meta: {
    id: "echo",
    name: "Echo",
    description: "Repeats the layers below as a stepped run of hard-edged copies",
    keywords: [
      "extrude",
      "extrusion",
      "step and repeat",
      "repeat",
      "copies",
      "stack",
      "trail",
      "wake",
      "offset",
      "shadow",
      "long shadow",
      "stamp",
      "3d type"
    ],
    group: "distort"
  },
  kind: "processor",
  // It reads the stack below up to 73 times a pixel (the copies, the eight rim
  // points, the stack as it was), so it reads it from a texture. It used not to,
  // on the grounds that the reads sit in one shader-side `Loop` and so emit the
  // stack only once — true of the *shader's size*, not of what it runs: every
  // copy still ran the whole stack below per pixel. Two Echoes stacked, the top
  // one re-ran the lower one ~25 times and the lower one re-ran its stack ~15
  // times each, and a Noise Warp at the bottom of that took the GPU down with
  // the tab. From a texture they add instead of multiply. The texture keeps its
  // alpha (`resamplingKeepsAlpha`): each copy is nothing without its own.
  resampling: !0,
  resamplingKeepsAlpha: !0,
  // The trail carries the silhouette with it; one coordinate per copy, so the
  // mask is built by `maskFn` rather than a single `warpUv`.
  transformsSilhouette: !0,
  paramSchema: qu,
  defaultParams: Sb,
  buildLayer: Eb
}, Zu = {
  // Square folds on max(|x|, |y|), Circle on length — one uniform mix, so
  // switching is a live change rather than a recompile.
  shape: {
    type: "dropdown",
    label: "Shape",
    options: [
      { label: "Square", value: "square" },
      { label: "Circle", value: "circle" }
    ],
    default: "square",
    description: "The outline each copy is cut to. Square nests frames inside frames; Circle nests rings."
  },
  step: {
    type: "slider",
    label: "Step",
    min: 20,
    max: 90,
    step: 1,
    default: 50,
    description: "The size of each copy against the one around it. Low values nest a few wide bands with a big jump between them; high values pack many thin bands close together."
  },
  // Whole steps per loop, the way Bulge's Speed is whole breaths per loop: the
  // picture one step on is the picture it started from, so any integer closes
  // the loop at exactly the speed set. Nothing is rounded to get there.
  speed: {
    type: "slider",
    label: "Speed",
    min: -12,
    max: 12,
    step: 1,
    default: 1,
    group: "Animation",
    description: "How many steps the zoom travels in one loop, and which way. Positive flies in, so the copies grow toward you; negative flies out. Whole numbers only, which is what keeps the zoom seamless. 0 holds it still."
  },
  // A hard turn per band, not a spin: a band keeps its angle as it grows. The
  // whole picture therefore comes home turned by Twist × Speed at the loop
  // point, and seams unless that is a whole number of turns.
  twist: {
    type: "slider",
    label: "Twist",
    min: -180,
    max: 180,
    step: 1,
    default: 0,
    description: "How far each copy is turned against the one around it, in degrees. 90 keeps square frames square while turning what is inside them. The loop closes when Twist × Speed is a whole number of turns — 90 at Speed 4, 180 at Speed 2 — and seams otherwise."
  }
}, Lb = Object.fromEntries(
  Object.entries(Zu).map(([e, t]) => [e, t.default])
);
function Rb(e, t) {
  const s = r(1), o = r(e.shape === "circle" ? 1 : 0), a = r(Math.log(100 / e.step)), n = r(0), l = r(e.twist * Math.PI / 180), i = r(0.5);
  let u = Math.round(e.speed);
  const d = Ke((g) => {
    const w = E(g.x.sub(0.5).mul(s), g.y.sub(0.5)), S = ne(we(w.x), we(w.y)), v = ne($(S, Pe(w), o), b(1e-6)), y = Ue(Rd(v.div(i)).div(a).sub(n)), k = w.mul(Rt(y.add(1).add(n).mul(a).negate())), A = y.mul(l).negate(), O = Ve(A), R = Ae(A), T = E(k.x.mul(O).sub(k.y.mul(R)), k.x.mul(R).add(k.y.mul(O)));
    return E(T.x.div(s).add(0.5), T.y.add(0.5));
  }), c = (g) => t(d(g)), h = (g) => {
    o.value = g.shape === "circle" ? 1 : 0, a.value = Math.log(100 / g.step), l.value = g.twist * Math.PI / 180, u = Math.round(g.speed);
  }, m = new p.Vector2();
  return { layerFn: c, updateUniforms: h, renderPass: (g) => {
    g.getDrawingBufferSize(m), s.value = m.x / Math.max(1, m.y), i.value = 0.5 * Math.min(1, s.value);
    const w = Qe().duration > 0 ? Ne() : 0;
    n.value = w * u;
  }, warpUv: d };
}
const Db = {
  meta: {
    id: "droste",
    name: "Droste",
    description: "Nests the layers below inside themselves forever, and zooms through them",
    keywords: ["infinite", "zoom", "endless", "recursion", "nested", "tunnel", "mise en abyme", "frames", "repeat", "fly", "loop"],
    group: "distort"
  },
  kind: "processor",
  // The whole silhouette is folded with the fill, so a clipped Droste nests its
  // own cutout rather than showing the bands through one unnested shape.
  transformsSilhouette: !0,
  paramSchema: Zu,
  defaultParams: Lb,
  buildLayer: Rb
}, Qt = {
  background: Nd,
  gradient: jd,
  noiseFill: L0,
  voronoi: Gg,
  pattern: qg,
  reaction: s1,
  metaballs: i1,
  flowField: H0,
  trail: J1,
  text: mm,
  image: ym,
  video: Mm,
  audio: Tm,
  camera: Fm,
  cameraSignal: Nm,
  shape2d: Z0,
  shape: I0,
  mouseTrail: om,
  adjust: zp,
  vignette: ib,
  blur: bp,
  diffuse: Pp,
  kuwahara: Gp,
  noiseWarp: jp,
  smudge: Zp,
  fluid: uf,
  light: ff,
  sheen: vf,
  liquidMetal: Pf,
  heatmap: Ef,
  meshGradient: Rf,
  dotGrid: Vf,
  gemSmoke: Gf,
  castLight: ub,
  godRays: yb,
  beam: vg,
  blobTracker: dg,
  dither: oh,
  glyphDither: lh,
  posterize: ph,
  pixelate: bh,
  subdivide: Ch,
  tile: Fh,
  kaleidoscope: Vh,
  channelSplit: Wh,
  glitch: jh,
  pixelSort: qh,
  grain: Qm,
  crt: op,
  blinds: ip,
  stretch: up,
  pull: kb,
  echo: Fb,
  droste: Db,
  bloom: pp,
  bokeh: q1,
  lensDistort: u1,
  bulge: f1,
  twirl: k1,
  cloth: C1,
  cylinder: O1,
  floor: X1,
  envelope: U1,
  outline: kg,
  topoLines: Tg,
  duotone: Fg,
  colorCutout: sb,
  halftone: Dg,
  engraving: Vg
}, Hb = {
  _mxDriftX: {
    type: "slider",
    label: "Drift X",
    min: -100,
    max: 100,
    step: 1,
    default: 0
  },
  _mxDriftY: {
    type: "slider",
    label: "Drift Y",
    min: -100,
    max: 100,
    step: 1,
    default: 0
  },
  _mxSpeed: {
    type: "slider",
    label: "Drift speed",
    min: 1,
    max: 100,
    step: 1,
    default: 30,
    showIf: (e) => Yo(e._mxDriftX) !== 0 || Yo(e._mxDriftY) !== 0
  }
}, hn = Object.fromEntries(
  Object.entries(Hb).map(([e, t]) => [e, t.default])
);
function Yo(e) {
  return typeof e == "number" ? e : 0;
}
const zl = 0.3;
function Vl(e) {
  const t = r(0), s = r(0), o = r(0), a = r(0), n = (u) => {
    t.value = Yo(u._mxDriftX ?? hn._mxDriftX) / 100 * zl, s.value = Yo(u._mxDriftY ?? hn._mxDriftY) / 100 * zl, o.value = Yo(u._mxSpeed ?? hn._mxSpeed) / 100 * 1.5;
  };
  return n(e), { wrap: (u) => (d) => {
    const c = a.mul(o), h = E(t.mul(Ae(c)), s.mul(Ae(c.add(b(1.5)))));
    return u(d.sub(h));
  }, update: n, renderPass: () => {
    a.value = Ce();
  } };
}
function Fn(e, t) {
  var s, o;
  return (e.params[t] ?? 0) !== 0 || !!((s = e.tracks) != null && s[t]) || !!((o = e.mods) != null && o[t]);
}
const _l = {
  background: 1,
  gradient: 2,
  pattern: 2,
  reaction: 4,
  noiseFill: 3,
  flowField: 6,
  text: 1,
  image: 1,
  video: 1,
  camera: 1,
  // Draws a transparent quad and nothing else; the work it does is on the CPU,
  // which this model does not price. (The Audio layer has no entry and so falls
  // back to 2 — wrong, but changing it changes every existing scene's headroom.
  // Recorded in docs/LIVE-INPUT.md rather than fixed here.)
  cameraSignal: 0.5,
  shape2d: 1,
  shape: 6,
  mouseTrail: 2.5,
  adjust: 1,
  vignette: 1,
  blur: 3,
  diffuse: 3,
  kuwahara: 3,
  noiseWarp: 4,
  smudge: 7,
  fluid: 7,
  light: 2,
  blobTracker: 5,
  dither: 2,
  castLight: 4,
  godRays: 3,
  sheen: 2.5,
  liquidMetal: 3,
  heatmap: 4,
  meshGradient: 1.5,
  dotGrid: 2.5,
  gemSmoke: 4,
  glyphDither: 3,
  posterize: 1,
  pixelate: 1,
  tile: 1.5,
  kaleidoscope: 1.5,
  channelSplit: 1.5,
  subdivide: 2,
  glitch: 2,
  pixelSort: 5,
  grain: 1,
  crt: 2,
  blinds: 1.5,
  stretch: 3,
  echo: 3,
  droste: 1.5,
  bloom: 2,
  beam: 2.5,
  outline: 2,
  topoLines: 2,
  duotone: 2,
  halftone: 2,
  engraving: 2.5,
  voronoi: 5,
  metaballs: 5,
  bokeh: 2.5,
  lensDistort: 1.5,
  bulge: 1.5,
  twirl: 1.5,
  cloth: 2,
  cylinder: 1.5,
  floor: 3,
  trail: 6
}, qt = (e, t, s) => {
  const o = e[t];
  return typeof o == "number" ? o : s;
};
function Xl(e) {
  let t = 0;
  return e.surface === "glass" ? t += 4 : e.surface === "mirror" && (t += 1), qt(e, "distort", 0) > 0 && (t += 2), t += 1, t;
}
const Ob = 0.05;
function Ku(e) {
  var o;
  if (!e.visible) return 0;
  let t = _l[e.effectType] ?? 2;
  const s = e.params;
  switch (e.effectType) {
    // Motion Blur integrates a path through the trail's velocity field (two runs
    // of the 32-node ring buffer) and then takes 40 texture taps along it. Every
    // other mode is one run and one tap, which is what the base weight covers.
    case "mouseTrail":
      s.effect === "motionBlur" ? t += 3 : s.effect === "pixelate" && (t += 1);
      break;
    case "shape":
      t += Xl(s), s.repeat && s.repeat !== "none" && (t += Math.min(6, qt(s, "count", 6) * 0.3));
      break;
    // Depth turns a flat layer into a mesh in a perspective camera with the
    // same render passes the 3D Model layer has — so it has to be priced like
    // one. Left at the flat weight, Auto read a glass extrusion as costing
    // about as much as a rectangle, opened the scene at a resolution it could
    // not hold, and the perf panel pointed at the wrong layer.
    case "shape2d":
    case "image":
      qt(s, "depth", 0) > 0 && (t += _l.shape - t + Xl(s));
      break;
    // Diffuse's Softness is free too: all thirty-two taps are always built and
    // the slider only weights them, so one tap and thirty-two cost the same.
    // Blur / Bloom / Kuwahara radius is free now: the tap count is fixed and each
    // tap is one fetch from the input texture, so a wide radius costs the same as
    // a narrow one.
    // Two Perlin lattice lookups per pixel, and Turbulent makes it six — three
    // octaves of each. Measured on a bare gradient at 4 MPix: the background
    // alone 0.9 ms/frame, Simplex 3.3, Turbulent 6.7, so the Type dropdown is
    // worth more than everything else on this layer put together. Auto reads
    // this number to pick its starting resolution, so leaving Turbulent priced
    // as Simplex is what had it open a heavy scene too big and stutter its way
    // back down.
    // Sixty-four texture fetches per pixel — the widest kernel in the app, and
    // priced for years at 3, below a 3D stage and level with Diffuse's 32. The
    // tap *count* is fixed, but the cost is not: the taps spread with the
    // radius, and past a few dozen pixels apart every one of them misses the
    // texture cache. At radius 72 on a 2× buffer they land ~46px apart, and one
    // such layer was the difference between a scene holding 60fps and not.
    //
    // Still a feel-tuned number rather than a measured one, like everything
    // here — but the old one said this layer was cheap, which was the opposite
    // of true.
    case "blur":
      t += 5 + qt(s, "radius", 20) / 100 * 8;
      break;
    // Half a Blur: 32 taps over the same reach (`MAX_RADIUS` is matched to
    // Blur's on purpose), so the taps sit even further apart and miss the cache
    // just as hard. Softness really is free — all 32 are always built and the
    // slider only weights them — but the radius is not. Priced at 3 it read as
    // a cheap layer, which is how a scene with a wide one opened too big.
    //
    // Deliberately *only* the price: Diffuse cannot take Blur's reduced-source
    // treatment. Those 32 scattered taps are what makes it a shuffle rather
    // than a softening, and a coarser source would shuffle blocks instead of
    // pixels — a change to what the effect *is*, not to how fast it runs.
    case "diffuse":
      t += 2.5 + qt(s, "radius", 30) / 100 * 4;
      break;
    // Roundness or Size variety swaps in the power-diagram build: a 5×5 search
    // instead of 3×3 (25 animated points, not 9) plus a smooth min over all of
    // them. Feel-tuned like the rest — roughly three times the plain field.
    // Same test the compositor uses to decide which build to compile.
    case "voronoi":
      (Fn(e, "roundness") || Fn(e, "variety")) && (t += 6);
      break;
    case "noiseWarp":
      t += qt(s, "amount", 0) * 0.02, s.detail === "turbulent" && (t += 7);
      break;
    // Five walk steps × three noise taps each; Marbled doubles every tap.
    case "smudge":
      s.texture === "marbled" && (t += 6);
      break;
    // Detail reads the input four times per level; Chance not at all.
    case "subdivide":
      s.source === "detail" && (t += 3);
      break;
    // The march is a fixed 48 fetches from the input texture, so Reach and
    // Falloff are free — the base weight covers it. Shimmer is the only thing on
    // this layer that moves the needle: two three-octave fractal noises, once
    // per pixel.
    case "echo":
      t += qt(s, "copies", 16) * Ob;
      break;
    case "godRays":
      qt(s, "shimmer", 0) > 0 && (t += 2);
      break;
    case "gradient":
      qt(s, "warp", 0) > 0 && (t += 1);
      break;
    // A gradient fill is the Gradient layer's own ramp (buildRamp), so it costs
    // what Gradient costs; only a solid fill is the base weight's flat colour.
    case "background":
      s.fill !== "solid" && (t += 1), s.fill !== "solid" && qt(s, "warp", 0) > 0 && (t += 1);
      break;
    case "trail":
      qt(s, "turbulence", 0) > 0 && (t += 2);
      break;
  }
  return e.clipped && (t += 1), e.clipped && ((o = Qt[e.effectType]) != null && o.resampling) && (t += 2), t;
}
function Bb(e, t, s = !1, o = !1) {
  const a = new p.RenderTarget(2, 2, {
    minFilter: o ? p.LinearMipmapLinearFilter : p.LinearFilter,
    magFilter: p.LinearFilter,
    type: p.HalfFloatType,
    depthBuffer: !1,
    stencilBuffer: !1,
    generateMipmaps: o
  });
  a.texture.wrapS = p.ClampToEdgeWrapping, a.texture.wrapT = p.ClampToEdgeWrapping;
  const n = new p.Scene(), l = new p.OrthographicCamera(-1, 1, 1, -1, 0, 1), i = new p.MeshBasicNodeMaterial();
  if (s) {
    i.blending = p.NoBlending;
    const S = e(vs());
    i.colorNode = ie(S.rgb.mul(S.a), S.a);
  } else
    i.colorNode = e(vs());
  const u = new p.PlaneGeometry(2, 2);
  n.add(new p.Mesh(u, i));
  const d = (S, v) => {
    const y = nt(a.texture, E(S.x, S.y.oneMinus()));
    return v ? y.level(v) : o ? y.level(b(0)) : y;
  }, c = (S) => s ? ie(S.rgb.div(ne(S.a, 1e-5)), S.a) : S, h = (S) => c(d(S)), m = o ? (S, v) => c(d(S, v)) : void 0, x = new p.Vector2();
  return { input: h, inputLevel: m, pass: (S) => {
    S.getDrawingBufferSize(x);
    const v = Math.max(1, (t == null ? void 0 : t()) ?? 1), y = Math.max(2, Math.round(x.x / v)), k = Math.max(2, Math.round(x.y / v));
    (a.width !== y || a.height !== k) && a.setSize(y, k);
    const A = S.getRenderTarget();
    S.setRenderTarget(a), S.render(n, l), S.setRenderTarget(A);
  }, dispose: () => {
    a.dispose(), i.dispose(), u.dispose();
  } };
}
const zb = 24, Vb = 72, _b = 12, Xb = () => ie(0, 0, 0, 1);
function Xs(e, t, s) {
  switch (s) {
    case "multiply":
      return e.mul(t);
    case "screen":
      return e.oneMinus().mul(t.oneMinus()).oneMinus();
    case "add":
      return e.add(t).clamp(0, 1);
    case "overlay": {
      const o = e.mul(t).mul(2), a = e.oneMinus().mul(t.oneMinus()).mul(2).oneMinus(), n = pe(0.5, e);
      return $(o, a, n);
    }
    case "normal":
    default:
      return t;
  }
}
function Wl(e, t, s, o) {
  return $(e, Xs(e, t, s), o);
}
function Do(e) {
  const t = /* @__PURE__ */ new Map();
  return (s) => {
    const o = t.get(s);
    if (o !== void 0) return o;
    const a = e(s);
    return t.set(s, a), a;
  };
}
function Wb(e) {
  const t = /* @__PURE__ */ new Set();
  for (let s = 0; s < e.length; s++) {
    if (!e[s].clipped) continue;
    const o = e[s].clipMode;
    if (!(o !== "inside" && o !== "outside")) {
      for (let a = s + 1; a < e.length; a++)
        if (!e[a].clipped) {
          t.add(e[a].id);
          break;
        }
    }
  }
  return t;
}
function Gl(e) {
  var t;
  return e.blendMode === "normal" && e.opacity === 1 && !((t = e.tracks) != null && t.opacity);
}
function Gb(e) {
  var S;
  let t = Vb, s = 0;
  const o = [];
  for (const v of e) {
    if (!v.visible) continue;
    if (o.length >= zb) break;
    const y = Math.max(0.5, Ku(v));
    if (!(t - y < 0)) {
      if ((S = Qt[v.effectType]) != null && S.resampling) {
        if (s >= _b) continue;
        s++;
      }
      t -= y, o.push(v);
    }
  }
  const a = [...o].reverse(), n = Wb(o), l = /* @__PURE__ */ new Map(), i = [], u = [], d = /* @__PURE__ */ new Map();
  let c = Xb, h = null, m = null;
  const x = (v) => v;
  let g = x, w = null;
  for (const v of a) {
    const y = Qt[v.effectType];
    if (!y) continue;
    const k = r(v.opacity);
    d.set(v.id, k);
    const A = m, O = !!v.clipped && A !== null, R = O && (v.clipMode === "inside" || v.clipMode === "outside"), T = O && v.clipMode === "outside", C = h, P = Do(c), F = O && !R && !!C && y.kind === "processor";
    let M = P;
    F && C && (M = (X) => {
      const N = C.rawFn(X);
      return ie(N.rgb, N.a.mul(C.opacityNode));
    });
    let I = P, f;
    if (y.resampling) {
      const X = !!y.resamplingScale && Gl(v) && !R, N = Bb(
        M,
        X ? () => y.resamplingScale(v.params) : void 0,
        !!y.resamplingKeepsAlpha,
        !!y.resamplingMipmaps
      );
      i.push(N.pass), u.push(N.dispose), M = N.input, f = N.inputLevel, !F && !X && (I = N.input);
    }
    const D = y.buildLayer(v.params, M, { live: (X) => Fn(v, X), inputLevel: f }), { updateUniforms: L, renderPass: B, dispose: z } = D;
    B && i.push(B), z && u.push(z);
    let V = D.layerFn;
    const Y = typeof y.selfPositioned == "function" ? y.selfPositioned(v.params) : !!y.selfPositioned;
    if (y.kind === "generator" && !Y && y.ownsPointer) {
      const X = Vl(v.params);
      V = X.wrap(V), i.push(X.renderPass), l.set(v.id, (N) => {
        L(N), X.update(N);
      });
    } else if (y.kind === "generator" && !Y) {
      const X = Oh(v.params), N = Vl(v.params);
      V = X.wrap(N.wrap(V)), i.push(X.renderPass), i.push(N.renderPass), l.set(v.id, (G) => {
        L(G), X.update(G), N.update(G);
      });
    } else
      l.set(v.id, L);
    V = Do(V);
    const U = v.blendMode, j = A ? (X) => A.rawFn(X).a.mul(A.opacityNode) : null;
    if (R && j && y.kind === "processor")
      c = (X) => {
        const N = I(X), G = V(X), W = Xs(N.rgb, G.rgb, U), J = $(N.rgb, W, k), Q = j(X), se = $(N.rgb, J, T ? Q.oneMinus() : Q);
        return ie(se, G.a);
      };
    else if (O && A && y.kind === "processor") {
      const X = A.belowInput, N = g;
      c = (G) => {
        const W = X(G), J = A.rawFn(N(G)), Q = V(G), se = Xs(J.rgb, Q.rgb, U), K = $(J.rgb, se, k), le = y.transformsSilhouette ? D.warpUv : void 0;
        let ce;
        if (y.transformsSilhouette && D.maskFn) {
          const de = (me) => A.rawFn(N(me)).a;
          ce = $(de(G), D.maskFn(de, G), k).mul(A.opacityNode);
        } else le ? ce = $(J.a, A.rawFn(N(le(G))).a, k).mul(A.opacityNode) : y.transformsSilhouette ? ce = J.a.mul($(b(1), Q.a, k)).mul(A.opacityNode) : ce = J.a.mul(A.opacityNode);
        const oe = Wl(W.rgb, K, A.blendMode, ce);
        return ie(oe, b(1));
      }, w = Do((G) => {
        const W = A.rawFn(N(G)), J = V(G), Q = Xs(W.rgb, J.rgb, U);
        return $(W.rgb, Q, k);
      });
    } else if (!n.has(v.id)) if (y.kind === "generator") {
      const X = g, N = O && j ? (W) => j(X(W)) : null, G = N ? T ? (W) => N(W).oneMinus() : N : null;
      if (O && !R && A && N) {
        const W = A.belowInput, J = w ?? ((K) => A.rawFn(X(K)).rgb), Q = Do((K) => {
          const le = J(K), ce = V(K), oe = Xs(le, ce.rgb, U);
          return $(le, oe, ce.a.mul(k));
        });
        w = Q;
        const se = A.blendMode;
        c = (K) => {
          const le = W(K).rgb, ce = Wl(
            le,
            Q(K),
            se,
            N(K)
          );
          return ie(ce, b(1));
        };
      } else
        c = (W) => {
          const J = P(W), Q = V(W), se = Xs(J.rgb, Q.rgb, U);
          let K = Q.a.mul(k);
          G && (K = K.mul(G(W)));
          const le = $(J.rgb, se, K);
          return ie(le, b(1));
        };
    } else
      c = Gl(v) ? V : (X) => {
        const N = I(X), G = V(X), W = Xs(N.rgb, G.rgb, U), J = $(N.rgb, W, k);
        return ie(J, G.a);
      };
    if (h = { rawFn: V, belowInput: I, opacityNode: k, blendMode: U }, !O && y.kind === "processor" && D.coverageFn) {
      const X = D.coverageFn, N = c;
      h = {
        ...h,
        rawFn: Do((G) => ie(V(G).rgb, X(G))),
        belowInput: N
      };
    }
    if (!O)
      m = h, g = x, w = null;
    else if (y.transformsSilhouette && D.warpUv) {
      const X = g, N = D.warpUv;
      g = (G) => X(N(G));
    }
  }
  return { colorNode: c(vs()), updaters: l, passes: i, disposers: u, opacityUniforms: d };
}
const Yl = 6;
function Yb(e, t) {
  switch (e) {
    case "in":
      return t * t;
    case "out":
      return 1 - (1 - t) * (1 - t);
    case "inOut":
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    default:
      return t;
  }
}
const Ul = (e) => typeof e == "object" && e !== null && Array.isArray(e.stops), jl = (e) => {
  const t = e.replace("#", ""), s = t.length === 3 ? t.split("").map((a) => a + a).join("") : t.padEnd(6, "0").slice(0, 6), o = parseInt(s, 16);
  return [o >> 16 & 255, o >> 8 & 255, o & 255];
}, Ub = (e, t, s) => "#" + [e, t, s].map((o) => Math.round(Math.max(0, Math.min(255, o))).toString(16).padStart(2, "0")).join(""), po = (e, t, s) => e + (t - e) * s;
function Qu(e, t, s) {
  const o = jl(e), a = jl(t);
  return Ub(po(o[0], a[0], s), po(o[1], a[1], s), po(o[2], a[2], s));
}
function jb(e, t, s) {
  const o = Math.min(e.stops.length, t.stops.length), a = e.stops.map(
    (n, l) => l < o ? { color: Qu(n.color, t.stops[l].color, s), pos: po(n.pos, t.stops[l].pos, s) } : { ...n }
  );
  return { type: e.type, angle: po(e.angle ?? 90, t.angle ?? 90, s), stops: a };
}
function $b(e, t, s) {
  return typeof e == "number" && typeof t == "number" ? po(e, t, s) : typeof e == "string" && typeof t == "string" ? Qu(e, t, s) : Ul(e) && Ul(t) ? jb(e, t, s) : s < 1 ? e : t;
}
function Nb(e, t) {
  const s = e.keys;
  if (s.length === 0) return null;
  if (s.length === 1 || t <= s[0].t) return s[0].value;
  const o = s[s.length - 1];
  if (t >= o.t) return o.value;
  for (let a = 0; a < s.length - 1; a++) {
    const n = s[a], l = s[a + 1];
    if (t >= n.t && t <= l.t) {
      const i = l.t - n.t || 1;
      return $b(n.value, l.value, Yb(n.ease, (t - n.t) / i));
    }
  }
  return o.value;
}
function qb(e, t) {
  const s = {};
  if (!e.tracks) return s;
  for (const o in e.tracks) {
    const a = Nb(e.tracks[o], t);
    a != null && (s[o] = a);
  }
  return s;
}
const Ju = {
  level: "audio",
  low: "audio",
  mid: "audio",
  high: "audio",
  motion: "camera",
  moveX: "camera",
  moveY: "camera",
  presence: "camera",
  bright: "camera"
}, Zb = /* @__PURE__ */ new Set(["moveX", "moveY"]);
function ed(e) {
  return typeof e == "string" && e in Ju;
}
function Kb() {
  const e = Pm(), t = Rm();
  return {
    value: {
      level: e.level,
      low: e.low,
      mid: e.mid,
      high: e.high,
      motion: t.motion,
      moveX: t.moveX,
      moveY: t.moveY,
      presence: t.presence,
      bright: t.bright
    },
    live: { audio: e.active, camera: t.active }
  };
}
const Qs = {
  maxLayers: 24,
  maxVisibleCost: 72,
  minDim: 64,
  maxDim: 4096,
  minDuration: 0.5,
  maxDuration: 60,
  blendModes: ["normal", "multiply", "screen", "overlay", "add"]
}, Qb = Qs.maxLayers, Jb = Qs.maxVisibleCost, $l = Qs.minDim, Nl = Qs.maxDim, ey = Qs.minDuration, ty = Qs.maxDuration, sy = new Set(Qs.blendModes), io = (e, t, s) => Math.min(s, Math.max(t, e));
function lo(e, t) {
  return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function oy(e, t) {
  var o;
  if (!e || typeof e != "object") return;
  let s;
  for (const [a, n] of Object.entries(e)) {
    if (!n || typeof n != "object" || !ed(n.src) || ((o = t[a]) == null ? void 0 : o.type) !== "slider") continue;
    const l = io(lo(n.amount, 0), -100, 100);
    (s ?? (s = {}))[a] = { src: n.src, amount: l };
  }
  return s;
}
function ql(e) {
  var a;
  let t = Jb;
  const s = (e.layers ?? []).slice(0, Qb).map((n) => {
    const l = Qt[n.effectType];
    if (!l) return null;
    const i = l.paramSchema ?? {}, u = { ...l.defaultParams, ...n.params };
    for (const [h, m] of Object.entries(i))
      if (m.type === "slider") {
        const x = m;
        u[h] = io(lo(u[h], x.default), x.min, x.max);
      }
    const d = oy(n.mods, i), c = {
      ...n,
      params: u,
      opacity: io(lo(n.opacity, 1), 0, 1),
      blendMode: sy.has(n.blendMode) ? n.blendMode : "normal",
      ...d ? { mods: d } : {}
    };
    if (d || delete c.mods, c.visible) {
      const h = Math.max(0.5, Ku(c));
      t - h < 0 ? c.visible = !1 : t -= h;
    }
    return c;
  }).filter((n) => !!n), o = s.some((n) => n.id === e.selectedLayerId) ? e.selectedLayerId : ((a = s[0]) == null ? void 0 : a.id) ?? null;
  return {
    ...e,
    width: io(lo(e.width, 1080), $l, Nl),
    height: io(lo(e.height, 1080), $l, Nl),
    duration: io(lo(e.duration, 6), ey, ty),
    selectedLayerId: o,
    layers: s
  };
}
function ay(e, t) {
  var l;
  const s = e.mods;
  if (!s) return null;
  const o = Kb(), a = ((l = Qt[e.effectType]) == null ? void 0 : l.paramSchema) ?? {};
  let n = null;
  for (const [i, u] of Object.entries(s)) {
    if (!ed(u.src) || !o.live[Ju[u.src]]) continue;
    const d = a[i];
    if (!d || d.type !== "slider") continue;
    const c = t[i];
    if (typeof c != "number") continue;
    const { min: h, max: m } = d, x = u.amount / 100 * ny(u.src, h, m) * o.value[u.src], g = Math.min(m, Math.max(h, c + x));
    (n ?? (n = {}))[i] = g;
  }
  return n;
}
function ny(e, t, s) {
  return Zb.has(e) ? (s - t) / 2 : s - t;
}
function ry(e) {
  return !!e.mods && Object.keys(e.mods).length > 0;
}
function td(e, t) {
  return e.filter((s) => {
    var a;
    if (!s.visible) return !1;
    const o = (a = Qt[s.effectType]) == null ? void 0 : a.paramSchema;
    return o ? Object.entries(o).some(([n, l]) => {
      if (l.type !== "device" || l.device !== t) return !1;
      const i = s.params[n];
      return typeof i == "string" && i !== "";
    }) : !1;
  });
}
function iy(e) {
  return td(e, "audio");
}
function ly(e) {
  return td(e, "video");
}
function cy(e, t) {
  return e.filter(
    (s) => {
      var o;
      return s.visible && ((o = Qt[s.effectType]) == null ? void 0 : o.signalSource) === t;
    }
  );
}
function uy(e) {
  var t;
  return ((t = Qt[e.effectType]) == null ? void 0 : t.radialExtent) ?? null;
}
const je = (e, t = 0) => typeof e == "number" ? e : t, Ds = (e, t = "") => typeof e == "string" ? e : t, Zl = Math.tan(45 / 2 * (Math.PI / 180)) * 3.4;
let ma = null;
const Kl = /* @__PURE__ */ new Map();
function dy(e) {
  const t = {
    text: Ds(e.text),
    font: Ds(e.font, "sans-serif"),
    weight: Ds(e.weight, "400"),
    italic: Ds(e.style) === "italic",
    tracking: je(e.tracking, 0),
    // Percent in the param, ems in the layout — as in effects/text/index.ts.
    leading: je(e.leading, 110) / 100,
    align: Ds(e.align, "center")
  }, s = [
    t.weight,
    t.font,
    t.italic,
    t.tracking,
    t.leading,
    t.text
  ].join("|"), o = Kl.get(s);
  if (o !== void 0) return o;
  ma || (ma = document.createElement("canvas").getContext("2d"));
  let a = { aspect: 4, emH: 1.2 };
  if (ma) {
    const n = vn(ma, t, 256);
    a = { aspect: n.aspect, emH: n.emH };
  }
  return Kl.set(s, a), a;
}
const hy = /* @__PURE__ */ new Set(), my = () => hy.forEach((e) => e()), Ql = /* @__PURE__ */ new Map(), mn = /* @__PURE__ */ new Set(), pn = { w: 1, h: 1 };
function sd(e) {
  if (!e) return pn;
  const t = Ql.get(e);
  if (t !== void 0) return t;
  if (!mn.has(e)) {
    mn.add(e);
    const s = new Image();
    e.startsWith("data:") || (s.crossOrigin = "anonymous");
    const o = (a) => {
      Ql.set(e, a), mn.delete(e), my();
    };
    s.onload = () => o({ w: s.width, h: Math.max(1, s.height) }), s.onerror = () => o(pn), s.src = e;
  }
  return pn;
}
function py(e) {
  const { w: t, h: s } = sd(e);
  return t / Math.max(1, s);
}
function fy(e, t) {
  const s = Ds(e.src), o = je(e.scale, 100) / 100, a = Ds(e.fit, "contain"), n = t.width / Math.max(1, t.height);
  let l = 1, i = 1;
  if (s && a === "actual") {
    const { w: u, h: d } = sd(s);
    l = t.width / Math.max(1, u), i = t.height / Math.max(1, d);
  } else if (s && a !== "stretch") {
    const u = py(s), d = n > u;
    a === "cover" ? d ? i = u / n : l = n / u : d ? l = n / u : i = u / n;
  }
  return { fx: l / o, fy: i / o };
}
const Jl = (e) => Math.pow(2, e / 100);
function gy(e) {
  var s, o;
  if (!("posX" in e.params && "posY" in e.params)) return !1;
  const t = (o = (s = Qt[e.effectType]) == null ? void 0 : s.paramSchema.posX) == null ? void 0 : o.showIf;
  return !t || t(e.params);
}
function by(e, t) {
  if (!gy(e)) return null;
  const s = t.width / Math.max(1, t.height), o = e.params, a = 0.5 + je(o.posX) / 100 * 0.5, n = 0.5 - je(o.posY) / 100 * 0.5;
  if (e.effectType === "beam") {
    const i = Ds(o.type, "line");
    if (i === "viewport") return null;
    const u = je(o.length, 128) / 100 * 0.9, d = je(o.thickness, 18) / 100 * 0.07, c = i === "line" ? Math.max(d * 11, u * 0.18) : u;
    return { cx: a, cy: n, hw: u / s, hh: c, angle: je(o.angle) };
  }
  if (e.effectType === "shape2d") {
    const i = je(o.size, 50) / 100 * 0.5, u = i * z0(o) / s;
    return { cx: a, cy: n, hw: u, hh: i, angle: je(o.angle) };
  }
  if (e.effectType === "shape") {
    const u = je(o.scale, 55) / 50, d = je(o.spacing, 40) / 100 * 3, c = je(o.count, 6);
    let h = 0.82, m = 0.82;
    switch (o.repeat) {
      case "grid": {
        const w = Math.ceil(Math.sqrt(c)), S = Math.ceil(c / w);
        h = (w - 1) / 2 * d + 0.82, m = (S - 1) / 2 * d + 0.82;
        break;
      }
      case "radial": {
        h = m = (c > 1 ? d / (2 * Math.sin(Math.PI / c)) : 0) + 0.82;
        break;
      }
      case "spiral": {
        h = m = d * 0.4 * Math.sqrt(Math.max(0, c - 1)) + 0.82;
        break;
      }
    }
    const x = m * u / (2 * Zl), g = h * u / (2 * Zl) / s;
    return { cx: a, cy: n, hw: g, hh: x, angle: 0 };
  }
  if (e.effectType === "image") {
    const { fx: i, fy: u } = fy(o, t);
    return { cx: a, cy: n, hw: 0.5 / i, hh: 0.5 / u, angle: je(o.angle) };
  }
  if (e.effectType === "text") {
    const i = je(o.repeatX, 1), u = je(o.repeatY, 1);
    if (i > 1 || u > 1) {
      const g = Math.tan(je(o.slant) * (Math.PI / 180)), [w, S] = Rc(je(o.angle), g, s);
      return { cx: a, cy: n, hw: w, hh: S, angle: je(o.angle), shear: g };
    }
    const { aspect: d, emH: c } = dy(o), h = c * (je(o.size, 20) / 100), m = h * (d / s) * Jl(je(o.width)), x = h * Jl(je(o.height));
    return {
      cx: a,
      cy: n,
      hw: m / 2,
      hh: x / 2,
      angle: je(o.angle),
      shear: Math.tan(je(o.slant) * (Math.PI / 180))
    };
  }
  const l = uy(e);
  if (l) {
    const i = l.reach(o, s);
    return { cx: a, cy: n, hw: i / s, hh: i, angle: 0, disc: !0 };
  }
  return null;
}
function yy(e, t) {
  const s = e.params;
  if (!Tc(s)) return null;
  const o = O0(s);
  if (o === wn)
    return { ax: je(s.anchorX), ay: je(s.anchorY) };
  const a = Ac.find((l) => l.id === o);
  if (!a || !a.fx && !a.fy) return { ax: 0, ay: 0 };
  const n = by(e, t);
  return n ? { ax: a.fx * n.hw * 200, ay: a.fy * n.hh * 200 } : { ax: 0, ay: 0 };
}
function wy(e, t, s) {
  if (!Tc(t)) return t;
  const o = yy({ ...e, params: t }, s);
  return o ? { ...t, anchorX: o.ax, anchorY: o.ay } : t;
}
function vy(e, t, s, o) {
  var a;
  if (t) {
    iy(e).length > 0, ly(e).length > 0, Dm(cy(e, "camera").length > 0), Um();
    for (const n of e) {
      const l = ry(n);
      if (!n.tracks && !l) continue;
      const i = n.tracks ? qb(n, o) : {};
      if ("opacity" in i) {
        const h = t.opacityUniforms.get(n.id);
        h && (h.value = i.opacity / 100), delete i.opacity;
      }
      const u = { ...n.params, ...i }, d = l ? ay(n, u) : null;
      if (!Object.keys(i).length && !d) continue;
      const c = d ? { ...u, ...d } : u;
      (a = t.updaters.get(n.id)) == null || a(wy(n, c, s));
    }
  }
}
const fn = 177, ec = 185;
let Ho = null;
function xy() {
  if (Ho !== null) return Ho;
  const e = Number.parseInt(Sd, 10);
  return Number.isFinite(e) ? e < fn ? (console.error(
    `[warpkit] three r${e} is too old for runtime 1.4.0, which needs r${fn} or newer — run \`npm i three@^0.${fn}.0\`. Nothing will render and the poster will stay up. This is a version mismatch, not a GPU problem, so checking WebGPU support won't help.`
  ), Ho = !1) : (e > ec && console.warn(
    `[warpkit] three r${e} is newer than r${ec}, the last revision runtime 1.4.0 was tested against. Carrying on. TSL changes between revisions, so if a layer looks wrong this is the first thing to suspect.`
  ), Ho = !0) : Ho = !0;
}
const Ln = /* @__PURE__ */ new Map(), mo = /* @__PURE__ */ new Map(), My = /* @__PURE__ */ new Set(["image", "model", "video"]);
function ky(e, t) {
  return t ? {
    ...e,
    layers: e.layers.map((s) => {
      var n;
      const o = ((n = Qt[s.effectType]) == null ? void 0 : n.paramSchema) ?? {};
      let a = s.params;
      for (const [l, i] of Object.entries(o)) {
        if (!My.has(i.type)) continue;
        const u = a[l];
        if (!(typeof u != "string" || !u.startsWith("."))) {
          a === s.params && (a = { ...s.params });
          try {
            a[l] = new URL(u, t).href;
          } catch {
          }
        }
      }
      return a === s.params ? s : { ...s, params: a };
    })
  } : e;
}
const pa = "1.4.0", Sy = 1.5, Py = 1.25, Ay = 1, Ty = () => matchMedia("(pointer: coarse)").matches, gn = () => matchMedia("(prefers-reduced-motion: reduce)"), Cy = typeof HTMLElement < "u" ? HTMLElement : class {
};
var Mt, gt, Dt, Gs, jo, gs, Kt, _t, fo, go, Ys, $o, bo, Hs, Us, bs, js, Ee, ad, Rn, nd, rd, Dn, id, ld, Hn, cd, $s, On, zo, wa, No, yo, ud, dd, hd;
class od extends Cy {
  constructor() {
    super(...arguments);
    rt(this, Ee);
    rt(this, Mt, null);
    rt(this, gt, null);
    rt(this, Dt, null);
    rt(this, Gs, null);
    rt(this, jo, null);
    rt(this, gs, null);
    rt(this, Kt, null);
    rt(this, _t, null);
    rt(this, fo, null);
    rt(this, go, null);
    rt(this, Ys, null);
    rt(this, $o, null);
    rt(this, bo, !1);
    rt(this, Hs, !1);
    rt(this, Us, !1);
    rt(this, bs, !1);
    /**
     * A render threw, or the environment can't support one at all (three too
     * old). Stay down: scrolling back into view must not retry it.
     */
    rt(this, js, !1);
    rt(this, $s, () => Ze(this, Ee, zo).call(this));
    rt(this, No, performance.now());
    rt(this, yo, () => {
      var a;
      const s = ue(this, _t), o = ue(this, Dt);
      if (!(!s || !o)) {
        try {
          const n = performance.now();
          Wd(Math.min(0.25, (n - ue(this, No)) / 1e3)), ze(this, No, n), vy(s.layers, ue(this, Kt), s, Xd());
          const l = { width: s.width, height: s.height };
          (a = ue(this, Kt)) == null || a.passes.forEach((i) => i(o, l)), o.render(ue(this, Gs), ue(this, jo));
        } catch (n) {
          console.error("[warpkit] Render stopped after an error:", n), o.setAnimationLoop(null), ze(this, Hs, !1), ze(this, js, !0), Ze(this, Ee, dd).call(this);
          return;
        }
        ue(this, bs) || (ze(this, bs, !0), Ze(this, Ee, ud).call(this));
      }
    });
  }
  connectedCallback() {
    ue(this, Mt) || (Ze(this, Ee, ad).call(this), Ze(this, Ee, Dn).call(this));
  }
  disconnectedCallback() {
    for (const s of mo.values()) s.delete(this);
    Ze(this, Ee, hd).call(this);
  }
  /**
   * Try again to resolve and start. Called by registerScene() when the scene an
   * element was waiting for finally arrives — see `waiting` above. Public only
   * because registerScene() lives outside the class; not part of the documented
   * element API.
   */
  restart() {
    return ue(this, Us) || ue(this, js) || ue(this, _t) ? Promise.resolve() : Ze(this, Ee, Dn).call(this);
  }
  attributeChangedCallback(s) {
    (s === "paused" || s === "motion") && Ze(this, Ee, zo).call(this), s === "fit" && Ze(this, Ee, rd).call(this), s === "poster" && ue(this, Mt) && Ze(this, Ee, Rn).call(this);
  }
  /**
   * Draw exactly one frame, ignoring the visibility gates.
   *
   * Kept because the gates are load-bearing and therefore make the element
   * genuinely hard to test: an automated or backgrounded tab reports
   * `document.hidden`, so the element correctly refuses to run and a harness
   * sees a blank canvas that looks like a bug. This is the escape hatch that
   * tells the two apart.
   */
  renderOnce() {
    ue(this, yo).call(this);
  }
  /** Snapshot for debugging an embed on a host page. */
  debugState() {
    var s;
    return {
      name: this.getAttribute("name"),
      hasRenderer: !!ue(this, Dt),
      hasScene: !!ue(this, _t),
      layers: ((s = ue(this, _t)) == null ? void 0 : s.layers.length) ?? 0,
      compiled: !!ue(this, Kt),
      visible: ue(this, bo),
      running: ue(this, Hs),
      firstFrame: ue(this, bs),
      hidden: document.hidden,
      reducedMotion: gn().matches,
      wantsMotion: Ze(this, Ee, On).call(this)
    };
  }
}
Mt = new WeakMap(), gt = new WeakMap(), Dt = new WeakMap(), Gs = new WeakMap(), jo = new WeakMap(), gs = new WeakMap(), Kt = new WeakMap(), _t = new WeakMap(), fo = new WeakMap(), go = new WeakMap(), Ys = new WeakMap(), $o = new WeakMap(), bo = new WeakMap(), Hs = new WeakMap(), Us = new WeakMap(), bs = new WeakMap(), js = new WeakMap(), Ee = new WeakSet(), // ── DOM ────────────────────────────────────────────────────────────────────
ad = function() {
  const s = getComputedStyle(this);
  s.display === "inline" && (this.style.display = "block"), this.style.position = s.position === "static" ? "relative" : s.position, this.style.overflow = "hidden", Ze(this, Ee, Rn).call(this);
  const o = document.createElement("canvas");
  Object.assign(o.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    display: "block",
    opacity: ue(this, gt) ? "0" : "1",
    transition: "opacity .4s ease"
  }), ze(this, Mt, o), this.appendChild(o);
}, /**
 * Build, update or tear down the poster from the current `poster` attribute.
 *
 * Called on mount and again whenever the attribute changes, because a
 * bundler consumer cannot write the URL into the HTML: it comes from
 * `import posterUrl from './poster.jpg'`, which the bundler content-hashes,
 * so the only way to set it is from script after the element exists. Handling
 * it once at mount meant the poster was silently dropped on exactly the path
 * where §3.3 says it isn't optional.
 */
Rn = function() {
  const s = this.getAttribute("poster");
  if (!s) {
    ue(this, gt) && (ue(this, gt).remove(), ze(this, gt, null)), ue(this, Mt) && (ue(this, Mt).style.opacity = "1");
    return;
  }
  const o = /\.(mp4|webm|mov)(\?|$)/i.test(s), a = o ? "video" : "img";
  if ((ue(this, gt) instanceof HTMLVideoElement ? "video" : ue(this, gt) ? "img" : null) === a && ue(this, gt).getAttribute("src") === s) return;
  ue(this, gt) && (ue(this, gt).remove(), ze(this, gt, null));
  const l = o ? document.createElement("video") : document.createElement("img");
  l instanceof HTMLVideoElement ? (l.src = s, l.muted = !0, l.loop = !0, l.playsInline = !0, l.autoplay = !0, l.play().catch(() => {
  })) : (l.src = s, l.alt = ""), Object.assign(l.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    objectFit: this.getAttribute("fit") === "contain" ? "contain" : "cover",
    transition: "opacity .4s ease",
    // A poster arriving after the scene is already up must not cover it.
    opacity: ue(this, bs) ? "0" : "1"
  }), ze(this, gt, l), ue(this, Mt) ? this.insertBefore(l, ue(this, Mt)) : this.appendChild(l), ue(this, Mt) && !ue(this, bs) && (ue(this, Mt).style.opacity = "0");
}, /**
 * Give the element the scene's own proportions when nothing else has sized it.
 *
 * The canvas is positioned absolutely inside this element, so the element has
 * no intrinsic height: dropped into a page with no CSS it is 0px tall and the
 * visitor sees nothing at all. That reads as a broken package rather than a
 * missing style rule, and it was far and away the most likely thing for a
 * first integration to get wrong — the height had to be written *on the
 * element*, and a height on a wrapper div (the obvious thing to try) does
 * nothing.
 *
 * So behave like `<img>`: fill the available width, take the height from the
 * work's own aspect ratio. `aspect-ratio` is only applied when the element
 * measures 0 tall, so anyone who *has* sized it — `height: 100%`, a fixed
 * band, a grid row — is left completely alone.
 */
nd = function(s) {
  if (this.offsetHeight > 0) return;
  const o = s.width || 16, a = s.height || 9;
  this.style.aspectRatio = `${o} / ${a}`;
}, rd = function() {
  ue(this, gt) && (ue(this, gt).style.objectFit = this.getAttribute("fit") === "contain" ? "contain" : "cover"), Ze(this, Ee, wa).call(this);
}, Dn = async function() {
  if (!xy()) {
    ze(this, js, !0);
    return;
  }
  const s = Ze(this, Ee, id).call(this);
  s && (Ze(this, Ee, nd).call(this, s), await Ze(this, Ee, ld).call(this) && (ue(this, Us) || (ze(this, _t, s), Zn(s.duration ?? Yl), qn(!0), Ze(this, Ee, Hn).call(this), Ze(this, Ee, cd).call(this), Ze(this, Ee, zo).call(this))));
}, id = function() {
  const s = this.getAttribute("name");
  if (s) {
    const a = Ln.get(s);
    if (a) return ky(ql(a.data), a.base);
    let n = mo.get(s);
    return n || mo.set(s, n = /* @__PURE__ */ new Set()), n.add(this), queueMicrotask(() => {
      var l;
      (l = mo.get(s)) != null && l.has(this) && console.warn(
        `[warpkit] No scene named "${s}". Include its payload script before this element, or call warpkit.scene()/registerScene() with that name. Known scenes: ${[...Ln.keys()].join(", ") || "(none)"}`
      );
    }), null;
  }
  const o = this.getAttribute("src");
  return o ? (fetch(o).then((a) => a.json()).then((a) => {
    ze(this, _t, ql(a)), Zn(ue(this, _t).duration ?? Yl), qn(!0), ue(this, Dt) && Ze(this, Ee, Hn).call(this);
  }).catch((a) => console.warn(`[warpkit] Could not load scene from "${o}":`, a)), null) : (console.warn("[warpkit] <warpkit-scene> needs a `name` or a `src`."), null);
}, ld = async function() {
  try {
    ze(this, Dt, new Pd({ canvas: ue(this, Mt), antialias: !1 })), await ue(this, Dt).init();
  } catch (s) {
    return console.warn("[warpkit] Could not start a renderer; showing the poster.", s), ze(this, Dt, null), !1;
  }
  return ze(this, Gs, new p.Scene()), ze(this, jo, new p.OrthographicCamera(-1, 1, 1, -1, 0, 1)), ze(this, gs, new p.Mesh(new p.PlaneGeometry(2, 2), new Nn())), ue(this, Gs).add(ue(this, gs)), !0;
}, Hn = function() {
  var a, n;
  if (!ue(this, _t) || !ue(this, gs)) return;
  (a = ue(this, Kt)) == null || a.disposers.forEach((l) => l());
  const s = ue(this, _t).layers.filter((l) => Qt[l.effectType] ? !0 : (console.warn(`[warpkit] Unknown effect "${l.effectType}" on layer "${l.name}" — skipping it.`), !1));
  ze(this, Kt, Gb(s));
  const o = new Nn();
  o.colorNode = ue(this, Kt).colorNode, (n = ue(this, gs).material) == null || n.dispose(), ue(this, gs).material = o, Ze(this, Ee, wa).call(this);
}, cd = function() {
  if (ze(this, fo, new ResizeObserver(() => Ze(this, Ee, wa).call(this))), ue(this, fo).observe(this), ze(this, go, new IntersectionObserver(
    ([s]) => {
      ze(this, bo, s.isIntersecting), Ze(this, Ee, zo).call(this);
    },
    { rootMargin: "100px" }
  )), ue(this, go).observe(this), document.addEventListener("visibilitychange", ue(this, $s)), ze(this, Ys, gn()), ue(this, Ys).addEventListener("change", ue(this, $s)), this.getAttribute("pointer") !== "off") {
    const o = (this.getAttribute("pointer") ?? "window") === "element" ? this : window, a = (n) => Dh(ue(this, Mt), n);
    o.addEventListener("pointermove", a, { passive: !0 }), ze(this, $o, () => {
      o.removeEventListener("pointermove", a), Rh();
    });
  }
}, $s = new WeakMap(), /** Does this element get to animate, or only to draw? */
On = function() {
  return this.hasAttribute("paused") ? !1 : this.getAttribute("motion") === "always" ? !0 : !gn().matches;
}, /**
 * Two questions, not one — separating them is what fixes "it only ever shows
 * the poster".
 *
 * *Can it draw at all* is about whether drawing would be wasted: off screen,
 * or a backgrounded tab. *Should it animate* is about whether motion is
 * wanted: `paused`, or the visitor's reduce-motion setting. Those used to be
 * a single boolean, so anything that suppressed the animation also suppressed
 * the one frame that hands over from the poster — and the element sat on a
 * JPEG of itself forever with a perfectly good renderer behind it.
 */
zo = function() {
  var a;
  const s = ue(this, bo) && !document.hidden && !!ue(this, Dt) && !ue(this, Us) && !ue(this, js);
  s && !ue(this, bs) && ue(this, yo).call(this);
  const o = s && Ze(this, Ee, On).call(this);
  o !== ue(this, Hs) && (ze(this, Hs, o), (a = ue(this, Dt)) == null || a.setAnimationLoop(o ? ue(this, yo) : null));
}, wa = function() {
  const s = ue(this, Dt), o = ue(this, Mt);
  if (!s || !o || !ue(this, _t)) return;
  const a = Math.max(1, this.clientWidth), n = Math.max(1, this.clientHeight), l = !Iy(s), i = Ty() ? Ay : l ? Py : Sy;
  s.setPixelRatio(Math.min(devicePixelRatio || 1, i)), s.setSize(a, n, !1);
}, No = new WeakMap(), yo = new WeakMap(), ud = function() {
  ue(this, Mt) && (ue(this, Mt).style.opacity = "1"), ue(this, gt) && (ue(this, gt).style.opacity = "0");
}, dd = function() {
  ue(this, Mt) && (ue(this, Mt).style.opacity = "0"), ue(this, gt) && (ue(this, gt).style.opacity = "1");
}, hd = function() {
  var s, o, a, n, l, i, u;
  ze(this, Us, !0), ze(this, Hs, !1), (s = ue(this, Dt)) == null || s.setAnimationLoop(null), (o = ue(this, fo)) == null || o.disconnect(), (a = ue(this, go)) == null || a.disconnect(), document.removeEventListener("visibilitychange", ue(this, $s)), (n = ue(this, Ys)) == null || n.removeEventListener("change", ue(this, $s)), ze(this, Ys, null), (l = ue(this, $o)) == null || l.call(this), (i = ue(this, Kt)) == null || i.disposers.forEach((d) => d()), ze(this, Kt, null), (u = ue(this, Dt)) == null || u.dispose(), ze(this, Dt, null), ze(this, Gs, null), ze(this, gs, null);
}, zt(od, "observedAttributes", ["name", "src", "poster", "fit", "paused", "pointer", "motion"]);
const Iy = (e) => {
  var t;
  return ((t = e.backend) == null ? void 0 : t.isWebGPUBackend) === !0;
};
function Ey(e) {
  e.dracoDecoderPath && Zh(e.dracoDecoderPath);
}
function Fy(e, t, s = "") {
  Ln.set(e, { data: t, base: s });
  const o = mo.get(e);
  if (o) {
    mo.delete(e);
    for (const a of o) a.isConnected && a.restart();
  }
}
function Ly() {
  var t;
  if (typeof window > "u" || typeof customElements > "u") return;
  const e = window;
  if ((t = e.__warpkit) != null && t.v) {
    e.__warpkit.v !== pa && console.warn(
      `[warpkit] Runtime ${pa} loaded, but ${e.__warpkit.v} is already running. The first one wins; remove the older runtime script.`
    );
    return;
  }
  e.__warpkit = { v: pa }, e.warpkit = {
    version: pa,
    configure: Ey,
    /**
     * Called by each payload file to register its scene. `currentScript` is
     * read here — synchronously during that script's execution is the only
     * moment it's available — so asset paths can be resolved against the
     * payload's own URL rather than the page's.
     */
    scene(s, o) {
      var a;
      Fy(s, o, ((a = document.currentScript) == null ? void 0 : a.src) ?? "");
    }
  }, customElements.get("warpkit-scene") || customElements.define("warpkit-scene", od);
}
Ly();
export {
  pa as VERSION,
  Ey as configure,
  Ly as install,
  Fy as registerScene
};
