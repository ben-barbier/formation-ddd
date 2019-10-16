export class ProductReference {
  constructor(public value: string) {
  }

  public equals(other: ProductReference) {
    return other && other.value === this.value;
  }
}
