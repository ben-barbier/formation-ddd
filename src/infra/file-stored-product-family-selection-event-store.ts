import { ProductFamilySelectionEvent } from '../domain/events/product-family-selection-event';
import { ProductFamilySelectionEventStore } from './product-family-selection-event-store';
import * as fs from 'fs';
import { ProductSelected } from '../domain/events/product-selected';
import { FamilyId } from '../domain/family-id';
import { ProductReference } from '../domain/product-reference';
import { ProductUnselected } from '../domain/events/product-unselected';
import { Confirm } from '../domain/commands/confirm';
import { ProductFamilyDefined } from '../domain/events/product-family-defined';

export class FileStoredProductFamilySelectionEventStore implements ProductFamilySelectionEventStore {

  constructor(private filePath: string) {
    if (!fs.existsSync(filePath)) {
      fs.closeSync(fs.openSync(filePath, 'w+'));
    }
  }

  public store(events: ProductFamilySelectionEvent[]) {
    fs.appendFileSync(this.filePath, events
      .map(e => ({
        event: e.constructor.name,
        payload: e,
      }))
      .map(raw => JSON.stringify(raw) + '\n'),
    );
  }

  public getHistory(familyId?: FamilyId): ProductFamilySelectionEvent[] {
    const events = this.parseEvents();
    if (familyId) {
      return events.filter(e => e.familyId.equals(familyId));
    }
    return events;
  }

  private parseEvents(): ProductFamilySelectionEvent[] {
    return fs.readFileSync(this.filePath).toString()
      .split('\n')
      .filter(Boolean)
      .map(raw => JSON.parse(raw))
      .map(parsed => {
        const familyId = new FamilyId(parsed.payload.familyId.id);
        const reference = new ProductReference(parsed.payload.reference.value);
        const references = parsed.payload.references;
        if (parsed.event === 'ProductSelected') {
          return new ProductSelected(familyId, reference);
        }
        if (parsed.event === 'ProductUnselected') {
          return new ProductUnselected(familyId, reference);
        }
        if (parsed.event === 'ProductFamilyDefined') {
          return new ProductFamilyDefined(familyId, references.map(ref => new ProductReference(ref.value)));
        }
        if (parsed.event === 'Confirm') {
          return new Confirm(familyId);
        }
      });
  }

}
