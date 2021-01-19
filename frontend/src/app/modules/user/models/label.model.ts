import { OpenType } from 'src/app/core/enums/open-type.enum';
export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface SaveLabel {
  id?: string;
  name: string;
  color: string;
  userId: string;
}

export interface LabelDialog {
  type: OpenType;
  label: Label | null;
}
