import { ProductReference } from '../product-reference';
import { FamilyId } from '../family-id';

export class ProductFamilyDefined {
  constructor(public familyId: FamilyId, public references: ProductReference[]) {
  }
}
