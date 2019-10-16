// La projection qui permet de connaitre
// les familles: notamment celles à finaliser
// le nombre de familles

// {
//   nbDeFamilles:
//   familles: [{id: , finalisee: true/false}]
// }

import { FamilyId } from '../domain/family-id';
import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { ProductSelected } from '../domain/events/product-selected';

export class FamilyCounters {

  private counters = new Map<FamilyId, number>();

  public listen(event: ProductFamilySelectionEvent) {
    if (event instanceof ProductSelected) {
      this.increment(event.familyId);
    }
  }

  public count(familyId: FamilyId) {
    return this.counters.get(familyId) || 0;
  }

  private increment(familyId: FamilyId) {
    const counter = this.counters.get(familyId) || 0;
    this.counters.set(familyId, counter + 1);
  }

  private decrement(familyId: FamilyId) {
    const counter = this.counters.get(familyId) || 0;
    this.counters.set(familyId, counter && counter - 1);
  }

}
