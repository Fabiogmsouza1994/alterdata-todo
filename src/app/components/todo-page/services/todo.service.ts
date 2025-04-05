import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { TodoModel } from '../models/todo.model';
import { ResponseErrorHandlerService } from '../../../services/response-error-handler.service';
import { ApiResponsesModel } from '../../../models/apis-responses.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly url: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(
    private httpClient: HttpClient,
    private _handleErrorService: ResponseErrorHandlerService
  ) {}

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
