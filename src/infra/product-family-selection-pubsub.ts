import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { ProductFamilySelectionEventStore } from './product-family-selection-event-store';
import { ProductFamilySelectionEventHandler } from './product-family-selection-event-handler';

// Etape d'après: 1 seul PubSub générique qui reçoit des events génériques
// que les handlers peuvent recevoir (listen(Event))
export class ProductFamilySelectionPubsub {

  constructor(private eventStore: ProductFamilySelectionEventStore,
              private handlers: ProductFamilySelectionEventHandler[]) {
  }

  public receive(events: ProductFamilySelectionEvent[]) {
    this.eventStore.store(events);
    events.forEach(event => {
      this.handlers.forEach(handler => {
        handler.listen(event);
      });
    });
  }

}
