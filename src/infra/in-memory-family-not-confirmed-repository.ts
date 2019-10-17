import { FamilyId } from '../domain/family-id';
import { FamilyNotConfirmedRepository } from './family-not-confirmed-repository';

export class InMemoryFamilyNotConfirmedRepository implements FamilyNotConfirmedRepository {

  //      |projection    |repository
  private counters = new Map<FamilyId, number>();

  public count(familyId: FamilyId) {
    return this.counters.get(familyId) || 0;
  }

  public increment(familyId: FamilyId) {
    const counter = this.counters.get(familyId) || 0;
    this.counters.set(familyId, counter + 1);
  }

  public decrement(familyId: FamilyId) {
    const counter = this.counters.get(familyId) || 0;
    this.counters.set(familyId, counter && counter - 1);
  }

  public reset(familyId: FamilyId) {
    this.counters.delete(familyId);
  }

}
