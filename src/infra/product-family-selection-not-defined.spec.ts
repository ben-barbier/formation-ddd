import { ProductSelected } from '../domain/events/product-selected';
import { ProductReference } from '../domain/product-reference';
import { FamilyId } from '../domain/family-id';
import { ProductFamilySelectionNotDefined } from './product-family-selection-not-defined';
import { ProductUnselected } from '../domain/events/product-unselected';
import { ProductFamilyDefined } from '../domain/events/product-family-defined';
import { InMemoryFamilyNotConfirmedRepository } from './in-memory-family-not-confirmed-repository';
import { ProductFamilySelectionNotDefinedHandler } from './product-family-selection-not-defined-handler';

describe('FamilyList', () => {
  it('When receive ProductSelected, my handler should increment counter', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const productSelected = new ProductSelected(family, new ProductReference('8380101'));
    const repository = new InMemoryFamilyNotConfirmedRepository();
    const handler = new ProductFamilySelectionNotDefinedHandler(repository);

    // When
    handler.listen(productSelected);

    // Then
    expect(repository.count(family)).toBe(1);
  });

  it('When receive ProductUnselected, my handler should decrement counter', () => {
    // Given
    const productReferences = ['1', '2', '3', '4', '5'];

    const family = new FamilyId('FamilleA');

    const repository = new InMemoryFamilyNotConfirmedRepository();
    const handler = new ProductFamilySelectionNotDefinedHandler(repository);
    const productsSelected = productReferences.map(id => new ProductSelected(family, new ProductReference(id)));
    productsSelected.forEach(productSelected => handler.listen(productSelected));

    const productUnselected = new ProductUnselected(
      family,
      new ProductReference('1'),
    );
    // When
    handler.listen(productUnselected);

    // Then
    expect(repository.count(family)).toBe(4);
  });

  it('When receive ProductsFamilyDefines, my handler should remove projection', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const repository = new InMemoryFamilyNotConfirmedRepository();
    const handler = new ProductFamilySelectionNotDefinedHandler(repository);
    const productReferences = ['1', '2', '3', '4', '5'];
    const productsSelected = productReferences.map(id => new ProductSelected(family, new ProductReference(id)));
    productsSelected.forEach(productSelected => handler.listen(productSelected));

    const productFamilyDefined = new ProductFamilyDefined(family, [
      new ProductReference('1'),
      new ProductReference('2'),
      new ProductReference('3'),
      new ProductReference('4'),
      new ProductReference('5'),
    ]);

    // When
    handler.listen(productFamilyDefined);

    // Then
    expect(repository.getAll()).toHaveLength(0);
  });
});
