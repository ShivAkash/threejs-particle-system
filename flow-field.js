

class FlowField {
  constructor(size) {
    this.field = [];
    this.size = size;

    for (let x = 0; x < size; ++x) {
      this.field[x] = [];

      for (let y = 0; y < size; ++y) {
        this.field[x][y] = [];

        for (let z = 0; z < size; ++z) {
          const mod = 0.07;
          // We can use noise for slight variation in raindrop paths
        }
      }
    }
  }

  sample(x, y, z) {
    x = Math.round(x) + this.size / 2;
    y = Math.round(y) + this.size / 2;
    z = Math.round(z) + this.size / 2;

    return (this.field[x] && this.field[x][y] && this.field[x][y][z]) ? this.field[x][y][z] : undefined;
  }
}

export default FlowField;
