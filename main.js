import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import FlowField from './flow-field';
import Particles from './particles';

const renderer = new THREE.WebGLRenderer();
const width = window.innerWidth;
const height = window.innerHeight;

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 30, 100);

const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
const controls = new OrbitControls(camera, renderer.domElement); // Pass renderer's DOM element to controls

camera.position.set(0, 10, 40);  // Adjust the camera to a good view
controls.update();  // This ensures controls start with the correct state

const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    2,
    0.5,
    0.1
);

composer.addPass(bloomPass);

const flowField = new FlowField(100);
const particles = new Particles(200000, 5, 1000, flowField);  // Set the radius to 50 and height to 100

scene.add(particles.points);

function render() {
  particles.update();

  // Update the controls
  controls.update();

  // Render the scene
  //renderer.render(scene, camera);
  composer.render();  
  // Call render recursively for animation
  window.requestAnimationFrame(render);
}

// Call render to start the animation loop
render();

// Handle window resizing
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update camera and renderer with the new dimensions
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
