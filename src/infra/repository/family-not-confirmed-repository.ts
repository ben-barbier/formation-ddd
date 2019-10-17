import { FamilyId } from '../../domain/family-id';
import { ProductFamilySelectionNotDefined } from '../projection/product-family-selection-not-defined';

export interface FamilyNotConfirmedRepository {

  count(familyId: FamilyId): number;
  increment(familyId: FamilyId): void;
  decrement(familyId: FamilyId): void;
  remove(familyId: FamilyId): void;
  getAll(): ProductFamilySelectionNotDefined[]; // drivé par la vue ici

}
