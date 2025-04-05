import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ApiResponsesModel } from '../../models/apis-responses.model';
import { AlertService } from '../../services/alert.service';
import { DropdownFieldComponent } from '../../utils/dropdown-field/dropdown-field.component';
import { FieldDropdownDefinitionModel } from '../../utils/dropdown-field/dropdown-field.model';
import { InputFieldComponent } from '../../utils/input-field/input-field.component';
import { TableComponent } from '../../utils/table/table.component';
import {
  tableEditingModel,
  TableFilterDataModel,
  TableFilterModel
} from '../../utils/table/table.model';
import { TableService } from '../../utils/table/table.service';
import { TodoModel } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todo-page',
  imports: [
    TableComponent,
    InputFieldComponent,
    DropdownFieldComponent,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    ToastrModule,
  ],
  providers: [AlertService, TableService],
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  constructor(
    private readonly _service: TodoService,
    private readonly _alertService: AlertService,
    private readonly _fb: FormBuilder,
    private readonly _tableService: TableService<TodoModel>,
    private readonly _route: ActivatedRoute
  ) {
    this.form = this._fb.group({
      taskDescription: ['', [Validators.required, Validators.minLength(5)]],
      taskStatus: ['', [Validators.required]],
    });

    this.dataSource = this._route.snapshot.data['todos'].data;
  }

  form: FormGroup;
  dataSource!: TodoModel[];
  columnsToDisplay: string[] = ['title', 'completed'];
  loaded: boolean = false;

  tableEditOptions: tableEditingModel = {
    allowAll: true,
  };

  dropdownItens: FieldDropdownDefinitionModel<{
    label: string;
    value: boolean;
  }> = {
    dropdownLabel: 'label',
    dropdownValue: 'value',
    dropdownList: [
      {
        label: 'Concluído',
        value: true,
      },

      {
        label: 'Pendente',
        value: false,
      },
    ],
  };

  tableFilter: TableFilterModel<TableFilterDataModel> = {
    dropdownFieldLabel: 'Filtro de status',
    inputFieldLabel: 'Filtro de tarefas',
    dropdownDefinition: {
      dropdownValue: 'value',
      dropdownLabel: 'option',
      dropdownList: [
        { value: '', option: '' },
        {
          value: true,
          option: 'Concluído',
        },
        {
          value: false,
          option: 'Pendente',
        },
      ],
    },
  };

  ngOnInit(): void {
    this.form
      .get('taskStatus')
      ?.setValue(this.dropdownItens.dropdownList[0].value);
  }

  onUpdateRow(receivedRow: TodoModel): void {
    this._service
      .updateData(receivedRow.id as number, receivedRow)
      .subscribe((resp: ApiResponsesModel<TodoModel>) => {
        if (resp.data) {
          this._alertService.success('Lista atualizada com sucesso!');
          this._tableService.updatedRowSuccesfully();
        }
      });
  }

  onDeleteRow(receivedRow: TodoModel): void {
    this._service
      .removeData(receivedRow.id as number)
      .subscribe((resp: ApiResponsesModel<TodoModel>) => {
        if (resp) {
          this._alertService.success('Tarefa removida com sucesso!');
          this._tableService.removedRowSuccesfully();
        }
      });
  }

  onInsertInTable(): void {
    const body: TodoModel = {
      title: this.form.get('taskDescription')?.value,
      completed: this.form.get('taskStatus')?.value,
    };
    
    this._service
      .addData(body)
      .subscribe((resp: ApiResponsesModel<TodoModel>) => {
        if (resp) {
          this._alertService.success('Tarefa inserida com sucesso!');
          this._tableService.createdRowSuccesfully(body);
        }
      });
  }
}
