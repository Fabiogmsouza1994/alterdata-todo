import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { TodoModel } from '../models/todo.model';
import { ApiResponsesModel } from '../../../models/apis-responses.model';
import { ResponseErrorHandlerService } from '../../../services/response-error-handler.service';
import { AlertService } from '../../../services/alert.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  const mockTodos: TodoModel[] = [
    { userId: 1, id: 1, title: 'Test Todo 1', completed: false },
    { userId: 2, id: 2, title: 'Test Todo 2', completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [
        TodoService,
        ResponseErrorHandlerService,
        AlertService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Deve retornar todos os dados com sucesso', () => {
    service.getAllData().subscribe((resp: ApiResponsesModel<TodoModel[]>) => {
      expect(mockTodos.length).toBe(resp.data?.length as number);
      expect(resp.data).toEqual(mockTodos);
    });

    const req: TestRequest = httpMock.expectOne(service.url);
    expect(req.request.method).toBe('GET');

    req.flush(mockTodos);
  });

  it('Deve adicionar um novo item com sucesso', () => {
    const newTodo: TodoModel = {
      userId: 3,
      id: 3,
      title: 'Fly to the moon',
      completed: false,
    };

    service.addData(newTodo).subscribe((resp: ApiResponsesModel<TodoModel>) => {
      expect(newTodo).toEqual(resp.data as TodoModel);
    });

    const req: TestRequest = httpMock.expectOne(service.url);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);

    req.flush(newTodo);
  });

  it('Deve atualizar um dado mediante o id com sucesso', () => {
    mockTodos[0].title = 'to be hired';

    service
      .updateData(mockTodos[0].id as number, mockTodos[0])
      .subscribe((resp: ApiResponsesModel<TodoModel>) =>
        expect(mockTodos[0]).toEqual(resp.data as TodoModel)
      );

    const req: TestRequest = httpMock.expectOne(
      `${service.url}/${mockTodos[0].id}`
    );

    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockTodos[0]);

    req.flush(mockTodos[0]);
  });

  it('Deve remover um dado mediante o id com sucesso', () => {
    service
      .removeData(mockTodos[0].id as number)
      .subscribe((resp: ApiResponsesModel<TodoModel>) => {
        expect(mockTodos[0]).toEqual(resp.data as TodoModel);
      });

    const req: TestRequest = httpMock.expectOne(
      `${service.url}/${mockTodos[0].id}`
    );

    expect(req.request.method).toBe('DELETE');
    req.flush(mockTodos[0]);
  });
});
