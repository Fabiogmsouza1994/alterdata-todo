import {
  FieldDropdownDefinitionModel,
} from '../dropdown-field/dropdown-field.model';


export interface tableColHeaderConfigModel {
  colHeaderText: string;
  colHeaderValue: string;
  notEdit?: boolean;
}

export interface tableEditingModel {
  allowInsertion?: boolean;
  allowExclusion?: boolean;
  allowAll?: boolean;
}

export interface TableFilterModel<TableFilterModelData> {
  inputFieldLabel: string;
  dropdownFieldLabel: string;
  dropdownDefinition?: FieldDropdownDefinitionModel<TableFilterModelData>;
}

export interface TableFilterDataModel {
  option: string;
  value: boolean | string;
}
