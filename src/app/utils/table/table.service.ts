import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TableService<T> {
  private _succesfullyUpdatedRow: Subject<void> = new Subject<void>();
  private _succesfullyRemovedRow: Subject<void> = new Subject<void>();
  private _succesfullyCreatedRow: Subject<T> = new Subject<T>();
  private _succesfullyExternalFilter: Subject<string> = new Subject<string>();

  succesfullyUpdatedRow$: Observable<void> =
    this._succesfullyUpdatedRow.asObservable();
  succesfullyRemovedRow$: Observable<void> =
    this._succesfullyRemovedRow.asObservable();
  succesfullyCreatedRow$: Observable<T> =
    this._succesfullyCreatedRow.asObservable();
  succesfullyExternalFilter$: Observable<string> =
    this._succesfullyExternalFilter.asObservable();

  updatedRowSuccesfully(): void {
    this._succesfullyUpdatedRow.next();
  }

  removedRowSuccesfully(): void {
    this._succesfullyRemovedRow.next();
  }

  createdRowSuccesfully(row: T): void {
    this._succesfullyCreatedRow.next(row);
  }

  externalFilterSuccesfully(data: string): void {
    this._succesfullyExternalFilter.next(data);
  }
}
