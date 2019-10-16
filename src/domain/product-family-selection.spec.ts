import { SelectProduct } from './commands/select-product';
import { ProductSelected } from './events/product-selected';
import { ProductReference } from './product-reference';
import { UnselectProduct } from './commands/unselect-product';
import { ProductUnselected } from './events/product-unselected';
import { ProductFamilyDefined } from './events/product-family-defined';
import { select, unselect, confirm } from './product-family-selection';
import { FamilyId } from './family-id';
import { Confirm } from './commands/confirm';

describe('ProductFamilySelection', () => {
  it('should raise ProductSelected', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const selectProductCommand = new SelectProduct(family, new ProductReference('8380101'));

    // When
    const triggeredEvents = select([], selectProductCommand);

    // Then
    const expectedEvent = new ProductSelected(family, selectProductCommand.reference);
    expect(triggeredEvents[0]).toStrictEqual(expectedEvent);
  });

  it('should raise ProductUnselected', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const selectProductCommand = new SelectProduct(family, new ProductReference('8380101'));
    const selectHistory = select([], selectProductCommand);
    const unselectProductCommand = new UnselectProduct(family, new ProductReference('8380101'));

    // When
    const triggeredEvents = unselect(selectHistory)(unselectProductCommand);

    // Then
    const expectedEvent = new ProductUnselected(family, unselectProductCommand.reference);
    expect(triggeredEvents[0]).toStrictEqual(expectedEvent);
  });

  it('should raise nothing if product is not in selection', () => {
    // Given
    const unselectProductCommand = new UnselectProduct(new FamilyId('FamilleA'), new ProductReference('8380101'));
    const unselectWithHistory = unselect([]);

    // When
    const triggeredEvents = unselectWithHistory(unselectProductCommand);

    // Then
    expect(triggeredEvents).toHaveLength(0);
  });

  it('should raise ProductsFamilyDefined', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const selectProductCommand = new SelectProduct(family, new ProductReference('8380101'));
    const selectHistory = select([], selectProductCommand);

    // When
    const triggeredEvents = confirm(selectHistory, new Confirm(family));

    // Then
    const expectedEvent = new ProductFamilyDefined(
      family, [selectProductCommand.reference],
    );
    expect(triggeredEvents[0]).toStrictEqual(expectedEvent);
  });

  it('should not raise ProductsFamilyDefined if products is empty', () => {
    // Given
    const family = new FamilyId('FamilleA');

    // When
    const triggeredEvents = confirm([], new Confirm(family));

    // Then
    expect(triggeredEvents).toHaveLength(0);
  });

  it('should replay events', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const events = [
      new ProductSelected(family, new ProductReference('8380101')),
      new ProductSelected(family, new ProductReference('8380102')),
      new ProductSelected(family, new ProductReference('8380103')),
      new ProductUnselected(family, new ProductReference('8380102')),
      new ProductUnselected(family, new ProductReference('8380104')),
    ];

    // When
    const triggeredEvents = confirm(events, new Confirm(family));

    // Then
    const expectedEvent = new ProductFamilyDefined(family, [
      new ProductReference('8380103'),
      new ProductReference('8380101'),
    ]);

    expect(triggeredEvents[0]).toStrictEqual(expectedEvent);

  });

});
