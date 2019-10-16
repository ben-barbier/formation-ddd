import { SelectProduct } from './in/select-product';
import { ProductFamilySelection } from './product-family-selection';

describe('ProductFamilySelection', () => {
  it('should raise ProductSelect', () => {
    // Given
    const selectProductCommand = new SelectProduct();
    const productFamilySelection = new ProductFamilySelection();

    // When
    const triggeredEvent = productFamilySelection.execute(selectProductCommand);

    // Then
    expect(triggeredEvent).toBe('ProductSelected');
  });
});
