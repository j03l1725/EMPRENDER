import { readFileSync, writeFileSync } from "fs";
import { feature } from "topojson-client";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/countries-50m.json"));
const fc = feature(topo, topo.objects.countries);
const ec = fc.features.find((f) => f.properties.name === "Ecuador");
if (!ec) { console.log("nombres:", fc.features.map(f=>f.properties.name).filter(n=>/cua|Ecu/i.test(n))); process.exit(1); }

// Polígonos del país; nos quedamos con el continental (el de mayor área) y descartamos Galápagos.
const polys = ec.geometry.type === "Polygon" ? [ec.geometry.coordinates] : ec.geometry.coordinates;
const area = (ring) => Math.abs(ring.reduce((s, p, i) => {
  const q = ring[(i + 1) % ring.length];
  return s + (p[0] * q[1] - q[0] * p[1]);
}, 0) / 2);

const conAreas = polys.map((p) => ({ ring: p[0], a: area(p[0]) })).sort((x, y) => y.a - x.a);
console.log("polígonos:", conAreas.map((c) => c.a.toFixed(3)).join(", "));
const cont = conAreas[0].ring;   // continental

// Douglas-Peucker
const dist = (p, a, b) => {
  const [x, y] = p, [x1, y1] = a, [x2, y2] = b;
  const dx = x2 - x1, dy = y2 - y1;
  if (dx === 0 && dy === 0) return Math.hypot(x - x1, y - y1);
  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
};
const rdp = (pts, eps) => {
  if (pts.length < 3) return pts;
  let mi = 0, md = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = dist(pts[i], pts[0], pts[pts.length - 1]);
    if (d > md) { md = d; mi = i; }
  }
  if (md <= eps) return [pts[0], pts[pts.length - 1]];
  return [...rdp(pts.slice(0, mi + 1), eps).slice(0, -1), ...rdp(pts.slice(mi), eps)];
};

for (const eps of [0.02, 0.035, 0.05]) {
  const simp = rdp(cont, eps);
  // Proyección equirectangular: Ecuador está sobre la línea ecuatorial, la distorsión es mínima.
  const xs = simp.map((p) => p[0]), ys = simp.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const W = 100, H = (W * (maxY - minY)) / (maxX - minX);
  const px = (p) => [
    ((p[0] - minX) / (maxX - minX) * W).toFixed(2),
    ((maxY - p[1]) / (maxY - minY) * H).toFixed(2),
  ];
  const d = "M" + simp.map(px).map(([a, b]) => `${a} ${b}`).join("L") + "Z";
  console.log(`eps=${eps}  puntos=${simp.length}  chars=${d.length}  viewBox="0 0 ${W} ${H.toFixed(2)}"`);
  writeFileSync(`ec-${eps}.txt`, `viewBox="0 0 ${W} ${H.toFixed(2)}"\n${d}\n`);
}

// Capitales provinciales de las siete provincias focalizadas, proyectadas al mismo viewBox.
const simp2 = rdp(cont, 0.02);
const xs2 = simp2.map((p) => p[0]), ys2 = simp2.map((p) => p[1]);
const mnX = Math.min(...xs2), mxX = Math.max(...xs2), mnY = Math.min(...ys2), mxY = Math.max(...ys2);
const W2 = 100, H2 = (W2 * (mxY - mnY)) / (mxX - mnX);
const CAP = {
  Esmeraldas: [-79.6517, 0.9682], "Manabí": [-80.4545, -1.0546],
  "Santo Domingo de los Tsáchilas": [-79.1719, -0.2542], Carchi: [-77.7178, 0.8117],
  Imbabura: [-78.1223, 0.3517], "Sucumbíos": [-76.8828, 0.0847], Napo: [-77.8134, -0.9938],
};
console.log("\nmarcadores:");
for (const [n, [lon, lat]] of Object.entries(CAP)) {
  const x = ((lon - mnX) / (mxX - mnX)) * W2;
  const y = ((mxY - lat) / (mxY - mnY)) * H2;
  console.log(`  { n: "${n}", x: ${x.toFixed(2)}, y: ${y.toFixed(2)} },`);
}
