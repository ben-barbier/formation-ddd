import { SelectProduct } from './in/select-product';
import { ProductSelected } from './product-selected';
import { ProductReference } from './product-reference';
import { Product } from './product';

export class ProductFamilySelection {

  execute(selectProductCommand: SelectProduct) {
    return new ProductSelected(
      new Product(
        new ProductReference('8380100'),
      ),
    );
  }

}
