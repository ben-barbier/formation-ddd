import { FamilyId } from '../domain/family-id';
import { FamilyNotConfirmedRepository } from './family-not-confirmed-repository';
import { ProductFamilySelectionNotDefined } from './product-family-selection-not-defined';

export class InMemoryFamilyNotConfirmedRepository implements FamilyNotConfirmedRepository {

  //      |projection    |repository
  private selections: ProductFamilySelectionNotDefined[] = [];

  private find(familyId: FamilyId) {
    return this.selections.find(selection => selection.family === familyId.id);
  }

  public count(familyId: FamilyId) {
    const found = this.find(familyId);
    return found && found.count || 0;
  }

  public increment(familyId: FamilyId) {
    const found = this.find(familyId);
    if (found) {
      found.count = (found.count || 0) + 1;
    } else {
      this.selections.push(new ProductFamilySelectionNotDefined(familyId.id, 1));
    }
  }

  public decrement(familyId: FamilyId) {
    const found = this.find(familyId);
    if (found) {
      found.count = found.count && found.count - 1;
    } else {
      this.selections.push(new ProductFamilySelectionNotDefined(familyId.id, 0));
    }
  }

  public remove(familyId: FamilyId) {
    this.selections = this.selections.filter(selection => selection.family !== familyId.id);
  }

  public getAll(): ProductFamilySelectionNotDefined[] {
    return [...this.selections];
  }

}
