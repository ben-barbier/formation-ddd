import { ProductReference } from '../domain/product-reference';
import { FamilyId } from '../domain/family-id';
import { InMemoryFamilyNotConfirmedRepository } from './in-memory-family-not-confirmed-repository';
import { ProductFamilySelectionNotDefinedHandler } from './product-family-selection-not-defined-handler';
import { ProductFamilySelectionPubsub } from './product-family-selection-pubsub';
import { select } from '../domain/product-family-selection';
import { SelectProduct } from '../domain/commands/select-product';
import { InMemoryProductFamilySelectionEventStore } from './in-memory-product-family-selection-event-store';

describe('FamilyList', () => {

  it('should update projection when sending command and using pubsub 🚀', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const projectionRepository = new InMemoryFamilyNotConfirmedRepository();
    const handler = new ProductFamilySelectionNotDefinedHandler(projectionRepository);
    const eventStore = new InMemoryProductFamilySelectionEventStore();
    const pubsub = new ProductFamilySelectionPubsub(eventStore, [handler]);
    const events = select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('1')));

    // When
    expect(projectionRepository.count(family)).toBe(0);
    pubsub.receive(events);

    // Then
    expect(projectionRepository.count(family)).toBe(1);
    pubsub.receive(select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('2'))));
    expect(projectionRepository.count(family)).toBe(2);
  });

});
