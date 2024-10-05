var THREE = require('three');

function Particles(num, radius, length, flowField) {
  this.flowField = flowField;

  var geometry = new THREE.Geometry();
  this.velocities = [];
  this.initialX = [];

  for (var i = 0; i < num; ++i) {
    // Generate random points in a circle for y, z positions (rotated cylinder base)
    var angle = Math.random() * Math.PI * 2;  // Random angle for circle
    var r = Math.sqrt(Math.random()) * radius;  // Random radius (sqrt for uniform distribution)

    var vertex = new THREE.Vector3(
      Math.random() * length - length / 2,  // Generate x between -length/2 and length/2 (centered)
      r * Math.cos(angle),     // y-coordinate in the circular base
      r * Math.sin(angle)      // z-coordinate in the circular base
    );
    geometry.vertices.push(vertex);
    this.initialX.push(vertex.x);  // Store initial x to reset when it reaches the right end

    this.velocities.push(new THREE.Vector3(Math.random() * 0.1 + 0.01, 0, 0));  // Positive x for left to right flow
  }

  var material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xffffff  // Raindrop color 
  });

  this.points = new THREE.Points(geometry, material);
}

Particles.prototype.update = function() {
  for (var i = 0; i < this.points.geometry.vertices.length; ++i) {
    var vertex = this.points.geometry.vertices[i];
    var velocity = this.velocities[i];

    //vertex.add(velocity);  // Move raindrop along x-axis
    vertex.add(velocity.multiplyScalar(2));
    // Reset the raindrop when it reaches the end of the x-axis (the right side)
    if (vertex.x > 1000) {  // Assuming 100 is the length of the cylinder
      vertex.x = this.initialX[i];  // Reset to original starting point on x-axis
      velocity.x = Math.random() * 0.1 + 0.01;  // Reset x-axis velocity
    }

    // Apply flow-field influence (e.g., wind effect) for slight steering on y-z axes
    var flow = this.flowField.sample(vertex.x, vertex.y, vertex.z);
    if (flow) {
      var steer = flow.clone().sub(velocity);
      velocity.add(steer.multiplyScalar(0.02));
    }
  }

  this.points.geometry.verticesNeedUpdate = true;
};

module.exports = Particles;
