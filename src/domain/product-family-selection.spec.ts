import { SelectProduct } from './in/select-product';
import { ProductFamilySelection } from './product-family-selection';
import { ProductSelected } from './product-selected';
import { ProductReference } from './product-reference';
import { UnselectProduct } from './in/unselect-product';
import { ProductUnselected } from './product-unselected';
import { ProductFamilyDefined } from './product-family-defined';

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

});
