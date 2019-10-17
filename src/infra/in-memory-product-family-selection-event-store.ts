import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { ProductFamilySelectionEventStore } from './product-family-selection-event-store';
import { FamilyId } from '../domain/family-id';

export class InMemoryProductFamilySelectionEventStore implements ProductFamilySelectionEventStore {

  private events: ProductFamilySelectionEvent[] = [];

  public store(events: ProductFamilySelectionEvent[]) {
    this.events = events.concat(this.events);
  }

  public getHistory(familyId?: FamilyId): ProductFamilySelectionEvent[] {
    return familyId
      ? this.events.filter(e => e.familyId.equals(familyId))
      : [...this.events];
  }

}
