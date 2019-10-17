import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { ProductFamilySelectionEventStore } from './product-family-selection-event-store';

export class InMemoryProductFamilySelectionEventStore implements ProductFamilySelectionEventStore {

  private events: ProductFamilySelectionEvent[] = [];

  public store(events: ProductFamilySelectionEvent[]) {
    this.events = events.concat(this.events);
  }

  public getHistory(): ProductFamilySelectionEvent[] {
    return [...this.events];
  }

}
