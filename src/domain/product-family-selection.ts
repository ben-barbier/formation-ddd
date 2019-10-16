import { SelectProduct } from './commands/select-product';
import { ProductSelected } from './events/product-selected';
import { UnselectProduct } from './commands/unselect-product';
import { ProductUnselected } from './events/product-unselected';
import { ProductFamilyDefined } from './events/product-family-defined';
import { ProductReference } from './product-reference';
import { ProductFamilySelectionEvent } from './events/product-family-selection-event';

export class ProductFamilySelection {

  private references: ProductReference[] = [];

  constructor(events: ProductFamilySelectionEvent[] = []) {
    this.references = events.reduce((acc, event) => {
      if (event instanceof ProductSelected) {
        return acc.concat(event.reference);
      }
      if (event instanceof ProductUnselected) {
        return acc.filter(other => !other.equals(event.reference));
      }
      return acc;
    }, []);
  }

  public select(command: SelectProduct) {
    const reference = command.reference;
    this.references = this.references.concat(reference);
    return new ProductSelected(reference);
  }

  public unselect(command: UnselectProduct) {
    const reference = command.reference;

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
