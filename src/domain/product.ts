import { ProductReference } from './product-reference';

export class Product {

  constructor(public reference: ProductReference) {
  }

  public equals(other: Product) {
    return other && other.reference.equals(this.reference);
  }

}
