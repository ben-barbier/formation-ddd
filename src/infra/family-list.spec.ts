import { ProductSelected } from '../domain/events/product-selected';
import { ProductReference } from '../domain/product-reference';

describe('FamilyList', () => {
  it('When receive ProductSelected, my handler should increment counter', () => {
    // Given
    const productSelected = new ProductSelected(new ProductReference('8380101'));

    // When


    // Then

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
