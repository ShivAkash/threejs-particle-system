var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

var FlowField = require('./flow-field');
var Particles = require('./particles');

var renderer = new THREE.WebGLRenderer();
var width = window.innerWidth;
var height = window.innerHeight;

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 50, 100);

var camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
var controls = new OrbitControls(camera);

camera.position.set(0, 10, 40);  // Adjust the camera to a good view
controls.update();

var flowField = new FlowField(100);
var particles = new Particles(200000, 5, 1000, flowField);  // Set the radius to 50 and height to 100

scene.add(particles.points);


function render() {
  requestAnimationFrame(render);

  particles.update();

  controls.update();
  renderer.render(scene, camera);
}

render();
