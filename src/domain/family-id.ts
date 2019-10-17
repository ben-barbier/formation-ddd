export class FamilyId {
  constructor(public id: string) {
  }

  public equals(other: FamilyId) {
    return other.id === this.id;
  }
}
