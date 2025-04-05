export interface FieldDropdownDefinitionModel<T> {
    dropdownValue: keyof T;
    dropdownLabel: keyof T;
    dropdownList: T[];
}

