import { ProductSelected } from './product-selected';
import { ProductUnselected } from './product-unselected';
import { ProductFamilyDefined } from './product-family-defined';

export type ProductFamilySelectionEvent = ProductSelected | ProductUnselected | ProductFamilyDefined;
