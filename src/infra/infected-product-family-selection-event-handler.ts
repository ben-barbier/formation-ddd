import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { ProductSelected } from '../domain/events/product-selected';
import { ProductUnselected } from '../domain/events/product-unselected';
import { ProductFamilyDefined } from '../domain/events/product-family-defined';
import { FamilyId } from '../domain/family-id';
import { FamilyNotConfirmedRepository } from './family-not-confirmed-repository';
import { ProductFamilySelectionEventHandler } from './product-family-selection-event-handler';

// event handler
export class InfectedProductFamilySelectionEventHandler implements ProductFamilySelectionEventHandler {

  constructor(private repository: FamilyNotConfirmedRepository) {
  }

  public listen(event: ProductFamilySelectionEvent) {
    // Infected
  }

}
