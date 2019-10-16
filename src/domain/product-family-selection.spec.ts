import { SelectProduct } from './in/select-product';
import { ProductFamilySelection } from './product-family-selection';
import { ProductSelected } from './product-selected';
import { Product } from './product';
import { ProductReference } from './product-reference';

describe('ProductFamilySelection', () => {
  it('should raise ProductSelect', () => {
    // Given
    const selectProductCommand = new SelectProduct();
    const productFamilySelection = new ProductFamilySelection();

    // When
    const triggeredEvent = productFamilySelection.execute(selectProductCommand);

    // Then
    const expectedEvent = new ProductSelected(
      new Product(
        new ProductReference('8380100'),
      ),
    );
    expect(triggeredEvent).toStrictEqual(expectedEvent);
  });
});
