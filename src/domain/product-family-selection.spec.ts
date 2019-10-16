import { SelectProduct } from './commands/select-product';
import { ProductFamilySelection } from './product-family-selection';
import { ProductSelected } from './events/product-selected';
import { ProductReference } from './product-reference';
import { UnselectProduct } from './commands/unselect-product';
import { ProductUnselected } from './events/product-unselected';
import { ProductFamilyDefined } from './events/product-family-defined';

describe('ProductFamilySelection', () => {
  it('should raise ProductSelected', () => {
    // Given
    const selectProductCommand = new SelectProduct(new ProductReference('8380101'));
    const productFamilySelection = new ProductFamilySelection();

    // When
    const triggeredEvent = productFamilySelection.select(selectProductCommand);

    // Then
    const expectedEvent = new ProductSelected(selectProductCommand.reference);
    expect(triggeredEvent).toStrictEqual(expectedEvent);
  });

  it('should raise ProductUnselected', () => {
    // Given
    const selectProductCommand = new SelectProduct(new ProductReference('8380101'));
    const productFamilySelection = new ProductFamilySelection();
    productFamilySelection.select(selectProductCommand);
    const unselectProductCommand = new UnselectProduct(new ProductReference('8380101'));

    // When
    const triggeredEvent = productFamilySelection.unselect(unselectProductCommand);

    // Then
    const expectedEvent = new ProductUnselected(unselectProductCommand.reference);
    expect(triggeredEvent).toStrictEqual(expectedEvent);
  });

  it('should raise nothing if product is not in selection', () => {
    // Given
    const productFamilySelection = new ProductFamilySelection();
    const unselectProductCommand = new UnselectProduct(new ProductReference('8380101'));

    // When
    const triggeredEvent = productFamilySelection.unselect(unselectProductCommand);

    // Then
    expect(triggeredEvent).toBeUndefined();
  });

  it('should raise ProductsFamilyDefined', () => {
    // Given
    const selectProductCommand = new SelectProduct(new ProductReference('8380101'));
    const productFamilySelection = new ProductFamilySelection();
    productFamilySelection.select(selectProductCommand);

    // When
    const triggeredEvent = productFamilySelection.confirm();

    // Then
    const expectedEvent = new ProductFamilyDefined(
      [selectProductCommand.reference],
    );
    expect(triggeredEvent).toStrictEqual(expectedEvent);
  });

  it('should not raise ProductsFamilyDefined if products is empty', () => {
    // Given
    const productFamilySelection = new ProductFamilySelection();

    // When
    const triggeredEvent = productFamilySelection.confirm();

    // Then
    expect(triggeredEvent).toBeUndefined();
  });

  it('sould replay events', () => {
    // Given
    const events = [
      new ProductSelected(new ProductReference('8380101')),
      new ProductSelected(new ProductReference('8380102')),
      new ProductSelected(new ProductReference('8380103')),
      new ProductUnselected(new ProductReference('8380102')),
      new ProductUnselected(new ProductReference('8380104')),
    ];

    // When
    const productFamilySelection = new ProductFamilySelection(events);
    const productFamilyDefined = productFamilySelection.confirm();

    // Then
    expect(productFamilyDefined.references).toStrictEqual([
      new ProductReference('8380101'),
      new ProductReference('8380103'),
    ]);

  });

});
