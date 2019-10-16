import { SelectProduct } from './commands/select-product';
import { ProductSelected } from './events/product-selected';
import { UnselectProduct } from './commands/unselect-product';
import { ProductUnselected } from './events/product-unselected';
import { ProductFamilyDefined } from './events/product-family-defined';
import { ProductReference } from './product-reference';
import { ProductFamilySelectionEvent } from './events/product-family-selection-event';
import { Confirm } from './commands/confirm';

export function select(history: ProductFamilySelectionEvent[], command: SelectProduct): ProductFamilySelectionEvent[] {
  return [new ProductSelected(command.familyId, command.reference)];
}

export const unselect = (history: ProductFamilySelectionEvent[]) => (command: UnselectProduct): ProductFamilySelectionEvent[] => {
  const events = [];
  const reference = command.reference;
  if (new DecisionProjection(history).hasAlreadySelected(reference)) {
    events.push(new ProductUnselected(command.familyId, reference));
  }
  return events;
};

export function confirm(history: ProductFamilySelectionEvent[], command: Confirm): ProductFamilySelectionEvent[] {
  const events = [];
  if (new DecisionProjection(history).references.length) {
    events.push(new ProductFamilyDefined(command.familyId, new DecisionProjection(history).references));
  }
  return events;
}

class DecisionProjection {
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
}
