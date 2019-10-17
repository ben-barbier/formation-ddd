import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';

export interface ProductFamilySelectionEventStore {

  store(events: ProductFamilySelectionEvent[]): void;

  getHistory(): ProductFamilySelectionEvent[];

}
