import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BooleanToTextPipe } from '../../pipes/boolean-to-text.pipe';
import { tableEditingModel, TableFilterDataModel, TableFilterModel } from './table.model';
import { TableService } from './table.service';
import { DropdownFieldComponent } from '../dropdown-field/dropdown-field.component';
import { FieldDropdownDefinitionModel } from '../dropdown-field/dropdown-field.model';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    BooleanToTextPipe,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    InputFieldComponent,
    DropdownFieldComponent,
  ],
})
export class TableComponent<T, U extends TableFilterDataModel> implements OnInit, OnChanges {
  @Input() set tableData(data: T[]) {
    this.dataSource = new MatTableDataSource<T>(data || []);
  }

  @Input() id!: string;
  @Input() columnsToDisplay!: string[];
  @Input() editOptions!: tableEditingModel;
  @Input() tableFilter!: TableFilterModel<U>;
  @Output() deletedRow: EventEmitter<T> = new EventEmitter<T>();
  @Output() updatedRow: EventEmitter<T> = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  editingRows: { [key: number]: boolean } = {};
  backupRows: { [key: number]: T } = {};
  currentRowEditedIndex!: number;
  dataSource!: MatTableDataSource<T>;
  dropDownSelectedValue!: U;
  inputValue: string | number = '';

  private _rowToDelete!: T;

  constructor(
    private readonly _tableService: TableService<T>,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.rowsInsertionControl();
    this.rowsExclusionControl();
    this.rowsUpdateControl();
  }

  filter(): void {
    this.dataSource.filter = 'false';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && this.dataSource)
      this.dataSource.paginator = this.paginator;
  }

  onOptionSelected(event: TableFilterDataModel): void {
    this.dataSource.filter = event.value.toString();
  }

  onTextTyped(text: string | number): void {
    this.inputValue = text;
    this.dataSource.filter = text.toString();
  }

  rowsInsertionControl(): void {
    this._tableService.succesfullycreatedRow$.subscribe((resp: T) => {
      if (resp) this.dataSource.data = [resp, ...this.dataSource.data];
    });
  }

  rowsExclusionControl(): void {
    if (
      (this.editOptions.allowAll || this.editOptions.allowExclusion) &&
      this.id
    )
      this._tableService.succesfullyremovedRow$.subscribe(
        () =>
          (this.dataSource.data = this.dataSource.data.filter(
            (row: T) =>
              (row as Record<string, T>)[this.id] !==
              (this._rowToDelete as Record<string, T>)[this.id]
          ))
      );
  }

  rowsUpdateControl(): void {
    if (this.id) {
      this._tableService.succesfullyUpdatedRow$.subscribe(() => {
        this.editingRows[this.currentRowEditedIndex] = false;
        this._cdr.detectChanges();
      });
    }
  }


  onDeleteRow(row: T): void {
    this._rowToDelete = row;
    this.deletedRow.emit(row);
  }

  getDisplayedColumns(): string[] {
    return this.editOptions.allowExclusion || this.editOptions.allowAll
      ? [...this.columnsToDisplay, 'delete', 'actions']
      : this.columnsToDisplay;
  }

  editRow(row: T, index: number): void {
    this.editingRows[index] = true;
    this.backupRows[index] = { ...row };
  }

  saveRow(row: T, index: number): void {
    this.currentRowEditedIndex = index;
    delete this.backupRows[index];
    this.updatedRow.emit(row);
  }

  cancelEdit(index: number): void {
    if (this.dataSource.data && this.backupRows[index]) {
      this.dataSource.data[index] = { ...this.backupRows[index] };
      this.editingRows[index] = false;
      delete this.backupRows[index];

      this.dataSource._updateChangeSubscription();
    }
  }
}

