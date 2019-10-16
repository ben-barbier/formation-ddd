import { SelectProduct } from './commands/select-product';
import { ProductSelected } from './events/product-selected';
import { ProductReference } from './product-reference';
import { UnselectProduct } from './commands/unselect-product';
import { ProductUnselected } from './events/product-unselected';
import { ProductFamilyDefined } from './events/product-family-defined';
import { select, unselect, confirm } from './product-family-selection';

describe('ProductFamilySelection', () => {
  it('should raise ProductSelected', () => {
    // Given
    const selectProductCommand = new SelectProduct(new ProductReference('8380101'));
    // const productFamilySelection = new ProductFamilySelection();

    // When
    const triggeredEvents = select([], selectProductCommand);

    // Then
    const expectedEvent = new ProductSelected(selectProductCommand.reference);
    expect(triggeredEvents[0]).toStrictEqual(expectedEvent);
  });

  it('should raise ProductUnselected', () => {
    // Given
    const selectProductCommand = new SelectProduct(new ProductReference('8380101'));
    const selectHistory = select([], selectProductCommand);
    const unselectProductCommand = new UnselectProduct(new ProductReference('8380101'));

    // When
    const triggeredEvents = unselect(selectHistory)(unselectProductCommand);

    // Then
    const expectedEvent = new ProductUnselected(unselectProductCommand.reference);
    expect(triggeredEvents[0]).toStrictEqual(expectedEvent);
  });

  it('should raise nothing if product is not in selection', () => {
    // Given
    const unselectProductCommand = new UnselectProduct(new ProductReference('8380101'));
    const unselectWithHistory = unselect([]);

    // When
    const triggeredEvents = unselectWithHistory(unselectProductCommand);

    // Then
    expect(triggeredEvents).toHaveLength(0);
  });

  it('should raise ProductsFamilyDefined', () => {
    // Given
    const selectProductCommand = new SelectProduct(new ProductReference('8380101'));
    const selectHistory = select([], selectProductCommand);

    // When
    const triggeredEvents = confirm(selectHistory);

    // Then
    const expectedEvent = new ProductFamilyDefined(
      [selectProductCommand.reference],
    );
    expect(triggeredEvents[0]).toStrictEqual(expectedEvent);
  });

  it('should not raise ProductsFamilyDefined if products is empty', () => {
    // Given

    // When
    const triggeredEvents = confirm([]);

    // Then
    expect(triggeredEvents).toHaveLength(0);
  });

  it('should replay events', () => {
    // Given
    const events = [
      new ProductSelected(new ProductReference('8380101')),
      new ProductSelected(new ProductReference('8380102')),
      new ProductSelected(new ProductReference('8380103')),
      new ProductUnselected(new ProductReference('8380102')),
      new ProductUnselected(new ProductReference('8380104')),
    ];

    // When
    const triggeredEvents = confirm(events);

    // Then
    const expectedEvent = new ProductFamilyDefined([
      new ProductReference('8380103'),
      new ProductReference('8380101'),
    ]);

    expect(triggeredEvents[0]).toStrictEqual(expectedEvent);

  });

});
