import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TableService<T> {
  private _succesfullyUpdatedRow: Subject<void> = new Subject<void>();
  private _succesfullyremovedRow: Subject<void> = new Subject<void>();
  private _succesfullycreatedRow: Subject<T> = new Subject<T>();

  succesfullyUpdatedRow$: Observable<void> =
    this._succesfullyUpdatedRow.asObservable();
  succesfullyremovedRow$: Observable<void> =
    this._succesfullyremovedRow.asObservable();
  succesfullycreatedRow$: Observable<T> =
    this._succesfullycreatedRow.asObservable();

  updatedRowSuccesfully(): void {
    this._succesfullyUpdatedRow.next();
  }

  removedRowSuccesfully(): void {
    this._succesfullyremovedRow.next();
  }

  createdRowSuccesfully(row: T): void {
    this._succesfullycreatedRow.next(row);
  }
}
