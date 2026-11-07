import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type TyreRig = {
  root: THREE.Group;
  orient: THREE.Group;
  axle: THREE.Group;
  spin: THREE.Group;
  dispose: () => void;
};

type TyreOptions = {treadCount: number;shadows: boolean;};

type TreadRow = {
  y: number;
  radius: number;
  depth: number;
  lengthFactor: number;
  height: number;
  skew: number;
  alternate: boolean;
  offset: number;
};

// Half cross-section of a commercial tyre (radius, axial position), bead → crown.
const HALF_PROFILE: [number, number][] = [
[0.588, -0.232],
[0.598, -0.252],
[0.622, -0.268],
[0.665, -0.281],
[0.72, -0.29],
[0.79, -0.296],
[0.86, -0.294],
[0.905, -0.284],
[0.938, -0.268],
[0.958, -0.246],
[0.967, -0.215],
[0.97, -0.16],
[0.971, -0.08]];


const TREAD_ROWS: TreadRow[] = [
{ y: 0.2, radius: 0.983, depth: 0.08, lengthFactor: 0.8, height: 0.05, skew: 0, alternate: false, offset: 0 },
{ y: -0.2, radius: 0.983, depth: 0.08, lengthFactor: 0.8, height: 0.05, skew: 0, alternate: false, offset: 0 },
{ y: 0.1, radius: 0.992, depth: 0.08, lengthFactor: 0.7, height: 0.05, skew: 0.32, alternate: true, offset: 0.5 },
{ y: -0.1, radius: 0.992, depth: 0.08, lengthFactor: 0.7, height: 0.05, skew: -0.32, alternate: true, offset: 0.5 },
{ y: 0, radius: 0.994, depth: 0.065, lengthFactor: 0.68, height: 0.05, skew: 0.38, alternate: true, offset: 0 }];


const SIDEWALL_TEXT =
"VAMSHI RUBBER LIMITED  ·  PRECURED RETREAD MATERIAL  ·  ENGINEERED TO ENDURE  ·  ISO 9001:2015  ·  ";

export function buildTyre({ treadCount, shadows }: TyreOptions): TyreRig {
  const root = new THREE.Group();
  const orient = new THREE.Group();
  const axle = new THREE.Group();
  const spin = new THREE.Group();
  root.add(orient);
  orient.add(axle);
  axle.add(spin);
  axle.rotation.x = Math.PI / 2;

  const textures: THREE.Texture[] = [];
  const grain = createGrainTexture(256);
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  grain.repeat.set(14, 3);
  textures.push(grain);

  const rubber = new THREE.MeshPhysicalMaterial({
    color: 0x18191a,
    roughness: 0.86,
    metalness: 0,
    roughnessMap: grain,
    bumpMap: grain,
    bumpScale: 0.9,
    sheen: 0.35,
    sheenRoughness: 0.6,
    sheenColor: 0x3a3d40,
    envMapIntensity: 0.55,
    side: THREE.DoubleSide
  });
  const alloy = new THREE.MeshStandardMaterial({ color: 0xc3c8cc, metalness: 1, roughness: 0.24, envMapIntensity: 1.2, side: THREE.DoubleSide });
  const alloyDark = new THREE.MeshStandardMaterial({ color: 0x5b6064, metalness: 1, roughness: 0.38 });
  const voidMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 1 });
  const signal = new THREE.MeshStandardMaterial({ color: 0xe87532, emissive: 0xe87532, emissiveIntensity: 0.6, roughness: 0.4 });

  const addMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, configure?: (m: THREE.Mesh) => void) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = shadows;
    mesh.receiveShadow = shadows;
    configure?.(mesh);
    spin.add(mesh);
    return mesh;
  };

  // Carcass
  const mirrored = HALF_PROFILE.slice().reverse().map(([r, y]) => [r, -y] as [number, number]);
  const profile = [...HALF_PROFILE, [0.971, 0] as [number, number], ...mirrored].map(([r, y]) => new THREE.Vector2(r, y));
  addMesh(new THREE.LatheGeometry(profile, 180), rubber);

  // Tread blocks
  const pitch = Math.PI * 2 / treadCount;
  const up = new THREE.Vector3(0, 1, 0);
  const zAxis = new THREE.Vector3(0, 0, 1);
  const basis = new THREE.Matrix4();
  const matrix = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const skewQ = new THREE.Quaternion();
  const pos = new THREE.Vector3();
  const unit = new THREE.Vector3(1, 1, 1);

  TREAD_ROWS.forEach((row) => {
    const length = pitch * row.radius * row.lengthFactor;
    const geometry = new RoundedBoxGeometry(length, row.depth, row.height, 2, 0.008);
    const mesh = new THREE.InstancedMesh(geometry, rubber, treadCount);
    for (let i = 0; i < treadCount; i += 1) {
      const theta = (i + row.offset) * pitch;
      const radial = new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta));
      const tangent = new THREE.Vector3(-Math.sin(theta), 0, Math.cos(theta));
      basis.makeBasis(tangent, up, radial.clone().negate());
      q.setFromRotationMatrix(basis);
      const skew = row.alternate && i % 2 === 1 ? -row.skew : row.skew;
      skewQ.setFromAxisAngle(zAxis, skew);
      q.multiply(skewQ);
      pos.copy(radial).multiplyScalar(row.radius);
      pos.y = row.y;
      matrix.compose(pos, q, unit);
      mesh.setMatrixAt(i, matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = shadows;
    mesh.receiveShadow = shadows;
    spin.add(mesh);
  });

  // Sidewall ribs
  [
  [0.69, 0.293],
  [0.905, 0.286]].
  forEach(([r, y]) => {
    [y, -y].forEach((side) => {
      addMesh(new THREE.TorusGeometry(r, 0.0045, 6, 160), rubber, (m) => {
        m.rotation.x = Math.PI / 2;
        m.position.y = side;
      });
    });
  });

  // Sidewall lettering
  const lettering = createSidewallTexture();
  textures.push(lettering);
  const letteringMat = new THREE.MeshStandardMaterial({
    map: lettering,
    transparent: true,
    roughness: 0.6,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2
  });
  addMesh(new THREE.RingGeometry(0.73, 0.87, 160), letteringMat, (m) => {
    m.rotation.x = -Math.PI / 2;
    m.position.y = 0.3;
    m.castShadow = false;
  });

  // Wheel
  addMesh(new THREE.CylinderGeometry(0.586, 0.586, 0.47, 96, 1, true), alloyDark);
  [0.238, -0.238].forEach((y) => {
    addMesh(new THREE.TorusGeometry(0.59, 0.016, 12, 128), alloy, (m) => {
      m.rotation.x = Math.PI / 2;
      m.position.y = y;
    });
  });
  const faceProfile = [
  [0.001, 0.205],
  [0.16, 0.205],
  [0.2, 0.185],
  [0.5, 0.145],
  [0.555, 0.18],
  [0.585, 0.232]].
  map(([r, y]) => new THREE.Vector2(r, y));
  addMesh(new THREE.LatheGeometry(faceProfile, 96), alloy);
  addMesh(new THREE.CylinderGeometry(0.585, 0.585, 0.01, 64), alloyDark, (m) => {
    m.position.y = -0.2;
  });

  const holeCount = 10;
  const holes = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.05, 0.05, 0.012, 28), voidMat, holeCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < holeCount; i += 1) {
    const theta = i / holeCount * Math.PI * 2;
    dummy.position.set(Math.cos(theta) * 0.36, 0.166, Math.sin(theta) * 0.36);
    dummy.rotation.set(0, -theta, 0);
    dummy.scale.set(1.5, 1, 0.9);
    dummy.updateMatrix();
    holes.setMatrixAt(i, dummy.matrix);
  }
  spin.add(holes);

  addMesh(new THREE.CylinderGeometry(0.15, 0.16, 0.05, 48), alloy, (m) => {
    m.position.y = 0.225;
  });
  const nutCount = 10;
  const nuts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.022, 0.022, 0.035, 6), alloyDark, nutCount);
  for (let i = 0; i < nutCount; i += 1) {
    const theta = i / nutCount * Math.PI * 2;
    dummy.position.set(Math.cos(theta) * 0.115, 0.262, Math.sin(theta) * 0.115);
    dummy.rotation.set(0, theta, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    nuts.setMatrixAt(i, dummy.matrix);
  }
  nuts.castShadow = shadows;
  spin.add(nuts);
  addMesh(new THREE.CylinderGeometry(0.065, 0.075, 0.03, 40), alloyDark, (m) => {
    m.position.y = 0.262;
  });
  addMesh(new THREE.TorusGeometry(0.07, 0.005, 8, 64), signal, (m) => {
    m.rotation.x = Math.PI / 2;
    m.position.y = 0.279;
  });

  const dispose = () => {
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) geometries.add(mesh.geometry);
      if (mesh.material) {
        (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((m) => materials.add(m));
      }
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
  };

  return { root, orient, axle, spin, dispose };
}

function createGrainTexture(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const image = ctx.createImageData(size, size);
    for (let i = 0; i < size * size; i += 1) {
      const blemish = Math.random() < 0.015 ? 90 : 0;
      const v = 215 + Math.random() * 40 - blemish;
      image.data[i * 4] = v;
      image.data[i * 4 + 1] = v;
      image.data[i * 4 + 2] = v;
      image.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
  }
  return new THREE.CanvasTexture(canvas);
}

function createSidewallTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.translate(size / 2, size / 2);
    ctx.fillStyle = "#5a5e62";
    ctx.font = "600 22px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const chars = SIDEWALL_TEXT.split("");
    const step = Math.PI * 2 / chars.length;
    const radius = 0.8 / 0.87 * (size / 2);
    chars.forEach((ch, i) => {
      ctx.save();
      ctx.rotate(i * step);
      ctx.translate(0, -radius);
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    });
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}