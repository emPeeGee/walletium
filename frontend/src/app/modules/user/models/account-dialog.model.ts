import { OpenType } from 'src/app/core/enums/open-type.enum';
import { Account } from './account.model';

export interface AccountDialog {
  type: OpenType;
  account: Account | null;
}
