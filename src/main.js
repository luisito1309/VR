import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import gsap from 'gsap'

console.log('ASTRO VR: Initialization Started')

// --- THREE.JS CONFIGURATION ---
const container = document.getElementById('three-container')
if (!container) console.error('Three container not found!')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 50, 5000000)
camera.position.set(20000, 10000, 30000)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(container.offsetWidth, container.offsetHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
container.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.minDistance = 100
controls.maxDistance = 4000000

// --- LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 1.8) // High ambient light for visibility
scene.add(ambientLight)

const sunLight = new THREE.PointLight(0xffffff, 25, 1500000) // Massively increased range
scene.add(sunLight)

// --- SPACE ENVIRONMENT ---
function createStars() {
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, sizeAttenuation: true })
  const starVertices = []
  for (let i = 0; i < 30000; i++) {
    starVertices.push((Math.random() - 0.5) * 4000000, (Math.random() - 0.5) * 4000000, (Math.random() - 0.5) * 4000000)
  }
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
  scene.add(new THREE.Points(starGeometry, starMaterial))
}
createStars()

// --- PLANET DATA ---
const PLANETS_CONFIG = [
  { name: 'Sun',     radius: 1000, distance: 0,      speed: 0,      rotation: 0.0001,  model: 'sun.glb',     color: 0xFFDD00 },
  { name: 'Mercury', radius: 20,   distance: 15000,  speed: 0.012,  rotation: 0.002,   model: 'mercury.glb', color: 0xAAAAAA },
  { name: 'Venus',   radius: 50,   distance: 28000,  speed: 0.008,  rotation: 0.001,   model: 'venus.glb',   color: 0xE3BB76 },
  { name: 'Earth',   radius: 55,   distance: 40000,  speed: 0.006,  rotation: 0.002,   model: 'earth.glb',   color: 0x2271B3 },
  { name: 'Mars',    radius: 30,   distance: 60000,  speed: 0.004,  rotation: 0.002,   model: 'mars.glb',    color: 0xE27B58 },
  { name: 'Jupiter', radius: 5000, distance: 150000, speed: 0.002,  rotation: 0.004,   model: 'jupiter.glb', color: 0xD39C7E },
  { name: 'Saturn',  radius: 4000, distance: 250000, speed: 0.0015, rotation: 0.004,   model: 'saturn.glb',  color: 0xC5AB6E },
  { name: 'Uranus',  radius: 150,  distance: 400000, speed: 0.001,  rotation: 0.003,   model: 'uranus.glb',  color: 0xB5E3E3 },
  { name: 'Neptune', radius: 2000, distance: 550000, speed: 0.0008, rotation: 0.003,   model: 'neptune.glb', color: 0x6081FF }
]

const planets = {}
const pivots = {}

// --- LOADING MANAGER ---
const loadingManager = new THREE.LoadingManager()
const loader = new GLTFLoader(loadingManager)

loadingManager.onLoad = () => {
  const loadingScreen = document.getElementById('loading-screen')
  if (loadingScreen) {
    gsap.to(loadingScreen, { opacity: 0, duration: 1, onComplete: () => {
      loadingScreen.style.display = 'none'
    }})
  }
}

// --- LOAD MODELS ---
PLANETS_CONFIG.forEach(config => {
  const pivot = new THREE.Group()
  scene.add(pivot)
  pivots[config.name] = pivot

  loader.load(`/models/${config.model}`, (gltf) => {
    const model = gltf.scene
    const scale = config.radius * 0.3
    model.scale.set(scale, scale, scale)
    model.position.x = config.distance
    
    // Fix Materials for ALL objects in the model
    model.traverse((child) => {
      if (child.isMesh) {
        const oldMap = child.material.map
        if (config.name === 'Sun') {
          child.material = new THREE.MeshBasicMaterial({ 
            color: config.color,
            map: oldMap
          })
        } else {
          child.material = new THREE.MeshStandardMaterial({
            map: oldMap,
            color: oldMap ? 0xffffff : config.color, // Use planet color if no texture
            roughness: 0.8,
            metalness: 0.2
          })
        }
      }
    })

    planets[config.name] = model
    pivot.add(model)
    console.log(`Loaded and Fixed: ${config.name}`)
  }, undefined, (err) => console.error(`Error ${config.name}:`, err))

  // Orbits
  if (config.distance > 0) {
    const orbitGeo = new THREE.RingGeometry(config.distance - 2, config.distance + 2, 512)
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x22D3EE, side: THREE.DoubleSide, transparent: true, opacity: 0.05 })
    const orbit = new THREE.Mesh(orbitGeo, orbitMat)
    orbit.rotation.x = Math.PI / 2
    scene.add(orbit)
  }
})

// --- ANIMATION ---
function animate() {
  requestAnimationFrame(animate)
  
  PLANETS_CONFIG.forEach(config => {
    if (pivots[config.name]) pivots[config.name].rotation.y += config.speed
    if (planets[config.name]) planets[config.name].rotation.y += config.rotation
  })

  controls.update()
  renderer.render(scene, camera)
}
animate()

// --- UI INTERACTIONS ---
function focusOnPlanet(name) {
  if (!planets[name]) return
  
  const config = PLANETS_CONFIG.find(p => p.name === name)
  const worldPos = new THREE.Vector3()
  planets[name].getWorldPosition(worldPos)

  document.getElementById('current-planet-name').textContent = name.toUpperCase()
  document.getElementById('system-status').textContent = `${name.toUpperCase()} EXPLORACIÓN`

  const dist = config.radius * 2.5 + 80
  gsap.to(camera.position, {
    x: worldPos.x + dist,
    y: worldPos.y + dist / 2,
    z: worldPos.z + dist,
    duration: 2,
    ease: "power3.inOut"
  })
  gsap.to(controls.target, {
    x: worldPos.x,
    y: worldPos.y,
    z: worldPos.z,
    duration: 1.5,
    ease: "power2.inOut"
  })
}

document.querySelectorAll('.planet-btn').forEach(btn => {
  btn.addEventListener('click', () => focusOnPlanet(btn.dataset.planet))
})

document.getElementById('btn-solar').addEventListener('click', () => {
  focusOnPlanet('Sun')
  console.log('Mode: Solar System')
})

// --- ADDITIONAL PHENOMENA (PLACEHOLDERS/LOGIC) ---
document.getElementById('btn-asteroids').addEventListener('click', () => {
  document.getElementById('system-status').textContent = "LLUVIA DE ASTEROIDES ACTIVA"
  document.getElementById('current-planet-name').textContent = "ASTEROIDES"
  // Simple effect: Move camera to a chaotic area
  gsap.to(camera.position, { x: 50000, y: 20000, z: 50000, duration: 2 })
})

document.getElementById('btn-blackhole').addEventListener('click', () => {
  document.getElementById('system-status').textContent = "SINGULARIDAD DETECTADA"
  document.getElementById('current-planet-name').textContent = "AGUJERO NEGRO"
  gsap.to(camera.position, { x: 0, y: 5000, z: 100, duration: 3 })
})

document.getElementById('btn-collision').addEventListener('click', () => {
  document.getElementById('system-status').textContent = "ALERTA DE COLISIÓN"
  document.getElementById('current-planet-name').textContent = "COLISIÓN"
  focusOnPlanet('Mars')
})

window.addEventListener('resize', () => {
  camera.aspect = container.offsetWidth / container.offsetHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.offsetWidth, container.offsetHeight)
})
