import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponsesModel } from '../../../models/apis-responses.model';
import { ResponseErrorHandlerService } from '../../../services/response-error-handler.service';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly url: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(
    private httpClient: HttpClient,
    private _handleErrorService: ResponseErrorHandlerService
  ) {}

  getDataById(id: string | number): Observable<ApiResponsesModel<TodoModel>> {
    return this.httpClient
      .get<TodoModel>(`${this.url}/${id}`)
      .pipe(this._handleErrorService.handleRequest<TodoModel>);
  }

  getAllData(): Observable<ApiResponsesModel<TodoModel[]>> {
    return this.httpClient
      .get<TodoModel[]>(this.url)
      .pipe(this._handleErrorService.handleRequest<TodoModel[]>);
  }

  addData(data: TodoModel): Observable<ApiResponsesModel<TodoModel>> {
    return this.httpClient
      .post<TodoModel>(this.url, data)
      .pipe(this._handleErrorService.handleRequest<TodoModel>);
  }

  updateData(
    id: number,
    data: TodoModel
  ): Observable<ApiResponsesModel<TodoModel>> {
    return this.httpClient
      .patch<TodoModel>(`${this.url}/${id}`, data)
      .pipe(this._handleErrorService.handleRequest<TodoModel>);
  }

  removeData(id: number): Observable<ApiResponsesModel<TodoModel>> {
    return this.httpClient
      .delete<TodoModel>(`${this.url}/${id}`)
      .pipe(this._handleErrorService.handleRequest<TodoModel>);
  }
}
