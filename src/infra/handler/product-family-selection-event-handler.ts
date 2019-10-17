import { ProductFamilySelectionEvent } from '../../domain/events/product-family-selection-event';

export interface ProductFamilySelectionEventHandler {
  listen(event: ProductFamilySelectionEvent): void;
}
