import { ProductSelected } from '../domain/events/product-selected';
import { ProductReference } from '../domain/product-reference';
import { FamilyId } from '../domain/family-id';
import { FamilyCounters } from './family-counters';

describe('FamilyList', () => {
  it('When receive ProductSelected, my handler should increment counter', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const productSelected = new ProductSelected(family, new ProductReference('8380101'));
    const familyCounters = new FamilyCounters();

    // When
    familyCounters.listen(productSelected);

    // Then
    expect(familyCounters.count(family)).toBe(1);
  });

  it('When receive ProductUnselected, my handler should decrement counter', () => {
    // Given

    // When

    // Then

  });

  it('When receive ProductsFamilyDefines, my handler should remove projection', () => {
    // Given

    // When

    // Then

  });
});
