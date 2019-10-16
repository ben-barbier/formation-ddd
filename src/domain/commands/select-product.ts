import { ProductReference } from '../product-reference';
import { FamilyId } from '../family-id';

export class SelectProduct {
  constructor(public familyId: FamilyId, public reference: ProductReference) {
  }
}
