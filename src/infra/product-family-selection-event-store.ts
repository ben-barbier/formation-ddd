import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { FamilyId } from '../domain/family-id';

export interface ProductFamilySelectionEventStore {

  store(events: ProductFamilySelectionEvent[]): void;

  getHistory(familyId?: FamilyId): ProductFamilySelectionEvent[];

}
