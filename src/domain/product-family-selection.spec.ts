import { SelectProduct } from './in/select-product';
import { ProductFamilySelection } from './product-family-selection';
import { ProductSelected } from './product-selected';
import { Product } from './product';
import { ProductReference } from './product-reference';
import { UnselectProduct } from './in/unselect-product';
import { ProductUnselected } from './product-unselected';

describe('ProductFamilySelection', () => {
  it('should raise ProductSelected', () => {
    // Given
    const selectProductCommand = new SelectProduct(new ProductReference('8380101'));
    const productFamilySelection = new ProductFamilySelection();

    // When
    const triggeredEvent = productFamilySelection.select(selectProductCommand);

    // Then
    const expectedEvent = new ProductSelected(
      new Product(selectProductCommand.reference),
    );
    expect(triggeredEvent).toStrictEqual(expectedEvent);
  });

  it('should raise ProductUnselected', () => {
    // Given
    const unselectProductCommand = new UnselectProduct(new ProductReference('8380101'));
    const productFamilySelection = new ProductFamilySelection();

    // When
    const triggeredEvent = productFamilySelection.unselect(unselectProductCommand);

    // Then
    const expectedEvent = new ProductUnselected(
      new Product(unselectProductCommand.reference),
    );
    expect(triggeredEvent).toStrictEqual(expectedEvent);
  });
});
