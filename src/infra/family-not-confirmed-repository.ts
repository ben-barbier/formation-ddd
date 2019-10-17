import { FamilyId } from '../domain/family-id';

export interface FamilyNotConfirmedRepository {

  count(familyId: FamilyId): number;
  increment(familyId: FamilyId): void;
  decrement(familyId: FamilyId): void;
  reset(familyId: FamilyId): void;

}
