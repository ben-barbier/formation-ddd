import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { ProductSelected } from '../domain/events/product-selected';
import { ProductUnselected } from '../domain/events/product-unselected';
import { ProductFamilyDefined } from '../domain/events/product-family-defined';
import { FamilyId } from '../domain/family-id';
import { FamilyNotConfirmedRepository } from './family-not-confirmed-repository';

// event handler
export class ProductFamilySelectionNotDefinedHandler {

  constructor(private repository: FamilyNotConfirmedRepository) {
  }

  public listen(event: ProductFamilySelectionEvent) {
    const familyId = event.familyId;
    if (event instanceof ProductSelected) {
      this.repository.increment(familyId);
    } else if (event instanceof ProductUnselected) {
      this.repository.decrement(familyId);
    } else if (event instanceof ProductFamilyDefined) {
      this.repository.remove(familyId);
    }
  }

}
