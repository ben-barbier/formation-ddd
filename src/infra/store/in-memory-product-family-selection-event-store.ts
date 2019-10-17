import { ProductFamilySelectionEvent } from '../../domain/events/product-family-selection-event';
import { ProductFamilySelectionEventStore } from './product-family-selection-event-store';
import { FamilyId } from '../../domain/family-id';
import { SequenceAlreadyExists } from './SequenceAlreadyExists';

export class InMemoryProductFamilySelectionEventStore implements ProductFamilySelectionEventStore {

  private events: ProductFamilySelectionEvent[] = [];

  public store(familyId: FamilyId, sequence: number, events: ProductFamilySelectionEvent[]) {
    const history = this.getHistory(familyId);
    if (history.length === sequence) {
      this.events = events.concat(this.events);
      return;
    }
    throw new SequenceAlreadyExists();
  }

  public getHistory(familyId?: FamilyId): ProductFamilySelectionEvent[] {
    return familyId
      ? this.events.filter(e => e.familyId.equals(familyId))
      : [...this.events];
  }

}
