# 🌌 ASTRO VR — Solar System Simulator

A futuristic, interactive **Solar System VR Simulator** built with **Three.js** and **WebGL**. Explore the planets of our Solar System in a cinematic 3D environment directly in your browser — no plugins or installs required.

---

## 🚀 Live Demo

> Run locally with `npm run dev` and open `http://localhost:5174`

---

## 🛸 Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure & canvas container |
| CSS3 | Futuristic UI, glassmorphism, animations |
| JavaScript (ES6+) | Core logic & interactivity |
| [Three.js](https://threejs.org/) | 3D WebGL rendering engine |
| [GSAP](https://greensock.com/gsap/) | Smooth cinematic camera animations |
| [Vite](https://vitejs.dev/) | Lightning-fast development server |
| Google Fonts | Outfit & Space Grotesk typography |

---

## ✨ Features

- 🌍 **Full Solar System** — All 9 planets with realistic `.glb` 3D models
- 🔭 **Interactive Camera** — Click any planet to smoothly fly toward it
- 🪐 **Orbital Animation** — Planets orbit the Sun at proportional speeds
- ⭐ **30,000 Star Starfield** — Deep space background with parallax depth
- 🎛️ **Futuristic HUD UI** — Glassmorphism overlays, glowing borders, scan-line effects
- 📡 **Planet Selector Bar** — One-click navigation between all celestial bodies
- 🌑 **Mode Buttons** — Solar System, Asteroid Rain, Black Hole, Collision scenarios
- 🖱️ **OrbitControls** — Zoom, pan and rotate freely with mouse/touch
- 📱 **Responsive Design** — Works on desktop and tablet

---

## 📁 Project Structure

```
ASTRONOMIA/
│
├── index.html              # Main HTML entry point
├── package.json            # Project config & dependencies
├── vite.config.js          # Vite configuration (if present)
├── .gitignore              # Git ignore rules
├── README.md               # This file
│
├── src/
│   ├── main.js             # Three.js scene, planets, camera, UI logic
│   └── style.css           # Futuristic UI styles
│
└── public/
    └── models/             # 3D planet models (.glb)
        ├── sun.glb
        ├── mercury.glb
        ├── venus.glb
        ├── earth.glb
        ├── mars.glb
        ├── jupiter.glb
        ├── saturn.glb
        ├── uranus.glb
        └── neptune.glb
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ASTRONOMIA.git

# 2. Navigate into the project folder
cd ASTRONOMIA

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser at **`http://localhost:5174`**

---

## 🎮 How to Use

| Action | Result |
|--------|--------|
| Click planet button | Camera flies to that planet |
| Scroll wheel | Zoom in / out |
| Left-click drag | Rotate the view |
| Right-click drag | Pan the camera |
| Click **Sistema Solar** | Return to full system view |
| Click **Agujero Negro** | Dramatic singularity mode |

---

## 🔮 Future Improvements

- [ ] Add Moon and asteroid belt models
- [ ] Realistic planet textures with normal maps
- [ ] Planet info cards with facts on focus
- [ ] Audio — ambient space soundtrack
- [ ] VR headset support (WebXR API)
- [ ] Time control — speed up / slow down orbital simulation
- [ ] Mobile touch gesture support
- [ ] Saturn rings geometry

---

## 📸 Screenshots

> *(Add screenshots of your simulator here)*

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ and curiosity about the cosmos.

> *"The universe is under no obligation to make sense to you."* — Neil deGrasse Tyson
