### ThreeJS Particle System

A particle flow visualization built with Three.js, showcasing animations, customizable controls, and post-processing effects for an immersive visual experience.

---

## Features

- **Smooth Particle Motion**: Particles flow seamlessly with consistent speeds and visually appealing dynamics.
- **Customizable Colors**: A blend of purple, green, and white particles for a vibrant effect.
- **Zoom and Orbit Control**: Restricted zoom and smooth navigation enhance user interaction.
- **Post-Processing Effects**: Glow effects powered by Unreal Bloom for enhanced visuals.

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (latest LTS version recommended)
- **npm** (comes with Node.js)
- A modern web browser supporting WebGL

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/ShivAkash/threejs-particle-system.git
   cd threejs-particle-flow
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Start the development server:
   ```bash
   npx vite
   ```

4. Open your browser and navigate to the URL displayed in your terminal (usually `http://localhost:5173`).

---

## Project Structure

- `main.js`: Sets up the Three.js scene, camera, and controls, and handles animation loops.
- `particles.js`: Defines the particle system, including initialization, movement, and updates.
- `flow-field.js`: Provides a flow field structure for guiding particle motion.
- `index.html`: The HTML entry point for the project.
- `vite.config.js`: Configuration file for Vite.

---

## Controls

- **Orbit Controls**:
  - Left-click to rotate around the scene.
  - Scroll to zoom in/out (with restrictions on min/max distance).
- **No Panning**: The right-click drag for camera panning is disabled.

---

## Dependencies

This project uses the following libraries:

- [Three.js](https://threejs.org/): For 3D rendering and particle system setup.
- [three/examples/jsm/controls/OrbitControls.js](https://threejs.org/docs/#examples/en/controls/OrbitControls): For camera navigation.
- [three/examples/jsm/postprocessing/UnrealBloomPass.js](https://threejs.org/docs/#examples/en/postprocessing/UnrealBloomPass): For the bloom effect.
