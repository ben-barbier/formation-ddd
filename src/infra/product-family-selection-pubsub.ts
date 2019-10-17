import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { ProductFamilySelectionEventStore } from './product-family-selection-event-store';
import { ProductFamilySelectionEventHandler } from './product-family-selection-event-handler';

export class ProductFamilySelectionPubsub {

  public eventStore: ProductFamilySelectionEventStore = new ProductFamilySelectionEventStore();

  constructor(public handlers: ProductFamilySelectionEventHandler[]) {}

  public receive(events: ProductFamilySelectionEvent[]) {
    this.eventStore.store(events);
    events.forEach(event => {
      this.handlers.forEach(handler => {
        handler.listen(event);
      });
    });
  }

}
