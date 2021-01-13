import { OpenType } from 'src/app/core/enums/open-type.enum';
import { Category } from './category.model';

export interface CategoryDialog {
  type: OpenType;
  category: Category | null;
}
