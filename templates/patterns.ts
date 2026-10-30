/**
 * Small library of inline SVG ornaments used as CSS background images.
 * Every helper returns a ready-to-use `url("data:image/svg+xml,...")` string,
 * so templates can be recoloured freely without shipping extra image files.
 */

const svg = (width: number, height: number, body: string, extra = "") =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' ${extra}>${body}</svg>`
  )}")`;

/** Classic damask motif, tiled. Works best at 12–20% opacity. */
export function damask(color: string) {
  return svg(
    120,
    120,
    `<g fill='none' stroke='${color}' stroke-width='1.4' stroke-linecap='round'>
      <path d='M60 8c10 14 22 20 22 36 0 12-10 20-22 30-12-10-22-18-22-30 0-16 12-22 22-36z'/>
      <path d='M60 22c5 8 10 12 10 20s-5 12-10 18c-5-6-10-10-10-18s5-12 10-20z'/>
      <path d='M60 74v20M50 90c4-6 16-6 20 0M44 104c6-8 26-8 32 0'/>
      <path d='M12 60c6-8 16-10 22-4-6 8-16 10-22 4zM108 60c-6-8-16-10-22-4 6 8 16 10 22 4z'/>
      <path d='M0 0c8 4 12 12 12 20M120 0c-8 4-12 12-12 20M0 120c8-4 12-12 12-20M120 120c-8-4-12-12-12-20'/>
    </g>
    <g fill='${color}'><circle cx='60' cy='48' r='2.2'/><circle cx='60' cy='100' r='1.6'/><circle cx='18' cy='60' r='1.4'/><circle cx='102' cy='60' r='1.4'/></g>`
  );
}

/** Eight-point star lattice in the Islamic geometric tradition. */
export function arabesque(color: string) {
  return svg(
    80,
    80,
    `<g fill='none' stroke='${color}' stroke-width='1.2' stroke-linejoin='round'>
      <rect x='24' y='24' width='32' height='32'/>
      <rect x='24' y='24' width='32' height='32' transform='rotate(45 40 40)'/>
      <path d='M40 0v17M40 63v17M0 40h17M63 40h17'/>
      <path d='M0 0l17 17M80 0L63 17M0 80l17-17M80 80L63 63'/>
    </g>`
  );
}

/** Interlocking star-and-cross tessellation used for headers and edge strips. */
export function starCross(color: string, fill = "none") {
  return svg(
    64,
    64,
    `<g fill='${fill}' stroke='${color}' stroke-width='1.3' stroke-linejoin='round'>
      <path d='M32 4l6 14 14 6-14 6-6 14-6-14-14-6 14-6z'/>
      <path d='M32 12l4 10 10 4-10 4-4 10-4-10-10-4 10-4z' stroke-width='.8'/>
      <path d='M0 32h12M52 32h12M32 52v12M32 0v12'/>
      <circle cx='0' cy='0' r='6'/><circle cx='64' cy='0' r='6'/><circle cx='0' cy='64' r='6'/><circle cx='64' cy='64' r='6'/>
    </g>`
  );
}

/** Diamond trellis. */
export function lattice(color: string) {
  return svg(28, 28, `<g fill='none' stroke='${color}' stroke-width='1'><path d='M0 14L14 0l14 14L14 28z'/></g>`);
}

/** Tiny dot grid. */
export function dots(color: string) {
  return svg(18, 18, `<circle cx='9' cy='9' r='1.1' fill='${color}'/>`);
}

/** Loose paisley outlines. */
export function paisley(color: string) {
  return svg(
    140,
    140,
    `<g fill='none' stroke='${color}' stroke-width='1.3' stroke-linecap='round'>
      <path d='M40 20c22-6 36 10 30 30-4 14-20 22-30 36-8-16-24-22-26-40-1-14 12-22 26-26z'/>
      <path d='M42 34c10-2 16 6 14 14-2 8-10 12-16 20-4-8-12-12-12-20 0-7 6-12 14-14z'/>
      <path d='M104 84c18-6 30 8 26 24-3 12-16 18-24 30-6-13-20-18-22-33-1-12 9-18 20-21z'/>
      <path d='M106 96c8-2 13 5 11 12-2 6-8 10-12 16-3-6-10-10-10-16 0-6 5-10 11-12z'/>
    </g>
    <g fill='${color}'><circle cx='44' cy='52' r='1.6'/><circle cx='105' cy='113' r='1.4'/><circle cx='110' cy='30' r='1.2'/><circle cx='20' cy='110' r='1.2'/></g>`
  );
}

/** Scattered botanical leaves. */
export function leaves(color: string) {
  return svg(
    160,
    160,
    `<g fill='none' stroke='${color}' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'>
      <path d='M20 40c20-24 44-26 60-16-8 22-30 36-60 16zM24 38c18-2 36-6 54-12'/>
      <path d='M100 120c-4-30 12-50 34-56 6 24-4 48-34 56zM104 116c8-16 18-32 28-48'/>
      <path d='M30 130c6-18 22-26 40-24-2 18-16 30-40 24zM34 128c12-6 24-12 34-20'/>
      <path d='M120 30c14 2 24 12 26 26-16 2-26-8-26-26zM124 34c6 6 12 12 18 18'/>
    </g>`
  );
}

/** Hanging marigold garland strip (repeat-x along the top edge). */
export function marigoldGarland(orange = "#f59e0b", deep = "#ea580c", leaf = "#4d7c0f") {
  const flower = (x: number, y: number, r: number, c: string) =>
    `<circle cx='${x}' cy='${y}' r='${r}' fill='${c}'/><circle cx='${x}' cy='${y}' r='${r * 0.62}' fill='${deep}' opacity='.55'/><circle cx='${x}' cy='${y}' r='${r * 0.28}' fill='#fde68a'/>`;
  return svg(
    96,
    72,
    `<path d='M0 4c24 18 72 18 96 0' fill='none' stroke='${leaf}' stroke-width='2'/>
     <path d='M14 12c-6 8-4 16 4 20 6-6 6-14-4-20zM82 12c6 8 4 16-4 20-6-6-6-14 4-20zM48 22c-7 7-6 16 2 20 7-6 6-14-2-20z' fill='${leaf}' opacity='.9'/>
     ${flower(16, 30, 9, orange)}${flower(48, 40, 10, orange)}${flower(80, 30, 9, orange)}
     ${flower(32, 42, 7, "#fbbf24")}${flower(64, 42, 7, "#fbbf24")}
     <path d='M16 39v10M48 50v12M80 39v10M32 49v8M64 49v8' stroke='${leaf}' stroke-width='1.5'/>
     ${flower(16, 52, 5, deep)}${flower(48, 64, 6, deep)}${flower(80, 52, 5, deep)}`
  );
}

/** Half-circle scallop strip (repeat-x). */
export function scallop(color: string) {
  return svg(40, 12, `<path d='M0 0h40v2a20 10 0 0 1-40 0z' fill='${color}'/>`);
}

/** Small Rajasthani-style temple crenellation strip. */
export function crenellation(color: string) {
  return svg(
    48,
    14,
    `<path d='M0 14V8h6V3l6-3 6 3v5h6V3l6-3 6 3v5h6v6z' fill='${color}'/>`
  );
}

/**
 * Corner flourish. Returns four data URLs already mirrored for each corner
 * in the order [top-left, top-right, bottom-left, bottom-right].
 */
export function cornerFlourish(color: string, accent = color): [string, string, string, string] {
  const body = `<g fill='none' stroke='${color}' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'>
      <path d='M6 118C6 60 60 6 118 6'/>
      <path d='M6 92c0-30 14-52 40-66'/>
      <path d='M18 118c0-46 42-88 100-92' stroke-width='1.4'/>
      <path d='M14 44c10-12 24-16 36-12-4 12-16 20-36 12z'/>
      <path d='M44 14c12-10 26-12 38-8-6 12-20 18-38 8z'/>
      <path d='M12 72c8 2 12 10 8 18-8-2-12-10-8-18z'/>
      <path d='M72 12c2 8 10 12 18 8-2-8-10-12-18-8z'/>
    </g>
    <g fill='${accent}'>
      <circle cx='6' cy='6' r='4'/><circle cx='30' cy='30' r='2.6'/><circle cx='10' cy='104' r='2.4'/><circle cx='104' cy='10' r='2.4'/>
      <path d='M6 118l8-14 8 14-8 6zM118 6l-14 8 14 8 6-8z'/>
    </g>`;
  const make = (transform: string) => svg(124, 124, `<g transform='${transform}'>${body}</g>`);
  return [make(""), make("translate(124 0) scale(-1 1)"), make("translate(0 124) scale(1 -1)"), make("translate(124 124) scale(-1 -1)")];
}

/** Quarter-rangoli corner motif. Same return order as `cornerFlourish`. */
export function rangoliCorner(color: string, accent: string): [string, string, string, string] {
  let petals = "";
  for (let i = 0; i < 5; i += 1) {
    const angle = 8 + i * 18.5;
    petals += `<path d='M0 0c26 6 40 26 44 52-16-6-30-22-44-52z' transform='rotate(${angle})' fill='${i % 2 ? accent : color}' opacity='.9'/>`;
  }
  const body = `<g transform='translate(8 8)'>
      <circle cx='0' cy='0' r='72' fill='none' stroke='${color}' stroke-width='1.6' stroke-dasharray='3 5'/>
      <circle cx='0' cy='0' r='58' fill='none' stroke='${accent}' stroke-width='1.2'/>
      ${petals}
      <circle cx='0' cy='0' r='10' fill='${color}'/>
      <circle cx='0' cy='0' r='4' fill='${accent}'/>
    </g>`;
  const make = (transform: string) => svg(110, 110, `<g transform='${transform}'>${body}</g>`);
  return [make(""), make("translate(110 0) scale(-1 1)"), make("translate(0 110) scale(1 -1)"), make("translate(110 110) scale(-1 -1)")];
}

/** Soft rose spray for floral templates. Order [top-left, top-right, bottom-left, bottom-right]. */
export function roseSpray(petal: string, petalDeep: string, leaf: string): [string, string, string, string] {
  const rose = (x: number, y: number, r: number) =>
    `<g transform='translate(${x} ${y})'>
       <circle r='${r}' fill='${petal}'/>
       <path d='M0 ${-r * 0.7}c${r * 0.6} 0 ${r * 0.9} ${r * 0.5} ${r * 0.6} ${r * 0.9}-${r * 0.4} ${r * 0.5}-${r * 1.1} ${r * 0.3}-${r * 1.2}-${r * 0.2}-${r * 0.1}-${r * 0.6} ${r * 0.3}-${r} ${r * 0.6}-${r}z' fill='${petalDeep}' opacity='.75'/>
       <circle r='${r * 0.3}' cx='${r * 0.05}' cy='${r * -0.05}' fill='${petalDeep}'/>
     </g>`;
  const body = `<g fill='${leaf}' opacity='.85'>
      <path d='M80 96c10-24 34-34 58-30-8 26-30 40-58 30z'/>
      <path d='M30 120c-2-26 14-46 40-52 2 26-14 46-40 52z'/>
      <path d='M118 44c-16-10-22-30-14-48 18 8 26 28 14 48z'/>
    </g>
    <g fill='none' stroke='${leaf}' stroke-width='1.4' stroke-linecap='round'>
      <path d='M84 94c14-12 30-20 50-26M34 116c8-18 18-32 32-44M116 42c-6-14-8-26-6-40'/>
    </g>
    ${rose(40, 40, 30)}${rose(96, 78, 22)}${rose(112, 22, 14)}`;
  const make = (transform: string) => svg(150, 150, `<g transform='${transform}'>${body}</g>`);
  return [make(""), make("translate(150 0) scale(-1 1)"), make("translate(0 150) scale(1 -1)"), make("translate(150 150) scale(-1 -1)")];
}

/** Eucalyptus-like branch. Order [top-left, top-right, bottom-left, bottom-right]. */
export function botanicalBranch(leaf: string, stem: string): [string, string, string, string] {
  const leafAt = (x: number, y: number, rot: number, s = 1) =>
    `<path d='M0 0c10-14 26-16 36-8-6 14-22 20-36 8z' transform='translate(${x} ${y}) rotate(${rot}) scale(${s})' fill='${leaf}'/>`;
  const body = `<path d='M10 10c40 20 70 60 90 120' fill='none' stroke='${stem}' stroke-width='1.8' stroke-linecap='round'/>
    <path d='M22 22c20 4 38 2 56-8' fill='none' stroke='${stem}' stroke-width='1.4' stroke-linecap='round'/>
    ${leafAt(30, 24, -60)}${leafAt(44, 40, 20, 0.9)}${leafAt(60, 60, -50, 0.9)}${leafAt(74, 82, 25, 0.85)}${leafAt(86, 104, -45, 0.8)}
    ${leafAt(40, 14, 40, 0.7)}${leafAt(62, 12, -20, 0.7)}${leafAt(78, 18, 30, 0.6)}
    <g fill='${stem}'><circle cx='96' cy='126' r='2.4'/><circle cx='80' cy='14' r='1.6'/><circle cx='12' cy='30' r='1.6'/></g>`;
  const make = (transform: string) => svg(140, 140, `<g transform='${transform}'>${body}</g>`);
  return [make(""), make("translate(140 0) scale(-1 1)"), make("translate(0 140) scale(1 -1)"), make("translate(140 140) scale(-1 -1)")];
}

/** Horizontal header ornament: line, curls, diamond, curls, line. */
export function dividerOrnament(color: string) {
  return svg(
    240,
    20,
    `<g fill='none' stroke='${color}' stroke-width='1.4' stroke-linecap='round'>
      <path d='M0 10h84M156 10h84'/>
      <path d='M88 10c6-8 14-8 20 0s-14 8-20 0zM152 10c-6-8-14-8-20 0s14 8 20 0z'/>
    </g>
    <g fill='${color}'><path d='M120 3l7 7-7 7-7-7z'/><circle cx='84' cy='10' r='1.8'/><circle cx='156' cy='10' r='1.8'/></g>`
  );
}

/** Thin gold pin-line corner tick, order [tl, tr, bl, br]. */
export function cornerTick(color: string): [string, string, string, string] {
  const body = `<path d='M2 30V2h28' fill='none' stroke='${color}' stroke-width='2'/><path d='M8 36V8h28' fill='none' stroke='${color}' stroke-width='1'/><circle cx='2' cy='2' r='2.4' fill='${color}'/>`;
  const make = (transform: string) => svg(40, 40, `<g transform='${transform}'>${body}</g>`);
  return [make(""), make("translate(40 0) scale(-1 1)"), make("translate(0 40) scale(1 -1)"), make("translate(40 40) scale(-1 -1)")];
}

/** Compose a list of `[url, position, size]` layers into one `background` value. */
export function layers(items: Array<[string, string, string]>) {
  return items.map(([url, position, size]) => `${url} ${position} / ${size} no-repeat`).join(", ");
}
