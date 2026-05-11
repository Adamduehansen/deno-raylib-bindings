export class Vector2 {
  private _length = 0;

  constructor(public x: number, public y: number) {}

  /**
   * Change length of the vector to one
   */
  normalize(): void {
    this._length = this.length();
    this.x /= this._length;
    this.y /= this._length;
  }

  /**
   * Returning the length of the vector
   */
  length(): number {
    return Math.sqrt(this.length2());
  }

  /**
   * Returning the squared length of the vector - avoids squareroot -> less performance intensive
   */
  length2(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Returning the orthonormal vector of the class vector
   */
  getNormal(): Vector2 {
    return new Vector2(this.y, -this.x);
  }

  /**
   * Returning the dot product with an other vector
   */
  dot(vec: Vector2): number {
    return this.x * vec.x + this.y * vec.y;
  }

  /**
   * Returning a copied vector of this class
   */
  copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * Adding a vector to the class vector
   */
  add(vec: Vector2): void {
    this.x += vec.x;
    this.y += vec.y;
  }

  /**
   * Substracting a vector from the class vector
   */
  sub(vec: Vector2): void {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  /**
   * Scaling this vector by a scalar value
   */
  scale(scalar: number): void {
    this.x *= scalar;
    this.y *= scalar;
  }

  cross(vec: Vector2): number {
    return this.x * vec.x - this.y * vec.y;
  }

  log(): void {
    console.log("x: ", this.x, " - y: ", this.y);
  }
}

export function add(vecA: Vector2, vecB: Vector2) {
  return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
}

export function sub(vecA: Vector2, vecB: Vector2) {
  return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
}

export function scale(vecA: Vector2, scale: number) {
  return new Vector2(vecA.x * scale, vecA.y * scale);
}
