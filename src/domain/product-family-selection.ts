import { SelectProduct } from './in/select-product';
import { ProductSelected } from './product-selected';
import { Product } from './product';
import { UnselectProduct } from './in/unselect-product';
import { ProductUnselected } from './product-unselected';

export class ProductFamilySelection {

  private products: Product[] = [];

  public select(selectProductCommand: SelectProduct) {
    const product = new Product(selectProductCommand.reference);
    this.products = [...this.products, product];
    return new ProductSelected(product);
  }

  public unselect(unselectProductCommand: UnselectProduct) {
    const product = new Product(unselectProductCommand.reference);
    this.products = this.products.filter(other => !other.equals(product));
    return new ProductUnselected(product);
  }

}
