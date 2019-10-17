import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';

export class ProductFamilySelectionEventStore {

  private events: ProductFamilySelectionEvent[] = [];

  public store(events: ProductFamilySelectionEvent[]) {
    this.events = events.concat(this.events);
  }

}
