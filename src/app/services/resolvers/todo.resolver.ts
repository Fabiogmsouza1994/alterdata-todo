/*!
 * @license
 * Copyright Linx. All Rights Reserved - 2024 | https://www.linx.com.br/
 */

import { inject, Injectable } from '@angular/core';
import { TodoService } from '../../components/todo-page/services/todo.service';
import { Observable } from 'rxjs';
import { ApiResponsesModel } from '../../models/apis-responses.model';
import { TodoModel } from '../../components/todo-page/models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoResolver {
  constructor(private readonly _todoService: TodoService) {}

  resolve(): Observable<ApiResponsesModel<TodoModel[]>> {
    return this._todoService.getAllData();
  }
}
