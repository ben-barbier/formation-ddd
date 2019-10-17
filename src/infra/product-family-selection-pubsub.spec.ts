import { ProductSelected } from '../domain/events/product-selected';
import { ProductReference } from '../domain/product-reference';
import { FamilyId } from '../domain/family-id';
import { ProductFamilySelectionNotDefined } from './product-family-selection-not-defined';
import { ProductUnselected } from '../domain/events/product-unselected';
import { ProductFamilyDefined } from '../domain/events/product-family-defined';
import { InMemoryFamilyNotConfirmedRepository } from './in-memory-family-not-confirmed-repository';
import { ProductFamilySelectionNotDefinedHandler } from './product-family-selection-not-defined-handler';
import { ProductFamilySelectionPubsub } from './product-family-selection-pubsub';
import { select } from '../domain/product-family-selection';
import { SelectProduct } from '../domain/commands/select-product';

describe('FamilyList', () => {

  it('should update projection when sending command and using pubsub 🚀', () => {
    const family = new FamilyId('FamilleA');

    const projectionRepository = new InMemoryFamilyNotConfirmedRepository();
    const handler = new ProductFamilySelectionNotDefinedHandler(projectionRepository);
    const pubsub = new ProductFamilySelectionPubsub([handler]);
    // TODO: récupérer l'histo de l'eventstore
    const events = select([], new SelectProduct(family, new ProductReference('1')));

    // When
    expect(projectionRepository.count(family)).toBe(0);
    pubsub.receive(events);

    // Then
    expect(projectionRepository.count(family)).toBe(1);
  });

});
