var THREE = require('three');

function Particles(num, size, flowField) {
  this.flowField = flowField;

  var geometry = new THREE.Geometry();
  this.velocities = [];
  this.initialY = [];

  for (var i = 0; i < num; ++i) {
    var vertex = new THREE.Vector3(
      Math.random() * size - size / 2,  // Random x position
      Math.random() * size,  // Random initial height
      Math.random() * size - size / 2   // Random z position
    );
    geometry.vertices.push(vertex);

    this.initialY.push(vertex.y);  // Store the initial height for resetting
    this.velocities.push(new THREE.Vector3(0, Math.random() * -0.1 - 0.01, 0));  // Initial downward velocity
  }

  var material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00ffff // Raindrop color
  });

  this.points = new THREE.Points(geometry, material);
}

Particles.prototype.update = function() {
  for (var i = 0; i < this.points.geometry.vertices.length; ++i) {
    var vertex = this.points.geometry.vertices[i];
    var velocity = this.velocities[i];

    vertex.add(velocity);  // Move raindrop by its velocity

    // Reset the raindrop when it falls below a certain threshold
    if (vertex.y < -10) {
      vertex.y = this.initialY[i];  // Reset to the original height
      velocity.y = Math.random() * -0.1 - 0.01;  // Reset velocity
    }

    // Apply flow-field influence
    var flow = this.flowField.sample(vertex.x, vertex.y, vertex.z);
    if (flow) {
      var steer = flow.clone().sub(velocity);
      velocity.add(steer.multiplyScalar(0.02));
    }
  }

  this.points.geometry.verticesNeedUpdate = true;
};

module.exports = Particles;
