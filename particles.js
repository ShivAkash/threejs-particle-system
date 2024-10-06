import * as THREE from 'three';

class Particles {
  constructor(num, radius, length, flowField) {
    this.flowField = flowField;

    // Create a BufferGeometry
    const geometry = new THREE.BufferGeometry();
    
    // Create arrays for position and velocity data
    const positions = new Float32Array(num * 3);  // 3 coordinates (x, y, z) per particle
    const colors = new Float32Array(num * 3);     // RGB color values per particle

    this.velocities = [];
    this.initialX = [];

    for (let i = 0; i < num; ++i) {
      // Generate random points in a circle for y, z positions (rotated cylinder base)
      const angle = Math.random() * Math.PI * 2;  // Random angle for circle
      const r = Math.sqrt(Math.random()) * radius;  // Random radius (sqrt for uniform distribution)

      const x = Math.random() * length - length / 2;  // Generate x between -length/2 and length/2 (centered)
      const y = r * Math.cos(angle);     // y-coordinate in the circular base
      const z = r * Math.sin(angle);     // z-coordinate in the circular base

      // Store position in the positions array
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Store initial x to reset when it reaches the right end
      this.initialX.push(x);

      // Store velocity
      this.velocities.push(new THREE.Vector3(Math.random() * 0.1 + 0.01, 0, 0));  // Positive x for left to right flow

      // Assign colors based on distribution: 15% purple, 25% green, 60% white
      const randomColor = Math.random();
      if (randomColor < 0.25) {
        // Purple: (R: 0.5, G: 0, B: 0.5)
        colors[i * 3] = 0.5;    // R
        colors[i * 3 + 1] = 0;  // G
        colors[i * 3 + 2] = 0.5;// B
      } else if (randomColor < 0.45) {
        // Green: (R: 0, G: 1, B: 0)
        colors[i * 3] = 0;      // R
        colors[i * 3 + 1] = 1;  // G
        colors[i * 3 + 2] = 0;  // B
      } else {
        // White: (R: 1, G: 1, B: 1)
        colors[i * 3] = 1;      // R
        colors[i * 3 + 1] = 1;  // G
        colors[i * 3 + 2] = 1;  // B
      }
    }

    // Add positions and colors to the geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create material with vertexColors enabled
    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true   // Enable per-vertex colors
    });

    // Create points from geometry and material
    this.points = new THREE.Points(geometry, material);
  }

  update() {
    const positions = this.points.geometry.attributes.position.array;

    for (let i = 0; i < positions.length / 3; ++i) {
      const velocity = this.velocities[i];

      // Update position based on velocity
      const speedMultiplier = 40;  // Increase this to make the particles move faster
      positions[i * 3] += velocity.x * speedMultiplier;  // x-coordinate
      positions[i * 3 + 1] += velocity.y * speedMultiplier;  // y-coordinate
      positions[i * 3 + 2] += velocity.z * speedMultiplier;  // z-coordinate


      // Reset the raindrop when it reaches the end of the x-axis (the right side)
      if (positions[i * 3] > 200) {
        positions[i * 3] = this.initialX[i];  // Reset to original starting point on x-axis
        velocity.x = Math.random() * 0.1 + 0.01;  // Reset x-axis velocity
      }

      // Apply flow-field influence (e.g., wind effect) for slight steering on y-z axes
      const flow = this.flowField.sample(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      if (flow) {
        const steer = flow.clone().sub(velocity);
        velocity.add(steer.multiplyScalar(0.02));
      }
    }

    // Mark the positions as needing update
    this.points.geometry.attributes.position.needsUpdate = true;
  }
}

export default Particles;
