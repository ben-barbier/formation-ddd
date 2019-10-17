// La projection qui permet de connaitre
// les familles: notamment celles à finaliser
// le nombre de familles

// {
//   nbDeFamilles:
//   familles: [{id: , finalisee: true/false}]
// }

import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { ProductSelected } from '../domain/events/product-selected';
import { ProductUnselected } from '../domain/events/product-unselected';
import { ProductFamilyDefined } from '../domain/events/product-family-defined';
import { FamilyId } from '../domain/family-id';
import { FamilyNotConfirmedRepository } from './family-not-confirmed-repository';

// event handler
export class ProductFamilySelectionNotDefined {

  constructor(private repository: FamilyNotConfirmedRepository) {
  }

  public listen(event: ProductFamilySelectionEvent) {
    const familyId = event.familyId;
    if (event instanceof ProductSelected) {
      this.repository.increment(familyId);
    } else if (event instanceof ProductUnselected) {
      this.repository.decrement(familyId);
    } else if (event instanceof ProductFamilyDefined) {
      this.repository.reset(familyId);
    }
  }

  // TODO: on laisse ca la ??? (@Ben)
  public count(familyId: FamilyId) {
    return this.repository.count(familyId);
  }

}
