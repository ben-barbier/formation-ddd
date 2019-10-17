import { ProductSelected } from './product-selected';
import { ProductUnselected } from './product-unselected';
import { ProductFamilyDefined } from './product-family-defined';
import { Confirm } from '../commands/confirm';

export type ProductFamilySelectionEvent = ProductSelected | ProductUnselected | ProductFamilyDefined | Confirm;
