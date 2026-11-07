import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { buildTyre } from "../../utils/tyreModel";
import { clamp, easeInOut, lerp } from "../../utils/math";

type TyreSceneProps = {onReady?: () => void;};

type Pose = {x: number;y: number;yaw: number;camY: number;camZ: number;lookZ: number;};

export function TyreScene({ onReady }: TyreSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      readyRef.current?.();
      return;
    }

    const isMobile = window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0c0d0e, 1);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0c0d0e, 6, 14);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;

    const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.05, 60);

    const rig = buildTyre({ treadCount: isMobile ? 40 : 60, shadows: !isMobile });
    scene.add(rig.root);

    // Floor — dark brushed metal that catches reflections and the tyre's shadow
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x101113, metalness: 0.7, roughness: 0.42, envMapIntensity: 0.6 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.3;
    floor.receiveShadow = true;
    scene.add(floor);

    // Lighting
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 5, 4);
    key.castShadow = !isMobile;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -3;
    key.shadow.bias = -0.0005;
    key.shadow.normalBias = 0.02;
    key.shadow.radius = 6;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xb8c4cc, 1.6);
    rim.position.set(-5, 2, -4);
    scene.add(rim);

    const orange = new THREE.PointLight(0xe87532, 2.5, 3, 2);
    rig.axle.add(orange);

    // Dust particles for depth
    const particleCount = isMobile ? 120 : 260;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 4.2 - 1.2;
      positions[i * 3 + 2] = Math.random() * 7 - 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xb8bec2, size: 0.015, transparent: true, opacity: 0.35, depthWrite: false });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let poses = getPoses(window.innerWidth);
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const lookTarget = new THREE.Vector3();
    const clock = new THREE.Clock();
    let elapsed = 0;
    let raf = 0;
    let hasRendered = false;
    let lastScroll = window.scrollY;
    let scrollVel = 0;

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth * 2 - 1;
      pointer.ty = e.clientY / window.innerHeight * 2 - 1;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      poses = getPoses(window.innerWidth);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;

      const vh = window.innerHeight;
      const sy = window.scrollY;
      const contactEl = document.getElementById("contact");
      const finale = contactEl ? clamp(1 - contactEl.getBoundingClientRect().top / vh, 0, 1) : 0;
      const visible = sy < vh * 1.7 || finale > 0;
      scrollVel = lerp(scrollVel, Math.abs(sy - lastScroll) / Math.max(dt, 0.001), 0.1);
      lastScroll = sy;
      if (!visible && hasRendered) return;

      const dive = easeInOut(clamp(sy / (vh * 1.45), 0, 1));
      let pose = lerpPose(poses.hero, poses.dive, dive);
      if (finale > 0) pose = lerpPose(pose, poses.finale, easeInOut(finale));

      pointer.x = lerp(pointer.x, pointer.tx, 0.05);
      pointer.y = lerp(pointer.y, pointer.ty, 0.05);
      const influence = 1 - dive * 0.75 * (1 - finale);

      const bob = reduced ? 0 : Math.sin(elapsed * 0.8) * 0.035;
      rig.root.position.set(pose.x, pose.y + bob, 0);
      rig.root.rotation.x = -pointer.y * 0.12 * influence;
      rig.root.rotation.z = -pointer.x * 0.04 * influence;
      rig.orient.rotation.y = pose.yaw + pointer.x * 0.22 * influence;

      const baseSpeed = reduced ? 0.12 : 0.35;
      rig.spin.rotation.y -= dt * (baseSpeed + Math.min(scrollVel * 0.00035, 1.6));

      const angle = elapsed * 0.6;
      orange.position.set(Math.cos(angle) * 1.2, Math.sin(elapsed * 0.9) * 0.2, Math.sin(angle) * 1.2);
      orange.intensity = 2.5 + Math.sin(elapsed * 1.3) * 0.6;

      particles.rotation.y = elapsed * 0.01;

      camera.position.set(pointer.x * 0.15 * influence, pose.camY - pointer.y * 0.1 * influence, pose.camZ);
      lookTarget.set(0, 0, pose.lookZ);
      camera.lookAt(lookTarget);

      renderer.render(scene, camera);
      if (!hasRendered) {
        hasRendered = true;
        readyRef.current?.();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      rig.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      envTarget.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}

function getPoses(width: number): {hero: Pose;dive: Pose;finale: Pose;} {
  const mobile = width < 768;
  const tablet = width < 1100;
  const hero: Pose = mobile ?
  { x: 0.15, y: 0.75, yaw: 0.62, camY: 0.3, camZ: 7.6, lookZ: 0 } :
  { x: tablet ? 0.8 : 1.1, y: 0.08, yaw: 0.62, camY: 0.35, camZ: tablet ? 5.4 : 4.9, lookZ: 0 };
  const dive: Pose = { x: 0, y: 0, yaw: Math.PI / 2 - 0.1, camY: 0.08, camZ: mobile ? 2.1 : 1.75, lookZ: 0.95 };
  const finale: Pose = mobile ?
  { x: 0, y: 1.0, yaw: 0.9, camY: 0.3, camZ: 8, lookZ: 0 } :
  { x: tablet ? -0.9 : -1.25, y: 0, yaw: 0.9, camY: 0.3, camZ: 5.2, lookZ: 0 };
  return { hero, dive, finale };
}

function lerpPose(a: Pose, b: Pose, t: number): Pose {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    yaw: lerp(a.yaw, b.yaw, t),
    camY: lerp(a.camY, b.camY, t),
    camZ: lerp(a.camZ, b.camZ, t),
    lookZ: lerp(a.lookZ, b.lookZ, t)
  };
}