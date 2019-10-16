import { SelectProduct } from './commands/select-product';
import { ProductSelected } from './events/product-selected';
import { UnselectProduct } from './commands/unselect-product';
import { ProductUnselected } from './events/product-unselected';
import { ProductFamilyDefined } from './events/product-family-defined';
import { ProductReference } from './product-reference';
import { ProductFamilySelectionEvent } from './events/product-family-selection-event';

export class ProductFamilySelection {
  private decisionProjection;

  constructor(events: ProductFamilySelectionEvent[] = []) {
    this.decisionProjection = new ProductFamilySelection.DecisionProjection(events);
  }

  public select(command: SelectProduct) {
    const events = [];
    const reference = command.reference;
    events.push(new ProductSelected(reference));
    this.decisionProjection.applySelect(reference);
    return events;
  }

  public unselect(command: UnselectProduct) {
    const events = [];
    const reference = command.reference;

    if (this.decisionProjection.hasAlreadySelected(reference)) {
      events.push(new ProductUnselected(reference));
      this.decisionProjection.applyUnselect(reference);
    }
    return events;
  }

  public confirm() {
    const events = [];
    if (this.decisionProjection.references.length) {
      events.push(new ProductFamilyDefined(this.decisionProjection.references));
    }
    return events;
  }

  // tslint:disable-next-line:max-classes-per-file
  private static DecisionProjection = class {
    private internalReferences: ProductReference[];

    public get references() {
      return this.internalReferences;
    }

    constructor(private events: ProductFamilySelectionEvent[]) {
      this.internalReferences = events.reduce((acc, event) => {
        if (event instanceof ProductSelected) {
          return [event.reference].concat(acc);
        }
        if (event instanceof ProductUnselected) {
          return acc.filter(other => !other.equals(event.reference));
        }
        return acc;
      }, []);
    }

    public hasAlreadySelected(reference: ProductReference) {
      return this.references.some(other => other.equals(reference));
    }

    public applySelect(reference: ProductReference) {
      this.internalReferences = [reference].concat(this.internalReferences);
    }

    public applyUnselect(reference: ProductReference) {
      this.internalReferences = this.internalReferences.filter(other => !other.equals(reference));
    }
  };
}
