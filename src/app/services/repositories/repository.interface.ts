import { Observable } from 'rxjs';

export interface IRepository<T> {
  getAll(): Observable<T[]>;
  getById(id: string | number): Observable<T | undefined>;
  save(item: T): Observable<T>;
  delete(id: string | number): Observable<void>;
}
