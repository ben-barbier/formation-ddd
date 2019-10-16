import { SelectProduct } from './in/select-product';
import { ProductSelected } from './product-selected';
import { UnselectProduct } from './in/unselect-product';
import { ProductUnselected } from './product-unselected';
import { ProductFamilyDefined } from './product-family-defined';
import { ProductReference } from './product-reference';

export class ProductFamilySelection {

  private references: ProductReference[] = [];

  public select(selectProductCommand: SelectProduct) {
    const reference = selectProductCommand.reference;
    this.references = this.references.concat(reference);
    return new ProductSelected(reference);
  }

  public unselect(unselectProductCommand: UnselectProduct) {
    const reference = unselectProductCommand.reference;

    if (this.references.some(other => other.equals(reference))) {
      this.references = this.references.filter(other => !other.equals(reference));
      return new ProductUnselected(reference);
    }
  }

  public confirm() {
    if (this.references.length) {
      return new ProductFamilyDefined(this.references);
    }
  }

}
