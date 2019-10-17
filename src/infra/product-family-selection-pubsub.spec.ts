import { ProductReference } from '../domain/product-reference';
import { FamilyId } from '../domain/family-id';
import { InMemoryFamilyNotConfirmedRepository } from './in-memory-family-not-confirmed-repository';
import { ProductFamilySelectionNotDefinedEventHandler } from './product-family-selection-not-defined-event-handler';
import { ProductFamilySelectionPubsub } from './product-family-selection-pubsub';
import { select } from '../domain/product-family-selection';
import { SelectProduct } from '../domain/commands/select-product';
import { InMemoryProductFamilySelectionEventStore } from './in-memory-product-family-selection-event-store';
import { ProductSelected } from '../domain/events/product-selected';
import { InfectedProductFamilySelectionEventHandler } from './infected-product-family-selection-event-handler';
import { FileStoredProductFamilySelectionEventStore } from './file-stored-product-family-selection-event-store';

describe('Projection', () => {

  it('should be updated when pubsub has received events from executed command 🚀', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const projectionRepository = new InMemoryFamilyNotConfirmedRepository();
    const handler = new ProductFamilySelectionNotDefinedEventHandler(projectionRepository);
    const eventStore = new InMemoryProductFamilySelectionEventStore();
    const pubsub = new ProductFamilySelectionPubsub(eventStore, [handler]);
    const events = select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('1')));

    // When/Then
    expect(projectionRepository.count(family)).toBe(0);

    pubsub.receive(events);
    expect(projectionRepository.count(family)).toBe(1);

    pubsub.receive(select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('1'))));
    expect(projectionRepository.count(family)).toBe(1);

    pubsub.receive(select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('2'))));
    expect(projectionRepository.count(family)).toBe(2);
  });

});

describe('Event store', () => {

  it('should be updated before handlers 🚀', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const projectionRepository = new InMemoryFamilyNotConfirmedRepository();
    const handler = new InfectedProductFamilySelectionEventHandler(projectionRepository);
    const eventStore = new InMemoryProductFamilySelectionEventStore();
    const pubsub = new ProductFamilySelectionPubsub(eventStore, [handler]);
    const events = select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('1')));

    // When/Then
    pubsub.receive(select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('1'))));
    pubsub.receive(select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('1'))));
    pubsub.receive(select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('2'))));

    expect(eventStore.getHistory()).toEqual([
      new ProductSelected(family, new ProductReference('2')),
      new ProductSelected(family, new ProductReference('1')),
    ]);

    // Because of infected event handler, projection is not up to date
    expect(projectionRepository.count(family)).toBe(0);
  });

});

describe('FS Event store', () => {

  it('should be updated before handlers 🚀', () => {
    // Given
    const family = new FamilyId('FamilleA');
    const projectionRepository = new InMemoryFamilyNotConfirmedRepository();
    const handler = new InfectedProductFamilySelectionEventHandler(projectionRepository);
    const eventStore = new FileStoredProductFamilySelectionEventStore('./eventStore.txt');
    const pubsub = new ProductFamilySelectionPubsub(eventStore, [handler]);
    const events = select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('1')));

    // When/Then
    pubsub.receive(select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('1'))));
    pubsub.receive(select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('1'))));
    pubsub.receive(select(eventStore.getHistory(), new SelectProduct(family, new ProductReference('2'))));

    const expectedEvents = [
      new ProductSelected(family, new ProductReference('2')),
      new ProductSelected(family, new ProductReference('1')),
    ];

    expectedEvents.forEach(expectedEvent => {
      expect(eventStore.getHistory(family)).toContainEqual(expectedEvent);
    });

    // Because of infected event handler, projection is not up to date
    expect(projectionRepository.count(family)).toBe(0);
  });

});
