import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponsesModel } from '../models/apis-responses.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ResponseErrorHandlerService {
  
  constructor(private snackBar: MatSnackBar) {}

  private _getErrorMessage(error: HttpErrorResponse): string {
    if (!navigator.onLine) return 'Ops! Sem conexão com a internet.';
    switch (error.status) {
      case 200:
      case 204:
        return 'Operação bem-sucedida.';
      case 400:
        return 'Ops! Operação não concluída devido a erro no sistema.';
      case 401:
        return 'Ops! Você não está autorizado a realizar essa operação...';
      case 404:
        return 'Ops! Operação não concluída, nada encontrado...';
      case 500:
        return 'Ops! Operação não concluída devido a erro de servidor.';
      default:
        return 'Ops! Um erro foi encontrado.';
    }
  }

  private _handleError(error: HttpErrorResponse): Observable<string> {
    const errorMsg: string = this._getErrorMessage(error);
    return of(errorMsg);
  }

  handleRequest<T>(
    observable: Observable<T>
  ): Observable<ApiResponsesModel<T>> {
    return observable.pipe(
      map((data: T) => ({
        success: true,
        data,
      })),
      catchError((error: HttpErrorResponse) =>
        this._handleError(error).pipe(
          map((errorMsg: string) => {
            this.snackBar.open(errorMsg, 'Fechar', { duration: 3000 });
            return { success: false, error: errorMsg };
          })
        )
      )
    );
  }
}
