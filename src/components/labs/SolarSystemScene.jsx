// SolarSystemScene.jsx — COSMOS SIMULATOR v2
// Volumetric GLSL sun · UnrealBloom · Planet breakdown · Sci-fi HUD

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls, EffectComposer, RenderPass, UnrealBloomPass } from 'three-stdlib'
import gsap from 'gsap'

/* ─── Helpers ─── */
function rnd(a, b) { return a + Math.random() * (b - a) }

function makeTex(fn, w = 1024, h = 512) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  fn(c.getContext('2d'), w, h)
  return new THREE.CanvasTexture(c)
}

/* ─── Procedural textures (Uranus / Neptune — high-quality canvas) ─── */
const proceduralTex = {
  uranus: () => makeTex((ctx, W, H) => {
    // Base pale cyan-green with polar gradient
    const g = ctx.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0,   '#2a8fa0')
    g.addColorStop(0.2, '#5ec9d8')
    g.addColorStop(0.5, '#7de8f0')
    g.addColorStop(0.8, '#5ec9d8')
    g.addColorStop(1,   '#2a8fa0')
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)

    // Subtle atmospheric bands
    for (let i = 0; i < 35; i++) {
      const y = rnd(0, H)
      const h = rnd(4, 28)
      const alpha = rnd(0.04, 0.13)
      const lighter = Math.random() > 0.5
      ctx.fillStyle = lighter
        ? `rgba(180,240,248,${alpha})`
        : `rgba(30,110,130,${alpha})`
      ctx.fillRect(0, y, W, h)
    }

    // Polar haze caps
    const pg1 = ctx.createRadialGradient(W/2, 0, 0, W/2, 0, H*0.32)
    pg1.addColorStop(0, 'rgba(210,248,252,0.22)')
    pg1.addColorStop(1, 'rgba(210,248,252,0)')
    ctx.fillStyle = pg1; ctx.fillRect(0, 0, W, H)

    const pg2 = ctx.createRadialGradient(W/2, H, 0, W/2, H, H*0.32)
    pg2.addColorStop(0, 'rgba(210,248,252,0.18)')
    pg2.addColorStop(1, 'rgba(210,248,252,0)')
    ctx.fillStyle = pg2; ctx.fillRect(0, 0, W, H)

    // Fine turbulence detail
    for (let i = 0; i < 80; i++) {
      const x = rnd(0, W); const y = rnd(0, H)
      ctx.fillStyle = `rgba(255,255,255,${rnd(0.01,0.05)})`
      ctx.beginPath(); ctx.ellipse(x, y, rnd(8,40), rnd(1,4), 0, 0, Math.PI*2); ctx.fill()
    }
  }, 4096, 2048),

  neptune: () => makeTex((ctx, W, H) => {
    // Deep royal blue base
    const g = ctx.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0,   '#0d1a6b')
    g.addColorStop(0.25,'#1a32b8')
    g.addColorStop(0.5, '#2040cc')
    g.addColorStop(0.75,'#1a32b8')
    g.addColorStop(1,   '#0d1a6b')
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)

    // Atmospheric band storms
    for (let i = 0; i < 40; i++) {
      const y = rnd(0, H)
      const h = rnd(3, 22)
      const alpha = rnd(0.05, 0.18)
      const lighter = Math.random() > 0.45
      ctx.fillStyle = lighter
        ? `rgba(80,120,240,${alpha})`
        : `rgba(5,10,90,${alpha})`
      ctx.fillRect(0, y, W, h)
    }

    // Great Dark Spot — iconic oval storm system
    ctx.save()
    ctx.translate(W * 0.62, H * 0.42)
    const gds = ctx.createRadialGradient(0, 0, 4, 0, 0, 75)
    gds.addColorStop(0, 'rgba(5,8,55,0.85)')
    gds.addColorStop(0.6, 'rgba(10,18,80,0.55)')
    gds.addColorStop(1, 'rgba(10,18,80,0)')
    ctx.fillStyle = gds
    ctx.beginPath(); ctx.ellipse(0, 0, 75, 42, 0.35, 0, Math.PI * 2); ctx.fill()
    ctx.restore()

    // Bright white scooter cloud streaks
    for (let i = 0; i < 12; i++) {
      const x = rnd(0, W); const y = rnd(H*0.1, H*0.9)
      ctx.fillStyle = `rgba(220,235,255,${rnd(0.06,0.18)})`
      ctx.beginPath(); ctx.ellipse(x, y, rnd(30,90), rnd(2,7), rnd(-0.3,0.3), 0, Math.PI*2); ctx.fill()
    }

    // Polar glow
    const np = ctx.createRadialGradient(W/2, 0, 0, W/2, 0, H*0.28)
    np.addColorStop(0, 'rgba(100,150,255,0.20)')
    np.addColorStop(1, 'rgba(100,150,255,0)')
    ctx.fillStyle = np; ctx.fillRect(0, 0, W, H)

    // Fine turbulence
    for (let i = 0; i < 100; i++) {
      const x = rnd(0, W); const y = rnd(0, H)
      ctx.fillStyle = `rgba(180,210,255,${rnd(0.01,0.04)})`
      ctx.beginPath(); ctx.ellipse(x, y, rnd(5,35), rnd(1,3.5), rnd(-0.5,0.5), 0, Math.PI*2); ctx.fill()
    }
  }, 4096, 2048),
}

/* ─── Planet definitions with telemetry data ─── */
/* texPath = primary (4K/8K from solarsystemscope.com). fallbackPath = local low-res used until remote loads. */
const SSS = 'https://www.solarsystemscope.com/textures/download/'
const PLANET_DATA = [
  { name:'MERCURY', class:'Barren Rock',
    radius:0.17, orbit:3.2,  speed:4.15,  tilt:0.03,
    texPath: SSS+'8k_mercury.jpg', fallbackPath:'mercurymap.jpg',
    emissive:0x180e08, color:'#9e8878',
    stats:[{l:'GRAVITY',v:'3.7 m/s²'},{l:'TEMP',v:'167°C'},{l:'MOONS',v:'0'},{l:'DIAMETER',v:'4,879 km'}],
    status:'[ DEAD WORLD ]', sCol:'#94a3b8', coreColor:0x555555,
    coreDetails:[{layer:'CRUST',desc:'Solid Silicate Rock (100-300 km)'},{layer:'MANTLE',desc:'Thin Silicate Shell'},{layer:'CORE',desc:'Massive Iron Core (~85% of volume)'}] },

  { name:'VENUS', class:'Toxic Greenhouse',
    radius:0.24, orbit:4.9,  speed:1.62,  tilt:0.05,
    texPath: SSS+'4k_venus_atmosphere.jpg', fallbackPath:'venusmap.jpg',
    emissive:0x3a2810, color:'#d4a843',
    stats:[{l:'GRAVITY',v:'8.87 m/s²'},{l:'TEMP',v:'464°C'},{l:'MOONS',v:'0'},{l:'DIAMETER',v:'12,104 km'}],
    status:'[ EXTREME HAZARD ]', sCol:'#ef4444', coreColor:0xff8800,
    coreDetails:[{layer:'CRUST',desc:'Basaltic Rock & Intense Volcanoes'},{layer:'MANTLE',desc:'Rocky Silicate Shell'},{layer:'CORE',desc:'Liquid Iron-Nickel (No magnetic dynamo)'}] },

  { name:'EARTH', class:'Terrestrial Planet',
    radius:0.27, orbit:6.6,  speed:1.00,  tilt:0.41,
    texPath: SSS+'8k_earth_daymap.jpg',    fallbackPath:'earth-blue-marble.jpg',
    cloudPath:SSS+'8k_earth_clouds.jpg',   fallbackCloud:'earth-clouds.png',
    nightPath:SSS+'8k_earth_nightmap.jpg', fallbackNight:'earth-night.jpg',
    bumpPath:'earth-topology.png',
    emissive:0x061428, atmos:true, color:'#1e6fa5', isEarth:true,
    stats:[{l:'GRAVITY',v:'9.8 m/s²'},{l:'TEMP',v:'15°C'},{l:'MOONS',v:'1'},{l:'DIAMETER',v:'12,742 km'}],
    status:'[ HABITABLE ZONE ]', sCol:'#4ade80', coreColor:0xff4400,
    coreDetails:[{layer:'CRUST',desc:'Silicate Rock & Oceans (0-40 km)'},{layer:'MANTLE',desc:'Viscous Silicate Magma (2,890 km)'},{layer:'OUTER CORE',desc:'Liquid Iron (Generates Magnetic Field)'},{layer:'INNER CORE',desc:'Solid Iron-Nickel (5,400°C)'}] },

  { name:'MARS', class:'Dust Planet',
    radius:0.19, orbit:8.8,  speed:0.53,  tilt:0.44,
    texPath: SSS+'8k_mars.jpg', fallbackPath:'marsmap1k.jpg',
    emissive:0x280800, color:'#c1440e',
    stats:[{l:'GRAVITY',v:'3.71 m/s²'},{l:'TEMP',v:'-65°C'},{l:'MOONS',v:'2'},{l:'DIAMETER',v:'6,779 km'}],
    status:'[ COLONIZATION TARGET ]', sCol:'#facc15', coreColor:0xcc3300,
    coreDetails:[{layer:'CRUST',desc:'Iron Oxide Dust, Basaltic Rock'},{layer:'MANTLE',desc:'Dormant Silicate Rock'},{layer:'CORE',desc:'Partially Liquid Iron, Sulfur, Nickel'}] },

  { name:'JUPITER', class:'Gas Giant',
    radius:0.72, orbit:13.2, speed:0.084, tilt:0.05,
    texPath: SSS+'8k_jupiter.jpg', fallbackPath:'jupitermap.jpg',
    emissive:0x201008, color:'#c8a46a',
    stats:[{l:'GRAVITY',v:'24.79 m/s²'},{l:'TEMP',v:'-110°C'},{l:'MOONS',v:'95'},{l:'DIAMETER',v:'139,820 km'}],
    status:'[ HIGH GRAVITY ]', sCol:'#ef4444', coreColor:0x555555,
    coreDetails:[{layer:'ATMOSPHERE',desc:'Hydrogen 90%, Helium 10%'},{layer:'MANTLE',desc:'Deep Ocean of Liquid Metallic Hydrogen'},{layer:'CORE',desc:'Dense Rock & Exotic Ice Elements'}] },

  { name:'SATURN', class:'Gas Giant',
    radius:0.60, orbit:17.8, speed:0.034, tilt:0.47,
    texPath: SSS+'8k_saturn.jpg', fallbackPath:'saturnmap.jpg',
    ringPath:SSS+'8k_saturn_ring_alpha.png', fallbackRing:'saturnringcolor.jpg',
    emissive:0x1e1808, rings:true, color:'#e8d590',
    stats:[{l:'GRAVITY',v:'10.44 m/s²'},{l:'TEMP',v:'-140°C'},{l:'MOONS',v:'146'},{l:'DIAMETER',v:'116,460 km'}],
    status:'[ RING SYSTEM ]', sCol:'#facc15', coreColor:0x666666,
    coreDetails:[{layer:'ATMOSPHERE',desc:'Hydrogen, Helium, Ammonia Clouds'},{layer:'MANTLE',desc:'Liquid Metallic Hydrogen'},{layer:'CORE',desc:'Rocky Silicates & Metallic Elements'}] },

  { name:'URANUS', class:'Ice Giant',
    radius:0.37, orbit:22.0, speed:0.012, tilt:1.71,
    texPath: SSS+'2k_uranus.jpg', procedural:'uranus',
    emissive:0x0a1a20, color:'#4fc3d7',
    stats:[{l:'GRAVITY',v:'8.69 m/s²'},{l:'TEMP',v:'-195°C'},{l:'MOONS',v:'27'},{l:'DIAMETER',v:'50,724 km'}],
    status:'[ ICE GIANT ]', sCol:'#67e8f9', coreColor:0x0a4a5a,
    coreDetails:[{layer:'ATMOSPHERE',desc:'Hydrogen, Helium, Methane'},{layer:'MANTLE',desc:'Water, Ammonia, Methane Ice'},{layer:'CORE',desc:'Rock & Ice (~5,000°C)'}] },

  { name:'NEPTUNE', class:'Ice Giant',
    radius:0.35, orbit:26.0, speed:0.006, tilt:0.49,
    texPath: SSS+'2k_neptune.jpg', procedural:'neptune',
    emissive:0x080820, color:'#1a2e9e',
    stats:[{l:'GRAVITY',v:'11.15 m/s²'},{l:'TEMP',v:'-200°C'},{l:'MOONS',v:'16'},{l:'DIAMETER',v:'49,244 km'}],
    status:'[ WINDIEST PLANET ]', sCol:'#818cf8', coreColor:0x1a2e9e,
    coreDetails:[{layer:'ATMOSPHERE',desc:'Hydrogen, Helium, Methane'},{layer:'MANTLE',desc:'Water, Ammonia, Methane Ice'},{layer:'CORE',desc:'Rocky & Icy Core'}] },
]

const SUN_DATA = {
  name:'THE SUN', class:'G-Type Main-Sequence Star', isSun:true, isPlanet:false, radius:1.5,
  stats:[{l:'CORE TEMP',v:'15M °C'},{l:'MASS',v:'330,000× Earth'},{l:'RADIUS',v:'696,000 km'},{l:'TYPE',v:'G2V Yellow Dwarf'}],
  status:'[ MASSIVE ENERGY SOURCE ]', sCol:'#ffaa00',
  coreDetails:[{layer:'CORONA',desc:'Plasma Atmosphere (1M °C)'},{layer:'RADIATIVE ZONE',desc:'Energy transport (100,000 years)'},{layer:'CORE',desc:'Nuclear Fusion Engine (15M °C)'}],
}

const BASE = '/assets/textures/'

/* ─── GLSL Sun: animated fbm noise + 3D limb darkening ─── */
const SUN_VERT = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`
const SUN_FRAG = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1); p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);
    return mix(
      mix(mix(hash(i),             hash(i+vec3(1,0,0)),f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x), f.y),
      f.z
    );
  }
  float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p *= 2.02;
    f += 0.2500 * noise(p); p *= 2.03;
    f += 0.1250 * noise(p); p *= 2.01;
    f += 0.0625 * noise(p);
    return f / 0.9375;
  }
  void main() {
    vec3 p = vPosition * 0.15 + time * 0.3;
    float n = fbm(p);
    vec3 col = mix(color1, color2, clamp(n * 1.5, 0.0, 1.0));

    // Limb darkening — makes the sphere look 3D like a real star
    float cosTheta = max(0.0, dot(normalize(vNormal), normalize(vViewPosition)));
    float limb = pow(cosTheta, 0.5);
    col *= (0.18 + 0.82 * limb);

    // Solar granulation bright cells
    float n2 = fbm(vPosition * 0.38 + time * 0.12);
    col += vec3(0.9, 0.45, 0.0) * max(0.0, n2 - 0.50) * cosTheta * limb;

    // Hot white-yellow core highlight
    float n3 = fbm(vPosition * 1.1 + time * 0.45);
    col += vec3(1.0, 0.96, 0.72) * max(0.0, n3 - 0.62) * cosTheta;

    gl_FragColor = vec4(col, 1.0);
  }
`

/* ─── Texture loader with anisotropy ─── */
function loadTex(loader, url, maxAniso = 16) {
  const tex = loader.load(url)
  tex.anisotropy = maxAniso
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  return tex
}

/* ─── Hi-res upgrade: show local fallback immediately, swap in 4K/8K when remote completes ─── */
function loadTexWithUpgrade(loader, remoteUrl, localPath, maxAniso = 16, onUpgrade) {
  // Start with the local (guaranteed) texture so nothing appears black.
  const local = loadTex(loader, BASE + localPath, maxAniso)
  local.colorSpace = THREE.SRGBColorSpace
  // Attempt hi-res; if it resolves, swap via callback.
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const hi = new THREE.Texture(img)
    hi.colorSpace   = THREE.SRGBColorSpace
    hi.anisotropy   = maxAniso
    hi.wrapS = hi.wrapT = THREE.RepeatWrapping
    hi.generateMipmaps = true
    hi.minFilter    = THREE.LinearMipmapLinearFilter
    hi.needsUpdate  = true
    onUpgrade?.(hi)
  }
  img.onerror = () => { /* keep local silently */ }
  img.src = remoteUrl
  return local
}

/* ─── Milky Way background ─── */
function buildMilkyWay(scene, loader) {
  const bgGeo = new THREE.SphereGeometry(600, 64, 64)
  const bgMat = new THREE.MeshBasicMaterial({
    map: loadTex(loader, BASE + 'starfield10k.jpg'),
    side: THREE.BackSide, color: 0xcccccc, depthWrite: false,
  })
  scene.add(new THREE.Mesh(bgGeo, bgMat))

  // Colored particle band
  const count = 12000
  const pos = new Float32Array(count * 3)
  const cols = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = 80 + Math.random() * 350
    const theta = Math.random() * Math.PI * 2
    const y = (Math.random() - 0.5) * (Math.random() * 50)
    pos[i*3] = r * Math.cos(theta); pos[i*3+1] = y; pos[i*3+2] = r * Math.sin(theta)
    const mix = Math.random()
    const c = new THREE.Color()
    if (mix > 0.8) c.setHex(0x5588ff)
    else if (mix > 0.5) c.setHex(0xffaa55)
    else c.setHex(0xffffff)
    cols[i*3] = c.r; cols[i*3+1] = c.g; cols[i*3+2] = c.b
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  pGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3))
  const galaxy = new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.7, vertexColors: true, transparent: true, opacity: 0.5,
    sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
  }))
  galaxy.rotation.x = Math.PI / 8
  scene.add(galaxy)
  return galaxy
}

/* ─── Volumetric GLSL Sun ─── */
function buildSun(scene) {
  const grp = new THREE.Group()
  const uniforms = {
    time:   { value: 0 },
    color1: { value: new THREE.Color(0xff4400) },
    color2: { value: new THREE.Color(0xffaa00) },
  }
  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 64, 64),
    new THREE.ShaderMaterial({ uniforms, vertexShader: SUN_VERT, fragmentShader: SUN_FRAG })
  )
  grp.add(sunMesh)

  // Glow halos — single, very subtle corona. Let bloom do the work.
  const glows = [
    [1.56, 0.20, 0xffd88a],  // tight chromosphere only
  ].map(([s, a, col]) => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(s, 32, 32),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: a, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    grp.add(m); return m
  })

  const light = new THREE.PointLight(0xfff5e0, 4.5, 500, 1.2)
  grp.add(light)

  // Invisible hitbox for raycasting
  const hitbox = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 8, 8),
    new THREE.MeshBasicMaterial({ visible: false })
  )
  hitbox.userData = { isSun: true }
  grp.add(hitbox)

  scene.add(grp)
  return { grp, sunMesh, uniforms, light, glows, hitbox }
}

/* ─── Planet builder ─── */
function buildPlanet(scene, data, loader, maxAniso) {
  const grp = new THREE.Group()

  // Base surface texture: local-first, upgrades to 4K/8K when/if remote loads.
  let tex = null
  if (data.fallbackPath) {
    tex = loadTexWithUpgrade(loader, data.texPath, data.fallbackPath, maxAniso, (hi) => {
      mat.map?.dispose?.()
      mat.map = hi; mat.needsUpdate = true
    })
  } else if (data.procedural) {
    // Uranus / Neptune — procedural is the reliable baseline; remote is an optional upgrade.
    tex = proceduralTex[data.procedural]()
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = maxAniso
    if (data.texPath) {
      const img = new Image(); img.crossOrigin = 'anonymous'
      img.onload = () => {
        const hi = new THREE.Texture(img)
        hi.colorSpace = THREE.SRGBColorSpace
        hi.anisotropy = maxAniso
        hi.wrapS = hi.wrapT = THREE.RepeatWrapping
        hi.generateMipmaps = true
        hi.minFilter = THREE.LinearMipmapLinearFilter
        hi.needsUpdate = true
        mat.map?.dispose?.(); mat.map = hi; mat.needsUpdate = true
      }
      img.src = data.texPath
    }
  }

  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    bumpMap: data.bumpPath ? loadTex(loader, BASE + data.bumpPath, maxAniso) : null,
    bumpScale: 0.05,
    roughness: 0.82,
    metalness: 0.02,
    emissive: new THREE.Color(data.emissive || 0x000000),
    emissiveIntensity: 0.08,
    side: THREE.FrontSide,
    transparent: true,
  })

  const mesh = new THREE.Mesh(new THREE.SphereGeometry(data.radius, 96, 96), mat)
  mesh.castShadow = true; mesh.receiveShadow = true
  mesh.userData = { isPlanet: true, planetData: data }
  grp.add(mesh)

  // Earth: clouds + night lights + atmosphere (each with hi-res upgrade path)
  let cloudMat = null
  if (data.fallbackCloud) {
    const ct = loadTexWithUpgrade(loader, data.cloudPath, data.fallbackCloud, maxAniso, (hi) => {
      cloudMat.map?.dispose?.(); cloudMat.map = hi; cloudMat.needsUpdate = true
    })
    cloudMat = new THREE.MeshStandardMaterial({ map: ct, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
    const cm = new THREE.Mesh(new THREE.SphereGeometry(data.radius * 1.015, 96, 96), cloudMat)
    cm.userData = { isCloud: true }
    grp.add(cm)
  }
  if (data.fallbackNight) {
    const nightMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false })
    nightMat.map = loadTexWithUpgrade(loader, data.nightPath, data.fallbackNight, maxAniso, (hi) => {
      nightMat.map?.dispose?.(); nightMat.map = hi; nightMat.needsUpdate = true
    })
    const nm = new THREE.Mesh(new THREE.SphereGeometry(data.radius * 1.001, 96, 96), nightMat)
    nm.userData = { isNight: true }
    grp.add(nm)
  }
  if (data.atmos) {
    grp.add(new THREE.Mesh(new THREE.SphereGeometry(data.radius * 1.06, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x2255cc, transparent: true, opacity: 0.028, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false })))
  }

  // Saturn rings
  let ringMat = null
  if (data.rings) {
    const rt = data.fallbackRing
      ? loadTexWithUpgrade(loader, data.ringPath, data.fallbackRing, maxAniso, (hi) => {
          ringMat.map?.dispose?.(); ringMat.map = hi; ringMat.needsUpdate = true
        })
      : loadTex(loader, BASE + 'saturnringcolor.jpg', maxAniso)
    const rg = new THREE.RingGeometry(data.radius * 1.3, data.radius * 2.6, 180)
    const rp = rg.attributes.position; const ruv = rg.attributes.uv; const rv3 = new THREE.Vector3()
    for (let i = 0; i < rp.count; i++) { rv3.fromBufferAttribute(rp, i); ruv.setXY(i, rv3.length() / (data.radius * 2.6), 0.5) }
    rg.attributes.uv.needsUpdate = true
    ringMat = new THREE.MeshBasicMaterial({ map: rt, transparent: true, opacity: 0.88, side: THREE.DoubleSide, depthWrite: false })
    const rm = new THREE.Mesh(rg, ringMat); rm.rotation.x = -Math.PI / 2.5
    grp.add(rm)
  }

  // Breakdown core (hidden until triggered)
  const coreGroup = new THREE.Group()
  coreGroup.visible = false
  coreGroup.add(
    new THREE.Mesh(new THREE.SphereGeometry(data.radius * 0.7, 32, 32), new THREE.MeshStandardMaterial({ color: data.coreColor, roughness: 0.9 })),
    new THREE.Mesh(new THREE.SphereGeometry(data.radius * 0.45, 32, 32), new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0xff4400, emissiveIntensity: 0.5 })),
    new THREE.Mesh(new THREE.SphereGeometry(data.radius * 0.2, 32, 32), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1 })),
  )
  mesh.add(coreGroup)

  // Orbit path
  const orb = new THREE.Mesh(
    new THREE.RingGeometry(data.orbit - 0.015, data.orbit + 0.015, 200),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.04, side: THREE.DoubleSide, depthWrite: false })
  )
  orb.rotation.x = -Math.PI / 2
  scene.add(orb)

  scene.add(grp)
  return { grp, mesh, data, mat, cloudMat, ringMat, coreGroup }
}

/* ─── Asteroid belt ─── */
function buildAsteroidBelt(scene) {
  const count = 2000
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2
    const r = 10.2 + Math.random() * 2.0
    pos[i*3] = Math.cos(a)*r; pos[i*3+1] = (Math.random()-0.5)*0.6; pos[i*3+2] = Math.sin(a)*r
    const b = 0.25 + Math.random() * 0.35
    col[i*3] = b; col[i*3+1] = b*0.9; col[i*3+2] = b*0.8
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size:0.06, vertexColors:true, transparent:true, opacity:0.5, blending:THREE.AdditiveBlending, depthWrite:false })))
}

/* ─── Telemetry Panel ─── */
function TelemetryPanel({ entity, onClose, onBreakdown, isBrokenDown }) {
  if (!entity) return null
  const ac = entity.sCol || '#06b6d4'
  return (
    <div data-ui="true" style={{
      position:'absolute', top:'80px', right:'16px',
      width:'240px', maxHeight:'56vh', overflowY:'auto',
      background:'rgba(5,5,10,0.90)',
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px',
      boxShadow:'0 20px 40px rgba(0,0,0,0.9)',
      padding:'14px', zIndex:100, pointerEvents:'all',
      display:'flex', flexDirection:'column', gap:'10px',
      scrollbarWidth:'thin', scrollbarColor:'#06b6d4 transparent',
    }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', borderBottom:'1px solid rgba(255,255,255,0.08)', paddingBottom:'10px' }}>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'1.15rem', fontWeight:800, color:'#fff', letterSpacing:'-0.02em', textTransform:'uppercase' }}>{entity.name}</div>
          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:'8px', color:'#06b6d4', letterSpacing:'0.08em', marginTop:'2px' }}>{entity.class}</div>
        </div>
        <button onClick={onClose} data-ui="true" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'6px', color:'rgba(255,255,255,0.5)', cursor:'pointer', padding:'4px 8px', fontFamily:"'Fira Code',monospace", fontSize:'10px' }}>✕</button>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
        {entity.stats?.map(s => (
          <div key={s.l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:"'Fira Code',monospace", fontSize:'8px', color:'rgba(255,255,255,0.35)', letterSpacing:'0.06em' }}>{s.l}</span>
            <span style={{ fontFamily:"'Fira Code',monospace", fontSize:'10px', color:'#fff', fontWeight:700 }}>{s.v}</span>
          </div>
        ))}
      </div>

      {/* Status badge */}
      <div style={{ padding:'6px', borderRadius:'6px', textAlign:'center', fontFamily:"'Fira Code',monospace", fontSize:'9px', fontWeight:700, letterSpacing:'0.12em', color:ac, border:`1px solid ${ac}40`, background:`${ac}18` }}>
        {entity.status}
      </div>

      {/* Core breakdown */}
      {!entity.isSun && (
        <>
          {isBrokenDown && entity.coreDetails?.length > 0 && (
            <div style={{ borderTop:'1px solid rgba(6,182,212,0.25)', paddingTop:'10px', display:'flex', flexDirection:'column', gap:'6px' }}>
              <div style={{ fontFamily:"'Fira Code',monospace", fontSize:'8px', color:'#06b6d4', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'2px' }}>
                ⚛ STRUCTURAL ANALYSIS
              </div>
              {entity.coreDetails.map(l => (
                <div key={l.layer} style={{ background:'rgba(255,255,255,0.03)', borderLeft:'2px solid #06b6d4', padding:'6px 8px', borderRadius:'0 6px 6px 0' }}>
                  <div style={{ fontFamily:"'Fira Code',monospace", fontSize:'8px', color:'#06b6d4', fontWeight:700, textTransform:'uppercase' }}>{l.layer}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:'10px', color:'rgba(255,255,255,0.6)', marginTop:'2px', lineHeight:1.4 }}>{l.desc}</div>
                </div>
              ))}
            </div>
          )}
          <button onClick={onBreakdown} data-ui="true" style={{
            width:'100%', padding:'9px',
            background: isBrokenDown ? 'rgba(234,179,8,0.12)' : 'rgba(6,182,212,0.12)',
            border: isBrokenDown ? '1px solid rgba(234,179,8,0.45)' : '1px solid rgba(6,182,212,0.45)',
            borderRadius:'8px', color: isBrokenDown ? '#eab308' : '#06b6d4',
            fontFamily:"'Fira Code',monospace", fontSize:'9px', fontWeight:700, letterSpacing:'0.12em',
            cursor:'pointer', transition:'all 0.2s',
            display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
          }}>
            ⚛ {isBrokenDown ? 'REASSEMBLE PLANET' : 'INITIATE BREAKDOWN'}
          </button>
        </>
      )}
    </div>
  )
}

/* ════════════════════════════
   Main Component
   ════════════════════════════ */
export default function SolarSystemScene({ onClose }) {
  const containerRef   = useRef(null)
  const sceneRef       = useRef(null)
  const planetsRef     = useRef([])
  const sunObjRef      = useRef(null)
  const moonOrbitRef   = useRef(null)
  const galaxyRef      = useRef(null)
  const controlsRef    = useRef(null)
  const composerRef    = useRef(null)
  const rafRef         = useRef(null)
  const clockRef       = useRef(new THREE.Clock())
  const raycasterRef   = useRef(new THREE.Raycaster())
  const timeMultRef    = useRef(1)
  const selectedMeshRef   = useRef(null)
  const activeParticlesRef= useRef(null)
  const trackingRef    = useRef({ active: false, lastPos: new THREE.Vector3() })
  const isBrokenDownRef= useRef(false)

  const [selectedEntity, setSelectedEntity] = useState(null)
  const [isBrokenDown,   setIsBrokenDown]   = useState(false)
  const [timeMultiplier, setTimeMultiplier] = useState(1)

  /* ─── Reset camera to overview ─── */
  const resetCamera = useCallback(() => {
    const { camera } = sceneRef.current || {}
    const controls = controlsRef.current
    if (!camera || !controls) return
    gsap.to(camera.position, { x:12, y:14, z:24, duration:1.5, ease:'power3.inOut' })
    gsap.to(controls.target, { x:0, y:0, z:0, duration:1.5, ease:'power3.inOut', onUpdate: () => controls.update() })
    controls.minDistance = 1.5
    controls.maxDistance = 120
    selectedMeshRef.current = null
    trackingRef.current.active = false
    setSelectedEntity(null)
  }, [])

  /* ─── Breakdown feature ─── */
  const restoreBreakdown = useCallback((planetObj) => {
    if (!planetObj || !isBrokenDownRef.current) return
    isBrokenDownRef.current = false
    setIsBrokenDown(false)
    const { mat, cloudMat, ringMat, coreGroup, mesh } = planetObj
    if (activeParticlesRef.current) {
      mesh.remove(activeParticlesRef.current)
      activeParticlesRef.current.geometry.dispose()
      activeParticlesRef.current.material.dispose()
      activeParticlesRef.current = null
    }
    if (coreGroup) gsap.to(coreGroup.scale, { x:0.01, y:0.01, z:0.01, duration:0.5, onComplete: () => { coreGroup.visible = false } })
    if (mat)      gsap.to(mat, { opacity:1, duration:1.0 })
    if (cloudMat) gsap.to(cloudMat, { opacity:0.85, duration:1.0 })
    if (ringMat)  gsap.to(ringMat, { opacity:0.88, duration:1.0 })
  }, [])

  const triggerBreakdown = useCallback((planetObj) => {
    if (!planetObj || isBrokenDownRef.current) return
    isBrokenDownRef.current = true
    setIsBrokenDown(true)
    const { mat, cloudMat, ringMat, coreGroup, mesh, data } = planetObj
    if (mat)      gsap.to(mat, { opacity:0, duration:1.0 })
    if (cloudMat) gsap.to(cloudMat, { opacity:0, duration:1.0 })
    if (ringMat)  gsap.to(ringMat, { opacity:0, duration:1.0 })
    if (coreGroup) {
      coreGroup.visible = true
      gsap.fromTo(coreGroup.scale, { x:0.1, y:0.1, z:0.1 }, { x:1, y:1, z:1, duration:1.5, ease:'elastic.out(1,0.5)' })
    }
    // Particle explosion
    const ptCount = 15000
    const ptGeo = new THREE.BufferGeometry()
    const ptPos = new Float32Array(ptCount * 3)
    const vels = []
    for (let i = 0; i < ptCount; i++) {
      const u=Math.random(), v=Math.random()
      const th=u*2*Math.PI, ph=Math.acos(2*v-1)
      const r=data.radius*(0.95+Math.random()*0.1)
      ptPos[i*3]=r*Math.sin(ph)*Math.cos(th); ptPos[i*3+1]=r*Math.sin(ph)*Math.sin(th); ptPos[i*3+2]=r*Math.cos(ph)
      const dir=new THREE.Vector3(ptPos[i*3],ptPos[i*3+1],ptPos[i*3+2]).normalize()
      vels.push(dir.multiplyScalar(Math.random()*0.025+0.005))
    }
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3))
    const ptMat = new THREE.PointsMaterial({ color:new THREE.Color(data.sCol||'#06b6d4'), size:0.005, transparent:true, opacity:1, blending:THREE.AdditiveBlending })
    const particles = new THREE.Points(ptGeo, ptMat)
    mesh.add(particles)
    activeParticlesRef.current = particles
    const animObj = { val:0 }
    gsap.to(animObj, {
      val:1, duration:4.0, ease:'power2.out',
      onUpdate: () => {
        if (!activeParticlesRef.current) return
        const p = activeParticlesRef.current.geometry.attributes.position.array
        for (let i=0;i<ptCount;i++) { p[i*3]+=vels[i].x; p[i*3+1]+=vels[i].y; p[i*3+2]+=vels[i].z }
        activeParticlesRef.current.geometry.attributes.position.needsUpdate = true
        ptMat.opacity = 1 - animObj.val
      },
      onComplete: () => {
        if (activeParticlesRef.current && mesh) {
          mesh.remove(activeParticlesRef.current)
          ptGeo.dispose(); ptMat.dispose()
          activeParticlesRef.current = null
        }
      }
    })
  }, [])

  /* ─── Focus camera on entity ─── */
  const focusOn = useCallback((mesh, entityData) => {
    const { camera } = sceneRef.current || {}
    const controls = controlsRef.current
    if (!camera || !controls) return

    // Restore previous breakdown
    const prev = planetsRef.current.find(p => p.mesh === selectedMeshRef.current)
    if (prev && isBrokenDownRef.current) restoreBreakdown(prev)

    selectedMeshRef.current = mesh
    const wp = new THREE.Vector3()
    mesh.getWorldPosition(wp)
    trackingRef.current.lastPos.copy(wp)
    trackingRef.current.active = true

    const radius = entityData.radius || 1.5
    const dist = radius * 5.5
    const offset = new THREE.Vector3(dist, dist * 0.5, dist)
    const startTarget = controls.target.clone()
    const startOffset = camera.position.clone().sub(startTarget)
    const prog = { val:0 }

    gsap.to(prog, {
      val:1, duration:1.5, ease:'power3.inOut',
      onUpdate: () => {
        const cp = new THREE.Vector3()
        mesh.getWorldPosition(cp)
        const lt = startTarget.clone().lerp(cp, prog.val)
        controls.target.copy(lt)
        camera.position.copy(lt).add(startOffset.clone().lerp(offset, prog.val))
        trackingRef.current.lastPos.copy(lt)
      },
      onComplete: () => {
        controls.minDistance = radius * 1.5
        controls.maxDistance = radius * 50
      }
    })

    setSelectedEntity({ ...entityData })
    setIsBrokenDown(false)
    isBrokenDownRef.current = false
  }, [restoreBreakdown])

  /* ─── Three.js init ─── */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let W = container.clientWidth  || window.innerWidth
    let H = container.clientHeight || window.innerHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias:true, powerPreference:'high-performance' })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.toneMapping        = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.95
    renderer.shadowMap.enabled  = true
    renderer.shadowMap.type     = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Scene + Camera
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 2000)
    camera.position.set(12, 14, 24)
    camera.lookAt(0,0,0)

    // Bloom post-processing
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(W/2, H/2), 0.55, 0.35, 0.92))
    composerRef.current = composer

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 1.5
    controls.maxDistance = 120
    controls.enablePan = true
    controlsRef.current = controls

    sceneRef.current = { scene, camera, renderer }

    const maxAniso = renderer.capabilities.getMaxAnisotropy()
    const loader   = new THREE.TextureLoader()
    loader.crossOrigin = 'anonymous'

    scene.add(new THREE.AmbientLight(0xffffff, 0.15))
    galaxyRef.current = buildMilkyWay(scene, loader)
    sunObjRef.current = buildSun(scene)
    planetsRef.current = PLANET_DATA.map(p => buildPlanet(scene, p, loader, maxAniso))

    // Earth moon
    const earthObj = planetsRef.current.find(p => p.data.isEarth)
    if (earthObj) {
      const moonOrbit = new THREE.Group()
      const moonTex   = loadTex(loader, BASE + 'moonmap1k.jpg', maxAniso)
      moonTex.colorSpace = THREE.SRGBColorSpace
      const moonMesh  = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 48, 48),
        new THREE.MeshStandardMaterial({
          map:      moonTex,
          roughness: 0.88,
          metalness: 0.0,
          emissive:  new THREE.Color(0x0a0a0a),
          emissiveIntensity: 0.04,
        })
      )
      moonMesh.castShadow = true
      moonMesh.receiveShadow = true
      moonMesh.position.x = 0.58
      moonOrbit.add(moonMesh)
      earthObj.grp.add(moonOrbit)
      moonOrbitRef.current = moonOrbit
    }

    buildAsteroidBelt(scene)

    // Click / drag detection
    let pointerMoved = false
    let px = 0, py = 0
    const onDown = (e) => { pointerMoved=false; px=e.clientX; py=e.clientY }
    const onMove = (e) => { if (Math.abs(e.clientX-px)>4||Math.abs(e.clientY-py)>4) pointerMoved=true }
    const onUp   = (e) => {
      if (pointerMoved) return
      if (e.target.closest('[data-ui]')) return
      const rect = renderer.domElement.getBoundingClientRect()
      const mouse = new THREE.Vector2(
        ((e.clientX-rect.left)/rect.width)*2-1,
        -((e.clientY-rect.top)/rect.height)*2+1
      )
      raycasterRef.current.setFromCamera(mouse, camera)
      const clickables = [sunObjRef.current.hitbox, ...planetsRef.current.map(p=>p.mesh)]
      const hits = raycasterRef.current.intersectObjects(clickables, false)
      if (hits.length > 0) {
        const hit = hits[0].object
        if (hit.userData.isSun) focusOn(hit, SUN_DATA)
        else {
          const pl = planetsRef.current.find(p=>p.mesh===hit)
          if (pl) focusOn(pl.mesh, pl.data)
        }
      }
    }
    renderer.domElement.addEventListener('pointerdown', onDown)
    renderer.domElement.addEventListener('pointermove', onMove)
    renderer.domElement.addEventListener('pointerup',   onUp)

    // Resize
    const onResize = () => {
      if (!containerRef.current) return
      W = containerRef.current.clientWidth; H = containerRef.current.clientHeight
      renderer.setSize(W,H); composer.setSize(W,H)
      camera.aspect = W/H; camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize, { passive:true })

    // Tracking vectors (pre-allocated)
    const _cur = new THREE.Vector3()
    const _del = new THREE.Vector3()

    // Animation loop
    let elapsed = 0
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      const dt = clockRef.current.getDelta()
      elapsed  += dt * timeMultRef.current

      const sun = sunObjRef.current
      if (sun?.uniforms) sun.uniforms.time.value = elapsed
      const pulse = 1 + Math.sin(elapsed*1.6)*0.025
      sun?.glows.forEach((g,i) => g.scale.setScalar(pulse*(1+i*0.06)))

      planetsRef.current.forEach(({ grp, mesh, data }) => {
        const angle = elapsed * data.speed * 0.25
        grp.position.set(Math.cos(angle)*data.orbit, Math.sin(angle*0.35)*data.tilt*0.6, Math.sin(angle)*data.orbit)
        mesh.rotation.y += dt * timeMultRef.current * (data.name==='VENUS' ? -0.22 : 0.38)
        grp.children.forEach(c => { if (c.userData.isCloud) c.rotation.y += dt*timeMultRef.current*0.05 })
        if (isBrokenDownRef.current && selectedMeshRef.current===mesh && data.coreGroup?.visible)
          data.coreGroup.rotation.y += dt*0.5
      })

      if (moonOrbitRef.current) moonOrbitRef.current.rotation.y += dt*timeMultRef.current*0.5
      if (galaxyRef.current) galaxyRef.current.rotation.y += dt*0.0008

      // Track selected planet
      if (trackingRef.current.active && selectedMeshRef.current) {
        selectedMeshRef.current.getWorldPosition(_cur)
        _del.subVectors(_cur, trackingRef.current.lastPos)
        controls.target.add(_del); camera.position.add(_del)
        trackingRef.current.lastPos.copy(_cur)
      }

      controls.update()
      composer.render()
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      renderer.domElement.removeEventListener('pointerdown', onDown)
      renderer.domElement.removeEventListener('pointermove', onMove)
      renderer.domElement.removeEventListener('pointerup',   onUp)
      window.removeEventListener('resize', onResize)
      controls.dispose(); scene.clear(); renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [focusOn])

  const handleBreakdown = useCallback(() => {
    const pl = planetsRef.current.find(p => p.mesh === selectedMeshRef.current)
    if (!pl) return
    if (isBrokenDownRef.current) restoreBreakdown(pl)
    else triggerBreakdown(pl)
  }, [triggerBreakdown, restoreBreakdown])

  const handleClosePanel = useCallback(() => {
    const pl = planetsRef.current.find(p => p.mesh === selectedMeshRef.current)
    if (pl && isBrokenDownRef.current) restoreBreakdown(pl)
    resetCamera()
  }, [restoreBreakdown, resetCamera])

  return (
    <div style={{ position:'fixed', inset:0, background:'#000', overflow:'hidden' }}>
      {/* THREE.js canvas */}
      <div ref={containerRef} style={{ position:'absolute', inset:0 }} />

      {/* HUD Overlay */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:10 }}>

        {/* Top-left: title block */}
        <div style={{ position:'absolute', top:'16px', left:'16px', display:'flex', flexDirection:'column', gap:'10px', pointerEvents:'all' }}>
          <button
            data-ui="true"
            onClick={onClose}
            style={{
              display:'inline-flex', alignItems:'center', gap:'8px',
              fontFamily:"'Fira Code',monospace", fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.05)',
              border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px',
              padding:'8px 12px', cursor:'pointer', transition:'all 0.2s', width:'fit-content',
            }}
            onMouseEnter={e=>{e.currentTarget.style.color='#fff';e.currentTarget.style.background='rgba(255,255,255,0.1)'}}
            onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.5)';e.currentTarget.style.background='rgba(255,255,255,0.05)'}}
          >
            ← Return to Main Hub
          </button>
          <div>
            <div style={{ fontFamily:"'Fira Code',monospace", fontSize:'9px', color:'#06b6d4', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'4px' }}>
              &gt; Sector 7G / Sol System
            </div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(1.1rem,3vw,1.75rem)', color:'#fff', letterSpacing:'-0.02em', lineHeight:1, textShadow:'0 0 12px rgba(255,255,255,0.2)' }}>
              COSMOS SIMULATOR
            </div>
          </div>
        </div>

        {/* Telemetry panel */}
        {selectedEntity && (
          <TelemetryPanel
            entity={selectedEntity}
            onClose={handleClosePanel}
            onBreakdown={handleBreakdown}
            isBrokenDown={isBrokenDown}
          />
        )}

        {/* Bottom center: controls hint */}
        <div style={{
          position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)',
          fontFamily:"'Fira Code',monospace", fontSize:'9px',
          color:'rgba(255,255,255,0.3)', letterSpacing:'0.18em', textTransform:'uppercase',
          whiteSpace:'nowrap', pointerEvents:'none',
        }}>
          DRAG TO PAN &nbsp;|&nbsp; TAP PLANET TO FOCUS &nbsp;|&nbsp; SCROLL TO ZOOM
        </div>

        {/* Bottom right: time dilation */}
        <div data-ui="true" style={{
          position:'absolute', bottom:'20px', right:'20px',
          background:'rgba(5,5,10,0.75)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
          border:'1px solid rgba(255,255,255,0.08)', borderRadius:'40px',
          padding:'8px 16px', display:'flex', alignItems:'center', gap:'10px',
          pointerEvents:'all', zIndex:60,
        }}>
          <span style={{ fontFamily:"'Fira Code',monospace", fontSize:'9px', color:'rgba(255,255,255,0.4)', whiteSpace:'nowrap' }}>TIME DILATION</span>
          <input
            type="range" min="0" max="5" step="0.1"
            value={timeMultiplier}
            onChange={e => { const v=parseFloat(e.target.value); setTimeMultiplier(v); timeMultRef.current=v }}
            style={{ width:'100px', accentColor:'#06b6d4', cursor:'pointer' }}
          />
          <span style={{ fontFamily:"'Fira Code',monospace", fontSize:'10px', color:'#fff', fontWeight:700, minWidth:'30px' }}>
            {timeMultiplier.toFixed(1)}x
          </span>
        </div>

      </div>
    </div>
  )
}
