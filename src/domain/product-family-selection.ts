import { SelectProduct } from './in/select-product';
import { ProductSelected } from './product-selected';
import { Product } from './product';

export class ProductFamilySelection {

  public execute(selectProductCommand: SelectProduct) {
    return new ProductSelected(
      new Product(selectProductCommand.reference),
    );
  }

}
