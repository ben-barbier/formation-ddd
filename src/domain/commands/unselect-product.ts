import { ProductReference } from '../product-reference';
import { FamilyId } from '../family-id';

export class UnselectProduct {
  constructor(public familyId: FamilyId, public reference: ProductReference) {
  }
}
