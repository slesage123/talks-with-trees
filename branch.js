class Branch {

  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    this.depth = 0;
  }

  show() {
    let length = dist(this.begin.x, this.begin.y, this.end.x, this.end.y);
    let branchThickness = map(length, 0, 150, 0, 25);
    strokeWeight(branchThickness);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  branchA() { //Makes the right side of the tree
    if (this.depth < 8){
      var dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(PI / 7);
      dir.mult(0.67);
      var newEnd = p5.Vector.add(this.end, dir);
      var b = new Branch(this.end, newEnd);
      b.depth = this.depth + 1;
      return b;
    }
  }

  branchB() { //Makes the left side of the tree
    if (this.depth < 8){
      var dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(-PI / 4);
      dir.mult(0.67);
      var newEnd = p5.Vector.add(this.end, dir);
      var b = new Branch(this.end, newEnd);
      b.depth = this.depth + 1;
      return b;
    }
  }
}
